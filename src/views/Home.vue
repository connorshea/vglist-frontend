<template>
  <div class="home">
    <div class="section home-section">
      <div class="container is-fluid">
        <div class="content is-size-5 has-text-centered column is-two-thirds m-auto">
          <img src="@/assets/images/vglist-logo.svg" width='250px' class='home-logo' alt="vglist logo">
          <h4 class="subtitle has-text-weight-normal">Track your entire video game library across every store and platform.</h4>
        </div>
      </div>
    </div>

    <div class="section section-home-overlap-card">
      <nav class="level card home-card stats-card column is-two-thirds m-auto">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ stats.games }}</p>
            <p class="heading">
              <router-link to="/games">Games</router-link>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ stats.series }}</p>
            <p class="heading">
              <router-link to="/series">Series</router-link>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ stats.platforms }}</p>
            <p class="heading">
              <router-link to="/platforms">Platforms</router-link>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ stats.companies }}</p>
            <p class="heading">
              <router-link to="/companies">Companies</router-link>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ stats.engines }}</p>
            <p class="heading">
              <router-link to="/engines">Engines</router-link>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ stats.genres }}</p>
            <p class="heading">
              <router-link to="/genres">Genres</router-link>
            </p>
          </div>
        </div>
      </nav>

      <div class="game-card-list mt-20" v-if="data">
        <div v-for="game in data.games.nodes" :key="game.id">
          <GameCard :game="game"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GamesDocument } from '@/generated/graphql.ts';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    GameCard
  },
  setup() {
    const { data } = useQuery({
      query: GamesDocument,
      variables: {
        cursor: ''
      }
    });

    // TODO: Replace these hardcoded values with dynamic values once there's a
    // GraphQL endpoint for these stats (and add thousands separators).
    const stats = computed(() => {
      return {
        games: 123,
        series: 123,
        platforms: 123,
        companies: 123,
        engines: 123,
        genres: 123
      }
    });

    return {
      data,
      stats
    };
  }
});
</script>
