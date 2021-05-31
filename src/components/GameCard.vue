<template>
  <div class="custom-card game-card">
    <router-link :to="{ name: 'Game', params: { id: game.id } }" class="card-container">
      <figure class="game-cover">
        <img v-if="game.coverUrl !== null" :src="game.coverUrl">
        <img v-else src="@/assets/images/no-cover.png">
      </figure>
      <div class="card-content">
        <p class="title is-4 mr-10" data-test-id="game-card-title">
          {{ game.name }}
        </p>
        <p class="subtitle is-6" data-test-id="game-card-platforms" v-if="platforms !== null">
          {{ platforms }}
        </p>
        <p class="subtitle is-6" data-test-id="game-card-developers" v-if="developers !== null">
          {{ developers }}
        </p>
      </div>
    </router-link>

    <!-- Game card Dropdown -->
    <div class="dropdown dropdown-dynamic game-card-dropdown is-right" :class="{ 'is-active': isActive }" v-if="userSignedIn">
      <div class="dropdown-trigger">
        <button class="button is-borderless is-shadowless" aria-haspopup="true" aria-controls="dropdown-menu" @click="toggleActive">
          <svg-icon :name="'chevron-down'" :classes="['icon']" :size="15" />
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a v-if="game.isFavorited || localIsFavorited" class="dropdown-item" @click="unfavoriteGame">Unfavorite</a>
          <a v-else class="dropdown-item" @click="favoriteGame">Favorite</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Company, FavoriteGameDocument, Platform, UnfavoriteGameDocument } from '@/generated/graphql';
import { computed, defineComponent, ref } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { useMutation } from 'villus';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'GameCard',
  components: {
    SvgIcon
  },
  props: {
    game: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const platforms = computed(() => {
      if (props.game.platforms.nodes.size === 0) { return null; }
      return props.game.platforms.nodes.map((p: Platform) => p.name).join(', ');
    });
    const developers = computed(() => {
      if (props.game.developers.nodes.size === 0) { return null; }
      return props.game.developers.nodes.map((d: Company) => d.name).join(', ');
    });

    const { execute: executeFavoriteGame } = useMutation(FavoriteGameDocument);
    const { execute: executeUnfavoriteGame } = useMutation(UnfavoriteGameDocument);

    let isActive = ref<boolean>(false);

    // Tracks whether the game has been favorited, will be toggled when the
    // mutation is executed so we don't have to reload the game record.
    let localIsFavorited = ref<boolean>(props.game.isFavorited);

    const favoriteGame = () => {
      executeFavoriteGame({ id: props.game.id }).then(() => {
        // TODO: Add error handling for if the mutation fails.
        toggleActive();
        localIsFavorited.value = true;
      });
    };

    const unfavoriteGame = () => {
      executeUnfavoriteGame({ id: props.game.id }).then(() => {
        toggleActive();
        localIsFavorited.value = false;
      });
    };

    const toggleActive = () => isActive.value = !isActive.value;

    const store = useStore();
    const userSignedIn = computed(() => store.state.userSignedIn);

    return {
      isActive,
      platforms,
      developers,
      favoriteGame,
      unfavoriteGame,
      toggleActive,
      userSignedIn,
      localIsFavorited
    };
  }
});
</script>
