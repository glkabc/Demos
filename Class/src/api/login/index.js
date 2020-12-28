import request from '../../configs/request'

export const getAuthCode = () => {
    return request.get('/user/generateVerificationCode')
}

export const verifyAuthCode = ({ authCodeId, authCode }) => {
    return request.get(`/user/checkVerificationCode?id=${authCodeId}&verificationCode=${authCode}`);
}

export const login = ({ username, password }) => {
    return request.get(`/user/login?mail=${username}&password=${password}`);
}

export const isAlreadyLogin = username => {
    return request.get(`/user/isLogin?mail=${username}`);
}

export const logout = () => {
    return request.get('/user/loginOut');
}
// export const refreshToken = () => {
//     return request.get('/user/refreshToken');
// }