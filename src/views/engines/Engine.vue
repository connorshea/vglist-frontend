<template>
  <div class="engine" v-if="data">
    <h1 class="title">{{ data.engine.name }}</h1>

    <div v-if="userSignedIn" class="field buttons">
      <template v-if="userCanEdit">
        <router-link :to="{ name: 'EditEngine', params: { id: data.engine.id }}" class="button mr-0-mobile is-fullwidth-mobile">
          Edit
        </router-link>
      </template>
      <template v-if="userCanDelete">
        <a @click="deleteEngine" class="button is-fullwidth-mobile is-danger">Delete</a>
      </template>
    </div>

    <a v-if="data.engine.wikidataId !== null" :href="wikidataUrl">Wikidata</a>

    <template v-if="data.engine.games.nodes.length > 0">
      <div class="game-card-list mt-20">
        <div v-for="game in data.engine.games.nodes" :key="game.id">
          <game-card :game="game"/>
        </div>
      </div>

      <pagination
        :page-name="'Engine'"
        :start-cursor="pageInfo.startCursor"
        :end-cursor="pageInfo.endCursor"
        :has-next-page="pageInfo.hasNextPage"
        :has-previous-page="pageInfo.hasPreviousPage"
        @cursorChanged="execute"
      />
    </template>
    <template v-else>
      <p class="has-text-centered mt-50 has-text-muted">This engine doesn't have any games yet.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { DeleteEngineDocument, EngineDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useMutation, useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Engine',
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
      query: EngineDocument,
      variables: queryVariables
    });

    const router = useRouter();
    const store = useStore();

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.engine?.games?.pageInfo.startCursor ?? null,
        endCursor: data.value?.engine?.games?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.engine?.games?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.engine?.games?.pageInfo.hasNextPage ?? false
      };
    });

    const wikidataUrl = computed(() => {
      return `https://www.wikidata.org/wiki/Q${data.value?.engine?.wikidataId}`;
    });

    const { data: deleteEngineData, execute: executeDeleteEngine, error: deleteEngineErrors } = useMutation(DeleteEngineDocument);
    let deleteEngine = () => {
      if (confirm("Are you sure you want to delete this engine?")) {
        executeDeleteEngine({ id: props.id }).then(() => {
          if (deleteEngineData.value?.deleteEngine?.deleted) {
            router.push({ name: 'Engines' });
          } else {
            // TODO: Error handling.
            console.log(`Error: ${deleteEngineErrors.value}`);
          }
        });
      }
    };

    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanEdit = userSignedIn;
    const userCanDelete = computed(() => ['ADMIN', 'MODERATOR'].includes(store.state.currentUser.role));

    return {
      data,
      execute,
      wikidataUrl,
      deleteEngine,
      userSignedIn,
      userCanDelete,
      userCanEdit,
      pageInfo
    };
  }
});
</script>
