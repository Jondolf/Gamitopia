import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isAdmin: false
  },
  mutations: {
    changeIsAdmin(state, bool: boolean) {
      state.isAdmin = bool;
    }
  },
  actions: {},
  modules: {}
});
