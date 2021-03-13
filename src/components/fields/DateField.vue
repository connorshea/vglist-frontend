<template>
  <div class="field">
    <label class="label" v-bind:for="dateFieldId">{{ label }}</label>
    <div class="control">
      <input
        autocomplete="off"
        class="input"
        type="date"
        :required="required"
        v-bind:name="dateFieldName"
        v-bind:id="dateFieldId"
        v-bind:value="dataValue"
        v-on:input="$emit('input', $event.target.value)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';

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
    value: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const dateFieldName = computed(() => `${props.formClass}[${props.attribute}]`);
    const dateFieldID = computed(() => `${props.formClass}_${props.attribute}`);
    const dataValue = ref(props.value);

    return {
      dateFieldName,
      dateFieldID,
      dataValue
    }
  }
});
</script>
