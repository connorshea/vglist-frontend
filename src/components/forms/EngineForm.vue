<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <error-box
      :errors="errors"
      :record-type="'engine'"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.name.attribute"
      :label="formData.name.label"
      :required="true"
      v-model="engine.name"
    />

    <number-field
      :form-class="formData.class"
      :attribute="formData.wikidataId.attribute"
      :label="formData.wikidataId.label"
      :required="false"
      v-model="engine.wikidataId"
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
import ErrorBox from '@/components/ErrorBox.vue';
import { useMutation } from 'villus';
import { UpdateEngineDocument, CreateEngineDocument } from '@/generated/graphql';
import { submitButtonErrorAnimation } from '@/helpers/submitButtonErrorAnimation';

export default defineComponent({
  name: 'EngineForm',
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
  setup(props, context) {
    const formData = {
      class: 'engine',
      name: {
        label: 'Engine name',
        attribute: 'name'
      },
      wikidataId: {
        label: 'Wikidata ID',
        attribute: 'wikidata_id'
      }
    };

    const errors: Ref<string[]> = ref([]);

    const engine: Ref<{ id: string | null, name: string | null, wikidataId: string | null }> = ref({
      id: props.id ?? null, 
      name: props.name ?? '',
      wikidataId: props.wikidataId ?? ''
    });

    const title = computed(() => {
      return props.formState === 'create' ? 'Creating a new engine' : `Editing ${props.name}`;
    });

    const onSubmit = () => {
      return props.formState === 'create' ? createEngine() : updateEngine();
    };

    const cancelRouterLink = computed(() => {
      return props.formState === 'create' ? { name: 'Engines' } : { name: 'Engine', params: { id: props.id }};
    });

    const { data: createEngineData, execute: executeCreateEngine, error: createEngineErrors } = useMutation(CreateEngineDocument);
    let createEngine = () => {
      let { name, wikidataId } = engine.value;
      executeCreateEngine({ name: name ?? '', wikidataId }).then(() => {
        if (createEngineData.value.createEngine?.engine?.id) {
          context.root.$router.push({ name: 'Engine', params: { id: createEngineData.value.createEngine.engine.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = createEngineErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    const { data: updateEngineData, execute: executeUpdateEngine, error: updateEngineErrors } = useMutation(UpdateEngineDocument);
    let updateEngine = () => {
      let { id: id, ...engineValues } = engine.value;
      if (id === null) { throw Error('Something went wrong and id is null.') }
      executeUpdateEngine({ id: id, ...engineValues }).then(() => {
        if (updateEngineData.value.updateEngine?.engine?.id) {
          context.root.$router.push({ name: 'Engine', params: { id: props.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = updateEngineErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    return {
      formData,
      title,
      engine,
      onSubmit,
      createEngine,
      updateEngine,
      cancelRouterLink,
      errors
    };
  }
});
</script>
