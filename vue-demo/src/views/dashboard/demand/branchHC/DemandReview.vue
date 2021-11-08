<template>
  <div class="demand-review-container">
    <!-- <a-row class="new-demand-header">
      <a-col :span="24">
        <a-tabs
          size="large"
          :defaultActiveKey="defaultModel"
          @change="handleTabsChange"
          :tabBarStyle="{margin: '0px'}"
        >
          <a-tab-pane v-for="item in tabList" :key="item.key">
            <span slot="tab" class="tab-title">
              <div>{{ item.title }}</div>
            </span>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row> -->
    <div class="demand-review">
      <a-row>
        <a-col :span="24">
          <div class="demandreview">
            <div class="count-box">
              <div class="count-left">
                <img src="../../../../assets/images/job.png" alt="">
                <span class="text">招聘总数</span>
                <span class="number">{{ recruittotal }}</span>
              </div>
              <div class="count-right">
                <img src="../../../../assets/images/branch2.png" alt="">
                <span class="text">待分配数</span>
                <span class="number">{{ waitAllocateNum }}</span>
              </div>
            </div>
            <!-- <span>
              招聘总数：
              <span style="font-size: 18px;color:#fec16f;font-weight: 500;">{{ recruittotal }}</span>
            </span>
            <span style="margin-left: 15px">
              待分配数：
              <span style="font-size: 18px;color: #fd555c;font-weight: 500">{{ waitAllocateNum }}</span>
            </span> -->
          </div>
        </a-col>
        <!-- <a-col :span="12" class="demand-review-right" v-if="state > 0">
          <div class="reviewer-text">
            审核人：{{ demandAuditor }}
          </div>
          <div class="audited">已审核</div> 
        </a-col> -->
      </a-row>
      <template>
        <a-table
          v-if="data != null"
          class="demandreview-table zebra"
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
          <span slot="action" slot-scope="text, item">
            <can-i-use code="xqzx-bmhc-xqfp">
              <a
                v-if="item.allocatedNum < item.recruitNum"
                @click="handleDistribute(item.partitionId)"
              >分配</a>
            </can-i-use>
            <a v-if="item.allocatedNum === item.recruitNum" @click="handleView(item.partitionId)">查看</a>
          </span>
          <template slot="expandedRowRender" slot-scope="record">
            <!-- old -->
            <!-- <a-table
              class="zebra"
              :columns="soltcolumns"
              :dataSource="record.demandDistribution"
              :pagination="false"
              :showHeader="false"
              :rowKey="record => record.distributionId"
              >
              <template slot="emergencyLevel" slot-scope="text">
                <a-tag v-if="text == 1" color="blue">一般</a-tag>
                <a-tag v-if="text == 2" color="orange">紧急</a-tag>
                <a-tag v-if="text == 3" color="red">特急</a-tag>
              </template>
            </a-table> -->
            <a-form :form="distributeForm" @submit="handleDistributeSubmit" style="margin:-16px">
              <a-table
                class="zebra"
                :columns="soltcolumns"
                :dataSource="record.demandDistribution"
                :showHeader="false"
                :pagination="false"
                :loading="loading"
                :rowKey="record => record.distributionId"
                >
                <template slot="recruitNum" slot-scope="text, record">
                  <a-form-item>
                    <a-input-number
                      v-if="record.editable"
                      :min="0"
                      v-decorator="['recruitNum',{initialValue: Number(text)}]"
                      placeholder="招聘人数"
                      @change="handleInputNumberChange($event, record.distributionId, innercolumns[0].dataIndex)"
                    />
                    <template v-else>{{ text }}</template>
                  </a-form-item>
                </template>
                <template slot="specialistName" slot-scope="text, record">
                  <a-form-item>
                    <a-select
                      style="width: 85px;"
                      v-if="record.editable"
                      allowClear
                      v-decorator="['recruiter',{initialValue: text }]"
                      placeholder="请选择"
                      :getPopupContainer="
                        triggerNode => {
                          return triggerNode.parentNode || document.body;
                        }
                      "
                      @change="handleSelectChange1($event, record.distributionId, innercolumns[1].dataIndex)"
                    >
                      <a-select-option
                        :value="item.userId"
                        v-for="item in recruiterList"
                        :key="item.userId"
                      >{{ item.userName }}</a-select-option>
                    </a-select>
                    <template v-else>{{ text }}</template>
                  </a-form-item>
                </template>
                <template slot="emergencyLevel" slot-scope="text, record">
                  <a-form-item>
                    <a-select
                      style="width: 85px;"
                      v-if="record.editable"
                      allowClear
                      v-decorator="['emergencyLevel',{initialValue: text }]"
                      placeholder="请选择"
                      :getPopupContainer="
                        triggerNode => {
                          return triggerNode.parentNode || document.body;
                        }
                      "
                      @change="handleSelectChange2($event, record.distributionId, innercolumns[2].dataIndex)"
                    >
                      <a-select-option
                        :value="item.value"
                        v-for="item in levelList"
                        :key="item.value"
                      >{{ item.label }}</a-select-option>
                    </a-select>
                    <template v-else>
                      <a-tag v-if="text == 1" color="blue">一般</a-tag>
                      <a-tag v-if="text == 2" color="orange">紧急</a-tag>
                      <a-tag v-if="text == 3" color="red">特急</a-tag>
                    </template>
                  </a-form-item>
                </template>
                <template slot="taskStart" slot-scope="text, record">
                  <a-form-item>
                    <a-date-picker
                      v-if="record.editable"
                      allowClear
                      :disabledDate="disabledDate"
                      v-decorator="['taskStart',{initialValue: moment(text) }]"
                      :getCalendarContainer="
                        triggerNode => {
                          return triggerNode.parentNode || document.body;
                        }
                      "
                      format="YYYY-MM-DD"
                      @change="onDatePickerChange1($event, record.distributionId, innercolumns[3].dataIndex)"
                    />
                    <template v-else>{{ text }}</template>
                  </a-form-item>
                </template>
                <template slot="taskEnd" slot-scope="text, record">
                  <a-form-item>
                    <a-date-picker
                      v-if="record.editable"
                      allowClear
                      :disabledDate="disabledDate"
                      v-decorator="['taskEnd',{initialValue: moment(text) }]"
                      :getCalendarContainer="
                        triggerNode => {
                          return triggerNode.parentNode || document.body;
                        }
                      "
                      format="YYYY-MM-DD"
                      @change="onDatePickerChange2($event, record.distributionId, innercolumns[4].dataIndex)"
                    />
                    <template v-else>{{ text }}</template>
                  </a-form-item>
                </template>
                <template slot="action" slot-scope="text, record">
                  <template v-if="record.editable">
                    <a
                      v-if="is_save"
                      @click="handleUpdate(record)"
                    >更新</a>
                    <a v-else @click="handleSave(record)">保存</a>
                  </template>
                  <template v-else>
                    <a
                      @click="handleEdit(record.distributionId)"
                      :disabled="editingKey !== ''"
                    >编辑</a>
                    <a-divider type="vertical" />
                    <a
                      @click="handleDelete(record.distributionId)"
                      :disabled="editingKey !== ''"
                    >删除</a>
                  </template>
                </template>
              </a-table>
            </a-form>
          </template>
        </a-table>
      </template>
      <a-affix :offsetBottom="0">
        <div class="bottom">
          <can-i-use code="xqzx-bmhc-xqfb">
            <a-button
              v-if="waitAllocateNum === 0 && state === 1"
              class="bottom-btn2"
              @click="handlePublish"
            >
              发布
            </a-button>
            <!-- <a-button
              v-else
              disabled
              style="background: #d5d5d5; border: #d5d5d5; color: #fff;"
            >
              发布
            </a-button> -->
          </can-i-use>
        </div>
      </a-affix>
    </div>

    <!-- 分配、查看弹框 -->
    <a-modal
      v-model="distributeVisible"
      title="需求分配"
      width="1000px"
      wrapClassName="distribute-modal"
      :bodyStyle="{
        height: '450px',
        overflowY: 'auto'
      }"
      :footer="null"
      :afterClose="affterDistributeModalClose"
    >
      <a-form :form="distributeForm" @submit="handleDistributeSubmit">
        <a-table
          class="zebra"
          :columns="innercolumns"
          :dataSource="innerdata"
          :pagination="false"
          :loading="loading"
        >
          <template slot="recruitNum" slot-scope="text, record">
            <a-form-item>
              <a-input-number
                v-if="record.editable"
                :min="0"
                v-decorator="['recruitNum',{initialValue: Number(text)}]"
                placeholder="招聘人数"
                @change="handleInputNumberChange($event, record.distributionId, innercolumns[0].dataIndex)"
              />
              <template v-else>{{ text }}</template>
            </a-form-item>
          </template>
          <template slot="specialistName" slot-scope="text, record">
            <a-form-item>
              <a-select
                style="width: 85px;"
                v-if="record.editable"
                allowClear
                v-decorator="['recruiter',{initialValue: text }]"
                placeholder="请选择"
                :getPopupContainer="
                  triggerNode => {
                    return triggerNode.parentNode || document.body;
                  }
                "
                @change="handleSelectChange1($event, record.distributionId, innercolumns[1].dataIndex)"
              >
                <a-select-option
                  :value="item.userId"
                  v-for="item in recruiterList"
                  :key="item.userId"
                >{{ item.userName }}</a-select-option>
              </a-select>
              <template v-else>{{ text }}</template>
            </a-form-item>
          </template>
          <template slot="emergencyLevel" slot-scope="text, record">
            <a-form-item>
              <a-select
                style="width: 85px;"
                v-if="record.editable"
                allowClear
                v-decorator="['emergencyLevel',{initialValue: text }]"
                placeholder="请选择"
                :getPopupContainer="
                  triggerNode => {
                    return triggerNode.parentNode || document.body;
                  }
                "
                @change="handleSelectChange2($event, record.distributionId, innercolumns[2].dataIndex)"
              >
                <a-select-option
                  :value="item.value"
                  v-for="item in levelList"
                  :key="item.value"
                >{{ item.label }}</a-select-option>
              </a-select>
              <template v-else>
                <a-tag v-if="text == 1" color="blue">一般</a-tag>
                <a-tag v-if="text == 2" color="orange">紧急</a-tag>
                <a-tag v-if="text == 3" color="red">特急</a-tag>
              </template>
            </a-form-item>
          </template>
          <template slot="taskStart" slot-scope="text, record">
            <a-form-item>
              <a-date-picker
                v-if="record.editable"
                allowClear
                :disabledDate="disabledDate"
                v-decorator="['taskStart',{initialValue: moment(text) }]"
                :getCalendarContainer="
                  triggerNode => {
                    return triggerNode.parentNode || document.body;
                  }
                "
                format="YYYY-MM-DD"
                @change="onDatePickerChange1($event, record.distributionId, innercolumns[3].dataIndex)"
              />
              <template v-else>{{ text }}</template>
            </a-form-item>
          </template>
          <template slot="taskEnd" slot-scope="text, record">
            <a-form-item>
              <a-date-picker
                v-if="record.editable"
                allowClear
                :disabledDate="disabledDate"
                v-decorator="['taskEnd',{initialValue: moment(text) }]"
                :getCalendarContainer="
                  triggerNode => {
                    return triggerNode.parentNode || document.body;
                  }
                "
                format="YYYY-MM-DD"
                @change="onDatePickerChange2($event, record.distributionId, innercolumns[4].dataIndex)"
              />
              <template v-else>{{ text }}</template>
            </a-form-item>
          </template>
          <template slot="action" slot-scope="text, record">
            <template v-if="record.editable">
              <a
                v-if="is_save"
                @click="handleUpdate(record)"
              >更新</a>
              <a v-else @click="handleSave(record)">保存</a>
            </template>
            <template v-else>
              <a
                @click="handleEdit(record.distributionId)"
                :disabled="editingKey !== ''"
              >编辑</a>
              <a-divider type="vertical" />
              <a
                @click="handleDelete(record.distributionId)"
                :disabled="editingKey !== ''"
              >删除</a>
            </template>
          </template>
        </a-table>
        <a-button
          v-if="addBtnShow"
          class="editable-add-btn"
          type="dashed"
          icon="plus"
          @click="handleAdd"
        >
          {{ innerdata.length == 0 ? '分配' : '继续分配' }}
        </a-button>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment';
