<template>
  <div class="home">
    <NavBar :currentUser="{ currentUser: 'connor' }" :userSignedIn="false"></NavBar>
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
