<template>
	<div class="container">
		<a-table
			class="bordered zebra"
			rowKey="resumeId"
			:columns="columns"
			:dataSource="data"
			:pagination="pagination"
			:loading="isLoading"
			@change="handleTableChange"
		>
			<template v-slot:info="record">
				<a-popover
					title="人才简介"
					placement="right"
					trigger="click"
					:getPopupContainer="triggerNode => triggerNode.parentNode"
					destroyTooltipOnHide
				>
					<template v-slot:content>
						<resume-summary :id="record.resumeId" />
					</template>
					<div class="info__container">
						<div>
							<p class="info__paragraph">
								<span class="info__name">
									{{ record.fullName }}
									<icon-font
										type="icon-suo"
										v-if="record.realOwnerId !== null"
										style="font-size: 16px; margin-left: 4px;"
									/>
									<icon-font
										type="icon-heimingdan1"
										v-if="record.isBlacklist === 1"
										style="font-size: 16px; color: #FD5158;margin-left: 4px;"
									/>
								</span>
								<span class="info__post">{{ record.resumeTrade }}</span>
							</p>
							<p style="margin-bottom: 0">
								<span class="info__mobile">
									{{
									record.resumePhone
									? record.resumePhone
									: '暂无'
									}}
								</span>
								<span class="info__divider">|</span>
								<span class="info__email">
									{{
									record.resumeMail
									? record.resumeMail
									: '暂无'
									}}
								</span>
							</p>
						</div>
						<div>
							<a-tag>{{ getEducationLabel(record.resumeEducation) }}</a-tag>
							<a-tag>
								{{
								getExperienceLabel(record.resumeExperience)
								}}
							</a-tag>
						</div>
					</div>
				</a-popover>
			</template>
			<template v-slot:belonger="{ resumeRealOwner }">
				<p class="belonger-uploader">权益人: {{ getOwnderName(resumeRealOwner) }}</p>
				<p class="belonger-uploader">{{ getOwnerDate(resumeRealOwner) }}</p>
			</template>
			<template v-slot:uploader="{ createUserName, createUserTime }">
				<p class="belonger-uploader">上传人: {{ createUserName ? createUserName : '暂无' }}</p>
				<p class="belonger-uploader">
					{{
					createUserTime
					? $moment(createUserTime).format('YYYY-MM-DD')
					: '暂无'
					}}
				</p>
			</template>
			<template v-slot:action="{ resumeId }">
				<span class="action-button" @click="handleClickDetail(resumeId)">编辑</span>
			</template>
		</a-table>
	</div>
</template>

<script>
import { Popover } from "ant-design-vue";
import { IconFont } from "@configs/scriptURL";
import ResumeSummary from "./components/ResumeSummary";
import { getAbnormalResumes } from "@/api/talentCenter";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
let persistQuery = null;
export default {
	name: "AbnormalProfile",
	components: {
		[Popover.name]: Popover,
		ResumeSummary,
		IconFont
	},
	data() {
		return {
			data: [],
			columns: [
				{
					title: "个人信息",
					key: "info",
					width: "600px",
					scopedSlots: { customRender: "info" }
				},
				{
					title: "权益人",
					key: "belonger",
					width: "224px",
					scopedSlots: {
						customRender: "belonger"
					}
				},
				{
					title: "上传人",
					key: "uploader",
					width: "224px",
					scopedSlots: {
						customRender: "uploader"
					}
				},
				{
					title: "操作",
					width: 120,
					align: "center",
					scopedSlots: { customRender: "action" }
				}
			],
			isLoading: false,
			pagination: {
				current: persistQuery ? persistQuery.current : 1,
				pageSizeOptions: ["10", "20", "30", "40"],
				showSizeChanger: true,
				pageSize: persistQuery ? persistQuery.pageSize : 10,
				total: 0,
				showTotal: total => `共 ${total} 条`
			}
		};
	},
	computed: {
		...mapState({
			educations: state => state.educationRequires,
			experiences: state => state.jobExperiences
		})
	},
	methods: {
		getOwnderName(resumeRealOwner) {
			if (!resumeRealOwner) {
				return "暂无";
			} else if (resumeRealOwner.realOwnerName) {
				return resumeRealOwner.realOwnerName;
			} else {
				return "暂无";
			}
		},
		getOwnerDate(resumeRealOwner) {
			if (!resumeRealOwner) {
				return "暂无";
			} else if (resumeRealOwner.startTime) {
				return this.$moment(resumeRealOwner.startTime).format(
					"YYYY-MM-DD"
				);
			} else {
				return "暂无";
			}
		},
		handleTableChange({ current, pageSize }) {
			this.pagination.current = current;
			this.pagination.pageSize = pageSize;
			this.fetchResumes();
		},
		getEducationLabel(value) {
			const matched = this.educations.find(
				education => education.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return "未匹配到学历";
			}
		},
		getExperienceLabel(value) {
			const matched = this.experiences.find(
				experience => experience.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return "未匹配到经验";
			}
		},
		handleClickDetail(id) {
			this.$router.push({
				path: `${this.$route.path}/detail`,
				query: { id }
			});
		},
		async fetchResumes() {
			try {
				this.isLoading = true;
				const res = await getAbnormalResumes({
					pageSize: this.pagination.pageSize,
					pageNum: this.pagination.current
				});
				this.isLoading = false;
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.data = res.data.data.resumesList;
						this.pagination.total = res.data.data.meta.size;
					} else {
						this.$message.error(res.data.mesg, 2);
					}
				}
			} catch (error) {
				this.isLoading = false;
			}
		}
	},
	created() {
		this.fetchResumes();
	},
	beforeRouteLeave(to, from, next) {
		if (to.path === "/talent-center/abnormal-profile/detail") {
			persistQuery = {
				current: this.pagination.current,
				pageSize: this.pagination.pageSize
			};
			next();
		} else {
			persistQuery = null;
			next();
		}
	}
};
</script>

<style scoped>
.container {
	padding: 20px;
	background-color: #fff;
	min-height: 100%;
}

.info__container {
	color: #8c909b;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
}

.info__paragraph {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
}

.info__name {
	color: #2c90f5;
	margin-right: 16px;
	font-size: 21px;
	flex-shrink: 0;
}

.info__post {
	flex-grow: 1;
	color: #333;
	font-size: 19px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.info__divider {
	padding: 0 16px;
}

.bordered {
	border: solid 1px #e8e8e8;
}

.filter__container {
	padding: 8px;
	border-color: #e8e8e8;
	border-width: 1px;
	border-top-style: solid;
	border-left-style: solid;
	border-right-style: solid;
	background-color: #f9f9f9;
}

.filter__title {
	padding: 0 16px;
	color: #657d8a;
}

.belonger-uploader {
	color: #8c909b;
}
.belonger-uploader:last-child {
	margin-bottom: 0;
}

.status-tag {
	color: #8c909b;
	margin-right: 0;
	background-color: rgba(255, 255, 255, 0);
	border-radius: 0;
	cursor: default;
}

.action-button {
	cursor: pointer;
	color: #4480ee;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	cursor: pointer;
}
</style>
