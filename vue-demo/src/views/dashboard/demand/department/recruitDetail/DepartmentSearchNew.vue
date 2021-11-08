<template>
  <div class="content-header">
    <a-row class="firstName"> 
      <a-col :span="6" >
        <div class="firstName-head">
        <span class="label-span">萝卜秀编号</span>
        <a-input
          class="item-col"
          v-model.trim="keywordValue"
          @change="handleChange"
          placeholder="请输入萝卜秀编号"
          allowClear
        />
        </div>
        </a-col>
        <a-col :span="6">
        <div class="firstName-head">
        <span class="label-span">职位名称</span>
        <a-input
          class="item-col"
          v-model.trim="positionName"
          @change="handlePositionNameChange"
          placeholder="请输入职位名称"
          allowClear
          style="width:73%"
        />
        </div>
        </a-col>
        <a-col :span="6">
        <div class="firstName-head">
        <span class="label-span">部门</span>
        <a-tree-select
          v-model="organizeIds"
          allowClear
          placeholder="请选择部门"
          treeDefaultExpandAll
          :treeData="treeData"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          @change="handleTradeSearchClick"
          class="item-col"
          style="width:74%"
          :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
        >
        </a-tree-select>
        </div>
        </a-col>
        <a-col :span="6">
        <div class="firstName-head">
        <span class="label-span">负责人</span>
        <a-select
          v-model="specialistId"
          placeholder="请选择负责人"
          @search="handleContactSearch"
          :filter-option="filterOption"
          @change="handleRoleClick"
          @blur="handleContanctBlur"
          @focus="handleContentFocus"
          class="item-col"
          style="width:76%"
          showSearch
          allowClear
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
        >
          <a-select-option
            :value="item.userId"
            v-for="item in optionUserList"
            :key="item.userId"
            >{{ item.userName }}</a-select-option
          >
        </a-select>
        </div>
        </a-col>
        
      </a-row>
    <a-row class="firstName"> 
       <a-col :span="24">
        <div class="firstName-head" style="display:inline-block;width:25%">
      <span class="label-span"><span style="opacity:0">新</span>紧急程度</span>
      <a-select
        placeholder="请选择紧急程度"
        @change="handleStatusChange"
        v-model="statusValue"
        class="item-col"
        style="width:69%"
        allowClear
        :getPopupContainer="(triggerNode) => triggerNode.parentNode"
      >
        <a-select-option
          :value="item.value"
          v-for="item in emergencyLevels"
          :key="item.value"
          >{{ item.label }}</a-select-option
        >
      </a-select>
        </div>
        <div class="firstName-head" style="display:inline-block;width:25%">
        <span class="label-span">职位类别</span>
      <a-cascader
        :options="jobList"
        v-model="jobValue"
        @change="handleJobChange"
        placeholder="请选择职位类别"
        :allowClear="true"
        class="item-col"
        style="width:73%"
        :getPopupContainer="(triggerNode) => triggerNode.parentNode"
      />
        </div>
        <div class="firstName-head"  style="display:inline-block;width:25%">
        <span class="label-span">状态</span>
      <a-select
        @change="handleSelectStatusChange"
        v-model="statusSelect"
        allowClear
        class="item-col"
        style="width:74%"
        placeholder="请选择状态"
      >
        <a-select-option
          v-for="item in recruitQueryTypes"
          :key="item.value"
          :value="item.value"
          >{{ item.label }}</a-select-option
        >
      </a-select>
        </div>
        <div class="firstName-head"  v-show="show" style="display:inline-block;width:25%">
        <span class="label-span">事业部</span>
        <a-select
          v-model="groupValue"
          placeholder="请选择事业部"
          @change="handleGroupChange"
          class="item-col"
          style="width:76%"
          showSearch
          allowClear
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
        >
          <a-select-option
            :value="item.sysOrgId"
            v-for="item in groupList"
            :key="item.sysOrgId"
            >{{ item.orgName }}</a-select-option
          >
        </a-select>
        </div>
       
         
        <div class="firstName-head" v-show="show" style="display:inline-block;width:25%">
      <span class="label-span"><span style="opacity:0">新</span>工作城市</span>
      <a-cascader
        v-model="cityValue"
        :options="CityInfo"
        @change="handleCityChange"
        placeholder="请选择工作城市"
        :allowClear="true"
        changeOnSelect
        class="item-col"
        style="width:69%"
        :getPopupContainer="(triggerNode) => triggerNode.parentNode"
      />
        </div>
      <!-- <a-input
        placeholder="请输入工作地"
        @change="handleCityChange"
        class="item-col"
        v-model.trim="cityValue"
        allowClear
      /> -->
      <div class="firstName-head" v-show="show" style="display:inline-block;width:25%">
      <span class="label-span">时间范围</span>
      <a-range-picker v-model="employ" @change="handleRangeChange" class="item-col" format="YYYY-MM-DD" allowClear style="width:73%"/>
      </div>
      
      <a-button
        style="background: #FEAA19;border: #FEAA19;margin-right:10px;margin-left:10px;"
        type="primary"
        @click="handleInquire"
        >查询</a-button
      >
      <a-button
        @click="handleReset"
        style="background: #22B8CF;border: #22B8CF;"
        type="primary"
        >重置</a-button
      >
      </a-col>
      <a-col :span="24">
        <div
          :style="{
            textAlign: 'center',
            marginTop: '15px',
          }"
          @click="show = !show"
        >
          <p class="line">
            <span :class="show ? 'upClass' : 'downClass'"></span>
          </p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { getUserInfoList } from "@api/manage/index";
