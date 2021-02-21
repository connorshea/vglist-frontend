<template>
  <div id="app">
    <NavBar></NavBar>

    <div class="section">
      <div class="container is-fluid pr-0-mobile pl-0-mobile">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import NavBar from '@/components/NavBar.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
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

    return {};
  }
});
</script>
