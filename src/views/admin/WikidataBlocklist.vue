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
                <a class="has-text-danger" @click="removeWikidataBlocklistEntry(blocklistEntry.id)">
                  Remove
                </a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <pagination
      :page-name="'WikidataBlocklist'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { RemoveFromWikidataBlocklistDocument, WikidataBlocklistDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useMutation, useQuery } from 'villus';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'WikidataBlocklist',
  components: {
    Pagination
  },
  props: {
    after: {
      type: String,
      required: false,
      default: null
    },
    before: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const queryVariables = computed(() => {
      return {
        before: props.before,
        // Request the last 30 explicitly if we're using the 'before' argument,
        // otherwise do nothing. This makes navigating to a previous page work
        // correctly.
        last: props.before === null ? null : 30,
        after: props.after
      };
    });

    const { data, execute } = useQuery({
      query: WikidataBlocklistDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.wikidataBlocklist?.pageInfo.startCursor ?? null,
        endCursor: data.value?.wikidataBlocklist?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.wikidataBlocklist?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.wikidataBlocklist?.pageInfo.hasNextPage ?? false
      };
    });

    const { data: removeBlocklistEntryData, execute: executeRemoveBlocklistEntry } = useMutation(RemoveFromWikidataBlocklistDocument);

    const removeWikidataBlocklistEntry = (blocklistEntryId: string) => {
      executeRemoveBlocklistEntry({ blocklistEntryId: blocklistEntryId }).then(() => {
        if (removeBlocklistEntryData.value?.removeFromWikidataBlocklist?.deleted) {
          execute({ cachePolicy: 'network-only' });
        }
      });
    };

    const wikidataUrl = (wikidataId: number) => {
      return `https://www.wikidata.org/wiki/Q${wikidataId}`;
    };

    return {
      data,
      execute,
      removeWikidataBlocklistEntry,
      wikidataUrl,
      pageInfo
    };
  }
});
</script>
