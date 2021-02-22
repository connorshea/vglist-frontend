<template>
  <div class="followers">
    <!-- TODO -->
    <p>Followers</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'UserFollowers',
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
