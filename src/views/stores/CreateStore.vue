<template>
  <div class="create-store">
    <template v-if="userCanCreate">
      <StoreForm
        v-bind="store"
        :form-state="'create'"
      />
    </template>
    <template v-else>
      <p>You cannot create a store.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import StoreForm from '@/components/StoreForm.vue';

export default defineComponent({
  name: 'CreateStore',
  components: {
    StoreForm
  },
  setup(_props, context) {
    const store: Ref<{ name: string | null }> = ref({
      name: null,
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      store
    };
  }
});
</script>
