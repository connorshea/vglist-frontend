<template>
  <div :class="grandparentClass">
    <label v-if="label" :for="inputId" class="label">{{ label }}</label>
    <div :class="parentClass">
      <v-select
        :options="options"
        :disabled="disabled"
        @search="onSearch"
        label="name"
        :inputId="inputId"
        v-bind:value="value"
        :placeholder="placeholder"
        v-on:input="onInput"
      ></v-select>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import * as _ from 'lodash';
import { useQuery } from 'villus';

export default defineComponent({
  name: 'SingleSelect',
  components: {
    vSelect
  },
  props: {
    label: {
      type: String,
      required: false
    },
    value: {
      type: Object,
      required: false
    },
    graphqlQuery: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    grandparentClass: {
      type: String,
      required: false,
      default: 'field'
    },
    parentClass: {
      type: String,
      required: false,
      default: 'control'
    },
    placeholder: {
      type: String,
      required: false
    },
    // Can be used to rename labels in the component dropdown or make other
    // modifications to options.
    customOptionFunc: {
      type: Function,
      required: false
    },
    // The name of the search query in the GraphQL response, e.g. 'gameSearch'.
    searchPath: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    let variables = ref({ query: '' })
    const { execute, data } = useQuery({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: props.graphqlQuery as any,
      variables,
      fetchOnMount: false
    });

    const inputId = computed(() => _.snakeCase(props.label));
    const options = computed(() => {
      if (data.value) {
        let nodes = data.value[props.searchPath].nodes;
        // If there's a custom options function, map with it before returning the nodes.
        return props.customOptionFunc ? nodes.map(props.customOptionFunc) : nodes;
      } else {
        return [];
      }
    });

    const onInput = (event: unknown) => context.emit('input', event);
    const onSearch = _.debounce((search: string) => {
      variables.value = { query: search };
    }, 500);

    return {
      execute,
      data,
      inputId,
      options,
      onInput,
      onSearch
    };
  }
});
</script>
