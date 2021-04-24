<template>
  <div class="users" v-if="data">
    <h1 class="title">Users</h1>

    <sort-dropdown
      :sortOptions="sortOptions"
      :initialSortOption="sortBy"
      @activeSortChanged="refetchQuery"
    ></sort-dropdown>

    <div class="user-card-list mt-20">
      <template v-for="user in data.users.nodes">
        <UserCard :user="user" :key="user.id"></UserCard>
      </template>
    </div>

    <!-- <%= paginate @users %> -->
  </div>
</template>

<script lang="ts">
import { UsersDocument, UserSort } from '@/generated/graphql';
import { defineComponent, Ref, ref } from '@vue/composition-api';
import { useQuery } from 'villus';
import UserCard from '@/components/UserCard.vue';
import SortDropdown from '@/components/SortDropdown.vue';

export default defineComponent({
  name: 'Users',
  components: {
    UserCard,
    SortDropdown
  },
  props: {
    sortBy: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props, context) {
    type SortOptionsType = UserSort | null;

    let upcasedSortBy = props.sortBy?.toUpperCase() ?? null;
    const activeSortOption: Ref<SortOptionsType> = ref(upcasedSortBy as SortOptionsType);
    const queryVariables = ref({ cursor: '', sortBy: activeSortOption });
    const { execute, data } = useQuery({
      query: UsersDocument,
      variables: queryVariables
    });

    const refetchQuery = (sort: SortOptionsType) => {
      activeSortOption.value = sort;
      let { sort_by, ...currentQueryParams } = context.root.$route.query;
      let query = { ...currentQueryParams };
      if (sort !== null) {
        query.sort_by = sort.toLowerCase();
      }
      context.root.$router.push({ name: 'Users', query: query });
      execute();
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
      activeSortOption,
      refetchQuery,
      sortOptions
    };
  }
});
</script>
