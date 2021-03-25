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
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import GenreForm from '@/components/forms/GenreForm.vue';

export default defineComponent({
  name: 'CreateGenre',
  components: {
    GenreForm
  },
  setup(_props, context) {
    const genre: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      genre
    };
  }
});
</script>
