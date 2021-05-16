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
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Pagination',
  props: {
    pageName: {
      type: String,
      required: true
    },
    startCursor: {
      type: String,
      required: true
    },
    endCursor: {
      type: String,
      required: true
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
    const previousPageRoute = { name: props.pageName, query: { before: props.startCursor }};
    const nextPageRoute = { name: props.pageName, query: { after: props.endCursor }};

    const nextPage = (cursor: string) => {
      context.root.$router.push(nextPageRoute).then(() => {
        context.emit('cursorChanged', cursor);
      });
    };
    const previousPage = (cursor: string) => {
      context.root.$router.push(previousPageRoute).then(() => {
        context.emit('cursorChanged', cursor);
      });
    };

    return {
      previousPage,
      nextPage
    };
  }
});
</script>
