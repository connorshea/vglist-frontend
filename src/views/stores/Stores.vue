<template>
  <div class="stores" v-if="data?.stores">
    <h1 class="title">Stores</h1>

    <p v-if="userSignedIn" data-test-id="create-store-button">
      <router-link :to="{ name: 'CreateStore' }" class="button is-fullwidth-mobile mb-10">Create a new store</router-link>
    </p>

    <ul data-test-id="stores-list">
      <li v-for="store in data.stores.nodes" :key="store!.id">
        <router-link :to="{ name: 'Store', params: { id: store!.id }}">
          {{ store!.name }}
        </router-link>
      </li>
    </ul>

    <pagination
      :page-name="'Stores'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { StoresDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'Stores',
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
      query: StoresDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.stores?.pageInfo.startCursor ?? null,
        endCursor: data.value?.stores?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.stores?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.stores?.pageInfo.hasNextPage ?? false
      };
    });

    const vuexStore = useStore<State>();
    const userSignedIn = computed(() => vuexStore.state.userSignedIn);

    return {
      data,
      execute,
      userSignedIn,
      pageInfo
    };
  }
});
</script>
