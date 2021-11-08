<template>
  <div class="demand-review-container">
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
          </div>
        </a-col>
      </a-row>
      <template >
        <a-table
          v-if="data != null"
          class="demandreview-table zebra"
          :columns="columns"
          :dataSource="data"
          :pagination="false"
          :rowKey="record => record.partitionId"
          
        >
          <span slot="emergencyLevel" slot-scope="text">
            <a-tag v-if="text == 1" color="blue">一般</a-tag>
            <a-tag v-if="text == 2" color="orange">紧急</a-tag>
            <a-tag v-if="text == 3" color="red">特急</a-tag>
          </span>
          <template slot="recruitmentSpecialistName" slot-scope="text, record,index">
                    <a-select
                      style="width: 85px;"
                      allowClear
                      placeholder="请选择"
                      :value="record.demandDistribution.length === 0 ?record.specialistId :record.demandDistribution[0].specialistId"
                      :disabled="text.demandDistribution.length>0 "
                      @search="handleContactSearch"
                      @blur="handleContanctBlur"
                      @focus="handleContentFocus"
                      showSearch
                      :filter-option="filterOption"
                      :getPopupContainer="
                        triggerNode => {
                          return triggerNode.parentNode || document.body;
                        }
                      "
                      @change="handleSelectChange1($event, record.partitionId, columns[4].dataIndex,data,index)"
                    >
                      <a-select-option
                        :value="item.userId"
                        v-for="item in recruiterUserList"
                        :key="item.userId"
                      >{{ item.userName }}</a-select-option>
                    </a-select>
                    <!-- <a-form-item
								label="招聘负责人"
								:colon="false"
								:label-col="{ span: 7 }"
								:wrapper-col="{ span: 14 }"
							>
								<a-select
                      style="width: 85px;"
                      allowClear
                      placeholder="请选择"
                      :value="specialistDataId"
                      :disabled="!is_specialistDataId!=''"
                      @search="handleContactSearch"
                      @blur="handleContanctBlur"
                      @focus="handleContentFocus"
                      showSearch
                      :filter-option="filterOption"
                      :getPopupContainer="
                        triggerNode => {
                          return triggerNode.parentNode || document.body;
                        }
                      "
                      @change="handleSelectChange1($event, record.partitionId, columns[4].dataIndex,data)"
                    >
                      <a-select-option
                        :value="item.userId"
                        v-for="item in recruiterUserList"
                        :key="item.userId"
                      >{{ item.userName }}</a-select-option>
                    </a-select>
							</a-form-item> -->
                    <!-- <template v-else><span :class="{isGray: !record.partitionId}">{{ text }}</span></template> -->
                </template>
                
                <template slot="action" slot-scope="text, record">
                  <template >
                    <!-- <a v-if="is_specialistId"
                      
                      @click="handleEdit(record)"
                    >更改</a> -->
                    <!-- :disabled="record.demandDistribution.length != 0"record.demandDistribution[index].specialistId!='' -->
                    <a :disabled="record.demandDistribution.length>0 "  @click="handleSave(record)">保存</a>
                  </template>
                </template>
                
                <!-- 职位名称 -->
               
                <span slot="positionName" slot-scope="text, record">
                <span
                style="cursor: pointer;color: #4480EE;margin-right: 10px"
                @click="detailNameClick(record.partitionId)"
                >{{ record.positionName }}</span
              >
           </span>

           

          <!-- <span slot="action" slot-scope="text, item">
            <can-i-use code="xqzx-bmhc-xqfp">
              <a
                v-if="item.allocatedNum < item.recruitNum"
                @click="handleDistribute(item.partitionId)"
              >分配</a>
            </can-i-use>
            <a v-if="item.allocatedNum === item.recruitNum" @click="handleView(item.partitionId)">查看</a>
          </span> -->
        </a-table>
        <RecruitDetail :show.sync="recruitVisible" :list="detailList" />
      </template>
      <!-- <a-affix :offsetBottom="0">
        <div class="bottom">
          <can-i-use code="xqzx-bmhc-xqfb">
            <a-button
              v-if="waitAllocateNum === 0"
              class="bottom-btn2"
              @click="handlePublish"
            >
              提交
            </a-button>
          </can-i-use>
        </div>
      </a-affix> -->
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import RecruitDetail from "./RecruitDetail";
import {
  getDemand,
  getUserInfo,
  getDemandDistribution,
  getDemandPartitionDistribution,
  addDemandDistribution,
  updateDemandDistribution,
  deletedemandDistribution,
  postDemand,
  // getRemandPartitionById
} from '@api/branchHC/index';

