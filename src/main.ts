import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import villus from './villus';

import './assets/scss/main.scss';

createApp(App).use(store).use(router).use(villus).mount('#app')
