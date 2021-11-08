<template>
  <div class="position">
    <div class="position-head">
      <span style="margin-right: 10px;color:#000;"
        >姓名</span
      >
      <a-select
        showSearch
        allowClear
        :value="deparmentId"
        placeholder="请选择姓名"
        @change="handleChange"
        style="width: 250px"
        :getPopupContainer="
          (triggerNode) => {
            return triggerNode.parentNode || document.body;
          }
        "
        optionFilterProp="children"
      >
        <a-select-option
          :value="item.mail"
          v-for="item in recruitmentList"
          :key="item.sysUserId"
          >
          {{ item.userName }}
          <span style="color:#71a1f3;padding-left:5px;">[{{item.mail}}]</span>
          </a-select-option
        >
      </a-select>
      <span style="margin:0 10px 0 20px;color:#000;"
        >日期</span
      >
      <a-range-picker format="YYYY-MM-DD" :value="entry" @change="handleDateClick" />
      <a-button
        :style="{
          
          marginLeft: '10px',
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
          marginTop:'8px',
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
          backgroundColor: '#22b8cf',
          border: '#22b8cf',
        }"
        @click="resetExportClick"
        type="primary"
        :loading="iconLoading"
      >
        导出
      </a-button>
      
      
    </div>
    <a-divider />
    <div class="position-main">
      <a-table
         bordered
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        class="zebra"
        rowKey="sysUserId"
        @change="onShowSizeChange"
        :scroll="{ y: screenHeight - 360 }"
      >
      </a-table>
    </div>
  </div>
</template>

<script>
import {
  exportRecruitStatistics,
  getRecruitStatistics,
  getSysUsers,
} from "@api/statistical/index";
import download from "./index"
import moment from 'moment';
const columns = [
  {
    title: "姓名",
    dataIndex: "userNmae",
    key: "userNmae",
  },
  {
    title: "总简历数",
    dataIndex: "resumesNums",
    key: "resumesNums",
  },
  {
    title: "今日新增数",
    dataIndex: "todayResumes",
    key: "todayResumes",
  },
  {
    title: "6个月新增数",
    dataIndex: "sixMonthResumes",
    key: "sixMonthResumes",
  },
   {
    title: "推荐简历数",
    dataIndex: "recommendResumeNum",
    key: "recommendResumeNum",
  },
  {
    title: "通过简历数",
    dataIndex: "filterPassNum",
    key: "filterPassNum",
    // width: 180
  },
   {
    title: "初试",
    dataIndex: "firstInterview",
    key: "firstInterview",
    // width: 180
  },
   {
    title: "初试通过",
    dataIndex: "firstInterviewPass",
    key: "firstInterviewPass",
    // width: 180
  },
  {
    title: "复试",
    dataIndex: "secondInterview",
    key: "secondInterview",
  },
    {
    title: "复试通过",
    dataIndex: "secondInterviewPass",
    key: "secondInterviewPass",
  },
  {
    title: "面试通过数",
    dataIndex: "interviewPassNum",
    key: "interviewPassNum",
  },
  {
    title: "offer人数",
    dataIndex: "offerNum",
    key: "offerNum",
  },
  {
    title: "放弃offer人数",
    dataIndex: "giveUpNum",
    key: "giveUpNum",
    width:130,
  },
  {
    title: "入职人数",
    dataIndex: "entryNum",
    key: "entryNum",
  },
];
export default {
  data() {
    return {
      columns,
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
      startTime: "",
      endTime: "",
      entry:[
        moment(this.getCurrWeekDays(), 'YYYY/MM/DD'),
        moment(new Date(), 'YYYY/MM/DD'),
      ],
      mail:'',
      deparmentId: undefined,
      recruitmentList: [], // 招聘列表
      screenHeight: document.documentElement.clientHeight,
      iconLoading:false,
    };
  },
  mounted() {
    this.getRecruitStatisticsInit();
    this.getSysUsersInit();
    window.onresize = function () { // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight// 窗口高度
    }
  },
  methods: {
    getCurrWeekDays() {
      let year = moment(new Date()).format('YYYY');
      let start = moment(new Date(`${year}-1-1`), 'yyyy-MM-dd')
      return start;
    },
    // 获取招聘专员
    async getSysUsersInit() {
      try {
        const res = await getSysUsers();
        this.recruitmentList = res.data.data.sysOneUser;
      } catch (error) {}
    },
    // 获取列表
    async getRecruitStatisticsInit() {
     
      // this.recruitmentList.map(item=>{
      //   if(this.deparmentId !=undefined) {
      //     if(item.sysUserId == this.deparmentId){
      //     this.mail = item.mail;
      //   }else{
      //      this.mail='';
      //   }
      //   }
        
      // })
       console.log(this.deparmentId,this.mail,'search')
      try {
        this.loading = true;
        const res = await getRecruitStatistics({
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          startTime: this.startTime,
          endTime: this.endTime,
          // specialistId: this.deparmentId,
          mail:this.deparmentId,
        });
        this.loading = false;
        if(res.data.code !== 0 || res.data.data.length == []) {
          this.data = []
        }else {
          console.log(res.data.data)
          this.data = res.data.data.recruitmentStatisticsList;
          this.pagination.total = res.data.data.meta.size;
        }
      } catch (error) {}
    },
    // 分页
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getRecruitStatisticsInit();
    },
    // 姓名筛选
    handleChange(e,value) {
      console.log(e,'e');
      this.deparmentId = e;
      // console.log(this.deparmentId,'this.deparmentId')
    },
    // 日期筛选
    handleDateClick(e, value) {
      console.log(e, '日期选择')
      this.entry = e;
      this.startTime = value[0];
      this.endTime = value[1];
    },
    // 搜索
    handleSearchSubmit() {
      this.getRecruitStatisticsInit();
    },
    //重置
    handleResetSubmit(){
        this.deparmentId  = undefined;
        this.entry = null;
        this.startTime = '';
        this.endTime = '';
        this.mail = '';
        this.getRecruitStatisticsInit();
    },
    // 导出
    async resetExportClick() {
      try {
         this.iconLoading = true;
        const res = await exportRecruitStatistics({
          createStartTime: this.startTime,
          createEndTime: this.endTime,
        });
        this.iconLoading = false;
        download(res.data,'招聘人员产能');
      } catch (error) {
         this.iconLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.position {
  background: #fff;
  padding: 22px;
  height: 100%;
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
  margin-top: 20px;
}
</style>
