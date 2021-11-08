<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="handleClose"
      width="520"
      :destroyOnClose="true"
      :visible="interviewVisible"
      title="面试安排"
    >
      <a-form :form="staffForm" @submit="handleSubmit" class="mateAudition">
        <a-row>
          <a-col :span="24">
            <a-form-item
              label="应聘部门"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-input
                allowClear
                v-decorator="[
                  'application',
                  {
                    initialValue: OrgName,
                  },
                ]"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="面试官"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-select
                allowClear
                @blur="handleInterviewertBlur"
                @focus="handleInterviewertFocus"
                @search="handleInterviewertSearch"
                :filter-option="filterOption"
                v-decorator="[
                  'interviewer',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择面试官',
                      },
                    ],
                  },
                ]"
                placeholder="请选择"
                mode="multiple"
              >
                <a-select-option
                  :value="item.userId"
                  v-for="item in optionUserData"
                  :key="item.userId"
                  >{{ item.userName
                  }}<span style="color: #4480EE;margin-left: 10px"
                    >[{{ item.mail }}]</span
                  ></a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="面试时间"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
              required
              class="interviewTime"
            >
              <a-form-item
                :style="{ display: 'inline-block', width: 'calc(50% - 10px)' }"
              >
                <a-date-picker
                  allowClear
                  style="width: 100%"
                  @change="handleDateClick"
                  format="YYYY-MM-DD"
                  v-decorator="['interviewBeginTime']"
                  :disabledDate="disabledDate"
                />
              </a-form-item>
              <span
                :style="{
                  display: 'inline-block',
                  width: '20px',
                  textAlign: 'center',
                }"
              >
                -
              </span>
              <a-form-item
                :style="{ display: 'inline-block', width: 'calc(50% - 10px)' }"
              >
                <a-time-picker
                  :minuteStep="15"
                  format="HH:mm"
                  @change="handleTimeClick"
                  style="width: 100%"
                  v-decorator="['time']"
                />
              </a-form-item>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="面试方式"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 17 }"
              :colon="false"
              class="mate-form"
              required
            >
              <a-radio-group
                v-decorator="['interviewerType', { initialValue: 1 }]"
                buttonStyle="solid"
                @change="handleInterviewRadio"
              >
                <a-radio-button
                  :value="item.value"
                  v-for="item in interviewTypes"
                  :key="item.value"
                  class="button-info"
                >
                  <span>
                    {{ item.label }}
                  </span>
                </a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="通知面试官"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 17 }"
              :colon="false"
              class="mate-form"
              required
            >
              <a-radio-group
                v-decorator="['interviewNoticeId', { initialValue: 3 }]"
                buttonStyle="solid"
              >
                <a-radio-button
                  :value="item.value"
                  v-for="item in notifyInterviewer"
                  :key="item.value"
                  class="button-info"
                  :disabled="item.value == 2"
                >
                  {{ item.label }}
                </a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="通知候选人"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 17 }"
              :colon="false"
              required
              class="mate-form"
            >
              <a-radio-group
                v-decorator="['talentNoticeId', { initialValue: 1 }]"
                buttonStyle="solid"
              >
                <a-radio-button
                  :value="item.value"
                  v-for="item in notifyCandidate"
                  :key="item.value"
                  class="button-info"
                  :disabled="item.value == 2"
                >
                  {{ item.label }}
                </a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="联系人"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-select
                allowClear
                showSearch
                @blur="handleContanctBlur"
                @focus="handleContentFocus"
                @search="handleContactSearch"
                :filter-option="filterOption"
                v-decorator="[
                  'contacts',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择联系人',
                      },
                    ],
                  },
                ]"
                placeholder="请选择"
              >
                <a-select-option
                  :value="item.userId"
                  v-for="item in optionData"
                  :key="item.userId"
                  >{{ item.userName
                  }}<span style="color: #4480EE;margin-left: 10px"
                    >[{{ item.mail }}]</span
                  ></a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="内部抄送人"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-select
                allowClear
                v-decorator="['insideRemind']"
                placeholder="请选择"
                mode="multiple"
                @blur="handleMultipleBlur"
                @focus="handleMultipleFocus"
                @search="handleMultipleSearch"
                :filter-option="filterOption"
              >
                <a-select-option
                  :value="item.userId"
                  v-for="item in optionData"
                  :key="item.userId"
                  >{{ item.userName
                  }}<span style="color: #4480EE;margin-left: 10px"
                    >[{{ item.mail }}]</span
                  ></a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="外部抄送人"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-select
                allowClear
                v-decorator="['outsideRemind']"
                placeholder="请选择"
                mode="multiple"
                @blur="handleOutsideBlur"
                @focus="handleOutsideFocus"
                @search="handleOutsideSearch"
                :filter-option="filterOption"
              >
                <a-select-option
                  :value="item.userId"
                  v-for="item in optionUserData"
                  :key="item.userId"
                  >{{ item.userName
                  }}<span style="color: #4480EE;margin-left: 10px"
                    >[{{ item.mail }}]</span
                  ></a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item
              label="面试地点"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-cascader 
                :options="cityList" 
                placeholder="请选择面试地点" 
                allowClear
                @change="handleCityChange"
                v-decorator="['interviewAddr',{
                  rules: [
                    {
                      required: true,
                      message: '请选择面试地点'
                    }
                  ]
                }]"
                :field-names="{ label: 'setupContent', value: 'setupCode',children: 'children'  }"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="邮件主题"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-input
                v-decorator="[
                  'mailSubject',
                  {
                    initialValue: `安徽百得思维--${list}--${positionName}--${interviewLabel}`,
                  },
                ]"
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
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="handleClose">
          取消
        </a-button>
        <a-button
          @click="handleSubmit"
          type="primary"
          :loading="interviewLoading"
          style="background: #22B8CF;border: #22B8CF"
          >确定</a-button
        >
        <!--  -->
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('status')
import { getUserInfoList } from '@api/manage/index'
import { getLeaderInfo } from '@api/branchHC/index'
import { addinterviewInfo, getSetupAddress } from '@api/department/operation'
import moment from 'moment'

