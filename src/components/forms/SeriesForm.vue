<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <error-box
      :errors="errors"
      :record-type="'series'"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.name.attribute"
      :label="formData.name.label"
      :required="true"
      v-model="series.name"
    />

    <number-field
      :form-class="formData.class"
      :attribute="formData.wikidataId.attribute"
      :label="formData.wikidataId.label"
      :required="false"
      v-model="series.wikidataId"
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
import { UpdateSeriesDocument, CreateSeriesDocument } from '@/generated/graphql';
import { submitButtonErrorAnimation } from '@/helpers/submitButtonErrorAnimation';

export default defineComponent({
  name: 'SeriesForm',
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
      class: 'series',
      name: {
        label: 'Series name',
        attribute: 'name'
      },
      wikidataId: {
        label: 'Wikidata ID',
        attribute: 'wikidata_id'
      }
    };

    const errors: Ref<string[]> = ref([]);

    const series: Ref<{ id: string | null, name: string | null, wikidataId: string | null }> = ref({
      id: props.id ?? null, 
      name: props.name ?? '',
      wikidataId: props.wikidataId ?? ''
    });

    const title = computed(() => {
      return props.formState === 'create' ? 'Creating a new series' : `Editing ${props.name}`;
    });

    const onSubmit = () => {
      return props.formState === 'create' ? createSeries() : updateSeries();
    };

    const cancelRouterLink = computed(() => {
      return props.formState === 'create' ? { name: 'SeriesList' } : { name: 'Series', params: { id: props.id }};
    });

    const { data: createSeriesData, execute: executeCreateSeries, error: createSeriesErrors } = useMutation(CreateSeriesDocument);
    let createSeries = () => {
      let { name, wikidataId } = series.value;
      executeCreateSeries({ name: name ?? '', wikidataId }).then(() => {
        if (createSeriesData.value.createSeries?.series?.id) {
          context.root.$router.push({ name: 'Series', params: { id: createSeriesData.value.createSeries.series.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = createSeriesErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    const { data: updateSeriesData, execute: executeUpdateSeries, error: updateSeriesErrors } = useMutation(UpdateSeriesDocument);
    let updateSeries = () => {
      let { id: id, ...seriesValues } = series.value;
      if (id === null) { throw Error('Something went wrong and id is null.') }
      executeUpdateSeries({ id: id, ...seriesValues }).then(() => {
        if (updateSeriesData.value.updateSeries?.series?.id) {
          context.root.$router.push({ name: 'Series', params: { id: props.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = updateSeriesErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    return {
      formData,
      title,
      series,
      onSubmit,
      createSeries,
      updateSeries,
      cancelRouterLink,
      errors
    };
  }
});
</script>
