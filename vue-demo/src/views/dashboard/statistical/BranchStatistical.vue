<template>
  <div class="position">
    <div class="position-head">
        <div class="position-time">
          <span style="margin-right: 10px;color:#000;"
            >部门</span
          >
          <a-select
            allowClear
            showSearch
            placeholder="请选择部门"
            v-model="deparmentId"
            @change="handleChange"
            style="width: 220px"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
          >
            <a-select-option
              :value="item.orgId"
              v-for="item in orgList"
              :key="item.orgId"
              >{{ item.orgName }}</a-select-option
            >
          </a-select>
        </div>
        <div class="position-time">
          <span style="margin:0 10px 0 20px;color:#000;"
            >事业部</span
          >
          <a-select
            allowClear
            showSearch
            :value="groupId"
            placeholder="请选择事业部"
            @change="handleGroupChange"
            style="width: 220px"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
          >
            <a-select-option
              :value="item.sysOrgId"
              v-for="item in groupList"
              :key="item.sysOrgId"
              >{{ item.orgName }}</a-select-option
            >
          </a-select>
        </div>
        <div class="position-time">
          <span style="margin:0 10px 0 20px;color:#000;"
            >年份</span
          >
          <a-select
            showSearch
            placeholder="请选择年份"
            v-model="yearValue"
            @change="handleDateChange"
            style="width: 220px"
            :getPopupContainer="
              (triggerNode) => {
                return triggerNode.parentNode || document.body;
              }
            "
            optionFilterProp="children"
          >
            <a-select-option
              :value="item"
              v-for="item in listYearOption"
              :key="item"
              >{{ item }} 年</a-select-option
            >
          </a-select>
        </div>
        <a-button
          :style="{
            marginLeft: '10px',
            marginTop:'5px',
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
          marginTop:'5px',
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
            marginTop:'5px',
            backgroundColor: '#22b8cf',
            border: '#22b8cf',
          }"
          @click="resetExportClick"
          type="primary"
          :loading="iconLoading"
        >
          导出
        </a-button>
        
       
    </div>
    <a-divider />
    <div class="position-main">
      <a-table
         bordered
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="loading"
        class="zebra"
        rowKey="month"
        :scroll="{ x: 1800, y: screenHeight - 350 }"
      >
      <template v-slot:satisfiedRate="satisfiedRate">
        <div>
          {{satisfiedRate}}%
        </div>
      </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getDepartmentSatisfaction,exportDepartmentSatisfaction } from "@api/statistical/index"
import download from "./index"
import { getStructureList } from "@api/demandBranch/index"
import { getPrimaryDepartment } from "@api/branchHC/index"
const columns = [
  {
    title: "需求发布月",
    dataIndex: "month",
    key: "month",
  },
  {
    title: "实际需求数",
    dataIndex: "realNum",
    key: "realNum",
  },
  {
    title: "已入职人数",
    dataIndex: "employNum",
    key: "employNum",
  },
  {
    title: "剩余在招需求",
    dataIndex: "remainingNum",
    key: "remainingNum",
    width: 130
  },
  {
    title: "满足率",
    dataIndex: "satisfiedRate",
    key: "satisfiedRate",
    scopedSlots: { customRender: "satisfiedRate" }
  },
  {
    title: "1月",
    dataIndex: "jan",
    key: "jan",
  },
  {
    title: "2月",
    dataIndex: "feb",
    key: "feb",
  },
  {
    title: "3月",
    dataIndex: "mar",
    key: "mar",
  },
  {
    title: "4月",
    dataIndex: "apr",
    key: "apr",
  },
  {
    title: "5月",
    dataIndex: "may",
    key: "may",
  },
  {
    title: "6月",
    dataIndex: "jun",
    key: "jun",
  },
  {
    title: "7月",
    dataIndex: "jul",
    key: "jul",
  },
  {
    title: "8月",
    dataIndex: "aug",
    key: "aug",
  },
  {
    title: "9月",
    dataIndex: "sep",
    key: "sep",
  },
  {
    title: "10月",
    dataIndex: "oct",
    key: "oct",
  },
  {
    title: "11月",
    dataIndex: "nov",
    key: "nov",
  },
  {
    title: "12月",
    dataIndex: "dec",
    key: "dec",
  },
];
      
