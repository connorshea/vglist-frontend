<template>
  <div v-if="data">
    <div class="table-container">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Steam App ID</th>
            <th>Game Name</th>
            <th>Created by</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="blocklistEntry in data.steamBlocklist.nodes">
            <tr :key="blocklistEntry.id">
              <th>
                <a :href="steamUrl(blocklistEntry.steamAppId)">
                  {{ blocklistEntry.steamAppId }}
                </a>
              </th>
              <td>{{ blocklistEntry.name }}</td>
              <td>
                <router-link v-if="blocklistEntry.user !== null" :to="{ name: 'UserProfile', params: { slug: blocklistEntry.user.slug } }">
                  {{ blocklistEntry.user.username }}
                </router-link>
              </td>
              <td>
                <a class="has-text-danger" @click="removeSteamBlocklistEntry(blocklistEntry.id)">
                  Remove
                </a>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <pagination
      :page-name="'SteamBlocklist'"
      :start-cursor="pageInfo.startCursor"
      :end-cursor="pageInfo.endCursor"
      :has-next-page="pageInfo.hasNextPage"
      :has-previous-page="pageInfo.hasPreviousPage"
      @cursorChanged="execute"
    />
  </div>
</template>

<script lang="ts">
import { SteamBlocklistDocument, RemoveFromSteamBlocklistDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useMutation, useQuery } from 'villus';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'SteamBlocklist',
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
      query: SteamBlocklistDocument,
      variables: queryVariables
    });

    const pageInfo = computed(() => {
      return {
        startCursor: data.value?.steamBlocklist?.pageInfo.startCursor ?? null,
        endCursor: data.value?.steamBlocklist?.pageInfo.endCursor ?? null,
        hasPreviousPage: data.value?.steamBlocklist?.pageInfo.hasPreviousPage ?? false,
        hasNextPage: data.value?.steamBlocklist?.pageInfo.hasNextPage ?? false
      };
    });

    const { data: removeBlocklistEntryData, execute: executeRemoveBlocklistEntry } = useMutation(RemoveFromSteamBlocklistDocument);

    const removeSteamBlocklistEntry = (blocklistEntryId: string) => {
      executeRemoveBlocklistEntry({ blocklistEntryId: blocklistEntryId }).then(() => {
        if (removeBlocklistEntryData.value?.removeFromSteamBlocklist?.deleted) {
          execute({ cachePolicy: 'network-only' });
        }
      });
    };

    const steamUrl = (steamAppId: number) => {
      return `https://store.steampowered.com/app/${steamAppId}`;
    };

    return {
      data,
      execute,
      removeSteamBlocklistEntry,
      steamUrl,
      pageInfo
    };
  }
});
</script>
