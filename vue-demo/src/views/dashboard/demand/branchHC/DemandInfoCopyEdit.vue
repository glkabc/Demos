<template>
  <div class="demand-content-container">
    <a-form  :form="staffForm" @submit="handleOrganSubmit">
      <a-row class="add-demand-top">
        <a-col :span="18"
          ><span style="display: block; margin-bottom: 10px"
            >变更需求</span
          ></a-col
        >
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
              disabled
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
            <a-cascader
              :options="departmentList"
              @change="handleDepartmentChange"
              disabled
              placeholder="请选择需求部门"
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
                  <span v-if="index === labels.length - 1">
                    {{ label }}
                  </span>
                  <!--  <span v-else @click="onChange"> {{ label }} / </span> -->
                </span>
              </template>
            </a-cascader>
            <a-input
              type="text"
              style="width: calc(50% - 15px); margin-left: 10px"
              placeholder="产品线"
              v-decorator="['productLine']"
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
              disabled
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
              :options="jobList"
              @change="handleJobChange"
              placeholder="请选择职位类别"
              :allowClear="false"
              disabled
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
              disabled
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
              :options="CityInfo"
              @change="handleCityChange"
              placeholder="请选择工作城市"
              allowClear
              changeOnSelect
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
              disabled
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
              allowClear
              disabled
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
                      message: '请选择有效期至',
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
              placeholder="有效期至"
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
                  initialValue: echoList.resumeFilter,
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
                >{{ item.userName
                }}<span style="color: #4480ee; margin-left: 10px"
                  >[{{ item.mail }}]</span
                ></a-select-option
              >
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
              show-search
                @change="companyChange"
                :filter-option="filterOption"
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
                  initialValue: echoList.interviewer,
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
                  initialValue: echoList.reInterviewer,
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
               option-filter-prop="label"
                @search="handleInterviewertSearch"
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
                  initialValue: echoList.copyToInterviewer,
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
                'jobRequirements',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入职位职责',
                    },
                  ],
                  initialValue: echoList.jobRequirements,
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
                'jobDeions',
                {
                  initialValue: echoList.jobDeions,
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
    <a-affix :offsetBottom="0">
      <div class="bottom">
        <a-button
          type="primary"
          class="bottom-btn"
          style="margin-right: 10px"
          @click="handleOrganSubmit(1)"
          >保存</a-button
        >
        <!-- <a-button type="primary" style="margin-right:10px;" @click="handleOrganSubmit(2)"
          >保存并复制</a-button
        >
        <a-button type="primary" style="margin-right:10px;" @click="handleOrganSubmit(3)"
          >保存并新增</a-button
        > -->
        <a-button
          type="primary"
          style="margin-right: 10px"
          @click="handleOrganSubmit(4)"
          v-if="this.$route.query.status != 1"
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
  getLeaderInfo,
  getDemandPartitionList,
  saveDemandPartition,
  updateDemandPartition,
  postDemandPartition,
  getTreeList,
  addDemand, //新增
  updateDemandById, //变更
  getAllCustomOrg,
  getComponyInfo,
  getOrgInfo
} from "@api/branchHC/index";
import {
  getDemandList,
  getStructureList,
  addUserInfo,
} from "@api/demandBranch/index";
import { getPrimaryDepartment, getDemandById } from "@api/branchHC/index";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import CityInfo from "@configs/city.js";
export default {
  data() {
    return {
      companyId: null,
      companyInfoList: [], //公司部门
       companyList: [], //公司
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
      // form: this.$form.createForm(this),
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
        externalNum: "", //客户需求名称
        positionName: "",
        groupId: "", //事业部
        organizeId: [],
        emergencyLevel: "",
        resumeFilter: [],
        interviewer: [],
        reInterviewer: [],
        copyTo: [], // 抄送人
        interviewAddress: "", // 面试地点
        areaCode: [], // 城市id集合
        areaCodeName: "", // 城市名称
        jobType: [], // 职位类别id集合
        jobTypeName: "", // 职位类别名称
        taskEnd: "",
        jobRequirements: "", //任职要求
        jobDeions: "",
        comments: "", //备注
        level: "", //职级制等
        demandId: "",
        type: "",
        state: "",
        productLine: "",
      },
      echoList: {
        externalNum: null,
        positionName: null,
        jobType: null,
        jobTypeName: null,
        areaCodeName: null,
        groupId: null,
        emergencyLevel: null,
        areaCode: null,
        work_place: null,
        number: null,
        evaluation_standard: null,
        company: null,
        hc_department: null,
        interviewAddress: null,
        resumeFilter: null,
        interviewer: null,
        reInterviewer: null,
        copyToInterviewer: null,
        job_description: null,
        jobRequirements: null,
        comments: null,
        jobDeions: null,
        enddate: null,
        state: null,
        productLine: null,
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
        productLine: "",
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
    };
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
    this.getTreeListInit(); // 获取职位类别
    this.getPrimaryDepartmentInit();
    this.getDemandList(); //HC部门
    this.getLeaderInfo(); //面试官信息
    this.getDemandById();
    // this.getAllCustomOrgInit(); //需求部门
    this.getAllOrgInfo();
  },
  components: {
    IconFont,
  },
  methods: {
    //新增面试官
    showIntervier() {
      this.intervierName = "";
      this.intervierMail = "";
      this.IsShowIntervier = !this.IsShowIntervier;
    },
     companyChange(e){
      this.companyId = e
       getComponyInfo({ customId: e }).then((res) => {
        if (res.data.code == 0) {
          let newTmp = this.tmpListInit(res.data.data.orgList);
          this.companyInfoList = newTmp;
        } else {
          this.companyInfoList = [];
        }
      });
    },
     tmpListInit(val) {
      let arr = [];
      if (val.length !== 0) {
        val.forEach(item => {
          let obj = {};
          obj.key = item.orgId
          obj.value = item.orgId
          obj.title = item.orgName
          if (item.children.length >= 1) {
            obj.children = this.tmpListInit(item.children);
          }
          arr.push(obj);
        });
      }
      return arr;
    },
     handleCompanyInfoChange(val) {
      this.companyInfo = val;
    },
    //获取公司
    getAllOrgInfo() {
      getOrgInfo().then((res) => {
        if (res.data.code == 0) {
          this.companyList = res.data.data.CompanyList;
        }
      });
    },
      // 确定
    sureIntervier() {
      console.log(this.companyId)
      if (this.companyId == null) {
        this.$message.error("请选择公司");
        return;
      }
      if (this.companyInfo==''||this.companyInfo==undefined) {
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
     addUser(userName, email, customId, customOrgId) {
      addUserInfo({
        userName: userName,
        mail: email,
        customId: customId,
        customOrgId: customOrgId,
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message.success(res.data.data);
          this.IsShowIntervier = false;
          this.companyInfo = ""
          this.getLeaderInfoInit();
        } else {
          this.$message.error(res.data.mesg);
        }
      });
    },
      // 取消
    cancelIntervier() {
      this.IsShowIntervier = false;
      this.companyInfo = ""
      this.companyId = null
    },
    moment,
    // 复制内容
    async getDemandById() {
      try {
        let res = await getDemandById({
          demandId: Number(this.$route.query.demandId),
        });
        let {
          positionName,
          organizeName,
          demandNum,
          taskEnd,
          createUserName,
          emergencyLevel,
          state,
          jobType,
          no,
          productLine,
          externalNum,
          recruitType,
          jobTypeName,
          releaseUserName,
          releaseTime,
          offlineTime,
          specialistAllocateTime,
          groupId,
          workPlace,
          resumeFilter,
          interviewer,
          reInterviewer,
          copyTo,
          jobDeions,
          comments,
          jobRequirements,
          interviewAddress,
          areaCode,
          areaCodeName,
          level,
        } = res.data.data.demand;
        this.echoList.positionName = positionName;
        this.echoList.organizeName = organizeName;
        this.echoList.number = demandNum;
        this.echoList.company = res.data.data.demand.customId;
        this.handleCompanyChange(res.data.data.demand.customId);
        console.log(res)
        this.echoList.hc_department =res.data.data.demand.organizeIdList 
            
        if (res.data.data.demand.customId) {
          //falseId，处理树形结构根父级没有id
          let customeId = Number(1000) + Number(res.data.data.demand.customId);
          console.log(customeId, "customeId");
          if(this.echoList.hc_department){
            this.echoList.hc_department.unshift(customeId);
          }else{
            this.echoList.hc_department=[customeId]
          }
          
          
        }
        console.log(this.echoList.hc_department, "this.echoList.hc_department");
        this.echoList.enddate = this.moment(taskEnd);
        console.log(this.echoList.enddate)
        this.echoList.createUserName = createUserName;
        this.echoList.emergencyLevel = emergencyLevel;
        this.echoList.state = state;
        this.echoList.no = no;
        this.echoList.productLine = productLine;
        this.echoList.externalNum = externalNum;
        this.echoList.recruitType = recruitType;
        this.echoList.jobTypeName = jobTypeName;
        this.echoList.areaCodeName = areaCodeName;
        this.echoList.releaseTime = releaseTime;
        this.echoList.work_place = workPlace;
        this.echoList.releaseUserName = releaseUserName;
        this.echoList.jobDeions = jobDeions;
        this.echoList.jobRequirements = jobRequirements;
        this.echoList.comments = comments;
        this.echoList.groupId = groupId;
        this.echoList.resumeFilter =
          res.data.data.demand.filterList !== null
            ? res.data.data.demand.filterList
            : [];
        this.echoList.interviewer =
          res.data.data.demand.interviewerList !== null
            ? res.data.data.demand.interviewerList
            : [];
        this.echoList.reInterviewer =
          res.data.data.demand.reInterviewerList !== null
            ? res.data.data.demand.reInterviewerList
            : [];
        this.echoList.copyToInterviewer =
          res.data.data.demand.copyToList !== null
            ? res.data.data.demand.copyToList
            : [];
        this.echoList.areaCode =
          res.data.data.demand.areaCodeList !== null
            ? res.data.data.demand.areaCodeList
            : [];
        this.echoList.jobType =
          res.data.data.demand.jobTypeList !== null
            ? res.data.data.demand.jobTypeList
            : [];
        this.echoList.evaluation_standard = level;
        this.echoList.interviewAddress = interviewAddress;
        console.log(this.echoList, "this.echoList");
        this.$nextTick(()=>{
          setTimeout(()=>{
             this.staffForm.setFieldsValue(this.echoList);
          })
        })
        
        this.getLeaderInfo();
        await this.getAllCustomOrgInit(); //需求部门
      } catch (error) {
        console.log(error);
      }
    },
    async getPrimaryDepartmentInit() {
      const res = await getPrimaryDepartment();
      this.primaryDepartList = res.data.data;
    },
    async getTreeListInit() {
      const res = await getTreeList();
      this.jobList = res.data.data;
    },
    async getAllCustomOrgInit() {

      console.log(this.echoList.groupId)
      const res = await getAllCustomOrg(this.echoList.groupId);
      let newList = res.data.data.orgList;
      newList.map((item) => {
        item.orgId = item.falseId;
      });
      newList = JSON.parse(
        JSON.stringify(newList).replace(/customName/g, "orgName")
      );
      this.departmentList = newList;
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
    // 职位类别
    handleJobChange(value, selectedOptions) {
      this.listQuery.jobType = value;
      this.listQuery.jobTypeName = selectedOptions
        .map((o) => o.label)
        .join("/");
    },
    //需求部门
    handleDepartmentChange(value, selectedOptions) {
      this.listQuery.hc_department = value;
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
    // 紧急程度
    onChangeRadio(e) {},
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
     searchUserValue(value) {
      let optionInterList_ = this.interviewerList.filter(
        (item) => item.userName.indexOf(value) > -1||item.mail.indexOf(value) > -1
      );
      if (optionInterList_.length > 20 || value === "") {
        optionInterList_ = optionInterList_.slice(0, 100);
      }
      this.$nextTick(() => {
        this.optionInterList = optionInterList_;
      });
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
          // console.log(newResumeFilterList,this.echoList.resumeFilter,'gilter')
          this.optionFilterList = newResumeFilterList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchValue(value) {
      let optionFilterList_ = this.filterList.filter(
        (item) => item.userName.indexOf(value) > -1||item.mail.indexOf(value) > -1
      );
      if (optionFilterList_.length > 100 || value === "") {
        optionFilterList_ = optionFilterList_.slice(0, 100);
      }
      this.$nextTick(() => {
        this.optionFilterList = optionFilterList_;
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    filter(inputValue, path) {
      return path.some(
        (option) =>
          option.children[0].orgName
            .toLowerCase()
            .indexOf(inputValue.toLowerCase()) > -1
      );
    },
    getDemandList() {
      getDemandList()
        .then((res) => {
          this.companyData = res.data.data.CompanyList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleTabsChange(e) {
      console.log(e);
      this.defaultModel = e;
      if (e == 1) {
        this.$router.push({
          name: "demandCopyInfo",
          query: {
            demandId: Number(this.$route.query.demandId),
          },
        });
      } else if (e == 2) {
        this.$router.push({
          name: "DemandCopyContent",
          query: {
            demandId: Number(this.$route.query.demandId),
            newDemandId: Number(this.$route.query.newDemandId)
              ? Number(this.$route.query.newDemandId)
              : undefined,
            demandStatus: this.$route.query.demandStatus === 1 ? 1 : 0,
          },
        });
      } else {
        return;
      }
    },
    handleCompanyChange(value) {
      console.log(value);
      getStructureList({
        customId: value,
      })
        .then((res) => {
          // console.log(res.data.data.orgList);
          if (res.data.data === null) {
            this.organizeList = [];
          } else {
            this.organizeList = res.data.data.orgList;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleOrganSubmit(index) {
      this.staffForm.validateFields((error, fieldsValue) => {
        // console.log(fieldsValue)
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
        console.log("Received values of form: ", values);
        // this.listQuery.demandName = values.requirement_name;
        this.listQuery.demandNum = values.number;
        this.listQuery.externalNum = Trim(values.externalNum);
        
        // let organizeId = values.hc_department[values.hc_department.length - 1];
        // this.listQuery.organizeId = Number(organizeId);
        let organizeId = values.hc_department.slice(-1).toString();
        // if (organizeId.indexOf("100") != -1) {
        //   organizeId = "";
        //   this.$message.error("请选择需求部门");
        //   return;
        // }
        this.listQuery.organizeId = Number(organizeId) > 1000 ? -(Number(organizeId) - 1000) : Number(organizeId);
        this.listQuery.emergencyLevel = Number(values.emergencyLevel);
        this.listQuery.workPlace = Trim(values.work_place);
        this.listQuery.resumeFilter = values.resumeFilter;
        this.listQuery.interviewer = values.interviewer;
        this.listQuery.reInterviewer = values.reInterviewer;
        this.listQuery.groupId = values.groupId;
        this.listQuery.productLine = Trim(values.productLine);
        this.listQuery.copyTo = values.copyToInterviewer;
        this.listQuery.interviewAddress = Trim(values.interviewAddress);
        this.listQuery.areaCode = values.areaCode;
        this.listQuery.jobType = values.jobType;
        this.listQuery.areaCodeName = this.listQuery.areaCodeName
          ? this.listQuery.areaCodeName
          : this.echoList.areaCodeName;
        this.listQuery.jobTypeName = this.listQuery.jobTypeName
          ? this.listQuery.jobTypeName
          : this.echoList.jobTypeName;
        this.listQuery.jobDeions = Trim(values.jobDeions);
        this.listQuery.jobRequirements = Trim(values.jobRequirements);
        this.listQuery.level = values.evaluation_standard;
        this.listQuery.taskEnd = values.enddate;
        this.listQuery.comments = Trim(values.comments);
        this.listQuery.positionName = Trim(values.positionName);
        this.listQuery.state = this.echoList.state;
        this.listQuery.demandId = Number(this.$route.query.demandId);
        this.listQuery.hc_department = values.hc_department.slice(1);
        if (index == 4) {
          //发布
          this.listQuery.type = "release";
        } else if (index == 1) {
          this.listQuery.type = "save";
        }
        console.log(this.listQuery, "listQuery哈");
        // if (!error) {
        if (this.$route.query.demandId && index == 1) {
          //变更
          updateDemandById(this.listQuery).then((res) => {
            if (res.data.code === 0) {
              this.$message.success("保存成功");
              if (this.$route.query.copyType == "部门HC") {
                this.$router.replace({
                  name: "HC",
                });
              } else {
                // this.$message.success("保存成功 后退一步");
                this.$router.go(-1);
              }
            } else {
              this.$message.error(res.data.mesg || "变更需求失败", 2);
            }
          });
        } else if (this.$route.query.demandId && index == 4) {
          addDemand(this.listQuery).then((res) => {
            if (res.data.code === 0) {
              this.$message.success("发布成功");
              if (this.$route.query.copyType == "部门HC") {
                this.$router.replace({
                  name: "HC",
                });
              }else{
                this.$router.go(-1)
              }
            } else {
              this.$message.error(res.data.mesg || "发布需求失败", 2);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.ant-col-12 {
  height: 59px;
}
>>>.add-intervier {
  margin-top: -10px;
  height: 56px;
  line-height: 56px;
  background: #f8fafc;
}
.demand-info-container {
  height: 90%;
  min-height: 90%;
}
.new-demand-header {
  background-color: #fff !important;
  /* text-align: center; */
  text-indent: 12px;
}
.demand-info {
  background-color: #fff !important;
  padding-top: 10px;
  min-height: 100%;
  height: auto;
  position: relative;
}
.demand-info .icon-img {
  position: absolute;
  width: 134px;
  height: 134px;
  top: 73px;
  left: 174px;
}
.demand-info-form {
  width: 80%;
  margin: 0 auto;
  min-height: 100%;
  height: auto;
  margin-bottom: 80px;
}
.ant-form {
  padding-bottom: 7px;
}
.ant-form-item {
  margin-bottom: 10px;
}
.ant-form-item-control {
  position: relative;
}
.bottom {
  background-color: #fff !important;
  text-align: center;
  line-height: 80px;
  box-shadow: 0px 7px 20px 1px rgba(0, 0, 0, 0.18);
  position: absolute;
  width: 100%;
  bottom: -24px;
}
.bottom-btn {
  background-color: #22b8cf;
  color: #fff;
  border-color: #22b8cf;
}
.icon {
  position: absolute;
  top: 308px;
  right:4%;
}
</style>
<style>
.demand-info-container .tab-title {
  font-size: 16px;
  color: #666;
}
.demand-info-container .ant-tabs-tab-active {
  font-size: 16px;
  /* color: #1478e3; */
  border-top: 2px solid #1478e3 !important;
}
.demand-info-container .ant-tabs-tab-active .tab-title {
  font-size: 16px;
  /* color: #1478e3; */
}
.demand-info-container #demand_content {
  resize: none;
}

</style>
