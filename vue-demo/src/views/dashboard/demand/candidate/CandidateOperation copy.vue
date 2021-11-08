<template>
	<div class="candidate-operation">
		<a-row>
			<a-col :span="24" style="padding: 23px; font-size: 16px; color: #333;">当前候选人</a-col>
		</a-row>
		<a-row class="candidate-info">
			<a-col :span="24">
				<a-row>
					<a-col :span="24" class="name">
						<span style="margin-right: 24px;">{{ name }}</span>
						<span>
							<icon-font type="icon-shouji" class="iconfont" />
							{{ telephone }}
						</span>
						<a-divider type="vertical" />
						<span>
							<icon-font type="icon-youxiang" class="iconfont" />
							{{ email }}
						</span>
					</a-col>
				</a-row>
			</a-col>
			<a-col :span="24">
				<div style="margin: 0 20px; color: #108ee9; font-size: 14px; font-weight: bold;">进行中</div>
			</a-col>
			<a-col :span="24" class="candidate-info-item">
				<a-checkbox-group @change="onCheckboxChange" style="width: calc(100% - 20px);margin: 0 10px">
					<a-row>
						<a-col :span="12" v-for="(item,index) in candInfolist" :key="index">
							<a-checkbox :value="index">
								<div
									class="info-item"
									@click.prevent="handleView(item.talentId)"
									@mouseenter="mouseEnter(item.status, index)"
									@mouseleave="mouseLeave(item.status ,index)"
								>
									<a-row class="info-item">
										<div class="label-wait" v-if="item.status === 30">待面试</div>
										<div class="label-eliminate" v-if="item.status === 31">邀约失败</div>
										<div class="label-pass" v-if="item.status === 40">面试通过</div>
										<div class="label-eliminate" v-if="item.status === 41">面试淘汰</div>
										<div class="label-wait" v-if="item.status === 50">待入职</div>
										<div class="label-eliminate" v-if="item.status === 51">放弃Offer</div>
										<div class="label-pass" v-if="item.status === 60">入职成功</div>
										<div class="label-eliminate" v-if="item.status === 61">放弃入职</div>
										<a-col :span="24" class="item-department">{{ item.orgName }}</a-col>
										<a-col :span="24">
											<a-row>
												<a-col :span="10" class="item-demand">招聘需求：{{ item.positionName }}</a-col>
												<a-col :span="10" class="item-position">应聘职位：{{ item.dremandName }}</a-col>
											</a-row>
										</a-col>
										<a-col :span="24" class="item-occurrence-date">更新时间：{{ item.createUserTime }}</a-col>
										<a-col :span="24" style="text-align: right;">
											<a
												v-if="item.status === 30 || item.status === 31"
												size="small"
												class="item-interview"
												:class="item_interview && item_interview_num === index ? 'item-interview-active' : ''"
												@click.prevent.stop="handleInterview(item)"
											>面试安排</a>
											<a
												v-if="item.status === 30 || item.status === 31"
												size="small"
												class="item-interview"
												:class="item_interview && item_interview_num === index ? 'item-interview-active' : ''"
												@click.prevent.stop="handleInterviewEvaluation(item)"
											>面试评价</a>
										</a-col>
									</a-row>
								</div>
							</a-checkbox>
						</a-col>
					</a-row>
				</a-checkbox-group>
			</a-col>
			<a-col :span="24" style="margin-top: 15px;">
				<div style="margin: 0 20px; color: #999; font-size: 14px; font-weight: bold;">已关闭、已暂停</div>
			</a-col>
			<a-col :span="24" style="margin-bottom: 80px; margin-top: 15px;">
				<div style="margin: 0 20px; color: #87d068; font-size: 14px; font-weight: bold;">已完成</div>
			</a-col>
		</a-row>
		<a-affix :offsetBottom="0">
			<div class="footer">
				<a-button
					disabled
					v-if="offerDisabled"
					type="primary"
					@click="handleOffer"
					style="background: #d5d5d5; border: #d5d5d5; color: #fff;"
				>Offer确认</a-button>
				<a-button
					v-if="!offerDisabled"
					type="primary"
					@click="handleOffer"
					style="background: #22B8CF; border: #22B8CF;"
				>Offer确认</a-button>
				<a-button
					disabled
					v-if="confirmDisabled"
					type="primary"
					style="margin-left: 20px; background: #d5d5d5; border: #d5d5d5; color: #fff;"
				>确认入职</a-button>
				<a-button
					v-if="!confirmDisabled"
					type="primary"
					@click="handleConfirm"
					style="margin-left: 20px; background: #1478E3; border: #1478E3;"
				>确认入职</a-button>
				<a-button
					disabled
					v-if="abandonDisabled"
					type="primary"
					style="margin-left: 20px; background: #d5d5d5; border: #d5d5d5; color: #fff;"
				>候选人放弃</a-button>
				<a-button
					v-if="!abandonDisabled"
					type="primary"
					@click="handleAbandon"
					style="margin-left: 20px; background: #FD5158; border: #FD5158"
				>候选人放弃</a-button>
			</div>
		</a-affix>
		<!-- 查看 -->
		<interview-info-modal :show.sync="viewVisible" :id="viewedId" />
		<!-- <a-modal
      centered
      v-model="viewVisible"
      title="面试过程"
      width="1000px"
      :footer="null"
      wrapClassName="view-modal"
    >
      <a-table
        class="zebra"
        :columns="columns"
        :dataSource="data"
        :pagination="false"
      >
        <template v-slot:experience="experience">
          <span style="margin-right: 0">{{
            getInterviewLabel(experience.interviewType)
          }}</span>
        </template>
      </a-table>
		</a-modal>-->
		<!-- 候选人放弃弹框 -->
		<a-modal
			centered
			v-model="abandonVisible"
			title="候选人放弃"
			wrapClassName="abandon-modal"
			:bodyStyle="{
        height: '240px',
        overflowY: 'auto'
      }"
		>
			<template slot="footer">
				<a-button
					key="back"
					style="background: #E8E9E8; border: #E8E9E8; color: #333;"
					@click="abandonVisible = false"
				>取消</a-button>
				<a-button
					key="submit"
					style="background: #22B8CF;border: #22B8CF"
					type="primary"
					@click="handleAbandonSubmit"
				>确定</a-button>
			</template>
			<a-form :form="abandonForm" @submit="handleAbandonSubmit">
				<a-row>
					<a-col :span="24">
						<a-form-item label="沟通备注" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-textarea
								allowClear
								v-decorator="['notes']"
								placeholder="沟通备注"
								:autosize="{ minRows: 6 }"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
		<!-- Offer确认弹框 -->
		<a-modal
			centered
			v-model="offerVisible"
			title="Offer确认"
			wrapClassName="offer-modal"
			:bodyStyle="{
        height: '400px',
        overflowY: 'auto'
      }"
		>
			<template slot="footer">
				<a-button
					key="back"
					style="background: #E8E9E8; border: #E8E9E8; color: #333;"
					@click="offerVisible = false"
				>取消</a-button>
				<a-button
					key="submit"
					style="background: #22B8CF;border: #22B8CF"
					type="primary"
					@click="handleOfferSubmit"
				>确定</a-button>
			</template>
			<a-form :form="offerForm" @submit="handleOfferSubmit">
				<a-row>
					<a-col :span="24">
						<a-form-item label="应聘部门" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-select
								disabled
								v-decorator="['department',{ initialValue: department }]"
								placeholder="请选择"
							>
								<a-select-option value="department">{{ department }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item
							label="通知面试官"
							:colon="false"
							:label-col="{ span: 5 }"
							:wrapper-col="{ span: 16 }"
						>
							<a-select v-decorator="['toInterviewer']" placeholder="请选择">
								<a-select-option
									:value="item.value"
									v-for="item in notifyInterviewer"
									:key="item.value"
								>{{ item.label }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="通知候选人" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-select v-decorator="['toCandidate']" placeholder="请选择">
								<a-select-option
									:value="item.value"
									v-for="item in notifyCandidate"
									:key="item.value"
								>{{ item.label }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="沟通备注" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-textarea
								allowClear
								v-decorator="['notes']"
								placeholder="沟通备注"
								:autosize="{ minRows: 6 }"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
		<!-- 确认入职弹框 -->
		<a-modal
			centered
			v-model="confirmVisible"
			title="确认入职"
			wrapClassName="confirm-modal"
			:bodyStyle="{
        height: '350px',
        overflowY: 'auto'
      }"
		>
			<template slot="footer">
				<a-button
					key="back"
					style="background: #E8E9E8; border: #E8E9E8; color: #333;"
					@click="confirmVisible = false"
				>取消</a-button>
				<a-button
					key="submit"
					style="background: #22B8CF;border: #22B8CF"
					type="primary"
					@click="handleConfirmSubmit"
				>确定</a-button>
			</template>
			<a-form :form="confirmForm" @submit="handleConfirmSubmit">
				<a-row>
					<a-col :span="24">
						<a-form-item label="应聘部门" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-select
								disabled
								v-decorator="['department',{ initialValue: department }]"
								placeholder="请选择"
							>
								<a-select-option value="department">{{ department }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="上岗日期" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-date-picker
								allowClear
								style="width: 100%"
								v-decorator="['employmentdate']"
								:disabledDate="disabledDate"
								format="YYYY-MM-DD"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="沟通备注" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-textarea
								allowClear
								v-decorator="['notes']"
								placeholder="沟通备注"
								:autosize="{ minRows: 6 }"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
		<!-- 面试安排弹框 -->
		<a-modal
			centered
			v-model="interviewVisible"
			title="面试安排"
			wrapClassName="interview-modal"
			:bodyStyle="{
        height: '500px',
        overflowY: 'auto'
      }"
		>
			<template slot="footer">
				<a-button
					key="back"
					style="background: #E8E9E8; border: #E8E9E8; color: #333;"
					@click="interviewVisible = false"
				>取消</a-button>
				<a-button
					key="submit"
					style="background: #22B8CF;border: #22B8CF"
					type="primary"
					@click="handleInterviewSubmit"
				>确定</a-button>
			</template>
			<a-form :form="interviewForm" @submit="handleInterviewSubmit">
				<a-row>
					<a-col :span="24">
						<a-form-item label="应聘部门" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-select
								disabled
								v-decorator="['department',{ initialValue: department }]"
								placeholder="请选择"
							>
								<a-select-option value="department">{{ department }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="面试官" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-select v-decorator="['interviewer']" placeholder="请选择" mode="multiple">
								<a-select-option
									:value="item.userId"
									v-for="item in interviewerList"
									:key="item.userId"
								>{{ item.userName }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="面试方式" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-select v-decorator="['interviewWay']" placeholder="请选择">
								<a-select-option
									:value="item.value"
									v-for="item in interviewList"
									:key="item.value"
								>{{ item.label }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="面试日期" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-date-picker
								style="width: 100%;"
								allowClear
								v-decorator="['interview_date']"
								:disabledDate="disabledDate"
								format="YYYY-MM-DD"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="面试地点" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-textarea allowClear v-decorator="['interview_location']" placeholder="请输入面试地点" autoSize />
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item
							label="通知面试官"
							:colon="false"
							:label-col="{ span: 5 }"
							:wrapper-col="{ span: 16 }"
						>
							<a-select v-decorator="['noticeInterviewer']" placeholder="请选择">
								<a-select-option
									:value="item.value"
									v-for="item in notifyInterviewer"
									:key="item.value"
								>{{ item.label }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item
							label="通知候选人"
							:colon="false"
							:label-col="{ span: 5 }"
							:wrapper-col="{ span: 16 }"
						>
							<a-select v-decorator="['noticeCandidate']" placeholder="请选择">
								<a-select-option
									:value="item.value"
									v-for="item in notifyCandidate"
									:key="item.value"
								>{{ item.label }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="是否复试" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-select
								v-decorator="['isExamination',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择是否复试'
                      }
                    ]
                  }
                ]"
								placeholder="请选择"
							>
								<a-select-option
									:value="item.value"
									v-for="item in hasCallback"
									:key="item.value"
								>{{ item.label }}</a-select-option>
							</a-select>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="沟通备注" :colon="false" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
							<a-textarea
								allowClear
								v-decorator="['notes']"
								placeholder="沟通备注"
								:autosize="{ minRows: 6 }"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
		<!-- 面试结论 -->
		<a-modal title="面试结论" v-model="staffConcluVisible" width="630px" :destroyOnClose="true" centered>
			<template slot="footer">
				<a-button
					key="back"
					@click="staffConcluVisible = false"
					style="background: #E8E9E8; border: #E8E9E8; color: #333;"
				>取消</a-button>
				<a-button
					key="submit"
					style="background: #22B8CF;border: #22B8CF"
					type="primary"
					@click="handleConcluSubmit"
				>确定</a-button>
			</template>
			<a-form :form="concluForm" @submit="handleConcluSubmit">
				<a-row>
					<a-col :span="24">
						<a-form-item label="应聘部门" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" :colon="false">
							<span>{{ department }}</span>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item
							label="面试官"
							:label-col="{ span: 6 }"
							:wrapper-col="{ span: 14 }"
							:colon="false"
						>{{ }}</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item
							label="面试方式"
							:label-col="{ span: 6 }"
							:wrapper-col="{ span: 14 }"
							:colon="false"
						>{{ }}</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item
							label="面试时间"
							:label-col="{ span: 6 }"
							:wrapper-col="{ span: 14 }"
							:colon="false"
						>{{ }}</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item
							label="面试地点"
							:label-col="{ span: 6 }"
							:wrapper-col="{ span: 14 }"
							:colon="false"
						>{{ }}</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="面试结论" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-radio-group v-decorator="['conclu', { initialValue: 1 }]">
								<a-radio :value="1">直接通过</a-radio>
								<a-radio :value="2">通过，进入复试</a-radio>
								<a-radio :value="3">淘汰</a-radio>
							</a-radio-group>
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="面试评价" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" :colon="false">
							<a-input type="textarea" :rows="6" v-decorator="['reason']" />
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
import moment from "moment";
import { IconFont } from "@configs/scriptURL";
import {
	getCandidateInfo,
	getInterviewInfo,
	updateAffirmOffer,
	updateAffirmWork,
	multiGiveUp
} from "@api/candidate/index";
import {
	addinterviewInfo,
	UptInterviewComment
} from "@api/department/operation";
import { getLeaderInfo } from "@api/branchHC/index";
import InterviewInfoModal from "./candidateOperation/InterviewInfoModal";
const columns = [
	{
		title: "面试轮次",
		dataIndex: "interviewRounds",
		key: "interviewRound",
		width: "120px"
	},
	{
		title: "面试方式",
		dataIndex: "interviewType",
		key: "interviewType",
		width: "120px",
		scopedSlots: { customRender: "experience" }
	},
	{
		title: "面试地点",
		dataIndex: "interviewAddr",
		key: "interviewAddr",
		width: "120px"
	},
	{
		title: "是否通过",
		dataIndex: "statusDes",
		key: "statusDes",
		width: "90px"
		// scopedSlots: { customRender: "is_examination" }
	},
	{
		title: "面试官",
		dataIndex: "interviewerName",
		key: "interviewerName",
		width: "150px",
		align: "center"
	},
	{
		title: "面试日期",
		dataIndex: "interviewTime",
		key: "interviewTime",
		width: "150px",
		align: "center"
	},
	{
		title: "面试评价",
		dataIndex: "interviewComment",
		key: "interviewComment",
		width: "150px",
		align: "center"
	}
];
export default {
	name: "CandidateOperation",
	components: {
		IconFont,
		InterviewInfoModal
	},
	data() {
		return {
			offerDisabled: false,
			confirmDisabled: false,
			abandonDisabled: false,
			checkedArray: [],
			name: "",
			email: "",
			telephone: "",
			department: "",
			departmentId: null,
			talentId: null,
			candInfolist: [],
			data: [],
			columns,
			viewVisible: false,
			viewedId: null,
			abandonVisible: false,
			offerVisible: false,
			confirmVisible: false,
			interviewVisible: false,
			staffConcluVisible: false,
			item_interview: false,
			item_interview_num: null,
			abandonForm: this.$form.createForm(this),
			offerForm: this.$form.createForm(this),
			confirmForm: this.$form.createForm(this),
			interviewForm: this.$form.createForm(this),
			concluForm: this.$form.createForm(this),
			notifyInterviewer: [],
			notifyCandidate: [],
			interviewList: [],
			offerList: {
				talentId: null,
				demandId: null,
				organizeId: null,
				interviewNoticeId: null,
				talentNoticeId: null,
				notes: ""
			},
			workList: {
				talentId: null,
				demandId: null,
				organizeId: null,
				workingDate: null,
				notes: ""
			},
			giveUpList: {
				talentIdList: [],
				comments: ""
			},
			hasCallback: [],
			interviewerList: [],
			interviewConcluList: {
				orgName: ""
			}
		};
	},
	created() {
		this.getCandidateInfo();
		this.notifyInterviewer = this.$store.state.status.notifyInterviewer;
		this.notifyCandidate = this.$store.state.status.notifyCandidate;
		this.interviewList = this.$store.state.status.interviewTypes;
		this.hasCallback = this.$store.state.status.hasCallback;
	},
	methods: {
		getCandidateInfo() {
			getCandidateInfo({
				resumeId: this.$route.query.resumeId
			})
				.then(res => {
					if (res.data.code == 0) {
						console.log(res.data.data.candInfolist);
						this.candInfolist =
							res.data.data.candInfolist.candidateList;
						this.name = res.data.data.candInfolist.fullName;
						this.email = res.data.data.candInfolist.resumeMail;
						this.telephone = res.data.data.candInfolist.resumePhone;
						// console.log(this.candInfolist)
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getInterviewLabel(value) {
			const matched = this.interviewList.find(
				experience => experience.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return "暂无方式";
			}
		},
		// offer确认接口
		updateAffirmOffer() {
			updateAffirmOffer(this.offerList)
				.then(res => {
					console.log(res);
					if (res.data.code == 0) {
						this.$message.success("Offer确认成功！");
						this.department = "";
					}
				})
				.catch(err => {
					this.$message.error("Offer确认失败！");
					console.log(err);
				});
		},
		// 候选人放弃接口
		multiGiveUp() {
			multiGiveUp(this.giveUpList)
				.then(res => {
					if (res.data.code == 0) {
						this.$message.success("候选人放弃成功！");
					}
				})
				.catch(err => {
					this.$message.error("候选人放弃失败！");
					console.log(err);
				});
		},
		// 确认入职
		updateAffirmWork() {
			updateAffirmWork(this.workList)
				.then(res => {
					if (res.data.code == 0) {
						this.$message.success("确认入职成功！");
						this.getCandidateInfo();
					} else {
						this.$message.error("确认入职失败！");
					}
				})
				.catch(err => {
					this.$message.error("确认入职失败！");
					console.log(err);
				});
		},
		// 查看面试详情
		handleView(id) {
			this.viewVisible = true;
			this.viewedId = id;
		},
		// 面试安排
		handleInterview(e) {
			console.log(e);
			this.interviewVisible = true;
			this.talentId = e.talentId;
			this.department = e.orgName;
			getLeaderInfo().then(res => {
				console.log(res);
				if (res.data.code == 0) {
					this.interviewerList = res.data.data;
				}
			});
		},
		// 面试结论
		handleInterviewEvaluation(e) {
			console.log(e);
			this.staffConcluVisible = true;
			this.talentId = e.talentId;
			this.department = e.orgName;
		},
		/*
      按钮权限处理
      1、待面试    -- 可操作：候选人放弃、（面试安排）
      2、面试通过  -- 可操作：Offer确认、候选人放弃
      3、面试淘汰  -- 可操作：无
      4、面试放弃  -- 可操作：（面试安排）
      5、Offer放弃 -- 可操作：Offer确认
      6、入职放弃  -- 可操作：Offer确认
      7、待入职    -- 可操作：确认入职、候选人放弃
      8、已入职    -- 可操作：无
    */
		/*
      面试安排不需要操作
      根据勾选返回的最后一个下标，实时获取数据数组中对应的状态码值，
      根据状态码值更新按钮的权限控制
    */
		onCheckboxChange(checkedValues) {
			this.checkedArray = checkedValues;
			this.btnControl(checkedValues);
		},
		btnControl(val) {
			let arr = val;
			let talentIdList = [];
			if (arr.length > 0) {
				arr.forEach(item => {
					let status = this.candInfolist[item].status;
					let talentId = this.candInfolist[item].talentId;
					// 候选人放弃
					talentIdList.push(talentId);
					this.giveUpList.talentIdList = talentIdList;
					// offer确认
					this.offerList.talentId = this.candInfolist[item].talentId;
					this.offerList.demandId = this.candInfolist[item].demandId;
					this.offerList.organizeId = this.candInfolist[
						item
					].organizeId;
					this.department = this.candInfolist[item].orgName;
					// 确认入职
					this.workList.talentId = this.candInfolist[item].talentId;
					this.workList.demandId = this.candInfolist[item].demandId;
					this.workList.organizeId = this.candInfolist[
						item
					].organizeId;
					// 按钮状态判断
					switch (status) {
						case 30:
							this.offerDisabled = true;
							this.confirmDisabled = true;
							break;

						case 31:
							this.offerDisabled = true;
							this.confirmDisabled = true;
							this.abandonDisabled = true;
							break;

						case 40:
							this.offerDisabled = true;
							this.abandonDisabled = true;
							break;

						case 41:
							this.offerDisabled = true;
							this.confirmDisabled = true;
							this.abandonDisabled = true;
							break;

						case 50:
							this.offerDisabled = true;
							break;

						case 51:
							this.confirmDisabled = true;
							this.abandonDisabled = true;
							break;

						case 60:
							this.offerDisabled = true;
							this.confirmDisabled = true;
							this.abandonDisabled = true;
							break;

						case 61:
							this.confirmDisabled = true;
							this.abandonDisabled = true;
							break;

						default:
							return;
					}
				});
			} else {
				// 选择为空时，重置
				this.giveUpList.talentIdList = [];
				this.offerList.talentId = null;
				this.offerList.demandId = null;
				this.offerList.organizeId = null;
				this.department = "";

				this.workList.talentId = null;
				this.workList.demandId = null;
				this.workList.organizeId = null;

				// console.log(this.giveUpList)
				this.offerDisabled = false;
				this.confirmDisabled = false;
				this.abandonDisabled = false;
			}
		},
		// 候选人放弃按钮
		handleAbandon() {
			if (this.checkedArray.length === 0) {
				this.$message.warning("请选择至少一个需要操作的职位");
			} else {
				this.abandonVisible = true;
			}
		},
		// 候选人放弃
		handleAbandonSubmit(e) {
			e.preventDefault();
			this.abandonForm.validateFields((error, values) => {
				if (error) {
					console.log("error", error);
					return;
				} else {
					this.giveUpList.comments = values.notes;
					this.multiGiveUp();
				}
			});
			this.abandonVisible = false;
		},
		handleOffer() {
			if (this.checkedArray.length === 1) {
				this.offerVisible = true;
			} else if (this.checkedArray.length === 0) {
				this.$message.warning("请选择需要操作的职位");
				this.offerList.talentId = null;
				this.offerList.demandId = null;
				this.offerList.organizeId = null;
				this.department = "";
			} else {
				this.$message.error("只能选择一个职位进行操作");
				this.offerList.talentId = null;
				this.offerList.demandId = null;
				this.offerList.organizeId = null;
				this.department = "";
			}
		},
		handleOfferSubmit(e) {
			e.preventDefault();
			this.offerForm.validateFields((error, values) => {
				if (error) {
					console.log("error", error);
					return;
				} else {
					console.log(values);
					this.offerList.interviewNoticeId = values.toCandidate;
					this.offerList.talentNoticeId = values.toInterviewer;
					this.offerList.notes = values.notes;

					this.updateAffirmOffer();
				}
			});
			this.offerVisible = false;
		},
		// 确认入职
		handleConfirm() {
			if (this.checkedArray.length === 1) {
				this.confirmVisible = true;
			} else if (this.checkedArray.length === 0) {
				this.$message.warning("请选择需要操作的职位");
				this.workList.talentId = null;
				this.workList.demandId = null;
				this.workList.organizeId = null;
			} else {
				this.$message.error("只能选择一个职位进行操作");
				this.workList.talentId = null;
				this.workList.demandId = null;
				this.workList.organizeId = null;
			}
		},
		handleConfirmSubmit(e) {
			e.preventDefault();
			this.confirmForm.validateFields((error, values) => {
				if (error) {
					console.log("error", error);
					return;
				} else {
					console.log(values);
					this.workList.workingDate = values.employmentdate.valueOf();
					this.workList.notes = values.notes;
					this.updateAffirmWork();
				}
			});
			this.confirmVisible = false;
		},
		handleInterviewSubmit(e) {
			e.preventDefault();
			this.interviewForm.validateFields((error, values) => {
				if (error) {
					console.log("error", error);
					return;
				} else {
					console.log(values);
					addinterviewInfo({
						interviewerId: values.interviewer,
						talentId: this.talentId,
						interviewType: values.interviewWay,
						interviewBeginTime: values.interview_date.valueOf(),
						interviewAddr: values.interview_location,
						interviewNoticeId: values.noticeInterviewer,
						talentNoticeId: values.noticeCandidate,
						isExamination: values.isExamination,
						comments: values.notes
					})
						.then(res => {
							if (res.data.code == 0) {
								this.$message.success("面试安排成功!");
								this.department = "";
							} else {
								this.$message.error("面试安排失败!");
							}
						})
						.catch(err => {
							this.$message.error("面试安排失败!");
							console.log(err);
						});
				}
			});
			this.interviewVisible = false;
		},
		handleConcluSubmit(e) {
			e.preventDefault();
			this.concluForm.validateFields((error, values) => {
				if (error) {
					console.log("error", error);
					return;
				} else {
					console.log(values);
					UptInterviewComment({
						status: values.conclu,
						talentId: this.talentId,
						interviewComment: values.reason
					})
						.then(res => {
							if (res.data.code == 0) {
								this.$message.success("面试结论提交成功!");
								this.department = "";
							} else {
								this.$message.error("面试结论提交失败!");
							}
						})
						.catch(err => {});
				}
			});
			this.staffConcluVisible = false;
		},
		disabledDate(current) {
			// Can not select days before today and today
			return current && current < moment().endOf("day");
		},
		mouseEnter(conclusion, index) {
			// console.log(conclusion, index)
			if (conclusion === 30 || conclusion === 31) {
				this.item_interview = true;
			}
			this.item_interview_num = index;
		},
		mouseLeave(conclusion, index) {
			this.item_interview = false;
		}
	}
};
</script>

<style scoped>
.candidate-operation {
	background: #fff;
	height: auto;
	min-height: 100%;
	position: relative;
}
.candidate-info {
	width: 926px;
	margin: 0 auto;
}
.candidate-info-item {
	margin-top: 15px;
	/* margin-bottom: 80px; */
}
.name {
	display: block;
	color: #000;
	font-size: 18px;
	margin: 15px 0;
	text-align: center;
}
.iconfont {
	color: #636364;
	font-size: 14px;
}
.info-item {
	width: 444px;
	height: 210px;
	background: #f7f8fa;
	border-radius: 3px;
	margin-bottom: 20px;
	position: relative;
	overflow: hidden;
	cursor: pointer;
	transition: 0.5s;
}
.info-item:hover {
	box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.11);
}
.label-wait {
	width: 90px;
	height: 20px;
	background-color: #fcf2e1;
	color: #ff960e;
	text-align: center;
	transform: rotate(-45deg);
	position: absolute;
	top: 15px;
	left: -20px;
}
.label-eliminate {
	width: 90px;
	height: 20px;
	background-color: #feebec;
	color: #fd5158;
	text-align: center;
	transform: rotate(-45deg);
	position: absolute;
	top: 15px;
	left: -20px;
}
.label-pass {
	width: 90px;
	height: 20px;
	background-color: #ddf6e4;
	color: #55d379;
	text-align: center;
	transform: rotate(-45deg);
	position: absolute;
	top: 15px;
	left: -20px;
}
.item-department {
	margin: 32px 33px 29px 33px;
	font-size: 16px;
	font-weight: bold;
	color: #333;
}
.item-demand {
	margin-left: 32px;
	margin-bottom: 16px;
	font-size: 14px;
	color: #666;
}
.item-position {
	margin-bottom: 16px;
	font-size: 14px;
	color: #666;
}
.item-occurrence-date {
	margin-left: 32px;
	margin-bottom: 16px;
	font-size: 14px;
	color: #666;
}
.item-interview {
	color: #1478e3;
	margin: 20px 40px;
	margin-left: 0;
	opacity: 0;
}
.item-interview-active {
	opacity: 1;
	transition: 0.5s;
}
.item-interview:hover {
	color: #136bc9;
}
.footer {
	background-color: #fff !important;
	text-align: center;
	line-height: 80px;
	box-shadow: 0px 7px 20px 1px rgba(0, 0, 0, 0.18);
	position: absolute;
	width: 100%;
	bottom: 0;
}
a {
	text-decoration-line: none;
}
.ant-calendar-picker {
	width: 280px;
}
</style>
<style>
.candidate-operation .ant-checkbox-wrapper {
	width: 444px;
	height: 210px;
}
.candidate-operation .ant-checkbox {
	position: absolute;
	right: 20px;
	top: 10px;
	z-index: 5;
}
.candidate-operation .ant-checkbox + span {
	padding: 0;
}
.view-modal .ant-table-thead > tr > th {
	border-bottom: none;
}
.view-modal .ant-table-tbody > tr > td {
	border-bottom: none;
	border-left: 1px solid #f0f0f0;
}
.view-modal .ant-table-tbody > tr > td:first-child {
	border-left: none;
}
.view-modal .ant-modal-header {
	height: 48px;
	background: rgba(246, 247, 251, 1);
}
.view-modal .ant-modal-title {
	font-size: 14px;
	color: #000;
}
.interview-modal .ant-modal-header {
	height: 48px;
	background: rgba(246, 247, 251, 1);
}
.interview-modal .ant-modal-title {
	font-size: 14px;
	color: #000;
}
.interview-modal #interview_location,
.interview-modal #notes {
	resize: none;
}
.abandon-modal .ant-modal-header {
	height: 48px;
	background: rgba(246, 247, 251, 1);
}
.abandon-modal .ant-modal-title {
	font-size: 14px;
	color: #000;
}
.abandon-modal #notes {
	resize: none;
}
.offer-modal .ant-modal-header {
	height: 48px;
	background: rgba(246, 247, 251, 1);
}
.offer-modal .ant-modal-title {
	font-size: 14px;
	color: #000;
}
.offer-modal #notes {
	resize: none;
}
.confirm-modal .ant-modal-header {
	height: 48px;
	background: rgba(246, 247, 251, 1);
}
.confirm-modal .ant-modal-title {
	font-size: 14px;
	color: #000;
}
.confirm-modal #notes {
	resize: none;
}
</style>