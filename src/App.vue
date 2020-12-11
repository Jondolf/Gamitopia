<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script lang="ts">
import * as FastClick from 'fastclick';
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import Nav from '@/components/Nav.vue';

export default defineComponent({
  name: 'App',

  components: {
    Nav
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
  width: 100%;
  min-height: 100vh;
}
</style>
