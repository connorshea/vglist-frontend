<template>
  <div class="user" v-if="data">
    {{ data.user.username }}
  </div>
</template>

<script lang="ts">
import { UserDocument } from '@/generated/graphql.ts';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'User',
  props: {
    slug: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: UserDocument,
      variables: {
        slug: props.slug
      }
    });

    return { data };
  }
});
</script>
