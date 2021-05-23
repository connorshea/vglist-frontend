<template>
  <div class="edit-game" v-if="isLoaded">
    <template v-if="userCanEdit">
      <GameForm
        v-bind="game"
        :form-state="'update'"
      />
    </template>
    <template v-else>
      <p>You cannot edit this game.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { GameDocument } from '@/generated/graphql';
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import { useQuery } from 'villus';
import GameForm from '@/components/forms/GameForm.vue';

export default defineComponent({
  name: 'EditGame',
  components: {
    GameForm
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const { execute: executeQuery } = useQuery({
      query: GameDocument,
      variables: {
        id: props.id
      },
      fetchOnMount: false,
      cachePolicy: 'network-only'
    });

    type GameRef = Ref<{
      id: string,
      name: string | null,
      wikidataId: number | string | null,
      releaseDate: Date | null,
      series: { id: string, name: string } | null,
      platforms: Array<{ id: string, name: string}>,
      engines: Array<{ id: string, name: string}>,
      genres: Array<{ id: string, name: string}>,
      developers: Array<{ id: string, name: string}>,
      publishers: Array<{ id: string, name: string}>,
      steamAppIds: Array<number>,
      epicGamesStoreId: string | null,
      gogId: string | null,
      igdbId: string | null,
      pcgamingwikiId: string | null,
      mobygamesId: string | null,
      giantbombId: string | null
    }>;

    const game: GameRef = ref({
      id: props.id,
      name: null,
      wikidataId: null,
      releaseDate: null,
      series: null,
      platforms: [],
      engines: [],
      genres: [],
      developers: [],
      publishers: [],
      steamAppIds: [],
      epicGamesStoreId: null,
      gogId: null,
      igdbId: null,
      pcgamingwikiId: null,
      mobygamesId: null,
      giantbombId: null
    });

    // Don't try to render the form until the data is fully loaded, to make
    // sure we can pre-populate the form as necessary.
    const isLoaded = ref(false);

    type VglistRecord = { id: string, name: string };

    executeQuery().then(({ data }) => {
      game.value.name = data?.game?.name ?? null;
      game.value.wikidataId = data?.game?.wikidataId ?? null;
      game.value.releaseDate = new Date(data?.game?.releaseDate) ?? null;
      game.value.steamAppIds = data?.game?.steamAppIds ?? [];
      game.value.series = data?.game?.series === null ? null : { id: data?.game?.series?.id, name: data?.game?.series?.name } as VglistRecord;
      game.value.engines = data?.game?.engines?.nodes?.map(engine => {
        return { id: engine?.id, name: engine?.name } as VglistRecord;
      }) ?? [];
      game.value.genres = data?.game?.genres?.nodes?.map(genre => {
        return { id: genre?.id, name: genre?.name } as VglistRecord;
      }) ?? [];
      game.value.developers = data?.game?.developers?.nodes?.map(developer => {
        return { id: developer?.id, name: developer?.name } as VglistRecord;
      }) ?? [];
      game.value.publishers = data?.game?.publishers?.nodes?.map(publisher => {
        return { id: publisher?.id, name: publisher?.name } as VglistRecord;
      }) ?? [];
      game.value.platforms = data?.game?.platforms?.nodes?.map(platform => {
        return { id: platform?.id, name: platform?.name } as VglistRecord;
      }) ?? [];
      game.value.steamAppIds = data?.game?.steamAppIds ?? [];
      game.value.epicGamesStoreId = data?.game?.epicGamesStoreId ?? null;
      game.value.gogId = data?.game?.gogId ?? null;
      game.value.igdbId = data?.game?.igdbId ?? null;
      game.value.pcgamingwikiId = data?.game?.pcgamingwikiId ?? null;
      game.value.mobygamesId = data?.game?.mobygamesId ?? null;
      game.value.giantbombId = data?.game?.giantbombId ?? null;
      isLoaded.value = true;
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    const userCanEdit = userSignedIn;

    return {
      isLoaded,
      userSignedIn,
      userCanEdit,
      game
    };
  }
});
</script>
