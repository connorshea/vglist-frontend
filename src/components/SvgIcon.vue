<template>
  <!-- This is a bit of a hack to load it with the HTML Loader.
       https://stackoverflow.com/questions/50834598/inline-svg-in-vuejs-component
  -->
  <div class="inline-block svg-icon"
       v-html="require(`!html-loader!@/assets/icons/${name}.svg`)"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      required: false,
      default: 16
    },
    width: {
      type: Number,
      required: false,
      default: 16
    }
  },
  mounted() {
    // https://medium.com/js-dojo/making-svg-icon-component-in-vue-cb7fac70e758
    if (this?.$el?.firstElementChild?.nodeName === 'svg') {
      const svgElement = this.$el.firstElementChild;
      svgElement.setAttribute('width', `${this.width}px`);
      svgElement.setAttribute('height', `${this.height}px`);
    }
  }
});
</script>
