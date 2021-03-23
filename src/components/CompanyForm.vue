<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <TextField
      :form-class="formData.class"
      :attribute="formData.name.attribute"
      :label="formData.name.label"
      :required="true"
      v-model="company.name"
    />

    <NumberField
      :form-class="formData.class"
      :attribute="formData.wikidataId.attribute"
      :label="formData.wikidataId.label"
      :required="false"
      v-model="company.wikidataId"
      :min="1"
    />

    <button
      class="button is-primary mr-10 mr-0-mobile is-fullwidth-mobile"
      value="Submit"
      @click.prevent="updateCompany"
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
import { UpdateCompanyDocument, CreateCompanyDocument } from '@/generated/graphql';

export default defineComponent({
  name: 'EditCompany',
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
      type: Number,
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
      class: 'company',
      name: {
        label: 'Company name',
        attribute: 'name'
      },
      wikidataId: {
        label: 'Wikidata ID',
        attribute: 'wikidata_id'
      }
    }

    const company: Ref<{ id: string, name: string | null, wikidataId: number | string | null }> = ref({
      id: props.id,
      name: props.name,
      wikidataId: props.wikidataId
    });

    const title = computed(() => {
      return props.formState === 'create' ? 'Creating a new company' : `Editing ${props.name}`;
    });

    const onSubmit = () => {
      context.emit('submit');
    };

    const cancelRouterLink = computed(() => {
      return props.formState === 'create' ? { name: 'Companies' } : { name: 'Company', params: { id: props.id }};
    });

    const { data: createCompanyData, execute: executeCreateCompany, error: createCompanyErrors } = useMutation(CreateCompanyDocument);
    let createCompany = () => {
      let { name, wikidataId } = company.value;
      executeCreateCompany({ name: name ?? '', wikidataId }).then(() => {
        if (createCompanyData.value?.createCompany?.company?.id) {
          context.root.$router.push({ name: 'Company', params: { id: props.id }});
        } else {
          // TODO: Error handling.
          console.log(`Error: ${createCompanyErrors.value}`);
        }
      });
    };

    const { data: updateCompanyData, execute: executeUpdateCompany, error: updateCompanyErrors } = useMutation(UpdateCompanyDocument);
    let updateCompany = () => {
      executeUpdateCompany({ ...company.value }).then(() => {
        if (updateCompanyData.value?.updateCompany?.company?.id) {
          context.root.$router.push({ name: 'Company', params: { id: props.id }});
        } else {
          // TODO: Error handling.
          console.log(`Error: ${updateCompanyErrors.value}`);
        }
      });
    };

    return {
      formData,
      title,
      company,
      onSubmit,
      createCompany,
      updateCompany,
      cancelRouterLink
    };
  }
});
</script>
