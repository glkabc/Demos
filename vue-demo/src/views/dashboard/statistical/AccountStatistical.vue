<template>
  <div class="account">
    <div class="account-head">
      <search-head
        :userInfoValue.sync="userInfoValue"
        :code.sync="code"
        @handleSearch="handleSearch"
        @handleExport="handleExport"
        :specialistid.sync="specialistid"
        :demartmentId.sync="demartmentId"
        :viewrValue.sync="viewrValue"
        :demandName.sync="demandName"
        :statusValue.sync="statusValue"
        :realOwnerId.sync="realOwnerId"
        :startTime.sync="startTime"
        :endTime.sync="endTime"
        :demandNo.sync="demandNo"
        :mail.sync="mail"
        :realOwnerMail.sync="realOwnerMail"
        :successList="successList"
        :failList="failList"
        :waitList="waitList"
        :noSuccessList="noSuccessList"
        :iconLoadingEnd.sync="iconLoadingEnd"
      />
    </div>
    <div class="account-main">
      <a-table
        bordered
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        class="zebra"
        :scroll="{ x: 2400, y: screenHeight - 430 }"
        rowKey="id"
        @change="onShowSizeChange"
      >
        <span slot="interviewTimes" slot-scope="name, item">
          <span>第{{ item.interviewTimes }} 轮</span>
        </span>
        <span slot="interviewer" slot-scope="name, item">
          <span v-for="(info,index ) in item.interviewer" :key="info.interviewerId">{{ info.interviewerName }} <span v-if="item.interviewer.length > 1 && index <item.interviewer.length-1">,</span>   </span>
        </span>
        <span slot="status" slot-scope="name, item">
          <a-badge :color="getStatusList(item.status).type" />
          {{ getStatusList(item.status).name }}
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import searchHead from "./accountStatical/Search";
import { getUserInfoList } from "@api/manage/index";//权益人
import { getInterviewrReport,exportInterviewrReport,getRecruitmentSpecialist } from "@api/statistical/index";
import download from "./index"
import { Trim } from "../../../trim/trim"
const columns = [
  {
    title: "面试日期",
    dataIndex: "interviewTime",
    key: "interviewTime",
  },
  {
    title: "面试结果",
    dataIndex: "status",
    key: "status",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "候选人姓名",
    dataIndex: "fullName",
    key: "fullName",
    width: 110,
  },
  {
    title: "面试轮次",
    dataIndex: "interviewTimes",
    key: "interviewTimes",
    scopedSlots: { customRender: "interviewTimes" },
  },
  {
    title: "需求编号",
    dataIndex: "externalNum",
    key: "externalNum",
  },
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
    title: "面试岗位",
    dataIndex: "positionName",
    key: "positionName",
  },
  {
    title: "手机号",
    dataIndex: "resumePhone",
    key: "resumePhone",
  },
  {
    title: "邮箱",
    dataIndex: "resumeMail",
    key: "resumeMail",
    width: 160,
  },
  {
    title: "招聘小组",
    dataIndex: "specialistTeam",
    key: "specialistTeam",
  },
  {
    title: "岗位负责人",
    dataIndex: "specialistName",
    key: "specialistName",
  },
  {
    title: "面试官",
    dataIndex: "interviewer",
    key: "interviewer",
    scopedSlots: { customRender: "interviewer" },
  },
  {
    title: "权益人",
    dataIndex: "realOwnerName",
    key: "realOwnerName",
  },
];
export default {
  components: {
    searchHead,
  },
  data() {
    return {
      columns,
      screenHeight: document.documentElement.clientHeight,
      data: [],
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      loading: false,
      userInfoValue: undefined,
      code: undefined, // 需求编号
      specialistid: undefined, // 需求名称
      demartmentId: undefined, // 职级职等
      viewrValue: undefined, // 身份证
      demandName: undefined, // 需求部门
      statusValue: undefined, // 候选人
      realOwnerId: undefined, // 岗位
      startTime: undefined, // 入职日期
      endTime: undefined, // 入职日期
      demandNo: undefined,
      successList: '',
      failList: '',
      waitList: '',
      noSuccessList: '',
      recruitmentList: [], // 岗位负责人数据
      organizeList: [], // 获取权益人
      mail:'',
      realOwnerMail:'',
      iconLoadingEnd:null,
    };
  },
  mounted() {
    this.getInterviewrReportInit();
    this.getRecruitmentSpecialistInit();//岗位负责人
    this.getUserInfoListInit();//权益人
    window.onresize = function () { // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight// 窗口高度
    }
  },
  methods: {
    handleSearch() {
      this.getInterviewrReportInit();
    },
    getStatusList(status) {
      switch (status) {
        case 40:
          let statusFirst = {
            name: "通过",
            type: "#22B8CF",
          };
          return statusFirst;
          break;
        case 41:
          let statusSecond = {
            name: "未通过",
            type: "#FD5158",
          };
          return statusSecond;
          break;
        case 30:
          let statusThird = {
            name: "待面试",
            type: "#FEAA19",
          };
          return statusThird;
          break;
        case 31:
          let statusFour = {
            name: "邀约失败",
            type: "#FD5158",
          };
          return statusFour;
          break;
      }
    },
    // 获取岗位负责人
    async getRecruitmentSpecialistInit() {
      try {
        const res = await getRecruitmentSpecialist();
        this.recruitmentList = res.data.data;
      } catch (error) {}
    },
     // 获取权益人
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList({})
        if(res.data.code == 0) {
          this.organizeList = res.data.data.userList.list
        }
      }
      catch(error){console.log(error)}
    },
    async getInterviewrReportInit() {
      this.recruitmentList.map(item =>{
        if(item.specialistId == this.specialistid){
          this.mail = item.mail;
        }
      });
      this.organizeList.map(item =>{
        if(item.userId == this.realOwnerId) {
          this.realOwnerMail = item.mail
        }
      })
      try {
        this.loading = true;
        const res = await getInterviewrReport({
          title: Trim(this.userInfoValue),
          externalNum: Trim(this.code),
          no: Trim(this.demandNo),
          // specialistid: this.specialistid,
          organizeId: this.demartmentId,
          userName: Trim(this.viewrValue),
          positionName: Trim(this.demandName),
          status: this.statusValue,
          // realOwnerId: this.realOwnerId,
          interviewTimeStart: this.startTime,
          interviewTimeEnd: this.endTime,
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          mail:this.mail,
          realOwnerMail:this.realOwnerMail
        });
        this.loading = false;
        if (res.data.data.interviewrList[0] == null) {
          this.data = [];
        } else {
          this.successList = res.data.data.interviewrList[0].tg
          this.waitList = res.data.data.interviewrList[0].dms
          this.noSuccessList = res.data.data.interviewrList[0].wtg
          this.failList = res.data.data.interviewrList[0].yysb
          let tmpList = res.data.data.interviewrList
          tmpList.splice(0,1)
          this.data = tmpList;
          this.pagination.total = res.data.data.size;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 分页
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getInterviewrReportInit();
    },
    async handleExport() {
      try {
        const res = await exportInterviewrReport ({
          title: Trim(this.userInfoValue),
          no: Trim(this.demandNo),
          externalNum: Trim(this.code),
          specialistId: this.specialistid,
          organizeId: this.demartmentId,
          userName: Trim(this.viewrValue),
          positionName: Trim(this.demandName),
          status: this.statusValue,
          interviewTimeStart: this.startTime,
          interviewTimeEnd: this.endTime,
          realOwnerId: this.realOwnerId,
        })
        this.iconLoadingEnd = false;
        download(res.data,'面试台账表');
      }
      catch(error) {
        this.iconLoadingEnd = false;
        console.log(error)
      }
    },
  },
};
</script>

<style scoped>
.account {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
.account-head {
  margin-left: 5px;
}
.account-main {
  margin-top: 20px;
}
</style>
