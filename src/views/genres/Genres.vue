<template>
  <div class="genres" v-if="data">
    <h1 class="title">Genres</h1>

    <p v-if="userSignedIn">
      <router-link :to="{ name: 'CreateGenre' }" class="button is-fullwidth-mobile mb-10">Create a new genre</router-link>
    </p>

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
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Genres',
  setup(_props, context) {
    const { data } = useQuery({
      query: GenresDocument,
      variables: {
        cursor: ''
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
