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
import gql from 'graphql-tag';

const query = gql`
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

export default Vue.extend({
  name: 'Games',
  data: function() {
    return {
      games: []
    };
  },
  created: function() {
    GraphQL.query(query, {}, this.$store.state.accessToken).then((resp: any) => {
      this.games = resp.data.games.nodes;
    });
  }
});
</script>
