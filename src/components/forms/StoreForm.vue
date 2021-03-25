<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <TextField
      :form-class="formData.class"
      :attribute="formData.name.attribute"
      :label="formData.name.label"
      :required="true"
      v-model="store.name"
    />

    <button
      class="button is-primary mr-10 mr-0-mobile is-fullwidth-mobile"
      value="Submit"
      @click.prevent="onSubmit"
    >Submit</button>

    <router-link :to="cancelRouterLink" class="button is-fullwidth-mobile mt-5-mobile">
      Cancel
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from '@vue/composition-api';
import TextField from '@/components/fields/TextField.vue';
import { useMutation } from 'villus';
import { UpdateStoreDocument, CreateStoreDocument } from '@/generated/graphql';

export default defineComponent({
  name: 'StoreForm',
  components: {
    TextField,
  },
  props: {
    id: {
      required: false,
      type: String,
      default: null
    },
    name: {
      required: false,
      type: String,
      default: ''
    },
    // Should be either 'create' or 'update'
    formState: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const formData = {
      class: 'store',
      name: {
        label: 'Store name',
        attribute: 'name'
      }
    }

    const store: Ref<{ id: string | null, name: string | null}> = ref({
      id: props.id ?? null, 
      name: props.name ?? ''
    });

    const title = computed(() => {
      return props.formState === 'create' ? 'Creating a new store' : `Editing ${props.name}`;
    });

    const onSubmit = () => {
      return props.formState === 'create' ? createStore() : updateStore();
    };

    const cancelRouterLink = computed(() => {
      return props.formState === 'create' ? { name: 'Stores' } : { name: 'Store', params: { id: props.id }};
    });

    const { data: createStoreData, execute: executeCreateStore, error: createStoreErrors } = useMutation(CreateStoreDocument);
    let createStore = () => {
      executeCreateStore({ name: store.value.name ?? '' }).then(() => {
        if (createStoreData.value.createStore?.store?.id) {
          context.root.$router.push({ name: 'Store', params: { id: createStoreData.value.createStore.store.id }});
        } else {
          // TODO: Error handling.
          console.log(`Error: ${createStoreErrors.value}`);
        }
      });
    };

    const { data: updateStoreData, execute: executeUpdateStore, error: updateStoreErrors } = useMutation(UpdateStoreDocument);
    let updateStore = () => {
      let { id: id, ...storeValues } = store.value;
      if (id === null) { throw Error('Something went wrong and id is null.') }
      executeUpdateStore({ id: id, ...storeValues }).then(() => {
        if (updateStoreData.value.updateStore?.store?.id) {
          context.root.$router.push({ name: 'Store', params: { id: props.id }});
        } else {
          // TODO: Error handling.
          console.log(`Error: ${updateStoreErrors.value}`);
        }
      });
    };

    return {
      formData,
      title,
      store,
      onSubmit,
      createStore,
      updateStore,
      cancelRouterLink
    };
  }
});
</script>
