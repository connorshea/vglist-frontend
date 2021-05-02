<template>
  <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile" v-if="userSignedIn">
    <div class="tabs">
      <ul>
        <template v-for="tab in tabs">
          <!-- The janky v-slot workaround is necessary for the parent <li> to
               have the active class applied to it. -->
          <router-link :key="tab.id" :to="tab.path" v-slot="{ href, navigate, isExactActive }">
            <li :class="[isExactActive && 'is-active']">
              <a :href="href" @click="navigate">{{ tab.name }}</a>
            </li>
          </router-link>
        </template>
      </ul>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Admin',
  setup(_props, context) {
    const userSignedIn = computed(() => {
      return context.root.$store.state.userSignedIn;
    });

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
