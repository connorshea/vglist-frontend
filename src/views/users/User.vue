<template>
  <div class="user" v-if="data">
    <div class="hero-area">
      <div class="hero-image hero-image-150 user-avatar">
        <img v-if="data.user.avatarUrl !== null" :src="data.user.avatarUrl">
        <img v-else src="@/assets/images/default-avatar.png">
      </div>

      <div class="text-block">
        <h1 class="title">{{ data.user.username }}</h1>

        <!-- Only display the user's bio if it's a public account or the
             current user has access for some other reason. -->
        <template v-if="isPublic || isCurrentUser">
          <h2 v-if="data.user.bio !== ''" class="subtitle">{{ data.user.bio }}</h2>
          <h2 v-else class="subtitle has-text-muted">
            {{ isCurrentUser ? 'You haven\'t added a bio yet.' : 'This user hasn\'t added a bio yet.' }}
          </h2>

          <p class="has-text-weight-semibold" v-if="!isPublic">This user's account is private.</p>

          <p class="tag is-medium has-text-weight-bold is-danger" v-if="data.user.banned === true">This user has been banned.</p>
        </template>

        <p v-if="data.user.role === 'ADMIN'">
          <span class="tag is-primary has-text-weight-semibold">Admin</span>
        </p>
        <p v-else-if="data.user.role === 'MODERATOR'">
          <span class="tag is-primary has-text-weight-semibold">Moderator</span>
        </p>
      </div>
    </div>

    <div class="tabs" v-if="isPublic">
      <ul>
        <template v-for="tab in tabs" :key="tab.id">
          <!-- The janky v-slot workaround is necessary for the parent <li> to
               have the active class applied to it. -->
          <router-link :to="tab.path" custom v-slot="{ href, navigate, isExactActive }">
            <li :class="[isExactActive && 'is-active']">
              <a :href="href" @click="navigate">{{ tab.name }}</a>
            </li>
          </router-link>
        </template>
      </ul>
    </div>
    <router-view :user="data.user" @refreshUserData="execute({ cachePolicy: 'network-only' })"/>
  </div>
</template>

<script lang="ts">
import { UserDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'User',
  props: {
    slug: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const queryVariables = computed(() => {
      return { slug: props.slug };
    });

    const { data, execute } = useQuery({
      query: UserDocument,
      variables: queryVariables
    });

    const store = useStore<State>();

    const isCurrentUser = computed(() => {
      return data.value?.user?.username === store.state.currentUser?.username;
    });

    const isPublic = computed(() => {
      return data.value?.user?.privacy === 'PUBLIC_ACCOUNT';
    });

    const tabs = computed(() => {
      return [
        {
          name: 'Library',
          path: {
            name: 'UserProfile',
            slug: props.slug
          }
        },
        {
          name: 'Activity',
          path: {
            name: 'UserActivity',
            slug: props.slug
          }
        },
        {
          name: 'Favorites',
          path: {
            name: 'UserFavorites',
            slug: props.slug
          }
        },
        {
          name: `Following (${data.value?.user?.following?.totalCount})`,
          path: {
            name: 'UserFollowing',
            slug: props.slug
          }
        },
        {
          name: `Followers (${data.value?.user?.followers?.totalCount})`,
          path: {
            name: 'UserFollowers',
            slug: props.slug
          }
        }
      ];
    });

    return {
      data,
      execute,
      isCurrentUser,
      isPublic,
      tabs
    };
  }
});
</script>