export default {
  props: ['OrgName', 'id', 'positionName', 'show'],
  data() {
    return {
      staffForm: this.$form.createForm(this),
      value: 1,
      userInfoList: [],
      distributionList: [],
      optionData: [],
      optionUserData: [],
      timeValue: '',
      dateTime: '',
      tragestShow: false,
      keywordContact: '', // 联系人
      cityList: [],
      cityValue: '',
      interviewLabel: '到场面试',
      list: '',
      interviewLoading: false,
      interviewVisible: false,
      interviewAddrList: ''
    }
  },
  computed: {
    ...mapState({
      interviewTypes: (state) => state.interviewTypes, // 面试方式
      notifyInterviewer: (state) => state.notifyInterviewer, // 通知面试官
      notifyCandidate: (state) => state.notifyCandidate, // 通知候选人
      // hasCallback: (state) => state.hasCallback, // 是否复试
      interviewResults: (state) => state.interviewResults, // 面试结论
    }),
  },
  watch: {
    show(e) {
      this.interviewVisible = e
    },
    OrgName(e) {
      let tmpList = e.split('/')
      this.list = tmpList.pop()
    },
  },
  mounted() {
    this.getLeaderInfoInit()
    this.getUserInfoListInit()
    this.getSetupInit()
  },
  methods: {
    moment,
    handleClose() {
      this.$emit('update:show', false)
    },
    async getLeaderInfoInit() {
      try {
        const res = await getLeaderInfo()
        console.log(res)
        if (res.data.code == 0) {
          this.userInfoList = res.data.data
        }
      } catch {
        console.log(res)
      }
    },
    handleInterviewRadio(e) {
      const interviewTmpLabel = this.interviewTypes.find(
        (education) => education.value === e.target.value
      )
      this.interviewLabel = interviewTmpLabel.label
    },
    // 联席人失焦
    handleContanctBlur() {
      this.optionData = this.distributionList.slice(0, 100)
      console.log(this.optionData)
    },
    // 联系人获取焦点
    handleContentFocus() {
      this.optionData = this.distributionList.slice(0, 100)
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    async getSetupInit() {
      try {
        const res = await getSetupAddress({
          code: 0,
        })
        if (res.data.code == 0) {
          this.cityList = res.data.data.addressList
        }
      } catch {
        console.log(res)
      }
    },
    // 联系人输入
    handleContactSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchValue(e)
          this.timer = null
        }, 300)
      }
      this.keywordContact = e
    },
    handleMultipleBlur() {
      this.optionData = this.distributionList.slice(0, 100)
    },
    handleMultipleFocus() {
      this.optionData = this.distributionList.slice(0, 100)
    },
    handleMultipleSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchValue(e)
          this.timer = null
        }, 300)
      }
    },
    handleOutsideBlur() {
      this.optionUserData = this.userInfoList.slice(0, 100)
    },
    handleOutsideFocus() {
      this.optionUserData = this.userInfoList.slice(0, 100)
    },
    handleOutsideSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchUserValue(e)
          this.timer = null
        }, 300)
      }
    },
    handleInterviewertBlur() {
      this.optionUserData = this.userInfoList.slice(0, 100)
    },
    handleInterviewertFocus() {
      this.optionUserData = this.userInfoList.slice(0, 100)
    },
    handleInterviewertSearch(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.searchUserValue(e)
          this.timer = null
        }, 300)
      }
    },
    searchValue(value) {
      let distributionList_ = this.distributionList.filter(
        (item) => item.userName.indexOf(value) > -1
      )
      if (distributionList_.length > 100 || value === '') {
        distributionList_ = distributionList_.slice(0, 100)
      }
      this.$nextTick(() => {
        this.optionData = distributionList_
      })
    },
    searchUserValue(value) {
      let userInfoList_ = this.userInfoList.filter(
        (item) => item.userName.indexOf(value) > -1
      )
      if (userInfoList_.length > 100 || value === '') {
        userInfoList_ = userInfoList_.slice(0, 100)
      }
      this.$nextTick(() => {
        this.optionUserData = userInfoList_
      })
    },
    // 面试时间限制
    disabledDate(current) {
      return current && current < moment().endOf('day')
    },
    async getUserInfoListInit() {
      try {
        const res = await getUserInfoList()
        this.distributionList = res.data.data.userList.list
      } catch (error) {}
    },
    handleDateClick(e, value) {
      this.timeValue = value
    },
    handleTimeClick(e, value) {
      this.dateTime = value
    },
    handleCityChange(e,arr){
      this.interviewAddrList = arr.length > 1 ? arr[0].setupContent + '-' + arr[1].setupContent : arr[0].setupContent
    },
    handleSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        this.$emit('error')
        if (!err) {
          let newDate = new Date(this.timeValue + ' ' + this.dateTime).getTime()
          // 面试安排
          this.interviewLoading = true
          addinterviewInfo({
            interviewerId: values.interviewer,
            talentId: this.id,
            interviewType: values.interviewerType,
            interviewTime: newDate,
            interviewAddr: this.interviewAddrList,
            interviewNoticeId: values.interviewNoticeId,
            talentNoticeId: values.talentNoticeId,
            linkManId: values.contacts,
            inStakeHoldersId: values.insideRemind ? values.insideRemind : null,
            outStakeHoldersId: values.outsideRemind
              ? values.outsideRemind
              : null,
            mailSubject: values.mailSubject,
          }).then((res) => {
            this.$emit('recruit-action')
            this.$emit('update:show', false)
            this.interviewLoading = false
            if (res.data.code == 0) {
              this.staffForm.resetFields()
              this.$message.success(res.data.data)
            } else {
              this.$message.error(res.data.mesg)
            }
          })
        }
      })
    },
  },
}
</script>

