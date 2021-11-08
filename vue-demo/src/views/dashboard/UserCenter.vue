<template>
	<div class="container">
		<a-tabs defaultActiveKey="1" class="tabs">
			<a-tab-pane tab="修改密码" key="1">
				<change-password />
			</a-tab-pane>
			<a-tab-pane tab="修改个人信息" key="2" disabled
				>修改个人信息</a-tab-pane
			>
		</a-tabs>
	</div>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import ChangePassword from './userCenter/ChangePassword';
export default {
	name: 'UserCenter',
	components: {
		[Tabs.name]: Tabs,
		[Tabs.TabPane.name]: Tabs.TabPane,
		ChangePassword
	}
};
</script>

<style scoped>
.container {
	margin: -24px -16px;
	height: calc(100% + 48px);
}

.tabs {
	height: 100%;
}

.tabs >>> .ant-tabs-bar {
	background-color: #fff;
	margin-bottom: 0;
}

.tabs >>> .ant-tabs-nav-scroll {
	display: flex;
	justify-content: center;
}

.tabs >>> .ant-tabs-content {
	padding: 20px;
	height: calc(100% - 44px);
	overflow-y: auto;
}
</style>
