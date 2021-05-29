<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <error-box
      :errors="errors"
      :record-type="'platform'"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.name.attribute"
      :label="formData.name.label"
      :required="true"
      v-model="platform.name"
    />

    <number-field
      :form-class="formData.class"
      :attribute="formData.wikidataId.attribute"
      :label="formData.wikidataId.label"
      :required="false"
      v-model="platform.wikidataId"
      :min="1"
    />

    <button
      class="button is-primary mr-10 mr-0-mobile is-fullwidth-mobile js-submit-button"
      value="Submit"
      @click.prevent="onSubmit"
    >Submit</button>

    <router-link :to="cancelRouterLink" class="button is-fullwidth-mobile mt-5-mobile">
      Cancel
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import TextField from '@/components/fields/TextField.vue';
import NumberField from '@/components/fields/NumberField.vue';
import ErrorBox from '@/components/ErrorBox.vue';
import { useMutation } from 'villus';
import { UpdatePlatformDocument, CreatePlatformDocument } from '@/generated/graphql';
import { submitButtonErrorAnimation } from '@/helpers/submitButtonErrorAnimation';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PlatformForm',
  components: {
    TextField,
    NumberField,
    ErrorBox
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
  setup(props) {
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
    };

    const router = useRouter();

    const errors: Ref<string[]> = ref([]);

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
          router.push({ name: 'Platform', params: { id: createPlatformData.value.createPlatform.platform.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = createPlatformErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    const { data: updatePlatformData, execute: executeUpdatePlatform, error: updatePlatformErrors } = useMutation(UpdatePlatformDocument);
    let updatePlatform = () => {
      let { id: id, ...platformValues } = platform.value;
      if (id === null) { throw Error('Something went wrong and id is null.') }
      executeUpdatePlatform({ id: id, ...platformValues }).then(() => {
        if (updatePlatformData.value.updatePlatform?.platform?.id) {
          router.push({ name: 'Platform', params: { id: props.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = updatePlatformErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
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
      cancelRouterLink,
      errors
    };
  }
});
</script>
