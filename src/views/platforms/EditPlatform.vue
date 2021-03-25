<template>
  <div class="edit-platform" v-if="isLoaded">
    <template v-if="userCanEdit">
      <PlatformForm
        v-bind="platform"
        :form-state="'update'"
      />
    </template>
    <template v-else>
      <p>You cannot edit this platform.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { PlatformDocument } from '@/generated/graphql';
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import { useQuery } from 'villus';
import PlatformForm from '@/components/forms/PlatformForm.vue';

export default defineComponent({
  name: 'EditPlatform',
  components: {
    PlatformForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const { execute: executeQuery } = useQuery({
      query: PlatformDocument,
      variables: {
        id: props.id
      },
      fetchOnMount: false
    });

    const platform: Ref<{ id: string, name: string | null, wikidataId: number | string | null }> = ref({
      id: props.id,
      name: null,
      wikidataId: null
    });

    // Don't try to render the form until the data is fully loaded, to make
    // sure we can pre-populate the form as necessary.
    const isLoaded = ref(false);

    executeQuery().then(({ data }) => {
      platform.value.name = data?.platform?.name ?? null;
      platform.value.wikidataId = data?.platform?.wikidataId ?? null;
      isLoaded.value = true;
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanEdit = userSignedIn;

    return {
      isLoaded,
      userSignedIn,
      userCanEdit,
      platform
    };
  }
});
</script>
