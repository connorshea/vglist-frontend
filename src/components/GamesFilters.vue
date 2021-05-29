<template>
  <div class="games-filters">
    <single-select
      v-model="filterData.platform"
      :search-path="'platformSearch'"
      :grandparent-class="'games-filter'"
      :placeholder="'Filter by platform'"
      :graphql-query="PlatformSearchDocument"
      @update:modelValue="onPlatformInput"
    />

    <static-single-select
      v-model="filterData.year"
      :placeholder="'Filter by year'"
      :grandparent-class="'year-filter'"
      :options="yearOptions"
      @update:modelValue="onYearInput"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import SingleSelect from '@/components/fields/SingleSelect.vue';
import StaticSingleSelect from '@/components/fields/StaticSingleSelect.vue';
import * as _ from 'lodash';
import { Platform, PlatformSearchDocument } from '@/generated/graphql';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'GamesFilters',
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
  setup(props) {
    const filterData: Ref<{ platform: Platform | null, year: number | null}> = ref({
      platform: props.platform as Platform | null,
      year: props.year
    });

    const route  = useRoute();
    const router = useRouter();

    // Change the set platform on input, or remove it if it's deleted.
    const onPlatformInput = (platform: Platform | null) => {
      let { platform_id, ...currentQueryParams } = route.query;
      let query = { ...currentQueryParams };
      if (platform !== null) {
        query.platform_id = platform.id;
      }
      filterData.value.platform = platform;
      router.push({ name: 'Games', query: query });
    };

    const onYearInput = (year: string | null) => {
      let { by_year, ...currentQueryParams } = route.query;
      let query = { ...currentQueryParams };
      if (year !== null) {
        query.by_year = year;
      }
      filterData.value.year = year === null ? null : parseInt(year);
      router.push({ name: 'Games', query: query });
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
