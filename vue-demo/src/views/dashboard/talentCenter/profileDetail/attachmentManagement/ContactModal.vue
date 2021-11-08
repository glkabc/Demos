<template>
	<a-modal
		title="沟通详情"
		:visible="show"
		@cancel="handleCancel"
		destroyOnClose
		centered
		:footer="null"
	>
		<contact-content :id="id" />
	</a-modal>
</template>

<script>
import { Modal } from "ant-design-vue";
import ContactContent from "./ContactContent";
export default {
	name: "ReportModal",
	components: {
		[Modal.name]: Modal,
		ContactContent
	},
	props: {
		show: Boolean,
		id: Number
	},
	methods: {
		handleCancel() {
			this.$emit("update:show", false);
		}
	}
};
</script>

<style scoped>
</style>