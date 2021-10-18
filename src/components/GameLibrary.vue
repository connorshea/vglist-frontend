<template>
  <div v-if="data">
    <ul>
      <template v-for="gamePurchase in data.user.gamePurchases.nodes" :key="gamePurchase.id">
        <li>{{ gamePurchase.game.name }}</li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { GameLibraryDocument } from '@/generated/graphql';
import { useQuery } from 'villus';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'GameLibrary',
  components: {
    SvgIcon
  },
  props: {
    userId: {
      required: true,
      type: String
    }
  },
  setup(props) {
    let variables = ref({ id: props.userId })
    const { data } = useQuery({
      query: GameLibraryDocument,
      variables
    });

    const router = useRouter();

    return {
      data
    };
  }
});
</script>

<style lang="scss" scoped>
// A bit of a hack to hide the navbar divider on the first search result
// section that gets displayed.
.navbar-search-dropdown-section-container:first-of-type hr.navbar-divider {
  display: none;
}
</style>
