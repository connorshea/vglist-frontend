<template>
  <div class="following" v-if="data">
    <template v-if="data.user.following.nodes.length > 0">
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile user-card-list">
        <template v-for="user in data.user.following.nodes">
          <UserCard :user="user" :key="user.id"></UserCard>
        </template>
      </div>
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile">
        <!-- <%= paginate @following %> -->
      </div>
    </template>
    <template v-else>
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile">
        <p class="has-text-centered has-text-muted">This user isn't following anyone yet.</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { UserFollowingDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import UserCard from '@/components/UserCard.vue';

export default defineComponent({
  name: 'UserFollowing',
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
      query: UserFollowingDocument,
      variables: {
        userId: props.user.id,
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
