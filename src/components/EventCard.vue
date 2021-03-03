<template>
  <div class="box">
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
    const eventText = computed(() => {
      return 'foo';
    });

    const relativeTimeAgo = computed(() => {
      return format(props.event.createdAt);
    });

    return {
      eventText,
      relativeTimeAgo
    };
  }
});
</script>
