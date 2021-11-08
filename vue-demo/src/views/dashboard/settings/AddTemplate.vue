<script>
import {
	Form,
	Select,
	Button,
	Input,
	Radio,
	Col,
	Row,
	Tag
} from "ant-design-vue";
import { addTemplate } from "../../../api/settings";
import Class from "./addTemplate/style.module.css";
export default Form.create({ name: "template" })({
	name: "AddTemplate",
	data() {
		return {
			status: "idle"
		};
	},
	computed: {
		isCreating() {
			return this.status === "pending";
		},
		isDisabled() {
			return this.status === "resolved";
		}
	},
	methods: {
		handleSubmit() {
			this.form.validateFields(async (err, values) => {
				if (!err && this.editor) {
					const conent = this.editor.root.innerHTML;
					try {
						const response = await addTemplate({
							type: values.type,
							name: values.name,
							title: values.title,
							isDefault: values.isDefault,
							content: conent
						});
						if (response.status === 200) {
							if (response.data.code === 0) {
								this.status = "resolved";
								this.editor.disable();
								this.$router.replace({
									name: "TemplateSettings"
								});
								this.$message.success("新增模板成功", 2);
							} else {
								this.status = "rejected";
								this.$message.error(
									res.data.mesg || "新增模板失败",
									2
								);
							}
						} else {
							this.status = "rejected";
						}
					} catch (error) {
						this.status = "rejected";
					}
				}
			});
		},
		insertText(text) {
			if (this.editor) {
				const currentLocation = this.editor.getSelection(true);
				this.editor.insertText(currentLocation, text, "bold", "api");
				this.editor.format("bold", false);
			}
		}
	},
	mounted() {
		var toolbarOptions = [
			["bold", "italic", "underline", "strike"], // toggled buttons
			["blockquote", "code-block"],

			// [{ header: 1 }, { header: 2 }], // custom button values
			[{ list: "ordered" }, { list: "bullet" }],
			[{ script: "sub" }, { script: "super" }], // superscript/subscript
			[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
			[{ direction: "rtl" }], // text direction

			[{ size: ["small", false, "large", "huge"] }], // custom dropdown
			[{ header: [1, 2, 3, 4, 5, 6, false] }],

			[{ color: [] }, { background: [] }], // dropdown with defaults from theme
			[{ font: [] }],
			[{ align: [] }],

			["clean"] // remove formatting button
		];
		this.editor = new Quill(this.$refs.editorContainer, {
			placeholder: "输入模板",
			theme: "snow",
			modules: {
				toolbar: toolbarOptions
			}
		});
	},
	render() {
		return (
			<div style="padding: 20px; background-color: #fff; min-height: 100%">
				<h1 class={Class.pageTitle}>新建模板</h1>
				<Form colon={false}>
					<Form.Item
						label="模板类型"
						label-col={{ span: 2 }}
						wrapper-col={{ span: 5 }}
						required
					>
						{this.form.getFieldDecorator("type", {
							rules: [
								{
									required: true,
									message: "模板类型不能为空",
									type: "number"
								}
							]
						})(
							<Select
								size="large"
								class="type-select"
								placeholder="请选择模板类型"
								disabled={this.isDisabled}
							>
								<Select.Option value={1}>
									录用通知模板
								</Select.Option>
								<Select.Option value={2}>
									面试邀约模板
								</Select.Option>
								<Select.Option value={3}>
									简历推荐模板
								</Select.Option>
								<Select.Option value={4}>
									面试通知模板
								</Select.Option>
								<Select.Option value={5}>
									干系人提醒模板
								</Select.Option>
							</Select>
						)}
					</Form.Item>
					<Form.Item
						label="模板名称"
						label-col={{ span: 2 }}
						wrapper-col={{ span: 8 }}
						required
					>
						{this.form.getFieldDecorator("name", {
							rules: [
								{
									required: true,
									message: "模板名称不能为空",
									whitespace: true
								}
							]
						})(
							<Input
								placeholder="请输入模板名称"
								size="large"
								disabled={this.isDisabled}
							/>
						)}
					</Form.Item>
					<Form.Item
						label="模板标题"
						label-col={{ span: 2 }}
						wrapper-col={{ span: 8 }}
						required
					>
						{this.form.getFieldDecorator("title", {
							rules: [
								{
									required: true,
									message: "模板名称不能为空",
									whitespace: true
								}
							]
						})(
							<Input
								placeholder="请输入模板名称"
								size="large"
								disabled={this.isDisabled}
							/>
						)}
					</Form.Item>
					<Form.Item
						label="设为默认"
						label-col={{ span: 2 }}
						wrapper-col={{ span: 8 }}
						required
					>
						{this.form.getFieldDecorator("isDefault", {
							rules: [
								{
									required: true,
									message: "是否设为默认不能为空",
									whitespace: true,
									type: "number"
								}
							]
						})(
							<Radio.Group disabled={this.isDisabled}>
								<Radio value={1}>是</Radio>
								<Radio value={0}>否</Radio>
							</Radio.Group>
						)}
					</Form.Item>
				</Form>
				<Row>
					<Col span={2} class={Class.labelCol}>
						<label class={Class.label}>模板内容</label>
					</Col>
					<Col span={22}>
						<div>
							<div class={Class.insertBarContainer}>
								<Tag
									color="blue"
									onClick={() => this.insertText("[用户名]")}
								>
									[用户名]
								</Tag>
								<Tag
									color="blue"
									onClick={() => this.insertText("[部门]")}
								>
									[部门]
								</Tag>
								<Tag
									color="blue"
									onClick={() => this.insertText("[职位]")}
								>
									[职位]
								</Tag>
								<Tag
									color="blue"
									onClick={() =>
										this.insertText("[入职时间]")
									}
								>
									[入职时间]
								</Tag>
								<Tag
									color="blue"
									onClick={() =>
										this.insertText("[入职链接]")
									}
								>
									[入职链接]
								</Tag>
							</div>
							<div
								ref="editorContainer"
								class={Class.editorContainer}
							/>
						</div>
					</Col>
				</Row>
				<Button
					class={Class.createButton}
					type="primary"
					size="large"
					onClick={this.handleSubmit}
					loading={this.isLoading}
					disabled={this.isDisabled}
				>
					新建
				</Button>
			</div>
		);
	}
});
</script>
