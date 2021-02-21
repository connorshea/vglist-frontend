<template>
  <div class="games" v-if="data">
    <div v-for="game in data.games.nodes" :key="game.id">
      <router-link :to="{ name: 'Game', params: { id: game.id } }">
        {{ game.name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { GamesDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Games',
  setup() {
    const { data } = useQuery({
      query: GamesDocument,
      variables: {
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
