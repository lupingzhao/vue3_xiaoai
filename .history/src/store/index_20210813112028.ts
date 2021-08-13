import { createStore } from "vuex";

export default createStore({
  state: {
    user: localStorage.getItem('user')
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {},
  modules: {},
});
