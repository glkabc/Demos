import {
	attachTokenInterceptor,
	detachTokenInterceptor
} from '../../configs/request';

import { login, logout } from '../../api/login';
// import { login, logout } from '../../api/login';
import {zeroLogin} from '../../api/loginbs'

// 登录默认state
const state = {
	token: null,
	expiredAt: null,
	authorization: null,
	userInfo: null,
	isLoading: false,
	isError: null
};

// 模块加载的时候从 localStorage 查询之前保存的登录信息
const preservedAuth = window.localStorage.getItem('auth');
// 如果存在已保存的登录信息，用已保存的信息覆盖默认的登录 state;
if (preservedAuth) {
	const parsed = JSON.parse(preservedAuth);
	state.token = parsed.token;
	state.expiredAt = parsed.expiredAt;
	state.authorization = parsed.authorization;
	state.userInfo = parsed.userInfo;
	attachTokenInterceptor(parsed.token)
}

const mutations = {
	authRequest(state) {
		state.isLoading = true;
		state.isError = null;
	},
	authSuccess(state, { token, expiredAt, authorization, userInfo }) {
		state.isLoading = false;
		state.token = token;
		state.expiredAt = expiredAt;
		state.authorization = authorization;
		state.userInfo = userInfo;
	},
	authFailure(state, { error }) {
		state.isLoading = false;
		state.isError = error;
	},
	clearAuth(state) {
		state.token = null;
		state.expiredAt = null;
		state.authorization = null;
		state.userInfo = null;
		state.isLoading = false;
		state.isError = null;
	},
	tokenRefresh(state, { newToken, expiredAt }) {
		state.token = newToken;
		state.expiredAt = expiredAt
	}
};

const actions = {
	async login({ commit }, { username, password }) {
		try {
			window.localStorage.removeItem('auth');
			window.localStorage.removeItem('path');
			commit('clearAuth');
			detachTokenInterceptor();
			commit('authRequest');
			const res = await login({ username, password });
			if (res.status === 200) {
				if (res.data.code === 0) {
					const token = res.data.data.token;
					// 登录成功后，使用返回的token注册axios的拦截器
					attachTokenInterceptor(token);
					const payload = {
						token: token,
						expiredAt: res.data.data.expireTime + Date.now(),
						authorization: res.data.data.modules,
						userInfo: res.data.data.user
					};
					commit('authSuccess', payload);
					// 使用 localStorage 存储 token、token过期时间、用户权限、用户信息
					window.localStorage.setItem('auth', JSON.stringify(payload));
					if(res.data.data.modules.length==0){
						return '暂无权限'
					}else{
						return true
					}
					// 这里返回 true，使得组件内 dispatch 该action的函数知道登录成功
					
				} else {
					commit('authFailure', { error: res.data.mesg });
					
					return false;
				}
			} else {
				commit('authFailure', { error: '服务器出错了' });
				return false;
			}
		} catch (err) {
			commit('authFailure', { error: err });
			return false;
		}
	},
	async zeroLogin({ commit },id) {
		try {
			window.localStorage.removeItem('auth');
			window.localStorage.removeItem('path');
		commit('clearAuth');
		detachTokenInterceptor();
		// window.localStorage.removeItem('auth');
        console.log(window.localStorage.getItem('auth'),123);
			commit('authRequest');
			const res = await zeroLogin(id);
			if (res.status === 200) {
				if (res.data.code === 0) {
					console.log(res.data.data,'authBs')
					const token = res.data.data.token;
					// 登录成功后，使用返回的token注册axios的拦截器
					attachTokenInterceptor(token);
					const payload = {
						token: token,
						expiredAt: res.data.data.expireTime + Date.now(),
						authorization: res.data.data.modules,
						userInfo: res.data.data.user
					};
					commit('authSuccess', payload);
					// 使用 localStorage 存储 token、token过期时间、用户权限、用户信息
					window.localStorage.setItem('auth', JSON.stringify(payload));
					// 这里返回 true，使得组件内 dispatch 该action的函数知道登录成功
					return true;
				} else {
					commit('authFailure', { error: res.data.mesg });
					return false;
				}
			} else {
				commit('authFailure', { error: '服务器出错了' });
				return false;
			}
		} catch (err) {
			commit('authFailure', { error: err });
			return false;
		}
	},
	async logout({ commit }) {
		// 1.删除 localStorage 里面的登录信息
		// 2.重置 vuex 中的登录状态
		// 3.移除 axios 请求拦截器
		window.localStorage.removeItem('auth');
		commit('clearAuth');
		detachTokenInterceptor();
		return;
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
