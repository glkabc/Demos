<template>
  <div>
    <a-modal
      title="推荐简历"
      v-model="showForm"
      width="600px"
      :footer="null"
      :closable="false"
      class="department-model"
      @cancel="handleClose"
      destroyOnClose
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="姓名"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          :colon="false"
        >
          <a-input
            v-decorator="[
              'user_name',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入姓名',
                  },
                ],
              },
            ]"
            allowClear
          />
        </a-form-item>
        <a-form-item
          label="手机号"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          :colon="false"
        >
          <a-input
            v-decorator="[
              'user_phone',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入手机号',
                  },
                  {
                    pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                    message: '请输入正确的手机号',
                  },
                ],
              },
            ]"
            allowClear
          />
        </a-form-item>
        <a-form-item
          label="域账号"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          :colon="false"
        >
          <a-input
            v-decorator="[
              'user_account',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入域账号',
                  },
                ],
              },
            ]"
            allowClear
          />
        </a-form-item>
        <a-form-item
          label="上传"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
          :colon="false"
        >
          <div class="dropbox">
            <a-upload-dragger
              v-decorator="['dragger']"
              name="file"
              :file-list="fileList"
              multiple
              accept=".doc, .docx, .html, .png, .pdf"
              :custom-request="handleUpload"
              @change="handleChange"
              :before-upload="handleFileSelect"
            >
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
              </p>
              <p class="ant-upload-text">
                将简历拖到此处，或
                <span style="color: #1890ff;">点击上传</span>
              </p>
              <p class="ant-upload-hint">
                只能上传doc/pdf/html/png/pdf文件，且文件大小不超过10M.
              </p>
            </a-upload-dragger>
          </div>
        </a-form-item>
        <a-form-item style="text-align: center">
          <a-button type="primary" html-type="submit">
            提交
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { internalRecommendResume , uploadResume} from '@api/Interpolate/index'

import throttle from 'lodash-es/throttle'
export default {
  props: ['show', 'intrDemandId', 'distributionId'],
  data() {
    return {
      form: this.$form.createForm(this),
      showForm: false,
      fileList: [],
    }
  },
  watch: {
    show(e) {
      this.showForm = e
    },
  },
  methods: {
    // 提交
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          let ids = values.dragger.fileList
            .filter((file) => file.status === 'done')
            .map((file) => file.response)
          internalRecommendResume({
            ids: ids,
            intrUserName: values.user_name,
            intrPhone: values.user_phone,
            intrDomain: values.user_account,
            intrDemandId: this.intrDemandId,
            distributionId: this.distributionId,
          }).then((res) => {
            if (res.status == 200) {
              this.$emit('update:show', false)
              let successList = res.data.data
              this.$success({
                width: 'auto',
                title: '简历关联结果',
                content: (
                  <div>
                    {successList.map((item) => {
                      return (
                        <div class="success-data">
                          <span class="success-text">{item.fileName}</span>
                          <span>
                            {item.msg}
                            <a-icon
                              type={
                                item.msg == '推荐成功'
                                  ? 'check-circle'
                                  : 'close-circle'
                              }
                              class={
                                item.msg == '推荐成功'
                                  ? 'circle-success'
                                  : 'circle-error'
                              }
                            />
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ),
                footer: null,
                centered: true,
                closable: true,
                maskClosable: true,
              })
            }
          })
        }
      })
    },
    // 关闭弹窗
    handleClose() {
      this.$emit('update:show', false)
    },
    // 上传之前的勾子
    handleFileSelect(file) {
      const throttledSizeWarning = throttle(
        () => {
          this.$message.warning('上传的简历大小最多支持10M', 2)
        },
        1000,
        { trailing: false }
      )
      const throttledLengthWarning = throttle(
        () => {
          this.$message.warning('当前支持最多三份简历同时解析绑定', 2)
        },
        1000,
        { trailing: false }
      )
      // 如果文件大小大于等于10M，则阻止上传
      if (file.size >= 10485760) {
        throttledSizeWarning()
        return false
      }
      if (this.fileList.length >= 3) {
        throttledLengthWarning()
        return false
      }
    },
    handleChange({ fileList, ...props }) {
      if (fileList.length <= 3) {
        this.fileList = [...fileList]
      }
    },
    async handleUpload({ file, onSuccess, onError, ...props }) {
      try {
        const res = await uploadResume(file)
        if (res.status === 200) {
          if (res.data.code === 0) {
            onSuccess(res.data.data.importId)
          } else {
            this.$message.error('简历上传失败', 2)
            onError()
          }
        } else {
          onError()
        }
      } catch (error) {
        onError()
      }
    },
  },
}
</script>

<style scoped>
.success-data {
  margin-bottom: 10px;
}
.success-text {
  padding-right: 60px;
}
.circle-success {
  color: #3fc27e;
  font-size: 16px;
  margin-left: 5px;
}
.circle-error {
  color: #ff615e;
  font-size: 16px;
  margin-left: 5px;
}
</style>
