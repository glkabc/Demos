<template>
  <div class="demand-content-container">
    <a-form :form="staffForm" @submit="handleOrganSubmit">
      <a-row class="add-demand-top">
        <a-col :span="18"
          ><span style="display: block; margin-bottom: 10px"
            >新增需求</span
          ></a-col
        >
        <!-- <a-col
							:span="6"
							style="text-align: right; margin-bottom: 10px;"
						> -->
        <!-- <a-switch size="small" @change="onSwitchChange" />
							<span style="color: #999; font-size: 14px;">
								隐藏非必选项
							</span> -->
        <!-- </a-col> -->
        <a-divider />
      </a-row>

      <a-row class="add-demand-content">
        <a-col :span="12">
          <a-form-item
            label="事业部"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-select
              show-search
              :filter-option="filterOption"
              @select="selectOrgansize"
              v-decorator="[
                'groupId',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择事业部',
                    },
                  ],
                },
              ]"
              allowClear
              placeholder="请选择事业部"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            >
              <a-select-option
                :value="item.sysOrgId"
                v-for="item in primaryDepartList"
                :key="item.sysOrgId"
                >{{ item.orgName }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="需求部门"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 14 }"
          >
            <el-cascader
              :options="departmentList"
              @change="handleDepartmentChange"
              :props="{
                label: 'orgName',
                value: 'orgId',
                children: 'children',
                emitPath:false,
                checkStrictly: true
              }"
              :style="{
                display: 'inline-block',
                width: 'calc(50% + 5px)',
              }"
              :show-all-levels='false'
              v-decorator="[
                'hc_department',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择需求部门',
                    },
                  ],
                  initialValue: echoList.hc_department,
                },
              ]"
              clearable
              filterable
              :append-to-body = 'false'
            ></el-cascader>
            <!-- <a-cascader
              :show-search="{ filters }"
              :options="departmentList"
              :display-render="displayRender"
              @change="handleDepartmentChange"
              placeholder="请选择需求部门"
              changeOnSelect
              allowClear
              :style="{
                display: 'inline-block',
                width: 'calc(50% + 5px)',
              }"
              :fieldNames="{
                label: 'orgName',
                value: 'orgId',
                children: 'children',
              }"
              :field-names="{
                label: 'setupContent',
                value: 'setupContent',
                children: 'children',
              }"
              v-decorator="[
                'hc_department',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择需求部门',
                    },
                  ],
                  initialValue: echoList.hc_department,
                },
              ]"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            >
              <template
                slot="displayRender"
                slot-scope="{ labels, selectedOptions }"
              >
                <span
                  v-for="(label, index) in labels"
                  :key="selectedOptions[index].value"
                >
                  <span v-if="index === labels.length - 1 && index > 0">
                    {{ label }}
                  </span>
                </span>
              </template>
            </a-cascader> -->
            <a-input
              type="text"
              style="width: calc(50% - 15px); margin-left: 5px"
              placeholder="产品线"
              v-decorator="['department']"
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
                      message: '请输入职位名称',
                    },
                  ],
                  initialValue: echoList.positionName,
                },
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
              :show-search="{ filter }"
              :options="jobList"
              @change="handleJobChange"
              placeholder="请选择职位类别"
              allowClear
              v-decorator="[
                'jobType',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择职位类别',
                    },
                  ],
                  initialValue: echoList.jobType,
                },
              ]"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="需求编号"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-input
              allowClear
              v-decorator="[
                'externalNum',
                {
                  rules: [],
                  initialValue: echoList.externalNum,
                },
              ]"
              placeholder="请输入客户需求编号"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="紧急程度"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-radio-group
              style="padding-left: 10px"
              :options="levelList"
              @change="onChangeRadio"
              v-decorator="[
                'emergencyLevel',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择紧急程度！',
                    },
                  ],
                  initialValue: radioValue,
                },
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
              :show-search="{ filter }"
              :options="CityInfo"
              @change="handleCityChange"
              placeholder="请选择工作城市"
              allowClear
              :change-on-select='true'
              v-decorator="[
                'areaCode',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择工作城市',
                    },
                  ],
                  initialValue: echoList.areaCode,
                },
              ]"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
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
                      message: '请输入详细地址',
                    },
                  ],
                  initialValue: echoList.work_place,
                },
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
              style="width: 100%"
              :min="1"
              :max="state == 2 ? echoList.number : Infinity"
              :disabled="state == 2"
              v-decorator="[
                'number',
                {
                  rules: [
                    {
                      type: 'number',
                      message: '请输入数字！',
                    },
                    {
                      required: true,
                      message: '请输入招聘人数！',
                    },
                  ],
                  initialValue: echoList.number,
                },
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
              show-search
              :filter-option="filterOption"
              allowClear
              :disabled="state == 2"
              v-decorator="[
                'evaluation_standard',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择职级职等',
                    },
                  ],
                  initialValue: echoList.evaluation_standard,
                },
              ]"
              placeholder="请选择职级职等"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode || document.body;
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
                      message: '请输入面试地址',
                    },
                  ],
                  initialValue: echoList.interviewAddress,
                },
              ]"
              placeholder="请输入面试地址"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="有效期至"
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
                      message: '请选择需求周期',
                    },
                  ],
                  initialValue: echoList.enddate,
                },
              ]"
              :style="{
                width: '100%',
              }"
              format="YYYY-MM-DD"
              :getCalendarContainer="
                (triggerNode) => {
                  return triggerNode.parentNode || document.body;
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
              option-filter-prop="label"
              style="margin-left: 20px"
              v-decorator="[
                'resumeFilter',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择简历筛选人',
                    },
                  ],
                },
              ]"
              placeholder="请选择简历筛选人"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode || document.body;
                }
              "
            >
              <a-select-option
                :value="item.userId"
                v-for="item in optionFilterList"
                :key="item.userId"
                :label="item.userName + '<' + item.mail + '>'"
                >{{ item.userName }}
                <span style="color: #4480ee; margin-left: 10px"
                  >[{{ item.mail }}]</span
                >
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <IconFont
          type="icon-jia"
          @click="showIntervier"
          class="icon"
          style="
            font-size: 25px;
            height: 32px;
            margin-left: -30px;
            line-height: 40px;
            color: #38bdd3;
            display: flex;
          "
        />
        <a-col
          :span="20"
          :offset="3"
          class="add-intervier"
          v-if="IsShowIntervier"
          style="padding-left: 30px"
        >
          <a-col :span="4" style="margin-right: 15px">
            <a-select
              @select="selectCompany"
              v-decorator="[
                'companyId',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择公司',
                    },
                  ],
                },
              ]"
              allowClear
              placeholder="请选择公司"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            >
              <a-select-option
                :value="item.customId"
                v-for="item in companyList"
                :key="item.customId"
                >{{ item.customName }}</a-select-option
              >
            </a-select>
          </a-col>
          <a-col :span="4" style="margin-right: 15px">
            <a-tree-select
              allowClear
              showSearch
              treeNodeFilterProp="title"
              placeholder="请选择"
              treeDefaultExpandAll
              :treeData="companyInfoList"
              @change="handleCompanyInfoChange"
              v-decorator="[
                'companyInfo',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择组织机构',
                    },
                  ],
                },
              ]"
              :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
            >
            </a-tree-select>
          </a-col>
          <a-col :span="4" style="margin-right: 15px">
            <a-input
              type="text"
              placeholder="请输入名称"
              v-model="intervierName"
            />
          </a-col>
          <a-col :span="4">
            <a-input
              type="email"
              placeholder="请输入邮箱"
              v-model="intervierMail"
            />
          </a-col>
          <a-col :span="1" :offset="1">
            <a-button type="primary" class="bottom-btn" @click="sureIntervier"
              >确定</a-button
            >
          </a-col>
          <a-col :span="1" :offset="2">
            <a-button type="default" @click="cancelIntervier">取消</a-button>
          </a-col>
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
              option-filter-prop="label"
              style="margin-left: 20px"
              mode="multiple"
              v-decorator="[
                'interviewer',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择初试官',
                    },
                  ],
                },
              ]"
              placeholder="请选择初试官"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode || document.body;
                }
              "
            >
              <a-select-option
                :value="item.userId"
                v-for="item in optionInterList"
                :key="item.userId"
                :label="item.userName + '<' + item.mail + '>'"
                >{{ item.userName
                }}<span style="color: #4480ee; margin-left: 10px"
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
              option-filter-prop="label"
              style="margin-left: 20px"
              v-decorator="[
                'reInterviewer',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择复试官',
                    },
                  ],
                },
              ]"
              placeholder="请选择复试官"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode || document.body;
                }
              "
            >
              <a-select-option
                :value="item.userId"
                v-for="item in optionInterList"
                :key="item.userId"
                :label="item.userName + '<' + item.mail + '>'"
                >{{ item.userName
                }}<span style="color: #4480ee; margin-left: 10px"
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
              option-filter-prop="label"
              style="margin-left: 20px"
              v-decorator="[
                'copyToInterviewer',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择抄送人',
                    },
                  ],
                },
              ]"
              placeholder="请选择抄送人"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            >
              <a-select-option
                :value="item.userId"
                v-for="item in optionInterList"
                :key="item.userId"
                :label="item.userName + '<' + item.mail + '>'"
                >{{ item.userName
                }}<span style="color: #4480ee; margin-left: 10px"
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
            style="text-align: left"
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
                      message: '请输入职位职责',
                    },
                  ],
                  initialValue: echoList.job_description,
                },
              ]"
              placeholder="请输入任职资格"
              :rows='4'
              style="resize: none; margin-left: 20px"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
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
                  initialValue: echoList.jobRequirements,
                },
              ]"
              placeholder="请输入岗位职责"
              :rows='4'
              style="resize: none; margin-left: 20px"
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
                'comments',
                {
                  initialValue: echoList.comments,
                },
              ]"
              placeholder="请输入备注"
              :rows='4'
              style="resize: none; margin-left: 20px; margin-bottom: 30px"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-affix :offsetBottom="0" v-if="isEdit == undefined">
      <div class="bottom">
        <a-button class="bottom-btn" @click="handleOrganSubmit(1)"
          >保存</a-button
        >
        <!-- <a-button class="bottom-btn" @click="handleOrganSubmit"
          >保存并复制</a-button
        >
        <a-button class="bottom-btn" @click="handleOrganSubmit"
          >保存并新增</a-button
        > -->
        <a-button class="bottom-btn" @click="handleOrganSubmit(2)"
          >发布</a-button
        >
      </div>
    </a-affix>
  </div>
