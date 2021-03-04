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

    <div class="section section-home-overlap-card" v-if="statsData">
      <nav class="level card home-card stats-card column is-two-thirds m-auto">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ statsData.basicSiteStatistics.games.toLocaleString('en-US') }}</p>
            <p class="heading">
              <router-link to="/games">Games</router-link>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ statsData.basicSiteStatistics.series.toLocaleString('en-US') }}</p>
            <p class="heading">
              <router-link to="/series">Series</router-link>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ statsData.basicSiteStatistics.platforms.toLocaleString('en-US') }}</p>
            <p class="heading">
              <router-link to="/platforms">Platforms</router-link>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ statsData.basicSiteStatistics.companies.toLocaleString('en-US') }}</p>
            <p class="heading">
              <router-link to="/companies">Companies</router-link>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ statsData.basicSiteStatistics.engines.toLocaleString('en-US') }}</p>
            <p class="heading">
              <router-link to="/engines">Engines</router-link>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">{{ statsData.basicSiteStatistics.genres.toLocaleString('en-US') }}</p>
            <p class="heading">
              <router-link to="/genres">Genres</router-link>
            </p>
          </div>
        </div>
      </nav>

      <div class="game-card-list mt-20" v-if="gamesData">
        <div v-for="game in gamesData.games.nodes" :key="game.id">
          <GameCard :game="game"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GamesDocument, HomeStatisticsDocument } from '@/generated/graphql';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    GameCard
  },
  setup() {
    const { data: gamesData } = useQuery({
      query: GamesDocument,
      variables: {
        cursor: ''
      }
    });

    const { data: statsData } = useQuery({
      query: HomeStatisticsDocument
    });

    return {
      gamesData,
      statsData
    };
  }
});
</script>
