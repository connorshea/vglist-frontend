<template>
  <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile" v-if="data">
    <template v-if="data.user.activity.nodes.length > 0">
      <template v-for="event in data.user.activity.nodes" :key="event.id" >
        <EventCard :event="event" @refresh="execute" />
      </template>
    </template>
    <template v-else>
      <!-- This technically shouldn't be possible since there's an event for a
          user's creation, but since users can delete events we include a
          message, just in case. -->
      <p class="has-text-centered has-text-muted">No activity for this user yet.</p>
    </template>

    <pagination
      :page-name="'UserActivity'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { UserActivityDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import EventCard from '@/components/EventCard.vue';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'UserActivity',
  components: {
    EventCard,
    Pagination
  },
  props: {
    user: {
      required: true,
      type: Object
    },
    after: {
      type: String,
      required: false,
      default: null
    },
    before: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const queryVariables = computed(() => {
      return {
        userId: props.user.id,
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after
      };
    });

    const { data, execute } = useQuery({
      query: UserActivityDocument,
      variables: queryVariables,
      cachePolicy: 'network-only' // To allow the query to be re-fetched after deleting an event.
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.user?.activity?.pageInfo.startCursor ?? null,
        endCursor: data.value?.user?.activity?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.user?.activity?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.user?.activity?.pageInfo.hasNextPage ?? false
      };
    });

    return {
      data,
      execute,
      pageInfo
    };
  }
});
</script>
