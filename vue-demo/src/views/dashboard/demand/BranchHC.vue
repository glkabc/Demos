<template>
  <div class="brandchHC">
    <div class="search-head">
      <search-head
        :no.sync="no"
        :code.sync="code"
        @handleSearch="handleSearch"
        @handleExport="handleExport"
        :specialistid.sync="specialistid"
        :positionClass.sync="positionClass"
        :userFilter.sync="userFilter"
        :emergencyLevel.sync="emergencyLevel"
        :employ.sync="employ"
        :jobAddress.sync="jobAddress"
        :startTime.sync="startTime"
        :endTime.sync="endTime"
        :organizeId.sync="organizeId"
        :successList="successList"
        :failList="failList"
        :waitList="waitList"
        :noSuccessList="noSuccessList"
        @getBranchHCList="getBranchHCList"
      />
    </div>

    <a-row class="add-btn">
      <a-col :span="24">
        <can-i-use code="xqzx-bmhc-xzxq">
          <a-button
            type="primary"
            style="background: #22b8cf; border: #22b8cf"
            @click="addClick"
          >
            <a-icon type="plus-circle" />新增需求
          </a-button>
        </can-i-use>
        <can-i-use code="xqzx-bmhc-sx">
          <a-button
            :disabled="
              this.stateOnList.length == 0 ||
              this.selectedRowKeys.toString() != this.stateOnList.toString()
            "
            @click="getOnLine"
            :class="
              this.stateOnList.length > 0 &&
              this.selectedRowKeys.toString() == this.stateOnList.toString()
                ? 'btn-online-select'
                : 'btn-online'
            "
          >
            上线
          </a-button>
        </can-i-use>
        <can-i-use code="xqzx-bmhc-xx">
          <a-button
            :disabled="
              this.stateOffList.length == 0 ||
              this.selectedRowKeys.toString() != this.stateOffList.toString()
            "
            :class="
              this.stateOffList.length > 0 &&
              this.selectedRowKeys.toString() == this.stateOffList.toString()
                ? 'btn-online-select'
                : 'btn-online'
            "
            @click="offLine"
          >
            下线
          </a-button>
        </can-i-use>
        <can-i-use code="xqzx-bmhc-zt">
          <a-button
            :disabled="
              this.stateStopList.length == 0 ||
              this.selectedRowKeys.toString() != this.stateStopList.toString()
            "
            :class="
              this.stateStopList.length > 0 &&
              this.selectedRowKeys.toString() == this.stateStopList.toString()
                ? 'btn-online-select'
                : 'btn-online'
            "
            @click="stop"
          >
            暂停
          </a-button>
        </can-i-use>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24">
        <a-table
          bordered
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChanges,
            getCheckboxProps: (record) => ({
              props: {
                disabled: record.state == '2',
              },
            }),
          }"
          :rowKey="(record) => record.demandId"
          :columns="deletedata"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          :scroll="{ x: 1680, y: screenHeight - 455 }"
          @change="handleTableChange"
          class="zebra"
          size="middle"
        >
          <span slot="customTitle"
            ><IconFont
              @click="showMoreCell"
              style="position: relative; font-size: 15px"
              type="icon-setting"
          /></span>
          <template v-slot:isDelayed="day">
            <a-tag v-if="day <= 0" color="green">正常</a-tag>
            <a-tag v-else-if="day <= 5" color="orange">延期{{ day }}天</a-tag>
            <a-tag v-else color="red">延期{{ day }}天</a-tag>
          </template>
          <span slot="emergencyLevel" slot-scope="text">
            <a-tag v-if="text == 1" color="blue">一般</a-tag>
            <a-tag v-if="text == 2" color="orange">紧急</a-tag>
            <a-tag v-if="text == 3" color="red">特急</a-tag>
          </span>
          <template slot="positionName" slot-scope="name, item">
            <span :class="getStatusBadge(item.state).type">
              {{ getStatusBadge(item.state).name }}
            </span>
            <a :class="getEmergency(item.emergencyLevel).type">{{
              getEmergency(item.emergencyLevel).name
            }}</a>
            <span
              style="cursor: pointer; color: #4480ee; margin-left: 10px"
              @click="detailNameClick(item.demandId)"
              >{{ item.positionName }}</span
            >
          </template>
          <span slot="recruitNum" slot-scope="name, item">
            <span
              >{{ item.employNum }}/{{ item.waitNum }}/{{
                item.abnormalNum
              }}</span
            >
          </span>
          <span slot="no" slot-scope="name, item">
            <span style="cursor: pointer; color: #4480ee; margin-right: 10px">{{
              item.no
            }}</span>
            <span @click="handleCopy(item.no)" title="复制职位编号">
              <a-icon type="copy" />
            </span>
          </span>
          <span slot="action" slot-scope="text, record">
            <a-popover
              placement="left"
              overlayClassName="popover-container-add"
            >
              <template slot="content" class="popover-container-add">
                <a
                  href="javascript:;"
                  @click="handleView(record, 2)"
                  style="color: #fff"
                  >复制</a
                >
                <a-divider type="vertical" v-if="record.state != 2" />
                <a
                  href="javascript:;"
                  @click="handleView(record, 3)"
                  v-if="record.state != 2"
                  style="color: #fff"
                  >变更</a
                >
                <a-divider
                  type="vertical"
                  v-if="record.state == 1 || record.state == 3"
                />
                <a-divider type="vertical" v-if="record.state == 4" />
                <a
                  href="javascript:;"
                  @click="handleView(record, 4)"
                  v-if="record.state == 4"
                  style="color: #fff"
                  >删除</a
                >
              </template>
              <a-icon type="more" class="icon-more" />
            </a-popover>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <!-- 显示行弹窗 -->
    <a-modal
      v-model="visibleMore"
      title="选择需要展示的数据项"
      @ok="handleOk"
      :footer="null"
      style="width: 570px"
    >
      <a-checkbox-group
        style="width: 100%"
        v-model="checkedListCell"
        :option="plainOptions"
        @change="onChangeEvent"
      >
        <a-row>
          <a-col
            :span="6"
            v-for="(item, index) in checkboxlist"
            :key="index"
            style="line-height: 30px"
          >
            <a-checkbox :value="item.value">
              {{ item.title }}
            </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-modal>
    <abnormal-close
      :show.sync="abnormalVisible"
      :demandId="demandCloseId"
      :waitNums="waitNums"
      :demandDetail="demandDetails"
      @getBranchHCList="getBranchHCList"
    />
    <ConfirmClose
      :updateType="updateType"
      :confirmVisible.sync="staffVisible"
      :demandId="demandConfirmId"
      @getBranchHCList="getBranchHCList"
    />
    <PositionDetail :show.sync="recruitVisible" :getDemandByIds="getDemandId" />
  </div>
