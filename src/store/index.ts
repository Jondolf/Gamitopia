import { createStore } from "vuex";
import games from './games';

export default createStore({
  state: {
    isAdmin: false
  },
  mutations: {
    changeIsAdmin(state, bool: boolean) {
      state.isAdmin = bool;
    }
  },
  modules: {
    games
  }
});
