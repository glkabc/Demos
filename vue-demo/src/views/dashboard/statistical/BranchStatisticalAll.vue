<template>
  <div class="container">
    <div class="form">
      <a-row :gutter='[10, 20]'>
        <a-col :span='8'>
          <span style="margin:0 10px 0 35px;color:#000;"
            >事业部</span
          >
          <a-select
            allowClear
            showSearch
            :value="groupId"
            placeholder="请选择事业部"
            @change="(e) => this.groupId = e"
            style="width: 70%"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
          >
            <a-select-option
              :value="item.sysOrgId"
              v-for="item in groupList"
              :key="item.sysOrgId"
              >{{ item.orgName }}</a-select-option
            >
          </a-select>
        </a-col>
        <a-col :span="8">
          <span style="margin:0 10px 0 20px;color:#000;">需求年份</span>
          <a-select
            showSearch
            placeholder="请选择年份"
            v-model="year"
            @change="(e) => this.year = e"
            style="width: 70%"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item"
              v-for="item in listYearOption"
              :key="item"
              >{{ item }} 年</a-select-option
            >
          </a-select>
        </a-col>
        <a-col :span="8">
          <span style="margin:0 10px 0 20px;color:#000;">统计周期</span>
          <a-range-picker
            style="width: 70%"
            format="YYYY-MM-DD"
            :value="statisticsTime"
            :allowClear="true"
            @change="(e) => this.statisticsTime = e"
          />
        </a-col>
        <a-col :span="8">
          <span style="margin:0 10px 0 20px;color:#000;">发布周期</span>
          <a-range-picker
            style="width: 70%"
            format="YYYY-MM-DD"
            :value="releasecycleTime"
            :allowClear="true"
            @change="(e) => this.releasecycleTime = e"
          />
        </a-col>
        <a-col :span="8">
          <span style="margin:0 10px 0 20px;color:#000;">一级部门</span>
          <a-cascader
            allowClear
            :show-search="{ filter }"
            :value="orgId"
            style="width: 70%"
            :options="companyAllList"
            @change="(value) => {this.orgId = value}"
            :fieldNames="{ label: 'orgName', value: 'orgId', children: 'orgList' }"
            placeholder="请选择标准岗位名称"
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }
            "
            />
        </a-col>
        <a-col :span='8'>
          <a-button
            :style="{
              marginLeft: '20px',
              backgroundColor: '#feaa19',
              border: '#feaa19',
            }"
            @click="() => getTableData(this.tabPosition)"
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
            @click="restSubmitData"
            type="primary"
          >
            重置
          </a-button>
          <a-button
            :style="{
              marginLeft: '10px',
              backgroundColor: '#22b8cf',
              border: '#22b8cf',
            }"
            @click="() => downloadFile()"
            type="primary"
            :loading="iconLoading"
          >
            导出
          </a-button>
        </a-col>
      </a-row>
    </div>
    <a-divider />
    <div class="table">
      <div class='table_bar'>
        <a-radio-group v-model="tabPosition" style="margin:8px">
          <a-radio-button value="0">
            满足率
          </a-radio-button>
          <a-radio-button value="1">
            满足周期
          </a-radio-button>
          <a-radio-button value="2">
            招聘进展
          </a-radio-button>
          <a-radio-button value="3">
            入职类别
          </a-radio-button>
        </a-radio-group>
      </div>
      <a-table
        bordered
        :columns="columns"
        :dataSource="tableData"
        :pagination="pagination"
        :loading="loading"
        :scroll="{ x: 1000, y: screenHeight - 360 }"
        class="zebra"
        @change="onShowSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { getPrimaryDepartment } from "@api/branchHC/index";
import {
  getAllInfo, 
  getDepartmentMeetFirst, 
  getDepartmentMeetSecond, 
  getDepartmentMeetThird, 
  getDepartmentMeetFourth,
  exportDepartmentMeet
} from "@api/statistical/index";
import download from './index';
import moment from 'moment';

