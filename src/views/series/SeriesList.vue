<template>
  <div class="series" v-if="data?.seriesList">
    <h1 class="title">Series</h1>

    <p v-if="userSignedIn" data-test-id="create-series-button">
      <router-link :to="{ name: 'CreateSeries' }" class="button is-fullwidth-mobile mb-10">Create a new series</router-link>
    </p>

    <ul data-test-id="series-list">
      <li v-for="series in data.seriesList.nodes" :key="series!.id">
        <template v-if="series">
          <router-link :to="{ name: 'Series', params: { id: series.id }}">
            {{ series.name }}
          </router-link>
        </template>
      </li>
    </ul>

    <pagination
      :page-name="'SeriesList'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { SeriesListDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'SeriesList',
  components: {
    Pagination
  },
  props: {
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
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after
      };
    });

    const { data, execute } = useQuery({
      query: SeriesListDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.seriesList?.pageInfo.startCursor ?? null,
        endCursor: data.value?.seriesList?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.seriesList?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.seriesList?.pageInfo.hasNextPage ?? false
      };
    });

    const store = useStore<State>();
    const userSignedIn = computed(() => store.state.userSignedIn);

    return {
      data,
      execute,
      userSignedIn,
      pageInfo
    };
  }
});
</script>
