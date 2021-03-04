<template>
  <div class="platforms" v-if="data">
    <h1 class="title">Platforms</h1>

    <ul>
      <li v-for="platform in data.platforms.nodes" :key="platform.id">
        <router-link :to="{ name: 'Platform', params: { id: platform.id }}">
          {{ platform.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { PlatformsDocument } from '@/generated/graphql';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Platforms',
  setup() {
    const { data } = useQuery({
      query: PlatformsDocument,
      variables: {
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
