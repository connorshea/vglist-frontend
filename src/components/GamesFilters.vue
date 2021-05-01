<template>
  <div class="games-filters">
    <single-select
      v-model="filterData.platform"
      :search-path="'platformSearch'"
      :grandparent-class="'games-filter'"
      :placeholder="'Filter by platform'"
      :graphql-query="PlatformSearchDocument"
      @input="onPlatformInput"
    ></single-select>

    <static-single-select
      v-model="filterData.year"
      :placeholder="'Filter by year'"
      :grandparent-class="'year-filter'"
      :options="yearOptions"
      @input="onYearInput"
    ></static-single-select>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import SingleSelect from '@/components/fields/SingleSelect.vue';
import StaticSingleSelect from '@/components/fields/StaticSingleSelect.vue';
import * as _ from 'lodash';
import { Platform, PlatformSearchDocument } from '@/generated/graphql';

export default defineComponent({
  name: 'games-filters',
  components: {
    SingleSelect,
    StaticSingleSelect
  },
  props: {
    platform: {
      type: Object,
      required: false,
      default: null
    },
    year: {
      type: Number,
      required: false,
      default: null
    }
  },
  setup(props, context) {
    const filterData: Ref<{ platform: Platform | null, year: number | null}> = ref({
      platform: props.platform as Platform | null,
      year: props.year
    });

    // Change the set platform on input, or remove it if it's deleted.
    const onPlatformInput = (platform: Platform | null) => {
      let { platform_id, ...currentQueryParams } = context.root.$route.query;
      let query = { ...currentQueryParams };
      if (platform !== null) {
        query.platform_id = platform.id;
      }
      filterData.value.platform = platform;
      context.root.$router.push({ name: 'Games', query: query });
      context.emit('activeFiltersChanged', filterData.value);
    };

    const onYearInput = (year: string | null) => {
      let { by_year, ...currentQueryParams } = context.root.$route.query;
      let query = { ...currentQueryParams };
      if (year !== null) {
        query.by_year = year;
      }
      filterData.value.year = year === null ? null : parseInt(year);
      context.root.$router.push({ name: 'Games', query: query });
      context.emit('activeFiltersChanged', filterData.value);
    };

    const yearOptions = computed(() => {
      let currentYear = new Date().getFullYear();
      // Create an array from 1950 to the current year + 2.
      // (it's +3 because the range is exclusive rather than inclusive)
      return _.reverse(_.range(1950, currentYear + 3));
    });

    return {
      filterData,
      onPlatformInput,
      onYearInput,
      yearOptions,
      PlatformSearchDocument
    }
  }
});
</script>