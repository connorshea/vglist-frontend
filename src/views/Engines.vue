<template>
  <div class="engines" v-if="data">
    <h1 class="title">Engines</h1>

    <ul>
      <li v-for="engine in data.engines.nodes" :key="engine.id">
        <router-link :to="{ name: 'Engine', params: { id: engine.id }}">
          {{ engine.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { EnginesDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Engines',
  setup() {
    const { data } = useQuery({
      query: EnginesDocument,
      variables: {
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
