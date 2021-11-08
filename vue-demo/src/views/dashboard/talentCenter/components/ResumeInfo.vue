<template>
	<div>
		<div>
			<h3 class="block__title">求职意向</h3>
			<p class="block__paraph">期望职位: {{ postIntent }}</p>
			<p class="block__paraph">期望行业: {{ industryIntent }}</p>
			<p class="block__paraph">期望薪资: {{ salaryIntent }}</p>
			<p class="block__paraph">期望工作城市: {{ cityIntent }}</p>
			<p class="block__paraph">求职状态: {{ applyStatus }}</p>
		</div>
		<a-divider />
		<div>
			<h3 class="block__title">自我描述</h3>
			<p>{{ selfDescription }}</p>
		</div>
		<a-divider />
		<div>
			<h3 class="block__title">教育经历</h3>
			<div
				v-for="(education, index) of info.resumeEducations"
				:key="index"
			>
				<p>
					<span style="font-weight: bold; font-size: 1.0rem">{{
						education.school
					}}</span>
					<span style="color: #999; padding: 0 24px">
						{{
							`${education.startyear}.${education.startmonth} 至 ${education.endyear}.${education.endmonth}`
						}}
					</span>
				</p>
				<p style="padding-left: 4px">
					<span>{{ education.major }}</span>
					<a-divider type="vertical" />
					<span>{{ getEducation(education.educationsId) }}</span>
				</p>
			</div>
		</div>
		<a-divider />
		<div>
			<h3 class="block__title">工作经历</h3>
			<div v-for="(job, index) of info.works" :key="index">
				<p>
					<span style="font-weight: bold; font-size: 1.0rem">{{
						job.companyname
					}}</span>
					<span style="color: #999; padding: 0 24px">
						{{
							`${job.startyear}.${job.startmonth} 至 ${job.endyear}.${job.endmonth}`
						}}
					</span>
				</p>
				<p style="font-weight: bold">{{ job.jobs }}</p>
				<p>
					<span style="font-weight: bold">工作职责:</span>
					{{ job.achievements }}
				</p>
			</div>
		</div>
		<a-divider />
		<div>
			<h3 class="block__title">项目经历</h3>
			<div
				v-for="(project, index) of info.projects"
				:key="index"
				style="margin-bottom: 16px"
			>
				<p>
					<span style="font-weight: bold; font-size: 1.0rem">{{
						project.projectname
					}}</span>
					<span style="color: #999; padding: 0 24px">
						{{
							`${project.startyear}.${project.startmonth} 至
						${project.endyear}.${project.endmonth}`
						}}
					</span>
				</p>
				<p class="block__paraph">
					<span style="font-weight: bold;">职责描述:</span>
					{{ project.description }}
				</p>
				<p class="block__paraph">
					<span style="font-weight: bold;">工作职责:</span>
					{{ project.description }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('status');
export default {
	name: 'ResumeInfo',
	props: {
		info: Object
	},
	computed: {
		...mapState({
			educations: state => state.educationRequires,
			experiences: state => state.jobExperiences
		}),
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
			} else if (!this.info.resumeIntention.resumeSalary) {
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
			} else if (!this.info.resume) {
				return '暂无';
			} else if (!this.info.resume.comments) {
				return '暂无';
			} else {
				return this.info.resume.comments;
			}
		}
	},
	methods: {
		handleClickEdit(id) {
			this.$router.push({ name: 'TalentProfileEdit', params: { id } });
		},
		getEducation(value) {
			if (!value) {
				return '暂无';
			}
			const matched = this.educations.find(item => item.value === value);
			if (matched) {
				return matched.label;
			} else {
				return '暂无';
			}
		}
	}
};
</script>

<style scoped>
.block__title {
	font-size: 1.3rem;
	position: relative;
	padding: 0 12px;
}

.block__title::before {
	content: '';
	display: block;
	position: absolute;
	width: 3px;
	height: 15px;
	left: 0;
	top: 8px;

	background-color: #22b8cf;
}

.block__paraph {
	margin-bottom: 4px;
}
</style>
