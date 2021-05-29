<template>
  <!-- This is a bit of a hack to load it with the HTML Loader.
       https://stackoverflow.com/questions/50834598/inline-svg-in-vuejs-component
  -->
  <span ref="icon" :class="classes"
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
      required: false,
      default: undefined
    },
    cssStyle: {
      type: String,
      required: false,
      default: undefined
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
    // Plus some custom stuff using Template Refs. Apparently, Vue does weird
    // crap when given a comment at the start of the template... so that's fun.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const icon: any = this?.$refs?.icon;
    if (icon.firstElementChild?.nodeName === 'svg') {
      const svgElement = icon.firstElementChild;
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
