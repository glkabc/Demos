<template>
	<div class="resume-data-render-view-container">
		<p style="color: #999">最后更新 {{ resumeInfo.lastEditDate }}</p>
		<div class="basic-info__container">
			<div>
				<p class="name__container">
					<span
						style="font-size: 1.7rem; font-weight: bold; margin-right: 8px"
						>{{ resumeInfo.name }}</span
					>
					<a-icon
						class="gender-icon"
						:class="resumeInfo.genderClass"
						:type="resumeInfo.genderType"
					/>
				</p>
				<p>
					<span>
						<a-icon type="user" />
						{{ resumeInfo.age }}岁/{{ resumeInfo.marriage }}
					</span>
					<a-divider type="vertical" />
					<span>
						<a-icon type="profile" />
						{{ resumeInfo.experiance }}
					</span>
					<a-divider type="vertical" />
					<span>
						<a-icon type="bank" />
						{{ resumeInfo.education }}/{{ resumeInfo.major }}
					</span>
					<a-divider type="vertical" />
					<span>
						<a-icon type="global" />
						{{ resumeInfo.address }}
					</span>
				</p>
				<p>
					<span>
						<a-icon type="mobile" />
						{{ resumeInfo.mobile }}
					</span>
					<a-divider type="vertical" />
					<span>
						<a-icon type="mail" />
						{{ resumeInfo.email }}
					</span>
				</p>
			</div>
			<div class="avatar__container">
				<a-avatar :size="79" icon="user" />
			</div>
		</div>
		<a-divider />
		<div>
			<h3 class="block__title">求职意向</h3>
			<p class="block__paraph">期望职位: {{ resumeInfo.postIntent }}</p>
			<p class="block__paraph">
				期望行业: {{ resumeInfo.industryIntent }}
			</p>
			<p class="block__paraph">期望薪资: {{ resumeInfo.salaryIntent }}</p>
			<p class="block__paraph">
				期望工作城市: {{ resumeInfo.cityIntent }}
			</p>
			<p class="block__paraph">求职状态: {{ resumeInfo.applyStatus }}</p>
		</div>
		<a-divider />
		<div>
			<h3 class="block__title">自我描述</h3>
			<p>{{ resumeInfo.selfDescription }}</p>
		</div>
		<a-divider />
		<div>
			<h3 class="block__title">教育经历</h3>
			<div
				v-for="(education, index) of resumeInfo.educationLog"
				:key="index"
			>
				<p>
					<span style="font-weight: bold; font-size: 1.0rem">{{
						education.school
					}}</span>
					<span style="color: #999; padding: 0 24px">
						{{ education.period }}
					</span>
				</p>
				<p style="padding-left: 4px">
					<span>{{ education.major }}</span>
					<a-divider type="vertical" />
					<span>{{ education.degree }}</span>
				</p>
			</div>
		</div>
		<a-divider />
		<div>
			<h3 class="block__title">工作经历</h3>
			<div v-for="(job, index) of resumeInfo.jobExperiences" :key="index">
				<p>
					<span style="font-weight: bold; font-size: 1.0rem">{{
						job.companyname
					}}</span>
					<span style="color: #999; padding: 0 24px">
						{{ job.period }}
					</span>
				</p>
				<p style="font-weight: bold">{{ job.postTitle }}</p>
				<p>
					<span style="font-weight: bold">工作职责:</span>
					{{ job.postDuty }}
				</p>
			</div>
		</div>
		<a-divider />
		<div>
			<h3 class="block__title">项目经历</h3>
			<div
				v-for="(project, index) of resumeInfo.projectExperiences"
				:key="index"
				style="margin-bottom: 16px"
			>
				<p>
					<span style="font-weight: bold; font-size: 1.0rem">{{
						project.projectname
					}}</span>
					<span style="color: #999; padding: 0 24px">
						{{ project.period }}
					</span>
				</p>
				<p class="block__paraph">
					<span style="font-weight: bold;">职责描述:</span>
					{{ project.description }}
				</p>
				<p class="block__paraph">
					<span style="font-weight: bold;">工作职责:</span>
					{{ project.workDuty }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DetailView',
	props: {
		resumeInfo: Object
	}
};
</script>

<style scoped>
.resume-data-render-view-container {
	background-color: #fff;
	padding: 32px;
	min-width: 600px;
}

.basic-info__container {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
}

.name__container {
	display: flex;
	align-items: center;
}

.gender-icon {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	line-height: 28px;
	color: #fff;
}

.gender-icon.man {
	background-color: rgb(50, 122, 253);
}

.gender-icon.woman {
	background-color: #eb595b;
}

.gender-icon.question {
	background-color: #22b8cf;
}

.avatar__container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.edit-button {
	margin-top: 16px;
	color: #22b8cf;
	cursor: pointer;
}

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

.placeholder {
	margin-top: 450px;
}

@media screen and (min-width: 1540px) {
	.placeholder {
		margin-top: 340px;
	}
}

@media screen and (min-width: 1855px) {
	.placeholder {
		margin-top: 290px;
	}
}
</style>
