<template>
  <div class="field">
    <label class="label" :for="inputId">{{ label }}</label>
    <div class="control">
      <v-select
        multiple
        :taggable="true"
        :input-id="inputId"
        :label="vSelectLabel"
        :model-value="modelValue"
        @update:modelValue="onInput"
      />
    </div>
  </div>
</template>

<script lang="ts">
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { snakeCase } from 'lodash';
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
    modelValue: {
      type: Array,
      required: true
    },
    vSelectLabel: {
      type: String,
      required: false,
      default: "name"
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const inputId = computed(() => snakeCase(props.label));
    let options = ref([]);

    const onInput = (event: unknown) => context.emit('update:modelValue', event);

    return {
      inputId,
      options,
      onInput
    }
  }
});
</script>
