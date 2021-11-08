<template>
  <div>
    <a-modal
      :title="title"
      v-model="staffVisible"
      width="500px"
      destroyOnClose
      @cancel="handleClose"
    >
      <a-form :form="staffForm" @submit="handleSubmit">
        <a-form-item
          label="面试地点"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
          :colon="false"
        >
          <a-input
            class="close-abnormal"
            v-decorator="[
              'setupContent',
              {
                initialValue: type === 2 ? setupObj.setupContent : '' 
              }
            ]"
          />
        </a-form-item>
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
import { addSetup } from '@api/department/operation'
import { updateSetting } from '@api/settings/index'
export default {
  props: {
    show: Boolean,
    setupObj: Object,
    type: Number
  },
  data() {
    return {
      staffForm: this.$form.createForm(this),
      staffVisible: false,
      title: ''
    }
  },
  watch: {
    show(e) {
      this.staffVisible = e
    },
    type(e) {
      switch(e) {
        case 1: 
        this.title = '新增面试地点'
        break
        case 2: 
        this.title = '修改面试地点'
        break
        case 3: 
        this.title = '新增下级'
        break
      }
    },
  },
  methods: {
    handleClose() {
      this.$emit('update:show', false)
    },
    handleSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          switch (this.type) {
            case 2:
              updateSetting({
                id: this.setupObj.setupId,
                content: values.setupContent
              }).then((res) => {
                this.$emit('add-success')
                this.$emit('update:show', false)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break;
            default: 
              addSetup({
                parentCode: this.setupObj.parentCode ? this.setupObj.parentCode : 0,
                setupContent: values.setupContent,
                setupType: 3,
              }).then((res) => {
                this.$emit('add-success')
                this.$emit('update:show', false)
                if (res.data.code == 0) {
                  this.$message.success(res.data.data)
                } else {
                  this.$message.error(res.data.mesg)
                }
              })
              break;
          }
        }
      })
    },
  },
}
</script>

<style scoped>
</style>
