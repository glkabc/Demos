import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import interviewerAuth from './modules/interviewerAuth';
import status from './modules/status';
import branchHC from './modules/branchHC';


Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		status,
		branchHC,
		interviewerAuth,
	},
});
