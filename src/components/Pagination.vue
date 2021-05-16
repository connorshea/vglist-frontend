<template>
  <div>
    <nav class="pagination is-centered mt-15" role="navigation" aria-label="pagination">
      <a
        rel="prev"
        class="pagination-previous"
        :disabled="!hasPreviousPage"
        @click="previousPage(startCursor)"
      >Previous</a>
      <a
        rel="next"
        class="pagination-next"
        :disabled="!hasNextPage"
        @click="nextPage(endCursor)"
      >Next</a>
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
      return { name: props.pageName, query: { before: props.startCursor } };
    });
    const nextPageRoute = computed(() => {
      return { name: props.pageName, query: { after: props.endCursor } };
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
      nextPage
    };
  }
});
</script>
