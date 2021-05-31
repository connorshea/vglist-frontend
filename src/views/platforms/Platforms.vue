<template>
  <div class="platforms" v-if="data">
    <h1 class="title">Platforms</h1>

    <p v-if="userSignedIn">
      <router-link :to="{ name: 'CreatePlatform' }" class="button is-fullwidth-mobile mb-10">Create a new platform</router-link>
    </p>

    <ul>
      <li v-for="platform in data.platforms.nodes" :key="platform.id">
        <router-link :to="{ name: 'Platform', params: { id: platform.id }}">
          {{ platform.name }}
        </router-link>
      </li>
    </ul>

    <pagination
      :page-name="'Platforms'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { PlatformsDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'Platforms',
  components: {
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
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after
      };
    });

    const { data, execute } = useQuery({
      query: PlatformsDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.platforms?.pageInfo.startCursor ?? null,
        endCursor: data.value?.platforms?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.platforms?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.platforms?.pageInfo.hasNextPage ?? false
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
