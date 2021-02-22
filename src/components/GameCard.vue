<template>
  <div class="custom-card game-card">
    <router-link :to="{ name: 'Game', params: { id: game.id } }" class="card-container">
      <figure class="game-cover">
        <img v-if="game.coverUrl !== null" :src="game.coverUrl" />
        <img v-else src="@/assets/images/no-cover.png"/>
      </figure>
      <div class="card-content">
        <p class="title is-4 mr-10">{{ game.name }}</p>
        <p class="subtitle is-6" v-if="platforms !== null">{{ platforms }}</p>
        <p class="subtitle is-6" v-if="developers !== null">{{ developers }}</p>
      </div>
    </router-link>
    <!-- Game card Dropdown -->
  </div>
</template>

<script lang="ts">
import { Company, Platform } from '@/generated/graphql';
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
      if (props.game.platforms.nodes.size === 0) { return null; }
      return props.game.platforms.nodes.map((p: Platform) => p.name).join(', ');
    });
    const developers = computed(() => {
      if (props.game.developers.nodes.size === 0) { return null; }
      return props.game.developers.nodes.map((d: Company) => d.name).join(', ');
    });

    return {
      platforms,
      developers
    };
  }
});
</script>
