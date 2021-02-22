<template>
  <div class="users" v-if="data">
    <h1 class="title">Users</h1>

    <div class="dropdown is-fullwidth mr-0-mobile">
      <div class="dropdown-trigger is-fullwidth-mobile">
        <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>
            <!-- <%= params[:order_by].nil? ? "Sort" : "Sort by #{params[:order_by].titleize.downcase}" %> -->
          </span>
          <span class="icon">
            <!-- <%= svg_icon('chevron-down', height: 15, aria: false) %> -->
          </span>
        </button>
      </div>

      <div class="dropdown-menu is-fullwidth" id="sort-dropdown-menu" role="menu">
        <div class="dropdown-content">
          <!-- <%= sort_dropdown_link(nil, 'Default') %> -->
          <!-- <%= sort_dropdown_link(:most_followers, 'Most Followers') %> -->
          <!-- <%= sort_dropdown_link(:most_games, 'Most Games') %> -->
        </div>
      </div>
    </div>

    <div class="user-card-list mt-20">
      <template v-for="user in data.users.nodes">
        <UserCard :user="user" :key="user.id"></UserCard>
      </template>
    </div>

    <!-- <%= paginate @users %> -->
  </div>
</template>

<script lang="ts">
import { UsersDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import UserCard from '@/components/UserCard.vue';

export default defineComponent({
  name: 'Users',
  components: {
    UserCard
  },
  setup() {
    const { data } = useQuery({
      query: UsersDocument,
      variables: {
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
