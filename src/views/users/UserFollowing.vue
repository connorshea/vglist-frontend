<template>
  <div class="following" v-if="data?.user">
    <template v-if="data.user.following.nodes.length > 0">
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile user-card-list" data-test-id="user-following-list">
        <template v-for="followingUser in data.user.following.nodes" :key="followingUser.id">
          <user-card :user="followingUser"/>
        </template>
      </div>
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile">
        <pagination
          :page-name="'UserFollowing'"
          :start-cursor="pageInfo.startCursor"
          :end-cursor="pageInfo.endCursor"
          :has-next-page="pageInfo.hasNextPage"
          :has-previous-page="pageInfo.hasPreviousPage"
          @cursorChanged="execute"
        />
      </div>
    </template>
    <template v-else>
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile" data-test-id="user-following-list">
        <p class="has-text-centered has-text-muted">This user isn't following anyone yet.</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { UserFollowingDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import UserCard from '@/components/UserCard.vue';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'UserFollowing',
  components: {
    UserCard,
    Pagination
  },
  props: {
    user: {
      required: true,
      type: Object
    },
    after: {
      type: String,
      required: false,
      default: null
    },
    before: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const queryVariables = computed(() => {
      return {
        userId: props.user.id,
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after
      };
    });

    const { data, execute } = useQuery({
      query: UserFollowingDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.user?.following?.pageInfo.startCursor ?? null,
        endCursor: data.value?.user?.following?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.user?.following?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.user?.following?.pageInfo.hasNextPage ?? false
      };
    });

    return {
      data,
      execute,
      pageInfo
    };
  }
});
</script>
