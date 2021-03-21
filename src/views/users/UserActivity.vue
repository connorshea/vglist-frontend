<template>
  <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile" v-if="data">
    <template v-if="data.user.activity.nodes.length > 0">
      <template v-for="event in data.user.activity.nodes">
        <EventCard :event="event" :key="event.id" @refresh="execute" />
      </template>
    </template>
    <template v-else>
      <!-- This technically shouldn't be possible since there's an event for a
          user's creation, but since users can delete events we include a
          message, just in case. -->
      <p class="has-text-centered has-text-muted">No activity for this user yet.</p>
    </template>

    <!-- <%= paginate @events %> -->
  </div>
</template>

<script lang="ts">
import { UserActivityDocument } from '@/generated/graphql';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import EventCard from '@/components/EventCard.vue';

export default defineComponent({
  name: 'UserActivity',
  components: {
    EventCard
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const { data, execute } = useQuery({
      query: UserActivityDocument,
      variables: {
        userId: props.user.id,
        cursor: ''
      },
      cachePolicy: 'network-only' // To allow the query to be re-fetched after deleting an event.
    });

    return { data, execute };
  }
});
</script>
