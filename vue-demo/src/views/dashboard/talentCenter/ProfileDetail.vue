<template>
	<div class="container">
		<!-- <a-button @click="goBack">返回</a-button> -->
		<div v-if="!isLoading && info" class="item item--grow" style="width:calc(100% - 320px);">
			<div style="border: solid 1px #dadfe4; height: 100%">
				<resume-display :info="info" :disableEdit="viewOnly" @refresh-resume="fetchResume" />
			</div>
		</div>
		<div v-if="!isLoading && info" class="item rightBox">
			<div style="border: solid 1px #dadfe4;">
				<attachment-management :id="info.resume.resumeId" :resumeTitle="info.resume.resumePreName" :isBlacklist="info.resume.isBlacklist" :blackLists="blackLists"/>
			</div>
		</div>
		<div v-if="!isLoading && !info" class="item item--grow center-child">
			<a-empty />
		</div>
		<div v-if="isLoading" class="item item--grow">
			<div style="background-color: #fff; padding: 20px">
				<a-skeleton active :paragraph="{ rows: 5 }" />
				<a-skeleton active :paragraph="{ rows: 5 }" />
				<a-skeleton active :paragraph="{ rows: 5 }" />
				<a-skeleton active :paragraph="{ rows: 5 }" />
			</div>
		</div>
		<div v-if="isLoading" class="item">
			<div style="background-color: #fff; width: 300px; padding: 20px">
				<a-skeleton active :title="false" :paragraph="{ rows: 4 }" />
			</div>
		</div>
	</div>
</template>

<script>
import { Skeleton } from "ant-design-vue";
import AttachmentManagement from "./profileDetail/AttachmentManagement";
import ResumeDisplay from "./profileDetail/ResumeDisplay";
import { getResumeById } from "@/api/talentCenter";
export default {
	name: "ProfileDetail",
	components: {
		[Skeleton.name]: Skeleton,
		AttachmentManagement,
		ResumeDisplay
	},
	props: {
		viewOnly: Boolean
	},
	created() {
		let title = document.querySelector('title')
    title.innerHTML = '简历查看 | 招聘管理系统'
		const id = this.$route.query.id;
		if (id != null) {
			this.id = id;
			this.fetchResume();
		} else {
			this.$message.warning("无效的简历Id");
		}
	},
	beforeDestroy() {
		let title = document.querySelector('title')
    title.innerHTML = '招聘管理系统'
	},
	data() {
		return {
			isLoading: false,
			info: null,
			blackLists:[]//拉黑原因
		};
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
						this.blackLists = res.data.data.blackLists
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
		}
	},
	beforeRouteLeave(to, from, next) {
      if (to.path == "/talent-center/profile") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    }

};
</script>

<style scoped>
.container {
	min-height: 100%;
	/* display: flex; */
	/* flex-direction: row;
	flex-wrap: nowrap; */
	margin: -10px;
	/* overflow-x: auto; */
	position: relative;
}

.container > * {
	padding: 10px;
}

.item--grow {
	flex-grow: 1;
	flex-grow: 1;
	flex-basis: auto;
}

.center-child {
	display: flex;
	justify-content: center;
	align-items: center;
} 
.rightBox {
	position: absolute;
	top: 0;
	right: 0;
	/* height: 100%; */
	z-index: 999;
	overflow: auto;
}
</style>
