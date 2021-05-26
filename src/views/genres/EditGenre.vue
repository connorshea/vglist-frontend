<template>
  <div class="edit-genre" v-if="isLoaded">
    <template v-if="userCanEdit">
      <GenreForm
        v-bind="genre"
        :form-state="'update'"
      />
    </template>
    <template v-else>
      <p>You cannot edit this genre.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { GenreDocument } from '@/generated/graphql';
import { computed, defineComponent, Ref, ref } from 'vue';
import { useQuery } from 'villus';
import GenreForm from '@/components/forms/GenreForm.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'EditGenre',
  components: {
    GenreForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { execute: executeQuery } = useQuery({
      query: GenreDocument,
      variables: {
        id: props.id
      },
      fetchOnMount: false
    });

    const genre: Ref<{ id: string, name: string | null, wikidataId: number | string | null }> = ref({
      id: props.id,
      name: null,
      wikidataId: null
    });

    // Don't try to render the form until the data is fully loaded, to make
    // sure we can pre-populate the form as necessary.
    const isLoaded = ref(false);

    executeQuery().then(({ data }) => {
      genre.value.name = data?.genre?.name ?? null;
      genre.value.wikidataId = data?.genre?.wikidataId ?? null;
      isLoaded.value = true;
    });

    const store = useStore();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanEdit = userSignedIn;

    return {
      isLoaded,
      userSignedIn,
      userCanEdit,
      genre
    };
  }
});
</script>
