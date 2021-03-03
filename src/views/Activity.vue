<template>  
  <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile" v-if="data">
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
    -->

    <template v-for="event in data.activity.nodes">
      <!-- <template v-if="eventIsHandleable"> -->
        <EventCard :event="event" :key="event.id"></EventCard>
      <!-- </template> -->
    </template>

    <!-- <%= paginate @events %> -->
  </div>
</template>

<script lang="ts">
import { ActivityFeed, ActivityFeedDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import EventCard from '@/components/EventCard.vue';

export default defineComponent({
  name: 'Activity',
  components: {
    EventCard
  },
  setup() {
    const { data } = useQuery({
      query: ActivityFeedDocument,
      variables: {
        feedType: ActivityFeed.Global
      }
    });

    return { data };
  }
});
</script>
