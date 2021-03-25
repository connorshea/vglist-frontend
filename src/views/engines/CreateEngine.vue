<template>
  <div class="create-engine">
    <template v-if="userCanCreate">
      <EngineForm
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
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import EngineForm from '@/components/forms/EngineForm.vue';

export default defineComponent({
  name: 'CreateEngine',
  components: {
    EngineForm
  },
  setup(_props, context) {
    const engine: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      engine
    };
  }
});
</script>
