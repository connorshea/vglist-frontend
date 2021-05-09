<template>
  <div v-if="data">
    <div class="card pt-15 pb-15">
      <div class="has-text-centered has-text-weight-bold mb-25">Statistics</div>
      <!-- Breaks the counts into two separate levels. -->
      <nav class="level">
        <div class="level-item has-text-centered" v-for="(count, key) in recordCountRows[0]" :key="key">
          <div>
            <p class="heading">{{ key }}</p>
            <p class="title">{{ count }}</p>
          </div>
        </div>
      </nav>

      <nav class="level">
        <div class="level-item has-text-centered" v-for="(count, key) in recordCountRows[1]" :key="key">
          <div>
            <p class="heading">{{ key }}</p>
            <p class="title">{{ count }}</p>
          </div>
        </div>
      </nav>
    </div>

    <div class="card mt-30 pt-15 pb-15">
      <div class="has-text-centered has-text-weight-bold mb-25">External Identifiers</div>
      <nav class="level">
        <div class="level-item has-text-centered" v-for="(count, key) in externalIdCounts" :key="key">
          <div>
            <p class="heading">{{ key }}</p>
            <p class="title">{{ count }}</p>
          </div>
        </div>
      </nav>
    </div>

    <div class="card mt-30 pt-15 pb-15">
      <div class="has-text-centered has-text-weight-bold mb-25">Version Counts</div>
      <nav class="level">
        <div class="level-item has-text-centered" v-for="(count, key) in versionCounts" :key="key">
          <div>
            <p class="heading">{{ key }}</p>
            <p class="title">{{ count }}</p>
          </div>
        </div>
      </nav>
    </div>

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
          <tr v-for="statistic in data.siteStatistics.nodes.slice()" :key="statistic.id">
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
          <tr v-for="statistic in data.siteStatistics.nodes.slice()" :key="statistic.id">
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
          <tr v-for="statistic in data.siteStatistics.nodes.slice()" :key="statistic.id">
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
import { computed, defineComponent } from '@vue/composition-api';
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

    // TODO: Replace with actual GraphQL query once it exists.
    const liveStatistics = {
      users: 123,
      games: 123,
      platforms: 123,
      series: 123,
      engines: 123,
      companies: 123,
      genres: 123,
      stores: 123,
      events: 123,
      gamePurchases: 123,
      relationships: 123,
      gamesWithCovers: 123,
      gamesWithReleaseDates: 123,
      bannedUsers: 123,
      mobygamesIds: 123,
      pcgamingwikiIds: 123,
      wikidataIds: 123,
      giantbombIds: 123,
      steamAppIds: 123,
      epicGamesStoreIds: 123,
      gogIds: 123,
      igdbIds: 123,
      companyVersions: 123,
      gameVersions: 123,
      genreVersions: 123,
      engineVersions: 123,
      platformVersions: 123,
      seriesVersions: 123
    };

    // Will return a pair of arrays of record counts, one for each row of
    // statistics to display.
    const recordCountRows = computed(() => {
      let recordKeys = ['users', 'games', 'platforms', 'series', 'engines', 'companies', 'genres', 'stores', 'events', 'gamePurchases', 'relationships', 'gamesWithCovers', 'gamesWithReleaseDates', 'bannedUsers'];

      // Get half of the record keys array's length so we can split it in half.
      let half = Math.ceil(recordKeys.length / 2);

      let recordPairs = Object.entries(liveStatistics).filter(([key]) => recordKeys.includes(key));

      // Cursed solution abusing splice to split the object in half.
      return [
        Object.fromEntries(recordPairs.splice(0, half)),
        Object.fromEntries(recordPairs.splice(-half))
      ];
    });

    const externalIdCounts = computed(() => {
      let externalIdKeys = ['mobygamesIds', 'pcgamingwikiIds', 'wikidataIds', 'giantbombIds', 'steamAppIds', 'epicGamesStoreIds', 'gogIds', 'igdbIds'];

      return Object.fromEntries(
        Object.entries(liveStatistics).filter(([key]) => externalIdKeys.includes(key))
      );
    });

    const versionCounts = computed(() => {
      let versionKeys = ['companyVersions', 'gameVersions', 'genreVersions', 'engineVersions', 'platformVersions', 'seriesVersions'];

      return Object.fromEntries(
        Object.entries(liveStatistics).filter(([key]) => versionKeys.includes(key))
      );
    });

    return {
      data,
      formatTimestamp,
      recordCountRows,
      externalIdCounts,
      versionCounts
    };
  }
});
</script>
