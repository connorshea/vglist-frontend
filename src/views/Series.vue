<template>
  <div class="series" v-if="data">
    Series: {{ data.series.name }}
  </div>
</template>

<script lang="ts">
import { SeriesDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Series',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: SeriesDocument,
      variables: {
        id: props.id
      }
    });

    return { data };
  }
});
</script>
