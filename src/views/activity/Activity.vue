<template>  
  <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile" v-if="data">
    <h1 class="title">Global Activity</h1>

    <template v-if="userSignedIn">
      <div class="tabs">
        <ul>
          <router-link :to="{ name: 'FollowingActivity' }" v-slot="{ href, navigate, isExactActive }">
            <li :class="[isExactActive && 'is-active']">
              <a :href="href" @click="navigate">Following</a>
            </li>
          </router-link>
          <router-link :to="{ name: 'Activity' }" v-slot="{ href, navigate, isExactActive }">
            <li :class="[isExactActive && 'is-active']">
              <a :href="href" @click="navigate">Global</a>
            </li>
          </router-link>
        </ul>
      </div>
    </template>

    <template v-for="event in data.activity.nodes" :key="event.id">
      <EventCard :event="event" @refresh="execute"/>
    </template>

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
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Activity',
  components: {
    EventCard,
    Pagination
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

    const store = useStore();
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
