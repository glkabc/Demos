import axios from 'axios';
// import baseURL from './baseURL';
import store from '../store';
import router from '../router';
import isTokenExpired from '../utils/isTokenExpired';
import isServerError from '../utils/isServerError';
import isTimeout from '../utils/isTimeout';
import { message } from 'ant-design-vue';
import throttle from 'lodash-es/throttle';

const isProduction = process.env.NODE_ENV === 'production';

// token过期前有多长时间的刷新窗口，以毫秒计算
const expireTime = 600000;

const request = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: isProduction ? 20000 : 0
});

// 存储axios拦截器的编号
let authRequestInterceptor = null;
let authResponseInterceptor = null;

/**
 * 拿到用户登录获得的token后注册请求的拦截器。
 * 刷新token后不会卸载原有的拦截器，只是改变拦截器内部保存的token值。
 * 检测到服务器返回的401身份验证失败或者是用户手动退出时，都会触发 auth/logout 事件，
 * 然后在vuex中调用当前模块导出的 detachTokenInterceptor 方法卸载当前的拦截器
 */
const attachTokenInterceptor = token => {
	console.log(token);
	if (!token) {
		throw Error('token cannot be empty');
	}
	let attachedToken = token;
	let isTokenRefreshing = false;
	let refreshRequest = null;
	authRequestInterceptor = request.interceptors.request.use(
		
		async function (config) {
			console.log(config.headers,'config')
			// 如果当前请求的地址是刷新token的地址，直接放行。
			if (config.url === '/user/refreshToken') {
				if (!isProduction) {
					console.log(`refreshToken request, won't modify it...`);
				}
				return config;
			}
			const expiredAt = store.state.auth.expiredAt;
			const now = Date.now();
			// 计算是否处于刷新窗口期
			const withinRefreshWindow = expiredAt > now && expiredAt <= now + expireTime;
			// 在刷新窗口期内，同时只会存在一个刷新token的请求
			if (withinRefreshWindow && refreshRequest === null) {
				if (!isProduction) {
					console.log(`Trigger token refreshing, url : ${config.url}`);
				}
				try {
					isTokenRefreshing = true;
					refreshRequest = request.get('/user/refreshToken', { headers: { Authorization: attachedToken } });
					const refreshResponse = await refreshRequest;
					if (refreshResponse.status === 200 && refreshResponse.data.code === 0) {
						const newToken = refreshResponse.data.data.token;
						const expiredAt = refreshResponse.data.data.expireTime + Date.now();
						attachedToken = newToken;
						store.commit('auth/tokenRefresh', { newToken, expiredAt: expiredAt });
						const storedAuth = window.localStorage.getItem('auth');
						const parsedAuth = JSON.parse(storedAuth);
						parsedAuth.token = newToken;
						parsedAuth.expiredAt = expiredAt
						window.localStorage.setItem('auth', JSON.stringify(parsedAuth));
						if (!isProduction) {
							console.log('token刷新');
						}
					}
				} catch (error) {
					
					// token刷新失败是否需要提醒用户？
				} finally {
					isTokenRefreshing = false;
					refreshRequest = null;
					config.headers.Authorization = attachedToken;
					return config;
				}
			} else if (isTokenRefreshing) {
				if (!isProduction) {
					console.log(`Waiting for token refreshing to complete, url: ${config.url}`);
				}
				// 如果在处理当前的请求时,发现token正在刷新中，那么需要等待token刷新结束
				await refreshRequest;
				config.headers.Authorization = attachedToken;
				return config;
			} else {
				if (!isProduction) {
					console.log(`No need for refreshing or waiting, url : ${config.url}`);
				}
				config.headers.Authorization = attachedToken;
				return config;
			}
		},
		function (error) {
			return Promise.reject(error);
		}
	);
	const throttledTokenExpireHandler = throttle(() => {
		message.warn('登录超时或当前账号在其它地方登录', 2);
		store.dispatch('auth/logout');
		router.replace({
			name: '登录',
			params: { reason: 'token-expired' }
		});
	}, 3000, { 'trailing': false });
	authResponseInterceptor = request.interceptors.response.use(
		response => {
			return response;
		},
		error => {
			console.log({ error });
			if (isTokenExpired(error) && error.config && error.config.url !== '/user/loginOut') {
				throttledTokenExpireHandler();
			}
			return Promise.reject(error);
		}
	);
};

const throttledServerErrorHandler = throttle(() => {
	message.error('服务器出错啦!', 2);
}, 2000, { 'trailing': false });
const throttledTimeoutHandler = throttle(() => {
	message.error('连接超时!', 2);
}, 2000, { 'trailing': false });

// 服务器500和连接超时的全局拦截器
request.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (isServerError(error)) {
			throttledServerErrorHandler();
		}
		if (isTimeout(error)) {
			throttledTimeoutHandler();
		}
		return Promise.reject(error);
	}
);

const detachTokenInterceptor = () => {
	// authRequestInterceptor 的值可能为数字0
	if (authRequestInterceptor !== null) {
		request.interceptors.request.eject(authRequestInterceptor);
		authRequestInterceptor = null;
	}
	if (authResponseInterceptor !== null) {
		request.interceptors.response.eject(authResponseInterceptor);
		authResponseInterceptor = null;
	}
};



export default request;
export { attachTokenInterceptor, detachTokenInterceptor };
