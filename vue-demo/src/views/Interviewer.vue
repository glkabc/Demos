<template>
	<div class="container">
		<a-spin class="center" v-if="isAuthenticating" />
		<a-result
			class="center"
			v-else-if="isError"
			status="403"
			:title="isError"
		/>
		<template v-else-if="storeToken && !isError">
			<m-header />
			<a-tabs defaultActiveKey="1" class="tabs" :animated="false">
				<a-tab-pane tab="简历筛选" key="1">
					<resume-filter />
				</a-tab-pane>
				<a-tab-pane tab="面试评价" key="2">
					<interview-report />
				</a-tab-pane>
				<!-- <span slot="tabBarExtraContent">{{ userInfo.name }}</span> -->
			</a-tabs>
		</template>
	</div>
</template>

<script>
import { Tabs, Result, Spin } from 'ant-design-vue';
import ResumeFilter from './interviewer/ResumeFilter';
import InterviewReport from './interviewer/InterviewReport';
import MHeader from './interviewer/Header';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
	'interviewerAuth'
);
export default {
	name: 'Interviewer',
	components: {
		[Tabs.name]: Tabs,
		[Tabs.TabPane.name]: Tabs.TabPane,
		[Result.name]: Result,
		[Spin.name]: Spin,
		ResumeFilter,
		InterviewReport,
		MHeader
	},
	computed: {
		...mapState({
			storeToken: state => state.token,
			isAuthenticating: state => state.isAuthenticating,
			isError: state => state.isError,
			userInfo: state => state.userInfo
		})
	},
	methods: {
		...mapMutations(['authFailure']),
		...mapActions(['verifyToken'])
	},

	created() {
		const token = this.$route.query.token;
		// 如果store里的已经有当前token验证错误的信息，则不做任何操作
		if (this.isError) {
			return;
			// 如果store里没有token，并且url里面有带入的Token，则验证token
		} else if (!this.storeToken && token) {
			this.verifyToken({ token });
			// 如果以上条件都不符合，url中又没有带入token，则为无效链接
		} else if (!token) {
			this.authFailure({ error: '无效的链接地址' });
		}
	}
};
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	background-color: #f0f2f5;
	display: flex;
	flex-direction: column;
}

.center {
	margin: auto;
}

.tabs {
	height: 100%;
}

.tabs >>> .ant-tabs-extra-content {
	position: absolute;
	right: 0;
	margin-right: 20%;
}

.tabs >>> .ant-tabs-bar {
	background-color: #fff;
	margin-bottom: 0;
	box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}

.tabs >>> .ant-tabs-nav-scroll {
	display: flex;
	justify-content: center;
}

.tabs >>> .ant-tabs-content {
	padding: 20px 50px 0 50px;
	height: calc(100% - 44px);
	overflow-y: auto;
}

.tabs >>> .ant-tabs-content .ant-tabs-tabpane {
	height: 100%;
}

.tabs >>> .ant-tabs-content .ant-tabs-tabpane.ant-tabs-tabpane-inactive {
	height: 0;
}

.tab-page {
	background-color: #fff;
	min-height: 100%;
}
</style>
