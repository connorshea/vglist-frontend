<template>
  <div class="create-store">
    <template v-if="userCanCreate">
      <store-form
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
import { computed, defineComponent, Ref, ref } from 'vue';
import StoreForm from '@/components/forms/StoreForm.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'CreateStore',
  components: {
    StoreForm
  },
  setup() {
    const store: Ref<{ name: string | null }> = ref({
      name: null,
    });

    const vuexStore = useStore<State>();
    const userSignedIn = computed(() => vuexStore.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      store
    };
  }
});
</script>
