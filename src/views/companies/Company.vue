<template>
  <div class="company" v-if="data">
    <h1 class="title">{{ data.company.name }}</h1>

    <div v-if="userSignedIn" class="field buttons">
      <template v-if="userCanEdit">
        <router-link :to="{ name: 'EditCompany', params: { id: data.company.id }}" class="button mr-0-mobile is-fullwidth-mobile">
          Edit
        </router-link>
      </template>
      <template v-if="userCanDelete">
        <a @click="deleteCompany" class="button is-fullwidth-mobile is-danger">Delete</a>
      </template>
    </div>

    <a v-if="data.company.wikidataId !== null" :href="wikidataUrl">Wikidata</a>

    <template v-if="data.company.developedGames.nodes.length > 0">
      <h2 class="subtitle is-4 mt-40">Developed</h2>

      <div class="game-card-list mt-20">
        <div v-for="game in data.company.developedGames.nodes" :key="game.id">
          <GameCard :game="game"/>
        </div>
      </div>

      <!-- <%= paginate @developed_games, param_name: :developer_page %> -->
    </template>
    <template v-else>
      <h2 class="subtitle is-4 mt-40">Developed</h2>
      <p class='has-text-centered mt-50 has-text-muted'>This company hasn't developed any games yet.</p>
    </template>

    <template v-if="data.company.publishedGames.nodes.length > 0">
      <h2 class="subtitle is-4 mt-40">Published</h2>

      <div class="game-card-list mt-20">
        <div v-for="game in data.company.publishedGames.nodes" :key="game.id">
          <GameCard :game="game"/>
        </div>
      </div>

      <!-- <%= paginate @published_games, param_name: :publisher_page %> -->
    </template>
    <template v-else>
      <h2 class="subtitle is-4 mt-40">Published</h2>
      <p class='has-text-centered mt-50 has-text-muted'>This company hasn't published any games yet.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { CompanyDocument, DeleteCompanyDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useMutation, useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';

export default defineComponent({
  name: 'Company',
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
      query: CompanyDocument,
      variables: {
        id: props.id
      }
    });

    const wikidataUrl = computed(() => {
      return `https://www.wikidata.org/wiki/Q${data.value?.company?.wikidataId}`;
    });

    const { data: deleteCompanyData, execute: executeDeleteCompany, error: deleteCompanyErrors } = useMutation(DeleteCompanyDocument);
    let deleteCompany = () => {
      if (confirm("Are you sure you want to delete this company?")) {
        executeDeleteCompany({ id: props.id }).then(() => {
          if (deleteCompanyData.value?.deleteCompany?.deleted) {
            context.root.$router.push({ name: 'Companies' });
          } else {
            // TODO: Error handling.
            console.log(`Error: ${deleteCompanyErrors.value}`);
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
      deleteCompany,
      userSignedIn,
      userCanEdit,
      userCanDelete
    };
  }
});
</script>
