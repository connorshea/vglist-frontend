<template>
  <div class="user-card custom-card">
    <router-link :to="{ name: 'UserProfile', params: { slug: user.slug }}" class="card-container">
      <figure class="user-avatar">
        <img v-if="user.avatarUrl !== null" :src="user.avatarUrl">
        <img v-else src="@/assets/images/default-avatar.png">
      </figure>
      <div class="card-content">
        <p class="title is-4 mb-5 is-vertical-align-middle">
          {{ user.username }}
          <span v-if="user.role === 'ADMIN'" class="tag is-primary has-text-weight-semibold ml-5">Admin</span>
          <span v-else-if="user.role === 'MODERATOR'" class="tag is-primary has-text-weight-semibold ml-5">Moderator</span>
          <span v-if="user.privacy === 'PRIVATE_ACCOUNT'" class="tag is-light has-text-weight-semibold ml-5">Private</span>
          <span v-if="user.banned === true" class="tag is-danger has-text-weight-semibold ml-5">Banned</span>
        </p>
        <p class="has-text-muted">
          {{ user.gamePurchases.totalCount }} {{ $filters.pluralize(user.gamePurchases.totalCount, 'Game') }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { UserCardFieldsFragment } from '@/generated/graphql';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'UserCard',
  props: {
    user: {
      required: true,
      type: Object as PropType<UserCardFieldsFragment>
    }
  }
});
</script>
