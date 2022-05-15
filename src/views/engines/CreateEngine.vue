<template>
  <div class="create-engine">
    <template v-if="userCanCreate">
      <engine-form
        v-bind="engine"
        :form-state="'create'"
      />
    </template>
    <template v-else>
      <p>You cannot create an engine.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import EngineForm from '@/components/forms/EngineForm.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'CreateEngine',
  components: {
    EngineForm
  },
  setup() {
    const engine: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null,
    });

    const store = useStore<State>();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      engine
    };
  }
});
</script>
