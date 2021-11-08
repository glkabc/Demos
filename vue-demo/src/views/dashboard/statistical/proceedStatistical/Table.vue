<!--
 * @Description: file content
 * @Author: fqliu3
 * @Date: 2021-03-16 16:39:29
 * @LastEditors: fqliu3
 * @LastEditTime: 2021-03-17 16:16:38
-->
<template>
  <div class="proceed-main">
    <a-table
      bordered
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      class="zebra"
      :scroll="{ x: 3500, y: screenHeight - 360 }"
      rowKey="demandId"
      @change="onShowSizeChange"
    >
    </a-table>
  </div>
</template>

<script>
import { getRecruitProceed } from '@api/statistical/index'
import moment from 'moment'
const columns = [
  {
    title: '需求发布日期',
    key: 'releaseTime',
    dataIndex: 'releaseTime',
  },
  {
    title: '需求暂停日期',
    dataIndex: 'stopTime',
    key: 'stopTime',
  },
  {
    title: '需求下线日期',
    dataIndex: 'offLineTime',
    key: 'offLineTime',
  },
  {
    title: '事业部',
    dataIndex: 'groupIdName',
    key: 'groupIdName',
    ellipsis: true,
  },
  {
    title: '一级部门',
    dataIndex: 'sysOrgName',
    key: 'sysOrgName',
    ellipsis: true,
  },
  {
    title: '二级部门',
    dataIndex: 'sysOrgTname',
    key: 'sysOrgTname',
    ellipsis: true,
  },
  {
    title: '职位编号',
    dataIndex: 'no',
    key: 'no',
    width: 120,
    ellipsis: true,
  },
  {
    title: '职位',
    dataIndex: 'positionName',
    key: 'positionName',
    width: 160,
    ellipsis: true,
  },
  {
    title: '简历筛选人',
    dataIndex: 'resumeFilterName',
    key: 'resumeFilterName',
    width: 140,
    ellipsis: true,
  },
  {
    title: '工作地点',
    dataIndex: 'workPlace',
    key: 'workPlace',
    ellipsis: true,
  },
  {
    title: '招聘负责人',
    dataIndex: 'recruitmentSpecialist',
    key: 'recruitmentSpecialist',
    ellipsis: true,
  },
  {
    title: '初始需求数',
    dataIndex: 'demandNum',
    key: 'demandNum'
  },
  {
    title: '待招需求数',
    dataIndex: 'waitZpNum',
    key: 'waitZpNum',
  },
  {
    title: '推荐数',
    dataIndex: 'recommendNum',
    key: 'recommendNum',
  },
  {
    title: '已筛选数',
    dataIndex: 'screenNum',
    key: 'screenNum',
  },
  {
    title: '通过筛选数',
    dataIndex: 'screenPassNum',
    key: 'screenPassNum',
  },
  {
    title: '筛选淘汰数',
    dataIndex: 'screenOutNum',
    key: 'screenOutNum',
  },
  {
    title: '待筛选数',
    dataIndex: 'waitScreenNum',
    key: 'waitScreenNum',
  },
  {
    title: '初试数',
    dataIndex: 'firstInterviewNum',
    key: 'firstInterviewNum',
  },
  {
    title: '初试通过数',
    dataIndex: 'firstPassInterviewNum',
    key: 'firstPassInterviewNum',
  },
  {
    title: '复试数',
    dataIndex: 'secondInterviewNum',
    key: 'secondInterviewNum',
  },
  {
    title: '复试通过数',
    dataIndex: 'secondPassInterviewNum',
    key: 'secondPassInterviewNum',
  },
  {
    title: '面试通过数',
    dataIndex: 'interviewPassNum',
    key: 'interviewPassNum',
  },
  {
    title: 'offer数',
    dataIndex: 'offerNum',
    key: 'offerNum',
  },
  {
    title: '放弃offer数',
    dataIndex: 'offerOutNum',
    key: 'offerOutNum',
  },
  {
    title: '入职数',
    dataIndex: 'entryNum',
    key: 'entryNum',
  },
  {
    title: '筛选通过率',
    dataIndex: 'screenPercent',
    key: 'screenPercent',
  },
  {
    title: '初试通过率',
    dataIndex: 'firstPassPercent',
    key: 'firstPassPercent',
  },
  {
    title: '复试通过率',
    dataIndex: 'secondInterviewPercent',
    key: 'secondInterviewPercent',
  },
  {
    title: 'offer放弃率',
    dataIndex: 'offerOutPercent',
    key: 'offerOutPercent',
  },
];
export default {
  props: [
    'dateS', 
    'groupId', 
    'specialistId', 
    'state', 
    'organizeId', 
    'statisticsNeedTime'
  ],
  data() {
    return {
      columns,
      data: [],
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
    }
  },
  mounted() {
    window.onresize = function () { // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight// 窗口高度
    }
  },
  methods: {
    // 分页
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getRecruitProceedInit(this.dateS[0].format('YYYY-MM-DD'), this.dateS[1].format('YYYY-MM-DD'));
      // this.getRecruitProceedInit();
    },
    async getRecruitProceedInit(startTime, endTime) {
      console.log(this.organizeId, 'sss')
      try {
        this.loading = true;
        const res = await getRecruitProceed({
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          statisDateStart: startTime,
          statisDateEnd: endTime,
          groupId: this.groupId,
          specialistId: this.specialistId,
          state: this.state,
          organizeId: (this.organizeId === null || this.organizeId.length === 0) ? null : this.organizeId[this.organizeId.length - 1],
          demandReleaseStart: moment(this.statisticsNeedTime[0]).format('YYYY-MM-DD'),
          demandReleaseEnd: moment(this.statisticsNeedTime[1]).format('YYYY-MM-DD'),
        })
        console.log(res, 'ss')
        if (res.data.code === 0) {
          if (res.data.data.length === 0) {
            this.data = []
            this.pagination.total = 0
          } else {
            const resultData = res.data.data
            this.data = resultData.demandList.list
            // console.log(this.data, '数组')
            this.pagination.total = resultData.meta.size
          }
        }
        this.loading = false
      } catch (error) {
        console.log(error, '出错')
        this.loading = false
      }
    }
  }
};
</script>

<style scoped>
.proceed-main {
}
</style>
