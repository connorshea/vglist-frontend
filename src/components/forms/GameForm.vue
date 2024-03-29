<template>
  <div>
    <h1 class="title" data-test-id="form-title">{{ title }}</h1>

    <error-box
      :errors="errors"
      :record-type="'game'"
    />

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
      :graphql-query="GenreSearchDocument"
    />

    <multi-select
      :label="formData.engines.label"
      v-model="game.engines"
      :search-path="'engineSearch'"
      :graphql-query="EngineSearchDocument"
    />

    <multi-select
      :label="formData.developers.label"
      v-model="game.developers"
      :search-path="'companySearch'"
      :graphql-query="CompanySearchDocument"
    />

    <multi-select
      :label="formData.publishers.label"
      v-model="game.publishers"
      :search-path="'companySearch'"
      :graphql-query="CompanySearchDocument"
    />

    <multi-select
      :label="formData.platforms.label"
      v-model="game.platforms"
      :search-path="'platformSearch'"
      :graphql-query="PlatformSearchDocument"
    />

    <single-select
      :label="formData.series.label"
      v-model="game.series"
      :search-path="'seriesSearch'"
      :graphql-query="SeriesSearchDocument"
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
      class="button is-primary mr-10 mr-0-mobile is-fullwidth-mobile js-submit-button"
      value="Submit"
      @click.prevent="onSubmit"
    >Submit</button>

    <router-link :to="cancelRouterLink" class="button is-fullwidth-mobile mt-5-mobile">
      Cancel
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import TextField from '@/components/fields/TextField.vue';
import SingleSelect from '@/components/fields/SingleSelect.vue';
import NumberField from '@/components/fields/NumberField.vue';
import MultiSelect from '@/components/fields/MultiSelect.vue';
import MultiSelectGeneric from '@/components/fields/MultiSelectGeneric.vue';
import DateField from '@/components/fields/DateField.vue';
import ErrorBox from '@/components/ErrorBox.vue';
import { useMutation } from 'villus';
import { UpdateGameDocument, CreateGameDocument, CompanySearchDocument, GenreSearchDocument, EngineSearchDocument, PlatformSearchDocument, SeriesSearchDocument } from '@/generated/graphql';
import { submitButtonErrorAnimation } from '@/helpers/submitButtonErrorAnimation';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'GameForm',
  components: {
    TextField,
    SingleSelect,
    NumberField,
    MultiSelect,
    MultiSelectGeneric,
    DateField,
    ErrorBox
  },
  props: {
    id: {
      required: false,
      type: String,
      default: null
    },
    name: {
      required: false,
      type: String as PropType<string | null>,
      default: ''
    },
    releaseDate: {
      type: Date as PropType<Date | null>,
      required: false,
      default: () => null
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
      type: Object as PropType<{ name: string } | null>,
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
      type: String as PropType<string | null>,
      required: false,
      default: ''
    },
    gogId: {
      type: String as PropType<string | null>,
      required: false,
      default: ''
    },
    igdbId: {
      type: String as PropType<string | null>,
      required: false,
      default: ''
    },
    wikidataId: {
      type: [String, Number] as PropType<string | number | null>,
      required: false,
      default: null
    },
    pcgamingwikiId: {
      type: String as PropType<string | null>,
      required: false,
      default: ''
    },
    mobygamesId: {
      type: String as PropType<string | null>,
      required: false,
      default: ''
    },
    giantbombId: {
      type: String as PropType<string | null>,
      required: false,
      default: ''
    },
    // Should be either 'create' or 'update'
    formState: {
      required: true,
      type: String
    }
  },
  setup(props) {
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

    const router = useRouter();

    const errors: Ref<string[]> = ref([]);

    const game = ref({
      id: props.id ?? null, 
      name: props.name ?? '',
      // Hack to format the release date in YYYY-MM-DD, without a time element.
      releaseDate: props.releaseDate?.toISOString().split('T')[0] ?? null,
      wikidataId: props.wikidataId?.toString() ?? '',
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
      return props.formState === 'create' ? { name: 'Games' } : { name: 'Game', params: { id: props.id }};
    });

    const { data: createGameData, execute: executeCreateGame, error: createGameErrors } = useMutation(CreateGameDocument);
    let createGame = () => {
      let {
        name,
        releaseDate,
        wikidataId,
        developers,
        publishers,
        engines,
        genres,
        platforms,
        series,
        steamAppIds,
        epicGamesStoreId,
        igdbId,
        mobygamesId,
        giantbombId,
        pcgamingwikiId,
        gogId
      } = game.value;

      let executeVariables = {
        name: name,
        releaseDate: coerceReleaseDate(releaseDate),
        wikidataId: wikidataId.toString(),
        seriesId: series?.id,
        genreIds: genres.map(genre => genre.id),
        engineIds: engines.map(engine => engine.id),
        developerIds: developers.map(developer => developer.id),
        publisherIds: publishers.map(publisher => publisher.id),
        platformIds: platforms.map(platform => platform.id),
        steamAppIds: steamAppIds.map(appId => Number(appId)),
        epicGamesStoreId: epicGamesStoreId === '' ? null : epicGamesStoreId,
        igdbId: igdbId === '' ? null : igdbId,
        mobygamesId: mobygamesId === '' ? null : mobygamesId,
        giantbombId: giantbombId === '' ? null : giantbombId,
        pcgamingwikiId: pcgamingwikiId === '' ? null : pcgamingwikiId,
        gogId: gogId === '' ? null : gogId
      };

      executeCreateGame(executeVariables).then(() => {
        if (createGameData.value.createGame?.game?.id) {
          router.push({ name: 'Game', params: { id: createGameData.value.createGame.game.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = createGameErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    const { data: updateGameData, execute: executeUpdateGame, error: updateGameErrors } = useMutation(UpdateGameDocument);
    let updateGame = () => {
      let {
        id: gameId,
        name,
        releaseDate,
        wikidataId,
        developers,
        publishers,
        engines,
        genres,
        platforms,
        series,
        steamAppIds,
        epicGamesStoreId,
        igdbId,
        mobygamesId,
        giantbombId,
        pcgamingwikiId,
        gogId
      } = game.value;

      if (gameId === null) { throw Error('Something went wrong and id is null.') }

      let executeVariables = {
        gameId: gameId,
        name: name,
        releaseDate: coerceReleaseDate(releaseDate),
        wikidataId: wikidataId.toString(),
        seriesId: series?.id,
        genreIds: genres.map(genre => genre.id),
        engineIds: engines.map(engine => engine.id),
        developerIds: developers.map(developer => developer.id),
        publisherIds: publishers.map(publisher => publisher.id),
        platformIds: platforms.map(platform => platform.id),
        steamAppIds: steamAppIds.map(appId => Number(appId)),
        epicGamesStoreId: epicGamesStoreId === '' ? null : epicGamesStoreId,
        igdbId: igdbId === '' ? null : igdbId,
        mobygamesId: mobygamesId === '' ? null : mobygamesId,
        giantbombId: giantbombId === '' ? null : giantbombId,
        pcgamingwikiId: pcgamingwikiId === '' ? null : pcgamingwikiId,
        gogId: gogId === '' ? null : gogId
      };
      executeUpdateGame(executeVariables).then(() => {
        if (updateGameData.value.updateGame?.game?.id) {
          router.push({ name: 'Game', params: { id: props.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = updateGameErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    /**
     * Coerces the provided release date if possible into an ISO-formatted Date.
     *
     * @param date The release date to coerce into a string.
     * @return the coerced release date in YYYY-MM-DD format, or `null`.
     */
    const coerceReleaseDate = (date: string | null) => {
      if (date === '' || date === null) { return null; }
      return new Date(date).toISOString();
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
      SeriesSearchDocument,
      errors
    };
  }
});
</script>
