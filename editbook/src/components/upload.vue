<template>
  <div class="root">
    <!-- <el-upload
      v-show="!imgeLoade"
      class="upload-demo"
      :show-file-list='true'
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-success="onSuccess"
      :on-error="onError"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div id="imgStyle" ref="box" v-show="imgeLoade">
      <img :src="imgSrc" alt="">
    </div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" @submit="handleSubmit" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="passworld">
          <el-input type="input" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建新用户</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpLoadImage',
  data() {
    return {
      imgeLoade: false,
      imgSrc: '',
      imageUrl: '',
      imageWidth: 0,
      imageHeight: 0,
      imgeLoadeId: null,
      ruleForm: {
        name: '',
        classify: [],
        resource: '',
        passworld: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        passworld: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // onSuccess(response, file, fileList) {
    //   console.log(response, file, fileList)
    //   const image = new Image()
    //   image.setAttribute('crossOrigin', 'anonymous')
    //   image.onload = () => {
    //     console.log(image.width, '图片宽度')
    //     console.log(image.height, '图片高度')
    //     const cv = document.createElement('canvas')
    //     this.imageWidth = image.width
    //     this.imageHeight = image.height
    //     cv.width = 100
    //     cv.height = 50
    //     const cvs = cv.getContext('2d')
    //     cvs.drawImage(image, 0, 0, 100, 50);
    //     cvs.font="30px Arial";
    //     cvs.strokeText('这是水印', image.width - 125, image.height - 10)
    //     cvs.fillText('你好', 20, 40)
    //     this.$refs.box.appendChild(cv)
    //     this.imgSrc = cv.toDataURL('/image/png')
    //   }
    //   image.src = URL.createObjectURL(file.raw)
    //   // this.imgeLoade = true
    //   this.$message.success('图片上传成功')
    // },
    // onError(err, file, fileList) {
    //   console.log(err, file, fileList)
      // const image = new Image()
      // image.setAttribute('crossOrigin', 'anonymous')
      // image.onload = () => {
      //   const cv = document.createElement('canvas')
      //   cv.width = image.width
      //   cv.height = image.height
      //   const cvs = cv.getContext('2d')
      //   cvs.drawImage(image, 0, 0, image.width, image.height);
      //   cvs.font="30px Arial";
      //   cvs.strokeText('这是水印', image.width - 125, image.height - 10)
      //   cvs.fillText('你好', 20, 40)
      //   this.$refs.box.appendChild(cv)
      //   this.imgSrc = cv.toDataURL('/image/png')
      //   // console.log(this.$refs.box)
      // }
      // image.src = URL.createObjectURL(file.raw)
    //   this.$message.error('图片上传失败')
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            ...this.ruleForm,
            width: this.imageWidth,
            height: this.imageHeight,
            id: this.imgeLoadeId,
            dataBase: this.imageUrl,
          }
           console.log(data, '表单数据')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.imgeLoade = false
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = () => {
        const cv = document.createElement('canvas')
        cv.width = 70
        cv.height = 70
        const cvs = cv.getContext('2d')
        cvs.drawImage(image, 0, 0, 70, 70)
        this.imageUrl = cv.toDataURL(file.raw.type)
      }
      image.src = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return  isLt2M;
    }
  }
}
</script>

<style lang="css">
.root {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 50px;
}
form {
  margin: 20px;
}
</style>
<style lang='css' scoped>
  >>>.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
