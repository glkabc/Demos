import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import interviewerAuth from './modules/interviewerAuth';
import canvas from './modules/canvas';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    interviewerAuth,
    canvas,
  },
});
