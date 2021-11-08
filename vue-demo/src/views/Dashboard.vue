<template>
	<a-layout class="layout-container">
		<a-layout-sider collapsible v-model="collapsed">
			<div class="logo">
				<img
					:srcset="`${images.logo.original}, ${images.logo.large} 2x`"
					:src="images.logo.large"
					alt="公司logo"
					class="header__logo"
				/>
				<h1 :style="{ opacity: collapsed ? 0 : 1 }">百得思维</h1>
			</div>
			<new-navigation />
		</a-layout-sider>
		<a-layout>
			
			<div class="allHeight">
				<m-header :isContentScrollToTop="isContentScrollToTop" />
			<a-layout-content
				:style="{
					padding: '10px',
					height: 'calc(100% - 50px)',
					position: 'relative',
					overflow: 'auto'
				}"
				class="ant-scroll-main"
				@scroll.passive="handleScroll"
				ref="layoutel"
			>
			<keep-alive v-if="$route.meta.keepAlive">
        <router-view />
			</keep-alive>
				<router-view  v-if="!$route.meta.keepAlive" />
			</a-layout-content>
			</div>
		</a-layout>
	</a-layout>
</template>

<script>
import NewNavigation from "./dashboard/NewNavigation";
import Header from "./dashboard/Header";
import throttle from "lodash-es/throttle";

const handleScroll = throttle(function(event) {
	if (event.target.scrollTop === 0) {
		this.isContentScrollToTop = true;
	} else {
		this.isContentScrollToTop = false;
	}
}, 200);

export default {
	name: "Dashboard",
	components: {
		mHeader: Header,
		NewNavigation
	},
	data() {
		return {
			collapsed: false,
			images: {
				logo: {
					original: require("./interviewer/assets/logo.png"),
					large: require("./interviewer/assets/logo@2x.png")
				}
			},
			isContentScrollToTop: true
		};
	},
	methods: {
		handleScroll
	},
	mounted() {
		let router = this.$route.path
		if (router == '/department/Position') {
			this.$refs.layoutel.$el.style.padding = '0px'
		} else {
			this.$refs.layoutel.$el.style.padding = '10px'
		}
	},
	watch: {
		$route: function () {
			// 监听是否在职位页面，如果在就让其没有边框，其余页面有边框padding
			let router = this.$route.path
			if (router == '/department/Position') {
				this.$refs.layoutel.$el.style.padding = '0px'
			} else {
				this.$refs.layoutel.$el.style.padding = '10px'
			}
		}
	}
};
</script>

<style scoped>

.layout-container {
	height: 100%;
}

.logo {
	height: 32px;
	margin: 16px;
	padding: 0 8px;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	position: relative;
}

.logo > img {
	width: 32px;
	height: 32px;
	margin-right: 16px;
}

.logo > h1 {
	position: absolute;
	margin-left: 50px;
	margin-bottom: 0;
	color: #fff;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	pointer-events: none;
	transition: opacity 150ms linear;
}
.ant-scroll-main::-webkit-scrollbar { width: 0 !important }
</style>
