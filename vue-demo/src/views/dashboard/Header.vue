<script>
import { Layout, Dropdown, Icon, Menu, Avatar } from "ant-design-vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("auth");
import { logout as logoutRequest } from "../../api/login";
import Breadcrumb from "./header/Breadcrumb";
export default {
	name: "Header",
	props: ["isContentScrollToTop"],
	data() {
		return {
			openMenu: false
		};
	},
	computed: {
		...mapState({
			name: state => (state.userInfo ? state.userInfo.userName : ""),
			avatar: state => (state.userInfo ? state.userInfo.avatar : "")
		})
	},
	methods: {
		...mapActions(["logout"]),
		async handleLogOut() {
			logoutRequest();
			await this.logout();
			this.$router.replace({
				name: "Login",
				params: { reason: "logout" }
			});
		},
		handleNavToUserCenter() {
			this.$router.push({ name: "UserCenter" });
		}
	},
	render() {
		return (
			<Layout.Header
				class={`${this.$style.header} ${
					this.isContentScrollToTop === true
						? ""
						: this.$style.shadowed
				}`}
			>
				<Breadcrumb />
				<Dropdown 
				class={this.$style.menu} 
				style="margin-left: auto; height: 35px"
				trigger={['click']}
				>
					<span>
						<Avatar icon="user" size="small" />
						<span class={this.$style.currentUserName}>
							{this.name}
						</span>
						<Icon type={this.openMenu ? "up" : "down"} />
					</span>
					<Menu slot="overlay">
						<Menu.Item onClick={this.handleNavToUserCenter}>
							<Icon type="user" />
							<span>个人中心</span>
						</Menu.Item>
						<Menu.Item onClick={this.handleLogOut}>
							<Icon type="logout" />
							<span>退出</span>
						</Menu.Item>
					</Menu>
				</Dropdown>
			</Layout.Header>
		);
	}
};
</script>

<style module>
.trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

.trigger:hover {
	color: #1890ff;
}

.header {
	position: relative;
	z-index: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	padding: 0 32px 0 32px;
	height: 40px;
	transition: box-shadow linear 120ms;
}
.shadowed {
	box-shadow: 0px 2px 9px 0px rgba(112, 112, 112, 0.25);
}

.menu {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	cursor: pointer;
}

.currentUserName {
	color: #666;
	padding: 0 16px 0 8px;
	user-select: none;
}
</style>
