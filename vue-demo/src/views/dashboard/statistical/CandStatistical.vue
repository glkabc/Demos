<template>
  <div class="position">
    <div class="position-head">
      <searchHead
        :userName.sync="userName"
        :userEmail.sync="userEmail"
        :userPhone.sync="userPhone"
        :userCity.sync="userCity"
        :postValue.sync="postValue"
        :departementValue.sync="departementValue"
        :specialistId.sync="specialistId"
        :userStatus.sync="userStatus"
        :startTime.sync="startTime"
        :endTime.sync="endTime"
        :workStartTime.sync="workStartTime"
        :workEndTime.sync="workEndTime"
        @handleSearch="handleSearchSubmit"
        @handleExport="resetExportClick"
        :iconLoadingEnd.sync="iconLoadingEnd"
      />
    </div>
    <div class="position-main">
      <a-table
        bordered
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        class="zebra"
        rowKey="id"
        :scroll="{ x: 1600, y: screenHeight - 400 }"
        @change="onShowSizeChange"
      >
      </a-table>
    </div>
  </div>
</template>

<script>
import { getCandidateStatistics, exportCandidateStatistics,getPositionName } from "@api/statistical/index"
import download from "./index"
import searchHead from "./candStatical/Search"
import { Trim } from "../../../trim/trim" 
const columns = [
  {
    title: "候选人",
    dataIndex: "fullName",
    key: "fullName",
    width: 100,
  },
  {
    title: "手机号",
    dataIndex: "resumePhone",
    key: "resumePhone",
  },
  {
    title: "岗位",
    dataIndex: "positionName",
    key: "positionName",
    width: 120,
    ellipsis: true
  },
  {
    title: "职位编号",
    dataIndex: "no",
    key: "no",
  },
  {
    title: "事业部",
    dataIndex: "groupIdName",
    key: "groupIdName",
    width: 120,
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
    title: "地区",
    dataIndex: "resumeAddress",
    key: "resumeAddress",
    width: 120,
    ellipsis: true
  },
  {
    title: "岗位负责人",
    dataIndex: "recruitmentSpecialist",
    key: "recruitmentSpecialist",
    width: 120,
  },
  {
    title: "状态",
    dataIndex: "statusName",
    key: "statusName",
  },
  {
    title: "状态更新日期",
    dataIndex: "modifiedUserTime",
    key: "modifiedUserTime",
  },
  {
    title: "面试日期",
    dataIndex: "interviewTime",
    key: "interviewTime",
    width: 150,
  },
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
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      loading: false,
      userName: '',
      userEmail: '',
      userPhone: '',
      userCity: '',
      postValue: undefined,
      departementValue: undefined,
      specialistId: undefined,
      userStatus: undefined,
      startTime: '',
      endTime: '',
      workStartTime: '',
      workEndTime: '',
      postNameList: [], // 职位列表
      orgList: [], // 获取部门
      iconLoadingEnd:null,
    };
  },
 
  mounted() {
    this.getCandidateStatisticsInit();
    window.onresize = function () { // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight// 窗口高度
    }
  },
  methods: {
    handleSearchSubmit(){
      this.getCandidateStatisticsInit();
    },
    async getCandidateStatisticsInit() {
      try {
        this.loading = true
        const res = await getCandidateStatistics({
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          startTime: this.startTime,
          endTime: this.endTime,
          workStartTime: this.workStartTime,
          workEndTime: this.workEndTime,
          orgId: this.departementValue,
          positionName: Trim(this.postValue),
          fullName: Trim(this.userName),
          resumePhone: Trim(this.userPhone),
          resumeMail:Trim(this.userEmail),
          resumeAddress: Trim(this.userCity),
          specialistId: this.specialistId,
          status: this.userStatus
        })
        this.loading = false
        if (res.data.data.length == []) {
          this.data = [];
        } else {
          this.data = res.data.data.list;
          this.pagination.total = res.data.data.total;
        }
      }
      catch(error) {}
    },
    // 导出
    async resetExportClick() {
      try {
        const res = await exportCandidateStatistics({
          startTime: this.startTime,
          endTime: this.endTime,
          orgId: this.departementValue,
          positionName: Trim(this.postValue),
          fullName: Trim(this.userName),
          resumePhone:Trim( this.userPhone),
          resumeMail: Trim(this.userEmail),
          resumeAddress: Trim(this.userCity),
          specialistId: this.specialistId,
          status: this.userStatus
        })
         this.iconLoadingEnd = false;
        download(res.data,'候选人统计表')
      }
      catch(error) {
         this.iconLoadingEnd = false;
      }
    },
    // 分页
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getCandidateStatisticsInit();
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
.position-main {
  margin-top: 20px;
}
</style>
