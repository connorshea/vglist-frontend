<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <error-box
      :errors="errors"
      :record-type="'genre'"
    />

    <text-field
      :form-class="formData.class"
      :attribute="formData.name.attribute"
      :label="formData.name.label"
      :required="true"
      v-model="genre.name"
    />

    <number-field
      :form-class="formData.class"
      :attribute="formData.wikidataId.attribute"
      :label="formData.wikidataId.label"
      :required="false"
      v-model="genre.wikidataId"
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
import { UpdateGenreDocument, CreateGenreDocument } from '@/generated/graphql';
import { submitButtonErrorAnimation } from '@/helpers/submitButtonErrorAnimation';

export default defineComponent({
  name: 'GenreForm',
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
      class: 'genre',
      name: {
        label: 'Genre name',
        attribute: 'name'
      },
      wikidataId: {
        label: 'Wikidata ID',
        attribute: 'wikidata_id'
      }
    };

    const errors: Ref<string[]> = ref([]);

    const genre: Ref<{ id: string | null, name: string | null, wikidataId: string | null }> = ref({
      id: props.id ?? null, 
      name: props.name ?? '',
      wikidataId: props.wikidataId ?? ''
    });

    const title = computed(() => {
      return props.formState === 'create' ? 'Creating a new genre' : `Editing ${props.name}`;
    });

    const onSubmit = () => {
      return props.formState === 'create' ? createGenre() : updateGenre();
    };

    const cancelRouterLink = computed(() => {
      return props.formState === 'create' ? { name: 'Genres' } : { name: 'Genre', params: { id: props.id }};
    });

    const { data: createGenreData, execute: executeCreateGenre, error: createGenreErrors } = useMutation(CreateGenreDocument);
    let createGenre = () => {
      let { name, wikidataId } = genre.value;
      executeCreateGenre({ name: name ?? '', wikidataId }).then(() => {
        if (createGenreData.value.createGenre?.genre?.id) {
          context.root.$router.push({ name: 'Genre', params: { id: createGenreData.value.createGenre.genre.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = createGenreErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    const { data: updateGenreData, execute: executeUpdateGenre, error: updateGenreErrors } = useMutation(UpdateGenreDocument);
    let updateGenre = () => {
      let { id: id, ...genreValues } = genre.value;
      if (id === null) { throw Error('Something went wrong and id is null.') }
      executeUpdateGenre({ id: id, ...genreValues }).then(() => {
        if (updateGenreData.value.updateGenre?.genre?.id) {
          context.root.$router.push({ name: 'Genre', params: { id: props.id }});
        } else {
          // Multiple errors are returned as one string with comma separators,
          // so we split them and then flatten the resulting array.
          errors.value = updateGenreErrors.value.graphqlErrors?.map((error) => error.message.split(',')).flat() ?? [];
          submitButtonErrorAnimation();
        }
      });
    };

    return {
      formData,
      title,
      genre,
      onSubmit,
      createGenre,
      updateGenre,
      cancelRouterLink,
      errors
    };
  }
});
</script>
