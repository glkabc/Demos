<template>
	<a-modal
		title="评价记录"
		:visible="show"
		@cancel="handleCancel"
		destroyOnClose
		centered
		:footer="null"
	>
		<m-log :id="id" />
	</a-modal>
</template>

<script>
import { Modal } from 'ant-design-vue';
import MLog from './Log';
export default {
	name: 'ReportLog',
	components: {
		[Modal.name]: Modal,
		MLog
	},
	props: {
		show: Boolean,
		id: Number
	},
	methods: {
		handleCancel() {
			this.$emit('update:show', false);
		}
	}
};
</script>

<style scoped></style>
