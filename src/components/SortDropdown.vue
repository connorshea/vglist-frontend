<template>
  <div class="dropdown is-fullwidth mr-0-mobile" :class="{ 'is-active': dropdownIsActive }">
    <div class="dropdown-trigger is-fullwidth-mobile" @click="toggleDropdown">
      <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>
          {{ activeSortOption === null ? "Sort" : `Sort by ${activeSortOption.toLowerCase().replaceAll('_', ' ')}` }}
        </span>
        <SvgIcon :name="'chevron-down'" :size="15" :classes="['icon']"/>
      </button>
    </div>

    <div class="dropdown-menu is-fullwidth" id="sort-dropdown-menu" role="menu">
      <div class="dropdown-content">
        <template v-for="sortOption in sortOptions">
          <a :key="sortOption.name"
              class="dropdown-item"
              :class="{ 'has-text-weight-bold': activeSortOption === sortOption.value }"
              @click="setActiveSortOption(sortOption.value)"
          >
            {{ sortOption.name }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import SvgIcon from '@/components/SvgIcon.vue';

export default defineComponent({
  name: 'SortDropdown',
  components: {
    SvgIcon
  },
  props: {
    sortOptions: {
      type: Array,
      required: true
    },
    initialSortOption: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props, context) {
    const dropdownIsActive = ref(false);
    const toggleDropdown = () => dropdownIsActive.value = !dropdownIsActive.value;

    const activeSortOption = ref(props.initialSortOption);

    const setActiveSortOption = (sort: string) => {
      activeSortOption.value = sort;
      context.emit('activeSortChanged', sort);
    };

    return {
      activeSortOption,
      dropdownIsActive,
      toggleDropdown,
      setActiveSortOption
    };
  }
});
</script>