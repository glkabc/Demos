<template>
	<a-form class="ant-advanced-search-form" :form="form">
		<a-row :gutter="24">
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="姓名" required>
					<a-input
						v-decorator="[
							'name',
							{
								rules: [
									{
										required: true,
										whitespace: true,
										message: '姓名不能为空!',
									},
								],
								initialValue: baseInfo.name
									? baseInfo.name
									: '',
							},
						]"
						placeholder="输入姓名"
					/>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="姓别" required>
					<a-radio-group
						v-decorator="[
							'gender',
							{
								rules: [
									{
										required: true,
										message: '请选择性别',
									},
								],
								initialValue: baseInfo.gender
									? baseInfo.gender
									: 0,
							},
						]"
					>
						<a-radio
							v-for="gender of genders"
							:key="gender.value"
							:value="gender.value"
							>{{ gender.label }}</a-radio
						>
					</a-radio-group>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="手机" required>
					<a-input
						v-decorator="[
							'mobile',
							{
								rules: [
									{
										required: true,
										message: '手机不能为空!',
									},
								],
								initialValue: baseInfo.mobile
									? baseInfo.mobile
									: '',
							},
						]"
						placeholder="输入手机"
					/>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="邮箱" required>
					<a-input
						v-decorator="[
							'email',
							{
								rules: [
									{
										required: true,
										message: '请输入邮箱!',
									},
									{
										type: 'email',
										message: '请输入正确的邮箱!',
									},
								],
								initialValue: baseInfo.email
									? baseInfo.email
									: '',
							},
						]"
						placeholder="输入邮箱"
					/>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="最高学历">
					<a-select
						v-decorator="[
							'education',
							{
								rules: [],
								initialValue: baseInfo.education
									? baseInfo.education
									: '',
							},
						]"
						placeholder="请选择最高学历"
						:getPopupContainer="
							(triggerNode) => triggerNode.parentNode
						"
					>
						<a-select-option
							v-for="education of educations"
							:key="education.value"
							:value="education.value"
							>{{ education.label }}</a-select-option
						>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="所学专业">
					<a-cascader
						:options="majorTypes"
						expandTrigger="hover"
						:displayRender="displayRender"
						:getPopupContainer="
							(triggerNode) => triggerNode.parentNode
						"
						v-decorator="[
							'major',
							{
								rules: [],
								initialValue: getMajorValueArrayByChild(
									baseInfo.major
								),
							},
						]"
						placeholder="输入所学专业"
					/>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="出生年月">
					<a-date-picker
						v-decorator="[
							'birthday',
							{
								initialValue: baseInfo.birthDay
									? moment(baseInfo.birthDay)
									: null,
							},
						]"
						style="width: 100%"
					/>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="婚姻状态">
					<a-radio-group
						v-decorator="[
							'marriage',
							{
								initialValue: baseInfo.marriage
									
							},
						]"
					>
						<a-radio
							v-for="status of marriageStatus"
							:key="status.value"
							:value="status.value"
							>{{ status.label }}</a-radio
						>
					</a-radio-group>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="工作经验">
					<a-select
						v-decorator="[
							'experience',
							{
								rules: [],
								initialValue: baseInfo.experience
									? baseInfo.experience
									: '',
							},
						]"
						placeholder="请选择工作经验"
					>
						<a-select-option
							v-for="experience of experiences"
							:key="experience.value"
							:value="experience.value"
							>{{ experience.label }}</a-select-option
						>
					</a-select>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="身高">
					<a-input
						v-decorator="[
							'height',
							{
								rules: [],
								initialValue: baseInfo.height
									? baseInfo.height
									: '',
							},
						]"
						placeholder="输入身高"
					>
						<template #suffix>
							<span>cm</span>
						</template>
					</a-input>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="籍贯">
					<a-input
						v-decorator="[
							'birthPlace',
							{
								rules: [],
								initialValue: baseInfo.birthPlace
									? baseInfo.birthPlace
									: '',
							},
						]"
						placeholder="输入籍贯"
					/>
				</a-form-item>
			</a-col>
			<a-col :md="12" :lg="12" :xl="12" class="third quarter">
				<a-form-item label="现居住地">
					<a-input
						v-decorator="[
							'currentPlace',
							{
								rules: [],
								initialValue: baseInfo.currentPlace
									? baseInfo.currentPlace
									: '',
							},
						]"
						placeholder="输入现居住地"
					/>
				</a-form-item>
			</a-col>
		</a-row>
		<a-row>
			<a-col :span="24" :style="{ textAlign: 'right' }">
				<a-button @click="handleCancel" :disabled="form.submitting"
					>取消</a-button
				>
				<a-button
					html-type="submit"
					:style="{ marginLeft: '8px' }"
					:loading="form.submitting"
					class="submit-button"
					@click="handleCommit"
					>保存</a-button
				>
			</a-col>
		</a-row>
	</a-form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { updateResumeBasicInfo } from '@/api/talentCenter';
