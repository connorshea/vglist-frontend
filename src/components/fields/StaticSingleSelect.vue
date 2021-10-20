<template>
  <div :class="grandparentClass">
    <label v-if="label" :for="inputId" class="label">{{ label }}</label>
    <div class="control">
      <v-select
        :options="options"
        :disabled="disabled"
        label="label"
        :placeholder="placeholder"
        :input-id="inputId"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { snakeCase } from 'lodash';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'StaticSingleSelect',
  components: {
    vSelect
  },
  props: {
    label: {
      type: String,
      required: false,
      default: null
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: [Object, Number, String],
      required: false,
      default: null
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
    const inputId = computed(() => snakeCase(props.label));

    return { inputId }
  }
});
</script>
