<script>
import { Modal, Table } from "ant-design-vue";
import moment from "moment";
import { getInterviewInfo } from "../../../../../api/candidate";
const columns = [
	{
		title: "面试轮次",
		dataIndex: "interviewRound",
		scopedSlots: { customRender: "interviewRound" }
	},
	{
		title: "面试方式",
		dataIndex: "interviewName",
		scopedSlots: { customRender: "interviewType" }
	},
	{
		title: "面试地点",
		dataIndex: "interviewAddr",
		scopedSlots: { customRender: "interviewAddress" }
	},
	{
		title: "是否通过",
		dataIndex: "statusDes",
		scopedSlots: { customRender: "interviewDescription" }
	},
	{
		title: "面试官",
		dataIndex: "interviewer",
		scopedSlots: { customRender: "interviewer" }
	},
	{
		title: "面试日期",
		dataIndex: "interviewTime",
		scopedSlots: { customRender: "interviewTime" }
	},
	{
		title: "面试评价",
		dataIndex: "interviewComment",
		width: 400,
		scopedSlots: { customRender: "interviewComment" }
	}
];
export default {
	name: "InterviewInfoModal",
	props: ["show", "id"],
	data() {
		return {
			data: [],
			status: "idle"
		};
	},
	computed: {
		isLoading() {
			return this.status === "pending";
		}
	},
	methods: {
		handleClose() {
			this.$emit("update:show", false);
		},
		async fetchData() {
			try {
				this.status = "pending";
				const res = await getInterviewInfo({ talentId: this.id });
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.status = "resolved";
						this.data = res.data.data.interviewList;
					} else {
						this.status = "rejected";
						this.$message.error(res.data.mesg || "数据加载错误", 2);
					}
				} else {
					this.status = "rejected";
					this.$message.error(res.data.mesg || "数据加载错误", 2);
				}
			} catch (error) {
				this.status = "rejected";
				this.$message.error(res.data.mesg || "数据加载错误", 2);
			}
		}
	},
	watch: {
		id: {
			handler: function(value, oldValue) {
				if (value !== oldValue) {
					this.fetchData();
				}
			},
			immediate: true
		}
	},
	render() {
		const TableScopedSlot = {
			interviewType: interviewType => interviewType || "暂无",
			interviewRound: interviewRound => interviewRound || "暂无",
			interviewAddress: interviewAddress => interviewAddress || "暂无",
			interviewDescription: interviewDescription =>
				interviewDescription || "暂无",
			interviewTime: interviewTime =>
				interviewTime
					? moment(interviewTime).format("YYYY-MM-DD")
					: "暂无",
			interviewComment: interviewComment => interviewComment || "暂无",
			interviewer: interviewers => {
				if (!interviewers) {
					return "暂无";
				} else if (Array.isArray(interviewers)) {
					if (interviewers.length === 0) {
						return "暂无";
					} else {
						return interviewers.reduce((acc, cur, idx) => {
							return `${acc}${idx === 0 ? "" : " ,"}${
								cur.interviewerName
							}`;
						}, "");
					}
				} else {
					return "暂无";
				}
			}
		};
		return (
			<Modal
				centered
				visible={this.show}
				title="面试过程"
				footer={null}
				onCancel={this.handleClose}
				width={1000}
			>
				<Table
					class="zebra table"
					loading={this.isLoading}
					columns={columns}
					dataSource={this.data}
					pagination={false}
					scopedSlots={TableScopedSlot}
					rowKey="interviewId"
				/>
			</Modal>
		);
	}
};
</script>

<style scoped>
/* .table >>> td {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
} */
</style>