<template>
	<a-modal
		title="淘汰"
		:visible="show"
		@ok="handleSubmit"
		@cancel="handleCancel"
		:confirmLoading="form.submitting"
		destroyOnClose
		centered
	>
		<a-form :form="form" layout="horizontal">
			<a-form-item
				label="备注"
				:colon="false"
				:label-col="{ span: 3 }"
				:wrapper-col="{ span: 21 }"
			>
				<a-textarea
					v-decorator="[
						'comment',
						{
							rules: [
								{ required: true, message: '请输入面试评价!' }
							]
						}
					]"
					:rows="4"
					:autoSize="false"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script>
import { Modal } from 'ant-design-vue';
import { candidateFail } from '@/api/interviewer';
export default {
	name: 'Fail',
	components: {
		[Modal.name]: Modal
	},
	data() {
		return {
			form: this.$form.createForm(this, { name: 'fail' })
		};
	},
	props: {
		show: Boolean,
		selectedIds: Array,
		selectedList: Array
	},
	methods: {
		handleSubmit() {
			this.form.validateFields(async (err, values) => {
				if (!err) {
					try {
						this.form.submitting = true;
						let tmpTalentIdList = []
						this.selectedList.map(item => {
							tmpTalentIdList.push(item.talentId)
						})
						const res = await candidateFail({
							ids: tmpTalentIdList,
							comment: values.comment
						});
						this.form.submitting = false;
						if (res.status === 200) {
							if (res.data.code === 0) {
								this.$message.success('成功淘汰候选人', 2);
								this.$emit('update:show', false);
								this.$emit('fail-success');
							} else {
								this.$message.error(
									res.data.mesg
										? res.data.mesg
										: '淘汰候选人失败',
									2
								);
							}
						}
					} catch (error) {
						this.form.submitting = false;
					}
				}
			});
		},
		handleCancel() {
			this.$emit('update:show', false);
		}
	}
};
</script>

<style scoped></style>
