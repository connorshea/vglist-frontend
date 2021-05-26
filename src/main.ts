import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { pluralize } from './pluralize'

import './assets/scss/main.scss';

const app = createApp(App);

app.use(store);
app.use(router);

// Apply pluralize as a global filter.
app.config.globalProperties.$filters.pluralize = pluralize;

app.mount('#app');
