<template>
  <div>
    <a-modal
      title="编辑课程"
      :visible="isShowEdit"
      width="612px"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template slot="footer">
        <a-button class="cc-btn-cancel" @click="handleCancel">取消 </a-button>
        <a-button class="cc-btn-submit" @click="editSave" :loading="iconLoading"
          >确定</a-button
        >
      </template>
      <div class="content-box">
        <a-row>
          <a-col
            ><span style="color:red">*</span
            ><a-input
              class="ipt-box"
              type="text"
              placeholder="请输入课程名称"
              @change="getName"
              v-model="name"
            >
            </a-input
          ></a-col>
        </a-row>
        <a-row style="margin-top:20px;">
          <a-col :span="3">设置封面：</a-col>
          <a-col :span="12">
            <a-upload
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :customRequest="uploadFile"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="avatar"
                ref="imgRef"
                style="width:240px;height:135px;"
              />
              <!-- <div v-else> -->
              <!-- <div v-else  class="upload-img-box">  -->
              <img
                v-else
                src="../../assets/upload1.png"
                alt="点击上传"
                title="点击上传"
              />

              <!-- </div> -->
              <a-icon
                spin
                :type="loadingx ? 'sync' : ''"
                class="upload-icon-loading"
              />
              <!-- </div> -->

              <!-- <a-icon spin type="sync" class="upload-icon-loading" /> -->
              <!-- <div class="ant-upload-text">
                  Upload
                </div>  -->
            </a-upload>
          </a-col>
          <a-col :span="9">
            <div class="dot-line">
              <span class="dot"></span>
              <span class="dot-text">
                用于课程资源包的显示或作为您共享资源后的宣传片
              </span>
            </div>
            <div class="dot-line">
              <span class="dot"></span>
              <span class="dot-text">
                支持.jpg&nbsp;.jpeg&nbsp;.png
              </span>
            </div>
            <div class="dot-line">
              <span class="dot"></span>
              <span class="dot-text">
                图片小于4MB
              </span>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import axios from 'axios';
  import {uploadFile, updateCourse} from '@/api/courses/index';
  export default {
    name: 'Edit',
    props: ['isShowEdit', 'editData'],
    data() {
      return {
        loadingx: false,
        imageUrl: '',
        baseResult: '',
        name: '',
        iconLoading: false,
        imgfileId: null,
        source: null,
      };
    },
    watch: {
      isShowEdit: [
        function handle1() {
          this.name = this.editData.name;
          this.imageUrl = this.editData.imgUrl;
          this.imgfileId = this.editData.imgfileId;
        },
        function handle2(newValue, oldValue) {
          if (oldValue === true && newValue === false) {
            console.log('modal closed');
            if (this.source) {
              this.source.cancel('cancel upload file');
              this.source = null;
            }
          }
        },
      ],
    },
    mounted() {
      this.CancelToken = axios.CancelToken;
    },
    methods: {
      // 获取姓名
      getName() {},
      handleOk() {
        this.$emit('update:isShowEdit', false);
      },
      handleCancel() {
        this.loadingx = false;
        this.$emit('update:isShowEdit', false);
      },

      // 图片上传
      async uploadFile(data) {
        this.loadingx = true;
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('uploadType', 1);
        this.source = this.CancelToken.source();
        try {
          const res = await uploadFile(formData, this.source.token);

          if (res.data.code == 0) {
            this.imageUrl = res.data.data.url;
            this.imgfileId = res.data.data.id;
            this.loadingx = false;
          } else {
            this.$message.warning(res.data.mesg);
            this.loadingx = false;
          }
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          } else {
            // handle error
          }
        }
      },
      handleChange(info) {
        console.log(info, 'infocahnge');
        if (info.file.status === 'uploading') {
          // this.loadingx = true;
          // return;
        }
        if (info.file.status === 'done') {
          console.log(info, 'imageUrl');

          // this.transformFile(info.file.originFileObj);
        }
      },
      beforeUpload(file) {
        const isJpgOrPng =
          file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          this.$message.warning('请上传图片!');
        }
        const isLt4M = file.size / 1024 / 1024 < 4;
        if (!isLt4M) {
          this.$message.warning('请保证图片小于4MB!');
        }
        return isJpgOrPng && isLt4M;
      },
      // 保存
      async editSave() {
        this.iconLoading = true;
        if (this.name == '' || this.name == null || this.name == undefined) {
          this.$message.warning('请输入课程名称！');
          this.iconLoading = false;
          return;
        }
        console.log(this.loadingx, 'xx');
        if (this.loadingx == true) {
          this.$message.warning('请等待图片上传完成再确定！');
          this.iconLoading = false;
          return;
        }
        const listQuery = {};
        listQuery.id = this.editData.id;
        listQuery.name = this.name;
        listQuery.source = 2;
        listQuery.url = this.imageUrl;
        listQuery.imgfileId = this.imgfileId;
        listQuery.authorizeType = 1;
        listQuery.type = this.editData.type;
        const res = await updateCourse(listQuery);
        if (res.data.code == 0) {
          this.iconLoading = false;
          this.$emit('update:isShowEdit', false);
          this.$emit('getCourseList');
        } else {
          this.iconLoading = false;
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .cc-btn-cancel {
    width: 88px;
    height: 40px;
    background: #e5e5e5;
    border: rgb(232, 233, 232);
  }
  .cc-btn-cancel:hover {
    background-color: #d7d7d7;
    color: #000;
  }
  .cc-btn-submit {
    width: 88px;
    height: 40px;
    background: #357981;
    border: #357981;
    color: #fff;
  }
  .cc-btn-submit.cc-btn-submit.cc-btn-submit.cc-btn-submit:hover {
    background-color: #026f76;
    color: #ffffff;
  }
  .content-box {
    .ipt-box{
      width:95%;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
    }
    .dot-line {
      margin-top: 10px;
      .dot {
        width: 6px;
        height: 6px;
        background: #fcc600;
        border-radius: 50%;
        display: inline-block;
        vertical-align: top;
        margin-top: 7px;
      }
      .dot-text {
        display: inline-block;
        width: 95%;
      }
    }
    .upload-icon-loading {
      margin-top: 55px;
      position: absolute;
      margin-left: -140px;
      font-size: 30px;
      color: #357981;
    }
    .ant-input {
      box-shadow: none;
      border: none;
      outline: none;
      border-bottom: 2px solid #017b83;
      border-radius: 0;
    }
  }
</style>
<style lang="scss" scoped></style>
<style scoped>
::v-deep .avatar-uploader  .ant-upload.ant-upload-select-picture-card{
    width:256px;
    height:151px;
  }
  /deep/ .ant-modal-header {
    border: none;
  }
  /deep/ .ant-upload.ant-upload-select-picture-card:hover {
    border: 1px dashed #02b6c2;
  }
</style>
