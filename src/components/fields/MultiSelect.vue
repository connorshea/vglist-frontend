<template>
  <div class="field">
    <label v-if="label" class="label" :for="inputId">{{ label }}</label>
    <div class="control">
      <v-select
        multiple
        :options="options"
        @search="onSearch"
        :input-id="inputId"
        label="name"
        :placeholder="placeholder"
        :model-value="modelValue"
        @update:modelValue="onInput"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import vSelect from 'vue-select-connorshea';
import 'vue-select-connorshea/dist/vue-select.css';
import { debounce, snakeCase } from 'lodash';
import { useQuery } from 'villus';
import { DocumentNode } from 'graphql';

export default defineComponent({
  name: 'MultiSelect',
  components: {
    vSelect
  },
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: null
    },
    graphqlQuery: {
      type: Object,
      required: true
    },
    // The name of the search query in the GraphQL response, e.g. 'platformSearch'.
    searchPath: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    let variables = ref({ query: '' })
    const { data } = useQuery({
      query: props.graphqlQuery as DocumentNode,
      variables,
      fetchOnMount: false
    });

    const inputId = computed(() => snakeCase(props.label));

    const options = computed(() => {
      if (data.value) {
        return data.value[props.searchPath].nodes;
      } else {
        return [];
      }
    });

    const onInput = (event: unknown) => context.emit('update:modelValue', event);

    const onSearch = debounce((search: string) => {
      variables.value = { query: search };
    }, 300);

    return {
      inputId,
      options,
      onInput,
      onSearch
    };
  },
});
</script>
