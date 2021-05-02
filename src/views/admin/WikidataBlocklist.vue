<template>
  <div v-if="data">
    <div class="table-container">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Wikidata ID</th>
            <th>Game Name</th>
            <th>Created by</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="blocklistEntry in data.wikidataBlocklist.nodes">
            <tr :key="blocklistEntry.id">
              <th>
                <a :href="wikidataUrl(blocklistEntry.wikidataId)">
                  {{ blocklistEntry.wikidataId }}
                </a>
              </th>
              <td>{{ blocklistEntry.name }}</td>
              <td>
                <router-link v-if="blocklistEntry.user !== null" :to="{ name: 'UserProfile', params: { slug: blocklistEntry.user.slug } }">
                  {{ blocklistEntry.user.username }}
                </router-link>
              </td>
              <td>
                <a class="has-text-danger" @click="removeWikidataBlocklistEntry(blocklistEntry.wikidataId)">
                  Remove
                </a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- <%= paginate @blocklist %> -->
  </div>
</template>

<script lang="ts">
import { WikidataBlocklistDocument } from '@/generated/graphql';
import { defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'WikidataBlocklist',
  setup() {
    const { data } = useQuery({
      query: WikidataBlocklistDocument,
      variables: {
        cursor: ''
      }
    });

    const removeWikidataBlocklistEntry = (wikidataId: number) => {
      // TODO
      console.log(wikidataId);
    };

    const wikidataUrl = (wikidataId: number) => {
      return `https://www.wikidata.org/wiki/Q${wikidataId}`;
    };

    return {
      data,
      removeWikidataBlocklistEntry,
      wikidataUrl
    };
  }
});
</script>
