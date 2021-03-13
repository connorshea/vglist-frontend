<template>
  <div class="is-fullwidth">
    <button
      v-show="isInLibrary"
      @click="editGameInLibrary()"
      class="button is-fullwidth is-primary mr-5 mr-0-mobile"
    >
      <SvgIcon :name="'pencil'" :classes="['icon']" :fill="'white'" :size="15"/>
      <span>Edit game in library</span>
    </button>
    <button
      v-show="isInLibrary"
      @click="removeGameFromLibrary()"
      class="button is-fullwidth is-danger mr-5 mr-0-mobile"
    >
      <SvgIcon :name="'remove'" :classes="['icon']" :fill="'white'" :size="15"/>
      <span>Remove from library</span>
    </button>
    <button
      v-show="!isInLibrary"
      @click="addGameToLibrary()"
      class="button is-fullwidth is-primary mr-5 mr-0-mobile"
    >
      <SvgIcon :name="'plus'" :classes="['icon']" :fill="'white'"/>
      <span>Add to library</span>
    </button>

    <GameModal
      v-if="isModalActive"
      :isActive="isModalActive"
      :gameModalState="gameModalState"
      v-bind="mutableGamePurchase"
      v-on:close="deactivateModal"
      v-on:closeAndRefresh="closeAndRefresh"
      v-on:create="onSubmit"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import GameModal from '@/components/GameModal.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { RemoveGameFromLibraryDocument } from '@/generated/graphql';
import { useMutation } from 'villus';

export default defineComponent({
  name: 'AddGameToLibrary',
  components: {
    SvgIcon,
    GameModal
  },
  props: {
    game: {
      type: Object,
      required: true
    },
    isInLibrary: {
      type: Boolean,
      required: true
    }
  },
  setup(props, context) {
    let mutableGamePurchase = ref({});
    let isModalActive = ref(false);

    const gameModalState = computed(() => props.isInLibrary ? 'update' : 'createWithGame');

    const activateModal = (game = {}) => {
      let html = document.querySelector('html');
      html?.classList.add('is-clipped');

      if (Object.keys(mutableGamePurchase.value).length === 0) {
        mutableGamePurchase.value = { game: game };
      }
      isModalActive.value = true;
    };

    const deactivateModal = () => {
      let html = document.querySelector('html');
      html?.classList.remove('is-clipped');

      isModalActive.value = false;
    };

    const closeAndRefresh = () => deactivateModal();
    const addGameToLibrary = () => {
      activateModal(props.game);
    };
    const editGameInLibrary = () => activateModal(props.game);

    const { execute: executeRemoveGameFromLibrary } = useMutation(RemoveGameFromLibraryDocument);

    const removeGameFromLibrary = () => {
      executeRemoveGameFromLibrary({ id: props.game.id });
      context.emit('refresh');
    };

    const onSubmit = () => {
      console.log('TODO, reload page?');
    };

    return {
      mutableGamePurchase,
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
