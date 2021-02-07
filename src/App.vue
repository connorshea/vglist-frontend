<template>
  <div id="app">
    <NavBar :currentUser="{ username: 'connor' }" :userSignedIn="false"></NavBar>
    <router-view/>
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
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
