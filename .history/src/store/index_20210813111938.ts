import { createStore } from "vuex";

export default createStore({
  state: {
    user: localStorage.getItem('user')
  },
  mutations: {},
  actions: {},
  modules: {},
});
