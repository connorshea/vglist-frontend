<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div @click="onClose" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ `Merge ${game.name} into another game` }}</p>
        <button @click="onClose" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body modal-card-body-allow-overflow">
        <!-- Display errors if there are any. -->
        <div class="notification errors-notification is-danger" v-if="errors.length > 0">
          <p>
            {{ errors.length > 1 ? 'Errors' : 'An error' }} prevented this game from
            being merged:
          </p>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <div>
          <single-select
            :label="'Game'"
            v-model="gameToKeep"
            :search-path="'gameSearch'"
            :graphql-query="GameSearchDocument"
            :max-height="'150px'"
            @update:modelValue="selectGame"
            :customOptionFunc="customOptionLabel"
          ></single-select>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button @click="mergeGames" class="button is-primary js-submit-button" :disabled="!gameSelected">Submit</button>
        <button @click="onClose" class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import SingleSelect from '@/components/fields/SingleSelect.vue';
import { GameSearchDocument, MergeGamesDocument } from '@/generated/graphql';
import { submitButtonErrorAnimation } from '@/helpers/submitButtonErrorAnimation';
import { useMutation } from 'villus';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MergeGamesModal',
  components: {
    SingleSelect
  },
  props: {
    game: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(props, context) {
    const gameSelected = ref(false);
    const errors: Ref<string[]> = ref([]);

    const router = useRouter();

    const selectGame = () => {
      gameSelected.value = true;
    };

    const onClose = () => {
      context.emit('close');
    };

    const { execute: executeMergeGames } = useMutation(MergeGamesDocument);

    // Include the vglist ID in the dropdown to help distinguish between games
    // that have the same name.
    const customOptionLabel = (item: { name: string; id: string; }) => {
      item.name = `${item.name} (${item.id})`;
      return item;
    };

    const mergeGames = () => {
      // Bail out early if the game we're trying to merge into is null.
      if (gameToKeep.value === null) { return; }
      executeMergeGames({ gameToMergeId: props.game.id, gameToKeepId: gameToKeep.value?.id }).then((result) => {
        if (result.error === null && gameToKeep.value !== null) {
          router.push({ name: 'Game', params: { id: gameToKeep.value?.id }});
          context.emit('close');
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = result.error.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    const gameToKeep: Ref<{ id: string, name: string } | null> = ref(null);

    return {
      gameSelected,
      selectGame,
      customOptionLabel,
      GameSearchDocument,
      onClose,
      mergeGames,
      errors,
      gameToKeep
    };
  }
});
</script>
