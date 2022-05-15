<template>
  <div class="games" v-if="data?.games">
    <h1 class="title">Games</h1>

    <div class="columns">
      <div class="games-search-sidebar column is-3">
        <sort-dropdown
          :sort-options="sortOptions"
          :initial-sort-option="upcasedSortBy"
          @activeSortChanged="updateSortValue"
        />

        <div class="is-fullwidth-mobile">
          <games-filters
            :platform="platformId"
            :year="byYear"
          />
        </div>
      </div>

      <div class="is-9 column">
        <div class="field buttons">
          <router-link :to="{ name: 'CreateGame' }" class="button is-fullwidth-mobile mb-10" v-if="userSignedIn" data-test-id="create-game-button">
            Create a new game
          </router-link>
        </div>

        <div class="game-card-list" data-test-id="games-list">
          <div v-for="game in data.games.nodes" :key="game.id">
            <game-card :game="game"/>
          </div>
        </div>

        <pagination
          :page-name="'Games'"
          :start-cursor="pageInfo.startCursor"
          :end-cursor="pageInfo.endCursor"
          :has-next-page="pageInfo.hasNextPage"
          :has-previous-page="pageInfo.hasPreviousPage"
          @cursorChanged="execute"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GamesDocument, GameSort } from '@/generated/graphql';
import { computed, ComputedRef, defineComponent } from 'vue';
import { useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';
import GamesFilters from '@/components/GamesFilters.vue';
import SortDropdown from '@/components/SortDropdown.vue';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { State } from '@/store';

export default defineComponent({
  name: 'Games',
  components: {
    GameCard,
    GamesFilters,
    SortDropdown,
    Pagination
  },
  props: {
    sortBy: {
      type: String,
      required: false,
      default: null
    },
    platformId: {
      type: String,
      required: false,
      default: null
    },
    byYear: {
      type: Number,
      required: false,
      default: null
    },
    before: {
      type: String,
      required: false,
      default: null
    },
    after: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    type SortOptionsType = GameSort | null;

    // Upcase it so we can pass the capitalized version to the sort dropdown, to
    // ensure the default value works correctly.
    const upcasedSortBy = computed(() => props.sortBy?.toUpperCase());

    const queryVariables: ComputedRef<{ before: string | null, after: string | null, sortBy: SortOptionsType, byYear: number | null, platformId: string | null}> = computed(() => {
      return {
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after,
        sortBy: upcasedSortBy.value as SortOptionsType,
        byYear: props.byYear,
        platformId: props.platformId
      };
    });

    const { data, execute } = useQuery({
      query: GamesDocument,
      variables: queryVariables
    });

    const router = useRouter();
    const route = useRoute();
    const store = useStore<State>();

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.games?.pageInfo.startCursor ?? null,
        endCursor: data.value?.games?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.games?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.games?.pageInfo.hasNextPage ?? false
      };
    });

    const updateSortValue = (sort: SortOptionsType) => {
      // Override the before and after values since we have to restart the
      // cursor when changing the sort.
      let { sort_by, before, after, ...currentQueryParams } = route.query;
      let query = { ...currentQueryParams };
      if (sort !== null) {
        query.sort_by = sort.toLowerCase();
      }
      router.push({ name: 'Games', query: query });
    };

    const sortOptions: Array<{ name: string, value: SortOptionsType }> = [
      {
        name: 'Default',
        value: null
      },
      {
        name: 'Newest',
        value: GameSort.Newest
      },
      {
        name: 'Oldest',
        value: GameSort.Oldest
      },
      {
        name: 'Recently updated',
        value: GameSort.RecentlyUpdated
      },
      {
        name: 'Most favorites',
        value: GameSort.MostFavorites
      },
      {
        name: 'Most owners',
        value: GameSort.MostOwners
      },
      {
        name: 'Recently released',
        value: GameSort.RecentlyReleased
      },
      {
        name: 'Highest average rating',
        value: GameSort.HighestAvgRating
      }
    ];

    const userSignedIn = computed(() => store.state.userSignedIn);

    return {
      data,
      sortOptions,
      updateSortValue,
      queryVariables,
      pageInfo,
      upcasedSortBy,
      execute,
      userSignedIn
    };
  }
});
</script>
