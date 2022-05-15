<template>
  <div class="field">
    <label class="label" :for="dateFieldId">{{ label }}</label>
    <div class="control">
      <input
        autocomplete="off"
        class="input"
        type="date"
        :required="required"
        :name="dateFieldName"
        :id="dateFieldId"
        :value="dataValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'DateField',
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
    const dateFieldName = computed(() => `${props.formClass}[${props.attribute}]`);
    const dateFieldId = computed(() => `${props.formClass}_${props.attribute}`);
    const dataValue = ref(props.modelValue);

    return {
      dateFieldName,
      dateFieldId,
      dataValue
    }
  }
});
</script>
