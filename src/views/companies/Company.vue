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

      <pagination
        :page-name="'Company'"
        :prefix="'developed'"
        :start-cursor="developedPageInfo.startCursor"
        :end-cursor="developedPageInfo.endCursor"
        :has-next-page="developedPageInfo.hasNextPage"
        :has-previous-page="developedPageInfo.hasPreviousPage"
        @cursorChanged="execute"
      />
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

      <pagination
        :page-name="'Company'"
        :prefix="'published'"
        :start-cursor="publishedPageInfo.startCursor"
        :end-cursor="publishedPageInfo.endCursor"
        :has-next-page="publishedPageInfo.hasNextPage"
        :has-previous-page="publishedPageInfo.hasPreviousPage"
        @cursorChanged="execute"
      />
    </template>
    <template v-else>
      <h2 class="subtitle is-4 mt-40">Published</h2>
      <p class='has-text-centered mt-50 has-text-muted'>This company hasn't published any games yet.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { CompanyDocument, DeleteCompanyDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useMutation, useQuery } from 'villus';
import GameCard from '@/components/GameCard.vue';
import Pagination from '@/components/Pagination.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Company',
  components: {
    GameCard,
    Pagination
  },
  props: {
    id: {
      required: true,
      type: String
    },
    developedAfter: {
      type: String,
      required: false,
      default: null
    },
    developedBefore: {
      type: String,
      required: false,
      default: null
    },
    publishedAfter: {
      type: String,
      required: false,
      default: null
    },
    publishedBefore: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const queryVariables = computed(() => {
      return {
        id: props.id,
        developedBefore: props.developedBefore,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        developedLast: props.developedBefore === null ? null : 30,
        developedAfter: props.developedAfter,
        publishedBefore: props.publishedBefore,
        publishedLast: props.publishedBefore === null ? null : 30,
        publishedAfter: props.publishedAfter
      };
    });

    const { data, execute } = useQuery({
      query: CompanyDocument,
      variables: queryVariables
    });

    const store = useStore();
    const router = useRouter();

    const publishedPageInfo = computed(() => {
      return {
        startCursor: data.value?.company?.publishedGames?.pageInfo.startCursor ?? null,
        endCursor: data.value?.company?.publishedGames?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.company?.publishedGames?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.company?.publishedGames?.pageInfo.hasNextPage ?? false
      };
    });

    const developedPageInfo = computed(() => {
      return {
        startCursor: data.value?.company?.developedGames?.pageInfo.startCursor ?? null,
        endCursor: data.value?.company?.developedGames?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.company?.developedGames?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.company?.developedGames?.pageInfo.hasNextPage ?? false
      };
    });

    const wikidataUrl = computed(() => {
      return `https://www.wikidata.org/wiki/Q${data.value?.company?.wikidataId}`;
    });

    const { data: deleteCompanyData, execute: executeDeleteCompany, error: deleteCompanyErrors } = useMutation(DeleteCompanyDocument);
    let deleteCompany = () => {
      if (confirm("Are you sure you want to delete this company?")) {
        executeDeleteCompany({ id: props.id }).then(() => {
          if (deleteCompanyData.value?.deleteCompany?.deleted) {
            router.push({ name: 'Companies' });
          } else {
            // TODO: Error handling.
            console.log(`Error: ${deleteCompanyErrors.value}`);
          }
        });
      }
    };

    const userSignedIn = computed(() => store.state.userSignedIn);

    const userCanEdit = userSignedIn;
    const userCanDelete = computed(() => ['ADMIN', 'MODERATOR'].includes(store.state.currentUser.role));

    return {
      data,
      execute,
      wikidataUrl,
      deleteCompany,
      userSignedIn,
      userCanEdit,
      userCanDelete,
      developedPageInfo,
      publishedPageInfo
    };
  }
});
</script>
