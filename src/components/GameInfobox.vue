<template>
  <div class="box infobox">
    <div class="infobox-section">
      <p class="infobox-header has-text-weight-semibold">Average Rating</p>
      <p v-if="game.avgRating === null">No average rating yet</p>
      <p v-else><span class="has-text-weight-medium">{{ game.avgRating }}</span>/100</p>
    </div>

    <div v-if="game.releaseDate !== null" class="infobox-section">
      <p class="infobox-header has-text-weight-semibold">Release Date</p>
      <ul>
        <li>{{ formattedReleaseDate }}</li>
      </ul>
    </div>

    <div v-if="game.developers.nodes.length > 0" class="infobox-section">
      <p class="infobox-header has-text-weight-semibold">
        {{ game.developers.nodes.length | pluralize('Developer') }}
      </p>
      <ul>
        <li v-for="developer in game.developers.nodes" :key="developer.id">
          <router-link :to="{ name: 'Company', params: { id: developer.id }}">
            {{ developer.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="game.publishers.nodes.length > 0" class="infobox-section">
      <p class="infobox-header has-text-weight-semibold">
        {{ game.publishers.nodes.length | pluralize('Publisher') }}
      </p>
      <ul>
        <li v-for="publisher in game.publishers.nodes" :key="publisher.id">
          <router-link :to="{ name: 'Company', params: { id: publisher.id }}">
            {{ publisher.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="game.platforms.nodes.length > 0" class="infobox-section">
      <p class="infobox-header has-text-weight-semibold">
        {{ game.platforms.nodes.length | pluralize('Platform') }}
      </p>
      <ul>
        <li v-for="platform in game.platforms.nodes" :key="platform.id">
          <router-link :to="{ name: 'Platform', params: { id: platform.id }}">
            {{ platform.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="game.series !== null" class="infobox-section">
      <p class="infobox-header has-text-weight-semibold">Series</p>
      <ul>
        <li>
          <router-link :to="{ name: 'Series', params: { id: game.series.id }}">
            {{ game.series.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="game.genres.nodes.length > 0" class="infobox-section">
      <p class="infobox-header has-text-weight-semibold">
        {{ game.genres.nodes.length | pluralize('Genre') }}
      </p>
      <ul>
        <li v-for="genre in game.genres.nodes" :key="genre.id">
          <router-link :to="{ name: 'Genre', params: { id: genre.id }}">
            {{ genre.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div v-if="game.engines.nodes.length > 0" class="infobox-section">
      <p class="infobox-header has-text-weight-semibold">
        {{ game.engines.nodes.length | pluralize('Engine') }}
      </p>
      <ul>
        <li v-for="engine in game.engines.nodes" :key="engine.id">
          <router-link :to="{ name: 'Engine', params: { id: engine.id }}">
            {{ engine.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <template v-if="externalIdsExist">
      <div class="infobox-section">
        <p class="infobox-header has-text-weight-semibold">External links</p>
        <ul>
          <li v-if="game.wikidataId !== null"><a :href="wikidataUrl">Wikidata</a></li>
          <li v-if="game.pcgamingwikiId !== null"><a :href="pcgamingwikiUrl">PCGamingWiki</a></li>
          <template v-for="(steamUrl, index) in steamUrls">
            <li :key="steamUrl">
              <a :href="steamUrl">Steam {{ index > 0 ? '(alt)' : '' }}</a>
            </li>
          </template>
          <li v-if="game.epicGamesStoreId !== null"><a :href="epicGamesStoreUrl">Epic Games Store</a></li>
          <li v-if="game.gogId !== null"><a :href="gogUrl">GOG.com</a></li>
          <li v-if="game.mobygamesId !== null"><a :href="mobygamesUrl">MobyGames</a></li>
          <li v-if="game.giantbombId !== null"><a :href="giantbombUrl">GiantBomb</a></li>
          <li v-if="game.igdbId !== null"><a :href="igdbUrl">IGDB</a></li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'GameInfobox',
  props: {
    game: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const formattedReleaseDate = computed(() => {
      let options: Intl.DateTimeFormatOptions = { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('en', options).format(Date.parse(props.game.releaseDate));
    });

    const wikidataUrl = computed(() => {
      return `https://www.wikidata.org/wiki/Q${props.game.wikidataId}`;
    });
    const steamUrls: ComputedRef<string[]> = computed(() => {
      return props.game.steamAppIds.map((steamAppId: number) => {
        return `https://store.steampowered.com/app/${steamAppId}`;
      });
    });
    const epicGamesStoreUrl = computed(() => {
      return `https://www.epicgames.com/product/${props.game.epicGamesStoreId}`;
    });
    const gogUrl = computed(() => {
      return `https://www.gog.com/game/${props.game.gogId}`;
    });
    const mobygamesUrl = computed(() => {
      return `https://www.mobygames.com/game/${props.game.mobygamesId}`;
    });
    const giantbombUrl = computed(() => {
      return `https://www.giantbomb.com/wd/${props.game.giantbombId}`;
    });
    const igdbUrl = computed(() => {
      return `https://www.igdb.com/games/${props.game.igdbId}`;
    });
    const pcgamingwikiUrl = computed(() => {
      return `https://pcgamingwiki.com/wiki/${props.game.pcgamingwikiId}`;
    });

    const externalIdsExist = computed(() => {
      let idsExist = [
        props.game.wikidataId,
        props.game.pcgamingwikiId,
        props.game.mobygamesId,
        props.game.giantbombId,
        props.game.epicGamesStoreId,
        props.game.gogId,
        props.game.igdbId
      ].some((el) => el !== null);

      return idsExist || props.game.steamAppIds.length > 0;
    });

    return {
      formattedReleaseDate,
      wikidataUrl,
      steamUrls,
      epicGamesStoreUrl,
      gogUrl,
      mobygamesUrl,
      giantbombUrl,
      igdbUrl,
      pcgamingwikiUrl,
      externalIdsExist
    };
  }
});
</script>
