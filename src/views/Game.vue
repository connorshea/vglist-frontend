<template>
  <div class="columns" v-if="data.game">
    <div class="game-sidebar column is-3-desktop is-5-tablet is-12-mobile">
      <div class="hero-image game-cover mb-10">
        <!-- <%= game_cover(@game, size: :large) %> -->
      </div>

      <div class="field buttons buttons-vertical">
        <!-- favorite button -->
        <!-- add game to library -->
        <!-- Actions dropdown -->
      </div>
    </div>

    <div class="column">
      <div class="text-block mb-10-mobile">
        <h1 class="title">{{ data.game.name }}</h1>
        <!-- <%= render 'infobox', game: @game %> -->
      </div>

      <!-- <% if @owners_count.positive? %>
        <h3 class="title is-5 mb-5 mt-15">Owners (<%= @owners_count %>)</h3>
        <ul class='avatar-image-grid mt-10'>
          <% @owners.each do |owner| %>
            <li class='avatar-image-grid-item'>
              <%= link_to(user_path(owner), class: 'image') do %>
                <%= user_avatar(owner, size: :small, title: owner.username) %>
              <% end %>
            </li>
          <% end %>
          <% unless @owners_count == @owners.count %>
            <li class='avatar-image-grid-item avatar-image-grid-item-overflow'>
              <p class="has-text-weight-semibold">
                <%= "+#{@owners_count - @owners.count}" %>
              </p>
            </li>
          <% end %>
        </ul>
      <% else %>
        <h3 class="title is-5 mb-5 mt-15">Owners</h3>
        <p class="has-text-muted">No one has this game in their library yet.</p>
      <% end %> -->

      <!-- <% if @favoriters_count.positive? %>
        <h3 class="title is-5 mb-5 mt-15">Favorites (<%= @favoriters_count %>)</h3>
        <ul class='avatar-image-grid mt-10'>
          <% @favoriters.each do |favoriter| %>
            <li class='avatar-image-grid-item'>
              <%= link_to(user_path(favoriter), class: 'image') do %>
                <%= user_avatar(favoriter, size: :small, title: favoriter.username) %>
              <% end %>
            </li>
          <% end %>
          <% unless @favoriters_count == @favoriters.count %>
            <li class='avatar-image-grid-item avatar-image-grid-item-overflow'>
              <p class="has-text-weight-semibold">
                <%= "+#{@favoriters_count - @favoriters.count}" %>
              </p>
            </li>
          <% end %>
        </ul>
      <% else %>
        <h3 class="title is-5 mb-5 mt-15">Favorites</h3>
        <p class="has-text-muted">No one has favorited this game yet.</p>
      <% end %> -->

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
import { GameDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Game',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: GameDocument,
      variables: {
        id: props.id
      }
    });

    return { data };
  }
});
</script>
