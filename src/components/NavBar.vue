<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'Home' }" class="navbar-item has-text-weight-semibold" title="vglist Home">
        <img src="@/assets/images/vglist-logo.svg" class="mt-5 navbar-logo" aria-hidden="true" alt="vglist logo">
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
        <search/>

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
              <img class="user-avatar" v-if="currentUser.avatarUrl !== null" :src="currentUser.avatarUrl">
              <img class="user-avatar" v-else src="@/assets/images/default-avatar.png">
              <span class="pl-10">{{ currentUser.username }}</span>
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
import { computed, defineComponent } from 'vue';
import Search from '@/components/Search.vue';
import { CurrentUserDocument } from '@/generated/graphql';
import { useQuery } from 'villus';
import { useStore } from 'vuex';
import { State } from '@/store';

// Update this to include other valid click actions later.
type clickAction = 'signOut';

export default defineComponent({
  name: 'NavBar',
  components: {
    Search
  },
  setup() {
    const { data: currentUserData } = useQuery({ query: CurrentUserDocument });

    const store = useStore<State>();

    const signIn = () => {
      // This is pretty much just a fake sign in for a user.
      store.commit(
        'signIn',
        {
          username: currentUserData.value?.currentUser?.username,
          slug: currentUserData.value?.currentUser?.slug,
          role: currentUserData.value?.currentUser?.role,
          avatarUrl: currentUserData.value?.currentUser?.avatarUrl
        }
      );
    };

    // This is pretty much just a fake sign out for a user.
    const signOut = () => {
      // Delay it by 50ms because otherwise clicking the "Sign out" button in
      // the navbar will cause a page navigation to the API docs dropdown
      // item instead.
      setTimeout(() => store.commit('signOut'), 50);
    };

    const oauthUrl = computed(() => {
      return `${process.env.VUE_APP_VGLIST_HOST_URL}/settings/oauth/authorize?client_id=${store.state.clientId}&redirect_uri=${store.state.redirectUri}&response_type=code&scope=read+write`;
    });

    /**
     * Whether to show the authenticate button.
     */
    const showAuthenticate = computed(() => {
      return store.state.accessToken === null;
    });

    const userSignedIn = computed(() => store.state.userSignedIn);
    const currentUser = computed(() => store.state.currentUser);

    const navBarItems = computed(() => {
      let items: Array<{ id?: number; title: string | null; path: string | { path: string } | null; clickAction?: clickAction; router: boolean }> = [];

      // Include profile, admin, settings, and sign out if the user is logged in.
      if (userSignedIn.value === true) {
        items = items.concat({
          title: 'Profile',
          path: {
            path: `/users/${currentUser.value?.slug}`
          },
          router: true
        })

        if (currentUser.value?.role === 'ADMIN') {
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
            path: 'https://github.com/connorshea/vglist/blob/main/CHANGELOG.md',
            router: false
          },
          {
            title: 'GitHub',
            path: 'https://github.com/connorshea/vglist',
            router: false
          },
          {
            title: 'API Docs',
            path: 'https://github.com/connorshea/vglist/blob/main/API.md',
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
      );

      // Add `id` to all items in the items array so we can use it as the key.
      return items.map((item, i) => ({ id: i, ...item }));
    });

    return {
      signIn,
      signOut,
      oauthUrl,
      showAuthenticate,
      userSignedIn,
      currentUser,
      navBarItems
    }
  },
  methods: {
    // Bit of a hack to allow a dynamic click action.
    resolveClickAction(funcName: clickAction) {
      this[funcName]();
    }
  }
});
</script>
