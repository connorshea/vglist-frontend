<template>
  <div class="edit-store" v-if="isLoaded">
    <template v-if="userCanEdit">
      <StoreForm
        v-bind="store"
        :form-state="'update'"
      />
    </template>
    <template v-else>
      <p>You cannot edit this store.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { StoreDocument } from '@/generated/graphql';
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import { useQuery } from 'villus';
import StoreForm from '@/components/forms/StoreForm.vue';

export default defineComponent({
  name: 'EditStore',
  components: {
    StoreForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const { execute: executeQuery } = useQuery({
      query: StoreDocument,
      variables: {
        id: props.id
      },
      fetchOnMount: false
    });

    const store: Ref<{ id: string, name: string | null }> = ref({
      id: props.id,
      name: null
    });

    // Don't try to render the form until the data is fully loaded, to make
    // sure we can pre-populate the form as necessary.
    const isLoaded = ref(false);

    executeQuery().then(({ data }) => {
      store.value.name = data?.store?.name ?? null;
      isLoaded.value = true;
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanEdit = userSignedIn;

    return {
      isLoaded,
      userSignedIn,
      userCanEdit,
      store
    };
  }
});
</script>
