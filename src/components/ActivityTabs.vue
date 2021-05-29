<template>
  <div class="tabs" v-if="userSignedIn">
    <ul>
      <router-link :to="{ name: 'FollowingActivity' }" custom v-slot="{ href, navigate, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate">Following</a>
        </li>
      </router-link>
      <router-link :to="{ name: 'Activity' }" custom v-slot="{ href, navigate, isExactActive }">
        <li :class="[isExactActive && 'is-active']">
          <a :href="href" @click="navigate">Global</a>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ActivityTabs',
  props: {
    userSignedIn: {
      type: Boolean,
      required: true
    }
  }
});
</script>
