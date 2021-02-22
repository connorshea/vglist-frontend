<template>
  <div class="favorites" v-if="data">
    <template v-if="data.user.favoritedGames.nodes.length > 0">
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile game-card-list">
        <div v-for="game in data.user.favoritedGames.nodes" :key="game.id">
          <GameCard :game="game"/>
        </div>

        <!-- <%= paginate @favorited_games %> -->
      </div>
    </template>
    <template v-else>
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile">
        <p class="has-text-centered">This user doesn't have any favorites yet.</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { UserFavoritesDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';

export default defineComponent({
  name: 'UserFavorites',
  components: {
    GameCard
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: UserFavoritesDocument,
      variables: {
        userId: props.user.id,
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
