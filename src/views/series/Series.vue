<template>
  <div class="series" v-if="data">
    <h1 class="title">{{ data.series.name }}</h1>

    <div v-if="userSignedIn" class="field buttons">
      <template v-if="userCanEdit">
        <router-link :to="{ name: 'EditSeries', params: { id: data.series.id }}" class="button mr-0-mobile is-fullwidth-mobile">
          Edit
        </router-link>
      </template>
      <template v-if="userCanDelete">
        <a @click="deleteSeries" class="button is-fullwidth-mobile is-danger">Delete</a>
      </template>
    </div>

    <a v-if="data.series.wikidataId !== null" :href="wikidataUrl">Wikidata</a>

    <template v-if="data.series.games.nodes.length > 0">
      <div class="game-card-list mt-20">
        <div v-for="game in data.series.games.nodes" :key="game.id">
          <GameCard :game="game"/>
        </div>
      </div>

      <pagination
        :page-name="'Series'"
        :start-cursor="pageInfo.startCursor"
        :end-cursor="pageInfo.endCursor"
        :has-next-page="pageInfo.hasNextPage"
        :has-previous-page="pageInfo.hasPreviousPage"
        @cursorChanged="execute"
      />
    </template>
    <template v-else>
      <p class="has-text-centered mt-50 has-text-muted">This series doesn't have any games yet.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { DeleteSeriesDocument, SeriesDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useMutation, useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Series',
  components: {
    GameCard,
    Pagination
  },
  props: {
    id: {
      required: true,
      type: String
    },
    after: {
      type: String,
      required: false,
      default: null
    },
    before: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const queryVariables = computed(() => {
      return {
        id: props.id,
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after
      };
    });

    const { data, execute } = useQuery({
      query: SeriesDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.series?.games?.pageInfo.startCursor ?? null,
        endCursor: data.value?.series?.games?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.series?.games?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.series?.games?.pageInfo.hasNextPage ?? false
      };
    });

    const wikidataUrl = computed(() => {
      return `https://www.wikidata.org/wiki/Q${data.value?.series?.wikidataId}`;
    });

    const router = useRouter();

    const { data: deleteSeriesData, execute: executeDeleteSeries, error: deleteSeriesErrors } = useMutation(DeleteSeriesDocument);
    let deleteSeries = () => {
      if (confirm("Are you sure you want to delete this series?")) {
        executeDeleteSeries({ id: props.id }).then(() => {
          if (deleteSeriesData.value?.deleteSeries?.deleted) {
            router.push({ name: 'SeriesList' });
          } else {
            // TODO: Error handling.
            console.log(`Error: ${deleteSeriesErrors.value}`);
          }
        });
      }
    };

    const store = useStore();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanEdit = userSignedIn;
    const userCanDelete = computed(() => ['ADMIN', 'MODERATOR'].includes(store.state.currentUser.role));

    return {
      data,
      execute,
      wikidataUrl,
      deleteSeries,
      userSignedIn,
      userCanEdit,
      userCanDelete,
      pageInfo
    };
  }
});
</script>