import {
  getDemand,
  getUserInfo,
  getDemandDistribution,
  getDemandPartitionDistribution,
  addDemandDistribution,
  updateDemandDistribution,
  deletedemandDistribution,
  postDemand
} from '@api/branchHC/index';
const columns = [
  { 
    title: '职位名称',
    dataIndex: 'positionName',
    key: 'positionName',
    width: '130px'
  },
  { 
    title: '招聘人数',
    dataIndex: 'recruitNum',
    key: 'recruitNum',
    align: 'right',
    width: '90px'
  },
  { 
    title: '分配人数',
    dataIndex: 'allocatedNum',
    key: 'allocatedNum',
    align: 'right',
    width: '90px'
  },
  {
    title: '招聘负责人',
    dataIndex: 'resumeFilterName',
    key: 'resumeFilterName',
    width: '90px' 
  },
  { 
    title: '紧急程度',
    dataIndex: 'emergencyLevel',
    key: 'emergencyLevel',
    align: 'center',
    width: '80px',
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
    align: 'center',
    width:'90px',
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
    title: '目标完成日期',
    dataIndex: 'taskEnd',
    key: 'taskEnd',
    align: 'center',
    width:'120px',
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
  },
  { 
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width:'90px',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
];
const innercolumns = [
  {
    title: '招聘人数',
    dataIndex: 'recruitNum',
    key: 'recruitNum',
    align: 'center',
    width: '90px',
    scopedSlots: { customRender: 'recruitNum' }
  },
  {
    title: '招聘专员',
    dataIndex: 'specialistName',
    key: 'specialistName',
    width: '90px',
    scopedSlots: { customRender: 'specialistName' }
  },
  {
    title: '紧急程度',
    dataIndex: 'emergencyLevel',
    key: 'emergencyLevel',
    align: 'center',
    width: '90px',
    scopedSlots: { customRender: 'emergencyLevel' }
  },
  { 
    title: '开始日期',
    dataIndex: 'taskStart',
    key: 'taskStart',
    align: 'center',
    width:'120px',
    scopedSlots: { customRender: 'taskStart' }
  },
  { 
    title: '目标完成日期',
    dataIndex: 'taskEnd',
    key: 'taskEnd',
    align: 'center',
    width:'120px',
    scopedSlots: { customRender: 'taskEnd' }
  },
  { 
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width:'120px',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
];
const soltcolumns = [
  { 
    title: '职位名称',
    dataIndex: 'positionName',
    key: 'positionName',
    width: '130px'
  },
  { 
    title: '招聘人数',
    dataIndex: 'perNumber',
    key: 'perNumber',
    align: 'center',
    width: '91px'
  },
  {
    title: '分配人数',
    dataIndex: 'recruitNum',
    key: 'recruitNum',
    align: 'right',
    width: '90px'
  },
  {
    title: '招聘专员',
    dataIndex: 'specialistName',
    key: 'specialistName',
    width: '90px'
  },
  {
    title: '紧急程度',
    dataIndex: 'emergencyLevel',
    key: 'emergencyLevel',
    align: 'center',
    width: '80px',
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
    align: 'center',
    width:'90px',
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
    title: '目标完成日期',
    dataIndex: 'taskEnd',
    key: 'taskEnd',
    align: 'center',
    width:'120px',
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
  },
  { 
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width:'90px',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
];
export default {
  data() {
    return {
      moment,
      defaultModel: 3,
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
      loading: false,
      emergencyLevel: null,
      recruittotal: 0,
      waitAllocateNum: 0,
      demandAuditor: '',
      expandedRowKeys: [],
      data: null,
      innerdata: [],
      columns,
      innercolumns,
      soltcolumns,
      editingKey: '',
      partitionId: null,
      distributeVisible: false,
      distributeForm: this.$form.createForm(this),
      count: 0,
      addBtnShow: true,
      is_save: false,
      recruiterList: [],
      levelList: [],
      isPublish: false,
      state: null,
    }
  },
  created() {
    this.getDemandPartitionDistribution()
    this.getDemand()
  },
  methods: {
    getDemand() {
      getDemand({
        demandId: Number(this.$route.query.demandId)
      }).then(res => {
        if(res.data.code == 0) {
          console.log(res.data.data.demand)
          this.state = res.data.data.demand.state
          this.demandAuditor = res.data.data.demand.demandAuditorName
          this.emergencyLevel = res.data.data.demand.emergencyLevel
        }
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    getUserInfo() {
      getUserInfo().then(res => {
        if(res.data.code == 0) {
          this.recruiterList = res.data.data.userList.list
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getDemandPartitionDistribution() {
      getDemandPartitionDistribution({
        demandId: Number(this.$route.query.demandId)
      }).then(res => {
        if(res.data.code == 0) {
          this.recruittotal = res.data.data.count.zhaoPinAll
          this.waitAllocateNum = res.data.data.count.tobeAllocated
          this.data = res.data.data.demandPartitionList
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getDemandDistribution(id) {
      this.loading = true
      getDemandDistribution({
        partitionId: id
      }).then(res => {
        this.innerdata = res.data.data.demandDistributionList
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    handleTabsChange(e) {
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
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    },   
    // 分配
    handleDistribute(id) {
      this.distributeVisible = true
      this.getDemandDistribution(id)
      this.partitionId = id
      this.editingKey = ''
      this.is_save = false
      this.addBtnShow = true
    },
    // 查看
    handleView(id) {
      this.distributeVisible = true
      this.getDemandDistribution(id)
      this.addBtnShow = false
    },
    // 编辑
    handleEdit(id) {
      this.getUserInfo()
      this.levelList = this.$store.state.status.emergencyLevels
      this.editingKey = id;
      const newData = [...this.innerdata];
      const target = newData.filter(item => id === item.distributionId)[0];
      if (target) {
        target.editable = true;
        this.innerdata = newData;
      }
      this.addBtnShow = false
      this.is_save = true
    },
    // 更新
    handleUpdate(record) {
      this.distributeForm.validateFields((error, fieldsValue) => {
        if(error) {
          console.log('error', error);
          return
        }
        const values = {
          ...fieldsValue,
          'taskStart' : fieldsValue['taskStart'] ? fieldsValue['taskStart'].format('YYYY-MM-DD') : undefined,
          'taskEnd' : fieldsValue['taskEnd'] ? fieldsValue['taskEnd'].format('YYYY-MM-DD') : undefined,
        }
        updateDemandDistribution({
          partitionId: this.partitionId,
          distributionId: record.distributionId,
          recruitNum: values.recruitNum,
          emergencyLevel: values.emergencyLevel,
          taskStart: values.taskStart,
          taskEnd: values.taskEnd
        }).then(res => {
          if(res.data.code == 0) {
            record.editable = false
            this.editingKey = ''
            this.addBtnShow = true
            this.$message.success(res.data.data);
            this.getDemandDistribution(this.partitionId)
          } else {
            record.editable = false
            this.editingKey = ''
            this.addBtnShow = true
            this.$message.error(res.data.mesg)
            this.getDemandDistribution(this.partitionId)
          }
        }).catch(err => {
          record.editable = false
          this.editingKey = ''
          this.addBtnShow = true
          this.$message.error(res.data.mesg)
          this.getDemandDistribution(this.partitionId)
          console.log(err)
        })
      });
    },
    // 新增
    handleAdd() {
      const { count, innerdata } = this;
      const newData = {
        distributionId: count,
        recruitNum: null,
        specialistName: undefined,
        emergencyLevel: undefined,
        taskStart:  `${moment().format('YYYY-MM-DD')}`,
        taskEnd: `${moment().format('YYYY-MM-DD')}`,
      };
      this.innerdata = [...innerdata, newData];
      this.getUserInfo()
      this.levelList = this.$store.state.status.emergencyLevels
      this.editingKey = count;

      const newEditData = [...this.innerdata];
      const target = newEditData.filter(item => count === item.distributionId)[0];
      if (target) {
        target.editable = true;
        this.innerdata = newEditData;
        this.addBtnShow = false
      }
    },
    // 保存
    handleSave(record) {
      this.distributeForm.validateFields((error, fieldsValue) => {
        if(error) {
          console.log('error', error);
          return
        }
        const values = {
          ...fieldsValue,
          'taskStart' : fieldsValue['taskStart'] ? fieldsValue['taskStart'].format('YYYY-MM-DD') : undefined,
          'taskEnd' : fieldsValue['taskEnd'] ? fieldsValue['taskEnd'].format('YYYY-MM-DD') : undefined,
        }
        addDemandDistribution({
          partitionId: this.partitionId,
          specialistId: values.recruiter,
          recruitNum: values.recruitNum,
          emergencyLevel: values.emergencyLevel,
          taskStart: values.taskStart,
          taskEnd: values.taskEnd
        }).then(res => {
          if(res.data.code == 0) {
            record.editable = false
            this.editingKey = ''
            this.addBtnShow = true
            this.$message.success(res.data.data);
            this.getDemandDistribution(this.partitionId)
          } else {
            this.$message.error(res.data.mesg)
            record.editable = false
            this.editingKey = ''
            this.addBtnShow = true
            this.getDemandDistribution(this.partitionId)
          }
        }).catch(err => {
          this.$message.error(res.data.mesg)
          record.editable = false
          this.editingKey = ''
          this.addBtnShow = true
          this.getDemandDistribution(this.partitionId)
          console.log(err)
        })
      });
    },
    // 删除
    handleDelete(id) {
      console.log(id)
      let that = this
      this.$confirm({
        title: '确认删除这条分配吗?',
        content: '删除后不可恢复!',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          deletedemandDistribution({
            distributionId: id
          }).then(res => {
            if(res.data.code == 0) {
              console.log(res)
              if(res.data.code == 0) {
                that.$message.success(res.data.data)
                that.getDemandDistribution(that.partitionId)
              } else {
                that.$message.error(res.data.mesg)
              }
            }
            console.log(res)
          }).catch(err => {
            that.$message.error(res.data.mesg)
            console.log(err)
          })
        },
        onCancel() {
          that.$message.warning('已取消删除！');
        },
      });
    },
    handleInputNumberChange(value, key, column) { // 更新表格中数字输入框的状态
      console.log(value, key, column)
      const newData = [...this.innerdata];
      const target = newData.filter(item => key === item.distributionId)[0];
      if (target) {
        target[column] = value;
        this.innerdata = newData;
      }
    },
    handleSelectChange1(value, key, column) { // 更新表格中下拉选择器的状态
      console.log(value, key, column)
      const newData = [...this.innerdata];
      const target = newData.filter(item => key === item.distributionId)[0];
      if (target) {
        target[column] = value.label;
        this.innerdata = newData;
      }
    },
    handleSelectChange2(value, key, column) { // 更新表格中下拉选择器的状态
      console.log(value, key, column)
      const newData = [...this.innerdata];
      const target = newData.filter(item => key === item.distributionId)[0];
      if (target) {
        target[column] = value.label;
        this.innerdata = newData;
      }
    },
    onDatePickerChange1(value, key, column) { // 更新表格中日期选择器的状态
      console.log(value, key, column)
      const newData = [...this.innerdata];
      const target = newData.filter(item => key === item.distributionId)[0];
      if (target) {
        target[column] = this.moment(value).format('YYYY-MM-DD');
        this.innerdata = newData;
      }
    },
    onDatePickerChange2(value, key, column) { // 更新表格中日期选择器的状态
      console.log(value, key, column)
      const newData = [...this.innerdata];
      const target = newData.filter(item => key === item.distributionId)[0];
      if (target) {
        target[column] = this.moment(value).format('YYYY-MM-DD');
        this.innerdata = newData;
      }
    },  
    handleDistributeSubmit() {
      this.distributeVisible = false
    },
    handlePublish() {
      postDemand({
        demandId: Number(this.$route.query.demandId)
      }).then(res => {
        console.log(res)
        if(res.data.code == 0) {
          this.$message.success(res.data.data)
          this.getDemandPartitionDistribution()
          this.getDemand()
        }
      }).catch(err => {
        console.log(err)
        this.getDemandPartitionDistribution()
      })
    },
    affterDistributeModalClose() {
      this.getDemandPartitionDistribution()
    }
  }
}
</script>

<style scoped>
.count-box {
	width: 350px;
	height: 56px;
	margin: 0 auto;
	/* margin-top: 25px; */
}
.count-box .count-left {
	width: 150px;
	float: left;
	position: relative;
	overflow: hidden;
}
.count-box  .text {
	position: absolute;
	top: 6px;
	left: 68px;
	color: #666;
}
.count-box .number {
	position: absolute;
	top: 25px;
	left: 70px;
	color: #333;
	font-size: 18px;
	font-weight: 500;
	line-height: 24px;
}
.count-box .count-right {
	width: 150px;
	float: right;
	overflow: hidden;
	position: relative;
}
.count-box img {
	width: 56px;
	height: 56px;
}
.demand-review-container {
  height: 90%;
  min-height: 100%;
}
.new-demand-header {
  background-color: #fff !important;
  text-align: center;
}
.demand-review {
  background-color: #fff !important;
  min-height: 100%;
  position: relative;
}
.demand-review-right {
  position: relative;
  overflow: hidden;
}
.audited {
  width: 80px;
  height: 22px;
  background-color: #ddf6e4;
  color: #55d379;
  text-align: center;
  transform: rotate(45deg);
  position: absolute;
  right: -20px;
  top: 7px;
}
.reviewer-text {
  margin: 20px;
  text-align: right;
  margin-right: 40px;
}
.ant-form-item {
  margin-bottom: 10px;
}
.ant-input {
  overflow: hidden;
}
.ant-form-item-control {
  position: relative;
}
.demandreview {
  margin: 40px;
}
.demandreview-table {
  margin: 20px;
  min-height: 100%;
  padding-bottom: 80px;
  margin-top: 0px;
}
.editable-add-btn {
  width: 100%;
  margin-top: 16px;
  margin-bottom: 8px;
}
.bottom {
  background-color: #fff !important;
  text-align: center;
  line-height: 80px;
  box-shadow: 0px 7px 20px 1px rgba(0, 0, 0, 0.18);
  position: absolute;
  width: 100%;
  bottom: -20px;
}
.bottom-btn1 {
  background-color: #22b8cf;
  color: #fff;
  border-color: #22b8cf;
}
.bottom-btn2 {
  background-color: #1478E3;
  color: #fff;
  border-color: #1478E3;
}
</style>
<style>
.demand-review-container .ant-table-thead > tr > th {
	border-bottom: none;
}
.demand-review-container .ant-table-tbody > tr > td {
  border-bottom: none;
  border-left: 1px solid #f0f0f0;
}
.demand-review-container .ant-table-tbody > tr > td:first-child {
  border-left: none;
}
.demand-review-container .tab-title {
  font-size: 20px;
  color: #333;
}
.demand-review-container .tab-tabs-bar {
  margin: none;
}
.demand-review-container .ant-tabs-tab-active {
  font-size: 20px;
  /* font-weight: bold; */
  color: #1478e3;
}
.demand-review-container .ant-tabs-tab-active .tab-title{
  font-size: 20px;
  /* font-weight: bold; */
  color: #1478e3;
}
.distribute-modal .ant-table-thead > tr > th {
	border-bottom: none;
}
.distribute-modal .ant-table-tbody > tr > td {
	border-bottom: none;
  border-left: 1px solid #f0f0f0;
}
.distribute-modal .ant-table-tbody > tr > td:first-child {
	border-left: none;
}
.distribute-modal .ant-modal-header {
  height:48px;
  background:rgba(246,247,251,1);
}
.distribute-modal .ant-modal-title {
  font-size: 14px;
  color: #000;
}
/* chrome浏览器下弹框滚动条样式美化 */
.distribute-modal .ant-modal-body::-webkit-scrollbar {
  width: 6px;  
  height:1px;
}
.distribute-modal .ant-modal-body::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(144, 147, 153, 0.5);
}
.distribute-modal .ant-modal-body::-webkit-scrollbar-track {
  border-radius: 5px;
  background: transparent;
}
/* Firefox浏览器下弹框滚动条样式美化 */
.distribute-modal .ant-modal-body {
  scrollbar-width: thin;
  scrollbar-color: rgba(144, 147, 153, 0.5);
}
</style>