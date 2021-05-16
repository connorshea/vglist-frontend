<template>
  <div class="stores" v-if="data">
    <h1 class="title">Stores</h1>

    <p v-if="userSignedIn">
      <router-link :to="{ name: 'CreateStore' }" class="button is-fullwidth-mobile mb-10">Create a new store</router-link>
    </p>

    <ul>
      <li v-for="store in data.stores.nodes" :key="store.id">
        <router-link :to="{ name: 'Store', params: { id: store.id }}">
          {{ store.name }}
        </router-link>
      </li>
    </ul>

    <!-- <%= paginate @stores %> -->
  </div>
</template>

<script lang="ts">
import { StoresDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Stores',
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
  setup(props, context) {
    const { data } = useQuery({
      query: StoresDocument,
      variables: {
        after: ''
      }
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.stores?.pageInfo.startCursor ?? null,
        endCursor: data.value?.stores?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.stores?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.stores?.pageInfo.hasNextPage ?? false
      };
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    return {
      data,
      userSignedIn,
      pageInfo
    };
  }
});
</script>
