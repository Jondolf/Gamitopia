import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// @ts-ignore
import { VueHammer } from 'vue2-hammer';
Vue.use(VueHammer);
VueHammer.config.press = {
  time: 0
};

Vue.config.productionTip = false;

import VueGtag from 'vue-gtag';

Vue.use(
  VueGtag,
  {
    config: { id: 'UA-146791846-1' },
    appName: 'Gamitopia'
  },
  router
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
