import request from '../../configs/request'

export const changePassword = ({ oldPassword, newPassword }) => {
    return request.get(`/user/changePassword?oldPassword=${oldPassword}&password=${newPassword}`);
}