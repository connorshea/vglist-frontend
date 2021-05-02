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
                <a class="has-text-danger" @click="removeSteamBlocklistEntry(blocklistEntry.steamAppId)">
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
import { SteamBlocklistDocument } from '@/generated/graphql';
import { computed, defineComponent } from '@vue/composition-api';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'SteamBlocklist',
  setup(_props, context) {
    const userSignedIn = computed(() => {
      return context.root.$store.state.userSignedIn;
    });

    const { data } = useQuery({
      query: SteamBlocklistDocument,
      variables: {
        cursor: ''
      }
    });

    const removeSteamBlocklistEntry = (steamAppId: number) => {
      // TODO
      console.log(steamAppId);
    };

    const steamUrl = (steamAppId: number) => {
      return `https://store.steampowered.com/app/${steamAppId}`;
    };

    return {
      data,
      userSignedIn,
      removeSteamBlocklistEntry,
      steamUrl
    };
  }
});
</script>
