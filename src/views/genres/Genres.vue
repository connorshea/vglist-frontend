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
    const { data } = useQuery({
      query: GenresDocument,
      variables: {
        after: ''
      }
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.genres?.pageInfo.startCursor ?? null,
        endCursor: data.value?.genres?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.genres?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.genres?.pageInfo.hasNextPage ?? false
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
