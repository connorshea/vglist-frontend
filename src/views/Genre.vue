<template>
  <div class="genre" v-if="data">
    Genre: {{ data.genre.name }}
  </div>
</template>

<script lang="ts">
import { GenreDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'Genre',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: GenreDocument,
      variables: {
        id: props.id
      }
    });

    return { data };
  }
});
</script>
