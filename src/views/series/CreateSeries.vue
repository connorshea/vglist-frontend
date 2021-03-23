<template>
  <div class="create-series">
    <template v-if="userCanCreate">
      <SeriesForm
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
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import SeriesForm from '@/components/SeriesForm.vue';

export default defineComponent({
  name: 'CreateSeries',
  components: {
    SeriesForm
  },
  setup(_props, context) {
    const series: Ref<{ name: string | null, wikidataId: number | string | null }> = ref({
      name: null,
      wikidataId: null
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanCreate = userSignedIn;

    return {
      userSignedIn,
      userCanCreate,
      series
    };
  }
});
</script>
