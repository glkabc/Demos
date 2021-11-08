<template>
	<div style="background-color: #fff; min-height: 100%; position: relative; padding-top: 70px">
		<a-form :form="form" class="form">
			<a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" label="原始密码">
				<a-input-password
					allow-clear
					v-decorator="[
						'original',
						{
							rules: [
								{
									required: true,
									message: '原始密码不能为空'
								},
							]
						}
					]"
					placeholder="请输入原始密码"
				/>
			</a-form-item>
			<a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" label="新密码">
				<a-input-password
					allow-clear
					v-decorator="[
						'changed',
						{
							rules: [
								{
									required: true,
									message: '新密码不能为空'
								},
								{
									validator: compareToOriginalPassword
								}
							]
						}
					]"
					placeholder="请输入新密码"
				/>
			</a-form-item>
			<a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" label="确认密码">
				<a-input-password
					allow-clear
					v-decorator="[
						'confirm',
						{
							rules: [
								{
									required: true,
									message: '确认密码不能为空'
								},
								{
									validator: compareToFirstPassword
								}
							]
						}
					]"
					placeholder="再次输入新密码"
				/>
			</a-form-item>
		</a-form>
		<section class="action-bar">
			<a-button type="primary" @click="handleSubmit" :loading="form.submitting">保存</a-button>
		</section>
	</div>
</template>

<script>
import { changePassword } from "@/api/userCenter";
export default {
	name: "ChangePassword",
	data() {
		return {
			form: this.$form.createForm(this, { name: "changePassword" })
		};
	},
	methods: {
		compareToOriginalPassword(rule, value, callback) {
			const form = this.form;
			if (value && value === form.getFieldValue("original")) {
				callback("新密码不能和原始密码一致");
			} else {
				callback();
			}
		},
		compareToFirstPassword(rule, value, callback) {
			const form = this.form;
			if (value && value !== form.getFieldValue("changed")) {
				callback("两次输入的密码不一致");
			} else {
				callback();
			}
		},
		handleSubmit() {
			this.form.validateFields(async (err, values) => {
				if (!err) {
					this.form.submitting = true;
					try {
						const res = await changePassword({
							oldPassword: values.original,
							newPassword: values.changed
						});
						this.form.submitting = false;
						if (res.status === 200) {
							if (res.data.code === 0) {
								this.$message.success("修改密码成功", 2);
								this.form.resetFields();
							} else {
								this.$message.error(
									res.data.mesg
										? res.data.mesg
										: "修改密码失败",
									2
								);
							}
						}
					} catch (error) {
						this.form.submitting = false;
					}
				}
			});
		}
	}
};
</script>

<style scoped>
.action-bar {
	position: absolute;
	bottom: -30px;
	left: 0;
	right: 0;
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	padding: 40px 0;
	/* box-shadow: 0px 9px 27px 1px rgba(0, 0, 0, 0.18); */

}

.form {
	width: 400px;
	margin: auto;
	height:260px;
}
</style>
