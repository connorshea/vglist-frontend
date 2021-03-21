<template>
  <div class="followers" v-if="data">
    <template v-if="data.user.followers.nodes.length > 0">
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile user-card-list">
        <template v-for="user in data.user.followers.nodes">
          <UserCard :user="user" :key="user.id"></UserCard>
        </template>
      </div>
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile">
        <!-- <%= paginate @followers %> -->
      </div>
    </template>
    <template v-else>
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile">
        <p class="has-text-centered has-text-muted">This user doesn't have any followers yet.</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { UserFollowersDocument } from '@/generated/graphql';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import UserCard from '@/components/UserCard.vue';

export default defineComponent({
  name: 'UserFollowers',
  components: {
    UserCard
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: UserFollowersDocument,
      variables: {
        userId: props.user.id,
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
