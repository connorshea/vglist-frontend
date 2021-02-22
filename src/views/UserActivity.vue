<template>
  <div class="activity">
    <!-- TODO -->
    <p>Activity</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'UserActivity',
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  setup() {
    // TODO
  }
});
</script>
