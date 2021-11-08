<template>
  <div class="position">
    <div class="position-head">
      <searchHead
        :code.sync="code"
        :no.sync="no"
        :demartmentId.sync="demartmentId"
        :specialistid.sync="specialistid"
        :startTime.sync="startTime"
        :endTime.sync="endTime"
        @handleSearch="handleSearch"
        @handleExport="handleExport"
        :iconLoadingEnd.sync='iconLoadingEnd'
      />
    </div>
    <a-divider style="height:0.5px;"/>
    <div class="position-main">
      <a-table
         bordered
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        class="zebra"
        rowKey="id"
        @change="onShowSizeChange"
        :scroll="{ x: 3000, y: screenHeight - 440}"
      >
      </a-table>
    </div>
  </div>
</template>

<script>
import {  exportDemandLedger , getDemandLedger} from "@api/statistical/index"
import download from "./index"
import searchHead from "./demandStatical/Search"
import { Trim } from '../../../trim/trim'
const columns = [
  {
    title: "需求编号",
    dataIndex: "externalNum",
    key: "externalNum",
    width: 120,
    fixed:'left',
  },
  {
    title: "职位编号",
    dataIndex: "no",
    key: "no",
    width: 140,
    fixed:'left',
  },
  // {
  //   title: "需求名称",
  //   dataIndex: "demandName",
  //   width: 110,
  //   ellipsis: true,
  //   key: "demandName",
  // },
  {
    title: "事业部",
    dataIndex: "groupIdName",
    key: "groupIdName",
    width: 140,
    ellipsis: true,
  },
  {
    title: '客户名称',
    dataIndex: 'customName',
    key: 'customName',
    ellipsis: true,
  },
  {
    title: '一级部门',
    dataIndex: 'firstOrgName',
    key: 'firstOrgName',
    ellipsis: true,
  },
  {
    title: '二级部门',
    dataIndex: 'secondOrgName',
    key: 'secondOrgName',
    ellipsis: true,
  },
  {
    title: '职位',
    dataIndex: 'positionName',
    key: 'positionName',
    width: 100,
    ellipsis: true,
  },
  {
    title: "工作城市",
    dataIndex: "workPlace",
    width: 140,
    key: "workPlace",
  },
  {
    title: "职级职等",
    dataIndex: "evaluationCriteria",
    key: "evaluationCriteria",
    width: 90,
  },
  {
    title: "岗位职责",
    dataIndex: "jobRespons",
    key: "jobRespons",
    ellipsis: true,
    width: 140,
  },
  {
    title: "岗位负责人",
    dataIndex: "specialistName",
    key: "specialistName",
  },
  {
    title: "简历筛选人",
    dataIndex: "resumeFilterName",
    key: "resumeFilterName",
  },
  {
    title: "初始面试官",
    dataIndex: "interviewerName",
    key: "interviewerName",
    ellipsis: true,
  },
  {
    title: "复试面试官",
    dataIndex: "reInterviewerName",
    key: "reInterviewerName",
    ellipsis: true,
  },
  {
    title: "紧急度",
    dataIndex: "emergencyLevel",
    key: "emergencyLevel",
  },
  {
    title: "状态",
    dataIndex: "stateName",
    key: "stateName",
  },
  {
    title: "发布时间",
    dataIndex: "releaseTime",
    key: "releaseTime",
    width: 160,
  },
  {
    title: "发布月",
    dataIndex: "releaseMonth",
    key: "releaseMonth",
    width: 160,
  },
  {
    title: "分配日期",
    dataIndex: "distributionTime",
    key: "distributionTime",
    width: 160,
  },
  {
    title: "暂停时间",
    dataIndex: "stopTime",
    key: "stopTime",
    width: 160,
  },
  {
    title: "下线时间",
    dataIndex: "offlineTime",
    key: "offlineTime",
    width: 160,
  },
  {
    title: "初始需求数",
    dataIndex: "demandNum",
    key: "demandNum",
  },
  {
    title: "待招需求数",
    dataIndex: "dzpNum",
    key: "dzpNum",
  },
  {
    title: "待入职数",
    dataIndex: "beEntrynum",
    key: "beEntrynum",
  },
  {
    title: "入职数",
    dataIndex: "entryNum",
    key: "entryNum",
  },
  // {
  //   title: "招聘备注",
  //   dataIndex: "zpRemark",
  //   key: "zpRemark",
  //   ellipsis: true,
  // },
  // {
  //   title: "员工姓名",
  //   dataIndex: "fullname",
  //   key: "fullname",
  // },
  // {
  //   title: "实际入职日期",
  //   dataIndex: "realEntryTime",
  //   key: "realEntryTime",
  // },
  // {
  //   title: "招聘权益人",
  //   dataIndex: "zpOwnerName",
  //   key: "zpOwnerName",
  // },
];
export default {
  components: {
    searchHead
  },
  data() {
    return {
      columns,
      data: [],
      screenHeight: document.documentElement.clientHeight,
      code: undefined, // 需求编号
      no: undefined, // 身份证
      demartmentId: undefined, // 需求部门
      specialistid: undefined, // 候选人
      startTime: undefined, // 发布开始日期
      endTime: undefined, // 发布结束日期
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      loading: false,
      iconLoadingEnd:null,
    };
  },
  created() {
    window.onresize = function () { // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight// 窗口高度
    }
    this.getDemandLedgerInit()
  },
  methods: {
    // 搜索
    handleSearch(e) {
      this.getDemandLedgerInit()
    },
    async handleExport () {
      try {
        console.log(this.demartmentId)
        const res = await exportDemandLedger ({
          no: Trim(this.no), // 萝卜秀编号
          externalNum: Trim(this.code), // 需求编号
          orgId: this.demartmentId, // 需求部门
          specialistId: this.specialistid, // 岗位负责人
          startTime: this.startTime, // 发布开始日期
          endTime: this.endTime, // 发布结束日期
        })
        this.iconLoadingEnd = false;
        download(res.data, '需求台账统计表');
      }
      catch(error) {
        this.iconLoadingEnd = false;
        console.log(error)
      }
    },
    async getDemandLedgerInit() {
      try {
        this.loading = true;
        const res = await getDemandLedger({
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          no: Trim(this.no), // 萝卜秀编号
          externalNum: Trim(this.code), // 需求编号
          orgId: this.demartmentId, // 需求部门
          specialistId: this.specialistid, // 岗位负责人
          startTime: this.startTime, // 发布开始日期
          endTime: this.endTime, // 发布结束日期
        });
        this.loading = false;
        this.data = res.data.data.demandList
        this.pagination.total = res.data.data.meta.size
      } catch (error) {}
    },
    // 分页
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getDemandLedgerInit();
    },
  },
};
</script>

<style scoped>
.position {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
.position-head {
  margin-left: 5px;
}
.position-main {
  margin-top: 20px;
}

.blueColor {
  color: #1478e3;
  background: #e0f6ff;
  border: 1px solid #1478e3;
}
.warningColor {
  color: #feaa19;
  background: #fffbe0;
  border: 1px solid #feaa19;
}
.dangerColor {
  color: #fc3d09;
  background: #fff0e2;
  border: 1px solid #fc3d09;
}
</style>
