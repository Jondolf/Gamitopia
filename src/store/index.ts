import Vue from 'vue';
import Vuex from 'vuex';
import games from './games';

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
  modules: {
    games: games
  }
});
