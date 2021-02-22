<template>
  <div id="app">
    <NavBar></NavBar>

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
import { computed, defineComponent } from '@vue/composition-api';
import NavBar from '@/components/NavBar.vue'; // @ is an alias to /src
import { useClient, defaultPlugins } from 'villus';
import { authPlugin } from './auth-plugin';

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  },
  setup(_props, context) {
    // TODO: Replace `root.$store` with `useStore` in Vue 3.
    // TODO: Replace `root.$router` and `root.$route` with `useRouter` and
    //       `useRoute` in Vue 3.
    context.root.$store.dispatch('acquireAccessToken').then(() => {
      // Remove the 'code' parameter from the current URL, if the parameter exists.
      if (window.location.href.match(/code=(.*)/)?.[1] !== undefined) {
        context.root.$router.replace(context.root.$route.path);
      }
    });

    const currentRouteName = computed(() => {
      return context.root.$route.name;
    });

    useClient({
      url: `${process.env.VUE_APP_VGLIST_HOST_URL}/graphql`,
      use: [
        authPlugin({ accessToken: context.root.$store.state.accessToken }),
        ...defaultPlugins()
      ]
    });

    return {
      currentRouteName
    };
  }
});
</script>
