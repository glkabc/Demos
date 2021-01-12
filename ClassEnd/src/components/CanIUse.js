import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('auth');
import store from '../store';

let authorizationTurnOff = false;

function searchAuth(obj, val) {
	if (val === null) return true;
	if (val === undefined) return false;
	const queue = [obj];
	while (queue.length > 0) {
		const current = queue.shift();
		if (current.moduleCode === val) {
			return true;
		}

		const children = Array.isArray(current.children)
			? current.children
			: [];

		for (const child of children) {
			queue.push(child);
		}
	}
	return false;
};

function hasAuthorization() {
	if (authorizationTurnOff) {
		return true;
	}
	if (!this.authorization) {
		// 如果没有authorization信息，则没有权限
		return false;
	} else if (this.id && this.id !== this.userId) {
		// 如果传入了id，则拿id和userId比较，不同则没有权限
		return false;
	} else if (Array.isArray(this.code)) {
		return this.code.some(oneOfCode => searchAuth({ children: this.authorization }, oneOfCode));
	} else {
		return searchAuth({ children: this.authorization }, this.code);
	}
}

export function canIUse({ code, id }) {
	const authorization = store.state.auth.authorization;
	const userId = store.state.auth.userInfo;
	return hasAuthorization.call({ code, id, authorization, userId })
}

export function authTurnOff() {
	authorizationTurnOff = true;
}

export default {
	name: 'CanIUse',
	props: {
		code: {
			type: [String, Array],
		},
		id: {
			type: Number,
		}
	},
	computed: {
		...mapState({
			authorization: state => state.authorization,
			userId: state => state.userInfo ? state.userInfo.sysUserId : ''
		}),
		hasAuthorization
	},
	render() {
		return this.hasAuthorization ? this.$slots.default : null;
	}
};
