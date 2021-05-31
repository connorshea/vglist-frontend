<template>
  <div class="dropdown is-fullwidth mr-0-mobile" :class="{ 'is-active': dropdownIsActive }" data-test-id="sort-dropdown-root">
    <div class="dropdown-trigger is-fullwidth-mobile" @click="toggleDropdown">
      <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
        <span data-test-id="active-sort-option">
          {{ sortText }}
        </span>
        <svg-icon :name="'chevron-down'" :size="15" :classes="['icon']"/>
      </button>
    </div>

    <div class="dropdown-menu is-fullwidth" id="sort-dropdown-menu" role="menu">
      <div class="dropdown-content">
        <template v-for="sortOption in sortOptions" :key="sortOption.name">
          <a class="dropdown-item"
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
import { computed, defineComponent, ref } from 'vue';
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
  emits: ['activeSortChanged'],
  setup(props, context) {
    const dropdownIsActive = ref(false);
    const toggleDropdown = () => dropdownIsActive.value = !dropdownIsActive.value;

    const activeSortOption = ref(props.initialSortOption);

    const setActiveSortOption = (sort: string) => {
      activeSortOption.value = sort;
      context.emit('activeSortChanged', sort);
      toggleDropdown();
    };

    const sortText = computed(() => {
      return activeSortOption.value === null ? "Sort" : `Sort by ${activeSortOption.value.toLowerCase().replaceAll('_', ' ')}`;
    });

    return {
      activeSortOption,
      dropdownIsActive,
      toggleDropdown,
      setActiveSortOption,
      sortText
    };
  }
});
</script>
