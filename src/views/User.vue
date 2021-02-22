<template>
  <div class="user" v-if="data">
    <div class="hero-area">
      <div class="hero-image hero-image-150 user-avatar">
        <img :src="data.user.avatarUrl"/>
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

          <p class='has-text-weight-semibold' v-if="!isPublic">This user's account is private.</p>

          <p class='tag is-medium has-text-weight-bold is-danger' v-if="data.user.banned === true">This user has been banned.</p>
        </template>

        <p v-if="data.user.role === 'admin'">
          <span class="tag is-primary has-text-weight-semibold">Admin</span>
        </p>
        <p v-else-if="data.user.role === 'moderator'">
          <span class="tag is-primary has-text-weight-semibold">Moderator</span>
        </p>
      </div>
    </div>

    <div class="tabs" v-if="isPublic">
      <ul>
        <template v-for="tab in tabs">
          <router-link :key="tab.id" :to="tab.path" v-slot="{ href, navigate, isExactActive }">
            <li :class="[isExactActive && 'is-active']">
              <a :href="href" @click="navigate">{{ tab.name }}</a>
            </li>
          </router-link>
        </template>
      </ul>
    </div>
    <router-view :user="data.user"></router-view>
  </div>
</template>

<script lang="ts">
import { UserDocument } from '@/generated/graphql.ts';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'User',
  props: {
    slug: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const { data } = useQuery({
      query: UserDocument,
      variables: {
        slug: props.slug
      }
    });

    const isCurrentUser = computed(() => {
      return data.value?.user?.username === context.root.$store.state.currentUser?.username;
    });

    const isPublic = computed(() => {
      return data.value?.user?.privacy === 'PUBLIC_ACCOUNT';
    });

    // TODO: Add couns back to the Following/Followers tab names.
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
          name: 'Following',
          path: {
            name: 'UserFollowing',
            slug: props.slug
          }
        },
        {
          name: 'Followers',
          path: {
            name: 'UserFollowers',
            slug: props.slug
          }
        }
      ];
    });

    return {
      data,
      isCurrentUser,
      isPublic,
      tabs
    };
  }
});
</script>
