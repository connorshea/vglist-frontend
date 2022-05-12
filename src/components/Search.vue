<template>
  <div class="navbar-item has-dropdown field mt-10" :class="{ 'is-active': dropdownActive }">
    <div class="field mb-0">
      <p class="control has-icons-left">
        <input
          v-model="query"
          @input="debouncedOnSearch"
          @keyup.up.prevent="onUpArrow"
          @keyup.down.prevent="onDownArrow"
          @keyup.enter.prevent="onEnter"
          @keyup.escape.prevent="onEscape"
          @focus="onFocus"
          class="input navbar-search-input"
          type="search"
          placeholder="Search"
        >
        <svg-icon :name="'search'" :classes="['icon', 'is-small', 'is-left']"/>
      </p>
    </div>

    <div v-if="dropdownActive" class="navbar-search-dropdown navbar-dropdown">
      <p class="navbar-item" v-if="!hasSearchResults">No results.</p>
      <template v-for="(type) in Object.keys(searchResults)">
        <div class="navbar-search-dropdown-section-container" :key="type" v-if="searchResults[type].length > 0">
          <!-- This will be hidden by CSS if it's the first one in the
               dropdown, since it's the best solution I could come up with. -->
          <hr class="navbar-divider">
          <p class="navbar-item navbar-dropdown-header">{{ plurals[type] }}</p>
          <template v-for="result in searchResults[type]" :key="result.id">
            <router-link 
              :to="searchResultToUrl(result)"
              custom
              v-slot="{ navigate, href }"
            >
              <a :href="href"
                 @click="[navigate, resetSearchResults]"
                 class="navbar-item"
                 :class="{
                   'is-active': activeSearchResult !== -1 && flattenedSearchResults[activeSearchResult].searchableId === result.searchableId
                 }"
              >
                <div class="media">
                  <figure class="media-left image is-48x48" v-if="type === 'Game' || type === 'User'">
                    <img v-if="result.imageUrl !== null" :src="result.imageUrl" width="48px" height="48px" class="game-cover">
                    <img v-else-if="type === 'Game'" src="@/assets/images/no-cover.png" width="48px" height="48px" class="game-cover">
                    <img v-else-if="type === 'User'" src="@/assets/images/default-avatar.png" width="48px" height="48px" class="game-cover">
                  </figure>
                  <div class="media-content">
                    <p :class="{ 'has-text-weight-semibold': type === 'Game' }">{{ result.content }}</p>
                    <p v-if="type === 'Game'">
                      <!-- Outputs "2009 · Nintendo", "Nintendo", or "2009" depending on what data it has. -->
                      {{
                        [
                          result.releaseDate === null ? '' : result.releaseDate.slice(0, 4),
                          result.developerName === null ? '' : result.developerName
                        ].filter(x => x !== '').join(' · ')
                      }}
                    </p>
                  </div>
                </div>
              </a>
            </router-link>
          </template>
          <!-- If moreGamesExist is true, we can potentially load another page of results for Games. -->
          <a class="navbar-item"
             v-if="type === 'Game' && moreGamesExist"
             @click="loadMoreGames"
          >
            <div class="media">
              <div class="media-content">
                <p>More...</p>
              </div>
            </div>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep, debounce } from 'lodash';
import { computed, defineComponent, Ref, ref } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { CompanySearchResult, EngineSearchResult, GameSearchResult, GenreSearchResult, GlobalSearchDocument, PlatformSearchResult, SearchResultUnion, SeriesSearchResult, UserSearchResult } from '@/generated/graphql';
import { useQuery } from 'villus';
import { useRouter } from 'vue-router';

type SearchResultName = 'Game' | 'Series' | 'Company' | 'Platform' | 'Engine' | 'Genre' | 'User';

type SearchResults = {
  'Game': GameSearchResult[],
  'Series': SeriesSearchResult[],
  'Company': CompanySearchResult[],
  'Platform': PlatformSearchResult[],
  'Engine': EngineSearchResult[],
  'Genre': GenreSearchResult[],
  'User': UserSearchResult[]
};

const EMPTY_SEARCH_RESULTS: SearchResults = {
  'Game': [],
  'Series': [],
  'Company': [],
  'Platform': [],
  'Engine': [],
  'Genre': [],
  'User': []
};

