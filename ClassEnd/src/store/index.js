import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import interviewerAuth from './modules/interviewerAuth';
import canvas from './modules/canvas';
import {min_attachTokenInterceptor, min_detachTokenInterceptor} from '../configs/request'

Vue.use(Vuex);

let state = {
  mine_expireTime: 0,
  mine_user: {},
  mine_modules: [],
  mine_token: '',
  mine_loginTime: 0
}

const preservedMin = window.localStorage.getItem('min_user');
if (preservedMin) {
	const parsed = JSON.parse(preservedMin)
  state.mine_expireTime = parsed.expireTime
  state.mine_loginTime = parsed.loginTime
  state.mine_modules = parsed.modules
  state.mine_user = parsed.user
  state.mine_token = parsed.token
	min_attachTokenInterceptor(parsed.token)
}

export default new Vuex.Store({
  state,
  mutations: {
    min_loginSuccess(state, {expireTime, user, modules, token}) {
      state.mine_expireTime = expireTime
      state.mine_user = user
      state.mine_modules = modules
      state.mine_token = token
      state.mine_loginTime = Date.now()
    },
    min_refreshToken(state, {newToken, expireTime}) {
      state.mine_token = newToken
      state.mine_expireTime = expireTime
      state.mine_loginTime = Date.now()
    }
  },
  actions: {
    min_login({ commit }, data) {
      min_detachTokenInterceptor()

      window.localStorage.removeItem('min_user')

      min_attachTokenInterceptor(data.token)

      commit('min_loginSuccess', data)

      data = {
        ...data,
        loginTime: state.mine_loginTime
      }
      
      window.localStorage.setItem('min_user', JSON.stringify(data))
    }
  },
  modules: {
    auth,
    interviewerAuth,
    canvas,
  },
});
