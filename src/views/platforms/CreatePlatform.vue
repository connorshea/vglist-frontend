<template>
  <div class="create-platform">
    <template v-if="userCanCreate">
      <platform-form
        v-bind="platform"
        :form-state="'create'"
      />
    </template>
    <template v-else>
      <p>You cannot create a platform.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import PlatformForm from '@/components/forms/PlatformForm.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'CreatePlatform',
  components: {
    PlatformForm
  },
  setup() {
    const platform: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null
    });

    const store = useStore<State>();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      platform
    };
  }
});
</script>
