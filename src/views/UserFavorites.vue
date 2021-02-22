<template>
  <div class="favorites">
    <!-- TODO -->
    <p>Favorites</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'UserFavorites',
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