const date = new Date().getFullYear();
export default {
  data() {
    return {
      columns,
      screenHeight: document.documentElement.clientHeight,
      data: [],
      loading: false,
      yearValue: date,
      deparmentId: undefined, // 部门筛选绑定
      groupId: undefined, // 部门筛选绑定
      orgList: [], // 部门数据
      groupList: [],
      listYearOption: [],
      iconLoading:false,
    };
  },
  mounted() {
    this.getDepartmentSatisfactionInit();
    this.getStructureListInit();
    this.getPrimaryDepartmentInit();
    this.dateInit()
    window.onresize = function () { // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight// 窗口高度
    }
  },
  methods: {
    // 搜索
    handleSearchSubmit(e) {
      this.getDepartmentSatisfactionInit()
    },
    //重置
    handleResetSubmit() {
       this.yearValue = date,
      this.deparmentId = undefined, // 部门筛选绑定
      this.groupId = undefined, // 部门筛选绑定
      this.getDepartmentSatisfactionInit()
    },
    handleChange(e) {
      this.deparmentId = e;
    },
    handleDateChange(e) {
      this.yearValue = e
    },
    handleGroupChange(e){
      this.groupId = e
    },
    // 获取部门列表
    async getStructureListInit() {
      try {
        const res = await getStructureList()
        this.orgList = res.data.data.orgList
      }
      catch(error) {}
    },
    async getPrimaryDepartmentInit() {
      try {
        const res = await getPrimaryDepartment()
        this.groupList = res.data.data
      }
      catch(error) {}
    },
    async getDepartmentSatisfactionInit() {
      try {
        this.loading = true
        const res = await getDepartmentSatisfaction({
          year: this.yearValue,
          orgId: this.deparmentId,
          groupId: this.groupId
        })
        this.loading = false
        if (res.data.data.length == []) {
          this.data = [];
        } else {
          let data = res.data.data
          let realNumTotal = 0;
          let employNumTotal = 0;
          let remainingNumTotal = 0;
          let janTotal = 0; let febTotal = 0; let marTotal = 0; let aprTotal = 0;
          let mayTotal = 0; let junTotal = 0; let julTotal = 0; let augTotal = 0;
          let sepTotal = 0; let octTotal = 0; let novTotal = 0; let decTotal = 0;
          data.map((item,key,arr) => {
            console.log(item.employNum,'item.employNum')
            if(item.employNum != 0 && item.realNum != 0 ){
              item.satisfiedRate = ((item.employNum / item.realNum ) * 100 ).toFixed(2)
            }else{
              item.satisfiedRate = 0;
            }
            realNumTotal += item.realNum
            employNumTotal += item.employNum
            remainingNumTotal += item.remainingNum
            janTotal += item.jan; febTotal += item.feb
            marTotal += item.mar; aprTotal += item.apr
            mayTotal += item.may; junTotal += item.jun
            julTotal += item.jul; augTotal += item.aug
            sepTotal += item.sep; octTotal += item.oct
            novTotal += item.nov; decTotal += item.dec
          })
          const totalRow = {
            month: '合计',
            realNum: realNumTotal,
            employNum: employNumTotal,
            remainingNum: remainingNumTotal,
            satisfiedRate: ((employNumTotal / realNumTotal ) * 100 ).toFixed(2),
            jan: janTotal, feb: febTotal, mar: marTotal,
            apr: aprTotal, may: mayTotal, jun: junTotal,
            jul: julTotal, aug: augTotal, sep: sepTotal,
            oct: octTotal, nov: novTotal, dec: decTotal,
          }
          const list = data && data.length > 0 ? [...data, totalRow] : []
          this.data = list;
        }
      }
      catch(error) {}
    },
    dateInit(){
      let data = new Date().getFullYear() - 10;
      this.listYearOption = [];
      for (let i = 20; i > -1; i--) {
          let num = data + i;
          this.listYearOption.push(num);
      }
    },
    // 导出
    async resetExportClick() {
      try {
        this.iconLoading = true;
        const res = await exportDepartmentSatisfaction({
          year: this.yearValue,
          orgId: this.deparmentId,
          groupId: this.groupId
        })
        this.iconLoading = false;
        download(res.data,'部门满足情况')
      }
      catch(error) {
        this.iconLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.position {
  background: #fff;
  padding: 22px;
  min-height: 100%;
}
/* .position >>> .ant-table-thead > tr > th {
  border-bottom: 0;
  color: rgba(132, 145, 158, 1);
  font-weight: bold;
  cursor: pointer;
}

.position >>> .ant-table-tbody > tr > td {
  border-bottom: 0;
  border-right: 1px solid #f0f0f0;
} */
.position-head {
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;
}
.position-time{
  padding: 5px;
}
.position-main {
  margin-top: 20px;
}
</style>
