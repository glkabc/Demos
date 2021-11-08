<!--
 * @Description: file content
 * @Author: fqliu3
 * @Date: 2021-03-16 16:35:47
 * @LastEditors: fqliu3
 * @LastEditTime: 2021-03-17 10:34:25
-->
<template>
  <div class="proceed">
    <Search
      @submit="handleSubmit"
      ref="search"
      @reset="handleReset"
      @export="handleExport"
      :iconLoading="isLoading"
      @dateChange='dateChange'
      @handleNeedDateClick='handleNeedDateClick'
      @handleChangeGroupId='handleChangeGroupId'
      @handleChangeOrganizeId='handleChangeOrganizeId'
      @handleChangeState='handleChangeState'
      @handleChangeSpecialistId='handleChangeSpecialistId'
    />
    <a-divider />
    <Table 
      ref="table" 
      :dateS='dateS'
      :statisticsNeedTime='statisticsNeedTime'
      :groupId='groupId'
      :specialistId='specialistId'
      :state='state'
      :organizeId='organizeId'
    />
  </div>
</template>

<script>
import Search from './proceedStatistical/Search';
import Table from './proceedStatistical/Table';
import download from './index';
import moment from 'moment'
import { exportRecruitProceed } from '@api/statistical/index';
export default {
  components: {
    Search,
    Table,
  },
  data() {
    return {
      isLoading: false,
      dateS: [],
      statisticsNeedTime: [
        moment(this.getCurrNeedkDays()[0], 'YYYY/MM/DD'),
        moment(this.getCurrNeedkDays()[1], 'YYYY/MM/DD'),
      ],
      groupId: null,
      specialistId: null,
      state: 0,
      organizeId: null,
    };
  },
  mounted() {
    const date = this.formInit()
    this.dateS = this.$refs.search.statisticsTime
    this.$refs.table.getRecruitProceedInit(date.startTime, date.endTime);
  },
  methods: {
    // 需求发布周期
    handleNeedDateClick(value) {
      this.statisticsNeedTime = value
    },
    getCurrNeedkDays() {
      let date = [];
      let start = moment().format('YYYY-MM');
      let end = moment().format('YYYY-MM-DD');
      date.push(start);
      date.push(end);
      return date;
    },
    // 事业部
    handleChangeGroupId(value){
      this.groupId = value
    },
    // 一级部门
    handleChangeOrganizeId(value) {
      this.organizeId = value
    },
    // 状态
    handleChangeState(value) {
      this.state = value
    },
    // 负责人
    handleChangeSpecialistId(value) {
      this.specialistId = value
    },
    dateChange(e){
      this.dateS = e
    },
    handleSubmit() {
      const date = this.formInit()
      this.$refs.table.getRecruitProceedInit(date.startTime, date.endTime);
    },
    handleReset() {
      // const startTime = moment().startOf('mounth').format('YYYY-MM')
      // const endTime = moment().endOf('dd')
      // this.$refs.search.statisticsTime = [moment(startTime+'-01'), endTime];
      this.statisticsNeedTime = [
        moment(moment().format('YYYY-MM'), 'YYYY/MM/DD'),
        moment(moment().format('YYYY-MM-DD'), 'YYYY/MM/DD'),
      ],
      this.groupId = undefined
      this.organizeId = null
      this.specialistId = undefined
      this.state = 0
      let weekOfday = parseInt(moment().format('d'));
      let start = moment().subtract(weekOfday - 1, 'days').format('YYYY-MM-DD');
      let end = moment().add(7 - weekOfday, 'days').format('YYYY-MM-DD');
      this.$refs.search.statisticsTime = [moment(start), moment(end)];
    },
    formInit() {
      const dateRef = this.$refs.search.statisticsTime
      const startTime = dateRef[0].format('YYYY-MM-DD');
      const endTime = dateRef[1].format('YYYY-MM-DD');
      return {
        startTime, endTime
      }
    },
    async handleExport() {
      try {
        this.isLoading = true;
        const date = this.formInit()
        const res = await exportRecruitProceed({
          statisDateStart: date.startTime,
          statisDateEnd: date.endTime,
          groupId: this.groupId,
          specialistId: this.specialistId,
          state: this.state,
          organizeId: (this.organizeId === null || this.organizeId.length === 0) ? null : this.organizeId[this.organizeId.length - 1],
          demandReleaseStart: moment(this.statisticsNeedTime[0]).format('YYYY-MM-DD'),
          demandReleaseEnd: moment(this.statisticsNeedTime[1]).format('YYYY-MM-DD'),
        });
        download(res.data, '招聘进展统计表');
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.proceed {
  background: #fff;
  padding: 22px;
  height: 100%;
}
</style>
