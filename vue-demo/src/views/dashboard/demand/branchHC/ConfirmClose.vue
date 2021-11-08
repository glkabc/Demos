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
          <a-col :span="24">
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
                        message: '请选择关闭原因',
                      },
                    ],
                  },
                ]"
            />
              <!-- <a-select
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
              </a-select> -->
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
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('status')
import { getUserInfoList } from '@api/manage/index'
import {
  getOnLineDemand, //在招1
  getsuspendDemand, //暂停2
  offLineAll, //下线3
} from "@api/branchHC/index";
// import { closeJob, suspendJob, renewJob } from '@api/department/index'
export default {
  props: ['demandId', 'confirmVisible', 'updateType','getBranchHCList'],
  data() {
    return {
      staffForm: this.$form.createForm(this),
      value: 1,
      list: {},
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
  },
  methods: {
    handleClose() {
      this.$emit('update:confirmVisible', false)
    },
   
    handleSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          let newDate = new Date(this.timeValue).getTime();
          console.log(values,this.updateType,'values')
          switch (this.updateType) {
            case 1:
              // 上线
              getOnLineDemand({
                demandIds: this.demandId,
                comments: values.closeCause,
              }).then((res) => {
                // this.$emit('add-success')
                this.$emit('update:confirmVisible', false)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data);
                  this.$emit('getBranchHCList')
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 3:
              // 暂停
              getsuspendDemand({
                demandIds: this.demandId, // 需求id
                comments: values.closeCause, // 原因
              }).then((res) => {
                this.$emit('update:confirmVisible', false)
                // this.$emit('add-success')
                if (res.data.code == 0) {
                  this.$message.success(res.data.data);
                  this.$emit('getBranchHCList')
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break
            case 2:
              // 下线
              offLineAll({
                demandIds: this.demandId, // 需求id
                comments: values.closeCause, // 原因
              }).then((res) => {
                this.$emit('update:confirmVisible', false)
                // this.$emit('add-success')
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                  this.$emit('getBranchHCList')
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
