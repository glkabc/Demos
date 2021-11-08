<template>
<div>
  <a-row class="firstName">
    <a-col :span="24" >
      <div class="firstName-head" style="display:inline-block;width:24%">
        <span class="position-name position-left" >姓名</span>
        <a-input
          :value="userName"
          @change="handleNameChange"
          placeholder="请输入姓名"
          allowClear
          style="width:80%"
        />
      </div>
      <div class="firstName-head" style="display:inline-block;width:24%">
        <span class="position-mail">邮箱</span>
        <a-input
          :value="userEmail"
          @change="handleEmailChange"
          placeholder="请输入邮箱"
          allowClear
          style="width:80%"
        />
      </div>
      <div class="firstName-head" style="display:inline-block;width:24%">
        <span class="position-name">职位</span>
        <a-select
        :value="postValue"
          showSearch
          allowClear
          placeholder="请选择职位"
          @change="handlePostChange"
          style="width: 80%"
          :getPopupContainer="
            (triggerNode) => {
              return triggerNode.parentNode || document.body
            }
          "
          optionFilterProp="children"
        >
          <a-select-option
            :value="item"
            v-for="item in postNameList"
            :key="item"
            >{{ item }}</a-select-option
          >
        </a-select>
      </div>
      <div class="firstName-head" style="display:inline-block;width:24%">
        <span class="position-name">入职时间</span>
        <a-range-picker
        :value="entry"
          format="YYYY-MM-DD"
          style="width: 72%"
          @change="handleWorkClick"
        />
      </div>
        
       <!-- </a-col>
  </a-row> -->
   <!-- <a-row>
    <a-col :span="24" class="firstName"> -->
      <div class="firstName-head" style="display:inline-block;width:24%">
        <span class="position-name position-left">状态</span>
        <a-select
          :value="userStatus"
          showSearch
          allowClear
          placeholder="请选择状态"
          @change="handleStatusChange"
          style="width: 80%"
          :getPopupContainer="
            (triggerNode) => {
              return triggerNode.parentNode || document.body
            }
          "
          optionFilterProp="children"
        >
          <a-select-option
            :value="item.value"
            v-for="item in staticalStatus"
            :key="item.value"
            >{{ item.label }}</a-select-option
          >
        </a-select>
      </div>
       <div class="firstName-head" style="display:inline-block;width:24%">
        <span class="position-mail">部门</span>
        <a-select
           :value='departementValue'
          showSearch
          allowClear
          placeholder="请选择部门"
          @change="handleDepartChange"
          style="width: 80%"
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
      </div>
      <div class="firstName-head" style="display:inline-block;width:24%">
        <span class="position-name">地区</span>
        <a-input
          :value="userCity"
          placeholder="请输入地区"
          allowClear
          style="width:80%"
          @change="handleCityChange"
        />
      </div>
      <div class="firstName-head" v-show="show" style="display:inline-block;width:24%">
        <span class="position-name">推荐时间</span>
        <a-range-picker
        :value="reference"
          format="YYYY-MM-DD"
          style="width: 72%"
          @change="handleDateClick"
        />
      </div>
      <!-- </a-col>
  </a-row>
  <a-row>
    <a-col :span="24" class="firstName"> -->
      <div class="firstName-head" v-show="show" style="display:inline-block;width:24%">
        <span class="position-phone">手机号</span>
        <a-input
          :value="userPhone"
          @change="handlePhoneChange"
          placeholder="请输入手机号"
          allowClear
          style="width: 80%"
        />
      </div>
     <div class="firstName-head" v-show="show" style="display:inline-block;width:24%">
        <span class="position-phone">负责人</span>
        <a-select
          showSearch
          allowClear
          placeholder="请选择岗位负责人"
          :value="specialistId"
          @change="handleSpeciaChange"
          style="width: 80%"
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
      </div>
       <a-button
        :style="{
          marginTop:'8px',
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
          marginTop:'8px',
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
     
    <!-- </a-col> -->
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
      </a-col>
  </a-row>
  </div>
</template>

