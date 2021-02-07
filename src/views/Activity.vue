<template>  
  <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile">
    <h1 class="title">Global Activity</h1>

    <!--
    <% unless current_user.nil? %>
      <div class="tabs">
        <ul>
          <li class="<%= 'is-active' if current_page?(activity_following_path) %>">
            <%= link_to 'Following', activity_following_path %>
          </li>
          <li class="<%= 'is-active' if current_page?(activity_path) %>">
            <%= link_to 'Global', activity_path %>
          </li>
        </ul>
      </div>
    <% end %>

    <% @events.each do |event| %>
      <% if handleable_event?(event) %>
        <%= render 'shared/event', event: event %>
      <% end %>
    <% end %>
    -->

    <!-- <%= paginate @events %> -->
  </div>
</template>
