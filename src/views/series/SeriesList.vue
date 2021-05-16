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
  setup(_props, context) {
    const { data } = useQuery({
      query: SeriesListDocument,
      variables: {
        after: ''
      }
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    return {
      data,
      userSignedIn
    };
  }
});
</script>
