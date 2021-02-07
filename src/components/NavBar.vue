<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item has-text-weight-semibold" title='vglist Home'>
        <img alt="vglist logo" src="../assets/vglist-logo.svg" width="80px" class="mt-5" aria-hidden="true">
      </router-link>
      <!-- Hamburger menu for mobile -->
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu is-shadowless" id="navMenu">
      <div class="navbar-start">
        <!-- Placeholder search input until the Vue component loads. -->
        <div class="navbar-item has-dropdown field mt-10">
          <p class="control">
            Search
          </p>
        </div>

        <!-- Link to the global activity if the user isn't logged in. -->
        <a class="navbar-item" :href="userSignedIn ? '/activity' : '/activity/following'">Activity</a>
        <router-link to="/games" class="navbar-item">Games</router-link>
        <router-link to="/users" class="navbar-item">Users</router-link>
        
        <!-- Include these on mobile. -->
        <router-link to="/platforms" class="navbar-item is-hidden-desktop">Platforms</router-link>
        <router-link to="/genres" class="navbar-item is-hidden-desktop">Genres</router-link>
        <router-link to="/companies" class="navbar-item is-hidden-desktop">Companies</router-link>
        <router-link to="/engines" class="navbar-item is-hidden-desktop">Engines</router-link>
        <router-link to="/series" class="navbar-item is-hidden-desktop">Series</router-link>
        <router-link to="/stores" class="navbar-item is-hidden-desktop">Stores</router-link>

        <!-- Hide these behind a dropdown on desktop. -->
        <div class="navbar-item has-dropdown is-hoverable is-hidden-touch">
          <a class="navbar-link" aria-haspopup="menu" aria-controls="navbar-dropdown-more-mobile">More</a>

          <div id="navbar-dropdown-more-mobile" class="navbar-dropdown is-right">
            <router-link to="/platforms" class="navbar-item">Platforms</router-link>
            <router-link to="/genres" class="navbar-item">Genres</router-link>
            <router-link to="/companies" class="navbar-item">Companies</router-link>
            <router-link to="/engines" class="navbar-item">Engines</router-link>
            <router-link to="/series" class="navbar-item">Series</router-link>
            <router-link to="/stores" class="navbar-item">Stores</router-link>
          </div>
        </div>
      </div>

      <!-- This is a bit screwy because we hide the dropdown items on mobile
          and replace them with normal items so stuff doesn't look as weird. -->
      <div class="navbar-end">
        <template v-if="userSignedIn">
          <div class="navbar-item has-dropdown is-hoverable is-hidden-touch">
            <a class="navbar-link">
              <!-- userAvatar(currentUser, size: :small) -->
              <span class='pl-10'>{{ currentUser.username }}</span>
            </a>

            <div class="navbar-dropdown is-right">
              <!-- <% navbar_items.each do |navbar_item| %>
                <% if navbar_item[:title].nil? %>
                  <hr class="navbar-divider">
                <% elsif !navbar_item[:method].nil? %>
                  <%= link_to(navbar_item[:title], navbar_item[:path], method: navbar_item[:method], class: "navbar-item") %>
                <% else %>
                  <%= link_to(navbar_item[:title], navbar_item[:path], class: "navbar-item") %>
                <% end %>
              <% end %> -->
            </div>
          </div>

          <!-- <% navbar_items.each do |navbar_item| %>
            <% unless navbar_item[:title].nil? %>
              <% if navbar_item[:method].nil? %>
                <%= link_to(navbar_item[:title], navbar_item[:path], class: "navbar-item is-hidden-desktop") %>
              <% else %>
                <%= link_to(navbar_item[:title], navbar_item[:path], method: navbar_item[:method], class: "navbar-item is-hidden-desktop") %>
              <% end %>
            <% end %>
          <% end %> -->
        </template>
        <template v-else>
          <router-link href="/sign_up" class="navbar-item">Sign up</router-link>
          <router-link href="/sign_in" class="navbar-item">Sign in</router-link>
          <!-- <% navbar_items.each do |navbar_item| %>
            <%= link_to(navbar_item[:title], navbar_item[:path], class: "navbar-item is-hidden-desktop") %>
          <% end %> -->
          
          <div class="navbar-item has-dropdown is-hoverable is-hidden-touch">
            <a class="navbar-link" aria-haspopup="menu" aria-controls="navbar-dropdown-more-desktop">More</a>
            <!--
            <div id="navbar-dropdown-more-desktop" class="navbar-dropdown is-right">
              <% navbar_items.each do |navbar_item| %>
                <%= link_to(navbar_item[:title], navbar_item[:path], class: "navbar-item") %>
              <% end %>
            </div> -->
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NavBar',
  props: {
    userSignedIn: Boolean,
    currentUser: Object
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
