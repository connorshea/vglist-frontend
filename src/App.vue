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
import Vue from 'vue';
import NavBar from '@/components/NavBar.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'Home',
  components: {
    NavBar
  },
  created: function() {
    // On create, attempt to acquire an access token if possible.
    this.$store.dispatch('acquireAccessToken').then(() => {
      // Remove the 'code' parameter from the current URL, if the parameter exists.
      if (window.location.href.match(/code=(.*)/)?.[1] !== undefined) {
        this.$router.replace(this.$route.path);
      }
    });
  }
});
</script>