export default defineComponent({
  name: 'Search',
  components: {
    SvgIcon
  },
  setup() {
    const query = ref('');

    // We run the search query manually to allow for debouncing, so we don't
    // use the query ref here. If we use a ref for the variables, it causes
    // the query to be executed on every input into the search field (meaning
    // a ton of unnecessary requests).
    const { execute: executeSearch, data: searchData } = useQuery({
      query: GlobalSearchDocument,
      variables: { query: '', cursor: '' },
      fetchOnMount: false
    });

    const router = useRouter();

    const plurals = {
      'Game': 'Games',
      'Series': 'Series',
      'Company': 'Companies',
      'Platform': 'Platforms',
      'Engine': 'Engines',
      'Genre': 'Genres',
      'User': 'Users'
    };

    const searchResults: Ref<SearchResults> = ref(EMPTY_SEARCH_RESULTS);

    const hasSearchResults = computed(() => {
      return Object.values(searchResults.value).flat().length != 0;
    });

    const searchFocused = ref(false);
    const dropdownActive = computed(() => {
      return query.value.length > 1 && searchFocused.value;
    });

    const activeSearchResult = ref(-1);
    // Whether the "More" button has already been used to load more games
    // this will only get set to true if more were loaded _and_ none of the
    // returned records were for Games.)
    const moreGamesExist = ref(true);

    const flattenedSearchResults = computed(() => Object.values(searchResults.value).flat());

    const onUpArrow = () => {
      if (activeSearchResult.value >= 0) {
        activeSearchResult.value -= 1;
        scrollToActiveItem();
      }
    };

    const onDownArrow = () => {
      if (activeSearchResult.value < flattenedSearchResults.value.length - 1) {
        activeSearchResult.value += 1;
        scrollToActiveItem();
      }
    };

    // On enter, navigate to the active item's linked page.
    const onEnter = () => {
      const activeItem: HTMLLinkElement | null = document.querySelector(
        '.navbar-search-dropdown .navbar-item.is-active'
      );
      if (activeItem !== null) {
        // This will push the full URL as the path, so we make the href a URL
        // and get just the pathname.
        router.push({ path: new URL(activeItem.href).pathname });
        resetSearchResults();
      }
    };

    const onEscape = () => {
      searchFocused.value = false;
    };

    const onFocus = () => {
      searchFocused.value = true;
    };

    // For use when a page is navigated, and in some other cases.
    const resetSearchResults = () => {
      searchResults.value = cloneDeep(EMPTY_SEARCH_RESULTS);
      activeSearchResult.value = -1;
      query.value = '';
      // Unfocus the search input if it's focused.
      (document.querySelector('.navbar-search-input') as HTMLInputElement | null)?.blur();
    };

    const scrollToActiveItem = () => {
      // Select the current active item and the searchDropdown.
      const activeItem: HTMLElement | null = document.querySelector(
        '.navbar-search-dropdown .navbar-item.is-active'
      );
      const searchDropdown: HTMLElement | null = document.querySelector(
        '.navbar-search-dropdown'
      );
      // If the activeItem exists, scroll to it as the user moves through the dropdown options.
      if (activeItem !== null && searchDropdown !== null) {
        searchDropdown.scrollTop = activeItem.offsetTop - (searchDropdown?.offsetTop || 0);
      }
    };

    const onSearch = () => {
      // Set searchFocused to true to allow the search input to become
      // re-focused when new input occurs.
      searchFocused.value = true;
      // No need to re-run the query if the query value is empty.
      // This may cause weirdness, but because the dropdown becomes hidden when
      // the query value is empty, this doesn't currently seem to be an issue.
      if (query.value !== '') {
        executeSearch({ variables: { query: query.value, cursor: '' }}).then(() => {
          let tempSearchData = cloneDeep(EMPTY_SEARCH_RESULTS);

          if (searchData.value?.globalSearch.pageInfo.hasNextPage === false) {
            moreGamesExist.value = false;
          } else {
            // Set moreGamesExist to true if there are any games in the current
            // page of results. Otherwise, we can assume that there are no more
            // games to find with this search query.
            moreGamesExist.value = searchData.value?.globalSearch.nodes?.some((node) => {
              return node?.__typename === 'GameSearchResult';
            }) ?? false;
          }

          searchData.value?.globalSearch.nodes?.forEach((node) => {
            if (node !== null) {
              // TypeScript isn't smart enough for this code, and doesn't know
              // this is safe to do.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              tempSearchData[node.__typename.replace('SearchResult', '') as SearchResultName].push(node as any);
            }
          });

          searchResults.value = tempSearchData;

          activeSearchResult.value = -1;
        });
      }
    };

    // Debounce the search request's execution when the search input's value
    // changes to prevent a bunch of unnecessary requests.
    const debouncedOnSearch = debounce(onSearch, 400);

    // Load more game records and append them to the game search results.
    const loadMoreGames = () => {
      let queryVariables = { query: query.value, cursor: searchData.value?.globalSearch.pageInfo.endCursor || '' };
      executeSearch({ variables: queryVariables }).then(() => {
        if (searchData.value?.globalSearch.pageInfo.hasNextPage === false) {
          moreGamesExist.value = false;
        } else {
          // Set moreGamesExist to true if there are any games in the current
          // page of results. Otherwise, we can assume that there are no more
          // games to find with this search query.
          moreGamesExist.value = searchData.value?.globalSearch.nodes?.some((node) => {
            return node?.__typename === 'GameSearchResult';
          }) ?? false;
        }

        searchData.value?.globalSearch.nodes?.forEach((node) => {
          if (node?.__typename === 'GameSearchResult') {
            // TypeScript isn't smart enough for this code, and doesn't know
            // this is safe to do.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            searchResults.value['Game'].push(node as any);
          }
        });

        activeSearchResult.value = -1;
      });
    };

    // Convert the SearchResult to a usable URL.
    const searchResultToUrl = (result: SearchResultUnion) => {
      switch (result.__typename) {
      case 'GameSearchResult':
        return `/games/${result.searchableId}`;
      case 'SeriesSearchResult':
        return `/series/${result.searchableId}`;
      case 'CompanySearchResult':
        return `/companies/${result.searchableId}`;
      case 'PlatformSearchResult':
        return `/platforms/${result.searchableId}`;
      case 'EngineSearchResult':
        return `/engines/${result.searchableId}`;
      case 'GenreSearchResult':
        return `/genres/${result.searchableId}`;
      case 'UserSearchResult':
        return `/users/${result.slug}`;
      default:
        return undefined;
      }
    };

    return {
      query,
      plurals,
      searchResults,
      flattenedSearchResults,
      hasSearchResults,
      dropdownActive,
      activeSearchResult,
      moreGamesExist,
      onUpArrow,
      onDownArrow,
      onEnter,
      onEscape,
      onFocus,
      resetSearchResults,
      scrollToActiveItem,
      loadMoreGames,
      debouncedOnSearch,
      searchResultToUrl
    };
  }
});
</script>

<style lang="scss" scoped>
// A bit of a hack to hide the navbar divider on the first search result
// section that gets displayed.
.navbar-search-dropdown-section-container:first-of-type hr.navbar-divider {
  display: none;
}
</style>
