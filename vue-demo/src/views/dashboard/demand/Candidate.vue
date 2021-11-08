<template>
  <div class="candidate">
    <a-row>
      <flow-filter @handleFilter="handleFilter"></flow-filter>
      <el-button style="margin-top: 5px" type="primary" @click="handleAddRemark"
        >添加沟通备注</el-button
      >
      <el-button
        style="float: right; margin-top: 5px"
        type="success"
        @click="handleAction"
        >操作</el-button
      >
      <el-button
        style="float: right; margin-top: 5px"
        type="danger"
        @click="handleResumeImport"
        >导入简历</el-button
      >

      <a-col :span="24" style="margin-top: 20px">
        <a-table
          class="candidate-table zebra"
          :rowKey="(record) => record.talentId"
          :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="onShowSizeChange"
          :scroll="{ x: 1300, y: screenHeight - 300 }"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
        >
          <span slot="num" slot-scope="text, record, index">
            {{
              (pagination.current - 1) * pagination.pageSize +
              parseInt(index) +
              1
            }}
          </span>
          <template v-slot:Name="Name">
            <router-link
              class="link-type"
              :to="{
                name: 'TalentProfileDetail',
                query: { id: Name.resumeId },
              }"
              target="_blank"
              >{{ Name.fullName ? Name.fullName : "— —" }}</router-link
            >
          </template>
          <template v-slot:positionApplied="positionApplied">
            <div
              class="link-type cut"
              :title="positionApplied.positionName"
              @click="showDetail(positionApplied.demandId)"
              >{{ positionApplied.positionName }}</div
            >
          </template>
          <template v-slot:position="{ OrgName, areaCodeName }"
            ><div class="cut" :title="OrgName">{{ OrgName }}</div>
            <div>{{ areaCodeName }}</div></template
          >
          <template v-slot:degree="degree">
            <span style="margin-right: 0">{{
              getEducationLabel(degree.resumeEducation)
            }}</span>
          </template>
          <template v-slot:experience="experience">
            <span style="margin-right: 0">{{
              getExperienceLabel(experience.resumeExperience)
            }}</span>
          </template>

          <span slot="status" slot-scope="record, item">
            <a-popover placement="right" v-if="item.code == 30">
              <template slot="content">
                <span
                  >面试时间：{{
                    item.interviewTime ? item.interviewTime : "暂无"
                  }}</span
                >
              </template>
              <a-tag :class="getStatus(item)">{{
                item.statusDes
              }}</a-tag>
            </a-popover>
            <a-tag :class="getStatus(item)" v-else>
              {{ item.statusDes }}</a-tag
            >
          </span>
          <template v-slot:upDateTime="upDateTime">
            <span :title="upDateTime.talentModifiedUserTime">
              {{
                upDateTime.talentModifiedUserTime == null
                  ? "暂无"
                  : upDateTime.talentModifiedUserTime.substring(0, 10)
              }}</span
            >
          </template>
          <span slot="addDateTime" slot-scope="text, time">
            <span :title="time.talentCreateUserTime">
              {{
                time.talentCreateUserTime == null
                  ? "暂无"
                  : time.talentCreateUserTime.substring(0, 10)
              }}
            </span>
          </span>
          <!-- <template v-slot:addDateTime="addDateTime">
          <span :title="addDateTime.talentCreateUserTime"></span>
        </template> -->
          <!-- <span slot="status" slot-scope="text, item">
            <a-tag :class="getStatus(item.status)">{{ item.statusDes }}</a-tag>
          </span> -->
          <span slot="action" slot-scope="text, record">
            <!-- <a
              href="javascript:;"
              @click="handleAction(record)"
              style="margin-right: 10px"
              >操作</a
            > -->
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-tickets"
              title="操作记录"
              @click="handleLookRecord(record)"
              circle
            />
            <el-popover placement="right" width="100" trigger="hover">
              <el-button-group>
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleLookRemark(record)"
                  >查看备注</el-button
                >
              </el-button-group>
              <el-button
                slot="reference"
                style="margin-left: 10px"
                size="mini"
                icon="el-icon-plus"
                title="更多操作"
                circle
              />
            </el-popover>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <RecruitDetail :show.sync="recruitVisible" :list="detailList" />
      <a-modal
      width="60%"
      v-model="dialogLogVisible"
      title="职位操作记录"
      @ok="handleOk"
    >
      <div style="height: 500px; overflow-y: scroll">
        <a-timeline>
          <a-timeline-item v-for="(item, index) in recruitList" :key="index">
            <div>{{ item.operateTime }}</div>
            <div>操作人：{{ item.operateName }}</div>
            <div v-html="item.operateContent"></div>
            <div>{{ item.statusName }}</div>
          </a-timeline-item>
        </a-timeline>
      </div>
    </a-modal>
 
    <!-- 候选人进度 -->
    <a-modal
      v-model="candidateVisible"
      title="候选人进度"
      :footer="false"
      wrapClassName="candidate-modal"
      style="top: 30px"
      :bodyStyle="{
        height: '600px',
        overflowY: 'auto',
      }"
    >
      <OperationRecord :operation="recordList" />
    </a-modal>
    <candidate-remark
      :remarkVisible.sync="remarkVisible"
      :remarkList="remarkList"
    ></candidate-remark>
    <add-contact-remark
      :show.sync="showAddContactRemark"
      :id="selectedResumeId"
      @getCandidateList="getCandidate"
    />
  </div>
