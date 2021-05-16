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
          <GameCard :game="game"/>
        </div>
      </div>

      <!-- <%= paginate @games %> -->
    </template>
    <template v-else>
      <p class='has-text-centered mt-50 has-text-muted'>This engine doesn't have any games yet.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { DeleteEngineDocument, EngineDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useMutation, useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';

export default defineComponent({
  name: 'Engine',
  components: {
    GameCard
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
  setup(props, context) {
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

    const { data } = useQuery({
      query: EngineDocument,
      variables: queryVariables
    });

    const wikidataUrl = computed(() => {
      return `https://www.wikidata.org/wiki/Q${data.value?.engine?.wikidataId}`;
    });

    const { data: deleteEngineData, execute: executeDeleteEngine, error: deleteEngineErrors } = useMutation(DeleteEngineDocument);
    let deleteEngine = () => {
      if (confirm("Are you sure you want to delete this engine?")) {
        executeDeleteEngine({ id: props.id }).then(() => {
          if (deleteEngineData.value?.deleteEngine?.deleted) {
            context.root.$router.push({ name: 'Engines' });
          } else {
            // TODO: Error handling.
            console.log(`Error: ${deleteEngineErrors.value}`);
          }
        });
      }
    };

    const userSignedIn = computed(() => {
      return context.root.$store.state.userSignedIn;
    });

    const userCanEdit = userSignedIn;
    const userCanDelete = computed(() => ['ADMIN', 'MODERATOR'].includes(context.root.$store.state.currentUser.role));

    return {
      data,
      wikidataUrl,
      deleteEngine,
      userSignedIn,
      userCanDelete,
      userCanEdit
    };
  }
});
</script>