<style scope>
.confirm-title {
  font-size: 17px;
  color: #fd5178;
}
.mateAudition {
  margin-bottom: 30px;
}
.ant-radio-button-wrapper {
  margin: 0 10.5px 0 0;
  border-left: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 97px;
  text-align: center;
}
.ant-radio-button-wrapper:first-child {
  border-radius: 4px;
  width: 97px;
  text-align: center;
}
.ant-radio-button-wrapper:last-child {
  border-radius: 4px;
  width: 97px;
}
.interviewTime {
  margin-bottom: 0;
}
.ant-radio-group-solid
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::after {
  content: '✓';
  background: #cccccc;
  border: none;
  width: 0px;
  height: 0px;
  display: inline-block;
}
.ant-radio-group-solid
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  color: #fff;
  background: #4ec6d8;
  border: 1px solid #4ec6d8;
  box-shadow: 1px 0 0 0 #4ec6d8;
}
.ant-radio-group-solid
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
  color: #fff;
  background: #4ec6d8;
  box-shadow: 1px 0 0 0 #4ec6d8;
  border: 1px solid #4ec6d8;
}
.button-info:hover {
  color: #4ec6d8;
  border: 1px solid #4ec6d8;
}
.ant-radio-button-wrapper:not(:first-child)::before {
  width: 0;
}
</style>
