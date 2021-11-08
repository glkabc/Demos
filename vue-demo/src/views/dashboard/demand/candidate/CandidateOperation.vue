<template>
  <div class="candidate-operation">
    <a-row class="candidate-info">
      <a-col :span="24" class="name">
        <span style="margin-right: 24px;">
          <img src="../../../../assets/images/author.png" alt="" style="margin-right: 5px">
          {{ name }}
        </span>
        <div style="margin-top: 10px" v-if="!loadingShow">
          <span class="candidate-head">
            <icon-font type="icon-shouji" class="iconfont" />
            {{ telephone }}
          </span>
          <a-divider type="vertical" />
          <span class="candidate-head">
            <icon-font type="icon-youxiang" class="iconfont" />
            {{ email }}
          </span>
        </div>
      </a-col>
      <a-col :span="24" class="candidate-tabsList">
        <a-tabs :defaultActiveKey="defaultModel" @change="handleTabsChange">
          <a-tab-pane key="0">
            <span slot="tab">
              全部 <span>{{ totalCount }}</span>
            </span>
          </a-tab-pane>
          <a-tab-pane key="1">
            <span slot="tab">
              进行中 <span> {{ ongoingCount }}</span>
            </span>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">
              已关闭 <span> {{ onCloseCount }}</span>
            </span>
          </a-tab-pane>
          <a-tab-pane key="3">
            <span slot="tab">
              暂停中 <span> {{ onSuspCount }}</span>
            </span>
          </a-tab-pane>
          <a-tab-pane key="9">
            <span slot="tab">
              已完成 <span> {{ onFinishCount }}</span>
            </span>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :span="24" class="candidate-info-item">
        <a-table
          :columns="columns"
          :dataSource="tableData"
          :pagination="false"
          class="bordered"
          :loading="loading"
          :rowSelection="{
            onChange: onSelectChange,
            selectedRowKeys: selectedRowKeys,
          }"
          size="middle"
          :rowKey="(record) => record.talentId"
        >
          <template slot="info" slot-scope="text, item">
            <div class="info__container" @click="handleView(item)">
              <div>
                <p class="info__paragraph">
                  <span class="info__name">{{ item.OrgName }}</span>
                </p>
                <p style="margin-bottom: 0">
                  <span class="info__mobile">{{ item.dremandName }}</span>
                  <span class="info__divider">|</span>
                  <span class="info__email">{{ item.positionName }}</span>
                </p>
              </div>
            </div>
          </template>
          <span slot="status" slot-scope="record, item">
            <a-tag :class="getStatus(item.status)">{{ item.statusDes }}</a-tag>
          </span>
          <span slot="demandStatus" slot-scope="record, item">
            <a-badge
              status="processing"
              :color="getDemandStatus(item.demandStatus).type"
            />
            {{ getDemandStatus(item.demandStatus).name }}
          </span>
          <span slot="action" slot-scope="text, item">
            <a
              @click="handleInterview(item)"
              v-if="item.status == 20 || item.status == 40"
              >面试安排</a
            >
            <a
              @click="handleInterviewEvaluation(item)"
              v-if="item.status == 30"
              >面试结论</a
            >
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-affix :offsetBottom="0" v-if="defaultModel == 0 || defaultModel == 1">
      <div class="footer">
        <a-button
          type="primary"
          :disabled="passDisabled"
          @click="handlePassClick"
          class="button-success"
          >录用</a-button
        >
        <a-button
          type="primary"
          :disabled="offerDisabled"
          @click="handleOfferClick"
          class="button-success"
          >Offer确认</a-button
        >
        <a-button
          :disabled="confirmDisabled"
          type="primary"
          class="button-info"
          @click="handleClick(1)"
          >确认入职</a-button
        >
        <a-button
          :disabled="abandonDisabled"
          type="primary"
          @click="handleClick(2)"
          class="button-danger"
          >候选人放弃</a-button
        >
      </div>
    </a-affix>
    <!-- 查看 -->
    <interview-info-modal :show.sync="viewVisible" :id="viewedId" />
    <!-- 确认offer -->
    <a-drawer
      placement="right"
      :closable="false"
      @close="handleOfferClose"
      width="520"
      :visible="staffOfferVisible"
      title="确认offer"
    >
      <RecruitOfferForm
        ref="recruitOffer"
        :offerList="offerList"
        @recruit-action="getCandidateInfo"
        @error="handleInit"
        @interviewLoading="interviewLoadingChange"
      />
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button
          :style="{ marginRight: '8px' }"
          @click="staffOfferVisible = false"
        >
          取消
        </a-button>
        <a-button
          @click="handleOfferSubmit"
          type="primary"
          :loading="interviewLoading"
          style="background: #22B8CF;border: #22B8CF"
          >确定</a-button
        >
      </div>
    </a-drawer>
    <!-- 确认入职，候选人放弃弹框 -->
    <a-modal
      centered
      v-model="confirmVisible"
      :title="confirmTitle"
      wrapClassName="confirm-modal"
    >
      <template slot="footer">
        <a-button
          key="back"
          style="background: #E8E9E8; border: #E8E9E8; color: #333;"
          @click="confirmVisible = false"
          >取消</a-button
        >
        <a-button
          key="submit"
          style="background: #22B8CF;border: #22B8CF"
          type="primary"
          @click="handleConfirmSubmit"
          >确定</a-button
        >
      </template>
      <ConfirmFooterForm
        ref="confirmList"
        :confirmList="confirmList"
        :confirmType="confirmType"
        @recruit-success="getCandidateInfo"
      />
    </a-modal>
    <!-- 面试安排抽屉-->
    <MateAuditionForm
      :OrgName="mateOrgName"
      :positionName="matePositionName"
      :id='mateTalentId'
      class="audition"
      @recruit-action="getCandidateInfo"
      :show.sync="interviewVisible"
    />
    <!-- 面试结论 -->
    <a-modal
      title="面试结论"
      v-model="staffConcluVisible"
      width="630px"
      :destroyOnClose="true"
      centered
    >
      <template slot="footer">
        <a-button
          key="back"
          @click="staffConcluVisible = false"
          style="background: #E8E9E8; border: #E8E9E8; color: #333;"
          >取消</a-button
        >
        <a-button
          key="submit"
          style="background: #22B8CF;border: #22B8CF"
          type="primary"
          @click="handleConcluSubmit"
          >确定</a-button
        >
      </template>
      <ConclusionForm
        ref="conclusion"
        :concluList="concluList"
        class="conclusion"
        @recruit-action="getCandidateInfo"
      />
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import { IconFont } from "@configs/scriptURL";
import { getCandidateInfo } from "@api/candidate/index";
import { passInterview } from "@api/department/operation";

