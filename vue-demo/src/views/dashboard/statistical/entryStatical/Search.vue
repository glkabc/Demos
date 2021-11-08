<template>
  <div>
    <a-row  class="firstName">
      <a-col :span="6">
        
        <!-- <div class="firstName-head">
          <span class="position-name">需求名称</span>
          <a-input
            :value="name"
            @change="handleNameChange"
            placeholder="请输入需求名称"
            allowClear
            style="width: 220px"
          />
        </div> -->
        <div class="firstName-head">
          <span class="position-name-one position-thrid"><span style="opacity:0">新</span>职位编号</span>
          <a-input
            :value="no"
            @change="handleNoChange"
            placeholder="请输入职位编号"
            allowClear
            class="account-form-head1"
            @keyup.enter.native="handleSearchSubmit"
          />
        </div>
        </a-col>
      <a-col :span="6" >
        <div class="firstName-head">
          <span class="position-name">职级职等</span>
          <a-input
            :value="level"
            @change="handleLevelChange"
            placeholder="请输入职级职等"
            allowClear
            class="account-form-head"
             @keyup.enter.native="handleSearchSubmit"
          />
        </div>
        </a-col>
      <a-col :span="6" >
         <div class="firstName-head">
          <span class="position-name-left">需求部门</span>
          <a-select
            showSearch
            allowClear
            :value="demartmentId"
            placeholder="请选择需求部门"
            @change="handleDepartmentChange"
            class="account-form-head"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
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
        </a-col>
      <a-col :span="6" >
        <div class="firstName-head">
          <span class="position-name position-thrid" ><span style="opacity:0">新</span>身份证</span>
          <a-input
            :value="idCard"
            @change="handleIdCardChange"
            placeholder="请输入身份证"
            allowClear
            class="account-form-head"
             @keyup.enter.native="handleSearchSubmit"
          />
        </div>
        </a-col>
    </a-row>
    <a-row class="firstName">
      <a-col :span="24" >
       <!-- </a-col>
        </a-row>
        <a-row>
      <a-col :span="24" class="firstName"> -->
         
        <div class="firstName-head" style="display:inline-block;width:25%">
          <span class="position-name"><span style="opacity:0">新</span>候选人来源</span>
          <a-select
            allowClear
            showSearch
            :value="candidateValue"
            placeholder="请选择候选人来源"
            @change="handleCandidateChange"
            class="account-form-head1"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item.setupCode"
              v-for="item in setupList"
              :key="item.setupCode"
              >{{ item.setupContent }}</a-select-option
            >
          </a-select>
        </div>
       
        <div class="firstName-head" style="display:inline-block;width:25%">
          <span class="position-name">入职日期</span>
          <a-date-picker
            format="YYYY-MM-DD"
            class="account-form-head"
            @change="handleEntryDateClick"
            :value="entry ? moment(entry) : null"
          />
        </div>
         
        <div class="firstName-head" style="display:inline-block;width:25%">
          <span class="position-name">需求编号</span>
          <a-input
            :value="code"
            @change="handleCodeChange"
            placeholder="请输入需求编号"
            allowClear
            class="account-form-head"
             @keyup.enter.native="handleSearchSubmit"
          />
        </div>
        <div class="firstName-head" v-show="show" style="display:inline-block;width:25%">
          <span class="position-name" >offer确认</span>
          <a-date-picker
            format="YYYY-MM-DD"
            class="account-form-head"
            @change="handleDateClick"
            :value="offerDate ? moment(offerDate) : null"
          />
        </div>
        <!-- </a-col>
        </a-row>
        <a-row>
      <a-col :span="24" class="firstName"> -->
        <div class="firstName-head"  v-show="show" style="display:inline-block;width:25%">
          <span class="position-name-left-ps" >标准岗位名称</span>
          <a-cascader
            allowClear
            :value="postValue"
            class="account-form-head1"
            :options="jobList"
            @change="handlePostChange"
            :fieldNames="{ label: 'name', value: 'code', children: 'children' }"
            placeholder="请选择标准岗位名称"
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }
            "
            />
        </div>
        <a-button
          :style="{
            marginTop:'5px',
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
            marginTop:'5px',
            marginLeft: '10px',
            backgroundColor: '#22b8cf',
            border: '#22b8cf',
          }"
          @click="handleExportSubmit"
          type="primary"
          :loading='iconLoading'
        >
          导出
        </a-button>
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
import { affirmOffer, getSetup, getCode } from "@api/department/operation";
import { getStructureList } from "@api/demandBranch/index"
import moment from 'moment';
export default {
  props:['iconLoadingEnd'],
  data() {
    return {
      no:'',//萝卜秀编号
      code: '', // 需求编号
      name: '', // 需求名称
      level: '', // 职级职等
      idCard: '', // 身份证
      demartmentId: undefined, // 需求部门
      candidateValue:undefined, // 候选人
      postValue: [], // ps标准岗位
      entry: null, // 入职日期
      offerDate: null, // 入职日期
      setupList: [], // 候选人来源
      jobList: [], // 岗位数据
      orgList: [], // 需求部门数据
      show:false,
      iconLoading:false,
    };
  },
  mounted() {
    this.getCodeInit(2)
    this.getSetupInit()
    this.getStructureListInit()
  },
  watch:{
    iconLoadingEnd:function(e) {
      this.iconLoading = e;
      this.$emit('update:iconLoadingEnd',null)
    }
  },
  methods: {
		moment,
    // 搜索
    handleSearchSubmit() {
      this.$emit('handleSearch')
    },
    handleResetSubmit() {
      this.no = ''; //萝卜秀编号
      this.code = ''; // 需求编号
      this.level= ''; // 职级职等
      this.demartmentId= undefined; // 需求部门
      this.idCard= ''; // 身份证
      this.candidateValue=undefined; // 候选人
      this.entry= ''; // 入职日期
      this.postValue= []; // ps标准岗位   
      this.offerDate=''; // 入职日期
      this.iconLoading = false;
      this.$emit('update:no',undefined);
      this.$emit('update:code',undefined);
      this.$emit('update:level',undefined);
      this.$emit('update:demartmentId',undefined);
      this.$emit('update:idCard',undefined);
      this.$emit('update:candidateValue',undefined);
      this.$emit('update:entry','');
      this.$emit('update:postValue',[]);
      this.$emit('update:offerDate','');
      this.$emit('handleSearch')
      this.$emit('iconLoading',false)
    },
    // 导出
    handleExportSubmit() {
      this.$emit('handleExport')
      this.iconLoading = true;
    },
    // 需求编号
    handleCodeChange(e) {
      this.code = e.target.value
      this.$emit('update:code',e.target.value)
    },
    handleNoChange(e) {
      this.no = e.target.value;
      this.$emit('update:no',e.target.value)
    },
    // 需求名称
    // handleNameChange(e) {
    //   this.name = e.target.value
    //   this.$emit('update:name',e.target.value)
    // },
    // 职级职等
    handleLevelChange(e) {
      this.level = e.target.value
      this.$emit('update:level',e.target.value)
    },
    // 身份证
    handleIdCardChange(e) {
      this.idCard = e.target.value
      this.$emit('update:idCard',e.target.value)
    },
    // 部门
    handleDepartmentChange(value) {
      this.demartmentId = value
      this.$emit('update:demartmentId',value)
    },
    // 候选人
    handleCandidateChange(value) {
      this.candidateValue = value
      this.$emit('update:candidateValue',value)
    },
    // 入职日期
    handleEntryDateClick(value) {
      this.entry = value
      const formatedValue =
				value instanceof moment ? value.format('YYYY-MM-DD') : null;
			this.$emit('update:entry', formatedValue);
    },
    // offer确认日期
    handleDateClick(value) {
      this.offerDate = value
      const formatedValue =
				value instanceof moment ? value.format('YYYY-MM-DD') : null;
			this.$emit('update:offerDate', formatedValue);
    },
    // PS标准岗位名称
    handlePostChange(value) {
      // console.log(value,'postValue')
      this.postValue = value
      this.$emit('update:postValue',value)
    },
    // 获取部门列表
    async getStructureListInit() {
      try {
        const res = await getStructureList()
        this.orgList = res.data.data.orgList
      }
      catch(error) {}
    },
    // 获取ps岗位名称
    async getCodeInit(type) {
      try {
        const res = await getCode({
          code: type
        });
        this.jobList = res.data.data.codeList;
      } catch (error) {}
    },
    // 获取来源渠道
    async getSetupInit() {
      try {
        const res = await getSetup({
          setupType: 2
        });
        this.setupList = res.data.data.setupList;
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.account-form-head1 {
  width: 65%;
  margin-right: 3px;
}
.account-form-head {
  width: 74%;
  margin-right: 3px;
}
.account-form-head3 {
  width: 70%;
  /* margin-right: 3px; */
}
.position-name-one{
  margin: 0 10px 0 25px;
  color: #000;
  /* font-weight: 600; */
  text-align: left;
  display: inline-block
}
.position-name {
  margin: 0 10px 0 10px;
  color: #000;
  /* font-weight: 600; */
  text-align: left;
  display: inline-block
}
.position-name-left {
  margin: 0 10px 0 10px;
  color: #000;
  /* font-weight: 600; */
  text-align: left;
  display: inline-block
}
.position-name-left-ps {
  margin: 0 10px;
  color: #000;
  /* font-weight: 600; */
  text-align: left;
  display: inline-block
}
.position-post {
  width: 110px;
}
.firstName {
  display: flex;
  flex-wrap: wrap;
}
.firstName-head {
  margin: 8px 0;
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
