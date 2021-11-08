<template>
	<div class="container">
		<a-tabs defaultActiveKey="1" class="tabs" :animated="false">
			<template v-slot:tabBarExtraContent>
				<a-button v-if="info" @click="handleDownload">下载简历</a-button>
			</template>
			<a-tab-pane tab="简历原件" key="1">
				<online-view
					v-if="info"
					:url="`${info.resume.resumeSrc}?token=${token}`"
					:type="info.resume.resumeType"
				/>
			</a-tab-pane>
			<a-tab-pane tab="简历" key="2">
				<detail-view v-if="info" :resumeInfo="resumeInfo" />
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
import { Tabs, Skeleton } from "ant-design-vue";
import OnlineView from "./resumeDetail/OnlineView";
import DetailView from "./resumeDetail/DetailView";
import { getResumeById, downloadResume } from "@/api/interviewer";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("interviewerAuth");
const {
	mapState: mapStatusState,
	mapGetters: mapStatusGetters
} = createNamespacedHelpers("status");
export default {
	name: "ResumeDetail",
	components: {
		[Tabs.name]: Tabs,
		[Tabs.TabPane.name]: Tabs.TabPane,
		[Skeleton.name]: Skeleton,
		OnlineView,
		DetailView
	},
	data() {
		return {
			isLoading: false,
			info: null
		};
	},
	computed: {
		...mapState({
			token: state => state.token
		}),
		...mapStatusGetters(["getMajorTitle"]),
		...mapStatusState({
			educations: state => state.educationRequires,
			experiences: state => state.jobExperiences,
			majorTypes: state => state.majorTypes
		}),
		lastEditDate() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.modifiedUserTime) {
				return "暂无";
			} else {
				return this.$moment(this.info.resume.modifiedUserTime).format(
					"YYYY-MM-DD HH:MM"
				);
			}
		},
		name() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.fullName) {
				return "暂无";
			} else {
				return this.info.resume.fullName;
			}
		},
		age() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.resumeBirthDate) {
				return "暂无";
			} else {
				return this.$moment().diff(
					this.info.resume.resumeBirthDate,
					"years"
				);
			}
		},
		major() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.resumeMajor) {
				return "暂无";
			} else {
				return this.getMajorTitle(this.info.resume.resumeMajor);
			}
		},
		address() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.resumeAddress) {
				return "暂无";
			} else {
				return this.info.resume.resumeAddress;
			}
		},
		mobile() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.resumePhone) {
				return "暂无";
			} else {
				return this.info.resume.resumePhone;
			}
		},
		email() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.resumeMail) {
				return "暂无";
			} else {
				return this.info.resume.resumeMail;
			}
		},
		marriage() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.resumeMaritalStatus) {
				return "暂无";
			}

			switch (this.info.resume.resumeMaritalStatus) {
				case 0:
					return "未婚";
				case 1:
					return "已婚";
				case 2:
					return "保密";
				default:
					return "暂无";
			}
		},
		experiance() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.resumeExperience) {
				return "暂无";
			} else {
				const matched = this.experiences.find(
					item => item.value === this.info.resume.resumeExperience
				);
				if (matched) {
					return matched.label;
				} else {
					return "暂无";
				}
			}
		},
		education() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.resumeEducation) {
				return "暂无";
			} else {
				const matched = this.educations.find(
					item => item.value === this.info.resume.resumeEducation
				);
				if (matched) {
					return matched.label;
				} else {
					return "暂无";
				}
			}
		},
		genderType() {
			if (!this.info) {
				return "";
			} else if (!this.info.resume) {
				return "";
			} else if (!this.info.resume.resumeSex) {
				return "";
			}

			switch (this.info.resume.resumeSex) {
				case 0:
					return "man";
				case 1:
					return "woman";
				case 3:
				default:
					return "question";
			}
		},
		genderClass() {
			if (!this.info) {
				return "";
			} else if (!this.info.resume) {
				return "";
			} else if (!this.info.resume.resumeSex) {
				return "";
			}

			switch (this.info.resume.resumeSex) {
				case 0:
					return "man";
				case 1:
					return "woman";
				case 3:
				default:
					return "question";
			}
		},
		postIntent() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resumeIntention) {
				return "暂无";
			} else if (!this.info.resumeIntention.resumeTrade) {
				return "暂无";
			} else {
				return this.info.resumeIntention.resumeTrade;
			}
		},
		industryIntent() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resumeIntention) {
				return "暂无";
			} else if (!this.info.resumeIntention.resumeIndustry) {
				return "暂无";
			} else {
				return this.info.resumeIntention.resumeIndustry;
			}
		},
		salaryIntent() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resumeIntention) {
				return "暂无";
			} else if (!this.info.resumeIntention.resumeSalary) {
				return "暂无";
			} else {
				return this.info.resumeIntention.resumeSalary;
			}
		},
		cityIntent() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resumeIntention) {
				return "暂无";
			} else if (!this.info.resumeIntention.resumeWorkCity) {
				return "暂无";
			} else {
				return this.info.resumeIntention.resumeWorkCity;
			}
		},
		applyStatus() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resumeIntention) {
				return "暂无";
			} else if (!this.info.resumeIntention.resumeJobType) {
				return "暂无";
			} else {
				return this.info.resumeIntention.resumeJobType;
			}
		},
		selfDescription() {
			if (!this.info) {
				return "暂无";
			} else if (!this.info.resume) {
				return "暂无";
			} else if (!this.info.resume.comments) {
				return "暂无";
			} else {
				return this.info.resume.comments;
			}
		},
		educationLog() {
			return this.info.resumeEducations.map(item => {
				const matchedDegree = this.educations.find(
					education => education.value === item.educationsId
				);
				return {
					school: item.school,
					period: `${item.startyear}.${item.startmonth} 至 ${item.endyear}.${item.endmonth}`,
					major: item.major,
					degree: matchedDegree ? matchedDegree.label : "暂无"
				};
			});
		},
		jobExperiences() {
			return this.info.works.map(item => {
				return {
					companyName: item.companyName,
					period: `${item.startyear}.${item.startmonth} 至 ${item.endyear}.${item.endmonth}`,
					postTitle: item.jobs,
					postDuty: item.achievements
				};
			});
		},
		projectExperiences() {
			return this.info.projects.map(item => {
				return {
					projectName: item.projectName,
					period: `${item.startyear}.${item.startmonth} 至 ${item.endyear}.${item.endmonth}`,
					description: item.description,
					workDuty: item.description
				};
			});
		},
		resumeInfo() {
			return {
				lastEditDate: this.lastEditDate,
				name: this.name,
				age: this.age,
				major: this.major,
				address: this.address,
				mobile: this.mobile,
				email: this.email,
				marriage: this.marriage,
				experiance: this.experiance,
				education: this.education,
				genderType: this.genderType,
				genderClass: this.genderClass,
				postIntent: this.postIntent,
				industryIntent: this.industryIntent,
				salaryIntent: this.salaryIntent,
				cityIntent: this.cityIntent,
				applyStatus: this.applyStatus,
				selfDescription: this.selfDescription,
				educationLog: this.educationLog,
				jobExperiences: this.jobExperiences,
				projectExperiences: this.projectExperiences
			};
		}
	},
	created() {
		if (!this.token) {
			this.$router.replace({
				name: "Interviewer"
			});
		}
		const id = this.$route.query.id;
		if (id != null) {
			this.id = id;
			this.fetchResume();
		} else {
			this.$message.warning("无效的简历Id");
		}
	},
	methods: {
		async fetchResume() {
			try {
				this.isLoading = true;
				const res = await getResumeById(this.id);
				this.isLoading = false;
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.info = res.data.data;
					} else {
						this.$message.error(
							res.data.mesg ? res.data.mesg : "获取简历详情失败",
							2
						);
					}
				}
			} catch (err) {
				this.isLoading = false;
			}
		},
		async handleDownload() {
			try {
				const res = await downloadResume(this.info.resume.resumeId);
				console.log(res,'downloadResume')
				if (res.status === 200 || res.status === 201) {
					if (res.data.type === "application/octet-stream") {
						const url = window.URL.createObjectURL(
							new Blob([res.data])
						);
						const link = document.createElement("a");
						link.href = url;
						link.setAttribute(
							"download",
							this.info.resume.resumePreName
						);
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
					} else {
						this.$message.error(
							res.data.mesg ? res.data.mesg : "简历下载失败",
							2
						);
					}
				}
			} catch (error) {
				this.$message.error(
					res.data.mesg ? res.data.mesg : "简历下载失败",
					2
				);
			}
		}
	}
};
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	background-color: #f0f2f5;
}

.tabs {
	height: 100%;
}

.tabs >>> .ant-tabs-extra-content {
	position: absolute;
	right: 0;
	padding-right: 48px;
	z-index: 1;
}

.tabs >>> .ant-tabs-bar {
	background-color: #fff;
	margin-bottom: 0;
	box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}

.tabs >>> .ant-tabs-nav-scroll {
	display: flex;
	justify-content: center;
}

.tabs >>> .ant-tabs-content {
	padding: 20px 50px 0 50px;
	height: calc(100% - 44px);
	overflow-y: auto;
}

.tabs >>> .ant-tabs-content .ant-tabs-tabpane {
	height: 100%;
}

.tabs >>> .ant-tabs-content .ant-tabs-tabpane.ant-tabs-tabpane-inactive {
	height: 0;
}

.tab-page {
	background-color: #fff;
	height: 100%;
}
</style>
