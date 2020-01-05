import Vue from 'vue';
import App from './App.vue';
import router from './router';

// @ts-ignore
import { VueHammer } from 'vue2-hammer';
Vue.use(VueHammer);

Vue.config.productionTip = false;

import VueAnalytics from 'vue-analytics';
Vue.use(VueAnalytics, {
  id: 'UA-146791846-1',
  router,
  checkDuplicatedScript: true
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
