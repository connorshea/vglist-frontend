<template>
  <div class="games">
    <div v-for="game in data.games" :key="game.id">
      {{ game.name }}
    </div>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

const GamesQuery = gql`
  query {
    games {
      nodes {
        id
        name
        releaseDate
      }
    }
  }
`;

export default defineComponent({
  name: 'Games',
  setup() {
    const { data } = useQuery({
      query: GamesQuery,
    });

    return { data };
  }
});
</script>
