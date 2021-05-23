<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <text-field
      :form-class="formData.class"
      :attribute="formData.name.attribute"
      :label="formData.name.label"
      :required="true"
      v-model="game.name"
    />

    <date-field
      :form-class="formData.class"
      :attribute="formData.releaseDate.attribute"
      :label="formData.releaseDate.label"
      :required="false"
      v-model="game.releaseDate"
    />

    <multi-select
      :label="formData.genres.label"
      v-model="game.genres"
      :search-path="'genreSearch'"
      :graphqlQuery="GenreSearchDocument"
    />

    <multi-select
      :label="formData.engines.label"
      v-model="game.engines"
      :search-path="'engineSearch'"
      :graphqlQuery="EngineSearchDocument"
    />

    <multi-select
      :label="formData.developers.label"
      v-model="game.developers"
      :search-path="'companySearch'"
      :graphqlQuery="CompanySearchDocument"
    />

    <multi-select
      :label="formData.publishers.label"
      v-model="game.publishers"
      :search-path="'companySearch'"
      :graphqlQuery="CompanySearchDocument"
    />

    <multi-select
      :label="formData.platforms.label"
      v-model="game.platforms"
      :search-path="'platformSearch'"
      :graphqlQuery="PlatformSearchDocument"
    />

    <single-select
      :label="formData.series.label"
      v-model="game.series"
      :search-path="'seriesSearch'"
      :graphqlQuery="SeriesSearchDocument"
    />

    <number-field
      :form-class="formData.class"
      :attribute="formData.wikidataId.attribute"
      :label="formData.wikidataId.label"
      v-model="game.wikidataId"
    />

    <multi-select-generic
      :form-class="formData.class"
      :attribute="formData.steamAppIds.attribute"
      :label="formData.steamAppIds.label"
      :v-select-label="'app_id'"
      v-model="game.steamAppIds"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.epicGamesStoreId.attribute"
      :label="formData.epicGamesStoreId.label"
      v-model="game.epicGamesStoreId"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.gogId.attribute"
      :label="formData.gogId.label"
      v-model="game.gogId"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.igdbId.attribute"
      :label="formData.igdbId.label"
      v-model="game.igdbId"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.pcgamingwikiId.attribute"
      :label="formData.pcgamingwikiId.label"
      v-model="game.pcgamingwikiId"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.mobygamesId.attribute"
      :label="formData.mobygamesId.label"
      v-model="game.mobygamesId"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.giantbombId.attribute"
      :label="formData.giantbombId.label"
      v-model="game.giantbombId"
    />

    <button
      class="button is-primary mr-10 mr-0-mobile is-fullwidth-mobile"
      value="Submit"
      @click.prevent="onSubmit"
    >Submit</button>

    <router-link :to="cancelRouterLink" class="button is-fullwidth-mobile mt-5-mobile">
      Cancel
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import TextField from '@/components/fields/TextField.vue';
import SingleSelect from '@/components/fields/SingleSelect.vue';
import NumberField from '@/components/fields/NumberField.vue';
import MultiSelect from '@/components/fields/MultiSelect.vue';
import MultiSelectGeneric from '@/components/fields/MultiSelectGeneric.vue';
import DateField from '@/components/fields/DateField.vue';
import { useMutation } from 'villus';
import { UpdateGameDocument, CreateGameDocument, CompanySearchDocument, GenreSearchDocument, EngineSearchDocument, PlatformSearchDocument, SeriesSearchDocument } from '@/generated/graphql';

