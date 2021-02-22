<template>
  <div class="platform" v-if="data">
    Platform: {{ data.platform.name }}
  </div>
</template>

<script lang="ts">
import { PlatformDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Platform',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: PlatformDocument,
      variables: {
        id: props.id
      }
    });

    return { data };
  }
});
</script>
