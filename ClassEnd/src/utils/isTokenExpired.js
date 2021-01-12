export default function (error) {
	if (
		error.response &&
		error.response.status === 401 &&
		// 排除登出接口的401错误
		(
			error.request.responseURL &&
			!error.request.responseURL.includes('/user/loginOut')
		)
	) {
		return true;
	} else {
		return false;
	}
}
