<template>
  <div class="companies" v-if="data">
    <h1 class="title">Companies</h1>

    <p v-if="userSignedIn">
      <router-link :to="{ name: 'CreateCompany' }" class="button is-fullwidth-mobile mb-10">Create a new company</router-link>
    </p>

    <ul>
      <li v-for="company in data.companies.nodes" :key="company.id">
        <router-link :to="{ name: 'Company', params: { id: company.id }}">
          {{ company.name }}
        </router-link>
      </li>
    </ul>

    <!-- <%= paginate @companies %> -->
  </div>
</template>

<script lang="ts">
import { CompaniesDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Companies',
  setup(_props, context) {
    const { data } = useQuery({
      query: CompaniesDocument,
      variables: {
        cursor: ''
      }
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    return {
      data,
      userSignedIn
    };
  }
});
</script>
