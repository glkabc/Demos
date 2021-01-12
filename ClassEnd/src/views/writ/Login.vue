<template>
  <div class="login">
      <div class="header">
          <img src="../../assets/logo.png" alt="logo">
          <span>| 备课平台</span>
      </div>
      <div class="loginForm">
          <form @submit="ClickLoginClass">
                <div class="formheader">
                    <span>用户登录</span>
                </div>
                <div class="formBody">
                    <label for="username">
                        <a-icon type="user" />
                        <input type="text" id="username" name="username" autocomplete="off" v-model="useLoginData.mail" placeholder="请输入博思账号/邮箱">
                    </label>
                    <label for="userpassword">
                        <a-icon type="lock" />
                        <input type="password" id="userpassworld" name="userpassword" autocomplete="off" v-model="useLoginData.password" placeholder="请输入密码">
                    </label>
                    <div class="safetybox">
                        <label for="verification">
                            <a-icon type="safety" />
                            <input type="text" id="verification" name="verification" autocomplete="off" v-model="verificationCodeInput" placeholder="验证码">
                       </label>
                       <div>
                           <a-popover placement="top">
                                <template slot="content">
                                    <p style="color: #999; margin-bottom: 0;">点击刷新验证码</p>
                                </template>
                                <img @click="getGenerateVerificationCode" :src='verificationCode' alt="验证码">
                          </a-popover>
                       </div>
                    </div>
                </div>
                <div class="formfooter">
                    <button type="submit">登录</button>
                </div>
          </form>
      </div>
      <div class="loginFooter">
          <span>Copyright &copy; 2008-2020 (V2.9) 科大讯飞教育</span>
      </div>
  </div>
</template>

<script>
// import Axios from 'axios'
import Axios from '@/configs/request';
import JsEncrypt from 'jsencrypt'
export default {
  name:  'Login',
  data() {
    return {
        useLoginData: {
            mail: '',       // user1@ibest.com
            password: ''    // 123456
        },
        verificationCode: '',
        verificationCodeInput: '',
        verificationCodeId: '',
        loading: false
    }
  },
  mounted() {
      this.getGenerateVerificationCode()
      let Login = JSON.parse(window.localStorage.getItem('min_user'))
    //   console.log(Login)
      if ( Login != null  && this.$store.state.mine_loginTime + Login.expireTime < Date.now()) {
          this.$router.replace({path: '/courses'})
      }
  },
  methods: {
      // 获取验证码
      async getGenerateVerificationCode () {
          try {
             let res = await Axios.get('/user/generateVerificationCode')
             if (res.data.data) {
                 let dataGener = res.data.data.base64Str
                 this.verificationCode = `data:image/png;base64,${dataGener}`
                 this.verificationCodeId = res.data.data.id
             } else {
                 this.$message.error('获取验证码失败')
             }
          } catch (err) {
              console.log(err)
              this.$message.error('验证码请求失败！！！')
          }
          
      },
      // 获取公钥
      async getpublicKey () {
          try {
            //   let res = await Axios.post('http://10.7.100.84:9090/user/getPublicKey')
              let res = await Axios.post('/user/getPublicKey')
            //   console.log(res)
              let publicKey = res.data.data
              if (publicKey) {
                //   console.log(publicKey)
                  let encrypt = new  JsEncrypt()
                  encrypt.setPublicKey(publicKey)
                  return encrypt.encrypt(JSON.stringify(this.useLoginData))
              } else {
                  this.$message.error('获取公钥失败！！！')
                  return
              }
          } catch (err) {
              console.log(err)
              this.$message.error('获取公钥失败！！！')
          } 
      },
      // 校验 验证码
      async checkVerificationCode() {
          try {
              let res = await Axios.post('/user/checkVerificationCode', {
                id: this.verificationCodeId,                   //(请求验证码生返回)
                verificationCode: this.verificationCodeInput   //(图片上展示的码值)
              })
              console.log(this.verificationCodeId + '   ' + this.verificationCodeInput)
              console.log(res)
              if (res.data.code === 1 || res.data.code === 2) {
                  this.$message.error(res.data.mesg)
                  this.verificationCodeInput = ''
                  this.getGenerateVerificationCode()
                  return false
              }
              return res.data.data
          } catch (err) {
              this.$message.error('校验出错')
              this.verificationCodeInput = ''
              this.getGenerateVerificationCode()
              return false
          }
          
      },
      // 登录
      async LoginClass(URLencode) {
          console.log(URLencode)
          try {
              let res = await Axios.post('/user/login', {URLencode: URLencode})
              if (res.data.code == 0) {
                  return res.data.data
              }
            console.log('登录接口： ' + res)
          } catch (err) {
              console.log(err)
              return false
          }
      },
      // 点击登录
      async ClickLoginClass(e) {
            e.preventDefault()

            let datas = await this.getpublicKey()
            console.log(datas)
            if (!datas) {return}
            // console.log('Type: ' + typeof(datas) + " " + datas)
            let enurl = encodeURIComponent(datas)
            // console.log(enurl)

            if (this.useLoginData.mail == null || this.useLoginData.password == null) {
                this.$message.warning('用户名或密码不能为空')
                return
            }
            if (this.verificationCodeInput.trim() === '') {
                this.$message.warning('请输入验证码')
                return
            }
            let loginTure = await this.LoginClass(enurl)

            if (!loginTure) {
                this.$message.warning('用户名或密码错误')
                return
            }

            let checked = await this.checkVerificationCode()
            console.log(checked)
            if (checked == false || checked === null || checked === undefined) {return}

            if (this.loading) {
                this.$message.loading('登录中...')
                return
            }
            let logindatas = {
                expireTime: loginTure.expireTime, 
                user: loginTure.user, 
                modules: loginTure.modules,
                token: checked.token
            }
            this.loading = true
            this.$store.dispatch('min_login', logindatas)
            this.$router.replace({path: '/courses'})
            this.loading = false

            // try {
            //     let res = await Axios.post('/user/login', { URLencode: enurl })
            //     this.loading = true
            //     console.log(res.data.data)
            //     this.$store.dispatch('min_login', res.data.data)
            //     this.$router.replace({path: '/courses'})
            //     this.loading = false
            // } catch (err) {
            //     console.log(err)
            //     this.loading = false
            //     this.$message.error('登录失败！！！')
            // }
      }
  }
}
</script>

