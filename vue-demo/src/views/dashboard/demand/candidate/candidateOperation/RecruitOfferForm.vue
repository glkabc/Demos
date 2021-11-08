<template>
  <div class="recursion-action">
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
            <span>{{ offerList.OrgName }}</span>
          </a-form-item>
          <a-form-item
            label="需求/订单编号"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span
              >{{ offerList.dremandName}} /
              {{ offerList.demandId }}</span
            >
          </a-form-item>
          <a-form-item
            label="招聘名称/分配编号"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span
              >{{ offerList.positionName }} /
              {{ offerList.distributionId }}</span
            >
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
                      message: '请输入身份证号'
                    },
                    {
                      message: '身份证输入错误！',
                      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                    }
                  ]
                }
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
            <a-input
              placeholder="请输入职级职等"
              v-decorator="[
                'level',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入职级职等'
                    }
                  ]
                }
              ]"
              allowClear
            />
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
              v-decorator="['superName']"
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
              v-decorator="['teacher']"
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
                  initialValue: '安徽百得思维信息科技有限公司'
                }
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
              v-decorator="['sysOrgName']"
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
              v-decorator="['sysOrgTname']"
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
              v-decorator="['sysOrgLname']"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
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
                      message: '请输入录用薪资'
                    },
                  ]
                }
              ]"
              suffix="k"
              type="number"
              inputmode="numeric"
            />
          </a-form-item>
        </a-col>
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
                      pattern: /^[1-9]\d*$/,
                      message: '请输入数字'
                    }
                  ]
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
                      message: '请输入社保缴纳地'
                    }
                  ]
                }
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
                      message: '请输入招聘对接人'
                    }
                  ]
                }
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
              allowClear
              :options="jobList"
              :fieldNames="{ label: 'name', value: 'code', children: 'children' }"
              placeholder="请选择标准岗位名称"
              v-decorator="[
                'jobId',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择标准岗位名称'
                    }
                  ]
                }
              ]"
              :getPopupContainer="
                triggerNode => {
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
              allowClear
              placeholder="请选择工作地点"
              v-decorator="[
                'cityId',
                {
                  initialValue: ['245'],
                },
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择工作地点'
                    }
                  ]
                }
              ]"
              :getPopupContainer="
                triggerNode => {
                  return triggerNode.parentNode || document.body;
                }
              "
            >
              <a-select-option
                :value="item.code"
                v-for="item in cityList"
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
                      message: '请选择人员编制'
                    }
                  ]
                }
              ]"
              :getPopupContainer="
                triggerNode => {
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
                      message: '请选择候选人来源'
                    }
                  ]
                }
              ]"
              :getPopupContainer="
                triggerNode => {
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
                      message: '请选择入职日期'
                    }
                  ]
                }
              ]"
              format="YYYY-MM-DD"
              @change="handleWorkingClick"
              allowClear
            />
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
              v-decorator="['entrance']"
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
            <a-radio-group v-decorator="['stay', { initialValue: 1 }]">
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="2">
                否
              </a-radio>
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
              v-decorator="['arrangePhysical', { initialValue: 1 }]"
            >
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="2">
                否
              </a-radio>
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
              v-decorator="['affiliatedUser', { initialValue: 2 }]"
            >
              <a-radio :value="1">
                是
              </a-radio>
              <a-radio :value="2">
                否
              </a-radio>
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
              v-decorator="['comment']"
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
              v-decorator="['comments']"
              allowClear
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { affirmOffer, getSetup, getCode } from "@api/department/operation";
import moment from "moment";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
export default {
  props: {
    offerList: Object
  },
  data() {
    return {
      staffForm: this.$form.createForm(this),
      // timeValue: "", // offer确认日期
      workingDate: "", // 入职日期
      entranceDate: "", // 入场时间
      userInfoList: [],
      setupList: [], // 来源渠道数据
      userAuthList: [], // 职能
      cityList: [], // 城市
      jobList: [] // 岗位
    };
  },
  computed: {
    ...mapState({
      expectedSalaries: state => state.expectedSalaries // 薪资范围
    })
  },
  mounted() {
    this.getSetupInit();
    this.getCodeInit(1); // 城市等级
    this.getCodeInit(2); // 岗位
    this.getCodeInit(3); // 人员编制
  },
  methods: {
    moment,
    // handleDateClick(e, value) {
    //   this.timeValue = value;
    // },
    // 获取来源渠道
    async getSetupInit() {
      try {
        const res = await getSetup({
          setupType: 2
        });
        this.setupList = res.data.data.setupList;
      } catch (error) {}
    },
    async getCodeInit(type) {
      try {
        const res = await getCode({
          code: type
        });
        console.log(res);
        switch (type) {
          case 1:
            this.cityList = res.data.data.codeList;
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
    handleWorkingClick(e, value) {
      this.workingDate = value;
    },
    handleEntranceClick(e, value) {
      this.entranceDate = value;
    },
    handleOfferSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        this.$emit("error");
        if (!err) {
          // var newDate = new Date(this.timeValue).getTime();
          var workingDate = new Date(this.workingDate).getTime();
          var entranceDate = new Date(this.entranceDate).getTime();
          this.$emit("interviewLoading",2);
          affirmOffer({
            talentId: this.offerList.talentId,
            // resumeId: this.offerList.list.resumeId,
            demandId: this.offerList.demandId,
            // confirmedDate: newDate, // offer确认日期
            workingDate: workingDate, // 入职日期
            entranceDate: entranceDate, // 入场时间
            comments: values.comments, // offer备注
            orgId: this.offerList.organizeId, // 部门id
            distributionId: this.offerList.distributionId, // 萝卜秀编码
            cardNum: values.cardNum, // 身份证号
            jobId: values.jobId[1], // 标准岗位id
            level: values.level, // 职级职等
            cityId: values.cityId, // 城市级别id
            teacher: values.teacher, // 导师
            superName: values.superName, // 上级名称
            sysCustomName: values.sysCustomName, // 公司名称
            sysOrgName: values.sysOrgName, // 一级部门
            sysOrgTname: values.sysOrgTname, // 二级部门
            sysOrgLname: values.sysOrgLname, // 末级部门
            userAuthId: values.userAuth, // 人员编制
            salary: values.salary, // 录用薪资
            probation: values.probation, // 使用期天数
            socialCity: values.socialCity, // 社保缴纳地
            talentSourceId: values.talentSourceId, // 候选人来源id
            recruitName: values.recruitName, // 招聘对接人
            stay: values.stay, // 是否住宿
            arrangePhysical: values.arrangePhysical, // 安排体检
            affiliatedUser: values.affiliatedUser, // 挂靠人员
            comment: values.comment // 特殊情况说明
          }).then(res => {
            this.$emit("interviewLoading",3);
            if (res.data.code == 0) {
              this.$emit("recruit-action");
              this.$message.success(res.data.data);
              this.staffForm.resetFields()
            } else {
              this.$emit("recruit-action");
              this.$message.error(res.data.mesg);
              this.staffForm.resetFields()
            }
          });
        }
      });
    }
  }
};
</script>

<style>
.recruit-title {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  padding: 0 0px 10px 10px;
}
.spread {
  margin-bottom: 0px;
}
</style>
