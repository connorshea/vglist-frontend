<template>
  <div class="field">
    <label class="label" :for="textFieldId">{{ label }}</label>
    <div class="control">
      <input
        autocomplete="off"
        class="input"
        type="text"
        :required="required"
        :name="textFieldName"
        :id="textFieldId"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TextField',
  props: {
    formClass: {
      type: String,
      required: true
    },
    attribute: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    // Optional to allow for null.
    modelValue: {
      type: String as PropType<string | null>,
      required: false,
      default: null
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const textFieldName = computed(() => `${props.formClass}[${props.attribute}]`);
    const textFieldId = computed(() => `${props.formClass}_${props.attribute}`);

    return {
      textFieldName,
      textFieldId
    }
  }
});
</script>
