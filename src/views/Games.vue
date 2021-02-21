<template>
  <div class="games">
    <div v-for="game in games" :key="game.id">
      {{ game.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GraphQL from '../graphql';

export default Vue.extend({
  name: 'Games',
  data: function() {
    return {
      games: []
    };
  },
  created: function() {
    let query = `
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
    GraphQL.query(query, {}, this.$store.state.accessToken).then((resp: any) => {
      this.games = resp.data.games.nodes;
    });
  }
});
</script>
