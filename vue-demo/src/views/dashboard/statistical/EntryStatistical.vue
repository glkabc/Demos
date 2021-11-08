<template>
  <div class="position">
    <div class="position-head">
      <searchHead
        :code.sync="code"
        @handleSearch="handleSearch"
        @handleExport="handleExport"
        :level.sync="level"
        :idCard.sync="idCard"
        :demartmentId.sync="demartmentId"
        :candidateValue.sync="candidateValue"
        :postValue.sync="postValue"
        :offerDate.sync="offerDate"
        :entry.sync="entry"
        :no.sync="no"
        :iconLoadingEnd="iconLoadingEnd"
      />
    </div>
    <div class="position-main">
      <a-table
         bordered
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        class="zebra"
        rowKey="jobOfferId"
        @change="onShowSizeChange"
        :scroll="{ x: 4300,y: screenHeight - 450  }"
        :rowSelection="{
          onChange: onSelectChange,
          selectedRowKeys: selectedRowKeys,
        }"
      >
        <span slot="stay" slot-scope="record,item">
          <span>{{ item.stay === 1 ? '是': '否' }}</span>
        </span>
        <span slot="affiliatedUser" slot-scope="record,item">
          <span>{{ item.affiliatedUser === 1 ? '是': '否' }}</span>
        </span>
        <span slot="arrangePhysical" slot-scope="record,item">
          <span>{{ item.arrangePhysical === 1 ? '是': '否' }}</span>
        </span>
        <span slot="city" slot-scope="record,item">
          <span v-text="item.city == null ? '':  item.city.name + ( item.city.parentCodeName)"></span>
        </span>
        <span slot="job" slot-scope="record,item">
          <span v-text="item.job == null ? '':  item.job.name + ( item.job.parentCodeName)"></span>
        </span>
        <span slot="userAuth" slot-scope="record,item">
          <span v-text="item.userAuth == null ? '':  item.userAuth.name + ( item.userAuth.parentCodeName)"></span>
        </span>
        <span slot="action" slot-scope="record,item">
          <a @click="handleModifyClick(item)">变更</a>
          <a-divider type="vertical"/>
          <a @click="handleDimissionClick(item)" :style="isResignStyle(item)">离职</a>
        </span>
        <span slot="resumeSex" slot-scope="record,item">
          <span>{{ getSexList(item.resumeSex) }}</span>
        </span>
      </a-table>
    </div>
    <RecruitOffer
      :offerList="offerList"
      :departmentList="departmentList"
      :type="offerListType"
      :offerVisible.sync="staffOfferVisible"
      @recruit-action="getAffirmOfferInit"
    />
  </div>
</template>

