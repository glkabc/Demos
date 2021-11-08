<template>
	<a-table
		class="table zebra"
		:columns="columns"
		:dataSource="data"
		:loading="isLoading"
		:pagination="pagination"
		@change="handleTableChange"
	>
		<template v-slot:info="info">
			<!-- <a-popover
				title="候选人简介"
				placement="right"
				trigger="click"
				:getPopupContainer="triggerNode => triggerNode.parentNode"
				destroyTooltipOnHide
			>
				<template v-slot:content>
					<resume-detail :id="info.resumeId" />
				</template>
			</a-popover> -->
				<div class="info__container">
					<div>
						<p @click="handleDetailClick(info.resumeId)">
							<span class="info__name">{{ info.fullName }}</span>
							<!-- <span class="info__post">
								{{
								info.positionName
								}}
							</span> -->
						</p>
						<p style="margin-bottom: 0">
							<span class="info__mobile">
								{{
								info.resumePhone
								}}
							</span>
							<!-- <span class="info__divider">|</span> -->
						</p>
						<p>
							<span class="info__email">
								{{
								info.resumeMail
								}}
							</span>
						</p>
					</div>
					<!-- <div>
						<a-tag>{{ getEducation() }}</a-tag>
						<a-tag>
							{{
							getExperience(info.resumeExperience)
							}}
						</a-tag>
					</div> -->
				</div>
		</template>
		<template v-slot:education="education">
			{{
			getEducation(education)
			}}
		</template>
		<template v-slot:resumeExperience="resumeExperience">
			{{
			getExperience(resumeExperience)
			}}
		</template>
		<template v-slot:positionName="positionName">
			<span :title="positionName">
				{{
					positionName ? positionName : '暂无'
				}}
			</span>
		</template>
		<template v-slot:operatorName="operatorName">
			{{
			operatorName ? operatorName : '暂无'
			}}
		</template>
		<template v-slot:interviewType="type">
			<a-tag :color="getInterviewTypeTagColor(type)">{{ getInterviewTypeTagText(type) }}</a-tag>
		</template>
		<template v-slot:interviewResult="info">
			<span class="status" :class="getInterviewResultColorClass(info.status)">{{ info.statusDes }}</span>
		</template>
		<template v-slot:action="{ resumeId,talentId,status,interviewId }">
			<!-- <span class="action-button" @click="handleDetailClick(resumeId)">查看</span>
			<a-divider type="vertical" /> -->
			<span v-if="status === 30">
				<span class="action-button" @click.stop="handleAddReport(talentId,interviewId)">添加评价</span>
				<a-divider type="vertical" />
			</span>
			<span class="action-button" @click.stop="handleShowLog(talentId)">评价记录</span>
		</template>
	</a-table>
</template>

