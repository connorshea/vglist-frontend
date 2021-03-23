<template>
  <div class="edit-engine" v-if="isLoaded">
    <template v-if="userCanEdit">
      <EngineForm
        v-bind="engine"
        :form-state="'update'"
      />
    </template>
    <template v-else>
      <p>You cannot edit this engine.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { EngineDocument } from '@/generated/graphql';
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import { useQuery } from 'villus';
import EngineForm from '@/components/EngineForm.vue';

export default defineComponent({
  name: 'EditEngine',
  components: {
    EngineForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const { execute: executeQuery } = useQuery({
      query: EngineDocument,
      variables: {
        id: props.id
      },
      fetchOnMount: false
    });

    const engine: Ref<{ id: string, name: string | null, wikidataId: number | string | null }> = ref({
      id: props.id,
      name: null,
      wikidataId: null
    });

    // Don't try to render the form until the data is fully loaded, to make
    // sure we can pre-populate the form as necessary.
    const isLoaded = ref(false);

    executeQuery().then(({ data }) => {
      engine.value.name = data?.engine?.name ?? null;
      engine.value.wikidataId = data?.engine?.wikidataId ?? null;
      isLoaded.value = true;
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanEdit = userSignedIn;

    return {
      isLoaded,
      userSignedIn,
      userCanEdit,
      engine
    };
  }
});
</script>
