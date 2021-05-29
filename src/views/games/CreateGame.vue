<template>
  <div class="create-game">
    <template v-if="userCanCreate">
      <game-form
        v-bind="game"
        :form-state="'create'"
      />
    </template>
    <template v-else>
      <p>You cannot create a game.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import GameForm from '@/components/forms/GameForm.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CreateGame',
  components: {
    GameForm
  },
  setup() {
    const game: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null
    });

    const store = useStore();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      game
    };
  }
});
</script>
