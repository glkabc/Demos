<template>
	<div class="log-container">
		<template v-if="isFetching">
			<a-skeleton active :paragraph="{ rows: 3 }" :title="false" />
			<a-skeleton active :paragraph="{ rows: 3 }" :title="false" />
			<a-skeleton active :paragraph="{ rows: 3 }" :title="false" />
		</template>
		<a-empty v-else-if="!isFetching && !contactRemarkInfo" />
		<div v-else class="log-list">
			<div v-for="(log) of contactRemarkInfo" :key="log.id" class="logItem">
				<!-- <template v-slot:icon>
					<a-icon
						type="check-circle"
						:style="{
							color:
								index + 1 === contactRemarkInfo.length
									? '#1478e3'
									: '#e8e8e8'
						}"
					/>
				</template> -->
				<div>
					<div class="log-list__item">
						<div class="log-list__item__delta full">
							<!-- <icon-font
								type="icon-yuyue"
								style="font-size: 24px; color: #1478E3; margin-right: 4px"
							/> -->
							<span style="color: #333333;font-size:14px;font-weight:700">沟通HR：{{
								log.createUserName
									? log.createUserName
									: '暂无'
							}}</span>
							<span style="color: #333333;font-size:14px;font-weight:700">{{
								log.createUserTime
									? moment(log.createUserTime).format(
											'YYYY-MM-DD'
									  )
									: '暂无'
							}}</span>
						</div>
						<div class="log-list__item__delta" :class="{full:!isCurrent}" v-show="isCurrent">
							<span class="title">在职状态：</span>
							<p class="content">
								{{ getHasJob(log.workstatusId) }}
							</p>
						</div>
						<div class="log-list__item__delta" v-show="isCurrent">
							<span class="title">预计入职时间：</span>
							<p class="content">
								{{
									log.arrivalTime
										? moment(log.arrivalTime).format(
												'YYYY-MM-DD'
										  )
										: '暂无'
								}}
							</p>
						</div>
						<div class="log-list__item__delta" :class="{full:!isCurrent}">
							<span class="title">当前月薪：</span>
							<p class="content">
								{{
									log.currWage
										? `${log.currWage}元/月`
										: '暂无'
								}}
							</p>
						</div>
						<div class="log-list__item__delta" :class="{full:!isCurrent}" v-show="isCurrent">
							<span class="title">加入百得意愿：</span>
							<!-- <p class="content">
								{{ getIsBaideEmployee(log.isJoin) }}
							</p> -->
							<p class="content" v-text="log.isJoin === 0 ? '否': '是' "></p>
						</div>
						<div class="log-list__item__delta" :class="{full:!isCurrent}">
							<span class="title">期望月薪：</span>
							<p class="content">
								<!-- {{ getExpectedSalary(log.expectWage) }} -->
								{{
									log.currWage
										? `${log.expectWage}元/月`
										: '暂无'
								}}
							</p>
						</div>
						<div class="log-list__item__delta full" :class="{full:!isCurrent}">
							<span class="title">离职原因：</span>
							<p class="content">
								{{
									log.dimissionReason
										? log.dimissionReason
										: '暂无'
								}}
							</p>
						</div>
						<div class="log-list__item__delta full" v-show="isCurrent">
							<span class="title">HR评价：</span>
							<p class="content">
								{{ log.remark ? log.remark : '暂无' }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { Steps, Skeleton } from 'ant-design-vue';
import { getContactRemark } from '@/api/talentCenter';
// import { IconFont } from '@configs/scriptURL';
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('status');
export default {
	name: 'Content',
	components: {
		[Steps.name]: Steps,
		[Steps.Step.name]: Steps.Step,
		[Skeleton.name]: Skeleton,
	},
	props: {
		id: Number,
		isCurrent: Boolean
	},
	data() {
		return {
			contactRemarkInfo: null,
			isFetching: false
		};
	},
	computed: {
		...mapState({
			hasJob: state => state.hasJob,
			expectedSalaries: state => state.expectedSalaries,
			isBaideEmployee: state => state.isBaideEmployee
		})
	},
	methods: {
		moment,
		async fetchContactRemark() {
			try {
				this.isFetching = true;
				const res = await getContactRemark(this.id);
				this.isFetching = false;
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.contactRemarkInfo = res.data.data.remark;
					} else {
						this.$message.error(
							res.data.mesg ? res.data.mesg : '查询沟通详情失败',
							2
						);
					}
				}
			} catch (error) {
				console.log({ error });
				this.isFetching = false;
			}
		},
		getHasJob(value) {
			if (!value) {
				return '暂无';
			} else {
				const matched = this.hasJob.find(item => item.value === value);
				if (matched) {
					return matched.label;
				} else {
					return '暂无';
				}
			}
		},
		// getExpectedSalary(value) {
		// 	if (!value) {
		// 		alert(1)
		// 		return '暂无';
		// 	} else {
		// 		const matched = this.expectedSalaries.find(
		// 			item => item.value === value
		// 		);
		// 		if (matched) {
		// 			return matched.label;
		// 		} else {
		// 			return '暂无';
		// 		}
		// 	}
		// },
		// getIsBaideEmployee(value) {
		// 	if (!value) {
		// 		return '暂无';
		// 	} else {
		// 		const matched = this.isBaideEmployee.find(
		// 			item => item.value == value
		// 		);
		// 		if (matched) {
		// 			console.log(matched.label)	
		// 			return matched.label;
		// 		} else {
		// 			return '暂无';
		// 		}
		// 	}
		// }
	},
	created() {
		this.fetchContactRemark();
	}
};
</script>

<style scoped>
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
	font-weight: 400;
	position: relative;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

.log-list__item__delta {
	padding: 8px;
	width: 33%;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	font-size: 12px;
	color: #333;
}

.log-list__item__delta.full {
	width: 100%;
}

.title {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex-shrink: 0;
	color: #333;
	font-size: 12px;
}

.content {
	color: #333;
	flex-grow: 1;
	margin-bottom: 0;
}

/* .log-list__item::before {
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
	content: "未知";
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
	content: "待评价";
}

.log-list__item.failed::before {
	background-color: #feebec;
}

.log-list__item.failed::after {
	color: #fd5158;
	content: "淘汰";
}

.log-list__item.pass::before {
	background-color: #ddf6e4;
}

.log-list__item.pass::after {
	color: #55d379;
	content: "通过";
} */

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
.logItem {
	background-color: #F7F8FA;
	margin-bottom: 10px;
	font-size: 12px;
	padding: 10px;
}
</style>
