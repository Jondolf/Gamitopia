import Decimal from 'decimal.js';
import Hammer from 'hammerjs';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/global.scss';
import './registerServiceWorker';
import router from './router';
import store from './store';

Decimal.set({ precision: 100, rounding: 4 });

const app = createApp(App)

app.directive('swipe', {
  mounted(el: HTMLElement, binding) {
    if (typeof binding.value === 'function') {
      const mc = new Hammer(el);
      mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
      mc.on('swipeup', () => binding.value('up'));
      mc.on('swiperight', () => binding.value('right'));
      mc.on('swipedown', () => binding.value('down'));
      mc.on('swipeleft', () => binding.value('left'));
    }
  }
})

app.use(store)
  .use(router)
  .mount('#app');
