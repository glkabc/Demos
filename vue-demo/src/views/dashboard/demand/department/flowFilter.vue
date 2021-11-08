<template>
  <div>
    <a-row :gutter="5">
      <a-col :span="4">
       <el-input
          v-model="listQuery.title"
          clearable
          class="filter-item"
          placeholder="搜索姓名/手机/邮箱等"
          @keyup.enter.native="handleFilter"
        />
      </a-col>
      <a-col :span="2">
        <el-select
          v-model="listQuery.candidateStatus_id"
          class="filter-item"
          filterable
          clearable
          placeholder="候选人状态"
           @change="handleFilter"
        >
          <el-option
            v-for="item in candidateStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </a-col>
      <a-col :span="2">
           <el-select
          v-model="listQuery.position_id"
          class="filter-item"
          filterable
          clearable
          placeholder="职位筛选"
           @change="handleFilter"
        >
          <el-option
            v-for="item in position_list"
            :key="item.demandId"
            :label="item.positionName"
            :value="item.demandId"
          />
        </el-select>
      </a-col>
      <a-col :span="2">
         <el-select
              v-model="listQuery.user_id"
              class="filter-item"
              clearable
               filterable
              placeholder="用户过滤"
              @blur="handleContanctBlur"
              @change="handleFilter"
            >
              <el-option
                v-for="item in optionUserList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              />
            </el-select>
      </a-col>
      <a-col :span="2">
        <!-- 职位类别 -->
           <el-cascader
              v-model="listQuery.position_type"
              :show-all-levels="false"
              :options="categoryJobs"
              class="filter-item"
              expand-trigger="click"
              change-on-select
              filterable
              clearable
              placeholder="职位类别"
              ref="positionType"
              @change="positionTypeChange"
            />
      </a-col>
      <a-col :span="3">
          <el-cascader
              v-model="listQuery.dep_id"
              :show-all-levels="false"
              :options="department_list"
              :props="department_key"
              class="filter-item"
              expand-trigger="click"
              change-on-select
              filterable
              clearable
              placeholder="部门筛选"
              ref="departmentFilter"
              @change="positionChange"
            />
      </a-col>
       <!-- v-model="listQuery.city_id" -->
      <a-col :span="2">
        <el-cascader
         :value="getArryData(listQuery.city_id)"
          :multiple="true"
          :show-all-levels="true"
          :options="cityData"
          class="filter-item"
          expand-trigger="click"
          change-on-select
          filterable
          clearable
          placeholder="城市筛选"
          @change="cityChange"
        />
      </a-col>
      <a-col :span="4">
         <el-date-picker
          v-model="listQuery.daterange"
          style="width:100%"
          type="daterange"
          align="left"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions2"
          @change="dataPickerChange"
        />
      </a-col>
      <a-col :span="3">
         <el-button
          class="filter-item fr"
          type="primary"
          style="width: 90%"
          icon="el-icon-search"
          @click="handleFilter"
          >搜索</el-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<script>
import cityData from "@/configs/city_data.js";
import { getUserInfoList,getPositionsList } from "@api/manage/index";
import { getStructureList} from "@api/demandBranch/index";
import {
  getTreeList,
} from "@api/branchHC/index";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
export default {
  // 职位类别筛选
  name: 'FlowFilter',
  components: {},
  props: {},
  data() {
    return {
        pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
        cityData,
        listQuery:{
            title:"",
            position_id:undefined,
            user_id:undefined,
            position_type:undefined,
            dep_id:undefined,
            city_id:[],
            daterange:undefined,
            candidateStatus_id:undefined,
            taskStart:undefined,
            taskEnd:undefined
        },
        position_list:[],
        user_list:[],
        
         cityValue: [],
        categoryJobs:[],
        department_list:[],
        department_key: {
        value: "orgId",
        label: "orgName",
      },
      optionUserList:[],
      candidateStatus:[]
    }
  },
  created() {
    //点击回退的时候获取session，本地有session的话在搜索列表上渲染
     let candidateData = JSON.parse(window.sessionStorage.getItem('MycandidateData'))
     //如果session不存在则不渲染
     if (candidateData != null && candidateData != undefined) {
       
        this.listQuery.title=candidateData.title
        this.listQuery.position_id=candidateData.position_id
        this.listQuery.candidateStatus_id=candidateData.candidateStatus_id
        this.listQuery.user_id=candidateData.user_id
        this.listQuery.position_type=candidateData.position_type
        this.listQuery.dep_id=candidateData.dep_id
        this.listQuery.city_id=candidateData.city_id
        this.listQuery.taskStart=candidateData.taskStart
        this.listQuery.taskEnd=candidateData.taskEnd
        this.listQuery.daterange = candidateData.daterange
        window.sessionStorage.removeItem('MycandidateData')
        console.log(this.listQuery.city_id)
     }
    this.candidateStatus = this.$store.state.status.candidateProcesses
    this.getUserInfoListInit();
    this.getTreeListInit();
    this.getStructureListInit();
    this.getPositionsListInit();
  },
  methods: {
      getArryData(data) {
      //如果返回的类型是字符串，进行字符串拆分转成数组
      if (typeof(data) === 'string') {
        let temp = data.split(',')
        // console.log(temp)
        let temp1 = []
        
        for (let i = 0; i < temp.length; i++) {
          let temp3 = Number(temp[i])
          temp1.push(temp3)
        }
        return temp1
      } else {
        return data
      }
    },
    change(){
      console.log('fff')
    },
     filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    // 触发父组件方法执行搜索
    handleFilter() {
      this.$emit('handleFilter', this.listQuery)
    },
    //获取职位筛选列表
    getPositionsListInit(){
      getPositionsList().then(res=>{
        if(res.data.code==0){
          this.position_list = res.data.data
        }
      })
    },
    // 获取系统用户列表
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList();
        this.user_list = res.data.data.userList.list;
        this.optionUserList = [...this.user_list];
      } catch (error) {}
    },
     // 获取职位
    async getTreeListInit() {
      const res = await getTreeList();
      this.categoryJobs = res.data.data;
    },
     // 获取需求部门
    getStructureListInit() {
      getStructureList().then((res) => {
        if (res.data.code == 0) {
          this.department_list = this.getTreeData(res.data.data.orgList);
        } else {
        }
      });
    },
     positionTypeChange(value) {
      this.$nextTick(() => {
        const obj = this.$refs["positionType"].getCheckedNodes();
        if (obj.length > 0) {
          this.listQuery.position_type = obj[0].value;
        } else {
          this.listQuery.position_type = undefined;
        }
      });
    },
     positionChange(value) {
      this.$nextTick(() => {
        const obj = this.$refs["departmentFilter"].getCheckedNodes();
        if (obj.length > 0) {
          this.listQuery.dep_id = obj[0].value;
        } else {
          this.listQuery.dep_id = undefined;
        }
      });
    },
    cityChange(e){
      this.listQuery.city_id =  e.join(",");
      console.log(e)
    },
    dataPickerChange(value){
      if(value){
        this.listQuery.taskStart = value[0],
        this.listQuery.taskEnd = value[1]
      }else{
        this.listQuery.taskStart=undefined
        this.listQuery.taskEnd = undefined
      }
      
    },
     getTreeData(data) {
      // 循环遍历json数据
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
     handleContanctBlur() {
      this.optionUserList = this.user_list.slice(0, 100);
    }
  }
}
</script>

<style></style>
