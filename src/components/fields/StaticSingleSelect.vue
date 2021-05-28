<template>
  <div :class="grandparentClass">
    <label v-if="label" :for="inputId" class="label">{{ label }}</label>
    <div class="control">
      <v-select
        :options="options"
        :disabled="disabled"
        label="label"
        :placeholder="placeholder"
        :inputId="inputId"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      ></v-select>
    </div>
  </div>
</template>

<script lang="ts">
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import * as _ from 'lodash';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'StaticSingleSelect',
  components: {
    vSelect
  },
  props: {
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: [Object, Number, String],
      required: false
    },
    options: {
      type: Array,
      required: true
    },
    grandparentClass: {
      type: String,
      required: false,
      default: 'field'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const inputId = computed(() => _.snakeCase(props.label));

    return { inputId }
  }
});
</script>
