<template>
  <div class="edit-engine" v-if="isLoaded">
    <template v-if="userCanEdit">
      <engine-form
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
import { computed, defineComponent, Ref, ref } from 'vue';
import { useQuery } from 'villus';
import EngineForm from '@/components/forms/EngineForm.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

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
  setup(props) {
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

    const store = useStore<State>();
    const userSignedIn = computed(() => store.state.userSignedIn);

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
