<template>
  <div class="field" :class="fieldClass">
    <label v-if="label" class="label" v-bind:for="numberFieldId">{{ label }}</label>
    <div class="control">
      <input
        autocomplete="off"
        class="input"
        type="number"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :required="required"
        :name="numberFieldName"
        :id="numberFieldId"
        :modelValue="dataValue"
        @update:modelValue="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NumberField',
  props: {
    formClass: {
      type: String,
      required: true
    },
    fieldClass: {
      type: String,
      required: false,
      default: ''
    },
    attribute: {
      type: String,
      required: true
    },
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
      type: [Number, String],
      required: false,
      default: ''
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    min: {
      type: Number,
      required: false,
      default: 0
    },
    max: {
      type: Number,
      required: false
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const dataValue = ref(props.modelValue);

    const numberFieldName = computed(() => `${props.formClass}[${props.attribute}]`);
    const numberFieldId = computed(() => `${props.formClass}_${props.attribute}`);

    return {
      numberFieldName,
      numberFieldId,
      dataValue
    }
  }
});
</script>
