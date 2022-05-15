<template>
  <div v-if="data && data.siteStatistics">
    <div class="card pt-15 pb-15" data-test-id="admin-dashboard-statistics-card">
      <div class="has-text-centered has-text-weight-bold mb-25">Statistics</div>
      <!-- Breaks the counts into two separate levels. -->
      <nav class="level" v-if="recordCountRows !== null">
        <div class="level-item has-text-centered" v-for="(count, key) in recordCountRows[0]" :key="key">
          <div>
            <p class="heading">{{ startCase(key.toString()) }}</p>
            <p class="title">{{ count }}</p>
          </div>
        </div>
      </nav>

      <nav class="level" v-if="recordCountRows !== null">
        <div class="level-item has-text-centered" v-for="(count, key) in recordCountRows[1]" :key="key">
          <div>
            <p class="heading">{{ startCase(key.toString()) }}</p>
            <p class="title">{{ count }}</p>
          </div>
        </div>
      </nav>
    </div>

    <div class="card mt-30 pt-15 pb-15">
      <div class="has-text-centered has-text-weight-bold mb-25">External Identifiers</div>
      <nav class="level" v-if="externalIdCounts !== null">
        <div class="level-item has-text-centered" v-for="(count, key) in externalIdCounts" :key="key">
          <div>
            <p class="heading">{{ startCase(key.toString()) }}</p>
            <p class="title">{{ count }}</p>
          </div>
        </div>
      </nav>
    </div>

    <div class="card mt-30 pt-15 pb-15">
      <div class="has-text-centered has-text-weight-bold mb-25">Version Counts</div>
      <nav class="level" v-if="versionCounts !== null">
        <div class="level-item has-text-centered" v-for="(count, key) in versionCounts" :key="key">
          <div>
            <p class="heading">{{ startCase(key.toString()) }}</p>
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
          <tr v-for="statistic in data.siteStatistics.nodes?.slice()" :key="statistic!.id">
            <template v-if="statistic">
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
            </template>
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
          <tr v-for="statistic in data.siteStatistics.nodes?.slice()" :key="statistic!.id">
            <template v-if="statistic">
              <td>{{ formatTimestamp(statistic.timestamp) }}</td>
              <td>{{ statistic.mobygamesIds }}</td>
              <td>{{ statistic.pcgamingwikiIds }}</td>
              <td>{{ statistic.wikidataIds }}</td>
              <td>{{ statistic.giantbombIds }}</td>
              <td>{{ statistic.steamAppIds }}</td>
              <td>{{ statistic.epicGamesStoreIds }}</td>
              <td>{{ statistic.gogIds }}</td>
              <td>{{ statistic.igdbIds }}</td>
            </template>
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
          <tr v-for="statistic in data.siteStatistics.nodes?.slice()" :key="statistic!.id">
            <template v-if="statistic">
              <td>{{ formatTimestamp(statistic.timestamp) }}</td>
              <td>{{ statistic.companyVersions }}</td>
              <td>{{ statistic.gameVersions }}</td>
              <td>{{ statistic.genreVersions }}</td>
              <td>{{ statistic.engineVersions }}</td>
              <td>{{ statistic.platformVersions }}</td>
              <td>{{ statistic.seriesVersions }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <pagination
      :page-name="'AdminDashboard'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { useQuery } from 'villus';
import { computed, defineComponent } from 'vue';
import { LiveStatisticsDocument, SiteStatisticsDocument } from '@/generated/graphql';
import Pagination from '@/components/Pagination.vue';
import { startCase } from 'lodash';

export default defineComponent({
  name: 'AdminDashboard',
  components: {
    Pagination
  },
  props: {
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
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after
      };
    });

    const { data, execute } = useQuery({
      query: SiteStatisticsDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.siteStatistics?.pageInfo.startCursor ?? null,
        endCursor: data.value?.siteStatistics?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.siteStatistics?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.siteStatistics?.pageInfo.hasNextPage ?? false
      };
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

    const { data: liveStatisticsData } = useQuery({ query: LiveStatisticsDocument });

    // Will return a pair of arrays of record counts, one for each row of
    // statistics to display.
    const recordCountRows = computed(() => {
      // Exit early if the query hasn't returned the data yet.
      if (liveStatisticsData.value === null) {
        return null;
      }

      let recordKeys = ['users', 'games', 'platforms', 'series', 'engines', 'companies', 'genres', 'stores', 'events', 'gamePurchases', 'relationships', 'gamesWithCovers', 'gamesWithReleaseDates', 'bannedUsers'];

      // Get half of the record keys array's length so we can split it in half.
      let half = Math.ceil(recordKeys.length / 2);

      let recordPairs = Object.entries(liveStatisticsData.value.liveStatistics).filter(([key]) => recordKeys.includes(key));

      // Cursed solution abusing splice to split the object in half.
      return [
        Object.fromEntries(recordPairs.splice(0, half)),
        Object.fromEntries(recordPairs.splice(-half))
      ];
    });

    const externalIdCounts = computed(() => {
      // Exit early if the query hasn't returned the data yet.
      if (liveStatisticsData.value === null) {
        return null;
      }

      let externalIdKeys = ['mobygamesIds', 'pcgamingwikiIds', 'wikidataIds', 'giantbombIds', 'steamAppIds', 'epicGamesStoreIds', 'gogIds', 'igdbIds'];

      return Object.fromEntries(
        Object.entries(liveStatisticsData.value.liveStatistics).filter(([key]) => externalIdKeys.includes(key))
      );
    });

    const versionCounts = computed(() => {
      // Exit early if the query hasn't returned the data yet.
      if (liveStatisticsData.value === null) {
        return null;
      }

      let versionKeys = ['companyVersions', 'gameVersions', 'genreVersions', 'engineVersions', 'platformVersions', 'seriesVersions'];

      return Object.fromEntries(
        Object.entries(liveStatisticsData.value.liveStatistics).filter(([key]) => versionKeys.includes(key))
      );
    });

    return {
      data,
      execute,
      pageInfo,
      formatTimestamp,
      recordCountRows,
      externalIdCounts,
      versionCounts,
      startCase
    };
  }
});
</script>
