import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCompositionAPI from '@vue/composition-api';
import { pluralize } from './pluralize'

import './assets/scss/main.scss';

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);

/**
 * TODO: Switch to a 'global filter' when upgrading to Vue 3:
 * https://v3.vuejs.org/guide/migration/filters.html#global-filters
 */
Vue.filter('pluralize', pluralize);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