export default defineComponent({
  name: 'GameForm',
  components: {
    TextField,
    SingleSelect,
    NumberField,
    MultiSelect,
    MultiSelectGeneric,
    DateField
  },
  props: {
    id: {
      required: false,
      type: String,
      default: null
    },
    name: {
      required: false,
      type: String,
      default: ''
    },
    releaseDate: {
      type: Date,
      required: false
    },
    genres: {
      type: Array,
      required: false,
      default: () => []
    },
    engines: {
      type: Array,
      required: false,
      default: () => []
    },
    developers: {
      type: Array,
      required: false,
      default: () => []
    },
    publishers: {
      type: Array,
      required: false,
      default: () => []
    },
    platforms: {
      type: Array,
      required: false,
      default: () => []
    },
    series: {
      type: Object,
      required: false,
      default: () => {
        return { name: '' };
      }
    },
    steamAppIds: {
      type: Array,
      required: false,
      default: () => []
    },
    epicGamesStoreId: {
      type: String,
      required: false
    },
    gogId: {
      type: String,
      required: false
    },
    igdbId: {
      type: String,
      required: false
    },
    wikidataId: {
      type: Number,
      required: false
    },
    pcgamingwikiId: {
      type: String,
      required: false
    },
    mobygamesId: {
      type: String,
      required: false
    },
    giantbombId: {
      type: String,
      required: false
    },
    // Should be either 'create' or 'update'
    formState: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const formData = {
      class: 'game',
      cover: {
        label: 'Cover'
      },
      name: {
        label: 'Game title',
        attribute: 'name'
      },
      releaseDate: {
        label: 'Release Date',
        attribute: 'release_date'
      },
      genres: {
        label: 'Genres'
      },
      engines: {
        label: 'Engines'
      },
      developers: {
        label: 'Developers'
      },
      publishers: {
        label: 'Publishers'
      },
      platforms: {
        label: 'Platforms'
      },
      series: {
        label: 'Series'
      },
      steamAppIds: {
        label: 'Steam Application IDs',
        attribute: 'steam_app_ids'
      },
      epicGamesStoreId: {
        label: 'Epic Games Store ID',
        attribute: 'epic_games_store_id'
      },
      gogId: {
        label: 'GOG.com ID',
        attribute: 'gog_id'
      },
      igdbId: {
        label: 'IGDB ID',
        attribute: 'igdb_id'
      },
      wikidataId: {
        label: 'Wikidata ID',
        attribute: 'wikidata_id'
      },
      pcgamingwikiId: {
        label: 'PCGamingWiki ID',
        attribute: 'pcgamingwiki_id'
      },
      mobygamesId: {
        label: 'MobyGames ID',
        attribute: 'mobygames_id'
      },
      giantbombId: {
        label: 'Giant Bomb ID',
        attribute: 'giantbomb_id'
      }
    };

    const game = ref({
      id: props.id ?? null, 
      name: props.name ?? '',
      wikidataId: props.wikidataId ?? '',
      series: props.series as { id: string, name: string } ,
      platforms: props.platforms as Array<{ id: string, name: string }>,
      engines: props.engines as Array<{ id: string, name: string }>,
      genres: props.genres as Array<{ id: string, name: string }>,
      developers: props.developers as Array<{ id: string, name: string }>,
      publishers: props.publishers as Array<{ id: string, name: string }>,
      steamAppIds: props.steamAppIds as Array<number>,
      epicGamesStoreId: props.epicGamesStoreId,
      gogId: props.gogId,
      igdbId: props.igdbId,
      pcgamingwikiId: props.pcgamingwikiId,
      mobygamesId: props.mobygamesId,
      giantbombId: props.giantbombId
    });

    const title = computed(() => {
      return props.formState === 'create' ? 'Creating a new game' : `Editing ${props.name}`;
    });

    const onSubmit = () => {
      return props.formState === 'create' ? createGame() : updateGame();
    };

    const cancelRouterLink = computed(() => {
      return props.formState === 'create' ? { name: 'Game' } : { name: 'Game', params: { id: props.id }};
    });

    const { data: createGameData, execute: executeCreateGame, error: createGameErrors } = useMutation(CreateGameDocument);
    let createGame = () => {
      let { name, wikidataId, developers, publishers, engines, genres, platforms, series, steamAppIds, ...gameValues } = game.value;
      let executeVariables = {
        name: name ?? '',
        wikidataId: wikidataId.toString(),
        seriesId: series?.id,
        genreIds: genres.map(genre => genre.id),
        engineIds: engines.map(engine => engine.id),
        developerIds: developers.map(developer => developer.id),
        publisherIds: publishers.map(publisher => publisher.id),
        platformIds: platforms.map(platform => platform.id),
        steamAppIds: steamAppIds.map(appId => Number(appId)),
        ...gameValues
      };
      executeCreateGame(executeVariables).then(() => {
        if (createGameData.value.createGame?.game?.id) {
          context.root.$router.push({ name: 'Game', params: { id: createGameData.value.createGame.game.id }});
        } else {
          // TODO: Error handling.
          console.log(`Error: ${createGameErrors.value}`);
        }
      });
    };

    const { data: updateGameData, execute: executeUpdateGame, error: updateGameErrors } = useMutation(UpdateGameDocument);
    let updateGame = () => {
      let { id: gameId, wikidataId, developers, publishers, engines, genres, platforms, series, steamAppIds, ...gameValues } = game.value;
      if (gameId === null) { throw Error('Something went wrong and id is null.') }
      let executeVariables = {
        gameId: gameId,
        wikidataId: wikidataId.toString(),
        seriesId: series?.id,
        genreIds: genres.map(genre => genre.id),
        engineIds: engines.map(engine => engine.id),
        developerIds: developers.map(developer => developer.id),
        publisherIds: publishers.map(publisher => publisher.id),
        platformIds: platforms.map(platform => platform.id),
        steamAppIds: steamAppIds.map(appId => Number(appId)),
        ...gameValues
      };
      executeUpdateGame(executeVariables).then(() => {
        if (updateGameData.value.updateGame?.game?.id) {
          context.root.$router.push({ name: 'Game', params: { id: props.id }});
        } else {
          // TODO: Error handling.
          console.log(`Error: ${updateGameErrors.value}`);
        }
      });
    };

    return {
      formData,
      title,
      game,
      onSubmit,
      createGame,
      updateGame,
      cancelRouterLink,
      CompanySearchDocument,
      EngineSearchDocument,
      GenreSearchDocument,
      PlatformSearchDocument,
      SeriesSearchDocument
    };
  }
});
</script>
