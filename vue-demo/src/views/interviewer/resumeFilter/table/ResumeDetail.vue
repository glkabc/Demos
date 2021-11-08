<template>
	<div class="detail-container">
		<template v-if="status === 'idle' || status === 'rejected'">
			<a-empty style="width: 542px" />
		</template>
		<template v-if="status === 'pendding'">
			<a-skeleton
				active
				:title="false"
				:paragraph="{ rows: 6, width: [542, 542, 542, 542, 542, 542] }"
			/>
		</template>
		<template v-if="status === 'resolved'">
			<table class="table">
				<tr>
					<td>姓名</td>
					<td>{{ data.fullName ? data.fullName : '暂无' }}</td>
					<td>性别</td>
					<td>{{ data.resumeSex ? getGender(data.resumeSex) : '暂无' }}</td>
				</tr>
				<tr>
					<td>婚姻观状况</td>
					<td>{{ data.resumeMaritalStatus ? getMarital(data.resumeMaritalStatus) : '暂无' }}</td>
					<td>工作年限</td>
					<td>{{ data.resumeExperience ? getExperience(data.resumeExperience) : '暂无' }}</td>
				</tr>
				<tr>
					<td>期望工作地</td>
					<td>{{ data.resumeWorkCity ? data.resumeWorkCity : '暂无' }}</td>
					<td>户籍</td>
					<td>{{ data.resumeNative ? data.resumeNative : '暂无' }}</td>
				</tr>
				<tr>
					<td>现居住地</td>
					<td>{{ data.resumeAddress ? data.resumeAddress : '暂无' }}</td>
					<td>期望薪资</td>
					<td>{{ data.resumeSalary ? data.resumeSalary : '暂无' }}</td>
				</tr>
				<tr>
					<td>工作性质</td>
					<td>{{ data.resumeJobType ? data.resumeJobType : '暂无' }}</td>
					<td>学历</td>
					<td>{{ data.education ? data.education : '暂无' }}</td>
				</tr>
				<tr>
					<td>目前状态</td>
					<td>{{ data.workStatus ? data.workStatus : '暂无 ' }}</td>
					<td>邮箱</td>
					<td>{{ data.resumeMail ? data.resumeMail : '暂无' }}</td>
				</tr>
				<tr>
					<td>简历来源</td>
					<td>{{ data.resumeResource ? data.resumeResource : '暂无' }}</td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</template>
	</div>
</template>

<script>
import { getResumeSummary } from "@/api/interviewer";
import { Skeleton } from "ant-design-vue";
import { createNamespacedHelpers } from "vuex";
const { mapState: mapStatusState } = createNamespacedHelpers("status");
export default {
	name: "ResumeDetail",
	components: {
		[Skeleton.name]: Skeleton
	},
	props: {
		id: Number
	},
	data() {
		return {
			data: null,
			status: "idle"
		};
	},
	computed: {
		...mapStatusState({
			genders: state => state.genders,
			marriageStatus: state => state.marriageStatus,
			jobExperiences: state => state.jobExperiences
		})
	},
	methods: {
		async fetchResumeSummary() {
			try {
				this.status = "pendding";
				const res = await getResumeSummary(this.id);
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.data = res.data.data ? res.data.data : {};
						this.status = "resolved";
					} else {
						this.status = "rejected";
					}
				}
			} catch (error) {
				this.status = "rejected";
			}
		},
		getGender(gender) {
			if (!gender) {
				return "暂无";
			} else {
				const matched = this.genders.find(
					item => item.value === gender
				);
				if (matched) {
					return matched.label;
				} else {
					return "暂无";
				}
			}
		},
		getMarital(maritalStatus) {
			if (!maritalStatus) {
				return "暂无";
			} else {
				const matched = this.marriageStatus.find(
					item => item.value === maritalStatus
				);
				if (matched) {
					return matched.label;
				} else {
					return "暂无";
				}
			}
		},
		getExperience(experience) {
			if (!experience) {
				return "暂无";
			} else {
				const matched = this.jobExperiences.find(
					item => item.value === experience
				);
				if (matched) {
					return matched.label;
				} else {
					return "暂无";
				}
			}
		}
	},
	created() {
		this.fetchResumeSummary();
	}
};
</script>

<style scoped>
.detail-container {
	padding: 20px;
}

.table {
	border-collapse: collapse;
	border: solid 1px #e2e2e2;
	font-size: 14px;
}

.table td {
	padding: 8px;
}

.table td:nth-child(1),
.table td:nth-child(3) {
	color: #78909c;
	background-color: #f5f8fb;
}

.table td:nth-child(2),
.table td:nth-child(4) {
	min-width: 200px;
}
</style>
