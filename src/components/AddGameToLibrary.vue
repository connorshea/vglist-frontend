<template>
  <div class="is-fullwidth">
    <button
      v-show="isInLibrary"
      @click="editGameInLibrary()"
      class="button is-fullwidth is-primary mr-5 mr-0-mobile"
    >
      <svg-icon :name="'pencil'" :classes="['icon']" :fill="'white'" :size="15"/>
      <span>Edit game in library</span>
    </button>
    <button
      v-show="isInLibrary"
      @click="removeGameFromLibrary()"
      class="button is-fullwidth is-danger mr-5 mr-0-mobile"
    >
      <svg-icon :name="'remove'" :classes="['icon']" :fill="'white'" :size="15"/>
      <span>Remove from library</span>
    </button>
    <button
      v-show="!isInLibrary"
      @click="addGameToLibrary()"
      class="button is-fullwidth is-primary mr-5 mr-0-mobile"
    >
      <svg-icon :name="'plus'" :classes="['icon']" :fill="'white'"/>
      <span>Add to library</span>
    </button>

    <game-modal
      v-if="isModalActive"
      :is-active="isModalActive"
      :game-modal-state="gameModalState"
      v-bind="gamePurchase"
      @close="deactivateModal"
      @closeAndRefresh="closeAndRefresh"
      @create="onSubmit"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import GameModal from '@/components/GameModal.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { Game, GamePurchaseDocument, RemoveGameFromLibraryDocument } from '@/generated/graphql';
import { useMutation, useQuery } from 'villus';

export default defineComponent({
  name: 'AddGameToLibrary',
  components: {
    SvgIcon,
    GameModal
  },
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    },
    isInLibrary: {
      type: Boolean,
      required: true
    }
  },
  emits: ['refresh'],
  setup(props, context) {
    let gamePurchase = ref({});
    let isModalActive = ref(false);

    const gameModalState = computed(() => props.isInLibrary ? 'update' : 'createWithGame');

    let queryVariables = ref({ id: props.game.gamePurchaseId || '' });
    const { data: gamePurchaseData, execute: executeGamePurchase } = useQuery({
      query: GamePurchaseDocument,
      variables: queryVariables,
      fetchOnMount: false,
      cachePolicy: 'network-only'
    });

    const activateModal = (game = {}, loadGamePurchase = false) => {
      let html = document.querySelector('html');
      html?.classList.add('is-clipped');

      if (loadGamePurchase) {
        executeGamePurchase().then(() => {
          if (gamePurchaseData.value !== null) {
            // Doing it this way because the spread operator won't work correctly for some reason.
            let gamePurchaseValues = Object.assign({}, gamePurchaseData.value?.gamePurchase);
            delete gamePurchaseValues['stores'];
            delete gamePurchaseValues['platforms'];

            gamePurchase.value = {
              id: props.game.gamePurchaseId,
              game: game,
              platforms: gamePurchaseData.value?.gamePurchase?.platforms?.nodes,
              stores: gamePurchaseData.value?.gamePurchase?.stores?.nodes,
              ...gamePurchaseValues
            };
          } else {
            gamePurchase.value = { game: game };
          }
          isModalActive.value = true;
        });
      } else {
        gamePurchase.value = { game: game };
        isModalActive.value = true;
      }
    };

    const deactivateModal = () => {
      let html = document.querySelector('html');
      html?.classList.remove('is-clipped');

      isModalActive.value = false;
    };

    const closeAndRefresh = () => {
      deactivateModal();
      context.emit('refresh');
    }
    const addGameToLibrary = () => {
      activateModal(props.game);
    };
    const editGameInLibrary = () => {
      activateModal(props.game, true);
    };

    const { execute: executeRemoveGameFromLibrary } = useMutation(RemoveGameFromLibraryDocument);

    const removeGameFromLibrary = () => {
      if (confirm("Are you sure you want to remove this game from your library?")) {
        executeRemoveGameFromLibrary({ id: props.game.id }).then(() => {
          context.emit('refresh');
        });
      }
    };

    const onSubmit = (submittedGamePurchase: { id: string }) => {
      queryVariables.value = { id: submittedGamePurchase.id };
      executeGamePurchase().then(() => {
        // TODO: Error handling.
        context.emit('refresh');
      });
    };

    return {
      gamePurchase,
      isModalActive,
      gameModalState,
      activateModal,
      deactivateModal,
      closeAndRefresh,
      addGameToLibrary,
      editGameInLibrary,
      removeGameFromLibrary,
      onSubmit
    }
  }
});
</script>
