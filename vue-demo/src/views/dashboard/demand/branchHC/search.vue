<template>
  <div>
    <a-row class="firstName"> 
      <a-col :span="6">
        <div class="firstName-head">
          <span class="label-span">萝卜秀编号</span>
          <a-input
            :value="no"
            @change="handleNoChange"
            placeholder="请输入萝卜秀编号"
            allowClear
            class="account-form-head"
          >
            <!-- <a-icon slot="suffix" type="search" style="color:#1478E3" /> -->
          </a-input>
        </div>
      </a-col>
      <a-col :span="6" >
        <div class="firstName-head">
          <span class="label-span">职位名称</span>
          <a-input
            :value="code"
            @change="handleCodeChange"
            placeholder="请输入职位名称"
            allowClear
            class="account-form-head4"
          >
            <!-- <a-icon slot="suffix" type="search" style="color:#1478E3" /> -->
          </a-input>
        </div>
      </a-col>
      <a-col :span="6" >
        <div class="firstName-head">
          <span class="label-span">需求部门</span>
           <a-cascader
              :options="departmentList"
              @change="handleOrgIdsChange"
              change-on-select
              placeholder="请选择需求部门"
              allowClear
              class="account-form-head1"
              :value="organizeId"
              :fieldNames="{
                label: 'orgName',
                value: 'orgId',
                children: 'children',
              }"
              :field-names="{
                label: 'setupContent',
                value: 'setupContent',
                children: 'children',
              }"
              
              :getPopupContainer="(triggerNode) => triggerNode.parentNode"
            >
              <template
                slot="displayRender"
                slot-scope="{ labels, selectedOptions }"
              >
              <!-- {{labels}},{{selectedOptions}} -->
                <span
                  v-for="(label, index) in labels"
                  :key="selectedOptions[index].value"
                >
                
                  <span v-if="index === labels.length - 1  && index>0">
                    {{ label }}
                  </span>
                  <!-- <span v-else-if="index == 0" style="color:#bfbfbf">
                    请选择需求部门
                  </span> -->
                   <!-- <span v-else @click="onChange"> {{ label }} / </span> -->
                </span>
              </template>
            </a-cascader>
          <!-- <a-select
            allowClear
            showSearch
            :value="company"
            placeholder="请选择需求公司"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            optionFilterProp="children"
            @change="handleCompanyChange"
            class="account-form-head1"
            style="margin-right:5px;"
          >
            <a-select-option
              v-for="item in companyData"
              :key="item.customId"
              :value="item.customId"
              >{{ item.customName }}</a-select-option
            >
          </a-select> -->
        </div>
          </a-col>
          <a-col :span="6" >
          <div class="firstName-head" >
          <span class="label-span"><span style="opacity:0">招聘</span>状态</span>
          <a-select
            :value="employ"
            showSearch
            allowClear
            placeholder="请选择状态"
            @change="handleStateChange"
            class="account-form-head1"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item.value"
              v-for="item in recruitQueryTypes"
              :key="item.value"
              >{{ item.label }}</a-select-option
            >
          </a-select>
        </div>
        </a-col>
          <!-- <a-col :span="6" >
            <div class="firstName-head">
          <span class="label-span">需求部门</span>
          <a-tree-select
            v-decorator="['hc_department']"
            :dropdownStyle="{ maxHeight: '350px' }"
            dropdownMatchSelectWidth
            :treeData="departmentData"
            allowClear
            
            :value="organizeId"
            @change="handleOrgIdsChange"
            
            class="account-form-head1"
            
            :showCheckedStrategy="SHOW_PARENT"
            placeholder="请选择需求部门"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            showSearch
            treeNodeFilterProp="title"
          />
        </div>
         </a-col>  -->
        </a-row>
        <a-row class="firstName"> 
        <a-col :span="24"> 
        <div class="firstName-head" style="display:inline-block;width:25%">
          <span class="label-span" ><span style="opacity:0">新</span>职位类别</span>
          <a-cascader
            :options="jobList"
            :value="positionClass"
            @change="handleJobTypeChange"
            placeholder="请选择职位类别"
            class="account-form-head2"
            allowClear
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          />
        </div>
        <!-- </a-col> -->
        <!-- </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" class="firstName"> -->
        <!-- <div class="firstName-head">
          <a-select
            showSearch
            allowClear
            :value="userFilter"
            placeholder="用户过滤"
            @change="handleUserFilterChange"
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
        </div> -->
        <!-- <a-col :span="6"> -->
        <div class="firstName-head" style="display:inline-block;width:25%">
          <span class="label-span">紧急程度</span>
          <a-select
            showSearch
            allowClear
            :value="emergencyLevel"
            placeholder="紧急程度"
            @change="handleEmergencyLevelChange"
            class="account-form-head2"
            style="width:73%"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item.value"
              v-for="item in emergencyLevels"
              :key="item.value"
              >{{ item.label }}</a-select-option
            >
          </a-select>
        </div>
        <!-- </a-col>
        <a-col span="6"> -->
        <div class="firstName-head" style="display:inline-block;width:25%" >
          <span class="label-span">工作地点</span>
          <a-cascader
            :value="jobAddress"
            :options="CityInfo"
            @change="handleCityChange"
            placeholder="请选择工作地点"
            allowClear
            changeOnSelect
            class="account-form-head2"
             style="width:74%;"
            :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          />
        </div>
        <!-- </a-col>
        <a-col span="6" > -->
        <div class="firstName-head"  style="display:inline-block;width:25%"  v-if="show">
          <span class="label-span">日期范围</span>
          <a-range-picker
            :value="entry"
            allowClear
            @change="handleEntryDateClick"
            class="account-form-head2"
            style="width:74%"
            format="YYYY-MM-DD"
          />
        </div>
        <!-- </a-col> -->
        <!-- </a-row>
        <a-row class="firstName">  -->
        <!-- <a-col :span="6"> -->
        
        <!-- </a-col>
        <a-col span="6"> -->
        <div class="firstName-head" v-if="show" style="display:inline-block;width:25%">
          <span class="label-span"><span style="opacity:0">新</span>发布人</span>
          <a-select
            :value="specialistid"
            showSearch
            allowClear
            placeholder="发布人"
            @change="handleSpecialChange"
            class="account-form-head2"
            style="width:73%"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item.userId"
              v-for="item in recruitmentList"
              :key="item.userId"
              >{{ item.userName }}</a-select-option
            >
          </a-select>
        </div>
        <!-- </a-col>
        <a-col span="6"> -->
        <div style="display:inline-block;">
          
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
        </div>
    </a-col>
        <!-- </a-row> -->
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
    </a-row>
  </div>
