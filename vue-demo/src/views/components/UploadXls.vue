<template>
  <!-- 数据导入对话框 -->
  <el-dialog
    :visible="uploadDialogFormVisible"
    :close-on-click-modal="false"
    title="文件导入"
    center
    @close="cancelUpload()"
  >
    <div style="margin-bottom:10px">
      <el-button size="small" type="text" @click="downloadTemplate()"
        >下载模板</el-button
      >
    </div>
    <el-upload
      ref="upload"
      :auto-upload="false"
      :before-upload="beforeUpload"
      class="upload-demo"
      action=""
      accept="application/vnd.ms-excel"
    >
      <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
        >上传并导入</el-button
      >
      <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
    </el-upload>
    <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload()">确 定</el-button>
        <el-button @click="cancelUpload()">取 消</el-button>
      </div> -->
  </el-dialog>
</template>

<script>
import { Tools } from '@/views/utils/Tools'
import { Loading } from 'element-ui'
export default {
  name: 'UploadXls',
  props: {
    show: Boolean,
    templateFile: {
      type: String,
      default: ''
    },
    module: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    uploadDialogFormVisible() {
      return this.show
    }
  },
  methods: {
    cancelUpload() {
      this.$emit('close-upload')
    },
    saveUpload() {
      this.$emit('close-upload')
    },
    downloadTemplate() {
      location.href = this.templateFile
    },
    submitUpload() {
      if (this.$refs.upload.uploadFiles.length === 0) {
        Tools.errorTips(this, '没选择任何文件呢！')
        return false
      }
      this.$confirm('是否上传指定的内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(response => {
          this.$refs.upload.submit()
        })
        .catch(() => {
          Tools.errorTips(this, '上传操作取消')
        })
    },
    beforeUpload(file) {
      if (file.type !== 'application/vnd.ms-excel') {
        Tools.errorTips(this, '文件格式不正确，无法上传')
        return false
      }
      const fd = new FormData()
      fd.append('file', file)
      import(`./../../api/${this.module}`).then(({ uploadFile }) => {
        const loadingInstance = Loading.service()
        uploadFile(fd)
          .then(res => {
            this.$parent.isShowUpload = false
            this.$nextTick(() => {
              // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance.close()
            })
            Tools.success(this, '上传成功')
            try {
              // eslint-disable-next-line no-eval
              if (typeof eval(this.$parent.getList) === 'function') {
                this.$parent.getList()
              }
            } catch (e) {
              console.log('没有相关函数')
            }
          })
          .catch(() => {
            this.$nextTick(() => {
              // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance.close()
            })
          })
        return true
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
