<template>
	<div class="log-container">
		<template v-if="isFetching">
			<a-skeleton active :paragraph="{ rows: 3 }" :title="false" />
			<a-skeleton active :paragraph="{ rows: 3 }" :title="false" />
			<a-skeleton active :paragraph="{ rows: 3 }" :title="false" />
		</template>
		<a-empty v-else-if="!isFetching && !data" />
		<template v-else>
			<p class="log-info">
				<span class="log-info__name">{{ data.fullName }}</span>
				<span>
					<a-icon type="mobile" />
					{{ data.resumePhone }}
				</span>
				<span class="log-info__divider" />
				<span>
					<a-icon type="mail" />
					{{ data.resumeMail }}
				</span>
			</p>
			<a-steps class="log-list" direction="vertical" size="small" status="finish">
				<a-step v-for="log of data.candidateList" :key="log.id" status="finish">
					<template v-slot:title>
						<div class="log-list__item" :class="
								getInterviewResultClass(log.status)
							">
							<p class="log-list__item--head">
								<span class="log-list__item__type">
									{{
									getInterviewTypeText(log.status)
									}}
								</span>
								<span>{{ log.date }}</span>
							</p>
							<p>
								评价:{{
								log.interviewComment
								? log.interviewComment
								: '暂无'
								}}
							</p>
							<p style="margin-bottom: 0">
								评价人:{{
								log.modifiedUserName ? log.modifiedUserName : '暂无'
								}}
							</p>
						</div>
					</template>
				</a-step>
			</a-steps>
		</template>
	</div>
</template>

<script>
import { Steps, Skeleton } from "ant-design-vue";
import { getCommentLog } from "@/api/interviewer";
export default {
	name: "Log",
	components: {
		[Steps.name]: Steps,
		[Steps.Step.name]: Steps.Step,
		[Skeleton.name]: Skeleton
	},
	props: {
		id: Number
	},
	data() {
		return {
			isFetching: false,
			data: null
		};
	},
	methods: {
		getInterviewTypeText(type) {
			switch (type) {
				case "0":
					return "初试";
				case "1":
					return "复试";
				default:
					return "";
			}
		},
		getInterviewResultClass(result) {
			switch (result) {
				case 30:
					return "pending";
				case 40:
					return "pass";
				case 41:
					return "failed";
				default:
					return "";
			}
		},
		async fetchLogs() {
			try {
				this.isFetching = true;
				const res = await getCommentLog(this.id);
				this.isFetching = false;
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.data = res.data.data;
					} else {
						this.$message.error(
							res.data.mesg ? res.data.mesg : "查询评价记录失败",
							2
						);
					}
				}
			} catch (error) {
				this.isFetching = false;
			}
		}
	},
	created() {
		this.fetchLogs();
	}
};
</script>

<style scoped>
.log-info {
	color: #636364;
	font-size: 16px;
}
.log-info__name {
	color: #333;
	font-size: 24px;
	margin-right: 28px;
}
.log-info__divider {
	display: inline-block;
	width: 1px;
	height: 16px;
	background-color: #e8e8e8;
	margin: 0 15px;
}

.log-list >>> .ant-steps-item {
	margin-bottom: 24px;
}

.log-list >>> .ant-steps-item-icon {
	margin-top: 21px;
}

.log-list >>> .ant-steps-item-tail::after {
	margin-top: 31px;
}

.log-list >>> .ant-steps-item-content {
	background-color: #f7f8fa;
}

.log-list >>> .ant-steps-item-title {
	display: block;
	overflow: hidden;
}

.log-list__item {
	color: #666666;
	font-size: 16px;
	padding: 24px;
	position: relative;
}

.log-list__item::before {
	content: "";
	display: block;
	position: absolute;
	width: 120px;
	height: 40px;
	top: 4px;
	right: -44px;
	transform: rotateZ(45deg);
	background-color: #666;
	z-index: 1;
}

.log-list__item::after {
	content: '\672a\77e5';
	display: block;
	color: #fff;
	position: absolute;
	font-size: 19px;
	top: 13px;
	right: -5px;
	transform: rotateZ(45deg);
	z-index: 2;
}

.log-list__item.pending::before {
	background-color: #fcf2e1;
}

.log-list__item.pending::after {
	color: #ff960e;
	content: "\5f85\8bc4\4ef7";
}

.log-list__item.failed::before {
	background-color: #feebec;
}

.log-list__item.failed::after {
	color: #fd5158;
	content: '\6dd8\6c70';
}

.log-list__item.pass::before {
	background-color: #ddf6e4;
}

.log-list__item.pass::after {
	color: #55d379;
	content: '\901a\8fc7';
}

.log-list__item--head {
	padding-right: 30px;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	margin-bottom: 24px;
}

.log-list__item__type {
	color: #333;
	font-size: 19px;
}

.log-list__item__date {
	color: #999;
}
</style>
