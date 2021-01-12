import { fakeTokenVerify } from '../../api/interviewer';
import { attachTokenInterceptor } from '../../configs/interviewerRequest';

const state = {
    token: null,
    userInfo: null,
    isAuthenticating: false,
    isError: false
};

const mutations = {
    authRequest(state) {
        state.isAuthenticating = true;
        state.isError = null;
    },
    authSuccess(state, { token, userInfo }) {
        state.isAuthenticating = false;
        state.token = token;
        state.userInfo = userInfo;
    },
    authFailure(state, { error }) {
        state.isAuthenticating = false;
        state.isError = error;
    },
    clearAuth(state) {
        state.token = null;
        // state.expiredAt = null;
        state.userInfo = null;
        state.isAuthenticating = false;
        state.isError = null;
    },
    tokenRefresh(state, { newToken }) {
        state.token = newToken;
    }
};

const actions = {
    async verifyToken({ commit }, { token }) {
        try {
            commit('authRequest');
            const res = await fakeTokenVerify(token);
            if (res.status === 200) {
                if (res.data.code === 0) {
                    attachTokenInterceptor(token);
                    const userInfo = res.data.data.userInfo
                    commit('authSuccess', { token, userInfo })
                    return true;
                } else {
                    commit('authFailure', { error: res.data.mesg || '您输入的链接已经过期' });
                    return false;
                }
            }
        } catch (error) {
            commit('authFailure', { error: error });
            return false;
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
