<template>
  <div class="box" v-if="handleable">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <router-link :to="{ name: 'UserProfile', params: { slug: event.user.slug }}">
            <img v-if="event.user.avatarUrl !== null" :src="event.user.avatarUrl" />
            <img v-else src="@/assets/images/default-avatar.png"/>
          </router-link>
        </figure>
      </div>
      <div class="media-content">
        <div class="content">

          <p v-if="event.eventCategory === 'ADD_TO_LIBRARY'">
            <router-link :to="{ name: 'UserProfile', params: { slug: event.user.slug }}">
              {{ event.user.username }}
            </router-link>
            added
            <router-link :to="{ name: 'Game', params: { id: event.eventable.game.id }}">
              {{ event.eventable.game.name }}
            </router-link>
            to their library.
          </p>

          <p v-else-if="event.eventCategory === 'FAVORITE_GAME'">
            <router-link :to="{ name: 'UserProfile', params: { slug: event.user.slug }}">
              {{ event.user.username }}
            </router-link>
            favorited
            <router-link :to="{ name: 'Game', params: { id: event.eventable.game.id }}">
              {{ event.eventable.game.name }}
            </router-link>.
          </p>

          <p v-else-if="event.eventCategory === 'NEW_USER'">
            <router-link :to="{ name: 'UserProfile', params: { slug: event.user.slug }}">
              {{ event.user.username }}
            </router-link>
            created their account.
          </p>

          <p v-else-if="event.eventCategory === 'FOLLOWING'">
            <router-link :to="{ name: 'UserProfile', params: { slug: event.user.slug }}">
              {{ event.user.username }}
            </router-link>
            started following
            <router-link :to="{ name: 'UserProfile', params: { slug: event.eventable.followed.slug }}">
              {{ event.eventable.followed.username }}
            </router-link>.
          </p>
          <!-- TODO: Add completion status support. -->

          <p>
            <span class="has-text-muted" :title="event.createdAt">
              {{ relativeTimeAgo }}
            </span>
            <!-- <% if policy(event).destroy? %>
              <%= link_to event_path(event.id),
                data: { confirm: "Are you sure you want to delete this event?" },
                method: :delete, class: 'ml-5' do %>
                <%= svg_icon('trash', css_class: 'has-fill-danger-hoverable', title: 'Delete', options: { style: 'vertical-align: text-top;' }) %>
              <% end %>
            <% end %> -->
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { format } from 'timeago.js';

export default defineComponent({
  name: 'EventCard',
  props: {
    event: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const relativeTimeAgo = computed(() => {
      return format(props.event.createdAt);
    });

    // Are we able to handle (aka "render valid text for") this event?
    const handleable = computed(() => {
      if (['ADD_TO_LIBRARY', 'FAVORITE_GAME', 'NEW_USER', 'FOLLOWING'].includes(props.event.eventCategory)) {
        return true;
      } else if (props.event.eventCategory === 'CHANGE_COMPLETION_STATUS') {
        // TODO: Implement this when differences is added to the GraphQL API.
        return false;
      } else {
        // This shouldn't happen unless a new event category is introduced.
        return false;
      }
    });

    return {
      relativeTimeAgo,
      handleable
    };
  }
});
</script>
