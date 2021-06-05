<template>
  <div class="genres" v-if="data">
    <h1 class="title">Genres</h1>

    <p v-if="userSignedIn" data-test-id="create-genre-button">
      <router-link :to="{ name: 'CreateGenre' }" class="button is-fullwidth-mobile mb-10">Create a new genre</router-link>
    </p>

    <ul data-test-id="genres-list">
      <li v-for="genre in data.genres.nodes" :key="genre.id">
        <router-link :to="{ name: 'Genre', params: { id: genre.id }}">
          {{ genre.name }}
        </router-link>
      </li>
    </ul>

    <pagination
      :page-name="'Genres'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { GenresDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'Genres',
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
      query: GenresDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.genres?.pageInfo.startCursor ?? null,
        endCursor: data.value?.genres?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.genres?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.genres?.pageInfo.hasNextPage ?? false
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