<style scoped lang="scss">
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url('../../assets/background.png');
        background-repeat: no-repeat;
        .header {
            position: absolute;
            top: 20px;
            left: 100px;
            margin: 30px 0px 0px 40px;
            span {
                color: #fff;
                font-size: 20px;
            }
        }
        .loginFooter {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            color: #fff;
        }
        .loginForm {
            position: absolute;
            top: 50%;
            right: 20%;
            transform: translateY(-50%);
            background-color: #fff;
            width: 450px;
            height: 460px;
            padding: 40px;
            border-radius: 5px;
            form {
                .formheader {
                    border-top: 1px solid #ddd;
                    margin: 0px 62px;
                    padding-left: 60px;
                    height: 30px;
                    span {
                        display: block;
                        font-weight: 700;
                        font-size: 20px;
                        background-color: #fff;
                        width: 110px;
                        text-align: center;
                        margin-top: -18px;
                    }
                }
                .formBody {
                    label {
                        // display: inline-block;
                        position: relative;
                        width: 100%;
                        i {
                            position: absolute;
                            top: 5%;
                            left: 12px;
                            font-size: 20px;
                        }
                        input {
                            outline: none;
                            border: 0;
                            border: 1px solid #eee;
                            padding: 5px 0px 5px 40px;
                            transition: all 0.5s;
                            border-radius: 5px;
                            width: 370px;
                            margin: 15px 0px;
                            line-height: 50px;
                            &:hover {
                                border: 1px solid green;
                            }
                            &:focus {
                                border: 1px solid green;
                                box-shadow: 0 0 5px green;
                            }
                        }
                        input::-webkit-input-placeholder {
                            color: #bbb;
                            font-size: 16px;
                        }
                    }
                    .safetybox {
                        label {
                            // display: inline-block;
                            position: relative;
                            i {
                                position: absolute;
                                top: 40%;
                                left: 15px;
                            }
                            input {
                                outline: none;
                                border: 0;
                                border: 1px solid #eee;
                                padding: 5px 0px 5px 40px;
                                transition: all 0.5s;
                                border-radius: 5px;
                                width: 250px;
                                margin: 15px 0px;
                                line-height: 50px;
                                &:hover {
                                    border: 1px solid green;
                                }
                                &:focus {
                                    border: 1px solid green;
                                    box-shadow: 0 0 5px green;
                                }
                            }
                        }
                        display: grid;
                        grid-template-columns: 8fr 2fr;
                        div {
                            width: 110px;
                            height: 58px;
                            margin-top: 17px;
                            // padding: 0px 5px;
                            font-size: 29px;
                            border-radius: 5px;
                            // background-color: #eee;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
                .formfooter {
                    line-height: 50px;
                    text-align: center;
                    background-color: #eee;
                    margin-top: 20px;
                    button {
                        width: 100%;
                        background-color: rgb(62, 151, 161);
                        color: #fff;
                        outline: none;
                        border: 0;
                        border-radius: 5px;
                    }
                    
                }
            }
        }
    }
</style>
<style lang="css">
#components-popover-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>