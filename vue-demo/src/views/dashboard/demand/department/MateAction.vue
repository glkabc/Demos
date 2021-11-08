<template>
  <div class="mateAction">
    <!-- <div class="mateAction-tabs">
      <div class="mateAction-left">
        <a-row>
          <a-col :span="6">
            <span class="label-span"
              ><span style="opacity: 0">姓名</span>姓名</span
            >
            <a-input
              class="input-item"
              placeholder="请输入姓名/邮箱/手机号"
              allowClear
              v-model.trim="title"
              style="width: 70%"
            ></a-input>
          </a-col>
          <a-col :span="6">
            <span class="label-span">职位名称</span>
            <a-input
              class="input-item"
              placeholder="请输入职位名称"
              allowClear
              v-model.trim="positionNames"
            ></a-input>
          </a-col>
          <a-col :span="6">
            <span class="label-span">职位类别</span>
            <a-cascader
              :options="jobList"
              placeholder="请选择职位类别"
              allowClear
              v-model="jobType"
              class="input-item"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            />
          </a-col>
          <a-col :span="6">
            <span class="label-span">推荐人</span>
            
            <a-select
              placeholder="推荐人"
              :filter-option="filterOption"
              class="input-item"
              showSearch
              allowClear
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            >
              <a-select-option
                :value="item.userId"
                v-for="item in optionUserList"
                :key="item.userId"
                >{{ item.userName }}</a-select-option
              >
            </a-select>
          </a-col>
          <a-col :span="6">
            <span class="label-span">需求部门</span>
            <a-tree-select
              v-model="orgIds"
              allowClear
              placeholder="需求部门"
              @change="handleOrgidSelect"
              treeDefaultExpandAll
              :treeData="treeData"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
              class="input-item"
              :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
            >
            </a-tree-select>
          </a-col>
          <a-col :span="6">
            <span class="label-span">工作城市</span>
            <a-cascader
              v-model="jobAddress"
              @change="handleCityChange"
              :options="CityInfo"
              placeholder="工作城市"
              :allowClear="true"
              changeOnSelect
              class="input-item"
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            />
          </a-col>
          <a-col :span="6">
            <span style="margin: 0 7px 0 0">萝卜秀编号</span>
            <a-input
              class="input-item"
              placeholder="请输入萝卜秀编号"
              allowClear
              v-model.trim="no"
            ></a-input>
          </a-col>
          <a-button
            style="background: #feaa19; border: #feaa19; margin: 0 10px"
            type="primary"
            @click="handleSerch"
            >查询</a-button
          >
          <a-button
            style="background: #22b8cf; border: #22b8cf"
            type="primary"
            @click="handleReset"
            >重置</a-button
          >
      
        </a-row>
      </div>
    </div> -->
    <div class="mateAction-content">
      <div class="mateAction-head"></div>
      <a-row>
        <a-col :span="24" style="margin-top: 20px">
          <a-tabs
            :defaultActiveKey="defaultModel"
            @change="handleTabsChange"
            tabPosition="bottom"
          >
            <a-tab-pane
              v-for="(item, index) in tabList"
              :key="item.key"
              class="tabs-right"
            >
            <!-- 标签页 -->
              <span slot="tab" class="tab-title">
                <div :class="index % 2 == 0 ? 'tab-blue' : 'tab-green'">
                  <icon-font
                    :type="item.icon"
                    style="font-size: 22px; color: #fff"
                  />
                </div>
                <div class="tab-right">
                  <span> {{ item.title }}</span>
                  <span> {{ item.num }}</span>
                </div>
              </span>
            </a-tab-pane>
          </a-tabs>
          <div class="mateAction-right">
            <a-button
              type="primary"
              v-if="defaultModel == 2"
              class="button-danger"
              @click="handlePopClick(1, {})"
              >淘汰</a-button
            >
            <a-button
              type="primary"
              v-if="defaultModel == 2"
              class="button-info"
              @click="handlePopClick(2, {})"
              >通过</a-button
            >
            <a-button
              type="primary"
              v-if="defaultModel == 3"
              class="button-danger"
              @click="handlePopClick(3, {})"
              >面试官淘汰</a-button
            >
            <a-button
              type="primary"
              v-if="defaultModel == 3"
              class="button-info"
              @click="handlePopClick(4, {})"
              >面试官通过</a-button
            >
            <a-button
              v-if="defaultModel == 3"
              @click="handleHrClick"
              class="button-info"
              :disabled="primaryPassShow"
              >推荐至面试官</a-button
            >
            <a-button
              type="primary"
              v-if="defaultModel == 4"
              class="button-danger"
              @click="giveUpInterview()"
              >放弃面试</a-button
            >
            <a-button
              type="primary"
              v-if="defaultModel == 4"
              class="button-info"
              :disabled="primaryInterwerShow"
              @click="handlePopClick(10, {})"
              >录用</a-button
            >
            <a-button
              type="primary"
              v-if="defaultModel == 5"
              class="button-danger"
              @click="handlePopClick(6, {})"
              >放弃offer</a-button
            >
            <a-button
              type="primary"
              v-if="defaultModel == 7"
              class="button-danger"
              @click="handlePopClick(7, {})"
              >确认流失</a-button
            >
            <can-i-use code="zpgl-rwzx-fqrz">
              <a-button
                type="primary"
                v-if="defaultModel == 6"
                class="button-danger"
                @click="handlePopClick(8, {})"
                >放弃入职</a-button
              >
            </can-i-use>
            <can-i-use code="zpgl-rwzx-qrrz">
              <a-button
                type="primary"
                v-if="defaultModel == 6"
                class="button-info"
                @click="handlePopClick(9, {})"
                >确认入职</a-button
              >
            </can-i-use>
          </div>
          <a-table
            :row-key="(record,index) => index"
            :columns="columns"
            :dataSource="data"
            :pagination="false"
            size="middle"
            class="zebra"
            :loading="loading"
            @change="onShowSizeChange"
            :rowSelection="
              rowShow? {
                    onChange: onSelectChange,
                    selectedRowKeys: selectedRowKeys,
                  }
                : undefined
            "
          >
            <span slot="fullName" slot-scope="record, item">
              <router-link
                class="info__name"
                :to="{
                  name: 'TalentProfileDetail',
                  query: { id: item.resumeId },
                }"
                target="_blank"
                >{{ item.fullName ? item.fullName : "— —" }}</router-link
              >
            </span>
            <span slot="dateRealityTitle" v-show="defaultModel == 8">
              <div>实际上岗日期</div>
            </span>
            <span
              slot="workingDate"
              slot-scope="record, item"
              v-if="defaultModel == 8"
            >
              {{ item.plannedWorkingDate }}
            </span>
            <template v-slot:degree="degree">
              <span style="margin-right: 0">{{
                getEducationLabel(degree.resumeEducation)
              }}</span>
            </template>
             <span slot="experienceTime" v-if="defaultModel !== 9">
              <div>工作年限</div>
            </span>
            <template v-if="defaultModel !== 9" v-slot:experience="experience">
              <span style="margin-right: 0">{{
                getExperienceLabel(experience.resumeExperience)
              }}</span>
            </template>

            <span slot="procedureTitle" v-if="defaultModel == 1">
              <div>流程</div>
            </span>
            <span
              slot="procedure"
              slot-scope="record, item"
              v-if="defaultModel == 1"
            >
              {{ item.codeDes }}
            </span>

            <span slot="modifiedStatusTitle" v-if="defaultModel == 3">
              <div>推荐状态</div>
            </span>
            <span
              slot="modifiedStatus"
              slot-scope="record, item"
              v-if="defaultModel == 3"
              :style="{
                color: item.isRecommend == 1 ? '#22b8cf' : '#fc3d09',
                fontWeight: 900,
              }"
              v-text="item.isRecommend == 1 ? '已推荐' : '未推荐'"
            >
            </span>

            <span slot="resourceTitle" v-if="defaultModel !== 8">
              <div>操作人</div>
            </span>
            <span
              slot="createUserName"
              slot-scope="record, item"
              v-if="defaultModel !== 8"
            >
              {{ item.modifiedUserName }}
            </span>

            <span slot="dateTitle" v-if="defaultModel !== 8">
              <div>操作日期</div>
            </span>
            <span
              slot="modifiedUserTime"
              slot-scope="record, item"
              v-if="defaultModel !== 8"
            >
              {{ item.modifiedUserTime }}
            </span>

            <span slot="statusTitle" v-if="defaultModel !== 8">
              <div>状态</div>
            </span>

            <span
              slot="status"
              slot-scope="record, item"
              v-if="defaultModel !== 8"
            >
              <a-popover placement="right" v-if="defaultModel == 4">
                <template slot="content">
                  <span
                    >面试时间：{{
                      item.interviewTime ? item.interviewTime : "暂无"
                    }}</span
                  >
                </template>
                <a-tag :class="getColorList(item)">{{ item.statusDes }}</a-tag>
              </a-popover>
              <a-tag :class="getColorList(item)" v-else>{{
                item.statusDes
              }}</a-tag>
            </span>
             <span slot="modifie" v-if="defaultModel !== 9">
              <div>操作</div>
            </span>
            <span slot="action"  v-if="defaultModel !== 9" slot-scope="record, item">
              <!-- <a
                style="color:#4480EE"
                v-if="defaultModel == 1"
                @click="handleProgressClick(item)"
                >职位进展</a
              > -->
              <a
                style="color: #4480ee"
                v-if="
                  (defaultModel == 4 && item.status == 20) ||
                  (defaultModel == 4 && item.status == 40)
                "
                @click="handleAuditionClick(item, 1)"
                >预约面试</a
              >
              <a-divider
                type="vertical"
                v-if="defaultModel == 4 && item.status == 40"
              />
              <a
                style="color: #4480ee"
                v-if="defaultModel == 4 && item.status == 30"
                @click="handleConcluClick(item)"
                >面试结论</a
              >
              <a-divider
                type="vertical"
                v-if="defaultModel == 4 && item.status == 30"
              />
              <a
                style="color: #4480ee"
                v-if="defaultModel == 4 && item.status == 30"
                @click="handleAuditionClick(item, 2)"
                >修改面试</a
              >
              <a
                style="color: #4480ee"
                v-if="
                  (defaultModel == 4 && item.status == 40) ||
                  (defaultModel == 4 && item.status == 41)
                "
                @click="handleView(item)"
                >面试过程</a
              >
              <a
                style="color: #4480ee"
                v-if="defaultModel == 5 || defaultModel == 7"
                @click="handlePopOfferClick(item)"
                >确认offer</a
              >
              <!-- <a
                v-if="defaultModel !== 5 && defaultModel !== 7
                "
                style="color:#4480EE"
                @click="handleCheckClick(item)"
                >查看简历</a
              > -->
              <a
                v-if="defaultModel == 8"
                style="color: #4480ee; margin-left: 10px"
                @click="handleOfferClick(item)"
                >查看offer</a
              >
              <a
                v-if="defaultModel == 6"
                style="color: #4480ee; margin-left: 10px"
                @click="handleChangeOfferClick(item)"
                >修改offer</a
              >
              <a
                v-if="defaultModel == 1"
                style="color: #4480ee; margin-right: 20px"
                @click="handleMoveClick(item)"
              >
                <a-dropdown
                  :trigger="['click']"
                  :getPopupContainer="
                    (triggerNode) => {
                      return triggerNode.parentNode || document.body;
                    }
                  "
                >
                  <a class="ant-dropdown-link"
                    >移动到 <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item
                      v-for="info in tabMenuAllList"
                      :key="info.value"
                      ><span @click="handleMenuClick(item, info)">{{
                        info.label
                      }}</span>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a>
              <a v-if="defaultModel == 1" @click="handleRecord(item)"
                >操作记录</a
              >
            </span>
          </a-table>        
          <a-pagination
            size="middle"
            
            v-model="current"
            :pageSize="pageSize"
            @change="pageNumberChange"
            @showSizeChange="sizeChange"
            :pageSizeOptions="pageSizeOptions"
            :total="total"
            showSizeChanger
            class="pagination-style"
          />
        </a-col>
      </a-row>
    </div>
    <a-modal
      width="50%"
      v-model="dialogLogVisible"
      title="职位操作记录"
      @ok="handleOk"
    >
      <div style="height: 400px; overflow-y: scroll">
        <a-timeline>
          <a-timeline-item v-for="(item, index) in recruitList" :key="index">
            <div>{{ item.operateTime }}</div>
            <div v-html="item.operateContent"></div>
            <div>{{ item.statusName }}</div>
            <div>操作人：{{ item.operateName }}</div>
          </a-timeline-item>
        </a-timeline>
      </div>
    </a-modal>
    <a-drawer
      placement="right"
      :closable="false"
      @close="handleOfferSeeClose"
      width="520"
      :visible="staffOfferSeeVisible"
      title="查看offer"
    >
      <div v-if="recruitOfferLoading">
        <a-skeleton active :paragraph="{ rows: 17 }" />
      </div>
      <RecruitOfferFinish
        :recruitOfferList="recruitOfferList"
        v-if="!recruitOfferLoading"
      />
    </a-drawer>
    <a-drawer
      width="520"
      title="修改offer"
      placement="right"
      :closable="false"
      :visible="offerChangeVisible"
      @close="handelOfferChangeClose"
    >
      <div v-if="offerChangeLoading">
        <a-skeleton active :paragraph="{ rows: 17 }" />
      </div>
      <RecruitOfferChange
        v-if="!offerChangeLoading"
        :offerChangeList="offerChangeList"
        :type="offerListType"
        :offerChangeVisible.sync="offerChangeVisible"
      ></RecruitOfferChange>
    </a-drawer>
    <RecruitAction
      :show.sync="staffVisible"
      :jobTalentId="jobTalentId"
      :customId="customId"
      :type="type"
      @recruit-action="recruitActionInit"
    />
    <interview-info-modal :show.sync="viewVisible" :talentData="talentData" />
    <RecruitOffer
      :offerList="offerList"
      :departmentList="departmentList"
      :type="offerListType"
      :offerVisible.sync="staffOfferVisible"
      @recruit-action="recruitActionInit"
    />
    <MateAudition
      :auditionVisible.sync="staffAuditionVisible"
      :auditionList="auditionList"
      :organizeName="organizeName"
      :positionName="positionName"
      :customId="customId"
      :interviewer="interviewer"
      :reInterviewer="reInterviewer"
      :interviewerList="interviewerList"
      :copyTo="copyTo"
      :type="auditonType"
      class="audition"
      @recruit-action="recruitActionInit"
    />
    <Conclusion
      :organizeName="organizeName"
      :concluList="concluList"
      :talentList="talentList"
      :concluVisible.sync="staffConcluVisible"
      class="conclusion"
      @recruit-action="recruitActionInit"
    />
    <Recommend
      :recommendList="recommendList"
      :positionName="positionName"
      :organizeName="organizeName"
      :copyTo="copyTo"
      :demandId="demandId"
      :resumeFilter="resumeFilter"
      :recommendVisible.sync="staffRecommendVisible"
      :primaryPassShow.sync="primaryPassShow"
      class="recommend"
      @recruit-action="recruitActionInit"
    />
    <EntryWork
      :show.sync="entryVisible"
      :talentId="talentEntryId"
      :value="entryValue"
      @recruit-action="recruitActionInit"
    />
     
  </div>
