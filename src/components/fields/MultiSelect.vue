<template>
  <div class="field">
    <label v-if="label" class="label" :for="inputId">{{ label }}</label>
    <div class="control">
      <v-select
        multiple
        :options="options"
        @search="onSearch"
        :inputId="inputId"
        label="name"
        :placeholder="placeholder"
        @change="onChange"
        v-bind:value="value"
        v-on:input="onInput"
      ></v-select>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import * as _ from 'lodash';
import { useQuery } from 'villus';

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
    value: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      required: false
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
  setup(props, context) {
    let variables = ref({ query: '' })
    const { data } = useQuery({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: props.graphqlQuery as any,
      variables,
      fetchOnMount: false
    });

    const inputId = computed(() => _.snakeCase(props.label));

    const options = computed(() => {
      if (data.value) {
        return data.value[props.searchPath].nodes;
      } else {
        return [];
      }
    });

    const onInput = (event: unknown) => context.emit('input', event);
    const onChange = (selectedItems: unknown[]) => context.emit('input', selectedItems);

    const onSearch = _.debounce((search: string) => {
      variables.value = { query: search };
    }, 300);

    return {
      inputId,
      options,
      onInput,
      onChange,
      onSearch
    };
  },
});
</script>
