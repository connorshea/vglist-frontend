<template>
  <!-- This is a bit of a hack to load it with the HTML Loader.
       https://stackoverflow.com/questions/50834598/inline-svg-in-vuejs-component
  -->
  <span :class="classes"
        v-html="require(`!html-loader!@/assets/icons/${name}.svg`)"
  ></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 16
    },
    fill: {
      type: String,
      required: false
    },
    cssStyle: {
      type: String,
      required: false
    },
    classes: {
      type: Array as () => Array<string>,
      required: false,
      default: () => []
    },
    svgClasses: {
      type: Array as () => Array<string>,
      required: false,
      default: () => []
    }
  },
  mounted() {
    // https://medium.com/js-dojo/making-svg-icon-component-in-vue-cb7fac70e758
    if (this?.$el?.firstElementChild?.nodeName === 'svg') {
      const svgElement = this.$el.firstElementChild;
      svgElement.setAttribute('height', `${this.size}px`);
      svgElement.setAttribute('width', `${this.size}px`);
      svgElement.classList.add('svg-icon', ...this.svgClasses);

      if (typeof this.fill !== 'undefined') {
        svgElement.setAttribute('fill', this.fill);
      }
      if (typeof this.cssStyle !== 'undefined') {
        svgElement.setAttribute('style', this.cssStyle);
      }
    }
  }
});
</script>
