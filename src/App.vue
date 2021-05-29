<template>
  <div id="app">
    <NavBar/>

    <!-- This is a bit of a hack to make it so the Home page uses a layout
         without padding/margins. -->
    <template v-if="currentRouteName === 'Home'">
      <router-view/>
    </template>
    <template v-else>
      <div class="section">
        <div class="container is-fluid pr-0-mobile pl-0-mobile">
          <router-view/>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue'; // @ is an alias to /src
import { useClient, defaultPlugins } from 'villus';
import { authPlugin } from './auth-plugin';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    store.dispatch('acquireAccessToken').then(() => {
      // Remove the 'code' parameter from the current URL, if the parameter exists.
      if (window.location.href.match(/code=(.*)/)?.[1] !== undefined) {
        router.replace(route.path);
      }
    });

    const currentRouteName = computed(() => {
      return route.name;
    });

    useClient({
      url: `${process.env.VUE_APP_VGLIST_HOST_URL}/graphql`,
      use: [
        authPlugin({ accessToken: store.state.accessToken }),
        ...defaultPlugins()
      ]
    });

    return {
      currentRouteName
    };
  }
});
</script>
