<template>
  <div>
    <a
      @click="activateModal"
      class="dropdown-item has-text-danger js-merge-games-button"
      data-game-id="gameId">
      Merge
    </a>

    <merge-games-modal
      v-if="isModalActive"
      :isActive="isModalActive"
      :game="game"
      @close="deactivateModal"
    ></merge-games-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MergeGamesModal from '@/components/MergeGamesModal.vue';

export default defineComponent({
  name: 'MergeGamesButton',
  components: {
    MergeGamesModal
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  setup() {
    const isModalActive = ref(false);

    const activateModal = () => {
      let html = document.querySelector('html');
      html?.classList.add('is-clipped');

      isModalActive.value = true;
    };

    const deactivateModal = () => {
      let html = document.querySelector('html');
      html?.classList.remove('is-clipped');

      isModalActive.value = false;
    };

    return {
      isModalActive,
      activateModal,
      deactivateModal
    }
  }
});
</script>
