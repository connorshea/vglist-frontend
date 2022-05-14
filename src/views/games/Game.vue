<template>
  <div class="columns" v-if="data">
    <div class="game-sidebar column is-3-desktop is-5-tablet is-12-mobile">
      <div class="hero-image game-cover mb-10">
        <img v-if="data.game.coverUrl !== null" :src="data.game.coverUrl">
        <img v-else src="@/assets/images/no-cover.png">
      </div>

      <div v-if="userSignedIn" class="field buttons buttons-vertical">
        <a v-show="data.game.isFavorited" class="button is-fullwidth toggle-icon-on-hover" @click="unfavoriteGame">
          <svg-icon :name="'heart-full'" :classes="['is-inline-flex']" :svg-classes="['icon-1']" :fill="'red'">
            <heart-full-icon/>
          </svg-icon>
          <svg-icon :name="'heart-broken'" :classes="['is-inline-flex']" :svg-classes="['icon-2']" :fill="'red'">
            <heart-broken-icon/>
          </svg-icon>
          <span class="ml-5">Unfavorite</span>
        </a>
        <a v-show="!data.game.isFavorited" class="button is-fullwidth toggle-icon-on-hover" @click="favoriteGame">
          <svg-icon :name="'heart'" :classes="['is-inline-flex']" :svg-classes="['icon-1']" :fill="'red'">
            <heart-icon/>
          </svg-icon>
          <svg-icon :name="'heart-full'" :classes="['is-inline-flex']" :svg-classes="['icon-2']" :fill="'red'">
            <heart-full-icon/>
          </svg-icon>
          <span class="ml-5">Favorite</span>
        </a>
        <add-game-to-library :is-in-library="data.game.isInLibrary" :game="data.game" @refresh="refreshGame"/>

        <!-- Actions dropdown -->
        <div id="actions-dropdown" class="dropdown is-fullwidth mr-0-mobile" :class="{ 'is-active': actionsDropdownIsActive }">
          <div class="dropdown-trigger is-fullwidth" @click="toggleActionsDropdown">
            <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Actions</span>
              <svg-icon :name="'chevron-down'" :size="15" :classes="['icon']">
                <chevron-down-icon/>
              </svg-icon>
            </button>
          </div>

          <div class="dropdown-menu is-fullwidth" id="actions-dropdown-menu" role="menu">
            <div class="dropdown-content">
              <router-link v-if="userSignedIn" :to="{ name: 'EditGame', params: { id: data.game.id }}" class="dropdown-item">Edit</router-link>
              <a v-if="userIsModeratorOrAdmin && canRemoveCover" class="dropdown-item has-text-danger" @click="removeCover">Remove cover</a>
              <a v-if="userIsModeratorOrAdmin && canAddToWikidataBlocklist" class="dropdown-item has-text-danger" @click="addGameToWikidataBlocklist">Add to Wikidata Blocklist</a>
              <merge-games-button v-if="userIsAdmin" :game="data.game" />
              <a v-if="userIsModeratorOrAdmin" class="dropdown-item has-text-danger" @click="deleteGame">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="text-block mb-10-mobile">
        <h1 class="title" data-test-id="game-title">{{ data.game.name }}</h1>
        <game-infobox :game="data.game"/>
      </div>

      <template v-if="data.game.owners.totalCount > 0">
        <h3 class="title is-5 mb-5 mt-15">Owners ({{ data.game.owners.totalCount }})</h3>
        <ul class="avatar-image-grid mt-10" data-test-id="game-owners">
          <li v-for="owner in data.game.owners.nodes" :key="owner.id" class="avatar-image-grid-item">
            <router-link :to="{ name: 'UserProfile', params: { slug: owner.slug }}" class="image">
              <img v-if="owner.avatarUrl !== null" :src="owner.avatarUrl" :title="owner.username">
              <img v-else src="@/assets/images/default-avatar.png">
            </router-link>
          </li>
          <template v-if="data.game.owners.totalCount > 10">
            <li class="avatar-image-grid-item avatar-image-grid-item-overflow">
              <p class="has-text-weight-semibold">
                +{{ data.game.owners.totalCount - 10 }}
              </p>
            </li>
          </template>
        </ul>
      </template>
      <template v-else>
        <h3 class="title is-5 mb-5 mt-15">Owners</h3>
        <p class="has-text-muted" data-test-id="game-owners">No one has this game in their library yet.</p>
      </template>

      <template v-if="data.game.favoriters.totalCount > 0">
        <h3 class="title is-5 mb-5 mt-15">Favorites ({{ data.game.favoriters.totalCount }})</h3>
        <ul class="avatar-image-grid mt-10" data-test-id="game-favorites">
          <li v-for="favoriter in data.game.favoriters.nodes" :key="favoriter.id" class="avatar-image-grid-item">
            <router-link :to="{ name: 'UserProfile', params: { slug: favoriter.slug }}" class="image">
              <img v-if="favoriter.avatarUrl !== null" :src="favoriter.avatarUrl" :title="favoriter.username">
              <img v-else src="@/assets/images/default-avatar.png">
            </router-link>
          </li>
          <template v-if="data.game.favoriters.totalCount > 10">
            <li class="avatar-image-grid-item avatar-image-grid-item-overflow">
              <p class="has-text-weight-semibold">
                +{{ data.game.favoriters.totalCount - 10 }}
              </p>
            </li>
          </template>
        </ul>
      </template>
      <template v-else>
        <h3 class="title is-5 mb-5 mt-15">Favorites</h3>
        <p class="has-text-muted" data-test-id="game-favorites">No one has favorited this game yet.</p>
      </template>

      <div class="card more-from-this-series-card mt-15" v-if="data.game.series !== null && data.game.series.games.nodes.length > 1">
        <div class="card-content">
          <h3 class="title is-5 mb-15">
            <router-link :to="{ name: 'Series', params: { id: data.game.series.id } }">
              More from this series
            </router-link>
          </h3>

          <div class="games" data-test-id="game-others-in-series-card">
            <template v-for="gameInSeries in data.game.series.games.nodes">
              <router-link :to="{ name: 'Game', params: { id: gameInSeries.id } }" :key="gameInSeries.id" v-if="data.game.id !== gameInSeries.id">
                <figure class="game-cover">
                  <img v-if="gameInSeries.coverUrl !== null" :src="gameInSeries.coverUrl">
                  <img v-else src="@/assets/images/no-cover.png">
                  <p>{{ gameInSeries.name }}</p>
                </figure>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AddGameToWikidataBlocklistDocument, DeleteGameDocument, FavoriteGameDocument, GameDocument, RemoveGameCoverDocument, UnfavoriteGameDocument } from '@/generated/graphql';
