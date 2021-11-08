<template>
  <div class="recursion-action">
    <a-modal
      :title="actionTitle"
      v-model="staffVisible"
      width="460px"
      :destroyOnClose="true"
      @cancel="handleClose"
    >
      <a-form :form="staffForm" @submit="handleSubmit">
        <a-row>
          <a-col :span="24">
            <a-form-item
              label="已经选择"
              :label-col="{ span: 6 }"
              :colon="false"
              :wrapper-col="{ span: 16 }"
            >
              <div class="recruit-title">
                <a-tag
                  :key="item.talentId"
                  v-for="(item, index) in jobTalentId"
                  closable
                  @close="preventDefault(item, index)"
                >
                  {{ item.fullName }}
                </a-tag>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="type == 3 || type == 4">
            <a-form-item
              label="筛选面试官"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-select
                allowClear
                @blur="handleInterviewertBlur"
                @focus="handleInterviewertFocus"
                @search="handleInterviewertSearch"
                option-filter-prop="label"
                v-decorator="['interList',{
                    rules: [
                      {
                        required: true,
                        message: '请选择筛选面试官'
                      }
                    ]
                  }]"
                mode="multiple"
                placeholder="请选择筛选面试官"
              >
                <a-select-option
                  :value="item.userId"
                  v-for="item in optionUserData"
                  :key="item.userId"
                   :label="item.userName + '<' + item.mail + '>'"
                >
                  {{ item.userName }}<span style="color: #4480EE;margin-left: 10px"
                    >[{{ item.mail }}]</span
                  ></a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="type == 1 || type == 3">
            <a-form-item
              label="淘汰原因"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-input
                type="textarea"
                v-decorator="['weedOutRemark']"
                :rows="4"
                allowClear
              />
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="type == 5 || type == 6 || type == 8">
            <a-form-item
              label="放弃原因"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-input
                type="textarea"
                v-decorator="['interRemark']"
                :rows="4"
                allowClear
              />
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="type == 6">
            <a-form-item
              label="放弃原因分类"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <!-- <a-radio-group v-decorator="['isDelete', { initialValue: 1 }]">
                <a-radio :value="1">
                  是,已确认流失
                </a-radio>
                <a-radio :value="0">
                  否,后续可挽回
                </a-radio>
              </a-radio-group> -->
              <a-select
                allowClear
                v-decorator="['commentsType',{
                    rules: [
                      {
                        required: true,
                        message: '请选择放弃原因分类'
                      }
                    ]
                  }]"
                placeholder="请选择放弃原因分类"
              >
                <a-select-option :value="0">薪资</a-select-option>
                <a-select-option :value="1">其他</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="type == 7">
            <a-form-item
              label="备注"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-input
                type="textarea"
                :rows="4"
                v-decorator="['giveUpRemark']"
                allowClear
              />
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="type == 9">
            <a-form-item
              label="确认到岗日期"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
              :colon="false"
            >
              <a-date-picker
                allowClear
                :disabledDate="disabledDate"
                style="width: 100%"
                v-decorator="['time',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择确认到岗日期'
                      }
                    ]
                  }
                ]"
                format="YYYY-MM-DD"
                @change="handleDateClick"
              />
              
            </a-form-item>
          </a-col>
         
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button key="back" @click="handleClose">取消</a-button>
        <a-button
          key="submit"
          style="background: #22B8CF;border: #22B8CF"
          type="primary"
          @click="handleSubmit"
          >确定</a-button
        >
      </template>


    </a-modal>
  </div>
</template>

