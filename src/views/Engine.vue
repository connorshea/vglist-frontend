<template>
  <div class="engine" v-if="data">
    Engine: {{ data.engine.name }}
  </div>
</template>

<script lang="ts">
import { EngineDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Engine',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: EngineDocument,
      variables: {
        id: props.id
      }
    });

    return { data };
  }
});
</script>
