<template>
  <div class="container">
    <a-input-search placeholder="请输入用户名" style="width: 200px" @search="onSearch" />
    <a-table 
      :columns="columns" 
      :data-source="data"
      style="margin-top: 30px"
    >
      <a slot="name" slot-scope="text">
        <img :src="text" alt="用户头像">
      </a>
      <span slot="state" slot-scope="state">
        <a-tag
          :key="state"
          :color="state === 1 ? 'red' : state === 0 ? 'green' : ''"
        >
          {{ state === 0 ? '正常用户' : state === 1 ? '黑名单用户' : '无状态用户' }}
        </a-tag>
      </span>
      <span slot="operation" slot-scope="operation, record">
        <a v-if="record.state == 0" @click="addUserBlack(operation, record)" style="color: red">加入黑名单</a>
        <a v-else-if="record.state == 1" @click="addUserBlack(operation, record)">移出黑名单</a>
        <a v-else>暂无操作</a>
        <a-divider type="vertical" />
        <a @click="showModal(record)">修改用户信息</a>
      </span>
    </a-table>
    <a-modal
      title="修改用户信息"
      :visible="visible"
      :confirm-loading="confirmLoading"
      okText='确认修改'
      cancelText='取消修改'
      @ok="handleOk"
      @cancel="handleCancel"
    > 
      <p class="headImage">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="passworld">
          <el-input type="input" v-model="ruleForm.passworld"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: '用户头像',
    dataIndex: 'nameAvatar',
    key: 'nameAvatar',
    align: 'center',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    key: 'userName',
    align: 'center',
    // width: 80,
  },
  {
    title: '用户密码',
    dataIndex: 'passworld',
    key: 'passworld',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    align: 'center',
    ellipsis: true,
    scopedSlots: { customRender: 'state' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    nameAvatar: 'John Brown',
    userName: 'John Brown',
    state: i % 5,
    passworld: '123456',
    operation: 'lli' + i
  });
}
export default {
  name:  'UserList',
  data() {
    return {
      data,
      columns,
      visible: false,
      confirmLoading: false,
      ruleForm: {
        name: '',
        passworld: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        passworld: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      changUserId: '',
      currentPage: 1,
    }
  },
  methods: {
    onSearch(value) {
      console.log(value, '搜索参数');
    },
    // 打开修改用户弹框
    showModal(record) {
      console.log(record, '第二个参数')
      this.visible = true;
    },
    // 确认修改
    handleOk() {
      this.confirmLoading = true;
      this.submitForm('ruleForm');
    },
    // 取消修改
    handleCancel() {
      this.resetForm('ruleForm')
      this.imageUrl = ''
      this.visible = false;
    },
    addUserBlack(operation, record) {
      let that = this
      this.$confirm({
        title: '提示',
        content: record.state === 0 ?  `是否确定要将用户 ${operation} 加入黑名单吗？` : `是否确定要将用户 ${operation} 移出黑名单吗？`,
        okText: '是',
        cancelText: '否',
        onOk() {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          // }).catch(() => console.log('Oops errors!'));
          that.$message.success('加入黑名但成功')
        },
        onCancel() {},
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            ...this.ruleForm,
            width: this.imageWidth,
            height: this.imageHeight,
            id: this.changUserId
          }
          console.log(data, '表单数据')
          this.$message.success('修改成功')
          this.visible = false;
          this.confirmLoading = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
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

<style scoped lang="css">
  .container {
    margin: 20px 20px;
    text-align: center;
  }
  >>>.ant-modal-body {
    text-align: center;
  }
  >>>.ant-modal-body form {
    margin-right: 30px;
  }
  .headImage .avatar-uploader {
    width: 70px;
    height: 70px;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px dashed #d9d9d9;
    transition: all .5s;
  }
  .headImage .avatar-uploader:hover {
    box-shadow: 0 0 10px #000;
  }
  .headImage .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
</style>