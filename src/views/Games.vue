<template>
  <div class="games" v-if="data">
    <h1 class="title">Games</h1>

    <div class="columns">
      <div class="games-search-sidebar column is-3">
        <!-- <div class="dropdown is-fullwidth mr-0-mobile">
          <div class="dropdown-trigger is-fullwidth-mobile">
            <button class="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>
                <%= params[:order_by].nil? ? "Sort" : "Sort by #{params[:order_by].titleize.downcase}" %>
              </span>
              <span class="icon">
                <%= svg_icon('chevron-down', height: 15, aria: false) %>
              </span>
            </button>
          </div>

          <div class="dropdown-menu is-fullwidth" id="sort-dropdown-menu" role="menu">
            <div class="dropdown-content">
              <%= sort_dropdown_link(nil, 'Default') %>
              <%= sort_dropdown_link(:newest, 'Newest') %>
              <%= sort_dropdown_link(:oldest, 'Oldest') %>
              <%= sort_dropdown_link(:recently_updated, 'Recently updated') %>
              <%= sort_dropdown_link(:least_recently_updated, 'Least recently updated') %>
              <%= sort_dropdown_link(:most_favorites, 'Most favorites') %>
              <%= sort_dropdown_link(:most_owners, 'Most owners') %>
              <%= sort_dropdown_link(:recently_released, 'Recently released') %>
              <%= sort_dropdown_link(:highest_avg_rating, 'Highest average rating') %>
            </div>
          </div>
        </div>

        <div class="is-fullwidth-mobile">
          <div class="games-filters" data-vue-component="games-filters"></div>
        </div> -->
      </div>

      <div class="is-9 column">
        <div class="field buttons">
          <!-- <% if policy(@games).create? %>
            <%= link_to("Create a new game", new_game_path, class: 'button mr-0-mobile is-fullwidth-mobile') %>
          <% end %> -->
        </div>

        <div class="game-card-list mt-20">
          <div v-for="game in data.games.nodes" :key="game.id">
            <GameCard :game="game"/>
          </div>
        </div>

        <!-- <%= paginate @games %> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { GamesDocument } from '@/generated/graphql';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';

export default defineComponent({
  name: 'Games',
  components: {
    GameCard
  },
  setup() {
    const { data } = useQuery({
      query: GamesDocument,
      variables: {
        cursor: ''
      }
    });

    return { data };
  }
});
</script>
