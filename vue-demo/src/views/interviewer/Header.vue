<template>
	<header class="header">
		<img
			:srcset="`${images.logo.original}, ${images.logo.large} 2x`"
			:src="images.logo.large"
			alt="公司logo"
			class="header__logo"
		/>
		<h1 class="header__title">百得招聘系统</h1>
	</header>
</template>

<script>
export default {
	name: "Header",
	data() {
		return {
			images: {
				logo: {
					original: require("./assets/logo.png"),
					large: require("./assets/logo@2x.png")
				}
			}
		};
	}
};
</script>

<style scoped>
.header {
	z-index: 1;
	position: fixed;
	top: 0;
	left: 0;
	height: 45px;
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
}

.header__logo {
	width: 34px;
	height: 34px;
	margin: 0 16px;
}

.header__title {
	font-size: 20px;
	color: #333;
	margin-bottom: 0;
}
</style>