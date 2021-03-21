<template>
  <div class="stores" v-if="data">
    <h1 class="title">Stores</h1>

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
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Stores',
  setup() {
    const { data } = useQuery({
      query: StoresDocument,
      variables: {
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