import { computed, defineComponent, ref } from 'vue';
import { useMutation, useQuery } from 'villus';
import GameInfobox from '@/components/GameInfobox.vue';
import AddGameToLibrary from '@/components/AddGameToLibrary.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import HeartFullIcon from '@/assets/icons/heart-full.svg';
import HeartBrokenIcon from '@/assets/icons/heart-broken.svg';
import MergeGamesButton from '@/components/MergeGamesButton.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { State } from '@/store';

export default defineComponent({
  name: 'Game',
  components: {
    GameInfobox,
    AddGameToLibrary,
    SvgIcon,
    ChevronDownIcon,
    HeartIcon,
    HeartFullIcon,
    HeartBrokenIcon,
    MergeGamesButton
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const queryVariables = computed(() => {
      return { id: props.id };
    });

    const { data, execute } = useQuery({
      query: GameDocument,
      variables: queryVariables,
      cachePolicy: 'network-only'
    });

    const store = useStore<State>();
    const userSignedIn = computed(() => {
      return store.state.userSignedIn;
    });

    const router = useRouter();

    const { execute: executeFavoriteGame } = useMutation(FavoriteGameDocument);
    const { execute: executeUnfavoriteGame } = useMutation(UnfavoriteGameDocument);
    const { execute: executeRemoveGameCover } = useMutation(RemoveGameCoverDocument);
    const { execute: executeAddGameToWikidataBlocklist } = useMutation(AddGameToWikidataBlocklistDocument);
    const { execute: executeDeleteGame } = useMutation(DeleteGameDocument);

    const favoriteGame = () => {
      const gameId = data.value?.game?.id;
      // TODO: Error handling here?
      if (typeof gameId !== 'undefined') {
        executeFavoriteGame({ id: gameId }).then(() => {
          execute();
        });
      }
    }

    const unfavoriteGame = () => {
      const gameId = data.value?.game?.id;
      // TODO: Error handling here?
      if (typeof gameId !== 'undefined') {
        executeUnfavoriteGame({ id: gameId }).then(() => {
          execute();
        });
      }
    }

    const refreshGame = () => execute();

    const actionsDropdownIsActive = ref(false);
    const toggleActionsDropdown = () => actionsDropdownIsActive.value = !actionsDropdownIsActive.value;

    const userIsAdmin = computed(() => store.state.currentUser?.role === 'ADMIN');
    const userIsModeratorOrAdmin = computed(() => ['ADMIN', 'MODERATOR'].includes(store.state.currentUser?.role ?? ''));

    const canAddToWikidataBlocklist = computed(() => data.value?.game?.wikidataId !== null);
    const canRemoveCover = computed(() => data.value?.game?.coverUrl !== null);

    const removeCover = () => {
      if (confirm("Are you sure you want to remove this game's cover?")) {
        const gameId = data.value?.game?.id;
        if (typeof gameId !== 'undefined') {
          executeRemoveGameCover({ id: gameId }).then(() => {
            // Reload game data.
            execute();
          });
        }
      }
    };

    const addGameToWikidataBlocklist = () => {
      if (confirm("Are you sure you want to add this game to the blocklist?")) {
        const gameName = data.value?.game?.name;
        const wikidataId = data.value?.game?.wikidataId as number;

        if (typeof gameName !== 'undefined' && typeof wikidataId !== 'undefined') {
          executeAddGameToWikidataBlocklist({ name: gameName, wikidataId: wikidataId }).then(() => {
            // Reload game data.
            execute();
          })
        }
      }
    };

    const deleteGame = () => {
      if (confirm("Are you sure you want to delete this game?")) {
        const gameId = data.value?.game?.id;
        if (typeof gameId !== 'undefined') {
          executeDeleteGame({ id: gameId }).then(() => {
            // Redirect to Games list page.
            router.push({ name: 'Games' });
          });
        }
      }
    };

    return {
      data,
      userSignedIn,
      favoriteGame,
      unfavoriteGame,
      refreshGame,
      actionsDropdownIsActive,
      toggleActionsDropdown,
      userIsAdmin,
      userIsModeratorOrAdmin,
      canAddToWikidataBlocklist,
      canRemoveCover,
      removeCover,
      addGameToWikidataBlocklist,
      deleteGame
    };
  }
});
</script>
