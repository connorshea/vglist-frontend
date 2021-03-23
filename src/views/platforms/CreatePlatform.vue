<template>
  <div class="create-platform">
    <template v-if="userCanCreate">
      <PlatformForm
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
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import PlatformForm from '@/components/PlatformForm.vue';

export default defineComponent({
  name: 'CreatePlatform',
  components: {
    PlatformForm
  },
  setup(_props, context) {
    const platform: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      platform
    };
  }
});
</script>
