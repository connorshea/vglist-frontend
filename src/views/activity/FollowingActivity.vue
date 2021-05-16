<template>  
  <div class="ml-50 mr-50 mr-0-mobile ml-0-mobile" v-if="data">
    <h1 class="title">Activity</h1>

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

    <template v-for="event in data.activity.nodes">
      <EventCard :event="event" :key="event.id" @refresh="execute"/>
    </template>

    <!-- <%= paginate @events %> -->
  </div>
</template>

<script lang="ts">
import { ActivityFeed, ActivityFeedDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import EventCard from '@/components/EventCard.vue';

export default defineComponent({
  name: 'FollowingActivity',
  components: {
    EventCard
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
  setup(props, context) {
    const queryVariables = computed(() => {
      return {
        feedType: ActivityFeed.Following,
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

    const userSignedIn = computed(() => {
      return context.root.$store.state.userSignedIn;
    });

    return {
      data,
      execute,
      userSignedIn,
      pageInfo
    };
  }
});
</script>
