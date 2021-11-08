<template>
	<div class="demand-content-container">
				<a-form :form="staffForm" @submit="handleOrganSubmit">
					<a-row class="add-demand-top">
						<a-col :span="18" ><span style="padding-bottom:15px;" >新增需求</span></a-col>
						<a-divider/>
					</a-row>
					
						<a-row class="add-demand-content">
						<a-col :span="12" v-if="!switchRequired">
							<a-form-item
								label="客户需求编号"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
							<a-input
									allowClear
									v-decorator="[
										'externalNum',
										{
											rules: [
												
											],
											initialValue: echoList.externalNum
										}
									]"
									placeholder="请输入客户需求编号"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item
								label="职位名称"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-input
									allowClear
									v-decorator="[
										'positionName',
										{
											rules: [
												{
													required: true,
													message: '请输入职位名称'
												}
											],
											initialValue: echoList.positionName
										}
									]"
									placeholder="请输入职位名称"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item
								label="职位类别"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
							<a-cascader
								
								:options="jobList"
								@change="handleJobChange"
								placeholder="请选择职位类别"
								:allowClear="false"
								v-decorator="[
									'jobType',
									{
										rules: [
											{
												required: true,
												message: '请选择职位类别'
											}
										],
										initialValue: echoList.jobType  
									}
								]"
								:getPopupContainer="triggerNode => triggerNode.parentNode"
							/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="事业部" :colon="false" :label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }">
					<a-select
						
						v-decorator="[
							'groupId',
							{
								rules: [
									{
										required: true,
										message: '请选择事业部'
									}
								]
							}
						]"
						allowClear
						placeholder="请选择事业部"
						:getPopupContainer="triggerNode => triggerNode.parentNode"
					>
						<a-select-option
							:value="item.sysOrgId"
							v-for="item in primaryDepartList"
							:key="item.sysOrgId"
						>{{ item.orgName }}</a-select-option>
					</a-select>
				</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item
								label="紧急程度"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
							   <a-radio-group style="padding-left:10px;"  :options="levelList"     @change="onChangeRadio"
							   v-decorator="[
										'emergencyLevel',
										{
											rules: [
												{
													required: true,
													message: '请选择紧急程度！'
												},
											],
											initialValue: radioValue  
										}
									]"
							   >
										
										</a-radio-group>
							</a-form-item>
						</a-col>
						
						<a-col :span="12">
							<a-form-item
								label="工作城市"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-cascader
									:options="CityInfo"
									@change="handleCityChange"
									placeholder="请选择工作城市"
									:allowClear="false"
									changeOnSelect
									v-decorator="[
										'areaCode',
										{
											rules: [
												{
													required: true,
													message: '请选择工作城市'
												}
											],
											initialValue: echoList.areaCode  
										}
									]"
									:getPopupContainer="triggerNode => triggerNode.parentNode"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12" v-if="!switchRequired">
							<a-form-item
								label="详细地址"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-input
									allowClear
									v-decorator="[
										'work_place',
										{ 
											rules: [
												{
													required: true,
													message: '请输入详细地址'
												}
											],
											initialValue: echoList.work_place }
									]"
									placeholder="请输入详细地址"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item
								label="招聘人数"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-input-number
									style="width: 100%;"
									:min="1"
									:max="state == 2 ? echoList.number : Infinity"
									:disabled="state == 2"
									v-decorator="[
										'number',
										{
											rules: [
												{
													type: 'number',
													message: '请输入数字！'
												},
												{
													required: true,
													message: '请输入招聘人数！'
												}
											],
											initialValue: echoList.number
										}
									]"
									placeholder="请输入招聘人数"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item
								label="职级职等"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
									allowClear
									:disabled="state == 2"
									v-decorator="[
										'evaluation_standard',
										{
											rules: [
												{
													required: true,
													message: '请选择职级职等'
												}
											],
											initialValue:
												echoList.evaluation_standard
										}
									]"
									placeholder="请选择职级职等"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item"
										v-for="item in rankList"
										:key="item"
										>{{ item }}</a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item label="HC部门" :colon="false" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
					<a-select
						:style="{
							display: 'inline-block',
							width: 'calc(50% - 5px)',
							marginBottom: '0px'
						}"
						allowClear
						showSearch
						:filter-option="filterOption"
						v-decorator="[
							'company',
							{
								rules: [
									{
										required: true,
										message: '请选择需求公司和需求部门'
									}
								]
							}
						]"
						placeholder="请选择需求公司"
						:getPopupContainer="
							triggerNode => {
								return triggerNode.parentNode || document.body;
							}
						"
						@change="getStructureList"
					>
						<a-select-option
							v-for="item in companyData"
							:key="item.customId"
							:value="item.customId"
						>{{ item.customName }}</a-select-option>
					</a-select>
					<a-cascader
						:style="{
							display: 'inline-block',
							width: 'calc(50% - 5px)',
							marginLeft: '10px',
							marginBottom: '0px'
						}"
						:fieldNames="{
							label: 'orgName',
							value: 'orgId',
							children: 'children'
						}"
						
						:options="organizeList"
						changeOnSelect
						allowClear
						 :show-search="{ filter }"
						placeholder="请选择需求部门"
						:field-names="{ label: 'setupContent', value: 'setupContent',children: 'children'  }"
						v-decorator="[
							'hc_department',
							{
								rules: [
									{
										required: true,
										message: '请选择需求公司和需求部门'
									}
								]
							}
						]"
						:getPopupContainer="
							triggerNode => {
								return triggerNode.parentNode || document.body;
							}
						"
					/>
				</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item
								label="面试地址"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-input
									allowClear
									v-decorator="[
										'interviewAddress',
										{
											rules: [
												{
												//	required: true,
													message: '请输入面试地址' 
												}
											],
											initialValue: echoList.interviewAddress
										}
									]"
									placeholder="请输入面试地址"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="12">
							<a-form-item
								label="需求周期"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-date-picker
									v-decorator="[
										'enddate',
										{
											rules: [
												{
													required: true,
													message: '请选择需求周期'
												}
											],
											initialValue: echoList.enddate
										}
									]"
									:style="{
										
										width: '100%'
									}"
									format="YYYY-MM-DD"
									:getCalendarContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								
									placeholder="开始日期"
								/>
								
							
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="简历筛选人"
								:colon="false"
								:label-col="{ span: 3 }"
								:wrapper-col="{ span: 19 }"
								
							>
								<a-select
									allowClear
									mode="multiple"
									
									@blur="handleResumeBlur"
									@focus="handleResumeFocus"
									@search="handleResumeSearch"
									:filter-option="filterOption"
									style="margin-left:20px"
									v-decorator="[
										'resumeFilter',
										{
											rules: [
												{
													required: true,
													message: '请选择简历筛选人'
												}
											],
											
										}
									]"
									placeholder="请选择简历筛选人"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item.userId"
										v-for="item in optionFilterList"
										:key="item.userId"
										>{{ item.userName }}<span style="color: #4480EE;margin-left: 10px;"
                    >[{{ item.mail }}]</span
                  ></a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="初试官"
								:colon="false"
								:label-col="{ span: 3 }"
								:wrapper-col="{ span: 19 }"
							>
								<a-select
									allowClear
									@blur="handleInterviewertBlur"
									@focus="handleInterviewertFocus"
									@search="handleInterviewertSearch"
									:filter-option="filterOption"
									style="margin-left:20px;"
									mode="multiple"
									v-decorator="[
										'interviewer',
										{
											rules: [
												{
													required: true,
													message: '请选择初试官'
												}
											],
											
										}
									]"
									placeholder="请选择初试官"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item.userId"
										v-for="item in optionInterList"
										:key="item.userId"
										>{{ item.userName }}<span style="color: #4480EE;margin-left: 10px"
                    >[{{ item.mail }}]</span
                  ></a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="复试官"
								:colon="false"
								:label-col="{ span: 3 }"
								:wrapper-col="{ span: 19 }"
							>
								<a-select
									allowClear
									mode="multiple"
									@blur="handleInterviewertBlur"
									@focus="handleInterviewertFocus"
									@search="handleInterviewertSearch"
									:filter-option="filterOption"
									style="margin-left:20px"
									v-decorator="[
										'reInterviewer',
										{
											rules: [
												{
													required: true,
													message: '请选择复试官'
												}
											],
											
										}
									]"
									placeholder="请选择复试官"
									:getPopupContainer="
										triggerNode => {
											return (
												triggerNode.parentNode ||
												document.body
											);
										}
									"
								>
									<a-select-option
										:value="item.userId"
										v-for="item in optionInterList"
										:key="item.userId"
										>{{ item.userName }}<span style="color: #4480EE;margin-left: 10px"
                    >[{{ item.mail }}]</span
                  ></a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24">
							<a-form-item
								label="抄送人"
								:colon="false"
								:label-col="{ span: 3 }"
								:wrapper-col="{ span: 19 }"
							>
								<a-select
									allowClear
									mode="multiple"
									@blur="handleInterviewertBlur"
									@focus="handleInterviewertFocus"
									@search="handleInterviewertSearch"
									:filter-option="filterOption"
									style="margin-left:20px"
									v-decorator="[
										'copyToInterviewer',
										{
											rules: [
												{
													required: true,
													message: '请选择抄送人'
												}
											],
											
										}
									]"
									placeholder="请选择抄送人"
									:getPopupContainer="triggerNode => triggerNode.parentNode"
								>
									<a-select-option
										:value="item.userId"
										v-for="item in optionInterList"
										:key="item.userId"
										>{{ item.userName }}<span style="color: #4480EE;margin-left: 10px"
                    >[{{ item.mail }}]</span
                  ></a-select-option
									>
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
							
								label="任职资格"
								:colon="false"
								style="text-align:left"
								:label-col="{ span: 3 }"
								:wrapper-col="{ span: 19 }"
							>
								<a-textarea
									allowClear
									v-decorator="[
										'job_description',
										{
											rules: [
											{
													required: true,
													message: '请输入职位职责'
												}
										],
											initialValue:
												echoList.job_description
										}
									]"
									placeholder="请输入任职资格"
									:autosize="{ minRows: 4 }"
									style="resize: none;margin-left:20px;"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24" >
							<a-form-item
								label="职位职责"
								:colon="false"
								:label-col="{ span: 3 }"
								:wrapper-col="{ span: 19 }"
							>
								<a-textarea
									allowClear
									v-decorator="[
										'jobRequirements',
										{
											initialValue:
												echoList.jobRequirements
										}
									]"
									placeholder="请输入岗位职责"
									:autosize="{ minRows: 4 }"
									style="resize: none;margin-left:20px;"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="24" v-if="!switchRequired">
							<a-form-item
								label="备注"
								:colon="false"
								:label-col="{ span: 3 }"
								:wrapper-col="{ span: 19 }"
							>
								<a-textarea
									allowClear
									v-decorator="[
										'remarks',
										{
											initialValue:
												echoList.remarks
										}
									]"
									placeholder="请输入备注"
									:autosize="{ minRows: 4 }"
									style="resize: none;margin-left:20px;margin-bottom:30px;"
								/>
							</a-form-item>
						</a-col>
					</a-row>
				</a-form>
			<a-affix :offsetBottom="0">
				<div class="bottom">
					<a-button class="bottom-btn" @click="handleOrganSubmit">保存</a-button>
					<a-button class="bottom-btn" @click="handleOrganSubmit">保存并复制</a-button>
					<a-button class="bottom-btn" @click="handleOrganSubmit">保存并新增</a-button>
					<a-button class="bottom-btn" @click="handleOrganSubmit">发布</a-button>

				</div>
			</a-affix>
	</div>
