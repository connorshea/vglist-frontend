<template>
  <div class="game-library-list" v-if="data">
    <template v-for="gamePurchase in data.user.gamePurchases.nodes" :key="gamePurchase.id">
      <div class="game-library-list-item">
        <router-link :to="{ name: 'Game', params: { id: gamePurchase.game.id } }">
          <img v-if="gamePurchase.game.coverUrl !== null" :src="gamePurchase.game.coverUrl">
          <img v-else src="@/assets/images/no-cover.png">
          <p class="game-library-title">{{ gamePurchase.game.name }}</p>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { GameLibraryDocument } from '@/generated/graphql';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'GameLibrary',
  components: {
    SvgIcon
  },
  props: {
    userId: {
      required: true,
      type: String
    }
  },
  setup(props) {
    let variables = ref({ id: props.userId })
    const { data } = useQuery({
      query: GameLibraryDocument,
      variables
    });

    return {
      data
    };
  }
});
</script>

<style lang="scss" scoped>

.game-library-list {
  // Differ the number of columns depending on screen size.
  @media (max-width: 450px) {
    --game-library-columns: 1;
  }

  @media (min-width: 450px) and (max-width: 900px) {
    --game-library-columns: 3;
  }

  @media (min-width: 900px) and (max-width: 1200px) {
    --game-library-columns: 4;
  }

  @media (min-width: 1200px) {
    --game-library-columns: 5;
  }

  display: grid;
  grid: auto-flow auto / repeat(var(--game-library-columns), auto);
  grid-column-gap: 15px;
  grid-row-gap: 15px;

  .game-library-list-item {
    transition: box-shadow 200ms;
    overflow: hidden;
    margin: 0;
    padding: 0;
    // TODO: Figure something out here
    max-height: calc((100vw / var(--game-library-columns)) * 1.2);
    position: relative;
    border-radius: 3px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }

    .game-library-title {
      color: #fff;
      position: absolute;
      top: 0;
      text-align: center;
      width: 100%;
      background: rgba(#5856d6, 0.9);
      padding: 10px 0;
      opacity: 0;
      transition: opacity 200ms;
    }

    &:hover {
      box-shadow: 0 7px 18px rgba(0, 0, 0, 0.25), 0 4px 4px rgba(0, 0, 0, 0.05);

      .game-library-title {
        opacity: 100%;
      }
    }
  }
}
</style>
