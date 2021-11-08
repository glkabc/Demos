<template>
  <div class="department">
      <div>
          <DepartmentSearchNew
          :organizeIds.sync="organizeIds"
          :positionName.sync="positionName"
          :specialistId.sync="specialistId"
          :statusValue.sync="statusValue"
          :jobValue.sync="jobValue"
          :groupValue.sync="groupValue"
          :cityValue.sync="cityValue"
          :keywordValue.sync="keywordValue"
          :startTime.sync="startTime"
          :endTime.sync="endTime"
          :statusSelect.sync="statusSelect"
          @inquire="handleInquire"
          />
        </div>
    <div class="department-head">
      <!-- <div class="department-left">
        <DepartmentSearch 
          :organizeIds.sync="organizeIds"
          :specialistId.sync="specialistId"
          :statusValue.sync="statusValue"
          :jobValue.sync="jobValue"
          :groupValue.sync="groupValue"
          :cityValue.sync="cityValue"
          :keywordValue.sync="keywordValue"
          @handleSearchChange="handleSearchChange"
        />
        <div class="department-check">
          <a-radio-group @change="handleStatus" v-model="statusSelect">
            <a-radio
              :value="item.value"
              v-for="item in recruitQueryTypes"
              :key="item.value"
              >{{ item.label }}</a-radio
            >
          </a-radio-group>
        </div>
      </div> -->
      <div class="department-content">
        <can-i-use code="zpgl-rwzx-ppjl">
          <a-button
            style="background: #22B8CF;border: #22B8CF"
            type="primary"
            @click="handleMateClick"
            >匹配简历</a-button
          >
        </can-i-use>
        <!-- <can-i-use code="zpgl-rwzx-nt">
          <a-button
            style="background: #22B8CF;border: #22B8CF"
            type="primary"
            :disabled="suspendStatusFlag"
            @click="handlePolateClick"
            >内推</a-button>
        </can-i-use> -->
        <!-- <can-i-use code="zpgl-rwzx-zpfzrbg">
          <a-button
            style="background: #22B8CF;border: #22B8CF"
            type="primary"
            @click="handleModifyClick"
            >招聘负责人变更</a-button>
        </can-i-use> -->
        
        <!-- <can-i-use code="zpgl-rwzx-zpgb">
          <a-button
            type="primary"
            style="background: #FD5158;border: #FD5158;"
            :disabled="closeStatusFlag"
            @click="handleUpdateClick(1)"
            >关闭</a-button
          >
        </can-i-use>   -->
        <can-i-use code="zpgl-rwzx-zphf">
          <a-button
            style="background: #4480EE;border: #4480EE"
            type="primary"
            @click="handleUpdateClick(3)"
            :disabled="renewStatusFlag"
            >上线</a-button
          >
        </can-i-use>
        <can-i-use code="zpgl-rwzx-zpzt">
          <a-button
            style="background: #4480EE;border: #4480EE"
            :disabled="suspendStatusFlag"
            type="primary"
            @click="handleUpdateClick(2)"
            >暂停</a-button
          >
        </can-i-use>
        <can-i-use code="zpgl-rwzx-zpfzrbg">
          <a-select
            v-model="specialistValue"
            placeholder="招聘负责人"
            :filter-option="filterOption"
            @change="handleRoleClick"
            @blur="handleContanctBlur"
            @focus="handleContentFocus"
            style="width:220px;float:right"
            showSearch
            allowClear
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            :open="isOpen"
          > 
            <div slot="dropdownRender" slot-scope="menu">
              <v-nodes :vnodes="menu" />
              <a-divider style="margin: 4px 0;" />
              <div
                style="padding: 4px 8px; cursor: pointer;"
                @mousedown="e => e.preventDefault()"
              >  
                <a-button @click="handleDistribution" type="primary" size="small" style="background: #22B8CF;border: #22B8CF;float:right;margin-bottom:5px">分配</a-button>
                <a-button size="small" @click="isOpen = false" style="float:right">取消</a-button>
              </div>
            </div>
            <a-select-option
              :value="item.userId"
              v-for="item in optionUserList"
              :key="item.userId"
              >{{ item.userName }}</a-select-option
            >
          </a-select>
        </can-i-use>
      </div>
    </div>
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      bordered
      size="middle"
      class="zebra"
      :scroll="{ x: 1680, y: screenHeight - 410}"
      :loading="loading"
      @change="onShowSizeChange"
      rowKey="demandId"
      :rowSelection="{
        onChange: onSelectChange,
        onSelect: onSelectClick,
        selectedRowKeys: selectedRowKeys,
        getCheckboxProps: (record) => ({
          props: {
            disabled: record.state == '2',
          },
        }),
      }"
    >
      <!-- <span slot="status" slot-scope="record, item">
        <span>
          <a-badge
            status="processing"
            :color="getStatusBadge(item.status).type"
          />
          {{ getStatusBadge(item.status).name }}
        </span>
      </span> -->
      <!-- <span slot="emergencyLevel" slot-scope="record, item">
        
      </span> -->
      <span slot="customTitle"> <a-icon style="margin-left:5px" type="setting" theme="filled" @click="handleSetTableHeader"/></span>
      <span slot="action" slot-scope="record, item">
        <a-popover  placement="left"  overlayClassName="popover-container-add">
            <template slot="content" class="popover-container-add" >
             <can-i-use code="zpgl-rwzx-zpcz">
          <a v-if="item.state == 1" @click="handleActionClick(item)" style="color:#fff;">操作</a>
        </can-i-use>
        <a @click="handleCheckClick(item)" v-if="item.state != 1" style="color:#fff;">查看</a>
        <can-i-use code="zpgl-rwzx-ckbz">
          <span>
            <a-divider type="vertical" />
            <a @click="handleLookRemark(item)" style="color:#fff;">查看备注</a>
          </span>
        </can-i-use>
        <can-i-use code="zpgl-rwzx-xzgl">
          <span>
            <a-divider type="vertical" />
            <a @click="handleWorkClick(item)" style="color:#fff;">协作管理</a>
          </span>
        </can-i-use>
            </template>
             <a-icon type="more"  class="icon-more" />
          </a-popover>
        <!-- <can-i-use code="zpgl-rwzx-zpcz">
          <a v-if="item.state == 1" @click="handleActionClick(item)">操作</a>
        </can-i-use>
        <a @click="handleCheckClick(item)" v-if="item.state != 1">查看</a>
        <can-i-use code="zpgl-rwzx-ckbz">
          <span>
            <a-divider type="vertical" />
            <a @click="handleLookRemark(item)">查看备注</a>
          </span>
        </can-i-use>
        <can-i-use code="zpgl-rwzx-xzgl">
          <span>
            <a-divider type="vertical" />
            <a @click="handleWorkClick(item)">协作管理</a>
          </span>
        </can-i-use> -->
        <!-- <can-i-use code="zpgl-rwzx-ycgb">
          <span>
            <a-divider type="vertical" />
            <a @click="handleCloseClick(item)">异常关闭</a>
          </span>
        </can-i-use> -->
      </span>
      <template slot="positionName" slot-scope="name,item">
        <!-- <span
          style="cursor: pointer;color: #4480EE;margin-right: 10px"
          @click="detailNameClick(item.demandId)"
          >{{ item.positionName }}</span
        > -->
        <!-- <a-popover title="招聘进展" placement="right" destroyTooltipOnHide>
          <template v-slot:content>
            <pie-chart :id="distributionId" />
          </template> -->
          <!-- <span slot="status" slot-scope="name, item"> -->
        <span :class="getStatusBadge(item.state).type">
           {{ getStatusBadge(item.state).name }} 
        </span>
          <a :class="getEmergency(item.emergencyLevel).type">{{
          getEmergency(item.emergencyLevel).name
        }}</a>
          <span  style="color: #4480EE;margin-left: 10px;cursor:pointer" @click="detailNameClick(item.demandId)">{{ item.positionName }} </span>
      </template>
      <span slot="recruitNum" slot-scope="name, item">
        <span>{{ item.employNum }} / {{ item.waitNum }} / {{ item.abnormalNum }} </span>
      </span>
      <span slot="no" slot-scope="name, item">
        <span
          style="cursor: pointer;color: #4480EE;margin-right: 10px"
          >{{ item.no }}</span
        >
        <span  @click="handleCopy(item.no)" title="复制职位编号" >
          <a-icon type="copy" />
        </span>
      </span>
    </a-table>
    <RecruitDetail :show.sync="recruitVisible" :list="detailList" />
    <abnormal-close 
      :show.sync="abnormalVisible" 
      :distributionId="distributionCloseId" 
      :demandId="demandCloseId"
      :waitNums="waitNums"
      @add-success="getRecruitJobInit"
    />
    <ConfirmClose
      @add-success="getRecruitJobInit"
      :confirmList="confirmList"
      :updateType="updateType"
      :confirmVisible.sync="staffVisible"
      :newIdList="newIdList"
      :newDemandList="newDemandList"
    />
    <a-drawer
      placement="right"
      :closable="false"
      title="协作人管理"
      width="500"
      @close="handleWorkClose"
      :visible="staffWorkVisible"
    >
      <TeamWork ref="workRefList" :workList="workList" :userList="userList"/>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: '50%',
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button
          :style="{ marginRight: '8px' }"
          @click="staffWorkVisible = false"
        >
          取消
        </a-button>
        <a-button
          @click="handleWorkSubmit"
          type="primary"
          style="background: #22B8CF;border: #22B8CF"
          >提交</a-button
        >
      </div>
    </a-drawer>
    <a-drawer
      placement="right"
      :closable="false"
      :destroyOnClose="true"
      title="变更招聘负责人"
      width="500"
      @close="staffPersonVisible = false"
      :visible="staffPersonVisible"
    >
      <person-change
        ref="personRefList"
        :specialistValue.sync="specialistValue"
        :remarkValue.sync="remarkValue"
        :userList="userList"
      />
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button
          :style="{ marginRight: '8px' }"
          @click="staffPersonVisible = false"
        >
          取消
        </a-button>
        <a-button
          @click="handlePersonSubmit"
          type="primary"
          style="background: #22B8CF;border: #22B8CF"
          >提交</a-button
        >
      </div>
    </a-drawer>
    <a-drawer
      placement="right"
      :closable="false"
      title="备注详情"
      width="500"
      @close="handleClose"
      :visible="staffRemarkVisible"
      :afterVisibleChange="afterVisibleChange"
    >
      <div class="drawer-box-bz">
        <div v-if="recruitLoading">
          <a-skeleton active :paragraph="{ rows: 4 }" />
        </div>
        <a-timeline v-if="!recruitLoading">
          <a-timeline-item
            v-for="item in remarkList"
            :key="item.demandRemarkId"
          >
            <a-icon slot="dot" type="check-circle" />
            <div class="progress-main">
              <span>创建人时间：{{ item.createUserTime }}</span>
              <div>创建人名称： {{ item.createUserName }}</div>
              <div
                v-text="item.remark ? '备注：' + item.remark : '备注： 暂无'"
              >
                备注：{{ item.remark }}
              </div>
            </div>
          </a-timeline-item>
        </a-timeline>
        
      </div>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          
          width: '100%',
         
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
      <div style="margin-top: 10px;margin-bottom:20px;">
          <a-textarea
            placeholder="请输入备注"
            :rows="4"
            v-model="departmentValue"
            @change="handleChange"
          />
        </div>
        <a-button
          :style="{ marginRight: '8px' }"
          @click="staffRemarkVisible = false"
        >
          取消
        </a-button>
        <a-button
          @click="handleReamrkSubmit"
          type="primary"
          style="background: #22B8CF;border: #22B8CF"
          >增加备注</a-button
        >
      </div>
    </a-drawer>
    <a-modal v-model="isSetTable" title="选择需要展示的数据项" :footer="null">
      <a-checkbox-group style="width:100%" v-model="selectValueLists" @change="handleCheckChange">
        <a-row>
          <a-col :span="6" v-for="item in selectLists" :key="item.value" class="select-header">
            <a-checkbox :value="item.title">
              {{item.title}}
            </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-modal>
  </div>
