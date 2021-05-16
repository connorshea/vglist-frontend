<template>
  <div class="series" v-if="data">
    <h1 class="title">Series</h1>

    <p v-if="userSignedIn">
      <router-link :to="{ name: 'CreateSeries' }" class="button is-fullwidth-mobile mb-10">Create a new series</router-link>
    </p>

    <ul>
      <li v-for="series in data.seriesList.nodes" :key="series.id">
        <router-link :to="{ name: 'Series', params: { id: series.id }}">
          {{ series.name }}
        </router-link>
      </li>
    </ul>

    <!-- <%= paginate @series %> -->
  </div>
</template>

<script lang="ts">
import { SeriesListDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'SeriesList',
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
  setup(props, context) {
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

    const { data } = useQuery({
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

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    return {
      data,
      userSignedIn,
      pageInfo
    };
  }
});
</script>
