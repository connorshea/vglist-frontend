<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <TextField
      :form-class="formData.class"
      :attribute="formData.name.attribute"
      :label="formData.name.label"
      :required="true"
      v-model="platform.name"
    />

    <NumberField
      :form-class="formData.class"
      :attribute="formData.wikidataId.attribute"
      :label="formData.wikidataId.label"
      :required="false"
      v-model="platform.wikidataId"
      :min="1"
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
import NumberField from '@/components/fields/NumberField.vue';
import { useMutation } from 'villus';
import { UpdatePlatformDocument, CreatePlatformDocument } from '@/generated/graphql';

export default defineComponent({
  name: 'PlatformForm',
  components: {
    TextField,
    NumberField
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
    wikidataId: {
      required: false,
      type: String,
      default: null
    },
    // Should be either 'create' or 'update'
    formState: {
      required: true,
      type: String
    }
  },
  setup(props, context) {
    const formData = {
      class: 'platform',
      name: {
        label: 'Platform name',
        attribute: 'name'
      },
      wikidataId: {
        label: 'Wikidata ID',
        attribute: 'wikidata_id'
      }
    }

    const platform: Ref<{ id: string | null, name: string | null, wikidataId: string | null }> = ref({
      id: props.id ?? null, 
      name: props.name ?? '',
      wikidataId: props.wikidataId ?? ''
    });

    const title = computed(() => {
      return props.formState === 'create' ? 'Creating a new platform' : `Editing ${props.name}`;
    });

    const onSubmit = () => {
      return props.formState === 'create' ? createPlatform() : updatePlatform();
    };

    const cancelRouterLink = computed(() => {
      return props.formState === 'create' ? { name: 'Platforms' } : { name: 'Platform', params: { id: props.id }};
    });

    const { data: createPlatformData, execute: executeCreatePlatform, error: createPlatformErrors } = useMutation(CreatePlatformDocument);
    let createPlatform = () => {
      let { name, wikidataId } = platform.value;
      executeCreatePlatform({ name: name ?? '', wikidataId }).then(() => {
        if (createPlatformData.value.createPlatform?.platform?.id) {
          context.root.$router.push({ name: 'Platform', params: { id: createPlatformData.value.createPlatform.platform.id }});
        } else {
          // TODO: Error handling.
          console.log(`Error: ${createPlatformErrors.value}`);
        }
      });
    };

    const { data: updatePlatformData, execute: executeUpdatePlatform, error: updatePlatformErrors } = useMutation(UpdatePlatformDocument);
    let updatePlatform = () => {
      let { id: id, ...platformValues } = platform.value;
      if (id === null) { throw Error('Something went wrong and id is null.') }
      executeUpdatePlatform({ id: id, ...platformValues }).then(() => {
        if (updatePlatformData.value.updatePlatform?.platform?.id) {
          context.root.$router.push({ name: 'Platform', params: { id: props.id }});
        } else {
          // TODO: Error handling.
          console.log(`Error: ${updatePlatformErrors.value}`);
        }
      });
    };

    return {
      formData,
      title,
      platform,
      onSubmit,
      createPlatform,
      updatePlatform,
      cancelRouterLink
    };
  }
});
</script>
