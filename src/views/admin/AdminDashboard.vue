<template>
  <div>
    <!-- TODO: Statistics tables. -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AdminDashboard',
  setup(_props, context) {
    const userSignedIn = computed(() => {
      return context.root.$store.state.userSignedIn;
    });

    return {
      userSignedIn
    };
  }
});
</script>
