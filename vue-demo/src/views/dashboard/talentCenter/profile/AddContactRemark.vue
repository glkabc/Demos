<template>
	<a-modal
		title="沟通备注"
		:visible="show"
		@ok="handleSubmit"
		@cancel="handleCancel"
		:confirmLoading="isSubmitting"
		destroyOnClose
		centered
	>
		<a-form :form="form">
			<a-form-item
				label="在职状态"
				:colon="false"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-radio-group
					v-decorator="['hasJob',{initialValue: hasJob[0].value,}]"
					:options="hasJob"
				/>
			</a-form-item>
			<a-form-item
				label="可入职日期"
				:colon="false"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-date-picker
					format="YYYY-MM-DD"
					v-decorator="['availableDate']"
				/>
			</a-form-item>
			<a-form-item
				label="当前月薪"
				:colon="false"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					suffix="元"
					inputmode="numeric"
					v-decorator="['currentSalary']"
					pattern="[0-9]*"
				/>
			</a-form-item>
			<a-form-item
				label="期望月薪"
				:colon="false"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-input
					suffix="元"
					inputmode="numeric"
					pattern="[0-9]*"
					v-decorator="['expectedSalary']"
				/>
			</a-form-item>
			<a-form-item
				label="加入百得意愿"
				:colon="false"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-radio-group
					:options="isBaideEmployee"
					v-decorator="['isBaideEmployee',{initialValue:isBaideEmployee[1].value}]"
				/>
			</a-form-item>
			<a-form-item label="离职原因" :colon="false" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
				<a-textarea
					:rows="4"
					v-decorator="['leaveReason']"
				/>
			</a-form-item>
			<a-form-item
				label="HR初试综合评价"
				:colon="false"
				:label-col="{ span: 6 }"
				:wrapper-col="{ span: 18 }"
			>
				<a-textarea
					:rows="4"
					v-decorator="['HRComment']"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script>
import { Modal } from "ant-design-vue";
import { addContactRemark } from "@/api/talentCenter";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import {Trim} from "../../../../trim/trim"
export default {
	name: "AddContactRemark",
	components: {
		[Modal.name]: Modal
	},
	props: ['show','id','getCandidateList'],
	data() {
		return {
			form: this.$form.createForm(this, { name: "addBlackList" }),
			isSubmitting: false,
			
		};
	},
	computed: {
		...mapState({
			hasJob: state => state.hasJob,
			isBaideEmployee: state => state.isBaideEmployee
		})
	},
	methods: {
		handleSubmit() {
			this.form.validateFields(async (err, values) => {
				console.log(values);
				if(values.currentSalary != undefined){
					values.currentSalary = Trim(values.currentSalary);
				};
				if(values.leaveReason != undefined){
					values.leaveReason = Trim(values.leaveReason);
				};
				if(values.expectedSalary != undefined){
					values.expectedSalary = Trim(values.expectedSalary);
				};
				if(values.HRComment != undefined){
					values.HRComment = Trim(values.HRComment);
				}
				if (!err) {
					try {
						this.isSubmitting = true;
						const {
							hasJob,
							availableDate,
							currentSalary,
							expectedSalary,
							isBaideEmployee,
							leaveReason,
							HRComment
						} = values;
						
						if(hasJob ==undefined){
							hasJob = this.hasJob[0].value
						}
						const res = await addContactRemark({
							id: this.id,
							hasJob,
							availableDate,
							currentSalary,
							expectedSalary,
							isBaideEmployee,
							leaveReason,
							HRComment
						});
						this.isSubmitting = false;
						if (res.status === 200) {
							if (res.data.code === 0) {
								this.$message.success("添加沟通备注成功", 2);
								this.$emit("update:show", false);
								this.$emit('getCandidateList')
							} else {
								this.$message.error(
									res.data.mesg
										? res.data.mesg
										: "添加沟通备注失败",
									2
								);
							}
						}
					} catch (error) {
						this.isSubmitting = false;
					}
				}
			});
		},
		handleCancel() {
			this.$emit("update:show", false);
		}
	}
};
</script>

<style scoped></style>
