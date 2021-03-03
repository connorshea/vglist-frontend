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
          <p>{{ eventText }}</p>

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
    // TODO: Add links here and make them work.
    const eventText = computed(() => {
      let text = '';

      switch (props.event.eventCategory) {
        case 'ADD_TO_LIBRARY':
          text = `${props.event.user.username} added ${props.event.eventable.game.name} to their library.`;
          break;
        case 'FAVORITE_GAME':
          text = `${props.event.user.username} favorited ${props.event.eventable.game.name}.`;
          break;
        case 'NEW_USER':
          text = `${props.event.user.username} created their account.`;
          break;
        case 'FOLLOWING':
          text = `${props.event.user.username} started following ${props.event.eventable.username}.`;
          break;
        case 'CHANGE_COMPLETION_STATUS':
          text = 'TODO';
          break;
      }

      return text;
    });

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
      eventText,
      relativeTimeAgo,
      handleable
    };
  }
});
</script>
