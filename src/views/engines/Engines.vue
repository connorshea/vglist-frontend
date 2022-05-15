<template>
  <div class="engines" v-if="data?.engines">
    <h1 class="title">Engines</h1>

    <p v-if="userSignedIn" data-test-id="create-engine-button">
      <router-link :to="{ name: 'CreateEngine' }" class="button is-fullwidth-mobile mb-10">Create a new engine</router-link>
    </p>

    <ul data-test-id="engines-list">
      <li v-for="engine in data.engines.nodes" :key="engine!.id">
        <template v-if="engine">
          <router-link :to="{ name: 'Engine', params: { id: engine.id }}">
            {{ engine.name }}
          </router-link>
        </template>
      </li>
    </ul>

    <pagination
      :page-name="'Engines'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { EnginesDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useQuery } from 'villus';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { State } from '@/store';

export default defineComponent({
  name: 'Engines',
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
      query: EnginesDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.engines?.pageInfo.startCursor ?? null,
        endCursor: data.value?.engines?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.engines?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.engines?.pageInfo.hasNextPage ?? false
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
