<template>
  <div>
    <a-modal
      title="新建课程"
      :visible="isShowAdd"
      @ok="handleOk"
      width="612px"
      @cancel="handleCancel"
      class="custom-modal-style"
    >
      <template slot="footer">
        <a-button class="cc-btn-cancel" @click="handleCancel">取消 </a-button>
        <a-button class="cc-btn-submit" :loading="iconLoading" @click="addCourse">确定 </a-button>
      </template>
      <div class="content-box">
        <a-row>
          <!-- <a-col :span="4">课程名称：</a-col> -->
          <a-col
            ><span style="color:red">*</span
            ><a-input style="width:95%" type="text" placeholder="请输入课程名称" @change="getName" v-model="name">
            </a-input
          ></a-col>
        </a-row>
        <a-row style="margin-top:30px;">
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
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:240px;height:135px;" />
              <div v-else>
                <img src="../../assets/upload1.png" alt="点击上传" title="点击上传" />
                <a-icon spin :type="loading ? 'sync' : ''" class="upload-icon-loading" />
                <!--<div class="ant-upload-text">
                  Upload
                </div> -->
              </div>
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
import axios from 'axios'
  import {uploadFile, addCourse} from '@/api/courses/index';
  export default {
    name: 'Add',
    props: ['isShowAdd', 'tabNum'],
    data() {
      return {
        loading: false,
        imageUrl: '',
        baseResult: '',
        name: '',
        iconLoading: false,
        imgfileId: null,
      };
    },
    watch: {
      isShowAdd:[
        function handle3(){
          this.name = null;
          this.imageUrl = null;
          this.imgfileId = null;
        },
        function handle4(newVal,oldVal){
          console.log(newVal,oldVal,'val')
          if(oldVal == true && newVal ==false) {
            if(this.source){
              this.source.cancel('cancel upload file');
              this.source = null;
            }
          }
        }
      ]
    },
    mounted() {
      this.CancelToken = axios.CancelToken;
    },
    methods: {
      // transformFile(file) {
      //   return new Promise((resolve) => {
      //     const params = new FormData();
      //     params.append("file", file);
      //     this.uploadFile(params);
      //   });
      // },
      // 图片上传
      async uploadFile(data) {
        this.loading = true;
        console.log(data, this.imgUrl, 'infoUpload');
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('uploadType', 1);
        this.source = this.CancelToken.source();
        try {
          const res = await uploadFile(formData,this.source.token);
          console.log(res, 'uploadRes');
          if (res.data.code == 0) {
            this.imageUrl = res.data.data.url;
            this.imgfileId = res.data.data.id;
            this.loading = false;
          } else {
            this.$message.warning(res.data.mesg);
            this.loading = false;
          }
        } catch (error){
            if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          } else {
          }  
        }
      },
      handleOk() {
        this.$emit('update:isShowAdd', false);
      },
      handleCancel() {
        this.loading = false;
        this.$emit('update:isShowAdd', false);
      },
      handleChange(info) {
        console.log(info, 'info');
        if (info.file.status === 'uploading') {
          // this.loading = true;
          // return;
        }
        if (info.file.status === 'done') {
          console.log(info, 'imageUrl');
          // this.transformFile(info.file.originFileObj);
        }
      },
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          this.$message.warning('请上传图片!');
        }
        const isLt4M = file.size / 1024 / 1024 < 4;
        if (!isLt4M) {
          this.$message.warning('请保证图片小于4MB!');
        }
        return isJpgOrPng && isLt4M;
      },
      getName(e) {
        console.log(e, e.target.value);
        this.name = e.target.value;
      },
      // 新增课程
      async addCourse() {
        this.iconLoading = true;
        if (this.name == '' || this.name == null || this.name == undefined) {
          this.$message.warning('请输入课程名称！');
          this.iconLoading = false;
          return;
        }
        if (this.loading == true) {
          this.iconLoading = false;
          this.$message.warning('请等待图片上传完成再确定！');
          return;
        }
        const listQuery = {};
        listQuery.name = this.name;
        listQuery.source = 1;
        listQuery.isDelete = 0;
        listQuery.createTime = '2020-11-20 10:10:10';
        listQuery.url = this.imageUrl;
        listQuery.imgfileId = this.imgfileId;
        listQuery.createType = this.tabNum; //预留tab切换字段
        // listQuery.createUserName =

        try {
          const res = await addCourse(listQuery);
          console.log(res);
          if (res.data.code == 0) {
            this.iconLoading = false;
            this.$emit('update:isShowAdd', false);
            this.$emit('getCourseList');
          }
        } catch {
          this.iconLoading = false;
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .content-box {
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
  }
  .upload-icon-loading {
    margin-top: 60px;
    position: absolute;
    margin-left: -130px;
    font-size: 30px;
    color: #357981;
  }
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
 
</style>
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
  /deep/ .ant-input {
    box-shadow: none;
    border: none;
    outline: none;
    border-bottom: 2px solid #017b83;
    border-radius: 0;
  }
</style>
