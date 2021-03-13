<template>
  <div class="field">
    <label class="label" v-bind:for="textAreaId">{{ label }}</label>
    <div class="control">
      <textarea
        class="textarea"
        v-bind:name="textAreaName"
        v-bind:id="textAreaId"
        v-bind:value="dataValue"
        v-on:input="$emit('input', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';

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
    value: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const textAreaName = computed(() => `${props.formClass}[${props.attribute}]`);
    const textAreaId = computed(() => `${props.formClass}_${props.attribute}`);

    const dataValue = ref(props.value);

    return {
      textAreaName,
      textAreaId,
      dataValue
    }
  }
});
</script>
