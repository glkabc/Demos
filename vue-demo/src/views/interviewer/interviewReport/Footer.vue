<template>
	<div class="footer-container">
		<div class="footer-item">
			<a-button
				class="button-info"
				@click="handleShowAddReport"
				:disabled="disableOperation"
				>填写面试评价</a-button
			>
		</div>
		<!-- <div class="footer-item">
			<a-button type="primary" @click="handleShowAddInterviewer">添加面试官</a-button>
		</div>-->
	</div>
</template>

<script>
export default {
	props: {
		showAddInterviewer: Boolean,
		showAddReport: Boolean,
		disableOperation: Boolean
	},
	methods: {
		handleShowAddInterviewer() {
			this.$emit('update:showAddInterviewer', true);
		},
		handleShowAddReport() {
			this.$emit('update:showAddReport', true);
		}
	}
};
</script>

<style scoped>
.footer-container {
	background-color: #fff;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	padding: 10px 0;
	box-shadow: 0px 9px 27px 1px rgba(0, 0, 0, 0.18);
}

.footer-item {
	padding: 16px;
}

.button-info {
	color: #fff;
	background-color: #22b8cf;
	border-color: #22b8cf;
}

.button-info:hover {
	color: #fff;
	background-color: #4ec6d8;
	border-color: #4ec6d8;
}

.button-info[disabled] {
	border-color: #999;
	background-color: #fff;
	color: #999;
}

.button-danger {
	color: #fff;
	background-color: #fd5158;
	border-color: #fd5158;
}

.button-danger:hover {
	color: #fff;
	background-color: #fd7379;
	border-color: #fd7379;
}
</style>
