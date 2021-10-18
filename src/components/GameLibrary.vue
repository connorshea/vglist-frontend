<template>
  <div class="game-library-list" v-if="data">
    <template v-for="gamePurchase in data.user.gamePurchases.nodes" :key="gamePurchase.id">
      <div class="game-library-list-item">
        <img v-if="gamePurchase.game.coverUrl !== null" :src="gamePurchase.game.coverUrl">
        <img v-else src="@/assets/images/no-cover.png">
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
  display: grid;
  grid: auto-flow auto / repeat(4, minmax(auto, 25%));
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.game-library-list-item {
  overflow: hidden;
  margin: 0;
  padding: 0;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
