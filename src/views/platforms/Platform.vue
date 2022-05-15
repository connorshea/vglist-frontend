<template>
  <div class="platform" v-if="data?.platform">
    <h1 class="title" data-test-id="platform-title">{{ data.platform.name }}</h1>

    <div v-if="userSignedIn" class="field buttons">
      <template v-if="userCanEdit">
        <router-link :to="{ name: 'EditPlatform', params: { id: data.platform.id }}" class="button mr-0-mobile is-fullwidth-mobile">
          Edit
        </router-link>
      </template>
      <template v-if="userCanDelete">
        <a @click="deletePlatform" class="button is-fullwidth-mobile is-danger">Delete</a>
      </template>
    </div>

    <a v-if="data.platform.wikidataId !== null" :href="wikidataUrl">Wikidata</a>

    <template v-if="data.platform.games.nodes.length > 0">
      <div class="game-card-list mt-20" data-test-id="platform-games-list">
        <div v-for="game in data.platform.games.nodes" :key="game.id">
          <game-card :game="game"/>
        </div>
      </div>

      <pagination
        :page-name="'Platform'"
        :start-cursor="pageInfo.startCursor"
        :end-cursor="pageInfo.endCursor"
        :has-next-page="pageInfo.hasNextPage"
        :has-previous-page="pageInfo.hasPreviousPage"
        @cursorChanged="execute"
      />
    </template>
    <template v-else>
      <p class="has-text-centered mt-50 has-text-muted">This platform doesn't have any games yet.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { DeletePlatformDocument, PlatformDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useMutation, useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { State } from '@/store';

export default defineComponent({
  name: 'Platform',
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
      query: PlatformDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.platform?.games?.pageInfo.startCursor ?? null,
        endCursor: data.value?.platform?.games?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.platform?.games?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.platform?.games?.pageInfo.hasNextPage ?? false
      };
    });

    const wikidataUrl = computed(() => {
      return `https://www.wikidata.org/wiki/Q${data.value?.platform?.wikidataId}`;
    });

    const router = useRouter();

    const { data: deletePlatformData, execute: executeDeletePlatform, error: deletePlatformErrors } = useMutation(DeletePlatformDocument);
    let deletePlatform = () => {
      if (confirm("Are you sure you want to delete this platform?")) {
        executeDeletePlatform({ id: props.id }).then(() => {
          if (deletePlatformData.value?.deletePlatform?.deleted) {
            router.push({ name: 'Platforms' });
          } else {
            // TODO: Error handling.
            console.log(`Error: ${deletePlatformErrors.value}`);
          }
        });
      }
    };

    const store = useStore<State>();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanEdit = userSignedIn;
    const userCanDelete = computed(() => ['ADMIN', 'MODERATOR'].includes(store.state.currentUser?.role ?? ''));

    return {
      data,
      execute,
      wikidataUrl,
      deletePlatform,
      userSignedIn,
      userCanEdit,
      userCanDelete,
      pageInfo
    };
  }
});
</script>
