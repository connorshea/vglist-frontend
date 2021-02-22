<template>
  <div class="series" v-if="data">
    <ul>
      <li v-for="series in data.seriesList.nodes" :key="series.id">
        <router-link :to="{ name: 'Series', params: { id: series.id }}">
          {{ series.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { SeriesListDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'SeriesList',
  setup() {
    const { data } = useQuery({
      query: SeriesListDocument,
      variables: {
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
