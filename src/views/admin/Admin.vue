<template>
  <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile" v-if="userSignedIn">
    <div class="tabs">
      <ul>
        <template v-for="tab in tabs" :key="tab.id">
          <!-- The janky v-slot workaround is necessary for the parent <li> to
               have the active class applied to it. -->
          <router-link :to="tab.path" custom v-slot="{ href, navigate, isExactActive }">
            <li :class="[isExactActive && 'is-active']">
              <a :href="href" @click="navigate">{{ tab.name }}</a>
            </li>
          </router-link>
        </template>
      </ul>
    </div>

    <router-view/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Admin',
  setup() {
    const store = useStore();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const tabs = [
      {
        name: 'Dashboard',
        path: {
          name: 'AdminDashboard',
        }
      },
      {
        name: 'Wikidata Blocklist',
        path: {
          name: 'WikidataBlocklist'
        }
      },
      {
        name: 'Steam Blocklist',
        path: {
          name: 'SteamBlocklist'
        }
      }
    ];

    return {
      userSignedIn,
      tabs
    };
  }
});
</script>
