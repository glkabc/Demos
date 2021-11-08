<template>
  <div>
    <a-row>
      <a-col :span="24">
        <span class="position-name">任务名称</span>
        <a-input
          @change="handleCodeChange"
          placeholder="请输入任务名称"
          allowClear
          :value="taskName"
          class="account-form-head"
        />
        <span class="position-name position-thrid">任务编号</span>
        <a-input
          @change="handleIdCardChange"
          placeholder="请输入任务编号"
          :value="taskCode"
          allowClear
          class="account-form-head"
        />
        <span class="position-name">工作地点</span>
        <a-input
          @change="handleSpecialChange"
          placeholder="请输入工作地点"
          allowClear
          :value="workPlace"
          class="account-form-head"
        />
      </a-col>
      <a-col :span="24" style="margin-top: 20px">
        <span class="position-name">需求部门</span>
        <a-cascader
          allowClear
          class="account-form-head"
          :options="companyAllList"
          :value="demartmentId"
          @change="handleDepartmentChange"
          :fieldNames="{ label: 'orgName', value: 'orgId', children: 'orgList' }"
          placeholder="请选择需求部门"
          :getPopupContainer="
            triggerNode => {
              return triggerNode.parentNode || document.body;
            }
          "
          />
        <a-button
          :style="{
            marginLeft: '8px',
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
            marginLeft: '8px',
            backgroundColor: '#22b8cf',
            border: '#22b8cf',
          }"
          @click="handleExportSubmit"
          type="primary"
        >
          重置
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getAllInfo } from "@api/statistical/index";
import moment from 'moment';
export default {
  data() {
    return {
      taskName: undefined, // 任务名称
      taskCode: undefined, // 任务编号
      demartmentId: undefined, // 需求部门
      workPlace: undefined, // 工作地点
      companyAllList: [], // 需求部门数据
    };
  },
  mounted() {
    this.getAllInfoInit()
  },
  methods: {
		moment,
    // 搜索
    handleSearchSubmit() {
      this.$emit('handleSearch')
    },
    // 重置
    handleExportSubmit() {
      this.taskName = undefined
      this.taskCode = undefined
      this.demartmentId = undefined
      this.workPlace = undefined
      this.$emit('update:taskName','')
      this.$emit('update:taskCode','')
      this.$emit('update:demartmentId','')
      this.$emit('update:workPlace','')
    },
    // 任务名称
    handleCodeChange(e) {
      this.taskName = e.target.value
      this.$emit('update:taskName',e.target.value)
    },
    // 任务编号
    handleIdCardChange(e) {      
      this.taskCode = e.target.value
      this.$emit('update:taskCode',e.target.value)
    },
    // 需求部门
    handleDepartmentChange(value) {
      this.demartmentId = value
      this.$emit('update:demartmentId',value[1])
    },
    // 工作地点
    handleSpecialChange(e) {
      this.workPlace = e.target.value
      this.$emit('update:workPlace',e.target.value)
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

<style scoped>
.position-name {
  margin: 0 10px 0 5px;
  color: #78909c;
  font-weight: 600;
  text-align: right;
  width: 70px;
  display: inline-block
}
.position-post {
  width: 110px;
}
.account-form-head {
  width: 280px;
  margin-right: 5px;
}
</style>