<script>
import { getStructureList } from "@api/demandBranch/index"
import { getPositionName,getRecruitmentSpecialist } from "@api/statistical/index"
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
export default {
  props:['iconLoadingEnd'],
  data(){
    return {
      postNameList: [],
      orgList: [],
      recruitmentList: [],
      show:false,
      userName:'',
      userEmail:'',
      postValue:undefined,
      workStartTime:'',
      workEndTime:'',
      userStatus:undefined,
      departementValue:undefined,
      userCity:'',
      startTime:'',
      endTime:'',
      userPhone:'',
      specialistId:[],
      entry:null,
      reference:null,
      iconLoading:false,
      // iconLoadingEnd:null,
    }
  },
  
  computed: {
    ...mapState({
      staticalStatus: state => state.staticalStatus
    })
  },
  created(){
    this.getPositionNameInit();
    this.getStructureListInit();
    this.getRecruitmentSpecialistInit()
  },
   watch:{
    iconLoadingEnd:function(e) {
       this.iconLoading = e;
       this.$emit('update:iconLoadingEnd',null)
    }
  },
  methods: {
    // 搜索
    handleSearchSubmit(e) {
      this.$emit('handleSearch')
    },
       // 重置
    handleResetSubmit() {
      this.userName = '';
      this.userEmail = '';
      this.postValue = undefined;
      this.workStartTime = '';
      this.workEndTime = '';
      this.userStatus = undefined;
      this.departementValue = undefined;
      this.userCity = '';
      this.startTime = '';
      this.endTime = '';
      this.userPhone = '';
      this.specialistId = [];
      this.entry = null;
      this.reference = null;
      this.iconLoading=false;
      this.$emit('update:userName', undefined)
      this.$emit('update:userEmail', undefined)
      this.$emit('update:specialistId', undefined)
      this.$emit('update:postValue', undefined)
      this.$emit('update:workStartTime', undefined)
      this.$emit('update:workEndTime', undefined)
      this.$emit('update:userStatus', undefined)
      this.$emit('update:departementValue', undefined)
      this.$emit('update:userCity', undefined)
      this.$emit("update:startTime", undefined);
      this.$emit("update:endTime", undefined);
      this.$emit("update:userPhone", undefined);
       this.$emit('update:iconLoading',false)
      this.$emit('handleSearch')
    },
    resetExportClick(){
      this.$emit('handleExport');
     this.iconLoading = true;
    },
     // 姓名
    handleNameChange(e) {
      this.userName = e.target.value;
      this.$emit('update:userName',e.target.value)
    },
    // 邮箱
    handleEmailChange(e) {
      this.userEmail = e.target.value;
      this.$emit('update:userEmail',e.target.value)
    },
    // 手机号
    handlePhoneChange(e) {
      this.userPhone = e.target.value;
      this.$emit('update:userPhone',e.target.value)
    },
    handleCityChange(e){
      this.userCity = e.target.value;
      this.$emit('update:userCity',e.target.value)
    },
    // 职位
    handlePostChange(e) {
      this.postValue = e;
      this.$emit('update:postValue',e)
    },
    // 部门
    handleDepartChange(e) {
      this.departementValue = e;
      this.$emit('update:departementValue',e)
    },
    handleSpeciaChange(e){
      this.specialistId = e;
      this.$emit('update:specialistId',e)
    },
    handleStatusChange(e){
      this.userStatus = e;
      this.$emit('update:userStatus',e)
    },
    // 日期
    handleDateClick(e,value) {
        this.reference = e;
      this.$emit('update:startTime',value[0])
      this.$emit('update:endTime',value[1])
    },
    handleWorkClick(e,value) {
      this.entry = e
      this.$emit('update:workStartTime',value[0])
      this.$emit('update:workEndTime',value[1])
    },
    
    // 获取职位
    async getPositionNameInit() {
      try {
        const res = await getPositionName()
        this.postNameList = res.data.data
      }
      catch(error) {}
    },
    // 获取部门列表
    async getStructureListInit() {
      try {
        const res = await getStructureList()
        this.orgList = res.data.data.orgList
      }
      catch(error) {}
    },
    // 获取岗位负责人
    async getRecruitmentSpecialistInit() {
      try {
        const res = await getRecruitmentSpecialist()
        this.recruitmentList = res.data.data
      } catch (error) {}
    },
  }
}
</script>

<style scoped>
.firstName {
  display: flex;
  flex-wrap: wrap;
}
.firstName-head {
  margin:8px 5px;
}
.position-name {
  margin: 0 15px 0 10px;
  color: #000;
  /* font-weight: 600; */
  text-align: right;
}
.position-left{
  /* margin: 0 15px 0 0; */
}
.position-phone {
  display: inline-block;
  margin: 0 10px 0 0;
  color: #000;
  /* font-weight: 600; */
  text-align: right;
}
.position-mail{
 display: inline-block;
  margin: 0 15px 0 10px;
  color: #000;
  /* font-weight: 600; */
  text-align: right;
}
.line {
  width: 100%;
  height: 9px;
  margin: 0 auto;
  background: url("../../../../assets/images/line.png") no-repeat;
  background-size: 100% 100%;
}
.upClass {
  background: url("../../../../assets/images/top.png") no-repeat;
  width: 13px;
  height: 5px;
  margin: 0 auto;
  display: block;
}
.downClass {
  background: url("../../../../assets/images/bottom.png") no-repeat;
  width: 13px;
  height: 5px;
  margin: 0 auto;
  display: block;
}
</style>
