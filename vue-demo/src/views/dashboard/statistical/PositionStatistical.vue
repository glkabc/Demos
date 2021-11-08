<template>
  <div class="position">
    <div class="position-head">
      <a-row>
        <a-col :span="24">
          <span class="span-head-left">部门</span>
          <a-select
            showSearch
            :value="deparmentId"
            placeholder="请选择部门"
            @change="handleDeparmentChange"
            allowClear
            class="account-form-head"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item.orgId"
              v-for="item in orgList"
              :key="item.orgId"
              >{{ item.orgName }}</a-select-option
            >
          </a-select>
          <span class="span-head">岗位负责人</span>
          <a-select
            showSearch
            :value="recruitment"
            placeholder="请选择岗位负责人"
            @change="searchChange"
            allowClear
            class="account-form-head"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item.specialistId"
              v-for="item in recruitmentList"
              :key="item.specialistId"
              >{{ item.userName }}</a-select-option
            >
          </a-select>
          <span class="span-head">发布时间</span>
          <a-range-picker
            :value="entry"
            format="YYYY-MM-DD"
            class="account-form-head"
            @change="handleDateClick"
          />
          <span class="span-head">统计时间</span>
          <a-range-picker
            :value="accountDate"
            format="YYYY-MM-DD"
            class="account-form-head"
            @change="handleCenDateClick"
          />
        </a-col>
        <a-col :span="24" style="margin-top: 16px">
          <span class="span-head-left">状态</span>
          <a-select
            showSearch
            allowClear
            :value="statusValue"
            placeholder="请选择状态"
            @change="handleStatusChange"
            class="account-form-head"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item.value"
              v-for="item in recruitQueryTypes"
              :key="item.value"
              >{{ item.label }}</a-select-option
            >
          </a-select>
          
          <span class="span-no">职位编号</span>
          <a-input
            v-model.trim="demandNo"
            @change="handleDemandNoChange"
            placeholder="请输入职位编号"
            allowClear
            class="account-form-head"
          />
        
          <a-button
            :style="{
              marginLeft: '20px',
              backgroundColor: '#feaa19',
              border: '#feaa19',
            }"
            @click="handleSearchSubmit"
            type="primary"
          >
            查询
          </a-button>
          <a-button
            :style="{
              marginLeft: '10px',
              backgroundColor: '#22b8cf',
              border: '#22b8cf',
            }"
            @click="handleResetSubmit"
            type="primary"
          >
            重置
          </a-button>
              <a-button
            :style="{
              marginLeft: '10px',
              
            }"
            @click="exportDemandStatisticsAll"
            type="primary"
            :loading="exportAllLoading"
          >
            招聘详情导出
          </a-button>
          <a-button
            :style="{
              marginLeft: '10px',
              backgroundColor: '#22b8cf',
              border: '#22b8cf',
            }"
            @click="resetExportClick"
            type="primary"
            :loading="iconLoading"
          >
            招聘汇总导出
          </a-button>
    
        </a-col>
      </a-row>
    <a-row>
      <a-divider />
      
          
          
    </a-row>
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
        @change="onShowSizeChange"
        :scroll="{ x: 3000, y: screenHeight - 400 }"
      >
        <span slot="emergencyLevel" slot-scope="record, item">
          <a-tag :class="getEmergency(item.emergencyLevel).type">{{
            getEmergency(item.emergencyLevel).name
          }}</a-tag>
        </span>
        <span slot="statusName" slot-scope="record, item">
          <span>
            <a-badge
              status="processing"
              :color="getStatusColoeBadge(item.statusName)"
            />
            {{ item.statusName }}
          </span>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import {
  exportJobStatistics,
  getJobStatistics,
  getRecruitmentSpecialist,
  exportDemandStatisticsAll
} from '@api/statistical/index'
import { getStructureList } from '@api/demandBranch/index'
import download from './index'
import { createNamespacedHelpers } from 'vuex'
import { Trim } from "../../../trim/trim"
const { mapState } = createNamespacedHelpers('status')
const columns = [
  // {
  //   title: "需求编码",
  //   dataIndex: "demandId",
  //   key: "demandId",
  // },
  {
    title: '职位',
    dataIndex: 'positionName',
    key: 'positionName',
    width: 150,
  },
  {
    title: '事业部',
    dataIndex: 'groupIdName',
    key: 'groupIdName',
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
    title: '职位编号',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: '岗位负责人',
    dataIndex: 'recruitmentSpecialist',
    key: 'recruitmentSpecialist',
  },
  {
    title: '发布时间',
    dataIndex: 'releaseTime',
    key: 'releaseTime',
    width: 150,
  },
  // {
  //   title: "发布人",
  //   dataIndex: "releaseName",
  //   key: "releaseName",
  // },
  {
    title: '状态',
    dataIndex: 'statusName',
    key: 'statusName',
    scopedSlots: { customRender: 'statusName' },
  },
  {
    title: '工作地点',
    dataIndex: 'workPlace',
    key: 'workPlace',
  },
  {
    title: '职级',
    dataIndex: 'evaluationCriteria',
    key: 'evaluationCriteria',
  },
  {
    title: '初始需求数',
    dataIndex: 'recruitNum',
    key: 'recruitNum',
  },
  {
    title: '待招需求数',
    dataIndex: 'waitRecruitNum',
    key: 'waitRecruitNum',
  },
  {
    title: '已满足数',
    dataIndex: 'employNum',
    key: 'employNum',
  },
  {
    title: '推荐数',
    dataIndex: 'recommendNum',
    key: 'recommendNum',
  },
  {
    title: '面试数',
    dataIndex: 'interviewNum',
    key: 'interviewNum',
  },
  {
    title: '面试通过数',
    dataIndex: 'interviewSuccessNum',
    key: 'interviewSuccessNum',
  },
  {
    title: '入职数',
    dataIndex: 'entryNum',
    key: 'entryNum',
  },
  {
    title: '紧急度',
    dataIndex: 'emergencyLevel',
    key: 'emergencyLevel',
    scopedSlots: { customRender: 'emergencyLevel' },
  },
  {
    title: '面试官',
    dataIndex: 'interviewerName',
    key: 'interviewerName',
    ellipsis: true,
  },
  // {
  //   title: '复试面试官',
  //   dataIndex: 'reInterviewerName',
  //   key: 'reInterviewerName',
  // },
  // {
  //   title: '简历筛选人',
  //   dataIndex: 'resumeFilterName',
  //   key: 'resumeFilterName',
  // },
  {
    title: '职位描述',
    dataIndex: 'jobDeions',
    key: 'jobDeions',
    ellipsis: true,
  },
  {
    title: '备注',
    dataIndex: 'comments',
    key: 'comments',
    // fixed: "right",
    ellipsis: true,
    // width: 80,
  },
]
export default {
  data() {
    return {
      columns,
      data: [],
      pagination: {
        current: 1,
        pageSizeOptions: ['10', '20', '30', '40'],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      deparmentId: undefined, // 绑定部门
      statusValue: undefined, // 绑定状态
      recruitment: undefined, // 岗位负责人
      demandNo: '',
      loading: false,
      startTime: '',
      endTime: '',
      entry:null,
      accountDate:null,
      recruitmentList: [], // 岗位负责人列表
      orgList: [], // 部门列表
      screenHeight: document.documentElement.clientHeight,
       iconLoading: false,
       exportAllLoading:false,
    }
  },
  computed: {
    ...mapState({
      recruitQueryTypes: (state) => state.recruitQueryTypes,
    }),
  },
  mounted() {
    this.getJobStatisticsInit()
    this.getRecruitmentSpecialistInit()
    this.getStructureListInit()
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight // 窗口高度
    }
  },
  methods: {
    getStatusColoeBadge(status) {
      switch (status) {
        case '进行中':
          return '#4480EE'
          break
        case '已关闭':
          return '#999999'
          break
        case '暂停中':
          return '#FEAA19'
          break
        default:
          return '#22B8CF'
          break
      }
    },
    getEmergency(type) {
      switch (type) {
        case 1:
          let statusFirs = {
            name: '一般',
            type: 'blueColor',
          }
          return statusFirs
          break
        case 2:
          let statussecond = {
            name: '紧急',
            type: 'warningColor',
          }
          return statussecond
          break
        default:
          let statusThird = {
            name: '特急',
            type: 'dangerColor',
          }
          return statusThird
          break
      }
    },
    // 获取岗位负责人
    async getRecruitmentSpecialistInit() {
      try {
        const res = await getRecruitmentSpecialist()
        this.recruitmentList = res.data.data
      } catch (error) {}
    },
    // 获取部门列表
    async getStructureListInit() {
      try {
        const res = await getStructureList()
        this.orgList = res.data.data.orgList
      } catch (error) {}
    },
    async getJobStatisticsInit() {
      try {
        this.loading = true
        const res = await getJobStatistics({
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          no: Trim(this.demandNo),
          statisDateStart: this.statisDateStart,
          statisDateEnd: this.statisDateEnd,
          startTime: this.startTime,
          endTime: this.endTime,
          status: this.statusValue,
          specialistId: this.recruitment,
          orgId: this.deparmentId,
        })
        this.loading = false
        if (res.data.data.length == []) {
          this.data = []
        } else {
          this.data = res.data.data.list
          this.pagination.total = res.data.data.total
        }
      } catch (error) {}
    },
    // 分页
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
      this.getJobStatisticsInit()
    },
    // 选择岗位负责人
    searchChange(e) {
      this.recruitment = e
    },
    // 选择部门
    handleDeparmentChange(e) {
      this.deparmentId = e
    },
    // 选择状态
    handleStatusChange(e) {
      this.statusValue = e
    },
    handleDemandNoChange(e) {
      this.demandNo = e.target.value
    },
    // 时间筛选
    handleDateClick(e, value) {
      this.entry = e ;
      this.startTime = value[0]
      this.endTime = value[1]
    },
    handleCenDateClick(e, value) {
      this.accountDate = e;
      this.statisDateStart = value[0]
      this.statisDateEnd = value[1]
    },
    // 搜索
    handleSearchSubmit() {
      this.getJobStatisticsInit()
    },
    handleResetSubmit(){
      this.deparmentId = undefined;
      this.statusValue = undefined; // 绑定状态
      this.recruitment = undefined; // 岗位负责人
      this.demandNo = '';
      this.startTime = '';
      this.endTime = '';
      this.statisDateEnd = '';
      this.statisDateStart = '';
      this.entry = null;
      this.accountDate = null;
      this.getJobStatisticsInit();
    },
    // 导出
    async resetExportClick() {
      this.iconLoading = true;
      try {
        const res = await exportJobStatistics({
          startTime: this.startTime,
          endTime: this.endTime,
          no: Trim(this.demandNo),
          statisDateStart: this.statisDateStart,
          statisDateEnd: this.statisDateEnd,
        })
        if(res.data){
          this.iconLoading = false;
        }
        download(res.data, '职位统计表')
      } catch (error) {
        // this.$message
        this.iconLoading = false;
      }
    },
    // 导出招聘详情
    async exportDemandStatisticsAll() {
       this.exportAllLoading = true;
      try {
        const res = await exportDemandStatisticsAll({
          // pageNum: this.pagination.current,
          // pageSize: this.pagination.pageSize,
          no: Trim(this.demandNo),
          statisDateStart: this.statisDateStart,
          statisDateEnd: this.statisDateEnd,
          startTime: this.startTime,
          endTime: this.endTime,
          status: this.statusValue,
          specialistId: this.recruitment,
          orgId: this.deparmentId,
        })
        if(res.data) {
           this.exportAllLoading = false;
        }
        download(res.data, '招聘详情统计表')
      } catch (error) {
         this.exportAllLoading = false;
      }
    }
  },
}
</script>

<style scoped>
.position {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
/* .position >>> .ant-table-thead > tr > th {
  border-bottom: 0;
  color: rgba(132, 145, 158, 1);
  font-weight: bold;
  cursor: pointer;
}

.position >>> .ant-table-tbody > tr > td {
  border-bottom: 0;
  border-right: 1px solid #f0f0f0;
} */
.position-head {
  margin-left: 5px;
}
.position-main {
  /* margin-top: 20px; */
}
.span-no{
  margin: 0 10px 0 34px;;
  color: #000;
  display: inline-block
}
.span-head {
  margin: 0 10px 0 20px;
  color: #000;
  /* font-weight: 600; */
  /* text-align: left; */
  /* width: 70px; */
  display: inline-block
}
.span-head-left {
  margin-right:10px;
  /* margin: 0 2px 0 0; */
  color: #000;
  /* font-weight: 600; */
  /* text-align: left; */
  /* width: 70px; */
  display: inline-block
}
.account-form-head {
  width: 18%;
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
