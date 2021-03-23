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
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import { useQuery } from 'villus';
import GenreForm from '@/components/GenreForm.vue';

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
  setup(props, context) {
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

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

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