<template>
	<div class="resume-display-container">
		<a-tabs defaultActiveKey="1" class="tabs" :animated="false">
			<a-tab-pane tab="简历原件" key="1">
				<resume-online-preview
					:url="info.resume.resumeSrc"
					:type="info.resume.resumeType"
				/>
			</a-tab-pane>
			<a-tab-pane tab="简历" key="2">
				<resume-data-render-view
					:resumeInfo="resumeInfo"
					:resumeBaseInfo="resumeBaseInfo"
					@refresh-resume="$emit('refresh-resume')"
				/>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import ResumeOnlinePreview from '@/components/ResumeOnlinePreview';
import ResumeDataRenderView from '@/components/ResumeDataRenderView';
import { createNamespacedHelpers } from 'vuex';
const {
	mapState: mapStatusState,
	mapGetters: mapStatusGetters,
} = createNamespacedHelpers('status');
export default {
	name: 'ResumeDisplay',
	components: {
		[Tabs.name]: Tabs,
		[Tabs.TabPane.name]: Tabs.TabPane,
		ResumeOnlinePreview,
		ResumeDataRenderView,
	},
	props: {
		info: Object,
		disableEdit: Boolean,
	},
	computed: {
		...mapStatusGetters(['getMajorTitle']),
		...mapStatusState({
			educations: (state) => state.educationRequires,
			experiences: (state) => state.jobExperiences,
			majorTypes: (state) => state.majorTypes,
			marriageStatus: (state) => state.marriageStatus,
		}),
		lastEditDate() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resume) {
				return '暂无';
			} else if (!this.info.resume.modifiedUserTime) {
				return '暂无';
			} else {
				return this.$moment(this.info.resume.modifiedUserTime).format(
					'YYYY-MM-DD HH:MM'
				);
			}
		},
		name() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resume) {
				return '暂无';
			} else if (!this.info.resume.fullName) {
				return '暂无';
			} else {
				return this.info.resume.fullName;
			}
		},
		age() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resume) {
				return '暂无';
			} else if (!this.info.resume.resumeBirthDate) {
				return '暂无';
			} else {
				return this.$moment().diff(
					this.info.resume.resumeBirthDate,
					'years'
				);
			}
		},
		major() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resume) {
				return '暂无';
			} else if (!this.info.resume.resumeMajor) {
				return '暂无';
			} else {
				return this.getMajorTitle(this.info.resume.resumeMajor);
			}
		},
		address() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resume) {
				return '暂无';
			} else if (!this.info.resume.resumeAddress) {
				return '暂无';
			} else {
				return this.info.resume.resumeAddress;
			}
		},
		mobile() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resume) {
				return '暂无';
			} else if (!this.info.resume.resumePhone) {
				return '暂无';
			} else {
				return this.info.resume.resumePhone;
			}
		},
		email() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resume) {
				return '暂无';
			} else if (!this.info.resume.resumeMail) {
				return '暂无';
			} else {
				return this.info.resume.resumeMail;
			}
		},
		marriage() {
			
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resume) {
				return '暂无';
			} else if ( this.info.resume.resumeMaritalStatus == null  ) {
				return '暂无';
			}else {
				const matched = this.marriageStatus.find(
					(item) => item.value === this.info.resume.resumeMaritalStatus
				);
				if (matched) {
					console.log(matched,'matched')
					return matched.label;
				} else {
					return '暂无';
				}
			}
		},
		experiance() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resume) {
				return '暂无';
			} else if (!this.info.resume.resumeExperience) {
				return '暂无';
			} else {
				const matched = this.experiences.find(
					(item) => item.value === this.info.resume.resumeExperience
				);
				if (matched) {
					return matched.label;
				} else {
					return '暂无';
				}
			}
		},
		education() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resume) {
				return '暂无';
			} else if (!this.info.resume.resumeEducation) {
				return '暂无';
			} else {
				const matched = this.educations.find(
					(item) => item.value === this.info.resume.resumeEducation
				);
				if (matched) {
					return matched.label;
				} else {
					return '暂无';
				}
			}
		},
		genderType() {
			if (!this.info) {
				return '';
			} else if (!this.info.resume) {
				return '';
			} else if (this.info.resume.resumeSex == null) {
				return '';
			}

			switch (this.info.resume.resumeSex) {
				case 0:
					return 'man';
				case 1:
					return 'woman';
				case 3:
				default:
					return 'question';
			}
		},
		genderClass() {
			if (!this.info) {
				return '';
			} else if (!this.info.resume) {
				return '';
			} else if (this.info.resume.resumeSex == null) {
				return '';
			}

			switch (this.info.resume.resumeSex) {
				case 0:
					return 'man';
				case 1:
					return 'woman';
				case 3:
				default:
					return 'question';
			}
		},
		postIntent() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resumeIntention) {
				return '暂无';
			} else if (!this.info.resumeIntention.resumeTrade) {
				return '暂无';
			} else {
				return this.info.resumeIntention.resumeTrade;
			}
		},
		industryIntent() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resumeIntention) {
				return '暂无';
			} else if (!this.info.resumeIntention.resumeIndustry) {
				return '暂无';
			} else {
				return this.info.resumeIntention.resumeIndustry;
			}
		},
		salaryIntent() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resumeIntention) {
				return '暂无';
			} else if (this.info.resumeIntention.resumeSalary === undefined) {
				return '暂无';
			} else {
				return this.info.resumeIntention.resumeSalary;
			}
		},
		cityIntent() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resumeIntention) {
				return '暂无';
			} else if (!this.info.resumeIntention.resumeWorkCity) {
				return '暂无';
			} else {
				return this.info.resumeIntention.resumeWorkCity;
			}
		},
		applyStatus() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resumeIntention) {
				return '暂无';
			} else if (!this.info.resumeIntention.resumeJobType) {
				return '暂无';
			} else {
				return this.info.resumeIntention.resumeJobType;
			}
		},
		selfDescription() {
			if (!this.info) {
				return '暂无';
			} else if (!this.info.resumeIntention) {
				return '暂无';
			} else if (!this.info.resumeIntention.resumeDescribe) {
				return '暂无';
			} else {
				return this.info.resumeIntention.resumeDescribe;
			}
		},
		educationLog() {
			return this.info.resumeEducations.map((item) => {
				const matchedDegree = this.educations.find(
					(education) => education.value === item.educationsId
				);
				return {
					school: item.school,
					period: `${item.startyear}.${item.startmonth} 至 ${item.endyear}.${item.endmonth}`,
					major: item.speciality,
					degree: matchedDegree ? matchedDegree.label : '学历暂无',
				};
			});
		},
		jobExperiences() {
			return this.info.works.map((item) => {
				return {
					companyname: item.companyname,
					period: `${item.startyear}.${item.startmonth} 至 ${item.endyear}.${item.endmonth}`,
					postTitle: item.jobs,
					postDuty: item.achievements,
				};
			});
		},
		projectExperiences() {
			return this.info.projects.map((item) => {
				return {
					projectname: item.projectname,
					period: `${item.startyear}.${item.startmonth} 至 ${item.endyear}.${item.endmonth}`,
					description: item.description,
					workDuty: item.description,
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
				projectExperiences: this.projectExperiences,
			};
		},
		resumeBaseInfo() {
			return {
				id: this.info.resume.resumeId,
				name: this.info.resume.fullName,
				email: this.info.resume.resumeMail,
				birthDay: this.info.resume.resumeBirthDate,
				height: this.info.resume.resumeHeight,
				gender: this.info.resume.resumeSex,
				education: this.info.resume.resumeEducation,
				marriage: this.info.resume.resumeMaritalStatus,
				birthPlace: this.info.resume.resumeNative,
				mobile: this.info.resume.resumePhone,
				major: this.info.resume.resumeMajor,
				experience: this.info.resume.resumeExperience,
				currentPlace: this.info.resume.resumeAddress,
			};
		},
	},
	methods: {
		handleClickEdit(id) {
			this.$router.push({ name: 'TalentProfileEdit', query: { id } });
		},
	},
};
</script>

<style scoped>
.resume-display-container {
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
	margin-right: 20%;
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
