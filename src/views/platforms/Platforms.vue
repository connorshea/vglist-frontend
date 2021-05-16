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

    <!-- <%= paginate @platforms %> -->
  </div>
</template>

<script lang="ts">
import { PlatformsDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Platforms',
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
      query: PlatformsDocument,
      variables: {
        after: ''
      }
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.platforms?.pageInfo.startCursor ?? null,
        endCursor: data.value?.platforms?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.platforms?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.platforms?.pageInfo.hasNextPage ?? false
      };
    });
    const userSignedIn = computed(() => context.root.$store.state.userSignedIn);

    return {
      data,
      userSignedIn,
      pageInfo
    };
  }
});
</script>
