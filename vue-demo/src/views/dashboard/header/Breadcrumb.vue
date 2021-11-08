<script>
export default {
	name: "Breadcrumb",
	computed: {
		routes() {
			const routes = this.$route.matched;
			const dashboardRemovedRoutes = routes.filter(
				route => route.path !== ""
			);
			if (routes.length === 0) {
				return dashboardRemovedRoutes;
			} else if (
				dashboardRemovedRoutes[
					dashboardRemovedRoutes.length - 1
				].path.endsWith("/")
			) {
				return dashboardRemovedRoutes.slice(0, -1);
			} else {
				return dashboardRemovedRoutes;
			}
		}
	},
	render() {
		return (
			<div class={this.$style.container}>
				{this.routes.map((route, index, routers) => {
					let renderedCrumb;
					if (index === 0) {
						renderedCrumb = (
							<span class={this.$style.basicCrumb}>
								{route.meta.title}
							</span>
						);
					} else if (route.path.endsWith("/")) {
						renderedCrumb = null;
					} else if (index + 1 === routers.length) {
						renderedCrumb = (
							<span class={this.$style.basicCrumb}>
								{route.meta.title}
							</span>
						);
					} else {
						renderedCrumb = (
							<span
								class={this.$style.crumbLink}
								onClick={() =>
									this.$router.go(
										-(routers.length - 1 - index)
									)
								}
							>
								{route.meta.title}
							</span>
						);
					}
					if (
						renderedCrumb !== null &&
						index + 1 !== routers.length
					) {
						return [
							renderedCrumb,
							<span class={this.$style.crumbDivider}>/</span>
						];
					} else {
						return renderedCrumb;
					}
				})}
			</div>
		);
	}
};
</script>

<style module>
.contianer {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
}

.basicCrumb {
	color: #666;
}

.crumbLink {
	composes: basicCrumb;
	color: #1478e3;
	cursor: pointer;
}

.crumbDivider {
	color: #666;
	margin: 0 8px;
}
</style>