<template>
  <div class="field">
    <label class="label" :for="inputId">{{ label }}</label>
    <div class="control">
      <v-select
        multiple
        :taggable="true"
        :inputId="inputId"
        :label="vSelectLabel"
        @change="onChange"
        v-bind:value="value"
        v-on:input="onInput"
      ></v-select>
    </div>
  </div>
</template>

<script lang="ts">
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import * as _ from 'lodash';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MultiSelectGeneric',
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
    vSelectLabel: {
      type: String,
      required: false,
      default: "name"
    }
  },
  setup(props, context) {
    const inputId = computed(() => _.snakeCase(props.label));
    let options = ref([]);

    const onChange = (selectedItems: Array<unknown>) => context.emit('input', selectedItems);
    const onInput = (event: unknown) => context.emit('input', event);

    return {
      inputId,
      options,
      onChange,
      onInput
    }
  }
});
</script>