const columnsOne = [
  {
    title: '事业部',
    key: 'groupIdName',
    dataIndex: 'groupIdName',
  },
  {
    title: '一级部门',
    key: 'firstOrgName',
    dataIndex: 'firstOrgName',
  },
  {
    title: '需求发布月',
    key: 'releaseMonth',
    dataIndex: 'releaseMonth',
  },
  {
    title: '满足率',
    key: 'fillRate',
    dataIndex: 'fillRate',
  },
  {
    title: '待招需求数',
    key: 'waitRecruitNum',
    dataIndex: 'waitRecruitNum',
  },
  {
    title: '已入职人数',
    key: 'entryNum',
    dataIndex: 'entryNum',
  },
  {
    title: '待入职人数',
    key: 'waitEntryNum',
    dataIndex: 'waitEntryNum',
  },
  {
    title: '初始需求数',
    key: 'demandNum',
    dataIndex: 'demandNum',
  },
  {
    title: '异常关闭需求数',
    key: 'abnormalNum',
    dataIndex: 'abnormalNum',
  },
  {
    title: '实际需求数',
    key: 'practicalNum',
    dataIndex: 'practicalNum',
  },
  {
    title: '他方满足人数',
    key: 'fullNum',
    dataIndex: 'fullNum',
  }
]
const columnsTwo = [
  {
    title: '事业部',
    key: 'groupIdName',
    dataIndex: 'groupIdName',
  },
  {
    title: '一级部门',
    key: 'firstOrgName',
    dataIndex: 'firstOrgName',
  },
  {
    title: '需求发布月',
    key: 'releaseMonth',
    dataIndex: 'releaseMonth',
  },
  {
    title: '入职人数',
    key: 'recruitsNum',
    dataIndex: 'recruitsNum',
  },
  {
    title: '1月',
    key: 'january',
    dataIndex: 'january',
  },
  {
    title: '2月',
    key: 'february',
    dataIndex: 'february',
  },
  {
    title: '3月',
    key: 'march',
    dataIndex: 'march',
  },
  {
    title: '4月',
    key: 'april',
    dataIndex: 'april',
  },
  {
    title: '5月',
    key: 'may',
    dataIndex: 'may',
  },
  {
    title: '6月',
    key: 'june',
    dataIndex: 'june',
  },
  {
    title: '7月',
    key: 'july',
    dataIndex: 'july',
  },
  {
    title: '8月',
    key: 'august',
    dataIndex: 'august',
  },
  {
    title: '9月',
    key: 'september',
    dataIndex: 'september',
  },
  {
    title: '10月',
    key: 'october',
    dataIndex: 'october',
  },
  {
    title: '11月',
    key: 'november',
    dataIndex: 'november',
  },
  {
    title: '12月',
    key: 'december',
    dataIndex: 'december',
  },
]
const columnsThree = [
  {
    title: '事业部',
    key: 'groupIdName',
    dataIndex: 'groupIdName',
  },
  {
    title: '一级部门',
    key: 'firstOrgName',
    dataIndex: 'firstOrgName',
  },
  {
    title: '需求发布月',
    key: 'releaseMonth',
    dataIndex: 'releaseMonth',
  },
  {
    title: '筛选通过率',
    key: 'screenPercent',
    dataIndex: 'screenPercent',
  },
  {
    title: '初试通过率',
    key: 'firstPassPercent',
    dataIndex: 'firstPassPercent',
  },
  {
    title: '复试通过率',
    key: 'secondInterviewPercent',
    dataIndex: 'secondInterviewPercent',
  },
  {
    title: 'offer放弃率',
    key: 'offerOutPercent',
    dataIndex: 'offerOutPercent',
  },
  {
    title: '推荐数',
    key: 'recommendNum',
    dataIndex: 'recommendNum',
  },
  {
    title: '已筛选数',
    key: 'screenNum',
    dataIndex: 'screenNum',
  },
  {
    title: '待筛选数',
    key: 'waitScreenNum',
    dataIndex: 'waitScreenNum',
  },
  {
    title: '通过筛选数',
    key: 'screenPassNum',
    dataIndex: 'screenPassNum',
  },
  {
    title: '淘汰筛选数',
    key: 'screenOutNum',
    dataIndex: 'screenOutNum',
  },
  {
    title: '初试数',
    key: 'firstInterviewNum',
    dataIndex: 'firstInterviewNum',
  },
  {
    title: '初试通过数',
    key: 'firstPassInterviewNum',
    dataIndex: 'firstPassInterviewNum',
  },
  {
    title: '复试数',
    key: 'secondInterviewNum',
    dataIndex: 'secondInterviewNum',
  },
  {
    title: '复试通过数',
    key: 'secondPassInterviewNum',
    dataIndex: 'secondPassInterviewNum',
  },
  {
    title: '面试通过数',
    key: 'interviewPassNum',
    dataIndex: 'interviewPassNum',
  },
  {
    title: 'offer数',
    key: 'offerNum',
    dataIndex: 'offerNum',
  },
  {
    title: 'offer放弃数',
    key: 'offerOutNum',
    dataIndex: 'offerOutNum',
  },
]
const columnsFour = [
  {
    title: '事业部',
    key: 'groupIdName',
    dataIndex: 'groupIdName',
  },
  {
    title: '一级部门',
    key: 'firstOrgName',
    dataIndex: 'firstOrgName',
  },
  {
    title: '需求发布月',
    key: 'releaseMonth',
    dataIndex: 'releaseMonth',
  },
  {
    title: '入职人数',
    key: 'recruitsNum',
    dataIndex: 'recruitsNum',
  },
  {
    title: '社招',
    key: 'socialRecruitment',
    dataIndex: 'socialRecruitment',
  },
  {
    title: '挂靠',
    key: 'dependOn',
    dataIndex: 'dependOn',
  },
  {
    title: '内推',
    key: 'interpolation',
    dataIndex: 'interpolation',
  },
  {
    title: '实习转正式',
    key: 'regularWorker',
    dataIndex: 'regularWorker',
  },
  {
    title: '转编',
    key: 'personnelTransfer',
    dataIndex: 'personnelTransfer',
  },
  {
    title: '内部调动',
    key: 'conversion',
    dataIndex: 'conversion',
  },
]
export default {
  name: 'BranchStatisticalAll',
  data() {
    return {
      groupId: undefined, // 事业部
      groupList: [],
      year: undefined,  // 需求年份
      listYearOption: [],
      statisticsTime: [], // 统计周期
      releasecycleTime: [], // 发布周期
      companyAllList: [],
      orgId: undefined, // 一级部门
      tabPosition: '0',
      columns: columnsOne,
      tableData: [],
      loading: false,
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      screenHeight: document.documentElement.clientHeight,
      iconLoading: false,
    }
  },
  watch: {
    tabPosition(e) {
       switch(e) {
        case '0': this.columns = columnsOne; break;
        case '1': this.columns = columnsTwo; break;
        case '2': this.columns = columnsThree; break;
        case '3': this.columns = columnsFour; break;
        default: this.columns = []
      }
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.tableData = []
      this.getTableData(this.tabPosition);
    },
    tableData(e) {
      // console.log(e, '数据变化')
    }
  },
  mounted() {
    this.year = moment(new Date()).format('YYYY');
    this.releasecycleTime = [moment().subtract(1, "years"), moment(new Date())]
    this.dateInit();
    this.getAllInfoInit();
    this.getPrimaryDepartmentInit();
    this.getTableData(this.tabPosition);
  },
  methods: {
    async getURL(type, data) {
      if (type === '0') return await getDepartmentMeetFirst(data)
      if (type === '1') return await getDepartmentMeetSecond(data) 
      if (type === '2') return await getDepartmentMeetThird(data)
      if (type === '3') return await getDepartmentMeetFourth(data)
    },
    // 获取数据
    async getTableData(type) {
      this.loading = true
      let data = {
        customId: this.groupId ? this.groupId : null,
        orgId: this.orgId ? this.orgId[1] : null,
        year: this.year ? this.year : null,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        statisDateStart: this.statisticsTime[0] ? moment(this.statisticsTime[0]).format('YYYY-MM-DD') : null,
        statisDateEnd: this.statisticsTime[1] ? moment(this.statisticsTime[1]).format('YYYY-MM-DD') : null,
        demandReleaseStart: this.releasecycleTime[0] ? moment(this.releasecycleTime[0]).format('YYYY-MM-DD') : null,
        demandReleaseEnd: this.releasecycleTime[1] ? moment(this.releasecycleTime[1]).format('YYYY-MM-DD') : null,
      }
      let res = await this.getURL(type, data)
      if (res.data.code === 0) {
        if (res.data.data.length !== 0) {
          this.tableData = res.data.data.list
          console.log(this.tableData, '数据-11111111dsfsdadda----')
          // this.pagination.pageSize = res.data.data.meta.pageSize
          // this.pagination.pageNum = res.data.data.meta.pageNum
          // this.pagination.total = res.data.data.meta.size
        } else {
          this.tableData = []
        }
        this.loading = false
      } else {
        this.tableData = []
        this.loading = false
      }
    },
    // 重置数据
    restSubmitData() {
      this.groupId = undefined

      this.statisticsTime = []
      this.releasecycleTime = [moment().subtract(1, "years"), moment(new Date())]

      this.orgId = undefined
      this.year = moment(new Date()).format('YYYY')
      this.getTableData(this.tabPosition);
    },
    // 导出数据
    async downloadFile() {
      try {
        this.iconLoading = true
        let data = {
          groupId: this.groupId ? this.groupId : null,
          orgId: this.orgId ? this.orgId[1] : null,
          year: this.year ? this.year : null,
          // pageNum: this.pagination.current,
          // pageSize: this.pagination.pageSize,
          statisDateStart: this.statisticsTime[0] ? moment(this.statisticsTime[0]).format('YYYY-MM-DD') : null,
          statisDateEnd: this.statisticsTime[1] ? moment(this.statisticsTime[1]).format('YYYY-MM-DD') : null,
          demandReleaseStart: this.releasecycleTime[0] ? moment(this.releasecycleTime[0]).format('YYYY-MM-DD') : null,
          demandReleaseEnd: this.releasecycleTime[1] ? moment(this.releasecycleTime[1]).format('YYYY-MM-DD') : null,
        }
        let res = await exportDepartmentMeet(this.tabPosition, data)
        let exportFileName = '部门满足情况_统计表'
        switch(this.tabPosition) {
          case '0': exportFileName = '部门满足情况_总_满足率_统计表'; break;
          case '1': exportFileName = '部门满足情况_总_满足周期_统计表'; break;
          case '2': exportFileName = '部门满足情况_总_招聘进展_统计表'; break;
          case '3': exportFileName = '部门满足情况_总_入职类型_统计表'; break;
          default: return;
        }
        download(res.data, exportFileName)
        this.iconLoading = false
      } catch (err) {
        console.log(err)
        this.iconLoading = false
      }
    },
    async getPrimaryDepartmentInit() {
      try {
        const res = await getPrimaryDepartment()
        this.groupList = res.data.data
      }
      catch(error) {}
    },
    // 获取一级部门
    async getAllInfoInit() {
      try {
        const res = await getAllInfo({
          level: 1
        })
        if(res.data.code == 0) {
          this.companyAllList = res.data.data.companyAllList
        }
      }
      catch(error){console.log(error)}
    },
    dateInit(){
      let data = new Date().getFullYear() - 10;
      this.listYearOption = [];
      for (let i = 20; i > -1; i--) {
          let num = data + i;
          this.listYearOption.push(num);
      }
    },
    filter(inputValue, path) {
      return path.some(option => option.orgName.indexOf(inputValue) > -1);
    },
    onShowSizeChange({ current, pageSize }) {
      // console.log(current, pageSize, '表格底部数据')
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      // this.getTableData(this.tabPosition);
    },
  }
}
</script>

<style scoped lang='css'>
  .container {
    height: 100%;
    background-color: #fff;
    padding: 22px;
  }
  .form {
    background-color: #fff;
  }
  .table {
    background-color: #fff;
  }
  .table .table_bar {
    text-align: right;
  }
</style>