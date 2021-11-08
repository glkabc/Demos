<template>
  <div>
    <a-form :form="staffForm" @submit="handleOfferSubmit">
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="需求部门"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span>{{ offerChangeList.OrgName }}</span>
          </a-form-item>
          <!-- <a-form-item
              label="需求/订单编号"
              :colon="false"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 17 }"
              class="spread"
            >
              <span
                >{{ departmentList.demandName }} /
                {{ departmentList.demandId }}</span
              >
            </a-form-item> -->

          <a-form-item
            label="招聘名称/分配编号"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span>{{ offerChangeList.positionName }}</span>
            <!-- <span
                >{{ departmentList.positionName }} /
                {{ offerList.distributionId }}</span
              > -->
          </a-form-item>
          <a-form-item
            label="姓名"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span>{{ offerChangeList.fullName }}</span>
            <!-- <span>{{ offerList.fullName }}</span> -->
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="身份证号"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              placeholder="请输入身份证号"
              v-decorator="[
                'cardNum',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入身份证号',
                    },
                    {
                      message: '身份证输入错误！',
                      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    },
                  ],
                  initialValue: offerChangeList.cardNum,
                },
              ]"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="职级职等"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-select
              allowClear
              placeholder="请选择职级职等"
              v-decorator="[
                'level',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择职级职等',
                    },
                  ],
                  initialValue: offerChangeList.level,
                },
              ]"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode || document.body;
                }
              "
            >
              <a-select-option
                :value="item"
                v-for="item in rankList"
                :key="item"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="上级"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              placeholder="请输入上级"
              v-decorator="[
                'superName',
                {
                  initialValue: offerChangeList.superName,
                },
              ]"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="导师"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              placeholder="请输入导师"
              v-decorator="[
                'teacher',
                {
                  initialValue: offerChangeList.teacher,
                },
              ]"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="公司主体"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              placeholder="请输入公司主体"
              v-decorator="[
                'sysCustomName',
                {
                  initialValue: offerChangeList.sysCustomName,
                },
              ]"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="一级部门"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              placeholder="请输入一级部门"
              v-decorator="[
                'sysOrgName',
                {
                  initialValue: offerChangeList.sysOrgName,
                },
              ]"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="二级部门"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              placeholder="请输入二级部门"
              v-decorator="[
                'sysOrgTname',
                {
                  initialValue: offerChangeList.sysOrgTname,
                },
              ]"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="末级部门"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              placeholder="请输入末级部门"
              v-decorator="[
                'sysOrgLname',
                {
                  initialValue: offerChangeList.sysOrgLname,
                },
              ]"
              allowClear
            />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="24">
          <a-form-item
            label="录用薪资"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              placeholder="请输入录用薪资"
              v-decorator="[
                'salary',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入录用薪资',
                    },
                  ],
                  initialValue: offerChangeList.salary,
                },
              ]"
              suffix="k"
              type="number"
            />
          </a-form-item>
        </a-col> -->
        <a-col :span="24">
          <a-form-item
            label="试用期长度"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
                placeholder="请输入试用期长度"
                suffix="月"
                v-decorator="[
                  'probation',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入试用期长度'
                      },
                      {
                        pattern: /^[0-9]\d*$/,
                        message: '请输入数字'
                      }
                    ],
                    initialValue:offerChangeList.probation
                  }
                ]"
              />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="社保缴纳地"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              placeholder="请输入社保缴纳地"
              v-decorator="[
                'socialCity',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入社保缴纳地',
                    },
                  ],
                  initialValue: offerChangeList.socialCity,
                },
              ]"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="招聘对接人"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              placeholder="请输入招聘对接人"
              v-decorator="[
                'recruitName',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入招聘对接人',
                    },
                  ],
                  initialValue: offerChangeList.recruitName,
                },
              ]"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="PS标准岗位名称"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-cascader
              @change="cascaderChange"
              allowClear
              :options="jobList"
              :fieldNames="{
                label: 'name',
                value: 'code',
                children: 'children',
              }"
              placeholder="请选择标准岗位名称"
              v-decorator="[
                'jobId',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择标准岗位名称',
                    },
                  ],
                  initialValue: offerChangeList.job,
                },
              ]"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode || document.body;
                }
              "
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="工作地点"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-select
              showSearch
              @search="handleContactSearch"
              @blur="handleContanctBlur"
              @focus="handleContentFocus"
              :filter-option="filterOption"
              placeholder="请选择工作地点"
              v-decorator="[
                'cityId',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择工作地点',
                    },
                  ],
                  initialValue: offerChangeList.cityId,
                },
              ]"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode || document.body;
                }
              "
            >
              <a-select-option
                :value="item.code"
                v-for="item in optionCity"
                :key="item.code"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="人员编制"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-select
              allowClear
              placeholder="请选择人员编制"
              v-decorator="[
                'userAuth',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择人员编制',
                    },
                  ],
                  initialValue:offerChangeList.userAuthId
                },
              ]"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode || document.body;
                }
              "
            >
              <a-select-option
                :value="item.code"
                v-for="item in userAuthList"
                :key="item.code"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="候选人来源"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-select
              allowClear
              placeholder="请选择候选人来源"
              v-decorator="[
                'talentSourceId',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择候选人来源',
                    },
                  ],
                  initialValue: offerChangeList.talentSourceId,
                },
              ]"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode || document.body;
                }
              "
            >
              <a-select-option
                :value="item.setupCode"
                v-for="item in setupList"
                :key="item.setupCode"
              >
                {{ item.setupContent }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="24">
            <a-form-item
              label="offer确认日期"
              :colon="false"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 17 }"
            >
              <a-date-picker
                style="width: 100%"
                v-decorator="[
                  'time',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择offer确认日期'
                      }
                    ]
                  }
                ]"
                format="YYYY-MM-DD"
                @change="handleDateClick"
                allowClear
              />
            </a-form-item>
          </a-col> -->
        <a-col :span="24">
          <a-form-item
            label="入职日期"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-date-picker
              style="width: 100%"
              v-decorator="[
                'working',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择入职日期',
                    },
                  ],
                  initialValue: offerChangeList.workingDate,
                },
              ]"
              format="YYYY-MM-DD"
              @change="handleWorkingClick"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="入职类型"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            :colon="false"
          >
            <a-select
           
              allowClear
              show-search
              v-decorator="[
                'entryType',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择入职类型',
                    },
                  ],
                  initialValue: offerChangeList.entryType?offerChangeList.entryType:'百得社招',
                },
              ]"
              placeholder="请选择入职类型"
              @change="selectEntryType"
            >
              <a-select-option
                :value="item.name"
                v-for="item in options"
                :key="item.id"
              >
                {{ item.name }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="入场时间"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-date-picker
              style="width: 100%"
              v-decorator="[
                'entranceDate',
                {
                  initialValue:offerChangeList.entranceDate
                }
              ]"
              format="YYYY-MM-DD"
              @change="handleEntranceClick"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="住宿"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-radio-group
              v-decorator="['stay', { initialValue: offerChangeList.stay }]"
            >
              <a-radio :value="1"> 是 </a-radio>
              <a-radio :value="2"> 否 </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="安排体检（合肥）"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-radio-group
              v-decorator="[
                'arrangePhysical',
                { initialValue: offerChangeList.arrangePhysical },
              ]"
            >
              <a-radio :value="1"> 是 </a-radio>
              <a-radio :value="2"> 否 </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="挂靠人员"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-radio-group
              v-decorator="[
                'affiliatedUser',
                { initialValue: offerChangeList.affiliatedUser },
              ]"
            >
              <a-radio :value="1"> 是 </a-radio>
              <a-radio :value="2"> 否 </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="特殊事项说明"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              type="textarea"
              :rows="4"
              v-decorator="[
                'comment',
                {
                  initialValue: offerChangeList.comment,
                },
              ]"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="offer确认备注"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
          >
            <a-input
              type="textarea"
              :rows="4"
              v-decorator="['comments',{
                initialValue:offerChangeList.comments
              }]"
              allowClear
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
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
        zIndex: 99,
      }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="cancelChangeOffer">
        取消
      </a-button>
      <a-button
        @click="handleOfferSubmit"
        type="primary"
        style="background: #22b8cf; border: #22b8cf"
        >确定</a-button
      >
    </div>
  </div>
