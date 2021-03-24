<template>
  <div class="users" v-if="data">
    <h1 class="title">Users</h1>

    <div class="dropdown is-fullwidth mr-0-mobile" :class="{ 'is-active': dropdownIsActive }">
      <div class="dropdown-trigger is-fullwidth-mobile" @click="toggleDropdown">
        <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>
            {{ sortBy === null ? "Sort" : `Sort by ${sortBy.toLowerCase().replace('_', ' ')}` }}
          </span>
          <SvgIcon :name="'chevron-down'" :size="15" :classes="['icon']"/>
        </button>
      </div>

      <div class="dropdown-menu is-fullwidth" id="sort-dropdown-menu" role="menu">
        <div class="dropdown-content">
          <template v-for="sortOption in sortOptions">
            <a :key="sortOption.name"
               class="dropdown-item"
               :class="{ 'has-text-weight-bold': sortBy === sortOption.value }"
               @click="setSortBy(sortOption.value)"
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
  setup() {
    const sortBy: Ref<sortOptionsType> = ref(null);
    const queryVariables = ref({ cursor: '', sortBy: sortBy });
    const { execute, data } = useQuery({
      query: UsersDocument,
      variables: queryVariables
    });

    type sortOptionsType = null | UserSort;

    const setSortBy = (sort: sortOptionsType) => {
      sortBy.value = sort;
      execute();
    };

    const sortOptions: Array<{ name: string, value: sortOptionsType }> = [
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
      sortBy,
      setSortBy,
      sortOptions,
      dropdownIsActive,
      toggleDropdown
    };
  }
});
</script>
