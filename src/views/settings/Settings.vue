<template>
  <div class="columns">
    <div class="column is-3-desktop">
      <div class="box">
        <settings-sidebar/>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettingsSidebar from '@/components/SettingsSidebar.vue';

export default defineComponent({
  name: 'Settings',
  components: {
    SettingsSidebar
  },
  setup() {
    return {};
  }
});
</script>
