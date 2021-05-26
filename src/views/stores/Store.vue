<template>
  <div class="store" v-if="data">
    <h1 class="title">{{ data.store.name }}</h1>

    <div v-if="userSignedIn" class="field buttons">
      <template v-if="userCanEdit">
        <router-link :to="{ name: 'EditStore', params: { id: data.store.id }}" class="button mr-0-mobile is-fullwidth-mobile">
          Edit
        </router-link>
      </template>
      <template v-if="userCanDelete">
        <a @click="deleteStore" class="button is-fullwidth-mobile is-danger">Delete</a>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { DeleteStoreDocument, StoreDocument } from '@/generated/graphql';
import { computed, defineComponent } from 'vue';
import { useMutation, useQuery } from 'villus';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Store',
  props: {
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const { data } = useQuery({
      query: StoreDocument,
      variables: {
        id: props.id
      }
    });

    const router = useRouter();

    const { data: deleteStoreData, execute: executeDeleteStore, error: deleteStoreErrors } = useMutation(DeleteStoreDocument);
    let deleteStore = () => {
      if (confirm("Are you sure you want to delete this store?")) {
        executeDeleteStore({ id: props.id }).then(() => {
          if (deleteStoreData.value?.deleteStore?.deleted) {
            router.push({ name: 'Stores' });
          } else {
            // TODO: Error handling.
            console.log(`Error: ${deleteStoreErrors.value}`);
          }
        });
      }
    };

    const vuexStore = useStore();
    const userSignedIn = computed(() => vuexStore.state.userSignedIn);

    const userCanEdit = userSignedIn;
    const userCanDelete = computed(() => ['ADMIN', 'MODERATOR'].includes(vuexStore.state.currentUser.role));

    return {
      data,
      deleteStore,
      userSignedIn,
      userCanEdit,
      userCanDelete
    };
  }
});
</script>