</template>

<script>
import {
  getCandidate,
  getRecord,
  getCandidateReview,
} from "@api/candidate/index";
import { getDemandById } from "@api/branchHC/index";
// import { getUserInfoList } from '@api/manage/index'
import OperationRecord from "./candidate/operationRecord/OperationRecord";
import flowFilter from "./department/flowFilter";
import { createNamespacedHelpers } from "vuex";
import { getContactRemark } from "@/api/talentCenter";
import CandidateRemark from "./department/CandidateRemark";
import AddContactRemark from "../talentCenter/profile/AddContactRemark";
import RecruitDetail from "./department/recruitDetail/RecruitDetail";
const { mapState } = createNamespacedHelpers("status");
const columns = [
  {
    title: "序号",
    fixed: "left",
    align: "center",
    width: 60,
    scopedSlots: { customRender: "num" },
  },
  {
    title: "姓名",
    key: "Name",
    width: 60,
    fixed: "left",
    align: "center",
    scopedSlots: { customRender: "Name" },
  },
  {
    title: "应聘职位",
    key: "positionApplied",
    width: 120,
    scopedSlots: { customRender: "positionApplied" },
  },
  {
    title: "应聘部门/城市",
    key: "position",
    width: 120,
    scopedSlots: { customRender: "position" },
  },
  {
    title: "手机号",
    dataIndex: "resumePhone",
    key: "resumePhone",
    width: 100,
    align: "center",
  },
  {
    title: "学历",
    key: "degree",
    width: 60,
    align: "center",
    scopedSlots: { customRender: "degree" },
  },
  {
    title: "状态",
    key: "status",
    width: 110,
    align: "center",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "推荐人",
    dataIndex: "realOwnerName",
    key: "realOwnerName",
    width: 100,
    align: "center",
  },
  {
    title: "录入人",
    dataIndex: "resumeCreateUserName",
    key: "resumeCreateUserName",
    width: 80,
    align: "center",
  },
  {
    title: "更新时间",
    key: "upDateTime",
    width: 110,
    align: "center",
    scopedSlots: { customRender: "upDateTime" },
  },
  {
    title: "添加时间",
    key: "addDateTime",
    width: 110,
    align: "center",
    scopedSlots: { customRender: "addDateTime" },
  },
  {
    title: "工作年限",
    key: "experience",
    width: 120,
    align: "center",
    scopedSlots: { customRender: "experience" },
  },
  // {
  //   title: '发生日期',
  //   dataIndex: 'createUserTime',
  //   key: 'createUserTime',
  //   width: '120px',
  //   align: 'center',
  //   sorter: (a, b) => {
  //     var stringA = a.createUserTime.toUpperCase(); // ignore upper and lowercase
  //     var stringB = b.createUserTime.toUpperCase(); // ignore upper and lowercase
  //     if (stringA < stringB) {
  //         return -1;
  //     }
  //     if (stringA > stringB) {
  //         return 1;
  //     }
  //     // names must be equal
  //     return 0;
  //   }
  // },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: "100px",
    align: "center",
    fixed: "right",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  components: {
    OperationRecord,
    flowFilter,
    CandidateRemark,
    AddContactRemark,
    RecruitDetail,
  },
  data() {
    return {
      detailList: {}, // 职位详情数据
      recruitVisible: false,
      remarkList: [],
      remarkVisible: false,
      showAddContactRemark: false,
      selectedResumeId: null,
      size: "default",
      operationId: undefined, //操作页流程
      SearchlistQuery: {
        title: "",
        position_id: undefined,
        user_id: undefined,
        position_type: undefined,
        dep_id: undefined,
        city_id: undefined,
        daterange: undefined,
        candidateStatus_id: undefined,
      },
      loading: false,
      candidateStatus: [],
      data: [],
      columns,
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      candidateVisible: false,
      recordList: {},
      name: "",
      searchValue: undefined, // 输入搜索
      searchSelect: 1, // 选择搜索
      statusSelect: 1, // 选择状态
      status: undefined,
      userInfo: undefined,
      userInfoList: [],
      dialogLogVisible: false,
      screenHeight: document.documentElement.clientHeight,
      personInfo: "",
      recruitList: [],
      selectedRowKeys: [],
      selectedRows: [],
    };
  },
  created() {
    //获取本地session。在跳转到操作页面回退后清空（清空在flowFilter组件中）
     let candidateData = JSON.parse(window.sessionStorage.getItem('MycandidateData'))
     
     if (candidateData != null && candidateData != undefined) {
        // console.log(candidateData.title)
        this.SearchlistQuery.title=candidateData.title
        this.SearchlistQuery.position_id=candidateData.position_id
        this.SearchlistQuery.candidateStatus_id=candidateData.candidateStatus_id
        this.SearchlistQuery.user_id=candidateData.user_id
        this.SearchlistQuery.position_type=candidateData.position_type
        this.SearchlistQuery.dep_id=candidateData.dep_id
        this.SearchlistQuery.city_id=candidateData.city_id
        this.SearchlistQuery.taskStart=candidateData.taskStart
        this.SearchlistQuery.taskEnd=candidateData.taskEnd
        this.pagination.pageSize=candidateData.pageSize
        this.pagination.current=candidateData.pageNum
        this.SearchlistQuery.daterange = candidateData.daterange  
     }

     this.getCandidate();

    this.candidateStatus = this.$store.state.status.candidateProcesses;
    // this.getCandidate();
    // this.getUserInfoListInit()
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight; // 窗口高度
    };
  },
  mounted(){
   
  },
  computed: {
    ...mapState({
      experiences: (state) => state.jobExperiences,
      educations: (state) => state.educationRequires,
      operationList: (state) => state.operationProcesses,
    }),
  },
  methods: {
    //保存搜索的信息，在点击操作的时候调用
    showCallbakData(){
       let candidateData = {
        title: this.SearchlistQuery.title,
        position_id:this.SearchlistQuery.position_id,
        candidateStatus_id: this.SearchlistQuery.candidateStatus_id,
        user_id: this.SearchlistQuery.user_id,
        position_type: this.SearchlistQuery.position_type,
        dep_id: this.SearchlistQuery.dep_id,
        city_id: this.SearchlistQuery.city_id,
        taskStart: this.SearchlistQuery.taskStart,
        taskEnd: this.SearchlistQuery.taskEnd,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current,
        daterange: this.SearchlistQuery.daterange
       }
      // window.sessionStorage.removeItem('MycandidateData')
      window.sessionStorage.setItem('MycandidateData', JSON.stringify(candidateData))
    },
    showDetail(id) {
      this.recruitVisible = true;
      this.getDemandByIdInit(id);
    },
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
    //导入简历
    handleResumeImport() {
      let demandIdList = [];
      this.$router.push({ name: "ProfileUpload", query: demandIdList });
    },
    //添加沟通备注
    handleAddRemark() {
      if (this.selectedRows.length == 0) {
        this.$message.error("请选择需要操作的候选人");
      } else if (this.selectedRows.length == 1) {
        this.selectedRows.map((i) => {
          this.selectedResumeId = i.resumeId;
        });
        this.showAddContactRemark = true;
      } else {
        this.$message.error("只能选择一个候选人");
      }
    },
    handleLookRemark(e) {
      getContactRemark(e.resumeId).then((res) => {
        if (res.data.code == 0) {
          this.remarkList = res.data.data.remark;
          this.remarkVisible = true;
        }
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
    },
    handleLookRecord(record) {
      getRecord({
        resumeId: record.resumeId,
        talentId: record.talentId,
      }).then((res) => {
        if (res.data.code == 0) {
          this.recruitList = res.data.data;
          this.dialogLogVisible = true;
        }
      });
    },
    handleOk(e) {
      this.dialogLogVisible = false;
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
    getCandidate() {
       console.log(this.SearchlistQuery.taskStart)
        console.log(this.SearchlistQuery.taskEnd)
      this.loading = true;
      getCandidate({
        title: this.SearchlistQuery.title,
        demandId: this.SearchlistQuery.position_id,
        status: this.SearchlistQuery.candidateStatus_id,
        realOwnerId:this.SearchlistQuery.user_id,
        jobType: this.SearchlistQuery.position_type,
        orgIds: this.SearchlistQuery.dep_id,
        areaCode: this.SearchlistQuery.city_id,
        taskStart: this.SearchlistQuery.taskStart,
        taskEnd: this.SearchlistQuery.taskEnd,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current,
      })
        .then((res) => {
          if (res.data.data === null) {
            this.data = [];
            this.loading = false;
          } else {
            this.data = res.data.data.candlist;
            this.pagination.total = res.data.data.meta.total;
            this.loading = false;
            this.selectedRowKeys = [];
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    getColorList(item) {
      if (item.status > 0) {
        if (item.status === 50 || item.status === 30) {
          return "wait";
        }
        if (item.status == 40) {
          if (item.statusDes !== "初试通过") {
            return "green";
          } else {
            return "first-green";
          }
        }
        if (item.status % 2 == 0) {
          return "success";
        } else {
          return "faild";
        }
      }
      return "faild-none";
    },
    // getStatus(value) {
    //   if (value == 50 || value == 30) {
    //     return "tab-wait";
    //   }
    //   if (value % 2 == 0) {
    //     return "tab-success";
    //   } else {
    //     return "tab-danger";
    //   }
    // },
    getStatus(item) {
      // console.log(item, '各种职位的状态数据')
      if (item.status >= 0) {
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
    // handleSearchChange(e) {
    //   this.searchSelect = e
    //   this.searchValue = ''
    //   if(this.searchSelect == 1) {
    //     this.resumePhone = undefined
    //     this.resumeMail = undefined
    //     this.placeholder = '请输入姓名'
    //   } else if(this.searchSelect == 2) {
    //     this.fullName = undefined
    //     this.resumeMail = undefined
    //     this.placeholder = '请输入手机号'
    //   } else {
    //     this.resumePhone = undefined
    //     this.fullName = undefined
    //     this.placeholder = '请输入邮箱'
    //   }
    // },
    // onSearch(e) {
    //   if(this.searchSelect == 1) {
    //     this.fullName = e
    //   } else if(this.searchSelect == 2) {
    //     this.resumePhone = e
    //   } else {
    //     this.resumeMail = e
    //   }
    //   this.getCandidate()
    // },
    // handleChange(e) {
    //   this.status = e
    //   this.onSearch()
    // },
    // handleUserChange(e){
    //   this.userInfo = e
    //   this.onSearch()
    // },
    handleFilter(listQuery) {

      console.log(listQuery);

      if (listQuery) {
        this.SearchlistQuery = listQuery;
      }
      this.pagination.current = 1;
      this.getCandidate();
      // if (listQuery) {
      //   this.listQuery = listQuery
      // }
      // this.listQuery.page = 1
      // this.listQuery.status = this.status
      // this.getList()
    },
    handleAction() {
      this.showCallbakData()
      const talentIds = [];
      if (this.selectedRows.length > 0) {
        this.selectedRows.map((item) => {
          talentIds.push(item.talentId);
        });
        this.$router.push({
          name: "MateAction",
          query: {
            talentIds: talentIds.join(","),
          },
        });
      } else {
        this.$message.error("请选择人员");
      }
      // this.$router.push({
      //   name: "MateAction",
      //   query: {

      //   },
      // });
    },
    handleOwnerView(record) {
      console.log("权益人查看", record);
      this.recordList = record;
      this.name = record.candidate;
      this.candidateVisible = true;
    },
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getCandidate();
    },
  },
};
</script>

<style scoped>
.candidate {
  background: #fff;
  padding: 22px;
  min-height: 100%;
  height: auto;
}
.candidate-nav {
  height: 70px;
  margin-top: 20px;
  box-shadow: 5px 0 20px #999;
}
.candidate-nav:hover {
  cursor: pointer;
}
.nav-num {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-weight: bold;
  color: #1890ff;
  text-align: center;
  padding-top: 10px;
}
.nav-item {
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #333;
  text-align: center;
  padding-top: 5px;
}
.modal-title {
  text-align: center;
  color: #1890ff;
  font-size: 16px;
}
.modal-name {
  text-align: center;
  color: #333;
}
.modal-status {
  text-align: center;
  color: green;
  font-size: 24px;
}
.light-row {
  background-color: #fff;
}
.dark-row {
  background-color: #f5f8fb;
}
a {
  text-decoration-line: none;
}
.tab-success {
  color: #1478e3;
  background-color: #e0f6ff;
  border-color: #1478e3;
}
.tab-wait {
  color: #feaa19;
  background-color: #fffbe0;
  border-color: #feaa19;
}
.tab-danger {
  color: #fc3d09;
  background-color: #fff0e2;
  border-color: #fc3d09;
}
</style>
<style scoped>
.candidate .ant-table-thead > tr > th {
  border-bottom: none;
}
.candidate .ant-table-tbody > tr > td {
  border-bottom: none;
  border-left: 1px solid #f0f0f0;
}
.candidate >>> .ant-table-row-cell-break-word {
  padding: 10px;
}

.candidate .ant-table-tbody > tr > td:first-child {
  border-left: none;
}
.candidate-modal .ant-modal-header {
  height: 48px;
  background: rgba(246, 247, 251, 1);
}
.candidate-modal .ant-modal-title {
  font-size: 14px;
  color: #000;
}
.label-span {
  padding: 0 5px 0 20px;
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
