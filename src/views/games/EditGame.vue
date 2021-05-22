<template>
  <div class="edit-game" v-if="isLoaded">
    <template v-if="userCanEdit">
      <GameForm
        v-bind="game"
        :form-state="'update'"
      />
    </template>
    <template v-else>
      <p>You cannot edit this game.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { GameDocument } from '@/generated/graphql';
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import { useQuery } from 'villus';
import GameForm from '@/components/forms/GameForm.vue';

export default defineComponent({
  name: 'EditGame',
  components: {
    GameForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const { execute: executeQuery } = useQuery({
      query: GameDocument,
      variables: {
        id: props.id
      },
      fetchOnMount: false
    });

    const game: Ref<{ id: string, name: string | null, wikidataId: number | string | null }> = ref({
      id: props.id,
      name: null,
      wikidataId: null
    });

    // Don't try to render the form until the data is fully loaded, to make
    // sure we can pre-populate the form as necessary.
    const isLoaded = ref(false);

    executeQuery().then(({ data }) => {
      game.value.name = data?.game?.name ?? null;
      game.value.wikidataId = data?.game?.wikidataId ?? null;
      isLoaded.value = true;
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanEdit = userSignedIn;

    return {
      isLoaded,
      userSignedIn,
      userCanEdit,
      game
    };
  }
});
</script>