</template>

<script>
import moment from 'moment';
import  "./DemandInfo.css";
import {
	getDemand,
	getLeaderInfo,
	getUserInfo,
	getDemandPartitionList,
	saveDemandPartition,
	updateDemandPartition,
	deleteDemandPartition,
	reviewDemand,
	checkDemand,
	postDemandPartition,
	getTreeList
} from '@api/branchHC/index';
import { getDemandList, getStructureList } from '@api/demandBranch/index';
import { getPrimaryDepartment } from "@api/branchHC/index";
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('status');
import  CityInfo from "@configs/city.js"
export default {
	data() {
		return {
			defaultModel: 2,
			loading: false,
			data: [],
			CityInfo,
			expandedRowKeys: [],
			jobList: [],
			state: null,
			demandId: null,
			emergencyLevel: null,
			partitionId: null,
			disabled: true,
			switchRequired: false,
			demondtotal: 0,
			waitSplitNum: 0,
			splitVisible: false,
			reviewVisible: false,
			toReviewVisible: false,
			staffForm: this.$form.createForm(this),
			reviewForm: this.$form.createForm(this),
			toReviewForm: this.$form.createForm(this),
			jobTypesList: [],
			workyearsList: [],
			educationList: [],
			resourceList: [],
			notificationList: [],
			approvalList: [],
			listQuery: {
				externalNum:null,//客户需求名称
				positionName: null,
				groupId:null,//事业部
				demandNum: null,
				organizeId: [],
				emergencyLevel: null,
				workPlace: '',
				resumeFilter: [],
				interviewer: [],
				reInterviewer: [],
				copyTo: [], // 抄送人
				interviewAddress: '',// 面试地点
				areaCode: [], // 城市id集合
				areaCodeName: [], // 城市名称  
				jobType: [], // 职位类别id集合
				jobTypeName: [], // 职位类别名称  
				taskEnd: '',
				jobRequirements: '',//任职要求
				jobDeions:'',
				// demandId: null,
				level :'',
				coments:'',//备注
			},
			echoList: {
				externalNum:null,
				positionName: null,
				jobType: null,
				groupId:null,
				emergencyLevel: null,
				areaCode: null,
				work_place: null,
				number: null,
				evaluation_standard:null,
				company:null,
				hc_department:null,
				interviewAddress: null,
				enddate: null,
				resumeFilter: null,
				interviewer: null,
				reInterviewer: null,
				copyToInterviewer: null,
				job_description: null,
				jobRequirements: null,
				remarks:null,
				
				// department: null,
				// positionNature: null,
				// education: null,
				// enddate: null,
				// library_type: null,
				// evaluation_standard: null,
				
				
			},
			filterList: [],
			optionFilterList: [],
			optionInterList: [],
			interviewerList: [],
			reviewerList: [],
			customId: null,
			organizeId: null,
			organizeList: [],
			list: {
				name: '',
				num: '',
				kind: '',
				years: '',
				wage: '',
				filterman: '',
				resource: '',
				details: '',
				requres: '',
				department: '',
				location: '',
				edu: '',
				interviewer: '',
				grade: ''
			},
			departmentList: [],
			primaryDepartList: [],
			radioValue:1,//紧急程度
			companyData:[],//HC部门
		};
	},
	computed: {
		...mapState({
			educations: state => state.educationRequires,
			jobTypes: state => state.jobTypes,
			experiences: state => state.jobExperiences,
			rankList: state => state.rankList,
			levelList:state => state.emergencyLevels
		})
	},
	created() {
		this.getDemand();
		this.getTreeListInit() // 获取职位类别
		this.getDemandPartitionList();
		this.getPrimaryDepartmentInit();
		this.getDemandList();//HC部门
		this.getLeaderInfo();//面试官信息
	},
	methods: {
		// 事业部
		async getPrimaryDepartmentInit(){
			const res = await getPrimaryDepartment()
			this.primaryDepartList = res.data.data
		},
		// 紧急程度
		onChangeRadio(e){

		},
		// HC部门
		getDemandList() {
			getDemandList()
				.then(res => {
					this.companyData = res.data.data.CompanyList;
				})
				.catch(err => {
					console.log(err);
				});
		},
		//HC 部门
		filterOption(input, option){
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
		},
	filter(inputValue, path) {
      return path.some(option => option.children[0].orgName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
	},
		// 面试官
		getLeaderInfo() {
			getLeaderInfo()
				.then(res => {
					this.filterList = res.data.data;
					this.interviewerList = res.data.data;
          let newInterviewerList = []
          let newReInterviewerList = []
          let newCopyToInterviewerList = []
          let newResumeFilterList = []
          newInterviewerList = this.interviewerList.filter(item => {
            return this.echoList.interviewer.indexOf(item.userId) !== -1
          })
          newReInterviewerList = this.interviewerList.filter(item => {
            return this.echoList.reInterviewer.indexOf(item.userId) !== -1
          })
          newCopyToInterviewerList = this.interviewerList.filter(item => {
            return this.echoList.copyToInterviewer.indexOf(item.userId) !== -1
          })
          newResumeFilterList = this.filterList.filter(item => {
            return this.echoList.resumeFilter.indexOf(item.userId) !== -1
          })
          this.optionInterList = [...new Set([...newInterviewerList,...newReInterviewerList,...newCopyToInterviewerList])]
          this.optionFilterList = newResumeFilterList
				})
				.catch(err => {
					console.log(err);
				});
		},
		moment,
		async handleSubmit() {
			try {
				const res = await postDemandPartition({
					demandId: Number(this.$route.query.demandId)
				})
				if(res.data.code === 0) {
					// 拆分完成跳转
					this.$message.success(res.data.data);
					this.$router.replace({
						name: 'HC',
						query: {
							demandId: Number(this.$route.query.demandId)
						}
					})
				}else {
					this.$message.error(res.data.mesg)
				}
			}
			catch(error){
				console.log(error)
			}
		},
		async getTreeListInit(){
				const res = await getTreeList()
				this.jobList = res.data.data
		},
		getJobTypesLabel(value) {
			const matched = this.jobTypes.find(
				jobTypes => jobTypes.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return '未匹配到工作性质';
			}
		},
		getEducationLabel(value) {
			const matched = this.educations.find(
				education => education.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return '未匹配到学历';
			}
		},
		getExperienceLabel(value) {
			const matched = this.experiences.find(
				experience => experience.value === value
			);
			if (matched) {
				return matched.label;
			} else {
				return '未匹配到经验';
			}
		},
		getDemand() {
			getDemand({
				demandId: Number(this.$route.query.demandId)
			})
				.then(res => {
					console.log(res.data.data.demand);
					this.organizeId = res.data.data.demand.organizeId;
					this.echoList.emergencyLevels =
						res.data.data.demand.emergencyLevel;
					this.customId = res.data.data.demand.customId;
					this.state = res.data.data.demand.state;
					console.log(this.state)
					this.departmentList = res.data.data.demand.organizeIdList
					this.emergencyLevel = res.data.data.demand.emergencyLevel;
				})
				.catch(err => {
					console.log(err);
				});
		},
		// HC部门下级
		getStructureList() {
			getStructureList({
				customId: this.customId
			})
				.then(res => {
					console.log(res);
					if (res.data.data == null) {
						this.organizeList = [];
					} else {
						this.organizeList = res.data.data.orgList;
						console.log(this.organizeList)
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getUserInfo() {
			getUserInfo()
				.then(res => {
					if (res.data.code == 0) {
						console.log(res);
						this.reviewerList = res.data.data.userList.list;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getDemandPartitionList() {
			this.loading = true;
			getDemandPartitionList({
				demandId: Number(this.$route.query.demandId)
			})
				.then(res => {
					this.demondtotal = res.data.data.count.xqAll;
					this.waitSplitNum = res.data.data.count.tobeSplit;
					this.data = res.data.data.demandPartitionList;
					this.loading = false;
				})
				.catch(err => {
					console.log(err);
					this.loading = false;
				});
		},
		saveDemandPartition() {
			return saveDemandPartition(this.listQuery)
				.then(res => {
					console.log(res);
					if (res.data.code === 0) {
						this.$message.success(res.data.data);
					} else {
						this.$message.error(res.data.mesg);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		updateDemandPartition() {
			return updateDemandPartition(this.listQuery)
				.then(res => {
					console.log(res);
					if (res.data.code === 0) {
						this.$message.success(res.data.data);
					} else {
						this.$message.error(res.data.mesg);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 删除拆分
		deleteDemandPartition(id) {
			deleteDemandPartition({
				partitionId: id
			})
				.then(res => {
					if (res.data.code == 0) {
						this.getDemand();
						this.getDemandPartitionList();
						this.$message.success(res.data.data);
					} else {
						this.$message.error(res.data.mesg);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 需求审核提交
		reviewDemand(values) {
			reviewDemand({
				demandId: Number(this.$route.query.demandId),
				demandAuditor: values.demand_reviewer,
				notificationMode: values.notice
			})
				.then(res => {
					// console.log(res)
					if (res.data.code == 0) {
						this.$message.success(res.data.data);
						this.getDemand();
						this.getDemandPartitionList();
					} else {
						this.$message.error(res.data.mesg);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 审核拆分
		checkDemand(values) {
			checkDemand({
				demandId: Number(this.$route.query.demandId),
				isExamine: values.passed_audit,
				remarks: values.jobRequirements
			})
				.then(res => {
					if (res.data.code == 0) {
						this.$message.success(res.data.data);
						this.$router.push({
							name: 'DemandReview',
							query: {
								demandId: Number(this.$route.query.demandId)
							}
						});
					} else {
						this.$message.error(res.data.mesg);
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		handleTabsChange(e) {
			console.log(e);
			this.defaultModel = e;
			if (e == 1) {
				this.$router.push({
					name: 'DemandInfo',
					query: {
						demandId: Number(this.$route.query.demandId),
						statusDemand: this.$route.query.statusDemand == 5 ? 5 : undefined
					}
				});
			} else if (e == 2) {
				this.$router.push({
					name: 'DemandContent',
					query: {
						demandId: Number(this.$route.query.demandId)
					}
				});
			} else if (e == 3) {
				this.$router.push({
					name: 'DemandReview',
					query: {
						demandId: Number(this.$route.query.demandId)
					}
				});
			} else if (e == 4) {
				this.$router.push({
					name: 'DemandTrack',
					query: {
						demandId: Number(this.$route.query.demandId)
					}
				});
			} else {
				return;
			}
		},
		// 表格展开
		expand(expanded, record) {
			this.expandedRowKeys = []; // 重置展开节点，只展开当前点击的节点（内部数据调用模板，无法做到同时几个内层表格数据直接缓存在页面）
			if (expanded) {
				this.expandedRowKeys = [record.partitionId];
			}
			console.log(expanded, record);
		},
		// 需求拆分
		demandSplit() {
			console.log('需求拆分');
			this.splitVisible = true;
			// this.levelList = this.$store.state.status.emergencyLevels;
			this.workyearsList = this.$store.state.status.jobExperiences;
			this.educationList = this.$store.state.status.educationRequires;
			this.resourceList = this.$store.state.status.HCResourceTypes;
			this.jobTypesList = this.$store.state.status.jobTypes;
			this.getLeaderInfo();
			this.getStructureList();
			this.listQuery = {};
			this.echoList = {};
			this.partitionId = ''
			// this.echoList.department
		},
		// 修改拆分内容
		reviseClick(item) {
			console.log(item);
			this.splitVisible = true;

			// this.levelList = this.$store.state.status.emergencyLevels;
			this.workyearsList = this.$store.state.status.jobExperiences;
			this.educationList = this.$store.state.status.educationRequires;
			this.resourceList = this.$store.state.status.HCResourceTypes;
			this.jobTypesList = this.$store.state.status.jobTypes;
			this.getLeaderInfo();
			this.getStructureList();

			this.partitionId = item.partitionId;
			this.echoList.positionName = item.positionName
				? item.positionName
				: null;
			this.echoList.number = item.recruitNum ? item.recruitNum : null;
			// this.echoList.department =
			// 	item.organizeIdList !== null ? item.organizeIdList : [];
			this.echoList.positionNature = item.jobNature
				? item.jobNature
				: null;
			this.echoList.emergencyLevel = item.emergencyLevel
				? item.emergencyLevel
				: null;
			this.echoList.work_place = item.workPlace ? item.workPlace : null;
			this.echoList.workyears = item.workSeniority
				? Number(item.workSeniority)
				: null;
			this.echoList.min_wage = item.minSalary
				? item.minSalary / 1000
				: null;
			this.echoList.max_wage = item.maxSalary
				? item.maxSalary / 1000
				: null;
			this.echoList.education = item.education ? item.education : null;
			this.echoList.resumeFilter =
				item.resumeFilterList !== null ? item.resumeFilterList : [];
			this.echoList.interviewer =
				item.interviewerList !== null ? item.interviewerList : [];
			this.echoList.reInterviewer =
				item.reInterviewerList !== null ? item.reInterviewerList : [];
			this.echoList.copyToInterviewer =
				item.copyToList !== null ? item.copyToList : [];
			this.echoList.areaCode =
				item.areaCodeList !== null ? item.areaCodeList : [];
			this.echoList.jobType =
				item.jobTypeList !== null ? item.jobTypeList : [];
			this.echoList.interviewAddress = item.interviewAddress ? item.interviewAddress : null;
			this.echoList.enddate = item.taskEnd
				? this.moment(item.taskEnd)
				: null;
			this.echoList.library_type = item.resBankType
				? item.resBankType
				: null;
			this.echoList.evaluation_standard = item.evaluationCriteria
				? item.evaluationCriteria
				: null;
			this.echoList.job_description = item.jobDeions
				? item.jobDeions
				: null;
			this.echoList.jobRequirements = item.jobRequirements
				? item.jobRequirements
				: null;
			console.log(this.echoList);
		},
		// 删除需求拆分
		delClick(item) {
			this.$confirm({
				title: '确认删除这条需求分拆吗?',
				content: '删除后将不可恢复！',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk:() => {
					this.deleteDemandPartition(item.partitionId);
				},
				onCancel() {
					this.$message.warning('已取消');
				}
			});
		},
		// 职位类别
		handleJobChange(value,selectedOptions) {
			this.listQuery.jobType = value;
			this.listQuery.jobTypeName = selectedOptions.map(o => o.label).join('/');
		},
		// 工作城市
		handleCityChange(value,selectedOptions) {
			this.listQuery.areaCode = value;
			this.listQuery.areaCodeName = selectedOptions.map(o => o.label).join('/');
		},
		// 保存、修改
		handleOrganSubmit(e) {
			e.preventDefault();

			this.staffForm.validateFields((error, fieldsValue) => {
				if (error) {
					console.log('error', error);
					return
				}
				const values = {
					...fieldsValue,
					enddate: fieldsValue['enddate']
						? fieldsValue['enddate'].format('YYYY-MM-DD')
						: undefined
				};
				
				this.listQuery.externalNum = values.externalNum;//客户需求编号
				this.listQuery.jobType = this.listQuery.jobType == undefined ? this.echoList.jobType : this.listQuery.jobType
				this.listQuery.jobTypeName = this.listQuery.jobTypeName ? this.listQuery.jobTypeName : this.echoList.jobTypeName
				this.listQuery.areaCode = this.listQuery.areaCode == undefined ? this.echoList.areaCode : this.listQuery.areaCode
				this.listQuery.areaCodeName = this.listQuery.areaCodeName ? this.listQuery.areaCodeName : this.echoList.areaCodeName
				// this.listQuery.demandId = Number(this.$route.query.demandId);
				this.listQuery.positionName = values.positionName;
				this.listQuery.groupId = Number(values.groupId);
				let organizeId =
					values.hc_department[values.hc_department.length - 1];
				this.listQuery.demandNum = values.number;
				// this.listQuery.company = values.company;
				// let departmentId =
				// 	values.department[values.department.length - 1];
				this.listQuery.organizeId = organizeId;
				// this.listQuery.jobNature = values.positionNature;
				this.listQuery.emergencyLevel = Number(values.emergencyLevel);
				this.listQuery.workPlace = values.work_place;
				// this.listQuery.education = values.education;
				this.listQuery.resumeFilter = values.resumeFilter;
				this.listQuery.interviewer = values.interviewer;
				this.listQuery.reInterviewer = values.reInterviewer;
				this.listQuery.copyTo = values.copyToInterviewer; // 抄送人
				this.listQuery.interviewAddress = values.interviewAddress; // 面试地点
				this.listQuery.taskEnd = values.enddate;
				this.listQuery.level= values.evaluation_standard;
				this.listQuery.jobDeions = values.job_description;
				this.listQuery.jobRequirements = values.jobRequirements;
				this.listQuery.coments = values.remarks;
				if (this.partitionId) {
					// 修改需求拆分
					console.log('修改');
					this.listQuery.partitionId = this.partitionId;
					this.updateDemandPartition()
						.then(() => {
							this.splitVisible = false;
							this.getDemand()
							this.getDemandPartitionList();
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					// 新增需求拆分
					console.log('保存',this.listQuery);
					this.saveDemandPartition()
						.then(() => {
							// this.splitVisible = false;
							this.getDemand()
							this.getDemandPartitionList();
							// this.$router.push({
							// 	name: "HC",
							// });
						})
						.catch(err => {
							console.log(err);
						});
				}
			});
		},
		// 隐藏非必选项
		onSwitchChange(checked) {
			this.switchRequired = checked;
		},
		// 提交审核
		handleReview() {
			this.reviewVisible = true;
			this.notificationList = this.$store.state.status.notificationTypes;
			this.getUserInfo();
		},
		// 审核
		toReview() {
			this.toReviewVisible = true;
			this.approvalList = this.$store.state.status.approvalTypes;
		},
		// 提交审核
		handleReviewSubmit(e) {
			e.preventDefault();
			this.reviewForm.validateFields((error, values) => {
				if (error) {
					console.log('error', error);
					return;
				} else {
					this.reviewDemand(values);
				}
			});
			this.reviewVisible = false;
		},
		// 审核
		toReviewSubmit(e) {
			e.preventDefault();
			this.toReviewForm.validateFields((error, values) => {
				if (error) {
					console.log('error', error);
					return;
				} else {
					this.checkDemand(values);
					this.toReviewVisible = false;
				}
			});
		},
		handleResumeBlur(){
			this.optionFilterList = this.filterList.slice(0,20)
		},
		handleResumeFocus(){
      this.optionFilterList = this.filterList.slice(0,20)
		},
		handleResumeSearch(e){
			if(!this.timer) {
        this.timer = setTimeout(()=> {
          this.searchValue(e)
          this.timer = null
        },300)
      }
		},
		handleInterviewertBlur(){
			this.optionInterList = this.interviewerList.slice(0,20)
		},
		handleInterviewertFocus(){
      this.optionInterList = this.interviewerList.slice(0,20)
		},
		handleInterviewertSearch(e){
			if(!this.timer) {
        this.timer = setTimeout(()=> {
          this.searchUserValue(e)
          this.timer = null
        },300)
      }
		},
   
    searchValue(value) {
      let optionFilterList_ = this.filterList.filter(item => item.userName.indexOf(value) > -1);
      if (optionFilterList_.length > 20 || value === "") {
        optionFilterList_ = optionFilterList_.slice(0, 20);
      }
      this.$nextTick(()=> {
        this.optionFilterList = optionFilterList_
      })
    },
    searchUserValue(value) {
      let optionInterList_ = this.interviewerList.filter(item => item.userName.indexOf(value) > -1);
      if (optionInterList_.length > 20 || value === "") {
        optionInterList_ = optionInterList_.slice(0, 20);
      }
      this.$nextTick(()=> {
        this.optionInterList = optionInterList_
      })
    },
		visibleChange(record) {
			console.log(record);
			this.list.name = record.positionName;
			this.list.num = record.recruitNum;
			this.list.kind = record.jobNature;
			this.list.years = record.workSeniority;
			this.list.wage = `${record.minSalary / 1000}K ~ ${record.maxSalary /
				1000}K`;
			this.list.filterman = record.resumeFilterName;
			this.list.resource = '默认';
			this.list.details = record.jobDeions;
			this.list.department = record.organizeName;
			this.list.location = record.workPlace;
			this.list.edu = record.educationName;
			this.list.interviewer = record.interviewerName;
			this.list.grade = record.evaluationCriteria;
		},
		handlePrev() {
			this.$router.push({ path: 'demandInfo' });
		},
		onShowSizeChange(current, pageSize) {
			console.log(current, pageSize);
		}
	}
};
</script>

<style scoped>
.ant-select-selection--multiple .ant-select-selection__rendered {
	margin-left: 5px !important;
	margin-bottom: -3px !important;
	height: auto !important;
	max-height: 32px !important;
	overflow: auto !important;
	overflow-x: hidden !important;
}
.ant-select ul,
.ant-select ol {
	/* display: flex !important; */
}
.ant-select-selection--multiple > ul > li,
.ant-select-selection--multiple .ant-select-selection__rendered > ul > li {
	margin-top: 3px !important;
	height: 32px !important;
	line-height: 32px !important;
	font-size: 14px !important;
	/* width: auto !important; */
	/* min-width: 146px !important; */
}
.ant-select-search--inline .ant-select-search__field__wrap{
   max-width: 0px !important;
}
.ant-select-selection__rendered::-webkit-scrollbar {
	/*滚动条整体样式*/
	height: 5px !important;
}
.ant-select-selection__rendered::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px !important;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
	background: lightskyblue !important;
}
.ant-select-selection__rendered::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .1) !important;
	border-radius: 10px !important;
	background: #ededed !important;
}


</style>