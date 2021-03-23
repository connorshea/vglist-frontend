<template>
  <div class="genre" v-if="data">
    <h1 class="title">{{ data.genre.name }}</h1>

    <div v-if="userSignedIn" class="field buttons">
      <template v-if="userCanEdit">
        <router-link :to="{ name: 'EditGenre', params: { id: data.genre.id }}" class="button mr-0-mobile is-fullwidth-mobile">
          Edit
        </router-link>
      </template>
      <template v-if="userCanDelete">
        <a @click="deleteGenre" class="button is-fullwidth-mobile is-danger">Delete</a>
      </template>
    </div>

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
import { DeleteGenreDocument, GenreDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useMutation, useQuery } from 'villus';
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
  setup(props, context) {
    const { data } = useQuery({
      query: GenreDocument,
      variables: {
        id: props.id
      }
    });

    const wikidataUrl = computed(() => {
      return `https://www.wikidata.org/wiki/Q${data.value?.genre?.wikidataId}`;
    });
    const { data: deleteGenreData, execute: executeDeleteGenre, error: deleteGenreErrors } = useMutation(DeleteGenreDocument);
    let deleteGenre = () => {
      if (confirm("Are you sure you want to delete this genre?")) {
        executeDeleteGenre({ id: props.id }).then(() => {
          if (deleteGenreData.value?.deleteGenre?.deleted) {
            context.root.$router.push({ name: 'Genres' });
          } else {
            // TODO: Error handling.
            console.log(`Error: ${deleteGenreErrors.value}`);
          }
        });
      }
    };

    const userSignedIn = computed(() => {
      return context.root.$store.state.userSignedIn;
    });

    const userCanEdit = userSignedIn;
    const userCanDelete = computed(() => ['ADMIN', 'MODERATOR'].includes(context.root.$store.state.currentUser.role));

    return {
      data,
      wikidataUrl,
      deleteGenre,
      userSignedIn,
      userCanDelete,
      userCanEdit
    };
  }
});
</script>
