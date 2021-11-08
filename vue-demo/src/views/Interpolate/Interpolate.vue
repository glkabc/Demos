<template>
  <div class="interpolate">
    <user-head
      :taskName.sync="taskName"
      :taskCode.sync="taskCode"
      :demartmentId.sync="demartmentId"
      :workPlace.sync="workPlace"
      @handleSearch="handleSearch"
    />
    <userForm
      :show.sync="show"
      :distributionId="distributionId"
      :intrDemandId="intrDemandId"
    />
    <div class="position-main">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        class="zebra"
        rowKey="id"
        @change="onShowSizeChange"
      >
        <!-- <template v-slot:jobRespons="jobRespons">
          <pre>{{ jobRespons }}</pre>
        </template> -->
        <span slot="action" slot-scope="record, item">
          <a @click="handleMateClick(item)">推荐简历</a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import userHead from './components/UserHead'
import userForm from './components/UserForm'
import { getIntroversionDemandList } from '@api/Interpolate/index'
const columns = [
  {
    title: '任务名称',
    dataIndex: 'positionName',
    ellipsis: true,
    key: 'positionName',
  },
  {
    title: '任务编号',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: '工作地点',
    dataIndex: 'workPlace',
    key: 'workPlace',
  },
  {
    title: '需求部门',
    dataIndex: 'organizeName',
    key: 'organizeName',
    ellipsis: true,
  },
  {
    title: '岗位职责',
    dataIndex: 'jobRespons',
    ellipsis: true,
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
  },
]
export default {
  components: {
    userHead,
    userForm,
  },
  data() {
    return {
      taskName: undefined, // 任务名称
      taskCode: undefined, // 任务编号
      demartmentId: undefined, // 需求部门
      workPlace: undefined, // 工作地点
      columns,
      data: [],
      pagination: {
        current: 1,
        pageSizeOptions: ['10', '20', '30', '40'],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      loading: false,
      intrDemandId: '', // 推荐简历弹窗
      distributionId: '', // 推荐简历弹窗
      show: false,
    }
  },
  mounted() {
    this.getIntroversionDemandListInit()
  },
  methods: {
    // 搜索
    handleSearch(e) {
      this.getIntroversionDemandListInit()
    },
    async getIntroversionDemandListInit() {
      try {
        this.loading = true
        const res = await getIntroversionDemandList({
          pageSize: this.pagination.pageSize,
          pageNum: this.pagination.current,
          positionName: this.taskName,
          no: this.taskCode,
          organizeId: this.demartmentId,
          workPlace: this.workPlace
        })
        this.loading = false
        if(res.data.code === 0 ){
          this.data = res.data.data.demandList
          this.pagination.total = res.data.data.meta.size
        }
      }catch(error) {
        console.log(error)
        this.loading = false
      }
    },
    // 推荐简历
    handleMateClick(e) {
      this.show = true
      this.intrDemandId = e.intrDemandId
      this.distributionId = e.distributionId
    },
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize
    },
  },
}
</script>

<style scoped>
.interpolate {
  padding: 20px;
}

.interpolate >>> .ant-table-thead > tr > th {
  border-bottom: 0;
  color: rgba(132, 145, 158, 1);
  font-weight: bold;
  cursor: pointer;
}
.interpolate >>> .ant-table-tbody > tr > td {
  border-bottom: 0;
  border-right: 1px solid #f0f0f0;
}
.position-main {
  margin-top: 20px;
}
</style>
