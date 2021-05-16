<template>
  <div class="games" v-if="data">
    <h1 class="title">Games</h1>

    <div class="columns">
      <div class="games-search-sidebar column is-3">
        <sort-dropdown
          :sortOptions="sortOptions"
          :initialSortOption="sortBy"
          @activeSortChanged="updateSortValue"
        ></sort-dropdown>

        <div class="is-fullwidth-mobile">
          <games-filters
            @activeFiltersChanged="updateFilters"
            :platform="platformId"
            :year="byYear"
          />
        </div>
      </div>

      <div class="is-9 column">
        <div class="field buttons">
          <!-- <% if policy(@games).create? %>
            <%= link_to("Create a new game", new_game_path, class: 'button mr-0-mobile is-fullwidth-mobile') %>
          <% end %> -->
        </div>

        <div class="game-card-list">
          <div v-for="game in data.games.nodes" :key="game.id">
            <GameCard :game="game"/>
          </div>
        </div>

        <pagination
          :page-name="'Games'"
          :start-cursor="data.games.pageInfo.startCursor"
          :end-cursor="data.games.pageInfo.endCursor"
          :has-next-page="data.games.pageInfo.hasNextPage"
          :has-previous-page="data.games.pageInfo.hasPreviousPage"
          @cursorChanged="updateCursorAndExecute"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GamesDocument, GameSort, Platform } from '@/generated/graphql';
import { defineComponent, ref, Ref } from '@vue/composition-api';
import { useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';
import GamesFilters from '@/components/GamesFilters.vue';
import SortDropdown from '@/components/SortDropdown.vue';
import Pagination from '@/components/Pagination.vue';

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
  setup(props, context) {
    type SortOptionsType = GameSort | null;

    const queryVariables: Ref<{ before: string | null, after: string | null, sortBy: SortOptionsType, byYear: number | null, platformId: string | null}> = ref({
      before: props.before,
      after: props.after,
      sortBy: props.sortBy?.toUpperCase() as SortOptionsType,
      byYear: props.byYear,
      platformId: props.platformId
    });

    const { data, execute } = useQuery({
      query: GamesDocument,
      variables: queryVariables,
      cachePolicy: 'network-only'
    });

    const updateSortValue = (sort: SortOptionsType) => {
      let { sort_by, before, after, ...currentQueryParams } = context.root.$route.query;
      let query = { ...currentQueryParams };
      if (sort !== null) {
        query.sort_by = sort.toLowerCase();
      }
      queryVariables.value.sortBy = sort?.toUpperCase() as SortOptionsType;
      context.root.$router.push({ name: 'Games', query: query });
    };

    const updateFilters = (filterData: { platform: Platform | null, year: number | null}) => {
      queryVariables.value.byYear = filterData.year;
      queryVariables.value.platformId = filterData.platform?.id ?? null;
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

    const updateCursorAndExecute = () => {
      queryVariables.value.after = props.after;
      queryVariables.value.before = props.before;

      execute();
    };

    return {
      data,
      sortOptions,
      updateSortValue,
      updateFilters,
      queryVariables,
      updateCursorAndExecute
    };
  }
});
</script>
