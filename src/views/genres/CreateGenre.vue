<template>
  <div class="create-genre">
    <template v-if="userCanCreate">
      <GenreForm
        v-bind="genre"
        :form-state="'create'"
      />
    </template>
    <template v-else>
      <p>You cannot create a genre.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import GenreForm from '@/components/forms/GenreForm.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CreateGenre',
  components: {
    GenreForm
  },
  setup() {
    const genre: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null
    });

    const store = useStore();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      genre
    };
  }
});
</script>