import { getStructureList } from "@api/demandBranch/index";
import { getTreeList, getPrimaryDepartment } from "@api/branchHC/index";
import { createNamespacedHelpers } from "vuex";
import CityInfo from "@configs/city_data.js";
import moment from 'moment';
const { mapState } = createNamespacedHelpers("status");
export default {
  data() {
    return {
      CityInfo,
      jobAddress:undefined,
      keywordValue: "",
      positionName:"",
      cityValue: [],
      statusSelect: 1, // 选择状态
      specialistId: undefined,
      organizeIds: undefined,
      statusValue: undefined,
      jobValue: [],
      groupValue: undefined,
      optionUserList: [],
      treeData: [],
      groupList: [],
      jobList: [],
      employ:[],
      show: false,
    };
  },
  computed: {
    ...mapState({
      recruitQueryTypes: (state) => state.recruitQueryTypes,
      emergencyLevels: (state) => state.emergencyLevels,
    }),
  },
  created() {
    this.getUserInfoListInit();
    this.getStructureListInit();
    this.getPrimaryDepartmentInit();
    this.getTreeListInit();
  },
  methods: {
    moment,
    // 工作城市
    handleCityChange(e) {
      this.cityValue = e;
      this.$emit("update:cityValue", this.cityValue.join(","));
    },
    // 面试日期
    handleRangeChange(e,dataString) {
      this.$emit("update:startTime", dataString[0]);
      this.$emit("update:endTime", dataString[1]);
    } ,
    handlePositionNameChange(e) {
      this.$emit("update:positionName", e.target.value);
    },
    handleChange(e) {
      this.$emit("update:keywordValue", e.target.value);
    },
    handleContactSearch() {},
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleRoleClick(e) {
      this.$emit("update:specialistId", e);
    },
    handleContanctBlur() {
      this.optionUserList = this.userList.slice(0, 100);
    },
    handleContentFocus() {
      this.optionUserList = this.userList.slice(0, 100);
    },
    // 获取系统用户列表
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList();
        this.userList = res.data.data.userList.list;
        this.optionUserList = [...this.userList];
      } catch (error) {}
    },
    // 获取需求部门
    getStructureListInit() {
      getStructureList().then((res) => {
        if (res.data.code == 0) {
          let newTmp = this.tmpListInit(res.data.data.orgList);
          this.treeData = newTmp;
        } else {
          this.treeData = [];
        }
      });
    },
    tmpListInit(val) {
      let arr = [];
      if (val.length !== 0) {
        val.forEach((item) => {
          let obj = {};
          obj.key = item.orgId;
          obj.value = item.orgId;
          obj.title = item.orgName;
          if (item.children.length >= 1) {
            obj.children = this.tmpListInit(item.children);
          }
          arr.push(obj);
        });
      }
      return arr;
    },
    handleTradeSearchClick(e) {
      this.$emit("update:organizeIds", e);
    },
    async getPrimaryDepartmentInit() {
      try {
        const res = await getPrimaryDepartment();
        this.groupList = res.data.data;
      } catch (error) {}
    },
    handleGroupChange(e) {
      this.$emit("update:groupValue", e);
    },
    async getTreeListInit() {
      const res = await getTreeList();
      this.jobList = res.data.data;
    },
    handleJobChange(e) {
      let temList = e.pop();
      this.$emit("update:jobValue", temList);
    },
    handleStatusChange(e) {
      this.$emit("update:statusValue", e);
    },
    handleSelectStatusChange(e) {
      this.$emit("update:statusSelect", e);
      this.$emit("inquire");
    },
    handleReset() {
      this.keywordValue = "";
        this.cityValue = "";
        this.statusSelect = 1; // 选择状态
        this.specialistId = undefined;
      this.organizeIds = undefined;
      this.statusValue = undefined;
      this.jobValue = [];
      this.groupValue = undefined;
      this.employ = [];
      this.positionName = ''
      this.$emit("update:statusValue", undefined);
      this.$emit("update:keywordValue", "");
      this.$emit("update:cityValue", undefined);
      this.$emit("update:positionName", "");
      this.$emit("update:organizeIds", undefined);
      this.$emit("update:statusSelect", 1);
      this.$emit("update:specialistId", undefined);
      this.$emit("update:jobValue", undefined);
      this.$emit("update:startTime", undefined);
      this.$emit("update:endTime", undefined);
      this.$emit("update:groupValue", undefined);
      this.$emit("inquire");
    },
    handleInquire() {
      this.$emit("inquire");
    },
  },
};
</script>
<style scoped>
.content-header {
  /* border-bottom: 1px solid #e8e8e8; */
  /* padding-bottom: 20px; */
}
.item-col {
  width: 69%;
  /* margin-right: 10px; */
  margin-bottom: 10px;
}
.firstName {
  display: flex;
  flex-wrap: wrap;
}
.firstName-head {
  /* padding-bottom: 10px; */
}
.label-span{
  margin: 0 10px 0 10px;
  color: #000;
}
.line {
  width: 100%;
  height: 9px;
  margin: 0 auto;
  background: url("../../../../../assets/images/line.png") no-repeat;
  background-size: 100% 100%;
}
.upClass {
  background: url("../../../../../assets/images/top.png") no-repeat;
  width: 13px;
  height: 5px;
  margin: 0 auto;
  display: block;
}
.downClass {
  background: url("../../../../../assets/images/bottom.png") no-repeat;
  width: 13px;
  height: 5px;
  margin: 0 auto;
  display: block;
}
</style>
