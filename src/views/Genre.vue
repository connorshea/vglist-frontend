<template>
  <div class="genre" v-if="data">
    <h1 class="title">{{ data.genre.name }}</h1>

    <a v-if="data.genre.wikidataId !== null" :href="wikidataUrl">Wikidata</a>

    <template v-if="data.genre.games.nodes.length > 0">
      <div class="game-card-list mt-20">
        <div v-for="game in data.genre.games.nodes" :key="game.id">
          <GameCard :game="game"/>
        </div>
      </div>

      <!-- <%= paginate @games %> -->
    </template>
    <template v-else>
      <p class='has-text-centered mt-50 has-text-muted'>This genre doesn't have any games yet.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { GenreDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';

export default defineComponent({
  name: 'Genre',
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
      query: GenreDocument,
      variables: {
        id: props.id
      }
    });

    const wikidataUrl = computed(() => {
      return `https://www.wikidata.org/wiki/Q${data.value?.genre?.wikidataId}`;
    });

    return {
      data,
      wikidataUrl
    };
  }
});
</script>
