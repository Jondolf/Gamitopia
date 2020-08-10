import Decimal from 'decimal.js';
import { createApp } from "vue";
import { VueHammer } from 'vue2-hammer';
import App from "./App.vue";
import './assets/global.scss';
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Decimal.set({ precision: 100, rounding: 4 });

VueHammer.config.press = {
  time: 0
};

createApp(App)
  .use(store)
  .use(router)
  .use(VueHammer as any)
  .mount("#app");
