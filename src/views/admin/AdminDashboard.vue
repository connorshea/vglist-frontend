<template>
  <div v-if="data">
    <!-- TODO: Statistics tables. -->

    <h3 class="has-text-centered mt-25 mb-10 has-text-weight-bold">Statistics Over Time</h3>
    <div class="table-container">
      <table class="table is-striped is-narrow is-bordered is-fullwidth">
        <thead>
          <tr>
            <th style="min-width: 250px;">Date</th>
            <th>Users</th>
            <th>Games</th>
            <th>Platforms</th>
            <th>Series</th>
            <th>Engines</th>
            <th>Companies</th>
            <th>Genres</th>
            <th>Stores</th>
            <th>Events</th>
            <th>Game Purchases</th>
            <th>Relationships</th>
            <th>Games with covers</th>
            <th>Games with release dates</th>
            <th>Banned users</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="statistic in data.siteStatistics.nodes.slice().reverse()" :key="statistic.id">
            <td>{{ formatTimestamp(statistic.timestamp) }}</td>
            <td>{{ statistic.users }}</td>
            <td>{{ statistic.games }}</td>
            <td>{{ statistic.platforms }}</td>
            <td>{{ statistic.series }}</td>
            <td>{{ statistic.engines }}</td>
            <td>{{ statistic.companies }}</td>
            <td>{{ statistic.genres }}</td>
            <td>{{ statistic.stores }}</td>
            <td>{{ statistic.events }}</td>
            <td>{{ statistic.gamePurchases }}</td>
            <td>{{ statistic.relationships }}</td>
            <td>{{ statistic.gamesWithCovers }}</td>
            <td>{{ statistic.gamesWithReleaseDates }}</td>
            <td>{{ statistic.bannedUsers }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="has-text-centered mt-15 mb-10 has-text-weight-bold">External IDs Over Time</h3>
    <div class="table-container">
      <table class="table is-striped is-narrow is-bordered is-fullwidth">
        <thead>
          <tr>
            <th style="min-width: 250px;">Date</th>
            <th>MobyGames IDs</th>
            <th>PCGamingWiki IDs</th>
            <th>Wikidata IDs</th>
            <th>GiantBomb IDs</th>
            <th>Steam App IDs</th>
            <th>Epic Games Store IDs</th>
            <th>GOG IDs</th>
            <th>IGDB IDs</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="statistic in data.siteStatistics.nodes.slice().reverse()" :key="statistic.id">
            <td>{{ formatTimestamp(statistic.timestamp) }}</td>
            <td>{{ statistic.mobygamesIds }}</td>
            <td>{{ statistic.pcgamingwikiIds }}</td>
            <td>{{ statistic.wikidataIds }}</td>
            <td>{{ statistic.giantbombIds }}</td>
            <td>{{ statistic.steamAppIds }}</td>
            <td>{{ statistic.epicGamesStoreIds }}</td>
            <td>{{ statistic.gogIds }}</td>
            <td>{{ statistic.igdbIds }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="has-text-centered mt-15 mb-10 has-text-weight-bold">Version Count Over Time</h3>
    <div class="table-container">
      <table class="table is-striped is-narrow is-bordered is-fullwidth">
        <thead>
          <tr>
            <th style="min-width: 250px;">Date</th>
            <th>Company Versions</th>
            <th>Game Versions</th>
            <th>Genre Versions</th>
            <th>Engine Versions</th>
            <th>Platform Versions</th>
            <th>Series Versions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="statistic in data.siteStatistics.nodes.slice().reverse()" :key="statistic.id">
            <td>{{ formatTimestamp(statistic.timestamp) }}</td>
            <td>{{ statistic.companyVersions }}</td>
            <td>{{ statistic.gameVersions }}</td>
            <td>{{ statistic.genreVersions }}</td>
            <td>{{ statistic.engineVersions }}</td>
            <td>{{ statistic.platformVersions }}</td>
            <td>{{ statistic.seriesVersions }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <%= paginate @statistics %> -->
  </div>
</template>

<script lang="ts">
import { useQuery } from 'villus';
import { defineComponent } from '@vue/composition-api';
import { SiteStatisticsDocument } from '@/generated/graphql';

export default defineComponent({
  name: 'AdminDashboard',
  setup() {
    const { data } = useQuery({
      query: SiteStatisticsDocument,
      variables: {
        cursor: ''
      }
    });

    const formatTimestamp = (timestamp: string) => {
      let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric', 
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
      } as Intl.DateTimeFormatOptions;

      return new Date(timestamp).toLocaleString('en-US', options);
    };

    return {
      data,
      formatTimestamp
    };
  }
});
</script>
