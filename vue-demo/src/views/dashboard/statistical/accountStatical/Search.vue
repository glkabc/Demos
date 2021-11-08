<template>
  <div>
    <a-row class="firstName">
      <a-col :span="6" >
        <div class="firstName-head">
          <a-dropdown>
            <a class="ant-dropdown-link position-name-left">
              {{ userInfo }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay" >
              <a-menu-item v-for="item in searchList" :key="item.id" >
                <a href="javascript:;" @click="searchChange(item.id)">{{ item.label }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-input
            :value="userInfoValue"
            @change="handleUserChange"
            :placeholder="placeholderTitle"
            allowClear
            class="account-form-head"
          />
        </div>
      </a-col>
        <a-col :span="6" >
        <div class="firstName-head">
            <span class="position-name">需求编号</span>
            <a-input
              :value="code"
              @change="handleCodeChange"
              placeholder="请输入需求编号"
              allowClear
              class="account-form-head1"
            />
        </div>
        </a-col>
        <a-col :span="6" >
         <div class="firstName-head">
          <span class="position-name">一级部门</span>
          <a-cascader
            allowClear
            :value="demartmentId"
            class="account-form-head1"
            :options="companyAllList"
            @change="handleDepartmentChange"
            :fieldNames="{ label: 'orgName', value: 'orgId', children: 'orgList' }"
            placeholder="请选择标准岗位名称"
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }
            "
            />
        </div>
        </a-col>
        <a-col :span="6" >
         <div class="firstName-head">
          <span class="position-name">面试官</span>
          <a-input
            :value="viewrValue"
            @change="handleViewrChange"
            placeholder="请输入面试官"
            allowClear
            class="account-form-head1"
          />
        </div>
        </a-col>
    </a-row>
    <a-row class="firstName">
        <a-col :span="24" >
        <div class="firstName-head" style="display:inline-block;width:24.3%">
          <span class="position-name-post">岗位负责人</span>
          <a-select
            showSearch
            allowClear
            :value="specialistid"
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
       
       
        <div class="firstName-head" style="display:inline-block;width:24%">
          <span class="position-name" >面试岗位</span>
          <a-input
            :value="demandName"
            @change="handleDemandNameChange"
            placeholder="请输入面试岗位"
            allowClear
            class="account-form-head"
            style="width:74%;"
          />
        </div>
        <div class="firstName-head" style="display:inline-block;width:24%">
          <span class="position-name">面试结果</span>
          <a-select
            allowClear
            showSearch
            :value="statusValue"
            placeholder="请选择面试结果"
            @change="handleStatusChange"
            class="account-form-head"
            style="width:75%;"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item.value"
              v-for="item in resultList"
              :key="item.value"
              >{{ item.label }}</a-select-option
            >
          </a-select>
        </div>
          <div class="firstName-head" v-show="show" style="display:inline-block;width:24%">
          <span class="position-name" >权益人</span>
          <a-select
            allowClear
            showSearch
            :value="realOwnerId"
           
            placeholder="请选择权益人"
            @change="handleCandidateChange"
            class="account-form-head"
            style="width:75%;"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item.userId"
              v-for="item in organizeList"
              :key="item.userId"
              >{{ item.userName }}</a-select-option
            >
          </a-select>
        </div>
        <div class="firstName-head" v-if="show" style="display:inline-block;width:24.3%">
          <span class="position-name" style="width:80px" >萝卜秀编号</span>
          <a-input
            :value="demandNo"
            @change="handleDemandNoChange"
            placeholder="请输入萝卜秀编号"
            allowClear
            class="account-form-head"
            v-show="show"
          />
        </div>
      
        <div class="firstName-head" v-if="show" style="display:inline-block;width:24.3%">
          <span class="position-name" >面试时间</span>
          <a-range-picker
            v-show="show"
            :value="entry"
            @change="handleEntryDateClick"
            class="account-form-head"
            style="width:73%"
            format="YYYY-MM-DD"
          />
        </div>
        <div style="margin-top: 8px;display:inline-block;">
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
            @click="handleExportSubmit"
            type="primary"
            :loading="iconLoading"
          >
            导出
          </a-button>
          <!-- <span :style="{
              position:'absolute',
              right:'0',
              marginTop:'5px'
              }" 
              @click="show = !show" class="collapse-show"
            ><a-icon :type="show ? 'up' : 'down'"/>
            <span v-text="show ? '收起' : '展开'"></span
          ></span> -->
        </div>
      </a-col>
      <!-- <a-col :span="24">
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
      </a-col> -->
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
        <!-- <a-divider dashed/> -->
        <div class="footer-updata" style="float:right">
            
          <div class="footer-status">
            <span>待面试:  <span class="footer-wait">{{waitList}}</span></span>
            <span>邀约失败:  <span class="footer-fail">{{noSuccessList}}</span></span>
            <span>通过: <span class="footer-success">{{successList}}</span></span>
            <span>未通过:  <span class="footer-fail">{{failList}}</span></span>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getRecruitmentSpecialist ,getAllInfo} from "@api/statistical/index";
