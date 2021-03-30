<template>
  <div>
    <el-upload
      v-show="!imgeLoade"
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-success="onSuccess"
      :on-error="onError"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div id="imgStyle" ref="box" v-show="imgeLoade">
      <img :src="imgSrc" alt="">
    </div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" @submit="handleSubmit" class="demo-ruleForm">
        <el-form-item label="图片title" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="图片分类" prop="classify">
          <el-checkbox-group v-model="ruleForm.classify">
            <el-checkbox label="美食" name="type1"></el-checkbox>
            <el-checkbox label="地推活动" name="type2"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type3"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type4"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
      imageWidth: 0,
      imageHeight: 0,
      imgeLoadeId: null,
      ruleForm: {
        title: '',
        classify: [],
        resource: '',
        desc: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入图片的详情标题', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请选择图片的分类', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写对图片的描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSuccess(response, file, fileList) {
      console.log(response, file, fileList)
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = () => {
        console.log(image.width, '图片宽度')
        console.log(image.height, '图片高度')
        const cv = document.createElement('canvas')
        this.imageWidth = image.width
        this.imageHeight = image.height
        cv.width = 100
        cv.height = 50
        const cvs = cv.getContext('2d')
        cvs.drawImage(image, 0, 0, 100, 50);
        cvs.font="30px Arial";
        cvs.strokeText('这是水印', image.width - 125, image.height - 10)
        cvs.fillText('你好', 20, 40)
        this.$refs.box.appendChild(cv)
        this.imgSrc = cv.toDataURL('/image/png')
      }
      image.src = URL.createObjectURL(file.raw)
      this.imgeLoade = true
      this.$message.success('图片上传成功')
    },
    onError(err, file, fileList) {
      console.log(err, file, fileList)
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = () => {
        const cv = document.createElement('canvas')
        cv.width = image.width
        cv.height = image.height
        const cvs = cv.getContext('2d')
        cvs.drawImage(image, 0, 0, image.width, image.height);
        cvs.font="30px Arial";
        cvs.strokeText('这是水印', image.width - 125, image.height - 10)
        cvs.fillText('你好', 20, 40)
        this.$refs.box.appendChild(cv)
        this.imgSrc = cv.toDataURL('/image/png')
        // console.log(this.$refs.box)
      }
      image.src = URL.createObjectURL(file.raw)
      this.$message.error('图片上传失败')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            ...this.ruleForm,
            width: this.imageWidth,
            height: this.imageHeight,
            id: this.imgeLoadeId
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
    handleSubmit(e) {
      console.log(e)
    }
  }
}
</script>

<style>
/* #imgStyle{
  width: 350px;
  height: 200px;
  background-color: #000;
} */
.upload-demo {
  margin: 0px auto;
}
</style>