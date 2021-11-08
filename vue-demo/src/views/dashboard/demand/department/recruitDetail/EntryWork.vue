<template>
  <div>
    <a-modal
      title="确认入职"
      v-model="staffVisible"
      width="500px"
      :destroyOnClose="true"
      @cancel="handleClose"
    >
      <a-form :form="staffForm" @submit="handleSubmit">
        <a-row>
          <a-col :span="24">
            <a-form-item
              label="上岗日期"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-date-picker
                style="width: 100%"
                :disabledDate="disabledDate"
                v-decorator="[
                  'time',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请选择上岗日期',
                      },
                    ],
                  },
                ]"
                format="YYYY-MM-DD"
                @change="handleDateClick"
                allowClear
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
import { uptAllMove } from '@api/department/operation'
import moment from 'moment'

export default {
  props: ['show', 'talentId', 'value'],
  data() {
    return {
      staffForm: this.$form.createForm(this),
      staffVisible: false,
      timeValue: '',
    }
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
    handleDateClick(e, value) {
      this.timeValue = value
    },
    disabledDate(current) {
			return current > moment().endOf("day");
		},
    handleSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          uptAllMove({
            talentId: this.talentId,
            status: this.value,
            workingDate: this.timeValue,
            entryType:this.entryType
          }).then((res) => {
            this.$emit('recruit-action', 8)
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
  width: 100%;
}
</style>