</template>

<script>
import { getStructureList } from "@api/demandBranch/index";
import { getCode, getSetup, editOffer } from "@api/department/operation";
import { createNamespacedHelpers } from "vuex";
import pick from "lodash.pick";
import moment from "moment";
const { mapState } = createNamespacedHelpers("status");
export default {
  name: "RecruitOfferChange",
  props: ["offerChangeList", "type", "offerChangeVisible"],
  data() {
    return {
      staffForm: this.$form.createForm(this),
      jobList: [],
      cityList: [],
      optionCity: [],
      userAuthList: [], // 职能
      setupList: [],
      workingDate: "", // 入职日期
      options: [
        {
          id: 0,
          name: "百得社招",
        },
        {
          id: 1,
          name: "挂靠",
        },
        {
          id: 2,
          name: "转编",
        },
        {
          id: 3,
          name: "实习生转正",
        },
        {
          id: 4,
          name: "内推",
        },
         {
          id: 5,
          name: "调动",
        },
        {
          id: 6,
          name: "其他",
        },
      ],
      entryType: "百得社招", //入职类型
      entranceDate: null, // 入场时间
    };
  },
  computed: {
    ...mapState({
      expectedSalaries: (state) => state.expectedSalaries, // 薪资范围
      rankList: (state) => state.rankOfferList,
    }),
  },
  watch: {
    offerChangeList(e) {
      if (this.type == 8) {
        new Promise((resolve) => {
          resolve();
        }).then(() => {
          const formData = pick(e, [
            "cardNum",
            "level",
            "superName",
            "teacher",
            "sysCustomName",
            "sysOrgName",
            "sysOrgTname",
            "sysOrgLname",
            // "salary",
            "probation",
            "socialCity",
            "recruitName",
            "jobId",
            "cityId",
            "userAuth",
            "talentSourceId",
            "working",
            "entranceDate",
            "stay",
            "arrangePhysical",
            "affiliatedUser",
            "comment",
            "comments",
          ]);
          formData.jobId = e.job ? [e.job.parentCode, e.job.code] : [];
          formData.userAuth = e.userAuth ? e.userAuth.code : "";
          formData.working = moment(e.workingDate, "YYYY-MM-DD");
          formData.entranceDate = moment(e.entranceDate, "YYYY-MM-DD");
          this.staffForm.setFieldsValue(formData);
        });
      } else {
        new Promise((resolve) => {
          resolve();
        }).then(() => {
          const formData = pick(e, ["sysCustomName", "cityId"]);
          formData.cityId = e.cityId ? ["245"] : ["245"];
          formData.sysCustomName = e.sysCustomName
            ? "安徽百得思维信息科技有限公司"
            : "安徽百得思维信息科技有限公司";
          this.staffForm.setFieldsValue(formData);
        });
      }
    },
  },
  created() {
    this.getCodeInit(2);
    this.getCodeInit(1);
    this.getCodeInit(3); // 人员编制
    this.getSetupInit();
    this.offerChangeList.workingDate = moment(
      this.offerChangeList.workingDate,
      "YYYY-MM-DD"
    );
    // this.offerChangeList.entranceDate = moment(
    //   this.offerChangeList.entranceDate,
    //   "YYYY-MM-DD"
    // );
    if(this.offerChangeList.entranceDate=="--"){
      this.offerChangeList.entranceDate=null
    }else{
      this.offerChangeList.entranceDate = moment(
      this.offerChangeList.entranceDate,
      "YYYY-MM-DD"
     );
    }
    this.offerChangeList.job = [
      this.offerChangeList.job.parentCode,
      this.offerChangeList.job.code,
    ];
  },
  methods: {
    selectEntryType(e) {
      this.entryType = e;
    },
    handleContanctBlur() {
      this.optionCity = this.cityList.slice(0, 100);
    },
    handleContentFocus() {
      this.optionCity = this.cityList.slice(0, 100);
    },
    searchValue(value) {
      console.log(value);
      let cityList_ = this.cityList.filter(
        (item) => item.name.indexOf(value) > -1
      );
      if (cityList_.length > 100 || value === "") {
        cityList_ = cityList_.slice(0, 100);
      }
      this.optionCity = cityList_;
    },
    handleContactSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchValue(e);
          this.timer = null;
        }, 300);
      }
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleOfferSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          var workingDate = new Date(values.working).getTime();
          var entranceDate = new Date(values.entranceDate).getTime();
          console.log(values)
          editOffer({
              talentId:this.offerChangeList.talentId,
              jobOfferId:this.offerChangeList.jobOfferId,
              workingDate: workingDate, // 入职日期
              entranceDate: entranceDate?entranceDate:null, // 入场时间
              comments: values.comments, // offer备注
              orgId: this.offerChangeList.orgId, // 部门id
              no:this.offerChangeList.no, // 萝卜秀编码
              cardNum: values.cardNum, // 身份证号
              jobId: values.jobId[1], // 标准岗位id
              level: values.level, // 职级职等
               cityId: values.cityId.length === 1 ? 245 : values.cityId, // 城市级别id
               teacher: values.teacher, // 导师
              superName: values.superName, // 上级名称
              sysCustomName: values.sysCustomName, // 公司名称
              sysOrgName: values.sysOrgName, // 一级部门
              sysOrgTname: values.sysOrgTname, // 二级部门
              sysOrgLname: values.sysOrgLname, // 末级部门
              userAuthId: values.userAuth, // 人员编制
              // salary: values.salary, // 录用薪资
               probation: values.probation, // 使用期天数
              socialCity: values.socialCity, // 社保缴纳地
              talentSourceId: values.talentSourceId, // 候选人来源id
              recruitName: values.recruitName, // 招聘对接人
              stay: values.stay, // 是否住宿
              arrangePhysical: values.arrangePhysical, // 安排体检
              affiliatedUser: values.affiliatedUser, // 挂靠人员
              comment: values.comment, // 特殊情况说明
              entryType:values.entryType //入职类型
          }).then(res=>{
              console.log(res)
              this.$emit('update:offerChangeVisible',false)
              if(res.data.code==0){
                   this.$message.success(res.data.data);
              }else{
                this.$message.error(res.data.mesg);
              }
          })
        //   console.log("values.talentSourceId", entranceDate, values);

        }
      });
      // this.$emit('update:offerChangeVisible',false)
    },
    cancelChangeOffer() {
      this.$emit("update:offerChangeVisible", false);
    },
    handleWorkingClick(e, value) {
      console.log(e);
      this.workingDate = value;
    },
    handleEntranceClick(e, value) {
      this.entranceDate = value;
    },
    async getCodeInit(type) {
      try {
        const res = await getCode({
          code: type,
        });
        switch (type) {
          case 1:
            this.cityList = res.data.data.codeList;
            this.optionCity = [...this.cityList];
            break;
          case 2:
            this.jobList = res.data.data.codeList;
            break;
          default:
            this.userAuthList = res.data.data.codeList;
            break;
        }
      } catch (error) {}
    },
    cascaderChange(val) {
      console.log(val);
    },
    // 获取来源渠道
    async getSetupInit() {
      try {
        const res = await getSetup({
          setupType: 2,
        });
        this.setupList = res.data.data.setupList;
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>