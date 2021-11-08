<template>
	<div class="resume__container">
		<p style="color: #999">最后更新 {{ info.lastUpdatedDate }}</p>
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
											message: '姓名不能为空!'
										}
									]
								}
							]"
							placeholder="输入姓名"
						/>
					</a-form-item>
				</a-col>
				<a-col :md="12" :lg="12" :xl="12" class="third quarter">
					<a-form-item label="姓别" required>
						<a-radio-group v-decorator="['gender']">
							<a-radio value="1">
								男
							</a-radio>
							<a-radio value="2">
								女
							</a-radio>
							<a-radio value="0">
								保密
							</a-radio>
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
											message: '手机不能为空!'
										}
									]
								}
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
											message: '邮箱不能为空!'
										}
									]
								}
							]"
							placeholder="输入邮箱"
						/>
					</a-form-item>
				</a-col>
				<a-col :md="12" :lg="12" :xl="12" class="third quarter">
					<a-form-item label="最高学历">
						<a-select
							v-decorator="[
								'degree',
								{
									rules: []
								}
							]"
							placeholder="请选择最高学历"
						>
							<a-select-option value="1">
								大专
							</a-select-option>
							<a-select-option value="2">
								本科
							</a-select-option>
							<a-select-option value="3">
								研究生
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :md="12" :lg="12" :xl="12" class="third quarter">
					<a-form-item label="所学专业">
						<a-input
							v-decorator="[
								'major',
								{
									rules: []
								}
							]"
							placeholder="输入所学专业"
						/>
					</a-form-item>
				</a-col>
				<a-col :md="12" :lg="12" :xl="12" class="third quarter">
					<a-form-item label="出生年月">
						<a-date-picker
							v-decorator="['birthday']"
							style="width: 100%"
						/>
					</a-form-item>
				</a-col>
				<a-col :md="12" :lg="12" :xl="12" class="third quarter">
					<a-form-item label="婚姻状态" required>
						<a-radio-group v-decorator="['marriage']">
							<a-radio value="1">
								已婚
							</a-radio>
							<a-radio value="2">
								未婚
							</a-radio>
							<a-radio value="0">
								保密
							</a-radio>
						</a-radio-group>
					</a-form-item>
				</a-col>
				<a-col :md="12" :lg="12" :xl="12" class="third quarter">
					<a-form-item label="工作经验">
						<a-select
							v-decorator="[
								'exp',
								{
									rules: []
								}
							]"
							placeholder="请选择工作经验"
						>
							<a-select-option value="1">
								一年以下
							</a-select-option>
							<a-select-option value="2">
								1-2年
							</a-select-option>
							<a-select-option value="3">
								2-3年
							</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :md="12" :lg="12" :xl="12" class="third quarter">
					<a-form-item label="身高">
						<a-input
							v-decorator="[
								'height',
								{
									rules: []
								}
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
								'originalPlace',
								{
									rules: []
								}
							]"
							placeholder="输入籍贯"
						/>
					</a-form-item>
				</a-col>
				<a-col :md="12" :lg="12" :xl="12" class="third quarter">
					<a-form-item label="现居住地">
						<a-input
							v-decorator="[
								'currentResidence',
								{
									rules: []
								}
							]"
							placeholder="输入现居住地"
						/>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="24" :style="{ textAlign: 'right' }">
					<a-button>
						取消
					</a-button>
					<a-button
						html-type="submit"
						:style="{ marginLeft: '8px' }"
						class="submit-button"
					>
						保存
					</a-button>
				</a-col>
			</a-row>
		</a-form>
		<resume-info :info="info" class="placeholder" />
	</div>
</template>

<script>
import resumeInfo from '../components/ResumeInfo.vue';
export default {
	name: 'ResumeModify',
	data() {
		return {
			form: this.$form.createForm(this, { name: 'editResume' })
		};
	},
	components: {
		resumeInfo
	},
	props: {
		info: Object
	},
	methods: {}
};
</script>

<style scoped>
.resume__container {
	background-color: #fff;
	padding: 32px;
	border: solid 1px #dadfe4;
	min-width: 600px;
	position: relative;
}

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
}

.ant-advanced-search-form >>> .ant-form-item-label {
	min-width: 72px;
}

.ant-advanced-search-form >>> .ant-form-item-control-wrapper {
	flex: 1;
}

.placeholder {
	margin-top: 400px;
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
	.placeholder {
		margin-top: 300px;
	}
}

@media screen and (min-width: 1855px) {
	.quarter {
		width: 25%;
	}
	.placeholder {
		margin-top: 260px;
	}
}
</style>
