<template>
  <div class="store" v-if="data">
    Store: {{ data.store.name }}
  </div>
</template>

<script lang="ts">
import { StoreDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Store',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: StoreDocument,
      variables: {
        id: props.id
      }
    });

    return { data };
  }
});
</script>