const { mapState, mapGetters } = createNamespacedHelpers('status');
import moment from 'moment';
export default {
	name: 'EditForm',
	props: {
		baseInfo: Object,
	},
	data() {
		return {
			form: this.$form.createForm(this, { name: 'editResume' }),
		};
	},
	computed: {
		...mapState({
			educations: (state) => state.educationRequires,
			experiences: (state) => state.jobExperiences,
			genders: (state) => state.genders,
			marriageStatus: (state) => state.marriageStatus,
			majorTypes: (state) => state.majorTypes,
		}),
		...mapGetters(['getMajorValueArrayByChild']),
	},
	beforeRouteLeave(to, from, next) {
		next();
	},
	methods: {
		moment,
		displayRender({ labels }) {
			return labels[labels.length - 1];
		},
		handleCancel() {
			this.$emit('disable-editable');
		},
		handleCommit() {
			this.form.validateFields(async (err, values) => {
				console.log(values, values.major.pop(),'major')
				if (!err) {
					try {
						this.form.submitting = true;
						const res = await updateResumeBasicInfo({
							id: this.baseInfo.id,
							name: values.name,
							gender: values.gender,
							mobile: values.mobile,
							email: values.email,
							education: values.education,
							major: values.major.pop()||'',
							birthday: values.birthday
								? values.birthday.format('YYYY-MM-DD')
								: values.birthday,
							marriage: values.marriage,
							experience: values.experience,
							height: values.height,
							birthPlace: values.birthPlace,
							currentPlace: values.currentPlace,
						});
						this.form.submitting = false;
						if (res.status === 200) {
							if (res.data.code === 0) {
								this.$message.success('修改成功', 2);
								 this.$emit('refresh-resume');
								 this.$emit('disable-editable');
							} else {
								this.$message.error(
									res.data.mesg ? res.data.mesg : '修改失败',
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
	},
};
</script>

<style scoped>
.ant-advanced-search-form {
	padding: 24px;
	background: #fbfbfb;
	position: absolute;
	left: 0;
	right: 0;
}

.ant-advanced-search-form >>> .ant-form-item {
	display: flex;
	margin-bottom: 8px;
	margin-bottom: 16px;
}

.ant-advanced-search-form >>> .ant-form-item-label {
	min-width: 72px;
}

.ant-advanced-search-form >>> .ant-form-item-control-wrapper {
	flex: 1;
}

.ant-advanced-search-form >>> .ant-form-item-control-wrapper .ant-form-explain {
	position: absolute;
}

.submit-button {
	color: #fff;
	background-color: #22b8cf;
	border-color: #22b8cf;
}

.submit-button:hover {
	color: #fff;
	background-color: #4ec6d8;
	border-color: #4ec6d8;
}

.submit-button:focus {
	color: #fff;
	background-color: #4ec6d8;
	border-color: #4ec6d8;
}

@media screen and (min-width: 1540px) {
	.third {
		width: 33.33333333%;
	}
}

@media screen and (min-width: 1855px) {
	.quarter {
		width: 25%;
	}
}
</style>