</template>

<script>
import { getRecruitmentSpecialist, getAllInfo } from "@api/statistical/index";
import { getUserInfoList } from "@api/manage/index";
import { getDemandList, getStructureList } from "@api/demandBranch/index";
import { getTreeList ,getPrivilegeOwner,getAllCustomOrg} from "@api/branchHC/index";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import moment from "moment";
import { TreeSelect } from "ant-design-vue";
const SHOW_PARENT = TreeSelect.SHOW_ALL;
import CityInfo from "@configs/city_data.js";
export default {
  props: ["waitList", "failList", "successList", "noSuccessList",'getBranchHCList'],
  data() {
    return {
      type: 1,
      code: "", // 需求编号
      no:'',//萝卜秀编号
      companyData: [], //需求公司
      specialistid: [], // 部门筛选
      positionClass: [], // 职级职等
      userFilter: [], // 面试官
      emergencyLevel: undefined, // 紧急程度
      employ: 1, //在招
      jobAddress: [], // 工作地点
      realOwnerId: [], // 招聘负责人
      entry: null, // 入职日期
      show: false,
      recruitmentList: [],
      departmentData: [], //需求公司
      jobList: [], //职位类别
      employLeader: undefined, //招聘负责人
      organizeId: [], //部门
      SHOW_PARENT,
      CityInfo,
      company: undefined,
      departmentList:[]//需求部门
    };
  },
  computed: {
    ...mapState({
      resultList: (state) => state.resultList,
      emergencyLevels: (state) => state.emergencyLevels,
      recruitQueryTypes: (state) => state.recruitQueryTypes,
    }),
  },
  mounted() {
    this.getDemandList(); //需求部门
    this.getTreeListInit(); //职位类别
    this.getAllCustomOrgInit(); //需求部门
    this.getPrivilegeOwner();
    this.getAllInfoInit();
  },
  methods: {
    // 需求部门合并
    async getAllCustomOrgInit() {
      const res = await getAllCustomOrg();
      // this.departmentList = res.data.data.orgList;
      let newList = res.data.data.orgList;
      newList.map((item) => {
        item.orgId = item.falseId;
      });
      newList = JSON.parse(
        JSON.stringify(newList).replace(/customName/g, "orgName")
      );
      this.departmentList = newList;
      // console.log(this.departmentList,'this.departmentList');
      // if(this.departmentList.customId){
      //         let customeId=1000+res.data.data.demand.customId;
      //         this.echoList.hc_department.unshift(customeId) 
      //       }
    },
    moment,
    // 搜索
    handleSearchSubmit() {
      this.$emit("handleSearch");
    },
    // 重置
    handleResetSubmit() {
      this.code = "";
      this.no = "";
      this.specialistid = [];
      this.positionClass = [];
      this.userFilter = [];
      this.emergencyLevel = undefined;
      this.employ =1;
      this.jobAddress = [];
      this.organizeId = [];
      this.entry = null;
      this.employLeader = "";
      this.company = undefined;
      this.$emit("update:no", undefined);
      this.$emit("update:code", undefined);
      this.$emit("update:specialistid", undefined);
      this.$emit("update:positionClass", undefined);
      this.$emit("update:userFilter", undefined);
      this.$emit("update:emergencyLevel", undefined);
      this.$emit("update:employ", 1);
      this.$emit("update:jobAddress", undefined);
      this.$emit("update:employLeader", undefined);
      this.$emit("update:startTime", undefined);
      this.$emit("update:endTime", undefined);
      this.$emit("update:organizeId", undefined);
      this.$emit('getBranchHCList')
    },
    // 萝卜秀编号
    handleNoChange(e){
      this.no = e.target.value;
      this.$emit('update:no',this.no);
    },
    // 需求编号
    handleCodeChange(e) {
      this.code = e.target.value;
      this.$emit("update:code", this.code);
    },
    // 岗位负责人
    handleSpecialChange(e) {
      this.specialistid = e;
      this.$emit("update:specialistid", this.specialistid);
    },
    // 紧急程度
    handleEmergencyLevelChange(e) {
      this.emergencyLevel = e;
      this.$emit("update:emergencyLevel", this.emergencyLevel);
    },
    //用户过滤
    handleUserFilterChange(e) {
      this.userFilter = e;
      this.$emit("update:userFilter", this.userFilter);
    },
    // 面试日期
    handleEntryDateClick(value, key) {
      this.entry = value;
      this.$emit("update:startTime", key[0]);
      this.$emit("update:endTime", key[1]);
    },
    //在招
    handleStateChange(e) {
      this.employ = e;
      this.$emit("update:employ", this.employ);
      this.$emit('getBranchHCList')
    },
    // 权益人
    handleCandidateChange(e) {
      this.realOwnerId = e;
      this.$emit("update:realOwnerId", this.realOwnerId);
    },

    // 获取部门
    async getAllInfoInit() {
      try {
        const res = await getAllInfo({
          level: 1,
        });
        if (res.data.code == 0) {
          this.companyAllList = res.data.data.companyAllList;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取岗位负责人
    async getPrivilegeOwner() {
      try {
        const res = await getPrivilegeOwner();
        this.recruitmentList = res.data.data.userList.list;
      } catch (error) {}
    },
    // 需求公司
    getDemandList() {
      getDemandList()
        .then((res) => {
          this.companyData = res.data.data.CompanyList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCompanyChange(value) {
      this.company = value;
      getStructureList({
        customId: value,
      })
        .then((res) => {
          if (res.data.data === null) {
            this.departmentData = [];
          } else {
            this.departmentData = this.tmpListInit(res.data.data.orgList);
          }
        })
        .catch((err) => {
          console.log(err);
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
    async getTreeListInit() {
      const res = await getTreeList();
      this.jobList = res.data.data;
    },
    // 工作城市
    handleCityChange(e) {
      console.log(e, "e");
      this.jobAddress = e;
      this.$emit("update:jobAddress", this.jobAddress);
    },
    // 职位类别
    handleJobTypeChange(e) {
      this.positionClass = e;
      this.$emit("update:positionClass", this.positionClass);
    },
    handleOrgIdsChange(e) {
      // this.organizeId = e;
      let organizeIds = e.slice(-1);
     organizeIds = organizeIds.toString();//过滤掉假的公司id
        if(organizeIds.indexOf('100') !=-1){
          organizeIds=''
         
        }else{
          this.organizeId = e;
        }
      this.$emit("update:organizeId", organizeIds);
    },
  },
};
</script>

<style scoped>
.position-name {
  margin: 0 10px 0 5px;
  color: #78909c;
  font-weight: 600;
  text-align: left;
  display: inline-block;
}
.position-name-left {
  margin: 0 10px 0 0;
  color: #78909c;
  font-weight: 600;
  text-align: left;
  display: inline-block;
}
.position-name-post {
  margin: 0 10px 0 0;
  width: 85px;
  color: #78909c;
  font-weight: 600;
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
  padding-bottom: 10px;
}
.collapse-show {
  cursor: pointer;
  margin-left: 20px;
  color: #333333;
}
.account-form-head {
  width: 70%;
  margin-right: 3px;
}
.account-form-head1 {
  width: 73%;
  margin-right: 3px;
}
.account-form-head4 {
  width: 73%;
  margin-right: 3px;
  /* margin-right: 5px; */
}
.account-form-head2{
  width:70%;
  margin-right:3px;
}
.footer-updata {
  display: flex;
  justify-content: space-between;
}
.footer-wait {
  margin: 0 10px;
  color: #feaa19;
  font-weight: 900;
}
.footer-success {
  margin: 0 10px;
  color: #22b8cf;
  font-weight: 900;
}
.footer-fail {
  margin: 0 10px;
  font-weight: 900;
  color: #fd5158;
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
.label-span{
  margin: 0 10px 0 10px;
  color: #000;
}
</style>
