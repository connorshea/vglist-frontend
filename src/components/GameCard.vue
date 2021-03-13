<template>
  <div class="custom-card game-card">
    <router-link :to="{ name: 'Game', params: { id: game.id } }" class="card-container">
      <figure class="game-cover">
        <img v-if="game.coverUrl !== null" :src="game.coverUrl" />
        <img v-else src="@/assets/images/no-cover.png"/>
      </figure>
      <div class="card-content">
        <p class="title is-4 mr-10">{{ game.name }}</p>
        <p class="subtitle is-6" v-if="platforms !== null">{{ platforms }}</p>
        <p class="subtitle is-6" v-if="developers !== null">{{ developers }}</p>
      </div>
    </router-link>

    <!-- Game card Dropdown -->
    <div class="dropdown dropdown-dynamic game-card-dropdown is-right" :class="{ 'is-active': isActive }" v-if="userSignedIn">
      <div class="dropdown-trigger">
        <button class="button is-borderless is-shadowless" aria-haspopup="true" aria-controls="dropdown-menu" @click="toggleActive">
          <SvgIcon :name="'chevron-down'" :classes="['icon']" :size="15" />
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a v-if="game.isFavorited" class="dropdown-item" @click="unfavoriteGame">Unfavorite</a>
          <a v-else class="dropdown-item" @click="favoriteGame">Favorite</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Company, FavoriteGameDocument, Platform, UnfavoriteGameDocument } from '@/generated/graphql';
import { computed, defineComponent, ref } from '@vue/composition-api';
import SvgIcon from '@/components/SvgIcon.vue';
import { useMutation } from 'villus';

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
  setup(props, context) {
    let isActive = ref<boolean>(false);
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

    // TODO: Figure out a way to refresh the game query response here or mutate
    // it so that isFavorited isn't true anymore (maybe just have a second
    // variable that the v-if checks that we set here locally?).
    const favoriteGame = () => {
      executeFavoriteGame({ id: props.game.id }).then(() => toggleActive());
    };

    const unfavoriteGame = () => {
      executeUnfavoriteGame({ id: props.game.id }).then(() => toggleActive());
    };

    const toggleActive = () => isActive.value = !isActive.value;

    const userSignedIn = computed(() => {
      return context.root.$store.state.userSignedIn;
    });

    return {
      isActive,
      platforms,
      developers,
      favoriteGame,
      unfavoriteGame,
      toggleActive,
      userSignedIn
    };
  }
});
</script>
