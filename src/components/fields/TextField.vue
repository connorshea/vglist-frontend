<template>
  <div class="field">
    <label class="label" v-bind:for="textFieldId">{{ label }}</label>
    <div class="control">
      <input
        autocomplete="off"
        class="input"
        type="text"
        :required="required"
        v-bind:name="textFieldName"
        v-bind:id="textFieldId"
        v-bind:value="dataValue"
        v-on:input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

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
    const dataValue = ref(props.value);

    const textFieldName = computed(() => `${props.formClass}[${props.attribute}]`);
    const textFieldId = computed(() => `${props.formClass}_${props.attribute}`);

    return {
      textFieldName,
      textFieldId,
      dataValue
    }
  }
});
</script>
