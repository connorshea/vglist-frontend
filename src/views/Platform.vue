<template>
  <div class="platform" v-if="data">
    <h1 class="title">{{ data.platform.name }}</h1>

    <a v-if="data.platform.wikidataId !== null" :href="wikidataUrl">Wikidata</a>

    <template v-if="data.platform.games.nodes.length > 0">
      <div class="game-card-list mt-20">
        <div v-for="game in data.platform.games.nodes" :key="game.id">
          <GameCard :game="game"/>
        </div>
      </div>

      <!-- <%= paginate @games %> -->
    </template>
    <template v-else>
      <p class='has-text-centered mt-50 has-text-muted'>This platform doesn't have any games yet.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { PlatformDocument } from '@/generated/graphql.ts';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';

export default defineComponent({
  name: 'Platform',
  components: {
    GameCard
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: PlatformDocument,
      variables: {
        id: props.id
      }
    });

    const wikidataUrl = computed(() => {
      return `https://www.wikidata.org/wiki/Q${data.value?.platform?.wikidataId}`;
    });

    return {
      data,
      wikidataUrl
    };
  }
});
</script>
