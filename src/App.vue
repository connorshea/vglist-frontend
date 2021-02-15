<template>
  <div id="app">
    <NavBar :currentUser="{ username: 'connor' }" :userSignedIn="false"></NavBar>

    <div class="section">
      <div class="container is-fluid pr-0-mobile pl-0-mobile">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    NavBar
  },
  created: function() {
    this.$store.dispatch('acquireAccessToken').then(() => {
      // Remove the 'code' parameter from the current URL.
      this.$router.replace(this.$route.path);
    });
  }
});
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
</style>