</template>

<script>
import moment from "moment";
import "./DemandInfo.css";
import { IconFont } from "../../../../configs/scriptURL";
import { Trim } from "../../../../trim/trim";
import {
  getDemand,
  getLeaderInfo,
  getUserInfo,
  getDemandPartitionList,
  saveDemandPartition,
  updateDemandPartition,
  postDemandPartition,
  getTreeList,
  addDemand,
  getAllCustomOrg,
  getOrgInfo,
  getComponyInfo,
} from "@api/branchHC/index";
import {
  getDemandList,
  getStructureList,
  addUserInfo,
} from "@api/demandBranch/index";
import { getAllCustomOrgList } from "@api/settings/index";
import { getPrimaryDepartment } from "@api/branchHC/index";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import CityInfo from "@configs/city.js";
import addIntervier from "./addIntervier";
import { transcode } from "buffer";
// import { delete } from 'vue/types/umd';
export default {
  name: "DemandInfo",
  props: ["isEdit", "formListQurey"],
  data() {
    return {
      companyList: [], //公司
      companyInfoList: [], //公司部门
      companyId: null,
      companyInfo: "",
      setVal: {},
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
        externalNum: null, //客户需求名称
        positionName: null,
        groupId: null, //事业部
        demandNum: null,
        organizeId: [],
        emergencyLevel: null,
        workPlace: "",
        resumeFilter: [],
        interviewer: [],
        reInterviewer: [],
        copyTo: [], // 抄送人
        interviewAddress: "", // 面试地点
        areaCode: [], // 城市id集合
        areaCodeName: [], // 城市名称
        jobType: [], // 职位类别id集合
        jobTypeName: [], // 职位类别名称
        taskEnd: "",
        jobRequirements: "", //任职要求
        jobDeions: "",
        level: "",
        comments: "", //备注
        type: "",
        hc_department: [],
        productLine: "",
      },
      echoList: {
        externalNum: null,
        positionName: null,
        jobType: null,
        groupId: null,
        emergencyLevel: null,
        areaCode: [],
        work_place: null,
        number: null,
        evaluation_standard: undefined,
        company: null,
        hc_department: null,
        interviewAddress: null,
        enddate: null,
        resumeFilter: null,
        interviewer: null,
        reInterviewer: null,
        copyToInterviewer: null,
        job_description: null,
        jobRequirements: null,
        comments: null,
        department: null,
        jobTypeName: null,
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
        name: "",
        num: "",
        kind: "",
        years: "",
        wage: "",
        filterman: "",
        resource: "",
        details: "",
        requres: "",
        department: "",
        location: "",
        edu: "",
        interviewer: "",
        grade: "",
      },
      departmentList: [],
      primaryDepartList: [],
      radioValue: 1, //紧急程度
      companyData: [], //HC部门
      IsShowIntervier: false, //新增面试官
      intervierName: "",
      intervierMail: "",
      isShowError: false,
    };
  },
  components: {
    // addIntervier,
    IconFont,
  },
  computed: {
    ...mapState({
      educations: (state) => state.educationRequires,
      jobTypes: (state) => state.jobTypes,
      experiences: (state) => state.jobExperiences,
      rankList: (state) => state.rankList,
      levelList: (state) => state.emergencyLevels,
    }),
  },
  created() {
    // this.getDemand();
    this.getTreeListInit(); // 获取职位类别
    // this.getAllCustomOrgInit(); //需求部门
    this.getDemandPartitionList();
    this.getPrimaryDepartmentInit();
    this.getDemandList(); //HC部门
    this.getLeaderInfo(); //面试官信息
    if (this.isEdit) {
      this.listQuery = this.formListQurey;
      console.log(this.listQuery.primaryDepartList);
    }
    this.getAllOrgInfo();
  },
  methods: {
    displayRender(value) {
      // console.log(value,'display')
      try {
        if(value.selectedOptions[0].children.length > 0 && value.labels.length === 1) {
          this.isShowError = true
          return value.labels = []
        }
      } catch (err) {
        console.log(err);
      }
      return value.labels[value.labels.length - 1];
    },
    // 过滤数组
    // convert (arr) {
    //    const newArr = arr.filter(item => item.type==1)
    //     return newArr.map(item => {
    //         if (item.children) {
    //             item.children = this.convert(item.children)
    //         }
    //         return item
    //     })
    // },

    treeFilter(data, func) {
      // 使用map复制一下节点，避免修改到原树
      return data
        .map((node) => ({ ...node }))
        .filter((node) => {
          node.children = node.children && this.treeFilter(node.children, func);
          // console.log(node)
          if (node.children.length === 0) delete node.children;
          return func(node) || (node.children && node.children.length);
        });
    },
    selectOrgansize(value) {
      // console.log(value);
      getAllCustomOrgList(value).then((res) => {
        if (res.data.data.orgList) {
          let newList = res.data.data.orgList;
          newList.map((item) => {
            item.orgId = item.falseId;
            item.type = 1;
          });
          newList = JSON.parse(
            JSON.stringify(newList).replace(/customName/g, "orgName")
          );
          const arr = this.treeFilter(newList, (node) => node.type == 1);
          this.departmentList = arr;
          console.log(this.departmentList)
          this.departmentList.map(item=>{
              if(item.children){
                item.disabled = true
              }
          })
        } else {
          this.departmentList = [];
          this.echoList.hc_department = ''
        }

        // console.log(this.departmentList);
      });
    },
    tmpListInit(val) {
      let arr = [];
      if (val.length !== 0) {
        val.forEach((item) => {
          let obj = {};
          obj.key = item.orgId;
          obj.value = item.orgId;
          obj.title = item.orgName;
          if (item.children.length >= 1) {
            obj.children = this.tmpListInit(item.children);
          }
          arr.push(obj);
        });
      }
      return arr;
    },
    // 新增面试官
    showIntervier() {
      this.intervierName = "";
      this.intervierMail = "";
      this.IsShowIntervier = !this.IsShowIntervier;
    },
    //获取公司
    getAllOrgInfo() {
      getOrgInfo().then((res) => {
        if (res.data.code == 0) {
          this.companyList = res.data.data.CompanyList;
        }
      });
    },
    selectCompany(e) {
      this.companyId = e;
      console.log(this.companyId);
      getComponyInfo({ customId: e }).then((res) => {
        if (res.data.code == 0) {
          let newTmp = this.tmpListInit(res.data.data.orgList);
          this.companyInfoList = newTmp;
        } else {
          this.companyInfoList = [];
        }
      });
    },
    handleCompanyInfoChange(val) {
      this.companyInfo = val;
    },
    // 确定
    sureIntervier() {
      if (this.companyId == null) {
        this.$message.error("请选择公司");
        return;
      }
      if (this.companyInfo == "" || this.companyInfo == undefined) {
        this.$message.error("请选择需求部门");
        return;
      }
      if (!this.intervierName || this.intervierName == "") {
        this.$message.error("请输入成员名称");
        return;
      }
      if (!this.intervierMail || this.intervierMail == "") {
        this.$message.error("请输入邮箱");
        return;
      }
      var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
      if (!pattern.test(this.intervierMail)) {
        this.$message.error("请输入正确的邮箱");
        return;
      }
      this.addUser(
        this.intervierName,
        this.intervierMail,
        this.companyId,
        this.companyInfo
      );
    },
    // 取消
    cancelIntervier() {
      this.IsShowIntervier = false;
      this.companyInfo = "";
    },
    addUser(userName, email, customId, customOrgId) {
      addUserInfo({
        userName: userName,
        mail: email,
        customId: customId,
        customOrgId: customOrgId,
      }).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message.success(res.data.data);
          this.IsShowIntervier = false;
          this.companyInfo = "";
          this.getLeaderInfo();
        } else {
          this.$message.error(res.data.mesg);
        }
      });
    },
    handleLeader() {
      this.getLeaderInfo(); //面试官信息
    },
    // 事业部
    async getPrimaryDepartmentInit() {
      const res = await getPrimaryDepartment();
      this.primaryDepartList = res.data.data;
    },
    // 紧急程度
    onChangeRadio(e) {},
    // HC部门
    getDemandList() {
      getDemandList()
        .then((res) => {
          this.companyData = res.data.data.CompanyList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //HC 部门
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    filter(inputValue, path) {
      // return path.some(
      //   (option) =>
      //     option.children[0].orgName
      //       .toLowerCase()
      //       .indexOf(inputValue.toLowerCase()) > -1
      // );
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    },
    filters(inputValue, path) {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
    // 面试官
    getLeaderInfo() {
      getLeaderInfo()
        .then((res) => {
          this.filterList = res.data.data;
          this.interviewerList = res.data.data;
          let newInterviewerList = [];
          let newReInterviewerList = [];
          let newCopyToInterviewerList = [];
          let newResumeFilterList = [];
          console.log(this.echoList.resumeFilter, "this.echoList.resumeFilter");
          newInterviewerList = this.interviewerList.filter((item) => {
            return this.echoList.interviewer.indexOf(item.userId) !== -1;
          });
          newReInterviewerList = this.interviewerList.filter((item) => {
            return this.echoList.reInterviewer.indexOf(item.userId) !== -1;
          });
          newCopyToInterviewerList = this.interviewerList.filter((item) => {
            return this.echoList.copyToInterviewer.indexOf(item.userId) !== -1;
          });
          newResumeFilterList = this.filterList.filter((item) => {
            return this.echoList.resumeFilter.indexOf(item.userId) !== -1;
          });
          this.optionInterList = [
            ...new Set([
              ...newInterviewerList,
              ...newReInterviewerList,
              ...newCopyToInterviewerList,
            ]),
          ];
          this.optionFilterList = newResumeFilterList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    moment,
    async handleSubmit() {
      try {
        const res = await postDemandPartition({
          demandId: Number(this.$route.query.demandId),
        });
        if (res.data.code === 0) {
          // 拆分完成跳转
          this.$message.success(res.data.data);
          this.$router.replace({
            name: "HC",
            query: {
              demandId: Number(this.$route.query.demandId),
            },
          });
        } else {
          this.$message.error(res.data.mesg);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getTreeListInit() {
      const res = await getTreeList();
      this.jobList = res.data.data;
    },
    // async getAllCustomOrgInit() {
    //   const res = await getAllCustomOrg();
    //   // this.departmentList = res.data.data.orgList;
    //   let newList = res.data.data.orgList;
    //   newList.map((item) => {
    //     item.orgId = item.falseId;
    //   });
    //   newList = JSON.parse(
    //     JSON.stringify(newList).replace(/customName/g, "orgName")
    //   );
    //   this.departmentList = newList;
    // },
    getJobTypesLabel(value) {
      const matched = this.jobTypes.find(
        (jobTypes) => jobTypes.value === value
      );
      if (matched) {
        return matched.label;
      } else {
        return "未匹配到工作性质";
      }
    },
    getEducationLabel(value) {
      const matched = this.educations.find(
        (education) => education.value === value
      );
      if (matched) {
        return matched.label;
      } else {
        return "未匹配到学历";
      }
    },
    getExperienceLabel(value) {
      const matched = this.experiences.find(
        (experience) => experience.value === value
      );
      if (matched) {
        return matched.label;
      } else {
        return "未匹配到经验";
      }
    },
    getDemand() {
      getDemand({
        demandId: Number(this.$route.query.demandId),
      })
        .then((res) => {
          console.log(res.data.data.demand);
          this.organizeId = res.data.data.demand.organizeId;
          this.echoList.emergencyLevels = res.data.data.demand.emergencyLevel;
          this.customId = res.data.data.demand.customId;
          this.state = res.data.data.demand.state;
          console.log(this.state);
          this.departmentList = res.data.data.demand.organizeIdList;
          this.emergencyLevel = res.data.data.demand.emergencyLevel;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserInfo() {
      getUserInfo()
        .then((res) => {
          if (res.data.code == 0) {
            console.log(res);
            this.reviewerList = res.data.data.userList.list;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDemandPartitionList() {
      this.loading = true;
      getDemandPartitionList({
        demandId: Number(this.$route.query.demandId),
      })
        .then((res) => {
          this.demondtotal = res.data.data.count.xqAll;
          this.waitSplitNum = res.data.data.count.tobeSplit;
          this.data = res.data.data.demandPartitionList;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    saveDemandPartition() {
      return saveDemandPartition(this.listQuery)
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message.success(res.data.data);
          } else {
            this.$message.error(res.data.mesg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateDemandPartition() {
      return updateDemandPartition(this.listQuery)
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message.success(res.data.data);
          } else {
            this.$message.error(res.data.mesg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 职位类别
    handleJobChange(value, selectedOptions) {
      if (value.length > 0) {
        this.listQuery.jobType = value;
        this.listQuery.jobTypeName = selectedOptions
          .map((o) => o.label)
          .join("/");
      } else {
        this.listQuery.jobType = value;
      }
    },
    //需求部门
    handleDepartmentChange(value, selectedOptions) {
      // console.log(value,'选择')
      // let listId = selectedOptions.map(item => {
      //   return item.customId
      // })
      this.listQuery.hc_department = value
      console.log(value)
      console.log(selectedOptions)
      // this.listQuery.hc_departmentName = selectedOptions
      //   .map((o) => o.label)
      //   .join("/");
    },
    // 工作城市
    handleCityChange(value, selectedOptions) {
      if (value.length > 0) {
        this.listQuery.areaCode = value;
        this.listQuery.areaCodeName = selectedOptions
          .map((o) => o.label)
          .join("/");
      } else {
        this.listQuery.areaCode = value;
      }
    },
    // 保存、修改
    handleOrganSubmit(index) {
      //  e.preventDefault();
      // console.log(index);
      this.staffForm.validateFields((error, fieldsValue) => {
        console.log(fieldsValue);
        if (error) {
          console.log("error", error);
          return;
        }
        const values = {
          ...fieldsValue,
          enddate: fieldsValue["enddate"]
            ? fieldsValue["enddate"].format("YYYY-MM-DD")
            : undefined,
        };
        // console.log(values, "values保存");
        this.listQuery.externalNum = Trim(values.externalNum); //客户需求编号
        this.listQuery.jobType == undefined
          ? this.echoList.jobType
          : this.listQuery.jobType;
        this.listQuery.jobTypeName = this.listQuery.jobTypeName
          ? this.listQuery.jobTypeName
          : this.echoList.jobTypeName;
        this.listQuery.areaCode =
          this.listQuery.areaCode == undefined
            ? this.echoList.areaCode
            : this.listQuery.areaCode;
        this.listQuery.areaCodeName = this.listQuery.areaCodeName
          ? this.listQuery.areaCodeName
          : this.echoList.areaCodeName;
        this.listQuery.positionName = Trim(values.positionName);
        this.listQuery.groupId = Number(values.groupId);
        this.listQuery.demandNum = values.number;
        let organizeId = values.hc_department;

        // console.log(organizeId)
        if (this.isShowError) {
          this.$message.warning('请选择需求部门', 2)
          return ;
        }
        this.isShowError = false
        // if (organizeId.indexOf("100") != -1) {
        //   organizeId = "";
        //   this.$message.error("请选择需求部门");
        //   return;
        // }
        this.listQuery.organizeId =
          Number(organizeId) > 1000
            ? -(Number(organizeId) - 1000)
            : Number(organizeId);

        this.listQuery.emergencyLevel = Number(values.emergencyLevel);
        this.listQuery.workPlace = Trim(values.work_place);
        // this.listQuery.education = values.education;
        this.listQuery.resumeFilter = values.resumeFilter;
        this.listQuery.interviewer = values.interviewer;
        this.listQuery.reInterviewer = values.reInterviewer;
        this.listQuery.copyTo = values.copyToInterviewer; // 抄送人
        this.listQuery.interviewAddress = Trim(values.interviewAddress); // 面试地点
        this.listQuery.taskEnd = values.enddate;
        this.listQuery.level = values.evaluation_standard;
        this.listQuery.jobRequirements = Trim(values.job_description);
        this.listQuery.jobDeions = Trim(values.jobRequirements);
        this.listQuery.comments = Trim(values.comments);
        this.listQuery.productLine = Trim(values.department);
        this.listQuery.hc_department = this.listQuery.hc_department;
        console.log(this.listQuery, "后端接收");
        if (index == 2) {
          console.log("发布");
          this.listQuery.type = "release";
          addDemand(this.listQuery)
            .then(() => {
              // this.splitVisible = false;
              // // this.getDemand();
              // this.getDemandPartitionList();
              this.$message.success("发布需求成功！");
              //保存接口，并且跳转本页面
              if (this.$route.query.copyType == "部门HC") {
                this.$router.replace({
                  name: "HC",
                });
              } else {
                this.$router.go(-1);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (index == 1) {
          console.log("我走了保存");
          this.listQuery.type = "save";
          console.log("保存", this.listQuery);
          addDemand(this.listQuery).then((res) => {
            if (res.data.code === 0) {
              this.$message.success("新增需求成功！");
              //保存接口，并且跳转本页面
              if (this.$route.query.copyType == "部门HC") {
                this.$router.replace({
                  name: "HC",
                });
              } else {
                this.$router.go(-1);
              }
            } else {
              this.$message.error(res.data.mesg || "新增需求失败", 2);
            }
          });
        }
      });
    },
    handleResumeBlur() {
      this.optionFilterList = this.filterList.slice(0, 100);
    },
    handleResumeFocus() {
      this.optionFilterList = this.filterList.slice(0, 100);
    },
    handleResumeSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchValue(e);
          this.timer = null;
        }, 300);
      }
    },
    handleInterviewertBlur() {
      this.optionInterList = this.interviewerList.slice(0, 100);
    },
    handleInterviewertFocus() {
      this.optionInterList = this.interviewerList.slice(0, 100);
    },
    handleInterviewertSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchUserValue(e);
          this.timer = null;
        }, 300);
      }
    },

    searchValue(value) {
      let optionFilterList_ = this.filterList.filter(
        (item) =>
          item.userName.indexOf(value) > -1 || item.mail.indexOf(value) > -1
      );
      if (optionFilterList_.length > 20 || value === "") {
        optionFilterList_ = optionFilterList_.slice(0, 100);
      }
      this.$nextTick(() => {
        this.optionFilterList = optionFilterList_;
      });
    },
    searchUserValue(value) {
      let optionInterList_ = this.interviewerList.filter(
        (item) =>
          item.userName.indexOf(value) > -1 || item.mail.indexOf(value) > -1
      );
      if (optionInterList_.length > 20 || value === "") {
        optionInterList_ = optionInterList_.slice(0, 100);
      }
      this.$nextTick(() => {
        this.optionInterList = optionInterList_;
      });
    },
  },
};
</script>

<style scoped>
.ant-col-12 {
  height: 59px;
}
.add-intervier {
  margin-top: -15px;
  height: 56px;
  line-height: 56px;
  background: #f8fafc;
}
.ant-select-selection--multiple .ant-select-selection__rendered {
  margin-left: 5px !important;
  margin-bottom: -3px !important;
  height: auto !important;
  max-height: 32px !important;
  overflow: auto !important;
  overflow-x: hidden !important;
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
.ant-select-search--inline .ant-select-search__field__wrap {
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
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1) !important;
  border-radius: 10px !important;
  background: #ededed !important;
}
.icon {
  position: absolute;
  top: 360px;
  right: 4%;
}
>>>.el-input__inner{
  height: 32px;
}
</style>
