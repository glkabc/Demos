<!--
 * @Description: file content
 * @Author: fqliu3
 * @Date: 2021-03-16 16:37:34
 * @LastEditors: fqliu3
 * @LastEditTime: 2021-03-17 10:26:01
-->
<template>
  <div>
    <div class="position-head">
      <a-row :gutter='[10, 20]'>
        <a-col :span="6">
          <span style="margin:0 10px 0 20px;color:#000;">发布周期</span>
          <a-range-picker
            format="YYYY-MM-DD"
            style="width: 70%"
            :value="statisticsNeedTime"
            :allowClear="false"
            @change="(value) => {this.statisticsNeedTime = value; this.$emit('handleNeedDateClick', value)}"
          />
        </a-col>
        <a-col :span="6">
          <span style="margin:0 10px 0 20px;color:#000;">统计周期</span>
          <a-range-picker
            style="width: 70%"
            format="YYYY-MM-DD"
            :value="statisticsTime"
            :allowClear="false"
            @change="handleDateClick"
          />
        </a-col>
        <a-col :span="6">
          <span style="margin:0 10px 0 20px;color:#000;">一级部门</span>
          <a-cascader
            allowClear
            :show-search="{ filter }"
            :value="organizeId"
            style="width: 70%"
            :options="companyAllList"
            @change="(value) => {this.organizeId = value; this.$emit('handleChangeOrganizeId', value)}"
            :fieldNames="{ label: 'orgName', value: 'orgId', children: 'orgList' }"
            placeholder="请选择标准岗位名称"
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }
            "
            />
        </a-col>
        <a-col :span="6">
          <span style="margin:0 10px 0 25px;color:#000;">事业部</span>
          <a-select 
            :value="groupId" 
            style="width: 70%"
            allowClear
            :showSearch='true'
            :filter-option="filterOption"
            placeholder='请选择事业部'
            @change="(value) => {this.groupId = value ;this.$emit('handleChangeGroupId', value)} "
          >
            <a-select-option :value="item.sysOrgId" v-for="item in groupList" :key="item.sysOrgId">{{ item.orgName }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <span style="margin:0 10px 0 20px;color:#000;">&nbsp;职位状态</span>
          <a-select 
            :value="state" 
            style="width: 70%" 
            @change="(value) => {this.state = value; this.$emit('handleChangeState', value)} "
          >
            <a-select-option v-for="item in stateList" :value="item.key" :key="item.key">{{item.display_name}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6">
          <span style="margin:0 10px 0 5px;color:#000;">招聘负责人</span>
          <a-select 
            :value="specialistId" 
            style="width: 70%" 
            :placeholder="'请选择负责人'"
            allowClear
            :showSearch='true'
            :filter-option="filterOption"
            @change="(value) =>{this.specialistId = value ;this.$emit('handleChangeSpecialistId', value)} "
          >
            <a-select-option v-for="item in optionUserList" :value="item.userId" :key="item.userId">{{item.userName}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span='6'>
          <a-button
            :style="{
              marginLeft: '10px',
              backgroundColor: '#feaa19',
              border: '#feaa19',
            }"
            @click="() => this.$emit('submit')"
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
            @click="resetData"
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
            @click="() => this.$emit('export')"
            type="primary"
            :loading="iconLoading"
          >
            导出
          </a-button>
        </a-col>
    </a-row>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { getUserInfoList } from "@api/manage/index";
import { getPrimaryDepartment } from "@api/branchHC/index";
import { getAllInfo} from "@api/statistical/index";
export default {
  props: {
    iconLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const startTime = this.getCurrWeekDays()[0]
    const endTime = this.getCurrWeekDays()[1]
    return {
      statisticsTime: [
        moment(this.getCurrNeedDays()[0], 'YYYY/MM/DD'),
        moment(this.getCurrNeedDays()[1], 'YYYY/MM/DD'),
      ],
      statisticsNeedTime: [
        moment(startTime, 'YYYY/MM/DD'),
        moment(endTime, 'YYYY/MM/DD'),
      ],
      groupId: undefined,
      groupList: [],
      organizeId: null,
      companyAllList: [],
      specialistId: undefined,
      optionUserList: [],
      state: 0,
      stateList: [
        { key: 0, display_name: "全部" },
        { key: 1, display_name: "在招" },
        { key: 2, display_name: "下线" },
        { key: 3, display_name: "暂停" },
        { key: 4, display_name: "待发布" },
      ]
    };
  },
  created() {
    this.getUserInfoListInit();
    this.getPrimaryDepartmentInit();
    this.getAllInfoInit();
  },
  methods: {
    filter(inputValue, path) {
      return path.some(option => option.orgName.indexOf(inputValue) > -1);
    },
    filterOption(input, option) {
      // console.log(input , option, '阐述')
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    handleDateClick(e) {
      this.statisticsTime = e;
      this.$emit('dateChange', e)
    },
    getCurrWeekDays() {
      let date = [];
      let start = moment().format('YYYY-MM');
      let end = moment().format('YYYY-MM-DD');
      date.push(start);
      date.push(end);
      return date;
    },
    resetData() {
      this.statisticsNeedTime = [
        moment(this.getCurrWeekDays()[0], 'YYYY/MM/DD'),
        moment(this.getCurrWeekDays()[1], 'YYYY/MM/DD'),
      ]
      this.groupId = undefined
      this.organizeId = null
      this.specialistId = undefined
      this.state = 0
      this.$emit('reset')
    },
    getCurrNeedDays() {
      let date = [];
      let weekOfday = parseInt(moment().format('d'));
      let start = moment()
        .subtract(weekOfday - 1, 'days')
        .format('YYYY-MM-DD');
      let end = moment()
        .add(7 - weekOfday, 'days')
        .format('YYYY-MM-DD');
      date.push(start);
      date.push(end);
      return date;
    },
    // 获取负责人
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList();
        let user_list = res.data.data.userList.list;
        this.optionUserList = [...user_list];
      } catch (error) {
        console.log(error)
      }
    },
    // 获取事业部
    async getPrimaryDepartmentInit() {
      try {
        const res = await getPrimaryDepartment()
        this.groupList = res.data.data
      }
      catch(error) {
        console.log(error)
      }
    },
    // 获取部门
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
  },
};
</script>

<style lang="scss" scoped></style>
