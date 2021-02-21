<template>
  <div class="custom-card game-card">
    <router-link :to="{ name: 'Game', params: { id: game.id } }" class="card-container">
      <figure class="game-cover">
        <!-- <%= game_cover(game, size: :medium) %> -->
      </figure>
      <div class="card-content">
        <p class="title is-4 mr-10">{{ game.name }}</p>
        <p class="subtitle is-6">{{ platforms }}</p>
        <p class="subtitle is-6">{{ developers }}</p>
      </div>
    </router-link>
    <!-- Game card Dropdown -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'GameCard',
  props: {
    game: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const platforms = computed(() => {
      if (props.game.platforms.nodes.size === 0) { return ''; }
      return props.game.platforms.nodes.map((p: any) => p.name).join(', ');
    });
    const developers = computed(() => {
      if (props.game.developers.nodes.size === 0) { return ''; }
      return props.game.developers.nodes.map((d: any) => d.name).join(', ');
    });

    return {
      platforms,
      developers
    };
  }
});
</script>
