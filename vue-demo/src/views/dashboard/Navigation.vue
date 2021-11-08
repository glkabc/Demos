<template>
	<a-menu theme="dark" mode="inline" class="menu">
		<template v-for="item of menu">
			<a-menu-item
				v-if="
					item.children == undefined &&
						!item.meta.hide &&
						canIUse({ code: item.meta.authCode })
				"
				:key="item.meta.id"
				@click="handlePush(`/${item.path}`)"
			>
				<a-icon :type="item.meta.icon" />
				<span>{{ item.meta.title }}</span>
			</a-menu-item>
			<a-sub-menu
				v-else-if="
					!item.meta.hide &&
						canIUse({
							code: item.children
								? item.children.map(
										route => route.meta.authCode
								  )
								: []
						})
				"
				:key="item.meta.id"
			>
				<span slot="title">
					<a-icon :type="item.meta.icon" />
					<span>{{ item.meta.title }}</span>
				</span>
				<template v-for="sub of item.children">
					<a-menu-item
						:key="sub.meta.id"
						v-if="
							!sub.meta.hide &&
								canIUse({ code: sub.meta.authCode })
						"
						@click="handlePush(`/${item.path}/${sub.path}`)"
					>{{ sub.meta.title }}</a-menu-item>
				</template>
			</a-sub-menu>
		</template>
	</a-menu>
</template>

<script>
import { canIUse } from "../../components/CanIUse";
export default {
	data() {
		return {
			menu: this.$router.options.routes.find(
				rootRoute => rootRoute.path === "/"
			).children
		};
	},
	methods: {
		canIUse,
		handlePush(path) {
			this.$router.push(path).catch(err => {});
		}
	}
};
</script>

<style scoped>
.menu {
	margin-bottom: 48px;
}
</style>
