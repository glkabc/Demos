<template>
  <div>
    <a-modal
      title="确认提示"
      v-model="staffVisible"
      width="500px"
      :destroyOnClose="true"
      @cancel="handleClose"
    >
      <a-form :form="staffForm" @submit="handleSubmit">
        <a-row>
          <!-- <a-col :span="24" v-if="confirmList.size > 1">
            <a-form-item
              :label-col="{ span: 16 }"
              :wrapper-col="{ span: 8 }"
              :colon="false"
            >
              <span slot="label">
                <span v-if="updateType == 1"
                  >归属需求尚有<span class="confirm-title">{{
                    confirmList.size
                  }}</span
                  >个招聘正在进行，是否同步关闭：</span
                >
                <span v-if="updateType == 2"
                  >归属需求尚有<span class="confirm-title">{{
                    confirmList.size
                  }}</span
                  >个招聘正在进行，是否同步暂停：</span
                >
                <span v-if="updateType == 3"
                  >归属需求尚有<span class="confirm-title">{{
                    confirmList.size
                  }}</span
                  >个招聘正在进行，是否同步恢复：</span
                >
              </span>
              <a-radio-group v-decorator="['radioGroup', { initialValue: 0 }]">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="0">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="updateType == 1">
            <a-form-item
              label="关闭原因"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-select
                v-decorator="[
                  'closeCause',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择关闭原因',
                      },
                    ],
                  },
                ]"
                placeholder="请选择"
                allowClear
              >
                <a-select-option
                  :value="item.label"
                  v-for="item in suspendReason"
                  :key="item.value"
                  >{{ item.label }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="updateType == 2">
            <a-form-item
              label="重启日期"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-date-picker
                style="width: 100%"
                v-decorator="['time']"
                format="YYYY-MM-DD"
                @change="handleDateClick"
                allowClear
              />
            </a-form-item>
          </a-col> -->
          <a-col :span="24" >
            <a-form-item
              label="原因"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
            <a-input placeholder="请输入原因" 
            allowClear
              v-decorator="[
                  'closeCause',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入原因',
                      },
                    ],
                  },
                ]"
            />
              <!-- <a-select
                v-decorator="['suspendCause', 
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择暂停原因',
                      }
                    ]
                  }
                ]"
                placeholder="请选择"
                allowClear
              >
                <a-select-option
                  :value="item.label"
                  v-for="item in suspendReason"
                  :key="item.value"
                  >{{ item.label }}</a-select-option
                >
              </a-select> -->
            </a-form-item>
          </a-col>
          <!-- <a-col :span="24">
            <a-form-item
              label="干系人提醒"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-select
                v-decorator="[
                  'remind',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择干系人提醒',
                      },
                    ],
                  },
                ]"
                placeholder="请选择"
                mode="multiple"
                allowClear
              >
                <a-select-option
                  :value="item.userId"
                  v-for="item in distributionList"
                  :key="item.userId"
                  >{{ item.userName }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col> -->
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
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('status')
import { getUserInfoList } from '@api/manage/index'

// import { closeJob, suspendJob, renewJob } from '@api/department/index'
import {
  getOnLineDemand, //在招1
  getsuspendDemand, //暂停2
} from "@api/branchHC/index";
export default {
  props: ['confirmList', 'confirmVisible', 'updateType','newDemandList','newIdList'],
  data() {
    return {
      staffForm: this.$form.createForm(this),
      value: 1,
      list: {},
      timeValue: '', // 重启日期
      distributionList: '', // 获取干系人列表
      staffVisible: false,
      closeCause:'',
    }
  },
  computed: {
    ...mapState({
      suspendReason: (state) => state.suspendReason, // 关闭暂停原因
    }),
  },
  watch: {
    confirmVisible(e) {
      this.staffVisible = e
    },
  },
  mounted() {
    this.getUserInfoInit()
  },
  methods: {
    handleClose() {
      this.$emit('update:confirmVisible', false)
    },
    async getUserInfoInit() {
      try {
        const res = await getUserInfoList()
        this.distributionList = res.data.data.userList.list
      } catch (error) {}
    },
    handleDateClick(e, value) {
      this.timeValue = value
    },
    handleSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          let newDate = new Date(this.timeValue).getTime()
          let demandId=[];
          demandId.push(this.newDemandList)
          switch (this.updateType) {
            case 3:
              // 上线
              getOnLineDemand({
                // distributionIdList: this.newIdList,
                demandIds: demandId,
                comments: values.closeCause,
              }).then((res) => {
                this.$emit('add-success')
                this.$emit('update:confirmVisible', false)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 2:
              // 暂停
              getsuspendDemand({
                // distributionIdList: this.newIdList, // 任务id[集合]
                demandIds: demandId, // 需求id
                comments: values.closeCause, // 原因
              }).then((res) => {
                this.$emit('update:confirmVisible', false)
                this.$emit('add-success')
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 3:
              // 恢复
              renewJob({
                // distributionIdList: this.newIdList, // 任务id[集合]
                demandId: this.newDemandList, // 需求id
                noticeTarget: values.remind, // 干系人
                isSynchro: values.radioGroup,
              }).then((res) => {
                this.$emit('update:confirmVisible', false)
                this.$emit('add-success')
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

<style scoped>
.confirm-title {
  font-size: 16px;
  color: #fd5158;
}
</style>
