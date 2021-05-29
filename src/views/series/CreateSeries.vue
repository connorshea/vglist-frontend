<template>
  <div class="create-series">
    <template v-if="userCanCreate">
      <series-form
        v-bind="series"
        :form-state="'create'"
      />
    </template>
    <template v-else>
      <p>You cannot create a series.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import SeriesForm from '@/components/forms/SeriesForm.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CreateSeries',
  components: {
    SeriesForm
  },
  setup() {
    const series: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null
    });

    const store = useStore();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      series
    };
  }
});
</script>