</template>

<script>
import RecruitDetail from "./department/recruitDetail/RecruitDetail";
import AbnormalClose from "./department/recruitDetail/AbnormalClose";
import ConfirmClose from "./department/recruitDetail/ConfirmClose";
// import DepartmentSearch from "./department/recruitDetail/DepartmentSearch";
import DepartmentSearchNew from "./department/recruitDetail/DepartmentSearchNew";
import TeamWork from "./department/recruitDetail/TeamWork";
import PersonChange from "./department/recruitDetail/PersonChange";
// import PieChart from "./department/PieChart";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import { Trim } from "../../../trim/trim"
import {
  getRecruitJob,
  getRemandPartitionById,
  getDemandRemark,
  addDemandRemark,
  getCooperator,
  mtnCooperator,
  changeSpecialis,
  getSameDemandJob,
  getDemandCooperator
} from "@api/department/index";
import { getUserInfoList } from "@api/manage/index";
import { getSetup,getCountJob} from "@api/department/operation";
import { createIntroversionDemand } from '@api/Interpolate/index';
import { getDemandById } from "@api/branchHC/index";
// import { getCountJob } from "../../../../api/department/operation";
const columns = [
  {
    title: "职位名称",
    key: "positionName",
    align: "left",
    width: 180,
    fixed: "left",
    // ellipsis: true,
    scopedSlots: { customRender: "positionName" },
  },
  {
    title: "需求部门",
    dataIndex: "organizeName",
    key: "organizeName",
    align: "left",
    width: 300,
    ellipsis: true,
  },
  
  {
    title: "工作地点",
    dataIndex: "areaCodeName",
    key: "areaCodeName",
    width: 100,
    ellipsis: true,
  },
  {
    title: "职级职等",
    dataIndex: "level",
    key: "level",
    width: 100,
  },
  {
    title: "已招/待招/异常关闭",
    dataIndex: "recruitNum",
    key: "recruitNum",
    width: 180,
    scopedSlots: { customRender: "recruitNum" },
  },
  
  {
    title: "岗位负责人",
    dataIndex: "specialistName",
    key: "specialistName",
    align: "left",
    width: 100,
  },
  {
    title: "协作人",
    dataIndex: "cooperatorNameList",
    key: "cooperatorNameList",
    align: "left",
    width: 100,
    ellipsis: true,
  },
  {
    title: "简历筛选人",
    dataIndex: "resumeFilterName",
    key: "resumeFilterName",
    align: "left",
    width: 100,
    ellipsis: true,
  },
  {
    title: "初试面试官",
    dataIndex: "interviewerName",
    key: "interviewerName",
    align: "left",
    width: 100,
    ellipsis: true,
  },
  {
    title: "复试面试官",
    dataIndex: "reInterviewerName",
    key: "reInterviewerName",
    align: "left",
    width: 100,
    ellipsis: true,
  },
  // {
  //   title: "交付负责人",
  //   dataIndex: "userName",
  //   key: "userName",
  //   align: "left",
  //   width: 100,
  // },
  {
    title: "推荐数",
    dataIndex: "tuijianshu",
    align: "left",
    width: 100,
  },
  {
    title: "筛选通过数",
    dataIndex: "tongguo",
    align: "left",
    width: 100,
  },
  {
    title: "面试",
    dataIndex: "mianshishu",
    align: "left",
    width: 100,
  },
  {
    title: "面试通过数",
    dataIndex: "mianshitongguo",
    align: "left",
    width: 100,
  },{
    title: "待入职",
    dataIndex: "waitEntry",
    align: "left",
    width: 100,
  },
  {
    title: "入职",
    dataIndex: "entry",
    align: "left",
    width: 100,
  },
  {
    dataIndex: "action",
    key: "action",
    width: 60,
    align: "center",
    fixed: "right",
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: "action" },
  }
];
const setColumns = [
  {
    title: "萝卜秀编号",
    dataIndex: "no",
    key: "no",
    width: 140,
    fixed:"left",
    scopedSlots: { customRender: "no" },
  },
  {
    title: "需求编号",
    dataIndex: "externalNum",
    key: "externalNum",
    align: "left",
    width: 120,
  },
  {
    title: "职位类别",
    dataIndex: "jobTypeName",
    key: "jobTypeName",
    ellipsis: true,
    width: 140,
  },
  {
    title: "发布人",
    dataIndex: "releaseUserName",
    key: "releaseUserName",
    width: 140,
  },
  {
    title: "发布时间",
    dataIndex: "releaseTime",
    key: "releaseTime",
    width: 140,
  },
  {
    title: "下线时间",
    dataIndex: "offlineAtDate",
    key: "offlineAtDate",
    width: 140,
  },
  {
    title: "创建时间",
    dataIndex: "createUserTime",
    key: "createUserTime",
    width: 140,
  },
  {
    title: "事业部",
    dataIndex: "groupName",
    key: "groupName",
    width: 140,
  },
]
export default {
  components: {
    RecruitDetail,
    ConfirmClose,
    TeamWork,
    PersonChange,
    AbnormalClose,
    DepartmentSearchNew,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      columns,
      screenHeight: document.documentElement.clientHeight,
      filterDropdown: false,
      detailVisible: false,
      branchVisible: false,
      selectedRowKeys: [],
      selectedRowList: [],
      detailList: {}, // 职位详情数据
      detailCloseList: {},
      abnormalVisible: false,
      distributionCloseId: '',
      demandCloseId: '',
      waitNums: '',
      recruitVisible: false,
      remarkList: [], // 查看备注列表数据
      searchValue: "", // 输入搜索
      statusSelect: 1, // 选择状态
      data: [],
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      organizeIds: undefined,
      specialistId: undefined,
      statusValue: undefined,
      jobValue: undefined,
      startTime: undefined,
      endTime: undefined,
      cityValue: '',
      keywordValue: '',
      positionName:'',
      groupValue: undefined,
      staffVisible: false,
      staffRemarkVisible: false, // 备注弹框
      staffWorkVisible: false, // 团队协作弹窗
      staffPersonVisible: false, // 变更负责人弹窗
      workList: [],
      userList: [],
      optionUserList: [],
      departmentIdList: {},
      updateType: "",
      confirmList: [],
      loading: false,
      closeStatusFlag: false,
      suspendStatusFlag: true,
      renewStatusFlag: true,
      checked: true,
      showPieChart: false,
      departmentValue: "",
      departmentList: {},
      recruitLoading: false,
      setupContent: "", // 匹配简历数
      typeSearch: 1,
      no: null, // 任务编号
      specialistValue: undefined,
      remarkValue: '',
      newIdList: [],
      newDemandList: '',
      isSetTable:false,
      selectLists:[
        {title:"萝卜秀编号",value:"1"},
        {title:"需求编号",value:"2"},
        {title:"职位类别",value:"d"},
        {title:"发布人",value:"3"},
        {title:"发布时间",value:"f"},
        {title:"下线时间",value:"g"},
        {title:"创建时间",value:"h"},
        {title:"事业部",value:"m"}
      ],
      selectValueLists:["萝卜秀编号"],
      optionUserId:undefined,
      isOpen:false
    };
  },
  computed: {
    ...mapState({
      recruitQueryTypes: (state) => state.recruitQueryTypes,
      emergencyLevels: (state) => state.emergencyLevels,
    }),
  },
  mounted() {
    this.getRecruitJobInit();
    this.getUserInfoListInit();
    this.getSetupInit();
    this.handleCheckChange()
    window.onresize = function () { // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight// 窗口高度
    }
  },
  methods: {
    handleDistribution() {
      if (this.selectedRowList.length == 0) {
        this.$message.error("请选择操作事项！");
        return false;
      }
      this.handlePersonSubmit()
    },
    handleSetTableHeader() {
      this.isSetTable = true
    },
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getRecruitJobInit();
    },
    handleSearchChange(){
      this.getRecruitJobInit()
    },
    // 查询
    handleInquire() {
      this.pagination.current = 1;
      this.getRecruitJobInit()
    },
    // 重置
    handleReset() {
      this.organizeIds= undefined
      this.specialistId= undefined
      this.statusValue= undefined
      this.jobValue= undefined
      this.cityValue= ''
      this.keywordValue= ''
      this.groupValue= undefined
      this.statusSelect= 1
    },
    // 设置需要展示的数据项
    handleCheckChange(e) {
      const newCol = setColumns.filter(v => {
        return this.selectValueLists.includes(v.title)
      })
      var newColumns = JSON.parse(JSON.stringify(columns))
      newColumns.splice(1,0,...newCol)
      this.columns = newColumns
    },
    // 获取系统用户列表
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList();
        this.userList = res.data.data.userList.list;
        this.optionUserList = [...this.userList]
      } catch (error) {}
    },
    handleStatus(e) {
      this.statusSelect = e.target.value;
      this.getRecruitJobInit();
    },
    async getCooperatorInit() {
      try {
        const res = await getDemandCooperator({
          demandId: this.departmentIdList.demandId,
        });
        this.workList = res.data.data.coopList;
        // console.log(this.workList,'this.workList')
      } catch (error) {}
    },
    // 获取协作人列表
    handleWorkClick(e) {
      console.log(e);
      this.departmentIdList = e;
      this.getCooperatorInit();
      this.getUserInfoListInit();
      this.staffWorkVisible = true;
    },
    handleCloseClick(e){
      this.abnormalVisible = true
      this.distributionCloseId = e.distributionId
      this.demandCloseId = e.demandId
      this.waitNums = e.waitNums
    },
    // 团队协作
    handleWorkClose() {
      this.staffWorkVisible = false;
    },
    handleCopy(value){
      const el = document.createElement(
        "textarea"
      );
      el.value = value;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.$message.success(
        "已复制到剪切板",
        1.5
      );
    },
    // 团队提交
    async handleWorkSubmit() {
      try {
        let newList = this.$refs.workRefList.tags;
        let newTmpList = [];
        console.log(newList)
        newList.map((item) => {
          newTmpList.push(item.uid);
        });
        const res = await mtnCooperator({
          coopList: newTmpList.length == 0 ? [0] : newTmpList,
          demandId: this.departmentIdList.demandId,
        });
        
        if (res.data.code == 0) {
          this.staffWorkVisible = false;
           this.$message.success('操作成功');
          this.getRecruitJobInit();
        } else {
          this.$message.error(res.data.mesg);
        }
      } catch (error) {}
    },
    getStatusBadge(status) {
      switch (status) {
        case 1:
          let statusFirst = {
            name: "在招",
            type: "greenColor",
          };
          return statusFirst;
          break;
        case 2:
          let statusSecond = {
            name: "下线",
            type: "dangerColor",
          };
          return statusSecond;
          break;
        case 3:
          let statusThird = {
            name: "暂停",
            type: "warningColor",
          };
          return statusThird;
          break;
        default:
          let statusFour = {
            name: "待发布",
            type: "bluesColor",
          };
          return statusFour;
          break;
      }
    },
    getEmergency(status) {
      switch (status) {
        case 1:
          let statusFirs = {
            name: "!",
            type: "blueColor",
          };
          return statusFirs;
          break;
        case 2:
          let statussecond = {
            name: "!!",
            type: "warningColor",
          };
          return statussecond;
          break;
        default:
          let statusThird = {
            name: "!!!",
            type: "dangerColor",
          };
          return statusThird;
          break;
      }
    },
    onSelectChange(selectedRowKeys, e) {
      this.selectedRowKeys = selectedRowKeys;
      let newRenewJob = e;
      if (newRenewJob.length > 0) {
        newRenewJob.map((item) => {
          console.log(item,'item');
          if (item.state == 3 ||item.state == 4 ) {//待发布和暂停可以上线
            this.suspendStatusFlag = true;
            this.renewStatusFlag = false;
            this.closeStatusFlag = true;
          } else if (item.state == 1) {//在招可以暂停
            this.suspendStatusFlag = false;
            this.renewStatusFlag = true;
            this.closeStatusFlag = false;
          }
        });
      } else {
        this.suspendStatusFlag = true;
        this.renewStatusFlag = true;
        this.closeStatusFlag = false;
      }
      this.selectedRowList = e;
    },
    // 判断按钮
    onSelectClick(e, checked) {
      this.checked = checked;
    },
    getRecruitJobInit() {
      this.loading = true;
      let tmpStatusSelect = this.statusSelect;
      let tmpStatusSelectArr=[];
      if(tmpStatusSelect=='9'){
        console.log(tmpStatusSelect)
        tmpStatusSelectArr.push(9);
        tmpStatusSelectArr.push(7);
        tmpStatusSelect=tmpStatusSelectArr.toString();
      }
      console.log(this.jobValue)
      // console.log(this.cityValue,this.cityValue.length,'this.cityValue');
      // if( this.cityValue.length > 0){
      //   this.cityValue = this.cityValue.join(",");
      // }
      getRecruitJob({
        specialistId: this.specialistId,//岗位负责人
        orgIds: this.organizeIds,//部门
        title:this.positionName,//职位名称
        no: this.keywordValue,//编号
        groupId: this.groupValue,
        jobType: this.jobValue,//职位类别
        emergencyLevel: this.statusValue,//紧急程度
        areaCode: this.cityValue,
        state: tmpStatusSelect,
        taskStart : this.startTime,
        taskEnd : this.endTime,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.data = res.data.data.demandList;
            this.pagination.total = res.data.data.meta.size;
            this.selectedRowKeys = [];
            this.renewStatusFlag = true;
            this.suspendStatusFlag = true;
          } else {
            this.data = [];
          }
        })
        .finally((res) => {
          this.loading = false;
        });
    },
    detailNameClick(e) {
      this.recruitVisible = true;
      this.getDemandByIdInit(e);
    },
    // getRemandPartitionByIdInit(id) {
    //   getRemandPartitionById({
    //     partitionId: id,
    //   }).then((res) => {
    //     if (res.data.code == 0) {
    //       this.detailList = res.data.data;
    //     }
    //   });
    // },
    // 获取列表
    async getDemandByIdInit(id) {
      try {
        let res = await getDemandById({
          demandId: id,
        });
        this.detailList = res.data.data.demand;

      } catch (error) {
        console.log(error);
      }
    },
    afterVisibleChange(e) {
      console.log(e);
    },
    handleClose(e) {
      this.staffRemarkVisible = false;
      this.departmentValue = "";
    },
    handleChange(e) {
      this.departmentValue = e.target.value;
    },
    // 增加备注
    handleReamrkSubmit() {
      
      if(this.departmentValue == "") {
        this.$message.error('请输入备注信息');
        return false;
      }
      if(this.departmentValue !=''){
        this.departmentValue = Trim(this.departmentValue);
        if(this.departmentValue == "") {
        this.$message.error('请输入备注信息');
        return false;
      }
      }
      console.log(this.departmentValue);
      addDemandRemark({
        demandId: this.departmentList.demandId,
        // partitionId: this.departmentList.partitionId,
        // distributionId: this.departmentList.distributionId,
        remark: this.departmentValue,
      }).then((res) => {
        this.staffRemarkVisible = false;
        this.$message.success(res.data.data);
        this.departmentValue = "";
        this.selectedRowKeys = [];
      });
    },
    // 查看备注
    async handleLookRemark(e) {
      console.log(e)
      this.staffRemarkVisible = true;
      let departmentList = {
        demandId: e.demandId,
        // partitionId: e.partitionId,
        // distributionId: e.distributionId,
      };
      this.departmentList = departmentList;
      try {
        this.recruitLoading = true;
        const res = await getDemandRemark({
          demandId: e.demandId,
          // partitionId: e.partitionId,
          // distributionId: e.distributionId,
        });
        this.recruitLoading = false;
        this.remarkList = res.data.data.remark;
      } catch (error) {}
    },
    async getSetupInit() {
      try {
        const res = await getSetup({
          setupType: 1,
        });
        this.setupContent = res.data.data.setupList[0].setupContent;
      } catch (error) {}
    },
    // 招聘进展
    // async getCountJobInit() {
    //   try {
    //     const res = await getCountJob({
    //       distributionId: this.departmentIdList.distributionId,
    //     })
    //   }
    // }
    // 匹配简历
    handleMateClick(e) {
      if (this.selectedRowList.length == 0) {
        this.$message.error("请选择操作事项！");
        return false;
      }
      console.log(this.selectedRowKeys,'this.selectedRowKeys')
      if (this.selectedRowKeys.length>this.setupContent ) {
        this.$message.error(
          "简历投递不能超过最大并行上限5，请合理安排简历投递!",
          () => {
            this.selectedRowKeys = [];
          }
        );
        return false;
      } else {
        let tmpNewMateList = this.selectedRowList;
        localStorage.setItem("remarkList", JSON.stringify(tmpNewMateList));
        this.$router.push({ name: "MateResume" });
      }
    },
    // 内推
    handlePolateClick(){
      if (this.selectedRowList.length == 0) {
        this.$message.error("请选择操作事项！");
        return false;
      }
      this.$confirm({
        title: '确定内推当前所选择的？',
        onOk:()=>{
          let introverList = []
          let tmpIntroverList = this.selectedRowList
          tmpIntroverList.map(item => {
            introverList.push({
              distributionId: item.distributionId,
              partitionId: item.partitionId,
            })
          })
          createIntroversionDemand({
            list: introverList
          }).then(res => {
            if(res.data.code == 0) {
              this.$message.success(res.data.data,() => {
                this.selectedRowKeys = [];
              })
            }else {
              this.$message.error(res.data.mesg,() => {
                this.selectedRowKeys = [];
              })
            }
          })
          // this.$router.push({
          //   name: 'Interpolate'
          // })
        },
        onCancel:() => {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleRoleClick(e) {

    },
    handleContanctBlur() {
      this.optionUserList = this.userList.slice(0, 100);
    },
    handleContentFocus() {
      this.isOpen = true
      this.optionUserList = this.userList.slice(0, 100);
    },
    // 招聘变更人
    handleModifyClick() {
      if (this.selectedRowList.length == 0) {
        this.$message.error("请选择操作事项！");
        return false;
      }
      this.getUserInfoListInit();
      this.staffPersonVisible = true;
    },
    // 负责人变更确认
    async handlePersonSubmit() {
      try {
        let newDataSpecialList = this.selectedRowList;
        let demandIdTmpList = [];
        newDataSpecialList.map((item) => {
          demandIdTmpList.push(item.demandId);
        });
        console.log(demandIdTmpList)
        const res = await changeSpecialis({
          demandId: demandIdTmpList,
          specialistId: this.specialistValue,
          remark: this.remarkValue
        })
        this.isOpen = false
        if(res.data.code == 0) {
          this.renewStatusFlag = true;
            this.suspendStatusFlag = true;
          this.getRecruitJobInit();
          this.$message.success(res.data.data,() => {
            this.selectedRowKeys = [];
            this.specialistValue=undefined
            
          })
        }else {
          this.$message.error(res.data.mesg,() => {
            this.selectedRowKeys = [];
          })
        }
      }
      catch(error) {console.log(res)}
    },
    // 查看
    handleCheckClick(e) {
      this.$router.push({
        name: "CheckInfo",
        query: { id: e.demandId },
      });
    },
    // 操作
    handleActionClick(e) {
      console.log(e,'ewert')
      this.$router.push({
        name: "MateAction",
        query: {
          // id: e.distributionId,
          organizeName: e.organizeName,
          organizeId: e.organizeId,
          customId: e.customId,
          positionName: e.positionName,
          // demandName: e.demandName,
          demandId: e.demandId,
          interviewer: e.interviewer,//初试
          reInterviewer: e.reInterviewer,//复试
          copyTo: e.copyTo,//抄送
          resumeFilter: e.resumeFilter//简历筛选人
        },
      });
    },
    closeBranch(e) {
      console.log(e);
      this.branchVisible = false;
    },
    isAllEqual(array) {
      if (array.length > 0) {
        return !array.some(function(value, index) {
          return value !== array[0];
        });
      } else {
        return true;
      }
    },
    handleUpdateClick(type) {
      if (this.selectedRowList.length == 0) {
        this.$message.error("请选择操作事项！");
        return false;
      }
      let tmpSelectedList = this.selectedRowList;
      let newDemandId = [];
      tmpSelectedList.map((item, index) => {
        newDemandId.push(item.demandId);
      });
      
      if (this.isAllEqual(newDemandId)) {
        this.staffVisible = true;
        this.updateType = type;
        let tmpList =  this.selectedRowList;
        let newList = [];
        let newDemandList = [];
        tmpList.map(item => {
          newList.push(item.distributionId);
          newDemandList.push(item.demandId);
        });
        this.newIdList = newList;
        this.newDemandList = newDemandList[0];
        console.log(this.newDemandList)
        getSameDemandJob({
          demandId: this.newDemandList
        }).then(res => {
          if (res.data.code == 0) {
            this.confirmList = res.data.data;
          }
        });
      } else {
        this.$message.warning("所选需求不同，请重新选择！");
        setTimeout(() => {
          this.selectedRowKeys = [];
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.department {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
.department >>> .ant-btn-primary[disabled] {
  color: #999999;
  border: 1px solid #999999 !important;
  background: #ffffff !important;
}
.department-content {
  /* display: flex; */
  /* justify-content: flex-end; */
  display: block;
  width: 100%;
}
.department-head {
  display: flex;
  justify-content: space-between;
  margin:3px 0 12px 0;
}
.department-left {
  display: flex;
}
.department-content .ant-btn {
  margin-right: 10px;
}
.department >>> .ant-table-thead > tr > th {
  border-bottom: 0;
  color: rgba(132, 145, 158, 1);
  font-weight: bold;
  cursor: pointer;
}
.department >>> .ant-table-tbody > tr > td {
  border-bottom: 0;
  border-right: 1px solid #f0f0f0;
}
.department-check {
  padding: 5px 10px;
  display: inline-block;
}
.progress-main {
  border: 1px solid #f7f8fa;
  border-radius: 4px;
  background: #f7f8fa;
  margin-left: 10px;
  padding: 16px 15px 22px 8px;
}
.progress-main div:nth-child(2) {
  padding: 5px 0;
}
.blueColor {
  color: #1478e3;
}
.greenColor{
  color:#72c249;
}
.warningColor {
  color: #feaa19;
}
.bluesColor {
  color: #22b8cf;
}
.dangerColor {
  color: #fc3d09;
}
.select-header {
  margin-bottom: 15px;
}
</style>
<style>
.popover-container-add{
  background:transparent !important;
}
 .ant-popover-arrow{
  border-width:0 !important;
}
.popover-container-add .ant-popover-inner-content{
  background:#000;
  color:#fff !important;
  border-radius:5px;
}
.drawer-box-bz{
  /* margin-bottom: 50px; */
  max-height:470px;
  overflow-y:auto;
} 
.drawer-box-bz .ant-timeline-item-tail{
  left:6px !important;
}
.drawer-box-bz .ant-timeline-item-head-custom{
  left:8px !important;
}
</style>
