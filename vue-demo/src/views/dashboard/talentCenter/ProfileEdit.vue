<template>
	<div class="container">
		<div class="item item--grow">
			<resume-modify :info="info" />
		</div>
		<div class="item">
			<attachment-management :doc="info.doc" />
		</div>
	</div>
</template>

<script>
import { Skeleton } from "ant-design-vue";
import attachmentManagement from "./profileDetail/AttachmentManagement.vue";
import resumeModify from "./profileEdit/ResumeModify";
import { getResumeById } from "@/api/talentCenter";
export default {
	name: "ProfileEdit",
	components: {
		[Skeleton.name]: Skeleton,
		attachmentManagement,
		resumeModify
	},
	created() {
		const id = this.$route.query.id;
		if (id != null) {
			this.fetchResume(id);
		} else {
			this.$message.warning("无效的简历Id");
		}
	},
	data() {
		return {
			isLoading: false,
			info: null
		};
	},
	methods: {
		async fetchResume(id) {
			try {
				this.isLoading = true;
				const res = await getResumeById(id);
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
		}
	}
};
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	margin: -10px;
	overflow-x: auto;
}

.container > * {
	padding: 10px;
}

.item--grow {
	flex-grow: 1;
	flex-grow: 1;
	flex-basis: auto;
}
</style>