<script>
import moment from "moment";
import { Popover } from "ant-design-vue";
// import ResumeDetail from "@/views/interviewer/resumeFilter/table/ResumeDetail";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
export default {
	name: "Table",
	components: {
		[Popover.name]: Popover,
	},
	props: {
		showReportLog: Boolean,
		showAddReport: Boolean,
		pagination: {
			type: Object,
			required: true
		},
		isLoading: {
			type: Boolean,
			required: true
		},
		data: {
			type: Array,
			required: true
		},
		selectedTalent: {
			type: Number
		},
		interviewId: {
			type:Number
		}
	},
	data() {
		return {
			columns: [
				{
					title: "个人信息",
					key: "info",
					scopedSlots: { customRender: "info" }
				},
				{
					title: "应聘职位",
					dataIndex: "positionName",
					width: 150,
					scopedSlots: { customRender: "positionName" }
				},
				{
					title: "学历",
					width: 70,
					dataIndex: "education",
					scopedSlots: { customRender: "education" }
				},
				{
					title: "工作年限",
					width: 90,
					dataIndex: "resumeExperience",
					scopedSlots: { customRender: "resumeExperience" }
				},
				{
					title: "学校",
					dataIndex: "school",
					width: 100,
					ellipsis: true,
				},
				{
					title: "应聘城市",
					width: 90,
					ellipsis: true,
					dataIndex: "resumeWorkCity"
				},
				// {
				// 	title: "面试类型",
				// 	dataIndex: "interviewId",
				// 	scopedSlots: { customRender: "interviewType" }
				// },
				{
					title: "面试结果",
					key: "interviewResult",
					width: 100,
					scopedSlots: { customRender: "interviewResult" }
				},
				{
					title: "评价人",
					dataIndex: "operatorName",
					align: "center",
					width: 80,
					scopedSlots: { customRender: "appraiser" }
				},
				{
					title: "推荐HR",
					width: 90,
					dataIndex: "modifiedUserName",
					scopedSlots: { customRender: "modifiedUserName" }
				},
				{
					title: "面试时间",
					dataIndex: "interviewTime",
					width: 140,
					align: "center"
				},
				{
					title: "操作",
					key: "action",
					align: "center",
					scopedSlots: { customRender: "action" }
				}
			]
		};
	},
	computed: {
		...mapState({
			educations: state => state.educationRequires,
			experiences: state => state.jobExperiences
		}),
		hasSelected() {
			return this.selectedRowKeys.length > 0;
		}
	},
	methods: {
		handleTableChange({ current, pageSize }) {
			console.log({ current, pageSize });
			this.$emit("update:pagination", {
				...this.pagination,
				current,
				pageSize
			});
			this.$emit("pagination-change");
		},
		getEducation(value) {
			if (!value) {
				return "暂无";
			}
			const matched = this.educations.find(item => item.value === value);
			if (matched) {
				return matched.label;
			} else {
				return "暂无";
			}
		},
		getExperience(value) {
			if (!value) {
				return "暂无";
			}
			const matched = this.experiences.find(item => item.value === value);
			if (matched) {
				return matched.label;
			} else {
				return "暂无";
			}
		},
		handleDetailClick(id) {
			this.$router.push({
				name: "InterviewerDetail",
				query: { id, token: this.$route.query.token }
			});
		},
		handleShowLog(id) {
			this.$emit("update:selectedTalent", id);
			this.$emit("update:showReportLog", true);
		},
		handleAddReport(id,interviewId) {
			console.log(interviewId);
			this.$emit("update:selectedTalent", id);
			this.$emit("update:interviewId", interviewId);
			this.$emit("update:showAddReport", true);
		},
		getInterviewTypeTagColor(type) {
			switch (type) {
				case 0:
					return "blue";
				case 1:
					return "cyan";
				default:
					return "";
			}
		},
		getInterviewTypeTagText(type) {
			switch (type) {
				case 1:
					return "初试";
				case 2:
					return "复试";
				default:
					return "暂无";
			}
		},
		getInterviewResultColorClass(result) {
			switch (result) {
				case 30:
					return "yellow";
				case 40:
					return "green";
				case 41:
					return "red";
				default:
					return "";
			}
		}
	}
};
</script>

<style scoped>
.action-button {
	color: #1890ff;
	cursor: pointer;
}

.info__container {
	color: #8c909b;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
}

.info__name {
	color: #2c90f5;
	margin-right: 16px;
	font-size: 21px;
}

.info__post {
	color: #333;
	font-size: 19px;
}

.info__divider {
	padding: 0 16px;
}

.status {
	padding-left: 15px;
	position: relative;
}

.status::before {
	content: "";
	display: block;
	width: 8px;
	height: 8px;
	position: absolute;
	top: 50%;
	left: 0;
	border-radius: 50%;
	transform: translateY(-50%);
	background-color: #8c909b;
}

.status.yellow::before {
	background-color: #feaa19;
}

.status.green::before {
	background-color: #22b8cf;
}

.status.red::before {
	background-color: #fd5158;
}
</style>
