<template>
  <div class="genres" v-if="data">
    <h1 class="title">Genres</h1>

    <ul>
      <li v-for="genre in data.genres.nodes" :key="genre.id">
        <router-link :to="{ name: 'Genre', params: { id: genre.id }}">
          {{ genre.name }}
        </router-link>
      </li>
    </ul>

    <!-- <%= paginate @genres %> -->
  </div>
</template>

<script lang="ts">
import { GenresDocument } from '@/generated/graphql';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Genres',
  setup() {
    const { data } = useQuery({
      query: GenresDocument,
      variables: {
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
