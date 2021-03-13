<template>
  <div class="columns" v-if="data">
    <div class="game-sidebar column is-3-desktop is-5-tablet is-12-mobile">
      <div class="hero-image game-cover mb-10">
        <img v-if="data.game.coverUrl !== null" :src="data.game.coverUrl" />
        <img v-else src="@/assets/images/no-cover.png"/>
      </div>

      <div v-if="userSignedIn" class="field buttons buttons-vertical">
        <a v-show="data.game.isFavorited" class="button is-fullwidth toggle-icon-on-hover" @click="unfavoriteGame">
          <SvgIcon :name="'heart-full'" :classes="['is-inline-flex']" :svg-classes="['icon-1']" :fill="'red'"/>
          <SvgIcon :name="'heart-broken'" :classes="['is-inline-flex']" :svg-classes="['icon-2']" :fill="'red'"/>
          <span class='ml-5'>Unfavorite</span>
        </a>
        <a v-show="!data.game.isFavorited" class="button is-fullwidth toggle-icon-on-hover" @click="favoriteGame">
          <SvgIcon :name="'heart'" :classes="['is-inline-flex']" :svg-classes="['icon-1']" :fill="'red'"/>
          <SvgIcon :name="'heart-full'" :classes="['is-inline-flex']" :svg-classes="['icon-2']" :fill="'red'"/>
          <span class='ml-5'>Favorite</span>
        </a>
        <!-- add game to library -->
        <!-- Actions dropdown -->
      </div>
    </div>

    <div class="column">
      <div class="text-block mb-10-mobile">
        <h1 class="title">{{ data.game.name }}</h1>
        <GameInfobox :game="data.game"></GameInfobox>
      </div>

      <template v-if="data.game.owners.totalCount > 0">
        <h3 class="title is-5 mb-5 mt-15">Owners ({{ data.game.owners.totalCount }})</h3>
        <ul class='avatar-image-grid mt-10'>
          <li v-for="owner in data.game.owners.nodes" :key="owner.id" class='avatar-image-grid-item'>
            <router-link :to="{ name: 'UserProfile', params: { slug: owner.slug }}" class="image">
              <img v-if="owner.avatarUrl !== null" :src="owner.avatarUrl" :title="owner.username" />
              <img v-else src="@/assets/images/default-avatar.png" />
            </router-link>
          </li>
          <template v-if="data.game.owners.totalCount > 10">
            <li class='avatar-image-grid-item avatar-image-grid-item-overflow'>
              <p class="has-text-weight-semibold">
                +{{ data.game.owners.totalCount - 10 }}
              </p>
            </li>
          </template>
        </ul>
      </template>
      <template v-else>
        <h3 class="title is-5 mb-5 mt-15">Owners</h3>
        <p class="has-text-muted">No one has this game in their library yet.</p>
      </template>

      <template v-if="data.game.favoriters.totalCount > 0">
        <h3 class="title is-5 mb-5 mt-15">Favorites ({{ data.game.favoriters.totalCount }})</h3>
        <ul class='avatar-image-grid mt-10'>
          <li v-for="favoriter in data.game.favoriters.nodes" :key="favoriter.id" class='avatar-image-grid-item'>
            <router-link :to="{ name: 'UserProfile', params: { slug: favoriter.slug }}" class="image">
              <img v-if="favoriter.avatarUrl !== null" :src="favoriter.avatarUrl" :title="favoriter.username" />
              <img v-else src="@/assets/images/default-avatar.png" />
            </router-link>
          </li>
          <template v-if="data.game.favoriters.totalCount > 10">
            <li class='avatar-image-grid-item avatar-image-grid-item-overflow'>
              <p class="has-text-weight-semibold">
                +{{ data.game.favoriters.totalCount - 10 }}
              </p>
            </li>
          </template>
        </ul>
      </template>
      <template v-else>
        <h3 class="title is-5 mb-5 mt-15">Favorites</h3>
        <p class="has-text-muted">No one has favorited this game yet.</p>
      </template>

      <!-- <% if @games_in_series && @games_in_series.count.positive? %>
        <div class="card more-from-this-series-card mt-15">
          <div class="card-content">
            <h3 class="title is-5 mb-15">
              <%= link_to 'More from this series', series_path(@game.series) %>
            </h3>

            <div class="games">
              <% @games_in_series.each do |game| %>
                <%= link_to(game_path(game.id)) do %>
                  <figure class="game-cover">
                    <%= game_cover(game, size: :medium) %>
                    <p><%= game.name %></p>
                  </figure>
                <% end %>
              <% end %>
            </div>
          </div>
        </div>
      <% end %> -->
    </div>
  </div>
</template>

<script lang="ts">
import { FavoriteGameDocument, GameDocument, UnfavoriteGameDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useMutation, useQuery } from 'villus';
import GameInfobox from '@/components/GameInfobox.vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default defineComponent({
  name: 'Game',
  components: {
    GameInfobox,
    SvgIcon
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const { data, execute } = useQuery({
      query: GameDocument,
      variables: {
        id: props.id
      },
      cachePolicy: 'network-only'
    });

    const userSignedIn = computed(() => {
      return context.root.$store.state.userSignedIn;
    });

    const { execute: executeFavoriteGame } = useMutation(FavoriteGameDocument);
    const { execute: executeUnfavoriteGame } = useMutation(UnfavoriteGameDocument);

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

    return {
      data,
      userSignedIn,
      favoriteGame,
      unfavoriteGame
    };
  }
});
</script>