</template>

<script>
import moment from "moment";
import { TreeSelect } from "ant-design-vue";
import { Trim } from "../../../trim/trim";
import {
  getDepartmentInfo,
  getUserInfo,
  getBranchHCList,
  getOnLineDemand, //在招
  getsuspendDemand, //暂停
  offLineAll, //下线
  deleteDemandById, //删除
  abnormalClose, //异常关闭
  getDemandClose, //异常关闭详情
} from "@api/branchHC/index";
import { getDemandList, getStructureList } from "@api/demandBranch/index";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import searchHead from "./branchHC/search";
import { IconFont } from "../../../configs/scriptURL";
import AbnormalClose from "./branchHC/AbnormalClose";
import ConfirmClose from "./branchHC/ConfirmClose";
import PositionDetail from "./branchHC/PositionDetail";
let persistQuery = null;
const SHOW_PARENT = TreeSelect.SHOW_ALL;
const checkboxlist = [
  {
    title: "萝卜秀编号",
    value: "no",
  },
  {
    title: "需求编号",
    value: "externalNum",
  },
  // {
  //   title: "招聘类别",
  //   value: "recruitType",
  // },
  {
    title: "职位类别",
    value: "jobTypeName",
  },
  {
    title: "发布人",
    value: "releaseUserName",
  },
  {
    title: "发布时间",
    value: "releaseTime",
  },
  {
    title: "下线时间",
    value: "offlineAtDate",
  },
  {
    title: "创建时间",
    value: "createUserTime",
  },
  {
    title: "分配时间",
    value: "specialistAllocateTime",
  },
  {
    title: "事业部",
    value: "groupName",
  },
];
const plainOptions = [
  {
    title: "需求编号",
    dataIndex: "externalNum",
    key: "externalNum",
    ellipsis: true,
    width: 120,
  },
  // {
  //   title: "招聘类别",
  //   dataIndex: "recruitType",
  //   key: "recruitType",
  //   ellipsis:true,
  //   width:120,
  // },
  {
    title: "职位类别",
    dataIndex: "jobTypeName",
    key: "jobTypeName",
    ellipsis: true,
    width: 120,
  },
  {
    title: "发布人",
    dataIndex: "releaseUserName",
    key: "releaseUserName",
    ellipsis: true,
    width: 120,
  },
  {
    title: "发布时间",
    dataIndex: "releaseTime",
    key: "releaseTime",
    ellipsis: true,
    width: 120,
  },
  {
    title: "下线时间",
    dataIndex: "offlineAtDate",
    key: "offlineAtDate",
    ellipsis: true,
    width: 120,
  },
  {
    title: "创建时间",
    dataIndex: "createUserTime",
    key: "createUserTime",
    ellipsis: true,
    width: 120,
  },
  {
    title: "分配时间",
    dataIndex: "specialistAllocateTime",
    key: "specialistAllocateTime",
    ellipsis: true,
    width: 120,
  },
  {
    title: "事业部",
    dataIndex: "groupName",
    key: "groupName",
    ellipsis: true,
    width: 120,
  },
];

