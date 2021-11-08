import axios from 'axios';
import baseURL from './baseURL';
import store from '../store';
import router from '../router';
import isServerError from '../utils/isServerError';
import isTimeout from '../utils/isTimeout';
import isTokenExpired from '../utils/isTokenExpired';
import throttle from 'lodash-es/throttle';

const request = axios.create({
    baseURL: baseURL,
    timeout: process.env.NODE_ENV === 'production' ? 20000 : 0
});

let authRequestInterceptor = null;
let authResponseInterceptor = null;

const attachTokenInterceptor = token => {
    if (!token) {
        throw new Error('token cannot be empty when attach interceptor');
    }
    let attachedToken = token;
    authRequestInterceptor = request.interceptors.request.use(
        config => {
            config.headers.Authorization = attachedToken;
            return config;
        },
        error => {
            return Promise.reject(error)
        }
    );

    const throttledTokenExpireHandler = throttle(() => {
        detachTokenInterceptor();
        store.commit('interviewerAuth/authFailure', { error: '对不起，当前链接已经失效' });
        if (router.history.current.name !== 'Interviewer') {
            router.replace({
                name: 'Interviewer',
                query: {
                    token: store.state.interviewerAuth.token
                }
            });
        }
    }, 1000, { 'trailing': false });
    authResponseInterceptor = request.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (isTokenExpired(error)) {
                throttledTokenExpireHandler();
            }
            return Promise.reject(error);
        }
    );
}

const detachTokenInterceptor = () => {
    if (authRequestInterceptor !== null) {
        request.interceptors.request.eject(authRequestInterceptor);
        authRequestInterceptor = null;
    }
    if (authResponseInterceptor !== null) {
        request.interceptors.response.eject(authResponseInterceptor);
        authResponseInterceptor = null;
    }
};

const throttledServerErrorHandler = throttle(() => {
    message.error('服务器出错啦!', 2);
}, 2000, { 'trailing': false });
const throttledTimeoutHandler = throttle(() => {
    message.error('连接超时!', 2);
}, 2000, { 'trailing': false });
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



export default request;
export {
    attachTokenInterceptor,
    detachTokenInterceptor
}