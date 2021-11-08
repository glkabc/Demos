<script>
import moment from "moment";
import { deleteTemplate, updateTemplateStatus } from "../../../../api/settings";
import { Table, Input, Tag, Divider } from "ant-design-vue";
import Classes from "./TemplateDisplayTable.module.css";

const columns = [
	{
		title: "模块名称",
		dataIndex: "templateName"
	},
	{
		title: "模块标题",
		dataIndex: "templateTitle"
	},
	{
		title: "添加时间",
		dataIndex: "createUserTime",
		scopedSlots: { customRender: "createdAt" }
	},
	{
		title: "是否启用",
		dataIndex: "templateState",
		scopedSlots: { customRender: "isActivated" }
	},
	{
		title: "是否默认",
		dataIndex: "isDefault",
		scopedSlots: { customRender: "isDefault" }
	},
	{
		title: "操作",
		key: "action",
		width: 140,
		scopedSlots: { customRender: "action" }
	}
];
export default {
	name: "TemplateDisplayTable",
	props: ["pagination", "data", "isLoading"],
	methods: {
		async enableTemplate({ id, type, isDefault }) {
			try {
				const response = await updateTemplateStatus({
					id,
					type,
					isDefault,
					status: 1
				});
				if (response.status === 200) {
					if (response.data.code === 0) {
						this.$message.success("启用模板成功", 2);
						this.$emit("refresh");
					} else {
						this.$message.error(
							response.data.mesg || "启用模板失败",
							2
						);
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		async disableTemplate({ id, type, isDefault }) {
			try {
				const response = await updateTemplateStatus({
					id,
					type,
					isDefault,
					status: 0
				});
				if (response.status === 200) {
					if (response.data.code === 0) {
						this.$message.success("停用模板成功", 2);
						this.$emit("refresh");
					} else {
						this.$message.error(
							response.data.mesg || "停用模板失败",
							2
						);
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		handleTableChange({ current, pageSize }) {
			this.$emit("tablePaginationChange", { current, pageSize });
		}
	},
	render() {
		const tableScopedSlots = {
			createdAt: createdAt => {
				if (createdAt) {
					return moment(createdAt).format("YYYY-MM-DD");
				} else {
					return "暂无";
				}
			},
			isActivated: isActivated => {
				if (isActivated === 1) {
					return <Tag color="green">启用</Tag>;
				} else {
					return <Tag color="orange">未启用</Tag>;
				}
			},
			isDefault: isDefault => {
				if (isDefault === 1) {
					return <Tag color="green">是</Tag>;
				} else {
					return <Tag color="orange">否</Tag>;
				}
			},
			action: ({
				templateState,
				templateId,
				templateType,
				isDefault
			}) => {
				const text = templateState === 0 ? "启用" : "停用";
				return [
					<span
						class={Classes.button}
						style={{
							color: templateState === 0 ? "#52c41a" : "#fa8c16"
						}}
						onClick={() => {
							this.$confirm({
								title: `确认要${text}该模板吗?`,
								centered: true,
								onOk: async () => {
									if (templateState === 0) {
										await this.enableTemplate({
											id: templateId,
											type: templateType,
											isDefault
										});
									} else if (templateState === 1) {
										await this.disableTemplate({
											id: templateId,
											type: templateType,
											isDefault
										});
									}
								}
							});
						}}
					>
						{text}
					</span>,
					<Divider type="vertical" />,
					<span
						class={Classes.button}
						onClick={() => {
							this.$router.push({
								path: `${this.$route.path}/edit-template`,
								query: { id: templateId }
							});
						}}
					>
						编辑
					</span>,
					<Divider type="vertical" />,
					<span
						class={Classes.button}
						style="color: #f5222d;"
						onClick={() => {
							this.$confirm({
								title: "确认要删除该模板吗?",
								centered: true,
								onOk: async () => {
									try {
										const response = await deleteTemplate(
											templateId
										);
										if (response.status === 200) {
											if (response.data.code === 0) {
												this.$message.success(
													"删除模板成功",
													2
												);
												this.$emit("refresh");
											} else {
												this.$message.error(
													response.data.mesg ||
														"删除模板失败",
													2
												);
											}
										}
									} catch (error) {
										console.log(error);
									}
								}
							});
						}}
					>
						删除
					</span>
				];
			}
		};
		return (
			<Table
				dataSource={this.data}
				columns={columns}
				pagination={this.pagination}
				loading={this.isLoading}
				scopedSlots={tableScopedSlots}
				rowKey="templateId"
				bordered
				onChange={this.handleTableChange}
			/>
		);
	}
};
</script>

<style scoped></style>
