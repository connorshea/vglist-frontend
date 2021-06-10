<template>
  <aside class="menu">
    <p class="menu-label">
      Settings
    </p>
    <ul class="menu-list">
      <router-link :to="{ name: 'SettingsProfile' }" custom v-slot="{ href, navigate, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate">Profile</a>
        </li>
      </router-link>
      <router-link :to="{ name: 'SettingsAccount' }" custom v-slot="{ href, navigate, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate">Account</a>
        </li>
      </router-link>
      <router-link :to="{ name: 'SettingsImport' }" custom v-slot="{ href, navigate, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate">Import</a>
        </li>
      </router-link>
      <router-link :to="{ name: 'SettingsExport' }" custom v-slot="{ href, navigate, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate">Export</a>
        </li>
      </router-link>
      <router-link :to="{ name: 'SettingsApplications' }" custom v-slot="{ href, navigate, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate">Applications</a>
        </li>
      </router-link>
      <router-link :to="{ name: 'SettingsDeveloper' }" custom v-slot="{ href, navigate, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate">Developer</a>
        </li>
      </router-link>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsSidebar'
});
</script>
