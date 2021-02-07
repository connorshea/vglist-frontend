<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item has-text-weight-semibold" title='vglist Home'>
        <img alt="vglist logo" src="../assets/vglist-logo.svg" width="80px" class="mt-5" aria-hidden="true">
      </router-link>
      <!-- Hamburger menu for mobile -->
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu is-shadowless" id="navMenu">
      <div class="navbar-start">
        <!-- Placeholder search input until the Vue component loads. -->
        <div class="navbar-item has-dropdown field mt-10">
          <p class="control">
            Search
          </p>
        </div>

        <!-- Link to the global activity if the user isn't logged in. -->
        <router-link :to="userSignedIn ? '/activity/following' : '/activity'" class="navbar-item">Activity</router-link>
        <router-link to="/games" class="navbar-item">Games</router-link>
        <router-link to="/users" class="navbar-item">Users</router-link>

        <!-- Include these on mobile. -->
        <router-link to="/platforms" class="navbar-item is-hidden-desktop">Platforms</router-link>
        <router-link to="/genres" class="navbar-item is-hidden-desktop">Genres</router-link>
        <router-link to="/companies" class="navbar-item is-hidden-desktop">Companies</router-link>
        <router-link to="/engines" class="navbar-item is-hidden-desktop">Engines</router-link>
        <router-link to="/series" class="navbar-item is-hidden-desktop">Series</router-link>
        <router-link to="/stores" class="navbar-item is-hidden-desktop">Stores</router-link>

        <!-- Hide these behind a dropdown on desktop. -->
        <div class="navbar-item has-dropdown is-hoverable is-hidden-touch">
          <a class="navbar-link" aria-haspopup="menu" aria-controls="navbar-dropdown-more-mobile">More</a>

          <div id="navbar-dropdown-more-mobile" class="navbar-dropdown is-right">
            <router-link to="/platforms" class="navbar-item">Platforms</router-link>
            <router-link to="/genres" class="navbar-item">Genres</router-link>
            <router-link to="/companies" class="navbar-item">Companies</router-link>
            <router-link to="/engines" class="navbar-item">Engines</router-link>
            <router-link to="/series" class="navbar-item">Series</router-link>
            <router-link to="/stores" class="navbar-item">Stores</router-link>
          </div>
        </div>
      </div>

      <!-- This is a bit screwy because we hide the dropdown items on mobile
          and replace them with normal items so stuff doesn't look as weird. -->
      <div class="navbar-end">
        <template v-if="userSignedIn">
          <div class="navbar-item has-dropdown is-hoverable is-hidden-touch">
            <a class="navbar-link">
              <!-- userAvatar(currentUser, size: :small) -->
              <span class='pl-10'>{{ currentUser.username }}</span>
            </a>

            <div class="navbar-dropdown is-right">
              <div v-for="navBarItem in this.navBarItems" :key="navBarItem.path">
                <hr class="navbar-divider" v-if="navBarItem.title === null">
                <a class="navbar-item" v-else-if="navBarItem.router === false" :href="navBarItem.path">
                  {{ navBarItem.title }}
                </a>
                <router-link :to="navBarItem.path" class="navbar-item" v-else>
                  {{ navBarItem.title }}
                </router-link>
              </div>
            </div>
          </div>

          <div v-for="navBarItem in this.navBarItems" :key="navBarItem.path">
            <template v-if="navBarItem.title !== null">
              <a class="navbar-item is-hidden-desktop" v-if="navBarItem.router === false" :href="navBarItem.path">
                {{ navBarItem.title }}
              </a>
              <router-link :to="navBarItem.path" class="navbar-item is-hidden-desktop" v-else>
                {{ navBarItem.title }}
              </router-link>
            </template>
          </div>
        </template>
        <template v-else>
          <router-link to="/sign_up" class="navbar-item">Sign up</router-link>
          <router-link to="/sign_in" class="navbar-item">Sign in</router-link>
          <div v-for="navBarItem in this.navBarItems" :key="navBarItem.path">
            <template v-if="navBarItem.title !== null">
              <a class="navbar-item is-hidden-desktop" v-if="navBarItem.router === false" :href="navBarItem.path">
                {{ navBarItem.title }}
              </a>
              <router-link :to="navBarItem.path" class="navbar-item is-hidden-desktop" v-else>
                {{ navBarItem.title }}
              </router-link>
            </template>
          </div>
          
          <div class="navbar-item has-dropdown is-hoverable is-hidden-touch">
            <a class="navbar-link" aria-haspopup="menu" aria-controls="navbar-dropdown-more-desktop">More</a>
            <div id="navbar-dropdown-more-desktop" class="navbar-dropdown is-right">
              <div v-for="navBarItem in this.navBarItems" :key="navBarItem.path">
                <hr class="navbar-divider" v-if="navBarItem.title === null">
                <a class="navbar-item" v-else-if="navBarItem.router === false" :href="navBarItem.path">
                  {{ navBarItem.title }}
                </a>
                <router-link :to="navBarItem.path" class="navbar-item" v-else>
                  {{ navBarItem.title }}
                </router-link>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NavBar',
  props: {
    userSignedIn: Boolean,
    currentUser: Object
  },
  computed: {
    navBarItems: function() {
      let items: Array<{ title: string | null; path: string | null; router: boolean }> = [];

      // Include profile, admin, settings, and sign out if the user is logged in.
      if (this.userSignedIn) {
        items.concat({
          title: 'Profile',
          path: '/users/1', // TODO: Fix this so it uses the current user.
          router: true
        })

        // TODO: Fix this check so it checks whether the user should have permission.
        if (this.currentUser) {
          items.concat({
            title: 'Admin',
            path: '/admin',
            router: true
          })
        }

        items = items.concat(
          [
            {
              title: 'Settings',
              path: '/settings',
              router: true
            },
            {
              title: 'Sign out', // TODO: This should trigger a DELETE.
              path: '/sign_out',
              router: true
            },
            {
              title: null,
              path: null,
              router: false
            }
          ]
        )
      }

      // Always provide the links to extra information no matter if the user is
      // logged in or not.
      items = items.concat(
        [
          {
            title: 'About',
            path: '/about',
            router: true
          },
          {
            title: 'Changelog',
            path: 'https://github.com/connorshea/vglist/blob/master/CHANGELOG.md',
            router: false
          },
          {
            title: 'GitHub',
            path: 'https://github.com/connorshea/vglist',
            router: false
          },
          {
            title: 'API Docs',
            path: 'https://github.com/connorshea/vglist/blob/master/API.md',
            router: false
          },
          {
            title: 'GraphiQL',
            path: '/graphiql',
            router: false
          },
          {
            title: 'Discord',
            path: 'https://discord.gg/Ma8Ztcc',
            router: false
          }
        ]
      )

      return items;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
