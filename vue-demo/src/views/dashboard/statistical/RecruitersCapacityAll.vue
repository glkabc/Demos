<template>
  <div class="container">
    <div class="form">
      <a-row :gutter='[20, 20]'>
        <a-col :span='8'>
          <span style="margin:0 10px 0 20px;color:#000;"
            >所属部门</span
          >
          <a-select
            allowClear
            showSearch
            placeholder="请选择部门"
            v-model="sysOrgId"
            @change="(e) => this.sysOrgId = e"
            style="width: 70%"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
          >
            <a-select-option
              :value="item.sysOrgId"
              v-for="item in orgList"
              :key="item.sysOrgId"
              >{{ item.orgName }}</a-select-option
            >
          </a-select>
        </a-col>
        <a-col :span='8'>
          <span style="margin-right: 10px;color:#000;"
            >用户姓名</span
          >
          <a-select
            showSearch
            allowClear
            mode='multiple'
            :maxTagCount='1'
            :value="userId"
            placeholder="请选择姓名"
            @change="(e) => this.userId = e"
            style="width: 70%"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item.sysUserId"
              v-for="item in recruitmentList"
              :key="item.sysUserId"
              >
              {{ item.userName }}
              <span style="color:#71a1f3;padding-left:5px;">[{{item.mail}}]</span>
              </a-select-option
            >
          </a-select>
        </a-col>
        <a-col :span='8'>
          <span style="margin-right: 10px;color:#000;"
            >账号情况</span
          >
          <a-select
            allowClear
            showSearch
            placeholder="请选择"
            v-model="status"
            @change="(e) => this.status = e"
            style="width: 70%"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
          >
            <a-select-option :value="2">禁用</a-select-option>
            <a-select-option :value="1">启用</a-select-option>
          </a-select>
        </a-col>

      </a-row>
      <a-row :gutter='[20, 20]'>
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
          <span style="margin:0 10px 0 0;color:#000;">发布周期</span>
          <a-range-picker
            style="width: 70%"
            format="YYYY-MM-DD"
            :value="releasecycleTime"
            :allowClear="true"
            @change="(e) => this.releasecycleTime = e"
          />
        </a-col>
        <a-col :span="8">
          <span style="margin:0 10px 0 0;color:#000;">一级部门</span>
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

        <a-col :span="8">
          <span style="margin:0 10px 0 20px;color:#000;">需求年份</span>
          <!-- <a-date-picker
            v-model="year"
            @change="onChangeData"
            style="width: 70%"
          /> -->
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
        <a-col :span='8'>
          <a-button
            :style="{
              marginLeft: '10px',
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
            招聘进展
          </a-radio-button>
          <a-radio-button value="2">
            入职类型
          </a-radio-button>
          <a-radio-button value="3">
            招聘业绩
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
import {
  getAllInfo, 
  getRecruitProductionFirst, 
  getSysUsers, 
  getRecruitProductionSecond, 
  getRecruitProductionThird, 
  getRecruitProductionFourth,
  exportRecruitProduction,
  getPrimaryDepartment,
} from "@api/statistical/index";
import download from './index';
import moment from 'moment'
const columnsOne = [
  {
    title: '所属部门',
    dataIndex: 'department',
  },
  {
    title: '账号情况',
    width: 90,
    dataIndex: 'status',
  },
  {
    title: '姓名',
    dataIndex: 'userName',
  },
  {
    title: '满足率',
    width: 80,
    dataIndex: 'fillRate',
  },
  {
    title: '待诏需求数',
    align: 'center',
    dataIndex: 'waitRecruitNum',
  },
  {
    title: '已入职人数',
    align: 'center',
    dataIndex: 'entryNum',
  },
  {
    title: '待入职人数',
    align: 'center',
    dataIndex: 'waitEntryNum',
  },
  {
    title: '初始需求数',
    align: 'center',
    dataIndex: 'demandNum',
  },
  {
    title: '异常关闭需求数',
    align: 'center',
    dataIndex: 'abnormalNum',
  },
  {
    title: '实际需求数',
    align: 'center',
    dataIndex: 'practicalNum',
  },
  {
    title: '他方满足人数',
    align: 'center',
    dataIndex: 'fullNum',
  }
]
const columnsTwo = [
  {
    title: '所属部门',
    width: 100,
    dataIndex: 'department',
  },
  {
    title: '账号情况',
    width: 100,
    dataIndex: 'status',
  },
  {
    title: '姓名',
    width: 100,
    dataIndex: 'userName',
  },
  {
    title: '筛选通过率',
    width: 100,
    align: 'center',
    dataIndex: 'screenPercent',
  },
  {
    title: '初试通过率',
    width: 100,
    align: 'center',
    dataIndex: 'firstPassPercent',
  },
  {
    title: '复试通过率',
    width: 100,
    align: 'center',
    dataIndex: 'secondInterviewPercent',
  },
  {
    title: 'offer放弃率',
    width: 100,
    align: 'center',
    dataIndex: 'offerOutPercent',
  },
  {
    title: '推荐数',
    width: 70,
    align: 'center',
    dataIndex: 'recommendNum',
  },
  {
    title: '已筛选数',
    width: 90,
    align: 'center',
    dataIndex: 'screenNum',
  },
  {
    title: '待筛选数',
    width: 90,
    align: 'center',
    dataIndex: 'waitScreenNum',
  },
  {
    title: '通过筛选数',
    width: 100,
    align: 'center',
    dataIndex: 'screenPassNum',
  },
  {
    title: '淘汰筛选数',
    width: 100,
    align: 'center',
    dataIndex: 'screenOutNum',
  },
  {
    title: '初试数',
    width: 70,
    align: 'center',
    dataIndex: 'firstInterviewNum',
  },
  {
    title: '初试通过数',
    width: 100,
    align: 'center',
    dataIndex: 'firstPassInterviewNum',
  },
  {
    title: '复试数',
    width: 70,
    align: 'center',
    dataIndex: 'secondInterviewNum',
  },
  {
    title: '复试通过数',
    width: 100,
    align: 'center',
    dataIndex: 'secondPassInterviewNum',
  },
  {
    title: '面试通过数',
    width: 100,
    align: 'center',
    dataIndex: 'interviewPassNum',
  },
  {
    title: 'offer数',
    width: 80,
    align: 'center',
    dataIndex: 'offerNum',
  },
  {
    title: 'offer放弃数',
    width: 100,
    align: 'center',
    dataIndex: 'offerOutNum',
  },
  {
    title: '新简历',
    width: 80,
    align: 'center',
    dataIndex: 'resumeNUm',
  },
]
const columnsThree = [
  {
    title: '所属部门',
    dataIndex: 'department',
  },
  {
    title: '账号情况',
    dataIndex: 'status',
  },
  {
    title: '姓名',
    dataIndex: 'userName',
  },
  {
    title: '入职人数',
    dataIndex: 'entryNum',
  },
  {
    title: '社招',
    dataIndex: 'socialNum',
  },
  {
    title: '挂靠',
    dataIndex: 'attachedNum',
  },
  {
    title: '内推',
    dataIndex: 'interpolateNum',
  },
  {
    title: '实习转正式',
    dataIndex: 'internBeRegularNum',
  },
  {
    title: '转编',
    dataIndex: 'turnEdNum',
  },
  {
    title: '内部调动',
    dataIndex: 'internalTransferNum',
  },
]
const columnsFour = [
  {
    title: '所属部门',
    dataIndex: 'department',
  },
  {
    title: '账号情况',
    dataIndex: 'status',
  },
  {
    title: '姓名',
    dataIndex: 'userName',
  },
  {
    title: '入职人数',
    dataIndex: 'total',
  },
  {
    title: '1月',
    dataIndex: 'jan',
  },
  {
    title: '2月',
    dataIndex: 'feb',
  },
  {
    title: '3月',
    dataIndex: 'mar',
  },
  {
    title: '4月',
    dataIndex: 'apr',
  },
  {
    title: '5月',
    dataIndex: 'may',
  },
  {
    title: '6月',
    dataIndex: 'jun',
  },
  {
    title: '7月',
    key: 'jul',
    dataIndex: 'jul',
  },
  {
    title: '8月',
    dataIndex: 'aug',
  },
  {
    title: '9月',
    dataIndex: 'sep',
  },
  {
    title: '10月',
    dataIndex: 'oct',
  },
  {
    title: '11月',
    dataIndex: 'nov',
  },
  {
    title: '12月',
    dataIndex: 'dec',
  },
]
export default {
  name: 'RecruitersCapacity',
  data() {
    return {
      statisticsTime: [],
      releasecycleTime: [],
      organizeId: null,
      companyAllList: [],
      status: undefined,
      userId: undefined,
      recruitmentList: [],
      listYearOption: [],
      orgList: [],
      tabPosition: '0',
      columns: [],
      tableData: null,
      orgId: undefined,
      sysOrgId: undefined,
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      loading: false,
      year: undefined,
      screenHeight: document.documentElement.clientHeight,
      iconLoading: false,
    }
  },
  created() {
    this.getAllInfoInit();
  },
  mounted() {
    this.year = moment(new Date()).format('YYYY')
    this.dateInit();
    this.getStructureListInit();
    this.getSysUsersInit();
    // console.log(this.tabPosition, '初试化数据')
    this.initColums(this.tabPosition)
    this.getTableData(this.tabPosition);
  },
  watch: {
    tabPosition(e) {
      this.initColums(e)
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.tableData = []
      this.getTableData(this.tabPosition);
    }
  },
  methods: {
    initColums(e) {
      switch(e) {
        case '0': this.columns = columnsOne; break;
        case '1': this.columns = columnsTwo; break;
        case '2': this.columns = columnsThree; break;
        case '3': this.columns = columnsFour; break;
        default: this.columns = []
      }
    },
    async getURL(type, data) {
      if (type === '0') return await getRecruitProductionFirst(data)
      if (type === '1') return await getRecruitProductionSecond(data) // 招聘进展
      if (type === '2') return await getRecruitProductionThird(data) // 入职类别获取
      if (type === '3') return await getRecruitProductionFourth(data) // 招聘业绩
    },
    // 获取数据
    async getTableData(type) {
      this.loading = true
      let data = {
        orgId: this.orgId ? this.orgId[1] : null,
        year: this.year ? this.year : null,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        statisDateStart: this.statisticsTime[0] ? moment(this.statisticsTime[0]).format('YYYY-MM-DD') : null,
        statisDateEnd: this.statisticsTime[1] ? moment(this.statisticsTime[1]).format('YYYY-MM-DD') : null,
        releaseStart: this.releasecycleTime[0] ? moment(this.releasecycleTime[0]).format('YYYY-MM-DD') : null,
        releaseEnd: this.releasecycleTime[1] ? moment(this.releasecycleTime[1]).format('YYYY-MM-DD') : null,
        sysOrgId: this.sysOrgId ? this.sysOrgId : null,
        userId: this.userId ? this.userId.toString() : null,
        status: this.status ? this.status : null,
      }
      let res = await this.getURL(type, data)

      if (res.data.code === 0) {
        if (res.data.data.length !== 0) {
          this.tableData = res.data.data.list
          this.pagination.pageSize = res.data.data.meta.pageSize
          this.pagination.pageNum = res.data.data.meta.pageNum
          this.pagination.total = res.data.data.meta.size
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
      this.sysOrgId = undefined
      this.userId = undefined
      this.status = undefined

      this.statisticsTime = []
      this.releasecycleTime = []

      this.orgId = undefined
      this.year = moment(new Date()).format('YYYY')
      this.getTableData(this.tabPosition);
    },
    // 导出数据
    async downloadFile() {
      try {
        this.iconLoading = true
        let data = {
          orgId: this.orgId ? this.orgId[1] : null,
          year: this.year ? this.year : null,
          // pageNum: this.pagination.current,
          // pageSize: this.pagination.pageSize,
          statisDateStart: this.statisticsTime[0] ? moment(this.statisticsTime[0]).format('YYYY-MM-DD') : null,
          statisDateEnd: this.statisticsTime[1] ? moment(this.statisticsTime[1]).format('YYYY-MM-DD') : null,
          releaseStart: this.releasecycleTime[0] ? moment(this.releasecycleTime[0]).format('YYYY-MM-DD') : null,
          releaseEnd: this.releasecycleTime[1] ? moment(this.releasecycleTime[1]).format('YYYY-MM-DD') : null,
          sysOrgId: this.sysOrgId ? this.sysOrgId : null,
          userId: this.userId ? this.userId.toString() : null,
          status: this.status ? this.status : null,
        }
        let res = await exportRecruitProduction(this.tabPosition, data)
        let exportFileName = '招聘人员产能_统计表'
        switch(this.tabPosition) {
          case '0': exportFileName = '招聘人员产能_总_满足率_统计表'; break;
          case '1': exportFileName = '招聘人员产能_总_招聘进展_统计表'; break;
          case '2': exportFileName = '招聘人员产能_总_入职类型_统计表'; break;
          case '3': exportFileName = '招聘人员产能_总_招聘业绩_统计表'; break;
          default: return;
        }
        download(res.data, exportFileName)
        this.iconLoading = false
      } catch (err) {
        this.iconLoading = false
      }
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
    // 获取所属部门
    async getStructureListInit() {
      try {
        const res = await getPrimaryDepartment()
        this.orgList = res.data.data
      }
      catch(error) {}
    },
    // 获取招聘专员
    async getSysUsersInit() {
      try {
        const res = await getSysUsers();
        this.recruitmentList = res.data.data.sysOneUser;
      } catch (error) {}
    },
    dateInit(){
      let data = new Date().getFullYear() - 10;
      this.listYearOption = [];
      for (let i = 20; i > -1; i--) {
          let num = data + i;
          this.listYearOption.push(num);
      }
    },
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getTableData(this.tabPosition);
    },
    onChangeData(date, dateString) {
      console.log(date, dateString);
      this.year = date
    },
    filter(inputValue, path) {
      return path.some(option => option.orgName.indexOf(inputValue) > -1);
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