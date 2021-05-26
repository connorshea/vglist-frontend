<template>
  <div class="edit-series" v-if="isLoaded">
    <template v-if="userCanEdit">
      <SeriesForm
        v-bind="series"
        :form-state="'update'"
      />
    </template>
    <template v-else>
      <p>You cannot edit this series.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { SeriesDocument } from '@/generated/graphql';
import { computed, defineComponent, Ref, ref } from 'vue';
import { useQuery } from 'villus';
import SeriesForm from '@/components/forms/SeriesForm.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'EditSeries',
  components: {
    SeriesForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { execute: executeQuery } = useQuery({
      query: SeriesDocument,
      variables: {
        id: props.id
      },
      fetchOnMount: false
    });

    const series: Ref<{ id: string, name: string | null, wikidataId: number | string | null }> = ref({
      id: props.id,
      name: null,
      wikidataId: null
    });

    // Don't try to render the form until the data is fully loaded, to make
    // sure we can pre-populate the form as necessary.
    const isLoaded = ref(false);

    executeQuery().then(({ data }) => {
      series.value.name = data?.series?.name ?? null;
      series.value.wikidataId = data?.series?.wikidataId ?? null;
      isLoaded.value = true;
    });

    const store = useStore();
    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanEdit = userSignedIn;

    return {
      isLoaded,
      userSignedIn,
      userCanEdit,
      series
    };
  }
});
</script>