const columns = [
  { 
    title: '职位名称',
    dataIndex: 'positionName',
    key: 'positionName',
    width: '110px',
    ellipsis: true,
    scopedSlots: { customRender: 'positionName' }
  },
  { 
    title: '招聘城市',
    dataIndex: 'areaCodeName',
    key: 'areaCodeName',
    align: 'right',
    width: '120px'
  },
  { 
    title: '职级职等',
    dataIndex: 'evaluationCriteria',
    key: 'evaluationCriteria',
    align: 'right',
    width: '80px'
  },
  { 
    title: '招聘人数',
    dataIndex: 'recruitNum',
    key: 'recruitNum',
    align: 'right',
    width: '90px'
  },
  // { 
  //   title: '分配人数',
  //   dataIndex: 'allocatedNum',
  //   key: 'allocatedNum',
  //   align: 'right',
  //   width: '90px'
  // },
  {
    title: '招聘负责人',
    width: '90px',
    scopedSlots: { customRender: 'recruitmentSpecialistName' }
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
    width:'120px',
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
    width: '150px',
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
    width: '110px',
    // scopedSlots: { customRender: "positionName" },
  },
  { 
    title: '招聘城市',
    dataIndex: 'areaCodeName',
    key: 'areaCodeName',
    align: 'right',
    width: '120px'
  },
  { 
    title: '职级职等',
    dataIndex: 'evaluationCriteria',
    key: 'evaluationCriteria',
    align: 'right',
    width: '80px'
  },
  { 
    title: '招聘人数',
    dataIndex: 'perNumber',
    key: 'perNumber',
    align: 'center',
    width: '90px'
  },
  // {
  //   title: '分配人数',
  //   dataIndex: 'recruitNum',
  //   key: 'recruitNum',
  //   align: 'right',
  //   width: '90px',
  //   scopedSlots: { customRender: 'recruitNum' }
  // },
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
    width:'120px',
    scopedSlots: { customRender: 'taskStart' },
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
    scopedSlots: { customRender: 'taskEnd' },
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
      innerdata:[],
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
      recruiterUserList: [],
      levelList: [],
      isPublish: false,
      state: null,
      is_specialistId:null,
      specialistDataId:'',
      setDisabled:false,
      recruitVisible: false,
      detailList: {},
      is_specialistDataId:true,
      // demandDistributionObject:{},
      // editingKeys:fals
    }
  },
  created() {
    this.getDemandPartitionDistribution()
    this.getDemand()
    this.getUserInfo()
  },
  components:{
    RecruitDetail
  },
  methods: {
    detailNameClick(e) {
      this.recruitVisible = true;
      this.getRemandPartitionByIdInit(e);
    },
    getRemandPartitionByIdInit(id) {
      getDemandPartitionDistribution({
        demandId: Number(this.$route.query.demandId),
      }).then((res) => {
        if (res.data.code == 0) {
          this.detailList = res.data.data.demandPartitionList[0];
        }
      });
    },
    handleContanctBlur(){
      this.recruiterUserList = this.recruiterList.slice(0,100);
      
    },
    handleContentFocus(){
      this.recruiterUserList = this.recruiterList.slice(0,100)
    },
    handleContactSearch(e) {
      let recruiterList_ = this.recruiterList.filter(item => item.userName.indexOf(e) > -1);
      this.recruiterUserList = recruiterList_
    },
    filterOption(input, option){
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    getDemand() {
      getDemand({
        demandId: Number(this.$route.query.demandId)
      }).then(res => {
        if(res.data.code == 0) {
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
          this.recruiterUserList = [...this.recruiterList]
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
          if(this.data[0].demandDistribution.length>0){
            this.specialistDataId = true;
          }
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
    
    // 更改
    handleEdit(id, recorder, partitionId) {  
      this.levelList = this.$store.state.status.emergencyLevels
      this.editingKey = id;
      const newData = [...recorder.demandDistribution];
      const target = newData.filter(item => id === item.distributionId)[0];
      if (target) {
        target.editable = true;
        recorder.demandDistribution = newData;
      }
      this.partitionId = recorder.partitionId
      this.addBtnShow = false
      this.is_save = true
      if(partitionId) {
        this.is_save = true
      }else {
        this.is_save = false
      }
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
          specialistId: values.recruiter,
          taskStart: values.taskStart,
          taskEnd: values.taskEnd
        }).then(res => {
          if(res.data.code == 0) {
            record.editable = false
            this.editingKey = ''
            this.addBtnShow = true
            this.$message.success(res.data.data);
            this.getDemandPartitionDistribution()
          } else {
            record.editable = false
            this.editingKey = ''
            this.addBtnShow = true
            this.$message.error(res.data.mesg)
            this.getDemandPartitionDistribution()
          }
        }).catch(err => {
          record.editable = false
          this.editingKey = ''
          this.addBtnShow = true
          this.$message.error(res.data.mesg)
          this.getDemandPartitionDistribution()
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
      if(!record.specialistId){
        this.$message.error("请填写招聘负责人");
        return;
      }
      // this.specialistDataId[index] = true;
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
          partitionId: record.partitionId,
          specialistId: record.specialistId,
          recruitNum: record.recruitNum,
          emergencyLevel: record.emergencyLevel,
          taskStart: record.taskStart,
          taskEnd: record.taskEnd
        }).then(res => {
          if(res.data.code == 0) {
            record.editable = false
            this.editingKey = ''
            this.addBtnShow = true
            this.$message.success(res.data.data);
            this.getDemandPartitionDistribution();
            this.is_specialistId = true;
            this.setDisabled = true;
            this.is_specialistDataId = false;
          } else {
            this.$message.error(res.data.mesg)
            record.editable = false
            this.editingKey = ''
            this.addBtnShow = true
            this.getDemandPartitionDistribution()
          }
        }).catch(err => {
          this.$message.error(res.data.mesg)
          record.editable = false
          this.editingKey = ''
          this.addBtnShow = true
          this.getDemandPartitionDistribution()
        })
      });
    },
    // 删除
    handleDelete(id) {
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
    handleInnerdata(recorder) {
      // console.log(recorder,'recoreer')
      let innerdata = recorder.demandDistribution
      if(Array.isArray(innerdata)) {
        if(innerdata.length < 1) {
          for (let index = 0; index < 1-innerdata.length; index++) {
            innerdata.push({
              distributionId: this.count++,
              recruitNum: recorder.recruitNum,
              specialistName: '请选择',
              emergencyLevel: recorder.emergencyLevel,
              taskStart:  `${moment(recorder.taskStart).format('YYYY-MM-DD')}`,
              taskEnd: `${moment(recorder.taskEnd).format('YYYY-MM-DD')}`
            })
          }
        }
      }
      return innerdata
    },
    handleInputNumberChange(value, key, column, innerdata) { // 更新表格中数字输入框的状态
      const newData = [...innerdata];
      const target = newData.filter(item => key === item.distributionId)[0];
      if (target) {
        target[column] = value;
        innerdata = newData;
      }
    },
    handleSelectChange1(value, key, column, innerdata,index) { // 更新表格中下拉选择器的状态
      if(this.data[index].demandDistribution.length === 0) {
        this.data[index].specialistId = value
      }else {
        this.data[index].demandDistribution[0].specialistId = value
      }
      const newData = [...innerdata];
      const target = newData.filter(item => key === item.distributionId)[0];
      if (target) {
        target[column] = value.label;
        innerdata = newData;
      }
      // innerdata.demandDistribution[index].specialistId = value
      // this.specialistDataId=value;
      // this.specialistDataId = newData[0].demandDistribution.length !== 0 ? newData[0].demandDistribution[0].specialistId : value
      // console.log(newData[0].demandDistribution[0].specialistId,'newDataa')
      // this.is_specialistId = false;
      
    },
    handleSelectChange2(value, key, column, innerdata) { // 更新表格中下拉选择器的状态
      const newData = [...innerdata];
      const target = newData.filter(item => key === item.distributionId)[0];
      if (target) {
        target[column] = value.label;
        innerdata = newData;
      }
    },
    onDatePickerChange1(value, key, column, innerdata) { // 更新表格中日期选择器的状态
      const newData = [...innerdata];
      const target = newData.filter(item => key === item.distributionId)[0];
      if (target) {
        target[column] = this.moment(value).format('YYYY-MM-DD');
        innerdata = newData;
      }
    },
    onDatePickerChange2(value, key, column, innerdata) { // 更新表格中日期选择器的状态
      const newData = [...innerdata];
      const target = newData.filter(item => key === item.distributionId)[0];
      if (target) {
        target[column] = this.moment(value).format('YYYY-MM-DD');
        innerdata = newData;
      }
    },  
    handleDistributeSubmit() {
      this.distributeVisible = false
    },
    handlePublish() {
      postDemand({
        demandId: Number(this.$route.query.demandId)
      }).then(res => {
        if(res.data.code == 0) {
          this.$message.success(res.data.data,3).then(() =>{
            this.$router.replace({
              path:'/Demand/hc/demandDetails',
              query:{
                demandId: Number(this.$route.query.demandId)
              }
            })
          })
          this.getDemandPartitionDistribution()
          this.getDemand()
        }
      }).catch(err => {
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
.isGray {
  color: #bbb;
}
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
  padding-bottom: 20px;
}
.bottom-btn1 {
  background-color: #22b8cf;
  color: #fff;
  border-color: #22b8cf;
}
.bottom-btn2 {
  background-color: #22B8CF;
  color: #fff;
  border-color: #22B8CF;
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