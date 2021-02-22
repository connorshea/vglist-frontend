<template>
  <div class="following">
    <!-- TODO -->
    <p>Following</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'UserFollowing',
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
