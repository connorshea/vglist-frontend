<template>
  <div class="users" v-if="data">
    <h1 class="title">Users</h1>

    <sort-dropdown
      :sort-options="sortOptions"
      :initial-sort-option="upcasedSortBy"
      @activeSortChanged="updateSortValue"
    />

    <div class="user-card-list mt-20">
      <template v-for="user in data.users.nodes" :key="user.id">
        <UserCard :user="user"/>
      </template>
    </div>

    <pagination
      :page-name="'Users'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { UsersDocument, UserSort } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import UserCard from '@/components/UserCard.vue';
import SortDropdown from '@/components/SortDropdown.vue';
import Pagination from '@/components/Pagination.vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Users',
  components: {
    UserCard,
    SortDropdown,
    Pagination
  },
  props: {
    sortBy: {
      type: String,
      required: false,
      default: null
    },
    before: {
      type: String,
      requrired: false,
      default: null
    },
    after: {
      type: String,
      requrired: false,
      default: null
    }
  },
  setup(props) {
    type SortOptionsType = UserSort | null;

    const router = useRouter();
    const route  = useRoute();

    // Upcase it so we can pass the capitalized version to the sort dropdown, to
    // ensure the default value works correctly.
    const upcasedSortBy = computed(() => props.sortBy?.toUpperCase());

    const queryVariables = computed(() => {
      return {
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after,
        sortBy: upcasedSortBy.value as SortOptionsType,
      };
    });

    const { execute, data } = useQuery({
      query: UsersDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.users?.pageInfo.startCursor ?? null,
        endCursor: data.value?.users?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.users?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.users?.pageInfo.hasNextPage ?? false
      };
    });

    const updateSortValue = (sort: SortOptionsType) => {
      // Override the before and after values since we have to restart the
      // cursor when changing the sort.
      let { sort_by, before, after, ...currentQueryParams } = route.query;
      let query = { ...currentQueryParams };
      if (sort !== null) {
        query.sort_by = sort.toLowerCase();
      }
      router.push({ name: 'Users', query: query });
    };

    const sortOptions: Array<{ name: string, value: SortOptionsType }> = [
      {
        name: 'Default',
        value: null
      },
      {
        name: 'Most followers',
        value: UserSort.MostFollowers
      },
      {
        name: 'Most games',
        value: UserSort.MostGames
      }
    ];

    return {
      data,
      execute,
      updateSortValue,
      upcasedSortBy,
      sortOptions,
      pageInfo
    };
  }
});
</script>