const defaultCheckedList = ["no"];
const columns = [
  {
    title: "职位名称",
    dataIndex: "positionName",
    key: "positionName",
    //  ellipsis: true,
    fixed: "left",
    scopedSlots: { customRender: "positionName" },
    width: 180,
  },
  {
    title: "萝卜秀编号",
    dataIndex: "no",
    key: "no",
    fixed: "left",
    width: 140,
    scopedSlots: { customRender: "no" },
  },

  {
    title: "需求部门",
    dataIndex: "organizeName",
    key: "organizeName",
    // ellipsis: true,
    // fixed: "left",
    width: 230,
  },

  {
    title: "工作地点",
    dataIndex: "areaCodeName",
    key: "areaCodeName",
    ellipsis: true,
    width: 100,
    cursor: "pointer",
  },
  {
    title: "职级",
    dataIndex: "level",
    key: "level",
    width: 70,
  },
  {
    title: "已招/待招/异常关闭",
    dataIndex: "recruitNum",
    key: "recruitNum",
    width: 160,
    scopedSlots: { customRender: "recruitNum" },
    // customRender: (item, record) => {
    //   if (record.employNum == null) {
    //     record.employNum = "";
    //   }
    //   if (record.waitNum == null) {
    //     record.waitNum = "";
    //   }
    //   if (record.abnormalNum == null) {
    //     record.abnormalNum = "";
    //   }
    //   return `${record.employNum}/${record.waitNum}/${record.abnormalNum}`;
    // },
  },
  {
    title: "简历筛选人",
    dataIndex: "resumeFilterName",
    key: "resumeFilterName",
    width: 110,
    ellipsis: true,
  },
  {
    title: "初试面试官",
    dataIndex: "interviewerName",
    key: "interviewerName",
    width: 100,
    ellipsis: true,
  },
  {
    title: "复试面试官",
    dataIndex: "reInterviewerName",
    key: "reInterviewerName",
    width: 100,
    ellipsis: true,
  },
  {
    title: "推荐数",
    dataIndex: "tuijianshu",
    key: "tuijianshu",
    // ellipsis: true,
    width: 100,
  },
  {
    title: "筛选通过数",
    dataIndex: "tongguo",
    key: "tongguo",
    width: 110,
  },
  {
    title: "面试数",
    dataIndex: "mianshishu",
    key: "mianshishu",
    // ellipsis: true,
    width: 80,
  },
  {
    title: "面试通过",
    dataIndex: "mianshitongguo",
    key: "mianshitongguo",
    width: 105,
    // ellipsis: true,
    // align: "right",
  },
  {
    title: "待入职",
    dataIndex: "waitEntry",
    key: "waitEntry",
    width: 105,
    ellipsis: true,
    // align: "right",
  },
  {
    title: "入职",
    dataIndex: "entry",
    key: "entry",
    width: 100,
    ellipsis: true,
    // align: "right",
  },
  {
    dataIndex: "操作",
    key: "action",
    align: "center",
    width: 60,
    fixed: "right",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "action" },
  },
];
export default {
  name: "BranchHC",
  components: {
    searchHead,
    IconFont,
    AbnormalClose,
    PositionDetail,
    ConfirmClose,
  },
  data() {
    return {
      demandDetails: {},
      delayStatus: [
        { label: "未延期", value: 0 },
        { label: "已延期", value: 1 },
      ],
      loading: false,
      form: this.$form.createForm(this),
      value: [],
      demandStatus: [],
      treeData: [],
      companyData: [],
      departmentData: [],
      SHOW_PARENT,
      dateFormat: "YYYY/MM/DD",
      monthFormat: "YYYY/MM",
      filterstatus: 0,
      columns,
      data: [],
      meta: {},
      listQuery: {
        pageSize: 10,
        pageNum: 1,
        title: undefined, //职位名称
        orgIds: undefined, //部门筛选
        jobType: [], //职位类别
        releaseUserId: undefined, //用户过滤
        emergencyLevel: undefined, //紧急程度
        state: undefined, //在招
        taskStart: undefined, //职位开始时间
        taskEnd: undefined, //职位结束时间
        areaCode: [], //工作地点
        releaseUserId: undefined, //招聘负责人specialistId
      },
      principals: [],
      demandid: null,
      pagination: {
        current: persistQuery ? persistQuery.current : 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: persistQuery ? persistQuery.pageSize : 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      startAt: "",
      // 搜索框
      no: undefined, //萝卜秀编号
      code: undefined, // 需求编号
      specialistid: undefined, // 部门筛选
      positionClass: undefined, // 职级职等
      userFilter: undefined, // 用户过滤
      emergencyLevel: undefined, // 紧急程度
      employ: 1, // 在招
      jobAddress: [], // 工作地点
      startTime: undefined, // 入职日期
      endTime: undefined, // 入职日期
      employLeader: undefined, //招聘负责人
      organizeId: undefined, //部门HC
      successList: "",
      failList: "",
      waitList: "",
      noSuccessList: "",
      selectedRowKeys: [],
      rowData: [],
      stateOnList: [],
      stateOffList: [],
      stateStopList: [],
      visibleMore: false, //设置显示列弹窗
      deletedata: columns, //用于保留要删的数据可以做数据回滚的操作
      checkedListCell: defaultCheckedList,
      plainOptions,
      checkboxlist,
      tableKey: 0,
      state: "", //状态
      abnormalVisible: false,
      waitNums: "",
      demandCloseId: "",
      recruitVisible: false,
      getDemandId: "",
      demandConfirmId: "",
      staffVisible: false,
      updateType: "",
      screenHeight: document.documentElement.clientHeight,
      // btndemandId:"",
      departmentIdList:{},
      copyType:'部门HC'
    };
  },
  computed: {
    ...mapState({
      emergencyLevels: (state) => state.emergencyLevels,
    }),
  },
  created() {
    const demandEnd = this.$route.query.demandEnd;
    const releaseStartAt = this.$route.query.releaseStartAt;
    if (demandEnd) {
      this.listQuery.demandEnd = demandEnd;
    }
    if (releaseStartAt) {
      this.listQuery.releaseStart = releaseStartAt;
    }
    this.getDemandList();
    this.getUserInfo();
    this.getBranchHCList();
    this.demandStatus = this.$store.state.status.HCQueryTypes;
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight; // 窗口高度
    };
  },
  methods: {
    handleCopy(value) {
      const el = document.createElement("textarea");
      el.value = value;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.$message.success("已复制到剪切板", 1.5);
    },
    //     customRow(record,index){
    //       return{
    //          on:{
    //         mouseenter: (event) => {
    //           console.log(record,record.demandId)
    //          this.btndemandId = record.demandId;
    // //           this.btnDemandId = record.demandId;
    //   console.log(this.btndemandId ,'enter')
    //         },   // mouse enter row
    //         mouseleave: (event) => {
    //           console.log(record,index,'leave')
    //         }   // mouse leave row
    //       }
    //       }
    //     },
    getStatusBadge(status) {
      switch (status) {
        case 1:
          return {
            name: "在招",
            type: "greenColor",
          };
          break;
        case 2:
          return {
            name: "下线",
            type: "dangerColor",
          };
          break;
        case 3:
          return {
            name: "暂停",
            type: "warningColor",
          };
          break;
        default:
          return {
            name: "待发布",
            type: "bluesColor",
          };
          break;
      }
    },
    getEmergency(status) {
      switch (status) {
        case 1:
          return {
            name: "!",
            type: "blueColor",
          };
          break;
        case 2:
          return {
            name: "!!",
            type: "warningColor",
          };
          break;
        default:
          return {
            name: "!!!",
            type: "dangerColor",
          };
          break;
      }
    },
    detailNameClick(id) {
      //需求名称详情
      this.recruitVisible = true;
      this.getDemandId = id;
    },
    handleExport() {},
    handleTableChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getBranchHCList();
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
    handleCompanyChange(value) {
      getStructureList({
        customId: value,
      })
        .then((res) => {
          if (res.data.data === null) {
            this.departmentData = [];
          } else {
            this.departmentData = this.tmpListInit(res.data.data.orgList);
          }
        })
        .catch((err) => {
          console.log(err);
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
    getUserInfo() {
      getUserInfo()
        .then((res) => {
          if (res.data.code == 0) {
            this.principals = res.data.data.userList.list;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBranchHCList() {
      this.loading = true;
      this.listQuery.pageNum = this.pagination.current;
      this.listQuery.pageSize = this.pagination.pageSize;
      this.listQuery.title = Trim(this.code);
      this.listQuery.no = Trim(this.no);
      this.listQuery.releaseUserId = this.userFilter;
      this.listQuery.emergencyLevel = this.emergencyLevel;
      this.listQuery.state = this.employ;
      this.listQuery.taskStart = this.startTime;
      this.listQuery.taskEnd = this.endTime;
      this.listQuery.areaCode = this.jobAddress;
      this.listQuery.releaseUserId = this.specialistid;
      this.listQuery.orgIds = this.organizeId;
      this.listQuery.jobType = this.positionClass;
      if (this.jobAddress != undefined && this.jobAddress.length > 0) {
        this.listQuery.areaCode = this.jobAddress.join(",");
      }
      // if (this.organizeId != undefined && this.organizeId.length > 0) {
      //   this.listQuery.orgIds = this.organizeId.toString();
      // }
      if (this.positionClass != undefined && this.positionClass.length > 0) {
        this.listQuery.jobType = this.positionClass[
          this.positionClass.length - 1
        ];
      }
      getBranchHCList(this.listQuery)
        .then((res) => {
          if (res.data.data === null) {
            this.data = [];
            this.pagination.total = 0;
            this.pagination.pageNum = 1;
            this.pagination.pageSize = 10;
            this.loading = false;
          } else {
            this.data = res.data.data.demandList;
            this.meta = res.data.data.meta;
            this.pagination.total = this.meta.size;
            this.selectedRowKeys = [];
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    change(e) {
      console.log(e);
    },
    handleChange(e) {
      console.log(e);
    },
    //结束时间不能大于开始时间
    moment,
    // calendarChangeStart(date,dateString){
    // 	this.startAt = dateString;
    // },
    // disabledDate(current){
    // 		return current < moment(this.startAt).endOf('day');
    // },
    onSelectChanges(selectedRowKeys, e) {
      e.forEach(i=>{
        this.departmentIdList = i
      })
      this.rowData = [];
      this.stateOnList = [];
      this.stateOffList = [];
      this.stateStopList = [];
      this.selectedRowKeys = selectedRowKeys;
      this.rowData = e;
      this.rowData.forEach((item) => {
        if (item.state == 4 || item.state == 3) {
          //上线
          this.stateOnList.push(item.demandId);
        }
        if (item.state == 1 || item.state == 4 || item.state == 3) {
          //下线
          this.stateOffList.push(item.demandId);
        }
        if (item.state == 1) {
          //暂停
          this.stateStopList.push(item.demandId);
        }
      });
    },
    // 上线
    async getOnLine() {
      console.log(
        this.selectedRowKeys,
        this.stateOnList,
        "this.this.stateOnList"
      );
      if (
        this.selectedRowKeys.sort().toString() ===
        this.stateOnList.sort().toString()
      ) {
        this.demandConfirmId = this.selectedRowKeys;
        this.staffVisible = true;
        this.updateType = 1;
      } else {
        this.$message.error("请选择已暂停或待发布的上线");
        return;
      }
    },
    // 暂停
    async stop() {
      if (
        this.selectedRowKeys.sort().toString() ===
        this.stateStopList.sort().toString()
      ) {
        this.demandConfirmId = this.selectedRowKeys;
        this.staffVisible = true;
        this.updateType = 3;
      } else {
        this.$message.error("请选择在招的暂停");
        return;
      }
    },
    // 下线
    async offLine() {
      if (this.selectedRowKeys.length>1) {
        // this.demandConfirmId = this.selectedRowKeys;
        // this.staffVisible = true;
        // this.updateType = 2;
        this.$message.error('只能选择一个职位')
      }else if(this.selectedRowKeys.length==1){
          this.demandCloseId = this.selectedRowKeys.toString();
          this.waitNums = this.departmentIdList.doAbnormalNum;
           getDemandClose({ demandId: this.demandCloseId }).then((res) => {
            if (res.data.code == 0) {
              this.demandDetails.no = res.data.data.no;
              this.demandDetails.demandNum = res.data.data.demandNum;
              this.demandDetails.employNum = res.data.data.employNum;
              this.demandDetails.zpNum = res.data.data.doAbnormalNum;
              this.abnormalVisible = true;
            }
          });
      }else {
        this.$message.error("请选择在招或暂停或待发布下线");
        return;
      }
    },
    onSelectChange(value) {
      console.log("onSelectChange", value);
      this.value = value;
    },
    addClick() {
      this.$router.push({ 
        name: "DemandInfo",
        query: {
           copyType:this.copyType,
          },
      });
    },
    handleSearch() {
      this.getBranchHCList();
    },

    editClick(e) {
      console.log(e);
    },
    filterStatus(e) {
      this.filterstatus = e;
      console.log(e);
    },
    onChange(page, pageSize) {
      // console.log(page, pageSize);
      this.form.validateFields((error, fieldsValue) => {
        if (error) {
          console.log("error", error);
          return;
        }
        const values = {
          ...fieldsValue,
          startdate: fieldsValue["startdate"]
            ? fieldsValue["startdate"].format("YYYY-MM-DD")
            : undefined,
          enddate: fieldsValue["enddate"]
            ? fieldsValue["enddate"].format("YYYY-MM-DD")
            : undefined,
          releaseStartAt: fieldsValue["releaseStartAt"]
            ? fieldsValue["releaseStartAt"].format("YYYY-MM-DD")
            : undefined,
          releaseEndAt: fieldsValue["releaseEndlAt"]
            ? fieldsValue["releaseEndAt"].format("YYYY-MM-DD")
            : undefined,
        };
        console.log("Received values of form: ", values);
        this.listQuery.pageSize = pageSize;
        this.listQuery.pageNum = page;
        this.listQuery.delays = values.isDelayed;
        this.listQuery.state = values.select_status;
        this.listQuery.ids = values.hc_department
          ? values.hc_department.toString()
          : null;
        this.listQuery.userId = values.principal;
        this.listQuery.externalNum = values.externalNum;
        this.listQuery.no = values.no;
        this.listQuery.demandStart = values.startdate;
        this.listQuery.demandEnd = values.enddate;
        this.listQuery.releaseStart = values.releaseStartAt;
        this.listQuery.releaseEnd = values.releaseEndAt;
        this.getBranchHCList();
      });
    },
    onShowSizeChange(current, pageSize) {
      this.form.validateFields((error, fieldsValue) => {
        if (error) {
          console.log("error", error);
          return;
        }
        const values = {
          ...fieldsValue,
          startdate: fieldsValue["startdate"]
            ? fieldsValue["startdate"].format("YYYY-MM-DD")
            : undefined,
          enddate: fieldsValue["enddate"]
            ? fieldsValue["enddate"].format("YYYY-MM-DD")
            : undefined,
          releaseStartAt: fieldsValue["releaseStartAt"]
            ? fieldsValue["releaseStartAt"].format("YYYY-MM-DD")
            : undefined,
          releaseEndAt: fieldsValue["releaseEndAt"]
            ? fieldsValue["releaseEndAt"].format("YYYY-MM-DD")
            : undefined,
        };
        console.log("Received values of form: ", values);
        this.listQuery.pageSize = pageSize;
        this.listQuery.pageNum = current;
        this.listQuery.state = values.select_status;
        this.listQuery.ids = values.hc_department
          ? values.hc_department.toString()
          : null;
        this.listQuery.userId = values.principal;
        this.listQuery.externalNum = values.externalNum;
        this.listQuery.no = values.no;
        this.listQuery.demandStart = values.startdate;
        this.listQuery.demandEnd = values.enddate;
        this.listQuery.demandEnd = values.enddate;
        this.listQuery.releaseStart = values.releaseStartAt;
        this.listQuery.releaseEnd = values.releaseEndAt;
        this.getBranchHCList();
      });
    },
    handleView(record, index) {
      // console.log(record);
      switch (index) {
        case 1:
          this.$router.push({
            path: "/Demand/hc/demandDetails",
            query: {
              demandId: record.demandId,
            },
          });
          break;
        case 2:
          this.$router.push({
            path: "/Demand/demandCopyInfo",
            query: {
              demandId: record.demandId,
              status: record.state,
              copyType:this.copyType
            },
          });
          break;
        case 3:
          this.$router.push({
            path: "/Demand/demandCopyInfoEdit",
            query: {
              demandId: record.demandId,
              status: record.state,
              copyType:this.copyType
            },
          });
          break;
        case 4:
          this.deleteDemandById(record.demandId);
          break;
      }
    },
    async deleteDemandById(id) {
      const res = await deleteDemandById({ demandId: id });
      if (res.data.code == 0) {
        this.$message.success("删除成功");
        this.getBranchHCList();
      } else {
        this.$message.error("删除失败");
      }
    },
    async abnormalClose(id) {
      const res = await abnormalClose({ demandId: id });
      if (res.data.code == 0) {
        this.$message.success("异常关闭成功");
        this.getBranchHCList();
      } else {
        this.$message.error("异常关闭失败");
      }
    },
    //显示列更多
    showMoreCell() {
      this.visibleMore = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    onChangeEvent(checkedList) {
      console.log(checkedList, "checkedList");
      //单独选择的功能的
      this.indeterminate =
        !!checkedList.length && checkedList.length < plainOptions.length;
      var _that = this;
      this.deletedata = JSON.parse(JSON.stringify(this.columns));
      let deletearray = JSON.parse(JSON.stringify(this.columns));
      if (checkedList.length == 0) {
        this.deletedata.splice(1, 1);
      }
      checkedList.forEach((item) => {
        for (var j = 0; j < this.plainOptions.length; j++) {
          if (item === this.plainOptions[j].key) {
            deletearray.splice(
              deletearray.length - 13,
              0,
              this.plainOptions[j]
            );
            this.deletedata = deletearray;
          }
        }
      });
      if (checkedList.indexOf("no") == -1 && this.deletedata[2].key == "no") {
        this.deletedata.splice(1, 1);
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/Demand/hc/demandDetails") {
      persistQuery = {
        current: this.pagination.current,
        pageSize: this.pagination.pageSize,
      };
      next();
    } else {
      persistQuery = null;
      next();
    }
  },
};
</script>

<style scoped>
.brandchHC {
  background-color: #fff !important;
  padding: 24px !important;
  min-height: 100%;
}
.add-btn {
  margin: 3px 0 12px 0;
}
.ant-advanced-search-form {
  border-bottom: 1px solid #eee;
}
.ant-advanced-search-form .ant-form-item {
  display: flex;
  margin-bottom: 18px;
}
.form-action {
  text-align: left;
  height: 40px;
  line-height: 40px;
  padding-left: 48px;
}
a {
  text-decoration-line: none;
  color: #4480ee;
}
.ant-modal-content {
  width: 600px !important;
}
.btn-online {
  border-color: #999;
  color: #999;
  margin-left: 20px;
  background: #fff;
}
.btn-online-select {
  background: #1478e3;
  color: #fff;
  margin-left: 20px;
}
.blueColor {
  color: #1478e3;
}
.greenColor {
  color: #72c249;
}
.warningColor {
  color: #feaa19;
}
.dangerColor {
  color: red;
}
.bluesColor {
  color: #22b8cf;
}
.imgs:hover {
  color: #afa;
}
</style>
<style >
.brandchHC .ant-select-dropdown-menu {
  max-height: 300px;
}
.icon-more {
  font-size: 22px;
  color: #636364;
}
.icon-more:hover {
  color: blue;
}
/* .icon-more:hover{
  filter:drop-shadow(0,0,0,blue);
} */

/* chrome浏览器下下拉选择器滚动条样式美化 */
/* .brandchHC .ant-select-dropdown-menu::-webkit-scrollbar {
  width: 6px;  
  height:1px;
}
.brandchHC .ant-select-dropdown-menu::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(144, 147, 153, 0.5);
}
.brandchHC .ant-select-dropdown-menu::-webkit-scrollbar-track {
  border-radius: 5px;
  background: transparent;
} */
/* Firefox浏览器下下拉选择器滚动条样式美化 */
/* .brandchHC .ant-select-dropdown-menu {
  scrollbar-width: thin !important;
  scrollbar-color: rgba(144, 147, 153, 0.502);
  max-height: 300px;
} */
</style>
<style>
.popover-container-add {
  background: transparent !important;
}
.ant-popover-arrow {
  border-width: 0 !important;
}
.popover-container-add .ant-popover-inner-content {
  background: #000;
  color: #fff !important;
  border-radius: 5px;
}
</style>
