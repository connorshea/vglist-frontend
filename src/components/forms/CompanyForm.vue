<template>
  <div>
    <h1 class="title" data-test-id="form-title">{{ title }}</h1>

    <error-box
      :errors="errors"
      :record-type="'company'"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.name.attribute"
      :label="formData.name.label"
      :required="true"
      v-model="company.name"
    />

    <number-field
      :form-class="formData.class"
      :attribute="formData.wikidataId.attribute"
      :label="formData.wikidataId.label"
      :required="false"
      v-model="company.wikidataId"
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
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import TextField from '@/components/fields/TextField.vue';
import NumberField from '@/components/fields/NumberField.vue';
import ErrorBox from '@/components/ErrorBox.vue';
import { useMutation } from 'villus';
import { UpdateCompanyDocument, CreateCompanyDocument } from '@/generated/graphql';
import { submitButtonErrorAnimation } from '@/helpers/submitButtonErrorAnimation';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CompanyForm',
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
      type: String as PropType<string | null>,
      default: ''
    },
    wikidataId: {
      required: false,
      type: [Number, String] as PropType<string | number | null>,
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

    const router = useRouter();

    const errors: Ref<string[]> = ref([]);

    const company: Ref<{ id: string | null, name: string, wikidataId: string }> = ref({
      id: props.id ?? null, 
      name: props.name ?? '',
      wikidataId: props.wikidataId?.toString() ?? ''
    });

    const title = computed(() => {
      return props.formState === 'create' ? 'Creating a new company' : `Editing ${props.name}`;
    });

    const onSubmit = () => {
      return props.formState === 'create' ? createCompany() : updateCompany();
    };

    const cancelRouterLink = computed(() => {
      return props.formState === 'create' ? { name: 'Companies' } : { name: 'Company', params: { id: props.id }};
    });

    const { data: createCompanyData, execute: executeCreateCompany, error: createCompanyErrors } = useMutation(CreateCompanyDocument);
    let createCompany = () => {
      let { name, wikidataId } = company.value;
      executeCreateCompany({ name: name ?? '', wikidataId }).then(() => {
        if (createCompanyData.value.createCompany?.company?.id) {
          router.push({ name: 'Company', params: { id: createCompanyData.value.createCompany.company.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = createCompanyErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    const { data: updateCompanyData, execute: executeUpdateCompany, error: updateCompanyErrors } = useMutation(UpdateCompanyDocument);
    let updateCompany = () => {
      let { id: id, ...companyValues } = company.value;
      if (id === null) { throw Error('Something went wrong and id is null.') }
      executeUpdateCompany({ id: id, ...companyValues }).then(() => {
        if (updateCompanyData.value.updateCompany?.company?.id) {
          router.push({ name: 'Company', params: { id: props.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = updateCompanyErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
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
      cancelRouterLink,
      errors
    };
  }
});
</script>
