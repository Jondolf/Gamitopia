<template>
  <div id="app">
    <Nav />
    <router-view />
    <Footer />
  </div>
</template>

<script lang="ts">
import * as FastClick from 'fastclick';
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: 'App',

  components: {
    Nav,
    Footer
  },

  setup() {
    const store = useStore();

    if (localStorage.getItem('jwt')) {
      store.commit('changeIsAdmin', true);
    }

    onMounted(() => {
      // @ts-ignore
      FastClick.attach(document.body);
      document.dispatchEvent(new Event('rendered'));
    });
  }
});
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