import { getUserInfoList } from "@api/manage/index";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import moment from "moment";
export default {
  props: ['waitList','failList','successList','noSuccessList','iconLoadingEnd'],
  data() {
    return {
      placeholderTitle: '请输入候选人姓名',
      userInfo: '候选人姓名',
      type: 1,
      userInfoValue: '',
      code: "", // 需求编号
      specialistid: [], // 岗位负责人
      demartmentId: [], // 部门id
      viewrValue: '', // 面试官
      demandName: '', // 面试岗位
      demandNo: '',
      statusValue: [], // 面试结果
      realOwnerId: [], // 权益人
      entry: null, // 入职日期
      setupList: [], // 候选人来源
      recruitmentList: [], // 岗位负责人数据
      organizeList: [], // 获取权益人
      companyAllList: [],
      mail:'',
      realOwnerMail:'',
      show: false,
      iconLoading:false,
      searchList: [
        {
          id:1,
          label: "候选人姓名"
        },
        {
          id:2,
          label: "候选人手机号"
        },
        {
          id:3,
          label: "候选人邮箱"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      resultList: state => state.resultList
    })
  },
  watch:{
    iconLoadingEnd:function(e) {
      this.iconLoading = e;
      console.log(this.iconLoading,'this.iconLoading')
      this.$emit('update:iconLoadingEnd',null)
    }
  },
  mounted() {
    this.getRecruitmentSpecialistInit()
    this.getUserInfoListInit() // 获取权益人
    this.getAllInfoInit()
  },
  methods: {
    moment,
    // 搜索
    handleSearchSubmit() {
      this.$emit("handleSearch");
    },
    // 重置
    handleResetSubmit() {
      this.userInfoValue = ''
      this.code = ''
      this.specialistid = []
      this.demartmentId = []
      this.viewrValue = ''
      this.demandName = ''
      this.statusValue = []
      this.realOwnerId = []
      this.entry = null
      this.demandNo = ''
      this.mail =''
      this.realOwnerMail =''
      this.iconLoading=false;
      this.$emit('update:userInfoValue', undefined)
      this.$emit('update:code', undefined)
      this.$emit('update:specialistid', undefined)
      this.$emit('update:demartmentId', undefined)
      this.$emit('update:viewrValue', undefined)
      this.$emit('update:demandName', undefined)
      this.$emit('update:statusValue', undefined)
      this.$emit('update:realOwnerId', undefined)
      this.$emit('update:demandNo', undefined)
      this.$emit("update:startTime", undefined);
      this.$emit("update:endTime", undefined);
      this.$emit("update:mail", undefined);
      this.$emit("update:realOwnerMail", undefined);
      this.$emit("handleSearch");
      this.$emit('iconLoading',false)
      
    },
    // 导出
    handleExportSubmit() {
      this.$emit("handleExport");
      this.iconLoading = true;
    },
    searchChange(e) {
      this.type = e
      switch (e) {
        case 1:
          this.placeholderTitle = '请输入候选人姓名'
          this.userInfo = '候选人姓名'
          this.$emit('update:userInfoValue', "")
          this.userInfoValue = ''
          break;
        case 2:
          this.placeholderTitle = '请输入候选人手机号'
          this.userInfo = '候选人手机号'
          this.$emit('update:userInfoValue', "")
          this.userInfoValue = ''
          break;
        default:
          this.placeholderTitle = '请输入候选人邮箱'
          this.userInfo = '候选人邮箱'
          this.$emit('update:userInfoValue', "")
          this.userInfoValue = ''
          break;
      }
    },
    // 候选人信息
    handleUserChange(e) {
      this.userInfoValue = e.target.value
      this.$emit('update:userInfoValue', e.target.value)
    },
    // 需求编号
    handleCodeChange(e) {
      this.code = e.target.value;
      this.$emit("update:code", this.code);
    },
    // 岗位负责人
    handleSpecialChange(e) {
      if(e==undefined){
       this.$emit("update:mail", undefined);
      }
      this.specialistid = e
      this.$emit("update:specialistid", e);
    },
    // 一级部门
    handleDepartmentChange(value) {
      this.demartmentId = value;
      this.$emit("update:demartmentId", this.demartmentId[1]);
    },
    // 面试官
    handleViewrChange(e) {
      this.viewrValue = e.target.value
      this.$emit("update:viewrValue", this.viewrValue);
    },
    // 面试岗位
    handleDemandNameChange(e) {
      this.demandName = e.target.value
      this.$emit("update:demandName", this.demandName);
    },
    handleStatusChange(e) {
      this.statusValue = e
      this.$emit("update:statusValue", this.statusValue);
    },
    handleDemandNoChange(e) {
      this.demandNo = e.target.value
      this.$emit('update:demandNo',this.demandNo)
    },
    // 面试日期
    handleEntryDateClick(value,key) {
      this.entry = value;
      this.$emit("update:startTime", key[0]);
      this.$emit("update:endTime", key[1]);
    },
    // 权益人
    handleCandidateChange(e) {
      console.log(e,'e权益人')
      if(e==undefined){
        this.$emit('update:realOwnerMail',undefined)
      }
      // this.realOwnerMail = e;
      this.realOwnerId = e
      this.$emit("update:realOwnerId", this.realOwnerId);
    },
    // 获取权益人
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList({})
        if(res.data.code == 0) {
          this.organizeList = res.data.data.userList.list
        }
      }
      catch(error){console.log(error)}
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
  display: inline-block;
}
.position-name-left {
  margin: 0 10px 0 0;
  color: #000;
  /* font-weight: 600; */
  text-align: left;
  display: inline-block;
}
.position-name-post{
  margin: 0 10px 0 0;
  width:85px;
  color: #000;
  /* font-weight: 600; */
  text-align: left;
  display: inline-block;
}
.position-post {
  width: 110px;
}
.firstName {
  display: flex;
  flex-wrap: wrap;
}
.firstName-head {
  margin:8px 5px;
}
.collapse-show {
  cursor: pointer;
  margin-left: 20px;
  color: #333333
}
.account-form-head{
  width: 67%;
  margin-right: 3px;
}
.account-form-head3 {
  width: 65%;
  margin-right: 3px;
}
.account-form-head1 {
  width: 74%;
  margin-right: 3px;
}
.footer-updata {
  display: flex;
  justify-content: space-between;
}
.footer-wait {
  margin: 0 10px;
  color: #FEAA19;
  font-weight: 900;
}
.footer-success {
  margin: 0 10px;
  color: #22B8CF;
  font-weight: 900;
}
.footer-fail {
  margin: 0 10px;
  font-weight: 900;
  color: #FD5158;
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
