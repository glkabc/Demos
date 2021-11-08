<template>
  <div>
    <a-row class="firstName">
      <a-col :span="6" >
        <div class="first-head">
          <span class="position-name-left">需求编号</span>
          <a-input
            :value="code"
            @change="handleCodeChange"
            placeholder="请输入需求编号"
            allowClear
            class="account-form-head"
          />
        </div>
      </a-col>
      <a-col :span="6" >
        <div class="first-head">
          <span class="position-name position-thrid">职位编号</span>
          <a-input
            :value="no"
            @change="handleIdCardChange"
            placeholder="请输入职位编号"
            allowClear
            class="account-form-head"
            style=""
          />
        </div>
        </a-col>
      <a-col :span="6" >
        <div class="first-head">
          <span class="position-name">发布日期</span>
          <a-range-picker 
            :value="entry"
            format="YYYY-MM-DD"
            class="account-form-head"
            @change="handleEntryDateClick"
          />
          </div>
       </a-col>
      <a-col :span="6" >
        <div class="first-head">
          <span class="position-name">岗位负责人</span>
          <a-select
            :value="specialistid"
            showSearch
            allowClear
            placeholder="请选择岗位负责人"
            @change="handleSpecialChange"
            class="account-form-head"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
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
      </a-col>
      <!-- </a-col>-->
    </a-row> 
        <a-row class="firstName">
      <a-col :span="24" >
         <div class="first-head" style="display:inline-block;width:25%">
          <span class="position-name-left">需求部门</span>
          <a-cascader
            :value="demartmentId"
            allowClear
            class="account-form-head"
            style="width:68%"
            :options="companyAllList"
            @change="handleDepartmentChange"
            :fieldNames="{ label: 'orgName', value: 'orgId', children: 'orgList' }"
            placeholder="请选择需求部门"
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }
            "
            />
        </div>
        <div style="display:inline-block;">
        <a-button
          :style="{
            marginTop:'8px',
            
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
            marginTop:'8px',
            marginLeft: '10px',
            backgroundColor: '#22b8cf',
            border: '#22b8cf',
          }"
          @click="handleExportSubmit"
          type="primary"
          :loading="iconLoading"
        >
          导出
        </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getRecruitmentSpecialist ,getAllInfo} from "@api/statistical/index";
import moment from 'moment';
export default {
  props:['iconLoadingEnd'],
  data() {
    return {
      companyAllList: [], // 需求部门数据
      recruitmentList: [], // 岗位负责人数据
      code:'',
      no:'',
      entry:null,
      specialistid:undefined,
      demartmentId:[],
      iconLoading:false,
    };
  },
  watch:{
    iconLoadingEnd:function(e) {
      this.iconLoading = e;
      this.$emit('update:iconLoadingEnd',null)
    }
  },
  mounted() {
    this.getAllInfoInit()
    this.getRecruitmentSpecialistInit()
  },
  methods: {
		moment,
    // 搜索
    handleSearchSubmit() {
      this.$emit('handleSearch')
    },
    // 重置
    handleResetSubmit() {
      this.code = '',
      this.no = '',
      this.entry = null,
      this.specialistid = undefined,
      this.demartmentId = [],
      this.startTime = "",
      this.endTime = "",
      this.iconLoading=false;
      this.$emit('update:code',undefined);
      this.$emit('update:no',undefined);
      this.$emit('update:entry',undefined);
      this.$emit('update:specialistid',undefined);
      this.$emit('update:demartmentId',undefined);
      this.$emit('update:startTime',undefined);
      this.$emit('update:endTime',undefined);
      this.$emit('handleSearch')
    },
    // 导出
    handleExportSubmit() {
      this.$emit('handleExport')
      this.iconLoading = true;
    },
    // 需求编号
    handleCodeChange(e) {
      this.code = e.target.value;
      this.$emit('update:code',e.target.value)
    },
    // 身份证
    handleIdCardChange(e) {
      this.no = e.target.value
      this.$emit('update:no',e.target.value)
    },
    // 部门
    handleDepartmentChange(value) {
      this.demartmentId = value;
      this.$emit('update:demartmentId',value[1])
    },
    // 岗位负责人
    handleSpecialChange(value) {
      this.specialistid = value; 
      this.$emit('update:specialistid',value)
    },
    // 发布日期
    handleEntryDateClick(value,timeString) {
      this.entry = value;
      this.$emit('update:startTime',timeString[0])
      this.$emit('update:endTime',timeString[1])
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
    // 获取岗位负责人
    async getRecruitmentSpecialistInit() {
      try {
        const res = await getRecruitmentSpecialist();
        this.recruitmentList = res.data.data;
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.position-name {
  margin: 0 10px 0 5px;
  color: #000;
  /* font-weight: 600; */
  text-align: left;
  display: inline-block
}
.position-name-left {
  margin: 0 10px 0 0;
  color: #000;
  /* font-weight: 600; */
  text-align: left;
  display: inline-block
}
.position-post {
  width: 110px;
}
.account-form-head {
  width: 70%;
  margin-right: 3px;
}
.firstName {
  display: flex;
  flex-wrap: wrap;
}
.first-head {
  margin:8px 5px;
}
</style>
