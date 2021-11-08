<template>
  <div class="demand-track-container">
    <a-row class="new-demand-header">
      <a-col :span="24">
        <a-tabs
          size="large"
          :defaultActiveKey="defaultModel"
          @change="handleTabsChange"
        >
          <a-tab-pane v-for="item in tabList" :key="item.key">
            <span slot="tab" class="tab-title">
              <div>{{ item.title }}</div>
            </span>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
    <div class="demand-track">
      <a-row>
        <a-col :span="24">
          <a-table
            v-if="data != null"
            class="demand-track-table zebra"
            :columns="columns"
            :dataSource="data"
            :pagination="false"
            :rowKey="record => record.partitionId"
            defaultExpandAllRows
          >
            <span slot="emergencyLevel" slot-scope="text">
              <a-tag v-if="text == 1" color="blue">一般</a-tag>
              <a-tag v-if="text == 2" color="orange">紧急</a-tag>
              <a-tag v-if="text == 3" color="red">特急</a-tag>
            </span>
            <template slot="expandedRowRender" slot-scope="record">
              <a-table
                class="zebra"
                :columns="soltcolumns"
                :dataSource="record.demandDistribution"
                :pagination="false"
                :showHeader="false"
                :rowKey="record => record.distributionId"
              >
                <span slot="emergencyLevel" slot-scope="text">
                  <a-tag v-if="text == 1" color="blue">一般</a-tag>
                  <a-tag v-if="text == 2" color="orange">紧急</a-tag>
                  <a-tag v-if="text == 3" color="red">特急</a-tag>
                </span>
              </a-table>
            </template>
          </a-table> 
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getDemand, getDemandPartitionDistribution } from '@api/branchHC/index';
const columns = [
  {
    title: '职位名称',
    dataIndex: 'positionName',
    key: 'positionName',
    width: '120px',
  },
  {
    title: '总招聘人数',
    dataIndex: 'recruitNum',
    key: 'recruitNum',
    width: '110px',
    align: 'center',
    sorter: (a, b) => {
      var stringA = a.recruitNum.toUpperCase(); // ignore upper and lowercase
      var stringB = b.recruitNum.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  },
  {
    title: '招聘专员',
    dataIndex: 'resumeFilterName',
    key: 'resumeFilterName',
    width: '90px'
  },
  {
    title: '需招人数',
    dataIndex: 'allocatedNum',
    key: 'allocatedNum',
    width: '90px',
    align: 'center',
    sorter: (a, b) => {
      var stringA = a.allocatedNum.toUpperCase(); // ignore upper and lowercase
      var stringB = b.allocatedNum.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  },
  {
    title: '已招人数',
    dataIndex: 'alreadyRecruits',
    key: 'alreadyRecruits',
    width: '90px',
    align: 'center',
    sorter: (a, b) => {
      var stringA = a.alreadyRecruits.toUpperCase(); // ignore upper and lowercase
      var stringB = b.alreadyRecruits.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  },
  {
    title: '紧急程度',
    dataIndex: 'emergencyLevel',
    key: 'emergencyLevel',
    width: '100px',
    align: 'center',
    scopedSlots: { customRender: 'emergencyLevel' },
    sorter: (a, b) => {
      var stringA = a.emergencyLevel.toUpperCase(); // ignore upper and lowercase
      var stringB = b.emergencyLevel.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  },
  {
    title: '开始日期',
    dataIndex: 'taskStart',
    key: 'taskStart',
    width: '100px',
    align: 'center',
    sorter: (a, b) => {
      var stringA = a.taskStart.toUpperCase(); // ignore upper and lowercase
      var stringB = b.taskStart.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  },
  {
    title: '结束日期',
    dataIndex: 'taskEnd',
    key: 'taskEnd',
    width: '100px',
    align: 'center',
    sorter: (a, b) => {
      var stringA = a.taskEnd.toUpperCase(); // ignore upper and lowercase
      var stringB = b.taskEnd.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  }
];
const soltcolumns = [
  { 
    title: '职位名称',
    dataIndex: 'name',
    key: 'name',
    width: '120px',
  },
  { 
    title: '总招聘人数',
    dataIndex: 'total',
    key: 'total',
    width: '110px',
    align: 'center',
    sorter: (a, b) => {
      var stringA = a.total.toUpperCase(); // ignore upper and lowercase
      var stringB = b.total.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    },
  },
  {
    title: '招聘专员',
    dataIndex: 'specialistName',
    key: 'specialistName',
    width: '90px'
  },
  {
    title: '需招人数',
    dataIndex: 'recruitNum',
    key: 'recruitNum',
    width: '90px',
    align: 'center',
    sorter: (a, b) => {
      var stringA = a.recruitNum.toUpperCase(); // ignore upper and lowercase
      var stringB = b.recruitNum.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  },
  {
    title: '已招人数',
    dataIndex: 'employNum',
    key: 'employNum',
    width: '90px',
    align: 'center',
    sorter: (a, b) => {
      var stringA = a.employNum.toUpperCase(); // ignore upper and lowercase
      var stringB = b.employNum.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  },
  {
    title: '紧急程度',
    dataIndex: 'emergencyLevel',
    key: 'emergencyLevel',
    align: 'center',
    width: '100px',
    scopedSlots: { customRender: 'emergencyLevel' },
    sorter: (a, b) => {
      var stringA = a.emergencyLevel.toUpperCase(); // ignore upper and lowercase
      var stringB = b.emergencyLevel.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  },
  {
    title: '开始日期',
    dataIndex: 'taskStart',
    key: 'taskStart',
    width: '100px',
    align: 'center',
    sorter: (a, b) => {
      var stringA = a.taskStart.toUpperCase(); // ignore upper and lowercase
      var stringB = b.taskStart.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  },
  {
    title: '结束日期',
    dataIndex: 'taskEnd',
    key: 'taskEnd',
    width: '100px',
    align: 'center',
    sorter: (a, b) => {
      var stringA = a.taskEnd.toUpperCase(); // ignore upper and lowercase
      var stringB = b.taskEnd.toUpperCase(); // ignore upper and lowercase
      if (stringA < stringB) {
          return -1;
      }
      if (stringA > stringB) {
          return 1;
      }
      // names must be equal
      return 0;
    }
  }
];
export default {
  data() {
    return {
      defaultModel: 4,
      tabList: [
        {
          key: 1,
          title: "① 需求信息"
        },
        {
          key: 2,
          title: "② 需求内容"
        },
        {
          key: 3,
          title: "③ 需求分配"
        },
        {
          key: 4,
          title: "④ 需求跟踪"
        }
      ],
      data: null,
      columns,
      soltcolumns,
      emergencyLevel: null,
      name: [],
      uniqueName: [],
    };
  },
  created() {
    this.getDemand()
    this.getDemandPartitionDistribution()
  },
  methods: {
    getDemand() {
      getDemand({
        demandId: Number(this.$route.query.demandId)
      }).then(res => {
        if(res.data.code == 0) {
          this.emergencyLevel = res.data.data.demand.emergencyLevel
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getDemandPartitionDistribution() {
      getDemandPartitionDistribution({
        demandId: Number(this.$route.query.demandId)
      }).then(res => {
        console.log(res.data.data.demandPartitionList)
        if(res.data.code == 0) {
          this.data = res.data.data.demandPartitionList
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleTabsChange(e) {
      console.log(e)
      this.defaultModel = e;
      if (e == 1) {
        this.$router.push(
          {
            name: 'DemandInfo',
            query: {
              demandId: Number(this.$route.query.demandId)
            }
          }
        )
      } else if (e == 2) {
        this.$router.push(
          {
            name: 'DemandContent',
            query: {
              demandId: Number(this.$route.query.demandId)
            }
          }
        )
      } else if (e == 3) {
        this.$router.push(
          {
            name: 'DemandReview',
            query: {
              demandId: Number(this.$route.query.demandId)
            }
          }
        )
      } else if (e == 4) {
        this.$router.push(
          {
            name: 'DemandTrack',
            query: {
              demandId: Number(this.$route.query.demandId)
            }
          }
        )
      } else {
        return
      }
    }
  }
};
</script>

<style scoped>
.demand-track-container {
  height: 90%;
  min-height: 90%;
}
.new-demand-header {
  background-color: #fff !important;
  text-align: center;
}
.demand-track {
  background-color: #fff !important;
  padding-top: 10px;
  min-height: 100%;
  position: relative;
}
.demand-track-table {
  margin: 20px;
  min-height: 100%;
}
</style>
<style>
.demand-track-container .tab-title {
  font-size: 20px;
  color: #333;
}
.demand-track-container .ant-tabs-tab-active {
  font-size: 20px;
  color: #1478e3;
}
.demand-track-container .ant-tabs-tab-active .tab-title{
  font-size: 20px;
  color: #1478e3;
}
.demand-track-container .ant-table-thead > tr > th {
	border-bottom: none;
}
.demand-track-container .ant-table-tbody > tr > td {
  border-bottom: none;
  border-left: 1px solid #f0f0f0;
}
.demand-track-container .ant-table-tbody > tr > td:first-child {
  border-left: none;
}
.demand-track-container .tab-title {
  font-size: 20px;
  /* font-weight: bold; */
  color: #333;
}
</style>