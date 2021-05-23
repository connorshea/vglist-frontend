<template>
  <!-- Display errors if there are any. -->
  <div class="notification errors-notification is-danger" v-if="errors.length > 0">
    <p>
      {{ errors.length > 1 ? 'Errors' : 'An error' }} prevented this game from
      being saved:
    </p>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ErrorBox',
  props: {
    errors: {
      type: Array,
      required: false,
      default: () => []
    }
  }
});
</script>
