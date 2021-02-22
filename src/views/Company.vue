<template>
  <div class="company" v-if="data">
    Company: {{ data.company.name }}
  </div>
</template>

<script lang="ts">
import { CompanyDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Company',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: CompanyDocument,
      variables: {
        id: props.id
      }
    });

    return { data };
  }
});
</script>