</template>

<script>
import axios from 'axios'
import moment from "moment";
import { getCandidateReview } from "@api/candidate/index";
import RecruitOfferChange from "./recruitDetail/RecruitOfferChange";
// import RecruitProgress from "./recruitDetail/RecruitProgress";
import MateAudition from "./recruitDetail/MateAudition";
import InterviewInfoModal from "./recruitDetail/InterviewInfoModal";
import Recommend from "./Recommend";
import RecruitAction from "./recruitDetail/RecruitAction";
import EntryWork from "./recruitDetail/EntryWork";
import RecruitOffer from "./recruitDetail/RecruitOffer";
import RecruitOfferFinish from "./recruitDetail/RecruitOfferFinish";
import Conclusion from "./recruitDetail/Conclusion";
import { IconFont } from "@configs/scriptURL";
import { createNamespacedHelpers } from "vuex";
import { getTreeList } from "@api/branchHC/index";
import { getStructureList } from "@api/demandBranch/index";
import { getUserInfoList, getDemandId } from "@api/manage/index";
import CityInfo from "@configs/city.js";
const { mapState } = createNamespacedHelpers("status");


import {
  getCountJob,
  getCandidateInfo,
  getWaitPrimaryInfo,
  getPrimaryPassInfo,
  getForInterview,
  getPassInterviewInfo,
  getWaitEntryInfo,
  getGiveUpOfferInfo,
  getWorkInfo,
  getEliminatedInfo,
  uptAllMove,
  getAffirmOffer,
  getInterviewInfoList,
  getTalentInterviewById,
  checkIsCanInterview,
} from "@api/department/operation";
import { getRecord } from "@api/candidate/index";
import { getInterviewInfo } from "@api/candidate";
const columns = [
  {
    title: "序号",
    dataIndex: "indexNum",
    key: "indexNum",
      align: 'center',
    // slots: { title: '序号'}
  },
  {
    title: "姓名",
    dataIndex: "fullName",
    key: "fullName",
    scopedSlots: { customRender: "fullName" },
  },
  {
    title: "手机号码",
    key: "resumePhone",
    dataIndex: "resumePhone",
  },
  {
    title: "职位名称",
    key: "positionName",
    dataIndex: "positionName",
  },
  {
    title: "工作地点",
    key: "areaCodeName",
    dataIndex: "areaCodeName",
  },
  {
    title: "学历",
    key: "degree",
    // dataIndex:'degree',
    scopedSlots: { customRender: "degree" },
  },
  {//工作年限
    slots:{ title: "experienceTime"},
    key: "experience",
    scopedSlots: { customRender: "experience" },
  },
  {
    title: "推荐人",
    key: "modifiedUserName",
    dataIndex: "realOwnerName",
  },
  // 推荐状态
  {
    slots: { title: "modifiedStatusTitle" },
    key: "modifiedStatus",
    scopedSlots: { customRender: "modifiedStatus" },
  },
  // 流程
  {
    slots: { title: "procedureTitle" },
    key: "procedure",
    scopedSlots: { customRender: "procedure" },
  },
  // 状态
  {
    slots: { title: "statusTitle" },
    key: "status",
    scopedSlots: { customRender: "status" },
      align: 'center',
  },
  // 计划上岗日期
  // {
  //   slots: { title: 'datePlanTitle' },
  //   scopedSlots: { customRender: 'plannedWorkingDate' },
  // },
  // 操作人
  {
    slots: { title: "resourceTitle" },
    key: "createUserName",
    scopedSlots: { customRender: "createUserName" },
  },
  // 实际上岗日期
  {
    slots: { title: "dateRealityTitle" },
    key: "workingDate",
    scopedSlots: { customRender: "workingDate" },
  },
  // 操作日期
  {
    slots: { title: "dateTitle" },
    key: "modifiedUserTime",
    scopedSlots: { customRender: "modifiedUserTime" },
  },//操作
  {
   slots:{title: "modifie"} ,
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center",
  },
];
export default {
  components: {
    RecruitAction,
    // RecruitProgress,
    MateAudition,
    Conclusion,
    IconFont,
    RecruitOffer,
    Recommend,
    RecruitOfferFinish,
    InterviewInfoModal,
    EntryWork,
    RecruitOfferChange,
  },
  data() {
    return {
      columns,
      CityInfo,
      selectedRowKeys: [],
      selectedList: [],
      data: [],
      a:1,
      // pagination: {
      current:1,
      pageSizeOptions: ["10", "20", "30", "40"],
      showSizeChanger: true,
      pageSize: 10,
      total: 10,
      showTotal: (total) => `共 ${total} 条`,
      // },
      typeSearch: "", // 搜索下拉类型
      keywordValue: "", // 搜索绑定值
      placeholderTitle: "请输入姓名", // input-placeolder
      phoneValue: "",
      keyword: "",
      emailValue: "",
      defaultModel: 1, // tabs绑定
      searchSelect: 1, // 搜索下拉框
      searchValue: "", // 搜索输入框
      actionTitle: "简历淘汰",
      list: {},
      viewedId: null,
      viewVisible: false, // 面试过程
      staffVisible: false, // 顶部切换打开弹窗
      staffProVisible: false, // 职业进度
      staffOfferVisible: false, // 确认offer
      staffAuditionVisible: false, // 预约面试
      staffConcluVisible: false, // 面试结论
      staffRecommendVisible: false, // 推荐至面试官
      staffOfferSeeVisible: false, // 查看offer
      offerChangeVisible: false, //修改offer
      entryVisible: false,
      offerList: {}, // 确认offer
      // progressList: {}, // 职业进度
      auditionList: {}, // 面试安排
      concluList: {}, // 面试结论
      recommendList: {}, // 推荐至面试官
      recruitOfferList: {}, // 查看offer
      offerChangeList: {}, //修改offer
      searchList: [
        {
          id: 1,
          title: "姓名",
        },
        {
          id: 2,
          title: "邮箱",
        },
        {
          id: 3,
          title: "手机号",
        },
      ],
      tabList: [
        {
          key: 1,
          title: "全部",
          num: "",
          icon: "icon-quanbu1",
        },
        {
          key: 2,
          title: "负责人初选",
          num: "",
          icon: "icon-shaixuanxuanzhong-copy",
        },
        {
          key: 3,
          title: "面试官筛选",
          num: "",
          icon: "icon-mianshi2",
        },
        {
          key: 4,
          title: "预约面试",
          num: "",
          icon: "icon-yuyue1",
        },
        {
          key: 5,
          title: "offer",
          num: "",
          icon: "icon-offer",
        },
        {
          key: 6,
          title: "入职确认",
          num: "",
          icon: "icon-ruzhi",
        },
        // {
        //   key: 7,
        //   title: '候选人放弃',
        //   num: '',
        //   icon: 'icon-fangqi',
        // },
        {
          key: 8,
          title: "已入职",
          num: "",
          icon: "icon-yiruzhi",
        },
        {
          key: 9,
          title: "已淘汰",
          num: "",
          icon: "icon-fangqi",
        },
      ],
      rowShow: false,
      loading: false,
      organizeName: "", // 应聘部门
      organizeId: "", // 部门id
      distributionId: "", // 需求id
      customId: "", // 公司id
      jobTalentId: "",
      // demandName: '', // 需求名称
      demandId: "",
      positionName: "", // 招聘名称
      interviewer: "",
      copyTo: "",
      reInterviewer: "",
      resumeFilter: "",
      tabMenuAllList: [],
      primaryPassShow: true, // 推荐面试官按钮状态
      primaryInterwerShow: true, // 通过面试状态
      recruitOfferLoading: false, // 查看offer骨架
      offerChangeLoading: false, //修改offer骨架
      type: 0,
      offerListType: "",
      entryValue: "",
      talentEntryId: "",
      departmentList: {},
      talentData: [],
      talentList: {},
      auditonType: "",
      interviewerList: {},
      jobList: [],
      optionUserList: [],
      userList: [],
      treeData: [],
      jobAddress: [],
      jobAddresses: "",
      title: "",
      positionNames: "",
      jobType: [],
      orgIds: undefined,
      no: "",
      recruitList: [],
      dialogLogVisible: false,
      talentIds: "",
      parameterList: [],
    };
  },
  computed: {
    ...mapState({
      educations: (state) => state.educationRequires,
      experiences: (state) => state.jobExperiences,
      tabMenuList: (state) => state.operationProcesses,
    }),
  },
  mounted() {
    // this.distributionId = this.$route.query.id
    this.organizeName = this.$route.query.organizeName? this.$route.query.organizeName: "";
    this.organizeId = this.$route.query.organizeId ? this.$route.query.organizeId: "";
    this.customId = this.$route.query.customId;
    this.positionName = this.$route.query.positionName? this.$route.query.positionName: "";
    // this.demandName = this.$route.query.demandName
    this.interviewer = this.$route.query.interviewer? this.$route.query.interviewer: "";
    this.copyTo = this.$route.query.copyTo ? this.$route.query.copyTo : "";
    this.reInterviewer = this.$route.query.reInterviewer? this.$route.query.reInterviewer: "";
    this.demandId = this.$route.query.demandId? this.$route.query.demandId: "";
    this.resumeFilter = this.$route.query.resumeFilter;
    this.talentIds = this.$route.query.talentIds;
    this.getCountJobInit();
    this.getCandidateInfoInit();
    this.fetchData(this.viewedId);
    this.getTreeListInit();
    this.getUserInfoListInit();
    this.getStructureListInit();
  },
  methods: {
    moment,
    // Trim(str) {
    //   //str表示要转换的字符串
    //   return str.replace(/\n|\r\n/g, "<br/>")
    // },
    handleRecord(value) {
      getRecord({
        resumeId: value.resumeId,
        talentId: value.talentId,
      }).then((res) => {
        if (res.data.code == 0) {
          res.data.data.forEach((i) => {
            // console.log(i.operateContent)
            i.operateContent = i.operateContent.replace(/↵/g, "\n");
          });
          this.recruitList = res.data.data;
          this.dialogLogVisible = true;
        }
      });
    },
    handleOk(e) {
      this.dialogLogVisible = false;
    },
    //分页页数的改变
    pageNumberChange(current, size) {
      this.current = current;
      this.pageSize = size;
      this.data = this.getShowSource();
     
       console.log(this.data,'change')
    },
    //  分页显示条数的变化
    sizeChange(current, size) {
      console.log(current, size, "sizefenye");
      if (current == 0) {
        current = 1;
      }
      this.current = current;
      this.pageSize = size;
      this.data = this.getShowSource();
    },
    //实现分页效果
    getShowSource() {
      var keyValue = 0;
      var data = this.dataSources; //后端返回的全部数据
      for (var i = 0; i < data.length; i++) {
        keyValue = keyValue + 1;
        let key = { key: keyValue };
        data[i] = Object.assign(data[i], key);
      }
      
      var start = this.pageSize * this.current - this.pageSize;
      var end = this.pageSize * this.current;
      return data.slice(start, end);
    },
    // 获取系统用户列表
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList();
        this.userList = res.data.data.userList.list;
        this.optionUserList = [...this.userList];
      } catch (error) {}
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    async getTreeListInit() {
      const res = await getTreeList();
      this.jobList = res.data.data;
    },
    onShowSizeChange({ current, pageSize }) {
      
      console.log(current, pageSize, "点击");
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getPrimaryPassInfoInit(); //面试官筛选 TODO公用的tab ,如何实现按需刷新
      this.getForInterviewInit(); //预约面试
      this.getWaitPrimaryInfoInit(); //初选
      this.getPassInterviewInfoInit(); //offer
      this.getWaitEntryInfoInit(); //入职
    },
    // 查看面试详情
    handleView(e) {
      this.viewVisible = true;
      this.fetchData(e.talentId);
    },
    async fetchData(id) {
      this.current=1
      try {
        const res = await getInterviewInfo({ talentId: id });
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.talentData = res.data.data.interviewList;
          }
        } else {
          this.$message.error(res.data.mesg || "数据加载错误", 2);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取需求部门
    getStructureListInit() {
      getStructureList().then((res) => {
        if (res.data.code == 0) {
          let newTmp = this.tmpListInit(res.data.data.orgList);
          this.treeData = newTmp;
        } else {
          this.treeData = [];
        }
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
    // 开始移动
    async handleMenuClick(e, info) {
      try {
        if (info.value === 6) {
          this.entryVisible = true;
          this.talentEntryId = e.talentId;
          this.entryValue = info.value;
        } else {
          const res = await uptAllMove({
            talentId: e.talentId,
            status: info.value,
          });
          if (res.data.code == 0) {
            this.$message.success(res.data.data);
            this.getCountJobInit();
            this.getCandidateInfoInit();
          }
        }
      } catch (error) {}
    },
    // 移动到
    handleMoveClick(e) {
      let newMoveList = this.tabMenuList;
      let newTmpArr = [];
      newMoveList.map((item) => {
        if (e.code > item.value) {
          newTmpArr.push(item);
        }
      });
      let newArr = newTmpArr.shift();
      let lastArr = [];
      this.tabMenuAllList = [...newTmpArr, ...lastArr];
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedList = selectedRows;
      console.log(this.selectedList,'选择列表', selectedRowKeys)
      if (this.selectedList.length == 0) {
        this.primaryPassShow = true;
        this.primaryInterwerShow = true; //录用默认disabled
      } else {
        if (selectedRows.length > 0) {
          // let newPassList = selectedRows.some((item) => {
          //   console.log(item,'itemsssssssss')
          //   if (item.isRecommend == 1) {
          //     this.primaryPassShow = true;
          //   } else {
          //     this.primaryPassShow = false;
          //   }
          //   if (item.status == 30) {
          //     if (item.interviewRound > 1) {
          //       console.log('我走了啊')
          //       this.primaryInterwerShow = false;
          //     } else {
          //       this.primaryInterwerShow = true;
          //     }
          //   } else if (item.status == 40) {
          //     this.primaryInterwerShow = false;
          //   } else {
          //     this.primaryInterwerShow = true;
          //   }
          // });
          // } else {
          const hasAnyRecommended = selectedRows.some(
            (item) => item.isRecommend === 1
          );
          if (hasAnyRecommended) {
            this.primaryPassShow = true;
          } else {
            this.primaryPassShow = false;
          }
          const hasAnyInterwer = selectedRows.map((item) =>
            this.isAnyInterview(item)
          );
          const isHasInterview = hasAnyInterwer.includes(undefined);
          if (isHasInterview) {
            this.primaryInterwerShow = true;
          } else {
            this.primaryInterwerShow = false;
          }
        }
      }
    },
    isAnyInterview(x) {
      if (x.status == 30 && x.interviewRound > 1) {
        return false;
      }
      if (x.status > 30) {
        return false;
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
    getColorList(item) {
      // console.log(item, '各种职位的状态数据')
      if (item.status >= 0) {
        // if (item.status === 50 || item.status === 30) {
        //   return "wait";
        // }
        // if (item.status == 40) {
        //   if (item.statusDes !== "初试通过") {
        //     return "green";
        //   } else {
        //     return '"first-green"';
        //   }
        // }
        // if (item.status % 2 == 0) {
        //   return "success";
        // } else {
        //   return "faild";
        // }
        if (item.status === 0 ) {
          return 'jianli-pipei'
        } else if (item.status === 10) {
          return 'chuxuan-tongguo'
        } else if (item.status === 20) {
          return 'saixuan-tongguo'
        } else if (item.status === 30) {
          return 'chushi-chenggong'
        } else if (item.status === 40) {
          if (item.statusDes === '初试通过') {
            return 'chushi-tongguo'
          } else if (item.code === 4) {
            return 'mianshi-tongguo'
          } else {
            return 'fushi-tongguo'
          }
        } else if (item.status === 50) {
          if (item.code === 5) {
            return 'offer-success'
          }
        } else if (item.status === 60) {
          return 'yi-ruzi'
        }
      }
      return "faild";
    },
    onSearch(e) {
      this.keyword = e;
      switch (this.typeSearch) {
        case 1:
          this.keyword = e;
          this.phoneValue = null;
          this.emailValue = null;
          break;
        case 2:
          this.emailValue = e;
          this.phoneValue = null;
          this.keyword = null;
          break;
        case 3:
          this.phoneValue = e;
          this.keyword = null;
          this.emailValue = null;
          break;
      }
      switch (this.defaultModel) {
        case 1:
          // 全部
          this.getCandidateInfoInit();
          break;
        case 2:
          // 初选
          this.getWaitPrimaryInfoInit();
          break;
        case 3:
          // 面试官筛选
          this.getPrimaryPassInfoInit();
          break;
        case 4:
          // 预约面试
          this.getForInterviewInit();
          break;
        case 5:
          // offer
          this.getPassInterviewInfoInit();
          break;
        case 6:
          // 入职
          this.getWaitEntryInfoInit();
          break;
        case 7:
          // 候选人
          this.getGiveUpOfferInfoInit();
          break;
        case 8:
          // 已入职
          this.getWorkInfoInit();
          break;
      }
    },
    searchChange(e) {
      this.typeSearch = e;
      switch (e) {
        case 1:
          this.keywordValue = "";
          this.placeholderTitle = "请输入姓名";
          break;
        case 2:
          this.placeholderTitle = "请输入邮箱";
          this.keywordValue = "";
          break;
        default:
          this.placeholderTitle = "请输入手机号";
          this.keywordValue = "";
          break;
      }
    },
    // 工作城市
    handleCityChange(e) {
      console.log(e, "e");
      // if(e.length=0){
      //   console.log("woso")
      //   this.jobAddress="";
      //   this.jobAddresses=""
      // }else{
      this.jobAddress = e;
      this.jobAddresses = this.jobAddress.join(",");
      console.log(this.jobAddresses, "this.jobAddresses");
      // }
    },
    // 获取顶部tap列表数据
    getCountJobInit() {
    
      getCountJob({
        demandId: this.$route.query.demandId,
        talentIds: this.talentIds,
      }).then((res) => {
        console.log(res.data.data)
        this.tabList[0].num = res.data.data.count;

     
        this.tabList[2].num = res.data.data.msgsxCount;
        this.tabList[3].num = res.data.data.yymsCount;
        this.tabList[4].num = res.data.data.offerCount;
        this.tabList[5].num = res.data.data.rzCount;
        // this.tabList[6].num = res.data.data.hxrfqCount
        this.tabList[6].num = res.data.data.yrzCount;
        //FIXME
        this.tabList[7].num = res.data.data.yttCount;   this.tabList[1].num = res.data.data.fzrcxCount;
      });
    },
    handleOrgidSelect(e) {
      console.log(e);
    },
    // 搜索
    handleSerch() {
      // console.log(this.defaultModel,'')
      this.getCandidateInfoInit();
    },
    // 重置
    handleReset() {
      this.title = "";
      this.positionNames = "";
      this.jobType = [];
      this.orgIds = undefined;
      this.jobAddress = [];
      this.jobAddresses = "";
      this.no = "";
      this.getCandidateInfoInit();
    },
    // 获取全部列表数据
    getCandidateInfoInit() {
      this.current=1
      this.loading = true;
      console.log(this.jobAddresses, "jobAddresses01");
      getCandidateInfo({
        title: this.title,
        positionName: this.positionNames,
        jobType: this.jobType[this.jobType.length - 1],
        orgIds: this.orgIds,
        workPlace: this.jobAddresses,
        no: this.no,
        demandId: this.demandId,
        talentIds: this.talentIds,
      })
        .then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.candidatelist.length > 0) {
              console.log(res.data.data)
              this.dataSources = res.data.data.candidatelist;
              this.dataSources.forEach((item, index) => {
                this.dataSources[index].indexNum = index + 1;
              });

              if (res.data.data.candidatelist.length > 10) {
                this.data = res.data.data.candidatelist.slice(0, 10);
                this.data.forEach((item, index) => {
               
                  this.data[index].indexNum = index + 1;
                });
               
              } else {
                this.data = res.data.data.candidatelist;
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
                console.log(this.data);
              }
            } else {
              this.dataSources = [];
              this.data = [];
            }
            this.total = Number(this.tabList[0].num);
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    // 获取负责人初选
    getWaitPrimaryInfoInit() {
       this.current=1
      this.loading = true;
      getWaitPrimaryInfo({
        fullName: this.keyword,
        resumePhone: this.phoneValue,
        resumeMail: this.emailValue,
        demandId: this.$route.query.demandId,
        talentIds: this.talentIds,
      })
        .then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.waitPrimary.length > 0) {
              this.dataSources = res.data.data.waitPrimary;
              this.dataSources.forEach((item, index) => {
                this.dataSources[index].indexNum = index + 1;
              });
              console.log(this.dataSources);
              if (res.data.data.waitPrimary.length > 10) {
                this.data = res.data.data.waitPrimary.slice(0, 10);
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
                console.log(this.data);
              } else {
                this.data = res.data.data.waitPrimary;
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              }
            } else {
              this.dataSources = [];
              this.data = [];
            }

            this.total = Number(this.tabList[1].num);
            // this.data = res.data.data.waitPrimary;
            this.selectedRowKeys = [];
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    // 面试官筛选列表
    getPrimaryPassInfoInit() {
      this.current=1
      this.loading = true;
      getPrimaryPassInfo({
        fullName: this.keyword,
        resumePhone: this.phoneValue,
        resumeMail: this.emailValue,
        demandId: this.$route.query.demandId,
        talentIds: this.talentIds,
      })
        .then((res) => {
          console.log(res)
          if (res.data.code == 0) {
            if (res.data.data.primarylist.length > 0) {
              this.dataSources = res.data.data.primarylist;
              this.dataSources.forEach((item, index) => {
                this.dataSources[index].indexNum = index + 1;
              });
              if (res.data.data.primarylist.length > 10) {
                this.data = res.data.data.primarylist.slice(0, 10);
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              } else {
                this.data = res.data.data.primarylist;
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              }
            } else {
              this.dataSources = [];
              this.data = [];
            }
            this.total = Number(this.tabList[2].num);
            this.selectedRowKeys = [];
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    // 预约面试列表
    getForInterviewInit() {
       this.current=1
      this.loading = true;
      getForInterview({
        fullName: this.keyword,
        resumePhone: this.phoneValue,
        resumeMail: this.emailValue,
        demandId: this.$route.query.demandId,
        talentIds: this.talentIds,
      })
        .then((res) => {
          console.log(res)
          if (res.data.code == 0) {
            if (res.data.data.getForlist.length > 0) {
              this.dataSources = res.data.data.getForlist;
              this.dataSources.forEach((item, index) => {
                this.dataSources[index].indexNum = index + 1;
              });
              if (res.data.data.getForlist.length > 10) {
                this.data = res.data.data.getForlist.slice(0, 10);
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              } else {
                this.data = res.data.data.getForlist;
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              }
            } else {
              this.dataSources = [];
              this.data = [];
            }
            this.total = Number(this.tabList[3].num);
            // this.data = res.data.data.getForlist;
            this.selectedRowKeys = [];
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    // offer列表
    getPassInterviewInfoInit() {
       this.current=1
      this.loading = true;
      getPassInterviewInfo({
        fullName: this.keyword,
        resumePhone: this.phoneValue,
        resumeMail: this.emailValue,
        demandId: this.$route.query.demandId,
        talentIds: this.talentIds,
      })
        .then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.passlist.length > 0) {
              this.dataSources = res.data.data.passlist;
              this.dataSources.forEach((item, index) => {
                this.dataSources[index].indexNum = index + 1;
              });
              if (res.data.data.passlist.length > 10) {
                this.data = res.data.data.passlist.slice(0, 10);
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              } else {
                this.data = res.data.data.passlist;
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              }
            } else {
              this.dataSources = [];
              this.data = [];
            }
            this.total = Number(this.tabList[4].num);
            // this.data = res.data.data.passlist;
            this.selectedRowKeys = [];
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    // 入职列表
    getWaitEntryInfoInit() {
       this.current=1
       
      this.loading = true;
      getWaitEntryInfo({
        fullName: this.keyword,
        resumePhone: this.phoneValue,
        resumeMail: this.emailValue,
        demandId: this.$route.query.demandId,
        talentIds: this.talentIds,
      })
        .then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.waitEntrylist.length > 0) {
              this.dataSources = res.data.data.waitEntrylist;
              this.dataSources.forEach((item, index) => {
                this.dataSources[index].indexNum = index + 1;
              });
              if (res.data.data.waitEntrylist.length > 10) {
                this.data = res.data.data.waitEntrylist.slice(0, 10);
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              } else {
                this.data = res.data.data.waitEntrylist;
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              }
            } else {
              this.dataSources = [];
              this.data = [];
            }
            this.total = Number(this.tabList[5].num);
            // this.data = res.data.data.waitEntrylist;
            this.selectedRowKeys = [];
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    // 候选人放弃列表
    getGiveUpOfferInfoInit() {
       this.current=1
      this.loading = true;
      getGiveUpOfferInfo({
        fullName: this.keyword,
        resumePhone: this.phoneValue,
        resumeMail: this.emailValue,
        demandId: this.demandId,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.data = res.data.data.passlist;
            this.data.forEach((item, index) => {
              this.data[index].indexNum = index + 1;
            });
            this.selectedRowKeys = [];
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    // 已入职列表
    getWorkInfoInit() {
       this.current=1
      this.loading = true;
      getWorkInfo({
        fullName: this.keyword,
        resumePhone: this.phoneValue,
        resumeMail: this.emailValue,
        demandId: this.$route.query.demandId,
        talentIds: this.talentIds,
      })
        .then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.worklist.length > 0) {
              this.dataSources = res.data.data.worklist;
              this.dataSources.forEach((item, index) => {
                this.dataSources[index].indexNum = index + 1;
              });
              if (res.data.data.worklist.length > 10) {
                this.data = res.data.data.worklist.slice(0, 10);
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              } else {
                this.data = res.data.data.worklist;
                this.data.forEach((item, index) => {
                  this.data[index].indexNum = index + 1;
                });
              }
            } else {
              this.dataSources = [];
              this.data = [];
            }
          
            // this.data = res.data.data.worklist;
            this.data.map((item) => {
              if (item.plannedWorkingDate) {
                item.plannedWorkingDate = this.moment(
                  item.plannedWorkingDate
                ).format("YYYY-MM-DD");
              }
            });  
            this.total = Number(this.tabList[6].num);
            this.selectedRowKeys = [];
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
     getEliminateInfoInit(){
       this.loading = true;
    
    //  this.$route.query.demandId
      getEliminatedInfo({
      
        fullName: this.keyword,
        resumePhone: this.phoneValue,
        resumeMail: this.emailValue,
        demandId: this.$route.query.demandId,
        talentIds: this.talentIds,
         
      }).then(res=>{
     
            if (res.data.code == 0) {
            
              if (res.data.data.eliminatedList.length > 0){
                console.log(res)
                   this.dataSources = res.data.data.eliminatedList;
                  this.dataSources.forEach((item, index) => {
                  this.dataSources[index].indexNum = index + 1;
                  });
                  if (res.data.data.eliminatedList.length > 10) {
                    this.data = res.data.data.eliminatedList.slice(0, 10);
                    this.data.forEach((item, index) => {
                      this.data[index].indexNum = index + 1;
                    });
                  } else {
                    this.data = res.data.data.eliminatedList;
                    this.data.forEach((item, index) => {
                      this.data[index].indexNum = index + 1;
                    });
                  }
              
                  
              }else{
                 this.dataSources = [];
                 this.data = [];
              }
                this.total = Number(this.tabList[7].num);
            // this.data = res.data.data.getForlist;
              this.selectedRowKeys = [];
            }else{
              this.data=[]
            }
      }).catch(err=>{
        console.log(err)
      })
      .finally((res) => {
          this.loading = false;
        });
    },
    // 确认offer
    handlePopOfferClick(e) {
      console.log(e, "e");
      this.staffOfferVisible = true;
      this.offerList = e;
      this.offerListType = this.defaultModel;
      let tmpList = {
        demandId: e.demandId, // 需求编号
        organizeId: e.orgId, // 部门id
        positionName: e.positionName, // 任务名称
        organizeName: e.organizeName, // 应聘部门
        // demandName: this.demandName, // 需求名称
      };
      this.departmentList = tmpList;
    },
    handleInit() {
      return false;
    },
    handelOfferChangeClose() {
      this.offerChangeVisible = false;
    },
    handleOfferSeeClose() {
      this.staffOfferSeeVisible = false;
    },
    //修改offer
    async handleChangeOfferClick(e) {
      console.log(e);
      try {
        this.offerChangeLoading = true;
        // this.offerChangeVisible = true
        const res = await getAffirmOffer({ talentId: e.talentId });
        if (res.data.code == 0) {
          if (res.data.data.jobOfferList[0].resultDes == "查询结果为空") {
            this.$message.success("查询结果为空");
            return false;
          } else {
            this.offerChangeLoading = false;
            if (res.data.data.length == 0) {
              this.$message.error(res.data.mesg);
            } else {
              this.offerChangeList = res.data.data.jobOfferList[0];
              this.offerChangeVisible = true;
            }
          }
        }
      } catch {}
    },
    //查看offer
    async handleOfferClick(e) {
      try {
        this.recruitOfferLoading = true;
        const res = await getAffirmOffer({
          talentId: e.talentId,
        });
        if (res.data.code == 0) {
          if (res.data.data.jobOfferList[0].resultDes == "查询结果为空") {
            this.$message.success("查询结果为空");
            return false;
          } else {
            this.recruitOfferLoading = false;
            if (res.data.data.length == 0) {
              this.$message.error(res.data.mesg);
            } else {
              this.recruitOfferList = res.data.data.jobOfferList[0];
              this.staffOfferSeeVisible = true;
            }
          }
        }
        // else if(res.data.code == 2) {
        //   if(res.data.data.length==0) {
        //     this.$message.error(res.data.mesg);
        //   }
        // }
      } catch (error) {}
    },
    // 预约面试
    handleAuditionClick(e, type) {
      console.log(e,type, "预约面试");
      if (type === 1) {
        this.checkIsCanInterviewInit(e);
      } else {
        this.staffAuditionVisible = true;
      }
      this.auditionList = e;
      this.organizeName = e.organizeName;
      this.positionName = e.positionName;
      this.customId = this.customId;
      this.interviewer = e.InterviewerList === undefined ? "" : e.InterviewerList.join(",");
      this.copyTo = e.copyToList === undefined ? "" : e.copyToList.join(",");
      this.reInterviewer = e.reInterviewerList === undefined ? "" : e.reInterviewerList.join(",");
      this.auditonType = type;
      this.getTalentInterviewByIdInit(e);
    },
    async checkIsCanInterviewInit(e) {
      const res = await checkIsCanInterview({
        talentId: e.talentId,
        resumeId: e.resumeId,
      });
      if (res.data.code == 0) {
        this.staffAuditionVisible = true;
      } else {
        this.$message.warning(res.data.mesg);
      }
    },
    async getTalentInterviewByIdInit(e) {
      try {
        if (e.interviewId === null) {
          return false;
        } else {
          const res = await getTalentInterviewById({
            interviewId: e.interviewId,
          });
          if (res.data.code == 0) {
            this.interviewerList = res.data.data;
            // console.log(this.interviewerList,'aaaaaa')
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 面试结论
    handleConcluClick(e) {
      this.staffConcluVisible = true;
      this.organizeName = this.organizeName? this.organizeName: e.organizeName;
      this.concluList = e;
      this.getInterviewInfoListInit(e);
    },
    async getInterviewInfoListInit(e) {
      try {
        const res = await getInterviewInfoList({
          talentId: e.talentId, // 候选人id
        });
        this.talentList = res.data.data.interviewList[0];
      } catch (error) {}
    },
    handlePopClick(type) {
      if (this.selectedRowKeys.length == 0) {
        this.$message.error("请选择操作人员！");
        return false;
      }
      this.staffVisible = true;
      this.type = type;
      this.jobTalentId = this.selectedList;
      this.customId = this.customId;
    },
    // 放弃邀约
    giveUpInterview() {
      if (this.selectedRowKeys.length == 0) {
        this.$message.error("请选择操作人员！");
        return false;
      }
      let listSelect = []

      this.selectedList.map(val => {
        if (val.status === 30) {
          listSelect.push(val)
        }
      })
      if (listSelect.length > 0) {
        if (listSelect.length === 1 && this.selectedList.length === 1) {
          this.handleAuditionClick(this.selectedList[0], 5)
          return ;
        } else {
          this.$message.warning('不能批量放弃初试邀约成功的')
          return ;
        }
      } else {
        this.handlePopClick(5, {})
        return ;
      }
    },
    handleTabsChange(e) {
      // this.selectedRowKeys = []
      console.log(11111)
      this.data=[]
      this.dataSources=[]
      this.total=1;
      this.current=1
      if (e == 1 || e == 8 || e==9) {
          
        this.rowShow = false;
      } else {
          
        this.rowShow = true;
      }
      this.defaultModel = e;
      this.getCountJobInit();
      switch (e) {
        case 1:
          // 全部
          this.getCandidateInfoInit();
          break;
        case 2:
          // 负责人初选
          this.getWaitPrimaryInfoInit();
          break;
        case 3:
          this.getPrimaryPassInfoInit();
          break;
        case 4:
          // 预约面试
          this.getForInterviewInit();
          break;
        case 5:
          // offer
          this.getPassInterviewInfoInit();
          break;
        case 6:
          // 入职
          this.getWaitEntryInfoInit();
          break;
        case 7:
          // 候选人
          this.getGiveUpOfferInfoInit();
          break;
        case 9:// 已淘汰
          
          this.getEliminateInfoInit();
          break;
          
        default:
          // 已入职
          this.getWorkInfoInit();
          break;
      }
    },
    // 推荐至面试官
    handleHrClick() {
      console.log(this.selectedList, "推荐");
      if (this.selectedRowKeys.length == 0) {
        this.$message.error("请选择操作人员！");
        return false;
      }
      if (this.$route.query.copyType == "职位") {
        let tmpNewHrList = this.selectedList;
        this.staffRecommendVisible = true;
        this.recommendList = tmpNewHrList;
        this.positionName = this.positionName;
        this.organizeName = this.organizeName;
        this.copyTo = this.copyTo;
        this.reInterviewer = this.reInterviewer;
        this.demandId = this.demandId;
        this.resumeFilter = this.resumeFilter;
      } else {
        if (this.selectedRowKeys.length > 1) {
          this.$message.error("只能选择一个人员！");
          return false;
        } else {
          console.log(this.selectedList, '面试官筛选 -- 推荐简历')
          this.selectedList.map((item) => {
            let tmpNewHrList = this.selectedList;
            this.staffRecommendVisible = true;
            this.recommendList = tmpNewHrList;
            this.positionName = item.positionName;
            this.organizeName = item.organizeName;
            this.copyTo = item.copyToList === undefined ? "" : item.copyToList.join(",");
            this.reInterviewer = item.reInterviewer;
            this.demandId = item.demandId;
            this.resumeFilter = item.filterList === undefined ? "" : item.filterList.join(",");
          });
        }
      }
    },
    // 查看简历
    handleCheckClick(e) {
      this.$router.push({
        name: "TalentProfileDetail",
        query: { id: e.resumeId },
      });
    },
    recruitActionInit(e) {
      switch (e) {
        case 2:
          // 初选
          this.getWaitPrimaryInfoInit();
          this.getCountJobInit();
          break;
        case 3:
          // 面试官筛选
          this.getPrimaryPassInfoInit();
          this.getCountJobInit();
          break;
        case 4:
          // 预约面试
          this.getForInterviewInit();
          this.getCountJobInit();
          break;
        case 5:
          // offer
          this.getPassInterviewInfoInit();
          this.getCountJobInit();
          this.staffOfferVisible = false;
          break;
        case 6:
          // 入职
          this.getWaitEntryInfoInit();
          this.getCountJobInit();
          break;
        case 7:
          // 候选人放弃
          this.getGiveUpOfferInfoInit();
          this.getCountJobInit();
          this.staffOfferVisible = false;
          break;
        case 9:
          // 已淘汰
         
          this.getEliminateInfoInit();
          this.getCountJobInit();
           this.staffOfferVisible = false;
          // this.staffOfferVisible = false;
          break;
        default:
          // 已入职
          this.getCandidateInfoInit();
          this.getCountJobInit();
       
          break;
      }
    },
  },
};
</script>

<style scoped>
.mateAction {
  min-height: 100%;
}
.mateAction-tabs {
  background: #fff;
  margin-bottom: 12px;
  padding: 20px 22px;
}
.mateAction >>> .ant-tabs-ink-bar {
  top: 0;
}
.mateAction >>> .ant-tabs-bar {
  margin: 0;
}
.mateAction-content {
  background: #fff;
  padding: 22px;
  padding-top: 0;
}
.mateAction-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mateAction-main {
  padding: 15px 0 15px 2px;
}
.mateAction-color {
  color: rgb(20, 120, 227);
}
.color-second {
  margin: 0 20px;
}
.mateAction >>> .ant-tabs-bar {
  font-size: 12px;
  border-bottom: 0;
}
.mateAction >>> .tab-title {
  color: #333333;
  display: flex;
}
.mateAction .tab-green {
  border-radius: 50%;
  border: 1px solid #22b8cf;
  background: #22b8cf;
  width: 50px;
  height: 50px;
  padding: 12px 13px;
  margin-right: 18px;
}
.mateAction .tab-blue {
  border: 1px solid #1478e3;
  background: #1478e3;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 18px;
  padding: 13px;
}
.mateAction .tab-right {
  font-size: 20px;
  display: flex;
  flex-direction: column;
}
.mateAction .tab-right span:first-child {
  font-size: 12px;
}
.mateAction .tab-right span:last-child {
  font-weight: 500;
}
.mateAction >>> .ant-tabs-nav .ant-tabs-tab-active {
  color: #333333;
}
.mateAction >>> .ant-tabs-nav {
  width: 100%;
}
.mateAction >>> .ant-tabs-tab {
  margin: 0;
  padding: 31px 20px;
}
.mateAction >>> .ant-table-thead > tr > th {
  border-bottom: 0;
  color: rgba(132, 145, 158, 1);
  font-weight: bold;
  cursor: pointer;
}
.mateAction >>> .ant-table-tbody > tr > td {
  border-bottom: 0;
}
.button-info {
  color: #fff;
  background-color: #22b8cf;
  border-color: #22b8cf;
  margin-left: 10px;
}

.button-info:hover {
  color: #fff;
  background-color: #4ec6d8;
  border-color: #4ec6d8;
}
.button-danger {
  color: #fff;
  background-color: #fd5158;
  border-color: #fd5158;
}
.button-danger:hover {
  color: #fff;
  background-color: #fd7379;
  border-color: #fd7379;
}
.button-info[disabled] {
  color: #999;
  background-color: #fff;
  border-color: #999;
}
.mateAction-right {
  display: flex;
  justify-content: flex-end;
  margin: 5px 0;
  /* height: 32px; */
}
.input-item {
  width: 70%;
  margin-right: 10px;
  margin-bottom: 18px;
}
.label-span {
  margin: 0 10px 0 10px;
  color: #000;
}
.pagination-style {
  float: right;
  margin-top: 20px;
}
.success {
  color: #1478e3;
  background-color: #e0f6ff;
  border-color: #1478e3;
}
.wait {
  color: #feaa19;
  background-color: #fffbe0;
  border-color: #feaa19;
}
.green {
  color: #9400d3;
  background-color: #fafafa;
  border-color: #9400d3;
}
.first-green {
  color: #21b7cf;
  background-color: #e0f8fc;
  border-color: #21b7cf;
}
.faild-none {
  border: none;
  background: none;
}
</style>
<style scoped>
.faild {
  color: #fc3d09;
  background-color: #fff0e2;
  border-color: #fc3d09;
}
.jianli-pipei {
  border-color: #409eff;
  background-color: #ffffff;
  color: #409eff;
}
.chuxuan-tongguo {
  color: #1478e3;
  background-color: #e0f6ff;
  border-color: #1478e3;
}
.saixuan-tongguo {
  color: #74d10a;
  background-color: #f7ffef;
  border-color:  #74d10a;
}
.chushi-chenggong {
  color: #feaa19;
  background-color: #fffbe0;
  border-color: #feaa19;
}
.chushi-tongguo {
  color: #21b7cf;
  background-color: #e0f8fc;
  border-color: #21b7cf;
}
.fushi-yaoxue-chengong {
  color: #feaa19;
  background-color: #fffbe0;
  border-color: #feaa19;
}
.fushi-tongguo {
  color: #9400d3;
  background-color: #fafafa;
  border-color: #9400d3;
}
.three-yaoyue-mianshi-chenggong {
  color: #feaa19;
  background-color: #fffbe0;
  border-color: #feaa19;
}
.three-mianshi-tonguo {
  color: #9400d3;
  background-color: #fafafa;
  border-color: #9400d3;
}
.mianshi-tongguo {
  color: rgb(247, 156, 171);
  background-color: rgb(250, 244, 244);
  border-color: rgb(247, 156, 171);
}
.offer-success {
  color: #0c7ab1;
  background-color: #b1e1f3;
  border-color: #1c7eaf;
}
.yi-ruzi {
  color: green;
  background-color: rgb(212, 240, 212);
  border-color: green;
}
</style>