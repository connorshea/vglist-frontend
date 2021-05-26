<template>
  <div class="favorites" v-if="data">
    <template v-if="data.user.favoritedGames.nodes.length > 0">
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile game-card-list">
        <div v-for="game in data.user.favoritedGames.nodes" :key="game.id">
          <GameCard :game="game"/>
        </div>

        <pagination
          :page-name="'UserFavorites'"
          :start-cursor="pageInfo.startCursor"
          :end-cursor="pageInfo.endCursor"
          :has-next-page="pageInfo.hasNextPage"
          :has-previous-page="pageInfo.hasPreviousPage"
          @cursorChanged="execute"
        />
      </div>
    </template>
    <template v-else>
      <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile">
        <p class="has-text-centered has-text-muted">This user doesn't have any favorites yet.</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { UserFavoritesDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'UserFavorites',
  components: {
    GameCard,
    Pagination
  },
  props: {
    user: {
      required: true,
      type: Object
    },
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
        userId: props.user.id,
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after
      };
    });

    const { data, execute } = useQuery({
      query: UserFavoritesDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.user?.favoritedGames?.pageInfo.startCursor ?? null,
        endCursor: data.value?.user?.favoritedGames?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.user?.favoritedGames?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.user?.favoritedGames?.pageInfo.hasNextPage ?? false
      };
    });

    return {
      data,
      execute,
      pageInfo
    };
  }
});
</script>
