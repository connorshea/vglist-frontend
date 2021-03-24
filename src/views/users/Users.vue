<template>
  <div class="users" v-if="data">
    <h1 class="title">Users</h1>

    <div class="dropdown is-fullwidth mr-0-mobile" :class="{ 'is-active': dropdownIsActive }">
      <div class="dropdown-trigger is-fullwidth-mobile" @click="toggleDropdown">
        <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>
            {{ sortedBy === null ? "Sort" : `Sort by ${sortedBy.toLowerCase().replace('_', ' ')}` }}
          </span>
          <SvgIcon :name="'chevron-down'" :size="15" :classes="['icon']"/>
        </button>
      </div>

      <div class="dropdown-menu is-fullwidth" id="sort-dropdown-menu" role="menu">
        <div class="dropdown-content">
          <template v-for="sortOption in sortOptions">
            <a :key="sortOption.name"
               class="dropdown-item"
               :class="{ 'has-text-weight-bold': sortedBy === sortOption.value }"
               @click="setSortedBy(sortOption.value)"
            >
              {{ sortOption.name }}
            </a>
          </template>
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
import { UsersDocument, UserSort } from '@/generated/graphql';
import { defineComponent, Ref, ref } from '@vue/composition-api';
import { useQuery } from 'villus';
import UserCard from '@/components/UserCard.vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default defineComponent({
  name: 'Users',
  components: {
    UserCard,
    SvgIcon
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
    const sortedBy: Ref<SortOptionsType> = ref(upcasedSortBy as SortOptionsType);
    const queryVariables = ref({ cursor: '', sortBy: sortedBy });
    const { execute, data } = useQuery({
      query: UsersDocument,
      variables: queryVariables
    });

    const setSortedBy = (sort: SortOptionsType) => {
      sortedBy.value = sort;
      let { sortBy: _sortBy, ...currentQueryParams } = context.root.$route.query;
      let query = { ...currentQueryParams };
      if (sort !== null) {
        query.sortBy = sort.toLowerCase();
      }
      context.root.$router.push({ name: 'Users', query: query })
      execute();
    };

    const sortOptions: Array<{ name: string, value: SortOptionsType }> = [
      {
        name: 'Default',
        value: null
      },
      {
        name: 'Most Followers',
        value: UserSort.MostFollowers
      },
      {
        name: 'Most Games',
        value: UserSort.MostGames
      }
    ];

    const dropdownIsActive = ref(false);
    const toggleDropdown = () => dropdownIsActive.value = !dropdownIsActive.value;

    return {
      data,
      sortedBy,
      setSortedBy,
      sortOptions,
      dropdownIsActive,
      toggleDropdown
    };
  }
});
</script>
