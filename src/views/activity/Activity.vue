<template>  
  <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile" v-if="data?.activity">
    <h1 class="title">Global Activity</h1>

    <activity-tabs :user-signed-in="userSignedIn"/>

    <div data-test-id="activity-events-list">
      <template v-for="event in data.activity.nodes" :key="event.id">
        <event-card :event="event" @refresh="execute"/>
      </template>
    </div>

    <pagination
      :page-name="'Activity'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { ActivityFeed, ActivityFeedDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import EventCard from '@/components/EventCard.vue';
import ActivityTabs from '@/components/ActivityTabs.vue';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'Activity',
  components: {
    EventCard,
    Pagination,
    ActivityTabs
  },
  props: {
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
        feedType: ActivityFeed.Global,
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after
      };
    });

    const { data, execute } = useQuery({
      query: ActivityFeedDocument,
      variables: queryVariables,
      cachePolicy: 'network-only' // To allow the query to be re-fetched after deleting an event.
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.activity?.pageInfo.startCursor ?? null,
        endCursor: data.value?.activity?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.activity?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.activity?.pageInfo.hasNextPage ?? false
      };
    });

    const store = useStore<State>();
    const userSignedIn = computed(() => store.state.userSignedIn);

    return {
      data,
      execute,
      userSignedIn,
      pageInfo
    };
  }
});
</script>
