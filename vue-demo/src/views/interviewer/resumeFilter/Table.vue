<template>
	<a-table
		class="table zebra"
		:rowSelection="{
			selectedRowKeys: selectedRowKeys,
			onChange: handleSelectChange
		}"
		:columns="columns"
		:dataSource="data"
		:loading="isLoading"
		:pagination="pagination"
		rowKey="screenId"
		@change="handleTableChange"
	>
		<template
			v-slot:info="{
				resumeId,
				fullName,
				positionName,
				resumePhone,
				resumeMail
			}"
		>
			<!-- <a-popover
				title="候选人简介"
				placement="right"
				trigger="click"
				:getPopupContainer="triggerNode => triggerNode.parentNode"
				destroyTooltipOnHide
			>
				<template v-slot:content>
					<resume-detail :id="resumeId" />
				</template>
			</a-popover>-->
			<div class="info__container">
				<div>
					<p @click="handleDetailClick(resumeId)">
						<span class="info__name">{{ fullName }}</span>
						<!-- <span class="info__post">{{ positionName }}</span> -->
					</p>
					<p style="margin-bottom: 0">
						<span class="info__mobile">{{ resumePhone }}</span>
						<!-- <span class="info__divider">|</span> -->
					</p>
					<p>
						<span class="info__email">{{ resumeMail }}</span>
					</p>
				</div>
				<!-- <div>
						<a-tag>{{ getEducation(education) }}</a-tag>
						<a-tag>{{ getExperience(resumeExperience) }}</a-tag>
				</div>-->
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
			{{
			positionName ? positionName : '暂无'
			}}
		</template>
		<template v-slot:operatorName="operatorName">
			{{
			operatorName ? operatorName : '暂无'
			}}
		</template>
		<template v-slot:school="school">
			{{
			school ? school : '暂无'
			}}
		</template>
		<template v-slot:city="resumeWorkCity">
			{{
			resumeWorkCity ? resumeWorkCity : '暂无'
			}}
		</template>
		<template v-slot:status="{ status, statusDes,isRecommend }">
			<span class="status" :class="getStatusColorClass(status)">
				{{
				isRecommend == 2 ? '已退回' : statusDes
				}}
			</span>
		</template>
		<template v-slot:operator="modifiedUserName">
			<span>{{ modifiedUserName ? modifiedUserName : '-' }}</span>
		</template>
		<template v-slot:date="date">
			{{
			date ? moment(date).format('YYYY-MM-DD') : '-'
			}}
		</template>
		<template v-slot:action="{ resumeId }">
			<span class="action-button" @click="handleRemarkClick(resumeId)">HR评价</span>
		</template>
	</a-table>
</template>

<script>
import moment from "moment";
import { Popover } from "ant-design-vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import { getResumeRemark } from "@/api/interviewer";

export default {
	name: "Table",
	components: {
		[Popover.name]: Popover
	},
	props: {
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
		selectedRowKeys: {
			type: Array,
			required: true
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
					scopedSlots: { customRender: "positionName" }
				},
				{
					title: "学历",
					dataIndex: "education",
					width: 80,
					scopedSlots: { customRender: "education" }
				},
				{
					title: "工作年限",
					dataIndex: "resumeExperience",
					width: 100,
					scopedSlots: { customRender: "resumeExperience" }
				},
				{
					title: "学校",
					dataIndex: "school",
					scopedSlots: { customRender: "school" }
				},
				{
					title: "应聘城市",
					dataIndex: "resumeWorkCity",
					width: 110,
					scopedSlots: { customRender: "city" }
				},
				{
					title: "筛选状态",
					key: "status",
					width: 110,
					scopedSlots: { customRender: "status" }
				},
				{
					title: "推荐HR",
					dataIndex: "modifiedUserName",
					width: 80,
					scopedSlots: { customRender: "modifiedUserName" }
				},
				{
					title: "处理人",
					dataIndex: "operatorName",
					align: "center",
					width: 80,
					scopedSlots: { customRender: "operator" }
				},
				{
					title: "推荐时间",
					dataIndex: "createUserTime",
					align: "center",
					scopedSlots: { customRender: "date" }
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
		moment,
		handleSelectChange(selectedRowKeys, selectedList) {
			this.$emit("update:selectedRowKeys", selectedRowKeys);
			this.$emit("update:selectedList", selectedList);
		},
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
		getStatusColorClass(status) {
			switch (status) {
				case 10:
					return "yellow";
				case 20:
					return "green";
				case 21:
					return "red";
				default:
					return "";
			}
		},
		async handleRemarkClick(e) {
			try {
				const res = await getResumeRemark(e);
				if (res.data.code === 0) {
					const data = res.data.data;
					this.$info({
						title: "沟通备注",
						content: (
							<div>
								<p>HR评价：{data ? data : "暂无备注"}</p>
							</div>
						)
					});
				}
			} catch (error) {
				console.log(error);
			}
		},
		getStatusText(status) {
			switch (status) {
				case 0:
					return "待处理";
				case 20:
					return "通过";
				case 21:
					return "淘汰";
				default:
					return "";
			}
		}
	}
};
</script>

<style scoped>
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

/* .table >>> .ant-table-row {
	cursor: pointer;
} */

.action-button {
	cursor: pointer;
	color: #4480ee;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