<script>
import {
  delGiveUpOffer,
  affirmOffer,
  weedOutCandidate,
  passCandidate,
  updateScreenWeedOut,
  UapdateGiveUpInterview,
  updateScreenpass,
  giveUpOffer,
  giveUpContract,
  affirmEntry,
  passInterview,
} from '@api/department/operation'
import {
	getLeaderInfo,
} from '@api/branchHC/index';//获取面试官
import moment from 'moment'
export default {
  props: ['jobTalentId', 'customId', 'show', 'type'],
  data() {
    return {
      staffForm: this.$form.createForm(this),
      userInfoList: [],
      userInfoList_: [],
      optionUserData: [],
      TmpAllDataList: [],
      actionTitle: '',
      staffVisible: false,
      delJobTalentId: []
    }
  },
  watch: {
    show(e) {
      this.staffVisible = e
    },
    type(type) {
      switch (type) {
        case 1:
          this.actionTitle = '简历淘汰'
          break
        case 2:
          this.actionTitle = '简历通过'
          break
        case 3:
          this.actionTitle = '面试官淘汰'
          break
        case 4:
          this.actionTitle = '面试官通过'
          break
        case 5:
          this.actionTitle = '放弃面试'
          break
        case 6:
          this.actionTitle = '放弃offer'
          break
        case 7:
          this.actionTitle = '确认流失'
          break
        case 8:
          this.actionTitle = '放弃入职'
          break
        case 9:
          this.actionTitle = '确认入职'
          break
        default:
          this.actionTitle = '通过面试'
          break
      }
    },
  },
  mounted() {
    this.getLeaderInfoInit()
  },
  methods: {
    moment,
    handleDateClick(e, value) {
      this.timeValue = value
    },
    handleClose() {
      this.$emit('update:show', false)
      setTimeout(() => {
        this.delJobTalentId.forEach(item => {
          this.jobTalentId.push(item)
        })
        this.delJobTalentId = []
      }, 200);
    },
    preventDefault(e, index) {
      this.delJobTalentId.push(this.jobTalentId[index])
      this.jobTalentId.splice(index, 1);
      console.log(this.jobTalentId,'this.jobTalentId')
    },
    async getLeaderInfoInit() {
      try {
        const res = await getLeaderInfo({
          customId: this.customId,
        })
        this.userInfoList = res.data.data;
        this.userInfoList.map((item)=>{
            // console.log(item.userId,'ids')
        })
      } catch (error) {}
    },
    handleInterviewertBlur() {
      this.optionUserData = this.userInfoList_
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
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    searchUserValue(value) {
      let userInfoList_ = this.userInfoList.filter(
        (item) => item.userName.indexOf(value) > -1||item.mail.indexOf(value)>-1
      )
      if (userInfoList_.length > 100 || value === '') {
        userInfoList_ = userInfoList_.slice(0, 100)
      }
      this.$nextTick(() => {
        this.optionUserData = userInfoList_
      })
    },
    disabledDate(current) {
      // moment().startOf("day") > current || current > moment().endOf("day")
			return current > moment().endOf("day");
		},
    handleSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          let newList = []
          let TmpAllList = this.jobTalentId
          TmpAllList.map((item) => {
            newList.push(item.talentId)
          })
          this.TmpAllDataList = newList
          let newDate = new Date(this.timeValue).getTime()
          // console.log(newDate,values,'this.timeValue')
          switch (this.type) {
            case 1:
              // 批量淘汰（初选）
              weedOutCandidate({
                comments: values.weedOutRemark,
                jobTalentIdList: newList,
              }).then((res) => {
                this.$emit('update:show', false)
                this.$emit('recruit-action', 2)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 2:
              // 批量通过（初选）
              passCandidate({
                jobTalentIdList: newList,
              }).then((res) => {
                this.$emit('update:show', false)
                this.$emit('recruit-action', 2)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 3:
              // 面试官淘汰
              updateScreenWeedOut({
                comments: values.interRemark,
                jobTalentIdList: newList,
                interviewerId: values.interList,
              }).then((res) => {
                this.$emit('update:show', false)
                this.$emit('recruit-action', 3)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 4:
              // 面试官通过
              updateScreenpass({
                jobTalentIdList: newList,
                interviewerId: values.interList,
              }).then((res) => {
                this.$emit('update:show', false)
                this.$emit('recruit-action', 3)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 5:
              // 面试官邀约-放弃面试
              UapdateGiveUpInterview({
                comments: values.interRemark,
                // jobTalentIdList: newList,
                talentIdList: newList,
              }).then((res) => {
                this.$emit('update:show', false)
                this.$emit('recruit-action', 4)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 6:
              // 放弃offer(offer)
              giveUpOffer({
                comments: values.interRemark,
                jobTalentIdList: newList,
                isGiveUp: values.commentsType,
              }).then((res) => {
                this.$emit('update:show', false)
                this.$emit('recruit-action', 5)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 7:
              // 确认流失（候选人放弃）
              delGiveUpOffer({
                comments: values.giveUpRemark,
                jobTalentIdList: newList,
              }).then((res) => {
                this.$emit('update:show', false)
                this.$emit('recruit-action', 7)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 8:
              // 放弃入职
              giveUpContract({
                comments: values.interRemark,
                jobTalentIdList: newList,
                // isDelete: values.isDelete,
              }).then((res) => {
                this.$emit('update:show', false)
                this.$emit('recruit-action', 6)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 9:
              // 确认入职
              console.log(values.entryType,'entryType')
              affirmEntry({
                jobTalentIdList: newList,
                plannedWorkingDate: newDate,
                entryType: values.entryType,
              }).then((res) => {
                this.$emit('update:show', false)
                this.$emit('recruit-action', 6)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 10:
              // 面试官邀约-通过面试
              passInterview({
                jobTalentIdList: newList,
              }).then((res) => {
                this.$emit('update:show', false)
                this.$emit('recruit-action', 4)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
          }
        }
      })
    },
  },
}
</script>

<style>
.recruit-title {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  padding: 0 0px 10px 10px;
}
</style>
