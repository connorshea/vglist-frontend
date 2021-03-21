<template>
  <div class="store" v-if="data">
    <h1 class="title">{{ data.store.name }}</h1>
  </div>
</template>

<script lang="ts">
import { StoreDocument } from '@/generated/graphql';
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
