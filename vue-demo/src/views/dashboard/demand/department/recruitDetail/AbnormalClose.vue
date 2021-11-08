<template>
  <div>
    <a-modal
      title="异常关闭"
      v-model="staffVisible"
      width="500px"
      :destroyOnClose="true"
      @cancel="handleClose"
    >
      <a-form :form="staffForm" @submit="handleSubmit">
        <a-row>
          <a-col :span="24">
            <a-form-item
              label="关闭数量"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input-number
                :min="0"
                :max="waitNums"
                class="close-abnormal"
                v-decorator="[
                  'waitNums',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入关闭数量',
                      },
                    ],
                    initialValue: waitNums
                  },
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="关闭原因"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-select
                class="close-abnormal"
                v-decorator="[
                  'comments',
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
                  v-for="item in abnormalClose"
                  :key="item.value"
                  >{{ item.label }}</a-select-option
                >
              </a-select>
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
import { abnormalClose } from '@api/department/index'
export default {
  props: ['show','demandId','waitNums'],
  data() {
    return {
      staffForm: this.$form.createForm(this),
      staffVisible: false,
    }
  },
  computed: {
    ...mapState({
      abnormalClose: (state) => state.abnormalClose,
    }),
  },
  watch: {
    show(e) {
      this.staffVisible = e
    },
  },
  methods: {
    handleClose() {
      this.$emit('update:show', false)
    },
    handleSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          abnormalClose({
            demandId: this.demandId,
            closeNums: values.waitNums,
            comments: values.comments,
          }).then((res) => {
            this.$emit('add-success')
            this.$emit('update:show', false)
            if (res.data.code == 0) {
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

<style scoped>
.confirm-title {
  font-size: 16px;
  color: #fd5158;
}
.close-abnormal {
  width:  100%;
}
</style>
