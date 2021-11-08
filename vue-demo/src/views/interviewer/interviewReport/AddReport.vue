<template>
	<a-modal
		title="面试评价"
		:visible="show"
		@ok="handleSubmit"
		@cancel="handleCancel"
		:confirmLoading="form.submitting"
		destroyOnClose
		centered
	>
		<a-form :form="form" layout="horizontal">
			<a-form-item
				label="面试结果"
				:colon="false"
				:label-col="{ span: 4 }"
				:wrapper-col="{ span: 20 }"
			>
				<a-radio-group
					v-decorator="[
						'result',
						{
							rules: [
								{ required: true, message: '请选择面试结果' }
							]
						}
					]"
				>
					<a-radio value="2">通过</a-radio>
					<a-radio value="3">淘汰</a-radio>
				</a-radio-group>
			</a-form-item>

			<a-form-item
				label="评价"
				:colon="false"
				:label-col="{ span: 4 }"
				:wrapper-col="{ span: 20 }"
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
import { addInterviewReport } from '@/api/interviewer';
export default {
	name: 'AddReport',
	components: {
		[Modal.name]: Modal
	},
	props: {
		show: Boolean,
		id: Number,
		interviewId:Number
	},
	data() {
		return {
			form: this.$form.createForm(this, { name: 'report' })
		};
	},
	methods: {
		handleSubmit() {
			this.form.validateFields(async (err, values) => {
				if (!err) {
					try {
						this.form.submitting = true;
						const res = await addInterviewReport({
							id: this.id,
							interviewId: this.interviewId,
							status: values.result,
							comment: values.comment
						});
						this.form.submitting = false;
						if (res.status === 200) {
							if (res.data.code === 0) {
								this.$message.success('新增面试评价成功', 2);
								this.$emit('update:show', false);
								this.$emit('add-report-success');
							} else {
								this.$message.error(
									res.data.mesg
										? res.data.mesg
										: '新增面试评价失败',
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
