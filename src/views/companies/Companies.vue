<template>
  <div class="companies" v-if="data?.companies">
    <h1 class="title">Companies</h1>

    <p v-if="userSignedIn" data-test-id="create-company-button">
      <router-link :to="{ name: 'CreateCompany' }" class="button is-fullwidth-mobile mb-10">Create a new company</router-link>
    </p>

    <ul data-test-id="companies-list">
      <li v-for="company in data.companies.nodes" :key="company!.id">
        <template v-if="company">
          <router-link :to="{ name: 'Company', params: { id: company.id }}">
            {{ company.name }}
          </router-link>
        </template>
      </li>
    </ul>

    <pagination
      :page-name="'Companies'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { CompaniesDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'Companies',
  components: {
    Pagination
  },
  props: {
    after: {
      type: String,
      required: false,
      default: null
    },
    before: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const queryVariables = computed(() => {
      return {
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after
      };
    });

    const { data, execute } = useQuery({
      query: CompaniesDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.companies?.pageInfo.startCursor ?? null,
        endCursor: data.value?.companies?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.companies?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.companies?.pageInfo.hasNextPage ?? false
      };
    });

    const store = useStore<State>();
    const userSignedIn = computed(() => store.state.userSignedIn);

    return {
      data,
      execute,
      userSignedIn,
      pageInfo
    };
  }
});
</script>
