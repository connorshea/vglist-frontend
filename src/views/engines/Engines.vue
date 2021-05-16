<template>
  <div class="engines" v-if="data">
    <h1 class="title">Engines</h1>

    <p v-if="userSignedIn">
      <router-link :to="{ name: 'CreateEngine' }" class="button is-fullwidth-mobile mb-10">Create a new engine</router-link>
    </p>

    <ul>
      <li v-for="engine in data.engines.nodes" :key="engine.id">
        <router-link :to="{ name: 'Engine', params: { id: engine.id }}">
          {{ engine.name }}
        </router-link>
      </li>
    </ul>

    <!-- <%= paginate @engines %> -->
  </div>
</template>

<script lang="ts">
import { EnginesDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Engines',
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
    const { data } = useQuery({
      query: EnginesDocument,
      variables: {
        after: ''
      }
    });

    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    return {
      data,
      userSignedIn
    };
  }
});
</script>