<script>
import {  getAffirmOffer, recruitResignJob } from "@api/department/operation"
import {  exportAffirmOffer } from "@api/statistical/index"
import RecruitOffer from "../demand/department/recruitDetail/RecruitOffer"
import download from "./index"
import searchHead from "./entryStatical/Search"
import { Trim } from "../../../trim/trim"
const columns = [
  {
    title: "需求编号",
    dataIndex: "externalNum",
    width: 120,
    fixed:'left',
    key: "externalNum",
  },
  {
    title: "职位编号",
    dataIndex: "no",
    key: "no",
    fixed:'left',
    width: 140,
  },
  // {
  //   title: "需求名称",
  //   dataIndex: "demandName",
  //   width: 110,
  //   ellipsis: true,
  //   key: "demandName",
  // },
  {
    title: "事业部",
    dataIndex: "groupIdName",
    key: "groupIdName",
    width: 120,
    ellipsis: true,
  },
  {
    title: '需求客户名称',
    dataIndex: 'customName',
    key: 'customName',
    ellipsis: true,
  },
  {
    title: '需求一级部门',
    dataIndex: 'firstOrgName',
    key: 'firstOrgName',
    width: 140,
    ellipsis: true,
  },
  {
    title: '需求二级部门',
    dataIndex: 'secondOrgName',
    key: 'secondOrgName',
    width: 140,
    ellipsis: true,
  },
  {
    title: "姓名",
    dataIndex: "fullName",
    key: "fullName",
    width: 90,
  },
  {
    title: '性别',
    dataIndex: 'resumeSex',
    key: 'resumeSex',
    scopedSlots: { customRender: "resumeSex" }
  },
  {
    title: "身份证号",
    dataIndex: "cardNum",
    key: "cardNum",
    width: 150,
  },
  {
    title: "职级职等",
    dataIndex: "level",
    key: "level",
    width: 90,
  },
  {
    title: "上级",
    dataIndex: "superName",
    key: "superName",
    width: 120,
  },
  {
    title: "导师",
    dataIndex: "teacher",
    key: "teacher",
    width: 90,
  },
  {
    title: "公司主体",
    dataIndex: "sysCustomName",
    key: "sysCustomName",
    ellipsis: true,
  },
  {
    title: "一级部门",
    dataIndex: "sysOrgName",
    key: "sysOrgName",
    width: 120,
  },
  {
    title: "二级部门",
    dataIndex: "sysOrgTname",
    key: "sysOrgTname",
    width: 120,
  },
  {
    title: "末级部门",
    dataIndex: "sysOrgLname",
    key: "sysOrgLname",
    width: 120,
  },
  // {
  //   title: "录用薪资",
  //   dataIndex: "salary",
  //   key: "salary",
  //   width: 90,
  // },
  {
    title: "试用期长度",
    dataIndex: "probation",
    key: "probation",
    width: 110,
  },
  {
    title: "社保缴纳地",
    dataIndex: "socialCity",
    key: "socialCity",
  },
  {
    title: "招聘对接人",
    dataIndex: "recruitName",
    key: "recruitName",
  },
  {
    title: "PS标准岗位名称",
    dataIndex: "job",
    key: "job",
    width: 160,
    scopedSlots: { customRender: "job" }
  },
  {
    title: "工作地点",
    dataIndex: "city",
    width: 140,
    key: "city",
    scopedSlots: { customRender: "city" }
  },
  {
    title: "人员编制",
    dataIndex: "userAuth",
    width: 120,
    key: "userAuth",
    scopedSlots: { customRender: "userAuth" }
  },
  {
    title: "候选人来源",
    dataIndex: "talentSource.setupContent",
    key: "talentSource.setupContent",
  },
  {
    title: "确认日期",
    dataIndex: "affirmDate",
    key: "affirmDate",
  },
  {
    title: "入职日期",
    dataIndex: "workingDate",
    key: "workingDate",
  },
  {
    title: "入场时间",
    dataIndex: "operatorDate",
    key: "operatorDate",
  },
  {
    title: "住宿",
    width: 80,
    scopedSlots: { customRender: "stay" }
  },
  {
    title: "安排体检（合肥）",
    width: 150,
    scopedSlots: { customRender: "arrangePhysical" }
  },
  {
    title: "挂靠人员",
    width: 90,
    scopedSlots: { customRender: "affiliatedUser" }
  },
  {
    title: "特殊事项说明",
    dataIndex: "comment",
    key: "comment",
    ellipsis: true,
  },
  {
    title: "offer确认备注",
    dataIndex: "comments",
    key: "comments",
    ellipsis: true,
    width: 125,
  },
  {
    title: '操作',
    width: 100,
    fixed: 'right',
    align: 'center',
    scopedSlots: { customRender: 'action'}
  }
];
export default {
  components: {
    searchHead,
    RecruitOffer
  },
  data() {
    return {
      columns,
      screenHeight: document.documentElement.clientHeight,
      data: [],
      code: '', // 需求编号
      // name: '', // 需求名称
      level: '', // 职级职等
      idCard: '', // 身份证
      demartmentId: '', // 需求部门
      candidateValue: '', // 候选人
      postValue: '', // 岗位
      offerDate: null, // offer 确认日期
      entry: null, // 入职日期
      no: '',
      pagination: {
        current: 1,
        pageSizeOptions: ["10", "20", "30", "40"],
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      loading: false,
      selectedRowKeys: [],
      staffOfferVisible: false,
      offerListType: '',
      offerList: {},
      departmentList: {},
      iconLoadingEnd:null,
    };
  },
  mounted() {
    this.getAffirmOfferInit()
    window.onresize = function () { // 定义窗口大小变更通知事件
      this.screenHeight = document.documentElement.clientHeight// 窗口高度
    }
  },
  methods: {
    isResignStyle(item) {
      return {
        cursor: item.isResign ? '' : 'not-allowed',
        color: item.isResign ? '' : '#999'
      }
    },
    handleDimissionClick(e) {
      //recruitResignJob 接口
      if (!e.isResign) {
        return false
      }
      this.$confirm({
				title: "提示",
				content: "确定要离职吗？",
				onOk: () => {
					recruitResignJob({
						talentId: e.talentId
					}).then(res => {
						if (res.data.code == 0) {
							this.$message.success(res.data.data);
						} else {
							this.$message.error(res.data.mesg);
						}
            // 重新获取列表
            this.getAffirmOfferInit();
					});
				},
				onCancel() {}
			});
    },
    // 搜索
    handleSearch(e) {
      this.getAffirmOfferInit()
    },
    getSexList(e) {
      switch (e) {
        case 0:
          return '男'
          break;
        case 1:
          return '女'
          break;
        default:
          return '保密'
          break;
      }
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleModifyClick(e) {
      this.staffOfferVisible = true
      this.offerList = e
      this.offerListType = 7
      let tmpList = {
        // demandId: e.demandId, // 需求编号
        organizeId: e.orgId, // 部门id
        positionName: e.positionName, // 任务名称
        organizeName: e.OrgName, // 应聘部门
        // demandName: e.demandName, // 需求名称
      }
      this.departmentList = tmpList
    },
    async handleExport () {
      try {
        if(this.selectedRowKeys.length === 0) {
          let newOffDate = new Date(this.offerDate).getTime();
          let newEntryDate = new Date(this.entry).getTime();
          const res = await exportAffirmOffer ({
            cardNum: Trim(this.idCard), // 身份证
            no: Trim(this.no),
            orgId: this.demartmentId, // 需求部门
            distributionId: Trim(this.code), // 需求编号
            // demandName: this.name, // 需求名称
            level: Trim(this.level), // 职级职等
            jobId: this.postValue[1], // 标准岗
            talentSourceId: this.candidateValue, // 候选人
            confirmedDate: newOffDate == 0 ? '' : newOffDate, // offer确认日期
            workingDate: newEntryDate == 0 ? '' : newEntryDate, // 入职日期
          })
          this.iconLoadingEnd = false;
          download(res.data,'入职统计表');
        }else {
          const res = await exportAffirmOffer({
            jobOfferIds: this.selectedRowKeys
          })
          this.iconLoadingEnd = false;
          download(res.data, '入职统计表')
        }
      }
      catch(error) {
        this.iconLoadingEnd = false;
        console.log(error)
      }
    },
    async getAffirmOfferInit() {
      try {
        this.loading = true;
        let newOffDate;
        let newEntryDate;
        if(this.offerDate == ''){
          newOffDate = '';
        }else{
          newOffDate = new Date(this.offerDate).getTime();
        }
        if(this.entry == ''){
          newEntryDate = '';
        }else{
          newEntryDate = new Date(this.entry).getTime();
        }
        const res = await getAffirmOffer({
          cardNum: Trim(this.idCard), // 身份证
          no: Trim(this.no),
          orgId: this.demartmentId, // 需求部门
          externalNum: Trim(this.code), // 需求编号
          // demandName: this.name, // 需求名称
          level: Trim(this.level), // 职级职等
          jobId: this.postValue[1], // 标准岗
          talentSourceId: this.candidateValue, // 候选人
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          confirmedDate: newOffDate == 0 ? '' : newOffDate, // offer确认日期
          workingDate: newEntryDate == 0 ? '' : newEntryDate, // 入职日期
        });
         console.log("res",res);
        if(res.data.code == 0 ) {
        this.loading = false;
        this.data = res.data.data.jobOfferList
        this.pagination.total = res.data.data.mate.size
        }else{
          this.loading = false;
          this.data = [];
        }
       
      } catch (error) {}
    },
    // 分页
    onShowSizeChange({ current, pageSize }) {
      this.pagination.current = current;
      this.pagination.pageSize = pageSize;
      this.getAffirmOfferInit();
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

.position-head {
  margin-left: 5px;
}
.position-main {
  margin-top: 20px;
}
</style>