import InterviewInfoModal from "./candidateOperation/InterviewInfoModal";
import ConclusionForm from "./candidateOperation/ConclusionForm";
import ConfirmFooterForm from "./candidateOperation/ConfirmFooterForm";
import MateAuditionForm from "./candidateOperation/MateAuditionForm";
import RecruitOfferForm from "./candidateOperation/RecruitOfferForm";
const columns = [
  {
    dataIndex: "info",
    width: "400px",
    scopedSlots: { customRender: "info" },
  },
  {
    title: "需求状态",
    dataIndex: "demandStatus",
    key: "demandStatus",
    width: "120px",
    scopedSlots: { customRender: "demandStatus" },
  },
  {
    title: "流程状态",
    dataIndex: "status",
    key: "status",
    width: "90px",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "面试时间",
    dataIndex: "createUserTime",
    key: "createUserTime",
    width: "150px",
    align: "center",
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: "150px",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  name: "CandidateOperation",
  components: {
    IconFont,
    InterviewInfoModal,
    ConclusionForm,
    ConfirmFooterForm,
    MateAuditionForm,
    RecruitOfferForm,
  },
  data() {
    return {
      offerDisabled: false,
      confirmDisabled: false,
      abandonDisabled: false,
      passDisabled: false,
      loadingShow: false,
      interviewLoading: false,
      name: "", // 候选人姓名
      email: "", // 候选人邮箱
      telephone: "", // 候选人电话
      department: "",
      candInfolist: [],
      loading: false, // 表格加载
      columns,
      viewVisible: false,
      viewedId: null,
      confirmVisible: false,
      interviewVisible: false, // 面试安排
      staffConcluVisible: false, // 面试结论
      staffOfferVisible: false, // 确认offer
      item_interview: false,
      item_interview_num: null,
      notifyInterviewer: [],
      notifyCandidate: [],
      interviewList: [],
      offerList: {}, // 确认offer数据
      hasCallback: [],
      tabList: [
        { label: "全部", value: 0 },
        { label: "进行中", value: 1 },
        { label: "已关闭", value: 2 },
        { label: "暂停中", value: 3 },
        { label: "已完成", value: 9 },
      ],
      defaultModel: "0",
      mateOrgName: '',
      mateTalentId: '',
      matePositionName: '',
      concluList: {}, // 面试结论
      confirmTitle: "确认入职",
      selectedRowKeys: [],
      selectedRowList: [],
      confirmList: {}, // 底部弹窗数据
      confirmType: {}, // 底部弹窗数据
    };
  },
  computed: {
    tableData() {
      switch (this.defaultModel) {
        case "0":
          return this.candInfolist;
        // 进行中
        case "1":
          return this.candInfolist.filter((item) => item.demandStatus == "1");
        // 已关闭
        case "2":
          return this.candInfolist.filter((item) => item.demandStatus == "2");
        // 暂停中
        case "3":
          return this.candInfolist.filter((item) => item.demandStatus == "3");
        // 已完成
        case "9":
          return this.candInfolist.filter((item) => item.demandStatus == "9");
        default:
          return [];
      }
    },
    // 全部
    totalCount() {
      return this.candInfolist.length;
    },
    // 进行中
    ongoingCount() {
      return this.candInfolist.filter((item) => item.demandStatus == "1")
        .length;
    },
    // 已关闭
    onCloseCount() {
      return this.candInfolist.filter((item) => item.demandStatus == "2")
        .length;
    },
    // 暂停中
    onSuspCount() {
      return this.candInfolist.filter((item) => item.demandStatus == "3")
        .length;
    },
    // 已关闭
    onFinishCount() {
      return this.candInfolist.filter((item) => item.demandStatus == "9")
        .length;
    },
  },
  created() {
    this.getCandidateInfo();
    this.notifyInterviewer = this.$store.state.status.notifyInterviewer;
    this.notifyCandidate = this.$store.state.status.notifyCandidate;
    this.interviewList = this.$store.state.status.interviewTypes;
    this.hasCallback = this.$store.state.status.hasCallback;
  },
  methods: {
    getCandidateInfo() {
      this.loading = true;
      getCandidateInfo({
        talentId: this.$route.query.talentId,
      })
        .then((res) => {
          this.loading = false;
          if (res.data.code == 0) {
            this.loadingShow = false;
            this.candInfolist = res.data.data.candInfolist.candidateList;
            this.name = res.data.data.candInfolist.fullName;
            this.email = res.data.data.candInfolist.resumeMail;
            this.telephone = res.data.data.candInfolist.resumePhone;
            this.staffOfferVisible = false;
            this.interviewVisible = false;
            this.selectedRowKeys = [];
          } else {
            this.loadingShow = true;
            this.candInfolist = []
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getStatus(value) {
      if (value == 50 || value == 30) {
        return "tab-wait";
      }
      if (value % 2 == 0) {
        return "tab-success";
      } else {
        return "tab-danger";
      }
    },
    getDemandStatus(status) {
      switch (status) {
        case "1":
          let statusFirst = {
            name: "进行中",
            type: "#4480EE",
          };
          return statusFirst;
          break;
        case "2":
          let statusSecond = {
            name: "已关闭",
            type: "#999999",
          };
          return statusSecond;
          break;
        case "3":
          let statusThird = {
            name: "暂停中",
            type: "#FEAA19",
          };
          return statusThird;
          break;
        default:
          let statusFour = {
            name: "已完成",
            type: "#22B8CF",
          };
          return statusFour;
          break;
      }
    },
    // 切换筛选
    handleTabsChange(e) {
      this.defaultModel = e;
    },
    getInterviewLabel(value) {
      const matched = this.interviewList.find(
        (experience) => experience.value === value
      );
      if (matched) {
        return matched.label;
      } else {
        return "暂无方式";
      }
    },
    // 查看面试详情
    handleView(e) {
      this.viewVisible = true;
      this.viewedId = e.talentId;
    },
    // 面试结论
    handleInterviewEvaluation(e) {
      this.staffConcluVisible = true;
      this.concluList = e;
    },
    // 面试结论回调
    handleConcluSubmit(e) {
      this.$refs.conclusion.handleSubmit();
      this.staffConcluVisible = false;
    },
    /*
      按钮权限处理
      1、待面试    -- 可操作：候选人放弃、（面试安排）
      2、面试通过  -- 可操作：Offer确认、候选人放弃
      3、面试淘汰  -- 可操作：无
      4、面试放弃  -- 可操作：（面试安排）
      5、Offer放弃 -- 可操作：Offer确认
      6、入职放弃  -- 可操作：Offer确认
      7、待入职    -- 可操作：确认入职、候选人放弃
      8、已入职    -- 可操作：无
    */
    /*
      面试安排不需要操作
      根据勾选返回的最后一个下标，实时获取数据数组中对应的状态码值，
      根据状态码值更新按钮的权限控制
    */
    onSelectChange(e, list) {
      this.selectedRowKeys = e;
      this.selectedRowList = list;
      this.btnControl(list);
    },
    btnControl(val) {
      let arr = val;
      let talentIdList = [];
      if (arr.length > 0) {
        arr.forEach((item) => {
          // 按钮状态判断
          switch (item.status) {
            case 20:
              this.offerDisabled = true;
              this.confirmDisabled = true;
              this.passDisabled = true
              break
            case 30:
              this.offerDisabled = true;
              this.confirmDisabled = true;
              this.passDisabled = true
              break;

            case 31:
              this.offerDisabled = true;
              this.confirmDisabled = true;
              this.abandonDisabled = true;
              this.passDisabled = true
              break;

            case 40:
              this.offerDisabled = true;
              this.abandonDisabled = true;
              this.passDisabled = false
              break;

            case 41:
              this.offerDisabled = true;
              this.confirmDisabled = true;
              this.abandonDisabled = true;
              this.passDisabled = true
              break;

            case 50:
              this.offerDisabled = true;
              this.passDisabled = true
              break;

            case 51:
              this.confirmDisabled = true;
              this.abandonDisabled = true;
              this.passDisabled = true
              this.offerDisabled = true
              break;

            case 60:
              this.offerDisabled = true;
              this.confirmDisabled = true;
              this.passDisabled = true
              this.abandonDisabled = true;
              break;

            case 61:
              this.confirmDisabled = true;
              this.passDisabled = true
              this.abandonDisabled = true;
              this.offerDisabled = true
              break;

            default:
              return;
          }
        });
      } else {
        // 选择为空时，重置
        this.offerDisabled = false;
        this.confirmDisabled = false;
        this.abandonDisabled = false;
        this.passDisabled = false
      }
    },

    // 确认offer关闭
    handleOfferClose() {
      // 当抽屉关闭时清空表单
      this.$refs.recruitOffer.staffForm.resetFields();
      this.staffOfferVisible = false;
    },
    // 确认offer
    handleOfferClick() {
      if (this.selectedRowKeys.length === 1) {
        this.offerList = this.selectedRowList[0];
        this.staffOfferVisible = true;
      } else if (this.selectedRowKeys.length === 0) {
        this.$message.warning("请选择需要操作的职位");
      } else {
        this.$message.error("只能选择一个职位进行操作");
      }
    },
    // 确认offer回调
    handleOfferSubmit() {
      this.$refs.recruitOffer.handleOfferSubmit();
      if (this.handleInit()) {
        this.getCandidateInfo();
      }
    },
    handleClick(type) {
      switch (type) {
        // 确认入职
        case 1:
          this.confirmTitle = "确认入职";
          if (this.selectedRowKeys.length === 1) {
            this.confirmVisible = true;
          } else if (this.selectedRowKeys.length === 0) {
            this.$message.warning("请选择需要操作的职位");
          } else {
            this.$message.error("只能选择一个职位进行操作");
          }
          break;
        // 候选人放弃
        default:
          this.confirmTitle = "候选人放弃";
          if (this.selectedRowKeys.length === 0) {
            this.$message.warning("请选择需要操作的职位");
          } else {
            this.confirmVisible = true;
          }
          break;
      }
      this.confirmList = this.selectedRowList;
      this.confirmType = type;
    },
    handleConfirmSubmit(e) {
      this.$refs.confirmList.handleSubmit();
      this.confirmVisible = false;
      this.getCandidateInfo();
    },
    handleInit() {
      return false;
    },
    interviewLoadingChange(e) {
      if(e == 2) {
        this.interviewLoading = true
      }else {
        this.interviewLoading = false
      }
    },
    // 面试安排
    handleInterview(e) {
      this.interviewVisible = true;
      this.matePositionName = e.positionName
      this.mateOrgName = e.OrgName
      this.mateTalentId = e.talentId
    },
    // 面试安排回调
    handleInterviewSubmit(e) {
      this.$refs.mateAudition.handleSubmit();
      if (this.handleInit()) {
        this.getCandidateInfo();
      }
    },
    // 通过面试
    handlePassClick(){
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning("请选择需要操作的职位");
      } else {
        let tmpPassList = []
        this.selectedRowList.map(item => {
          tmpPassList.push(item.talentId)
        })
        this.$confirm({
          title: '是否通过当前面试？',
          onOk:()=> {
            passInterview({
              jobTalentIdList: tmpPassList,
            }).then(res => {
              if (res.data.code == 0) {
                this.$message.success(res.data.data);
              } else {
                this.$message.error(res.data.mesg);
              }
            })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    },
    // mouseEnter(conclusion, index) {
    //   // console.log(conclusion, index)
    //   if (conclusion === 30 || conclusion === 31) {
    //     this.item_interview = true;
    //   }
    //   this.item_interview_num = index;
    // },
    // mouseLeave(conclusion, index) {
    //   this.item_interview = false;
    // },
  },
};
</script>

<style scoped>
.candidate-operation {
  background: #fff;
  height: auto;
  min-height: 100%;
  position: relative;
}
.candidate-info {
  padding: 22px;
}
.candidate-head {
  color: #636364;
  font-size: 14px;
}
.name {
  color: #000;
  font-size: 18px;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.candidate-tabsList >>> .ant-tabs-bar {
  border-bottom: 0;
  margin: 0;
}
.candidate-tabsList >>> .ant-tabs-nav .ant-tabs-tab {
  margin: 0 10px 0 0
}
.iconfont {
  color: #636364;
  font-size: 14px;
}
.footer {
  background-color: #fff !important;
  text-align: center;
  line-height: 80px;
  box-shadow: 0px 7px 20px 1px rgba(0, 0, 0, 0.18);
  position: absolute;
  width: 100%;
  bottom: 0;
}

.button-info {
  color: #fff;
  background-color: #1478e3;
  border-color: #1478e3;
  margin: 0 10px;
}
.button-info:hover {
  color: #fff;
  background-color: #1478e3;
  border-color: #1478e3;
}

.button-success {
  color: #fff;
  background-color: #22b8cf;
  border-color: #22b8cf;
  margin-left: 10px;
}

.button-success:hover {
  color: #fff;
  background-color: #4ec6d8;
  border-color: #4ec6d8;
}
.button-danger {
  color: #fff;
  background-color: #fd5158;
  border-color: #fd5158;
}
.button-danger:hover {
  color: #fff;
  background-color: #fd7379;
  border-color: #fd7379;
}
.button-success[disabled],
.button-info[disabled],
.button-danger[disabled] {
  background: #d5d5d5;
  border: #d5d5d5;
  color: #fff;
}
.bordered {
  border: solid 1px #e8e8e8;
}
.bordered >>> .ant-table-tbody > tr > td {
  border-bottom: none;
}
.info__container {
  color: #8c909b;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.info__name {
  color: #1478e3;
  margin-right: 16px;
  font-size: 14px;
}
.info__paragraph {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.info__divider {
  color: #888888;
  padding: 0 16px;
}
.tab-wait {
  color: #feaa19;
  background-color: #fffbe0;
  border-color: #feaa19;
}
.tab-success {
  color: #1478e3;
  background-color: #e0f6ff;
  border-color: #1478e3;
}
.tab-danger {
  color: #fc3d09;
  background-color: #fff0e2;
  border-color: #fc3d09;
}
</style>
