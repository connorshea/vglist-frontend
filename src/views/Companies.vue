<template>
  <div class="companies" v-if="data">
    <ul>
      <li v-for="company in data.companies.nodes" :key="company.id">
        <router-link :to="{ name: 'Company', params: { id: company.id }}">
          {{ company.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { CompaniesDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Companies',
  setup() {
    const { data } = useQuery({
      query: CompaniesDocument,
      variables: {
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
