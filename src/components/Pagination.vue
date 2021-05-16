<template>
  <!-- Don't render anything if there is more than one page. -->
  <div v-if="hasPreviousPage || hasNextPage">
    <nav class="pagination is-centered mt-15" role="navigation" aria-label="pagination">
      <!-- Use a custom router-link so we can have a click trigger on the link
           while still allowing it to be an HTML anchor and be opened in a new
           tab.
      -->
      <router-link
        :to="previousPageRoute"
        v-slot="{ href }"
        custom
      >
        <a :href="href"
           rel="prev"
           class="pagination-previous"
           :disabled="!hasPreviousPage"
           @click.prevent="previousPage(startCursor)"
        >Previous</a>
      </router-link>
      <router-link
        :to="nextPageRoute"
        v-slot="{ href }"
        custom
      >
        <a :href="href"
           rel="next"
           class="pagination-next"
           :disabled="!hasNextPage"
           @click.prevent="nextPage(endCursor)"
        >Next</a>
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Pagination',
  props: {
    pageName: {
      type: String,
      required: true
    },
    startCursor: {
      type: String,
      required: false,
      default: null
    },
    endCursor: {
      type: String,
      required: false,
      default: null
    },
    hasNextPage: {
      type: Boolean,
      required: true
    },
    hasPreviousPage: {
      type: Boolean,
      required: true
    }
  },
  setup(props, context) {
    const previousPageRoute = computed(() => {
      // Get the current query params, other than before/after. This avoids
      // wiping out any other query parameters that are already present.
      let { before, after, ...currentQueryParams } = context.root.$route.query;
      return { name: props.pageName, query: { before: props.startCursor, ...currentQueryParams } };
    });
    const nextPageRoute = computed(() => {
      let { before, after, ...currentQueryParams } = context.root.$route.query;
      return { name: props.pageName, query: { after: props.endCursor, ...currentQueryParams } };
    });

    const nextPage = (cursor: string) => {
      if (props.hasNextPage) {
        context.root.$router.push(nextPageRoute.value).then(() => {
          window.scrollTo(0, 0);
          context.emit('cursorChanged', cursor);
        });
      }
    };
    const previousPage = (cursor: string) => {
      if (props.hasPreviousPage) {
        context.root.$router.push(previousPageRoute.value).then(() => {
          window.scrollTo(0, 0);
          context.emit('cursorChanged', cursor);
        });
      }
    };

    return {
      previousPage,
      previousPageRoute,
      nextPage,
      nextPageRoute
    };
  }
});
</script>
