<template>
  <div class="box" v-if="handleable">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <router-link :to="{ name: 'UserProfile', params: { slug: event.user.slug }}">
            <img v-if="event.user.avatarUrl !== null" :src="event.user.avatarUrl">
            <img v-else src="@/assets/images/default-avatar.png">
          </router-link>
        </figure>
      </div>
      <div class="media-content">
        <div class="content">

          <p v-if="event.eventable.__typename === 'GamePurchase'">
            <router-link :to="{ name: 'UserProfile', params: { slug: event.user.slug }}">
              {{ event.user.username }}
            </router-link>
            added
            <router-link :to="{ name: 'Game', params: { id: event.eventable.game.id }}">
              {{ event.eventable.game.name }}
            </router-link>
            to their library.
          </p>

          <p v-else-if="event.eventable.__typename === 'FavoriteGame'">
            <router-link :to="{ name: 'UserProfile', params: { slug: event.user.slug }}">
              {{ event.user.username }}
            </router-link>
            favorited
            <router-link
              v-text="event.eventable.game.name"
              :to="{ name: 'Game', params: { id: event.eventable.game.id }}"
            />.
          </p>

          <p v-else-if="event.eventable.__typename === 'User'">
            <router-link :to="{ name: 'UserProfile', params: { slug: event.user.slug }}">
              {{ event.user.username }}
            </router-link>
            created their account.
          </p>

          <p v-else-if="event.eventable.__typename === 'Relationship'">
            <router-link :to="{ name: 'UserProfile', params: { slug: event.user.slug }}">
              {{ event.user.username }}
            </router-link>
            started following
            <router-link
              v-text="event.eventable.followed.username"
              :to="{ name: 'UserProfile', params: { slug: event.eventable.followed.slug }}"
            />.
          </p>
          <!-- TODO: Add completion status support. -->

          <p>
            <span class="has-text-muted" :title="event.createdAt">
              {{ relativeTimeAgo }}
            </span>
            <template v-if="eventDeletable">
              <a @click="deleteEvent" class="ml-5" title="Delete">
                <svg-icon :name="'trash'"
                          :svg-classes="['has-fill-danger-hoverable']"
                          :css-style="'vertical-align: text-top;'"
                          :size="20"
                >
                  <trash-icon/>
                </svg-icon>
              </a>
            </template>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { DeleteEventDocument, EventCardFieldsFragment } from '@/generated/graphql';
import { computed, defineComponent, PropType } from 'vue';
import { format } from 'timeago.js';
import { useMutation } from 'villus';
import SvgIcon from '@/components/SvgIcon.vue';
import TrashIcon from '@/assets/icons/trash.svg';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'EventCard',
  components: {
    SvgIcon,
    TrashIcon
  },
  props: {
    event: {
      required: true,
      type: Object as PropType<EventCardFieldsFragment>
    }
  },
  emits: ['refresh'],
  setup(props, context) {
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

    const store = useStore<State>();

    const eventDeletable = computed(() => {
      return props.event.user.username === store.state.currentUser?.username;
    });

    const { execute } = useMutation(DeleteEventDocument);

    const deleteEvent = () => {
      if (confirm("Are you sure you want to delete this event?")) {
        execute({ id: props.event.id }).then(() => {
          // Refresh the events list after the event has been deleted.
          context.emit('refresh');
        });
      }
    };

    return {
      relativeTimeAgo,
      handleable,
      eventDeletable,
      deleteEvent
    };
  }
});
</script>
