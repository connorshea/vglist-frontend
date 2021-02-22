<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item has-text-weight-semibold" title='vglist Home'>
        <img alt="vglist logo" src="@/assets/images/vglist-logo.svg" width="80px" class="mt-5" aria-hidden="true">
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
        <div class="navbar-item has-dropdown field mt-10">
          <Search/>
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
              <div v-for="navBarItem in navBarItems" :key="navBarItem.id">
                <hr class="navbar-divider" v-if="navBarItem.title === null">
                <a class="navbar-item" v-else-if="navBarItem.clickAction !== undefined" @click="resolveClickAction(navBarItem.clickAction)">
                  {{ navBarItem.title }}
                </a>
                <a class="navbar-item" v-else-if="navBarItem.router === false" :href="navBarItem.path">
                  {{ navBarItem.title }}
                </a>
                <router-link :to="navBarItem.path" class="navbar-item" v-else>
                  {{ navBarItem.title }}
                </router-link>
              </div>
            </div>
          </div>

          <div v-for="navBarItem in navBarItems" :key="navBarItem.id">
            <template v-if="navBarItem.title !== null">
              <a class="navbar-item is-hidden-desktop" v-if="navBarItem.clickAction !== undefined" @click="resolveClickAction(navBarItem.clickAction)">
                {{ navBarItem.title }}
              </a>
              <a class="navbar-item is-hidden-desktop" v-else-if="navBarItem.router === false" :href="navBarItem.path">
                {{ navBarItem.title }}
              </a>
              <router-link :to="navBarItem.path" class="navbar-item is-hidden-desktop" v-else>
                {{ navBarItem.title }}
              </router-link>
            </template>
          </div>
        </template>
        <template v-else>
          <template v-if="showAuthenticate">
            <a class="navbar-item" :href="oauthUrl">Authenticate</a>
          </template>
          <!-- "Sign up" intentionally does nothing for now. -->
          <a class="navbar-item">Sign up</a>
          <a class="navbar-item" @click="signIn">Sign in</a>
          <div v-for="navBarItem in navBarItems" :key="navBarItem.id">
            <template v-if="navBarItem.title !== null">
              <a class="navbar-item is-hidden-desktop" v-if="navBarItem.clickAction !== undefined" @click="resolveClickAction(navBarItem.clickAction)">
                {{ navBarItem.title }}
              </a>
              <a class="navbar-item is-hidden-desktop" v-else-if="navBarItem.router === false" :href="navBarItem.path">
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
              <div v-for="navBarItem in navBarItems" :key="navBarItem.id">
                <hr class="navbar-divider" v-if="navBarItem.title === null">
                <a class="navbar-item" v-else-if="navBarItem.clickAction !== undefined" @click="resolveClickAction(navBarItem.clickAction)">
                  {{ navBarItem.title }}
                </a>
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
import { defineComponent } from '@vue/composition-api';
import { mapState } from 'vuex';
import Search from '@/components/Search.vue';
import { RawLocation } from 'vue-router';

// Update this to include other valid click actions later.
type clickAction = 'signOut';

export default defineComponent({
  name: 'NavBar',
  components: {
    Search
  },
  methods: {
    signIn() {
      // This is pretty much just a fake sign in for a user.
      this.$store.commit(
        'signIn',
        {
          username: 'connor',
          slug: 'connor',
          role: 'admin'
        }
      );
    },
    signOut() {
      // This is pretty much just a fake sign out for a user.
      this.$store.commit('signOut');
    },
    // Bit of a hack to allow a dynamic click action.
    resolveClickAction(funcName: clickAction) {
      this[funcName]();
    }
  },
  computed: {
    navBarItems: function() {
      let items: Array<{ id?: number; title: string | null; path: RawLocation | null; clickAction?: clickAction; router: boolean }> = [];

      // Include profile, admin, settings, and sign out if the user is logged in.
      if (this.userSignedIn) {
        items = items.concat({
          title: 'Profile',
          path: {
            path: `/users/${this.currentUser.slug}`
          },
          router: true
        })

        if (this.currentUser.role == 'admin') {
          items = items.concat({
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
              title: 'Sign out',
              clickAction: 'signOut',
              path: null,
              router: false
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

      // Add `id` to all items in the items array so we can use it as the key.
      items = items.map((item, i) => ({ id: i, ...item }));

      return items;
    },
    oauthUrl: function(): string {
      return `${process.env.VUE_APP_VGLIST_HOST_URL}/settings/oauth/authorize?client_id=${this.$store.state.clientId}&redirect_uri=${this.$store.state.redirectUri}&response_type=code`;
    },
    /**
     * Whether to show the authenticate button.
     */
    showAuthenticate: function(): boolean {
      return this.$store.state.accessToken === null;
    },
    ...mapState({
      // These are `any` because TypeScript flips out if you tell it the actual
      // types.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userSignedIn: (state: any) => state.userSignedIn,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      currentUser: (state: any) => state.currentUser
    })
  }
});
</script>
