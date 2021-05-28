<template>
  <div class="field">
    <label class="label" :for="textAreaId">{{ label }}</label>
    <div class="control">
      <textarea
        class="textarea"
        :name="textAreaName"
        :id="textAreaId"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'TextArea',
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
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const textAreaName = computed(() => `${props.formClass}[${props.attribute}]`);
    const textAreaId = computed(() => `${props.formClass}_${props.attribute}`);

    return {
      textAreaName,
      textAreaId
    }
  }
});
</script>
