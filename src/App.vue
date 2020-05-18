<template>
  <div id="app">
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import * as FastClick from 'fastclick';

import { store } from './store';

export default Vue.extend({
  name: 'app',
  components: {
    Nav,
    Footer
  },
  store,
  created() {
    if (localStorage.getItem('jwt')) {
      store.commit('changeIsAdmin', true);
    }
  },
  mounted() {
    //@ts-ignore
    FastClick.attach(document.body);
  }
});
</script>

<style lang="scss">
@import '@/global.scss';
* {
  margin: 0;
  padding: 0;
}
html {
  min-height: 100%;
  display: flex;
}
html,
body,
#app {
  font-family: Nunito, 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  background-color: var(--primary-color);
  width: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
a {
  text-decoration: none;
}
</style>
