<template>
  <div class="login-container">
    <header class="header">
      <img :src="images.logo.original" alt="公司logo" />
      <div class="header__divider" />
      <h1 class="header__title">备课平台</h1>
      <!-- <span class="header__hotline">客服热线 : 0551-65309436</span> -->
    </header>
    <div class="left-content">
   
    <section class="content">
      <!-- <img class="content__background" :src="images.background.large" alt="背景图" /> -->
      <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
        <h2 class="login-form__title"><a-divider>用户登录</a-divider></h2>
        <a-form-item class="login-form__item">
          <a-input
            v-decorator="[
              'username',
              {
                rules: [{required: true, message: '请输入博思账号/邮箱!'}],
              },
            ]"
            placeholder="请输入博思账号/邮箱"
            size="large"
            class="custom-input"
          >
             <i class="iconfont icon-zhanghao" slot="prefix" style="color:#87939B;font-size:20px;padding-left:6px"></i>
          </a-input>
        </a-form-item>
        <a-form-item class="login-form__item">
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                ],
              },
            ]"
            type="password"
            placeholder="请输入密码"
            size="large"
             class="custom-input"
          >
            <!-- <Icon-font slot="prefix" style="color:#87939B;font-size:18px;" type="icon-mima" /> -->
              <i class="iconfont icon-mima" slot="prefix" style="color:#87939B;font-size:20px;padding-left:6px"></i>
            <!-- <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" /> -->
          </a-input>
        </a-form-item>
        <a-form-item class="login-form__item">
          <a-row :gutter="8" type="flex" align="middle">
            <a-col :span="16">
              <a-input
                v-decorator="[
                  'authCode',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入验证码!',
                      },
                    ],
                  },
                ]"
                placeholder="验证码"
                size="large"
                 class="custom-input"
              >
               <i class="iconfont icon-yanzhengma" slot="prefix" style="color:#87939B;font-size:22px;padding-left:6px"></i>
                <!-- <Icon-font slot="prefix" style="color:#87939B;font-size:18px;padding-left:6px" type="icon-renzheng1" /> -->
              </a-input>
            </a-col>
            <a-col :span="8">
              <a-popover placement="top">
                <template slot="content">
                  <p style="color: #999; margin-bottom: 0;">点击验证码刷新</p>
                </template>
                <img :src="getAuthCodeImgSrc()" alt="验证码" class="login-form__authCode" @click="getAuthCode" />
              </a-popover>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <!-- <a-checkbox
						v-decorator="[
							'remember',
							{
								valuePropName: 'checked',
								initialValue: true
							}
						]"
					>记住密码</a-checkbox> -->
            <a-button size="large" html-type="submit" class="login-form-button" :disabled="isProcessStart"
              >登录</a-button
            >
          </a-form-item>
        </a-form>
      </section>
    </div>
    <!-- <Footer/> -->
    <footer class="footer">
      <a href="http://beian.miit.gov.cn" rel="noreferrer noopener" target="_blank">
        CopyRight&nbsp;&copy;&nbsp;2019-2020 (V1.0)&nbsp;科大讯飞教育
      </a>
    </footer>
  </div>
</template>

<script>
  import {Popover} from 'ant-design-vue';
  import {IconFont} from '@/configs/scriptURL.js';
  import {canIUse} from '@/components/CanIUse.js';
  import {createNamespacedHelpers} from 'vuex';
  const {mapActions, mapState} = createNamespacedHelpers('auth');

  import {getAuthCode, verifyAuthCode, login, isAlreadyLogin} from '@/api/login';
  const base64Prefix = 'data:image/png;base64,';
  export default {
    name: 'Login',
    components: {
      [Popover.name]: Popover,
      IconFont,
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, {name: 'normal_login'});
    },
    // 跳转到 Login 页面可能是用户点击注销主动的 logout 、或 token 过期后的自动 logout
    // 在这里判断，如果是因为token过期的跳转到 Login 页面的情况，将from对像传给组件属性 nextRoute 保存
    // beforeRouteEnter(to, from, next) {
    // 	next(vm => {
    // 		if (!vm.token) {
    // 			vm.$router.replace({ name: "我的课程" });
    // 			return;
    // 		}
    // 		if (to.params.reason === "token-expired") {
    // 			vm.nextRoute = from;
    // 		} else {
    // 			vm.nextRoute = null;
    // 		}
    // 	});
    // },
    created() {
      this.getAuthCode();
    },
    data() {
      return {
        images: {
          logo: {
            original: require('@/assets/logo.png'),
          },
          background: {
            original: require('@/assets/background.png'),
          },
        },
        thisYear: new Date().getFullYear(),
        authCodeId: null,
        authCodeBase64: null,
        isProcessStart: false,
        menuData: [],
      };
    },
    computed: {
      ...mapState({
        // isLoading: state => state.isLoading,
        isError: (state) => state.isError,
        auth: (state) => state.auth,
      }),
    },
    methods: {
      ...mapActions(['login']),
      async loginSetup({username, password}) {
        const isSuccess = await this.login({
          username,
          password,
        });
        this.isProcessStart = false;
        if (this.closeLoadingIndicator) {
          this.closeLoadingIndicator();
        }
        if (isSuccess == true) {
          // console.log(this.$router.options.routes, 'this.nextRoute');
          this.$router.options.routes.forEach((routeItem) => {
            if (routeItem.meta) {
              // console.log( index + ' : ' + routeItem.meta)
              if (canIUse({code: routeItem.meta.authCode})) {
                this.menuData.push(routeItem);
              }
            }
          });
          // console.log(this.menuData[0].path, 'this.menuData[0].path');
          this.$router.replace({path: this.menuData[0].path});
          // 	// 这里根据 nextRoute 来判断，是否返回之前的页面，还是正常进入控制台
          // 	this.$router
          // 		.replace(
          // 			this.nextRoute ? this.nextRoute : { path: "/courses" }
          // 		)
          // 		.catch(err => {});
          // } else {
          // 	this.$message.warning(this.isError, 2);
        } else if (isSuccess == '暂无权限') {
          this.$message.warning('该用户暂无权限!');
        } else {
          this.$message.warning('用户名或密码错误!');
        }
      },
      async handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields(async (err, values) => {
          if (!err) {
            this.isProcessStart = true;
            this.closeLoadingIndicator = this.$message.loading('登录中', 0);
            // 验证码验证是否正确
            const codeVerifiedResult = await verifyAuthCode({
              authCodeId: this.authCodeId,
              authCode: values.authCode,
            });
            if (codeVerifiedResult.status === 200 && codeVerifiedResult.data.code === 0) {
              this.loginSetup({
                username: values.username,
                password: values.password,
              });
            } else {
              this.isProcessStart = false;
              this.closeLoadingIndicator();
              this.$message.warning(codeVerifiedResult.data.mesg);
              this.getAuthCode();
            }
          }
        });
        return;
      },
      async getAuthCode() {
        try {
          const res = await getAuthCode();
          if (res.status === 200 && res.data.code === 0) {
            this.authCodeId = res.data.data.id;
            this.authCodeBase64 = res.data.data.base64Str;
          }
        } catch (error) {
          this.$message.warning('获取验证码失败', 1.5);
          // this.getAuthCode();
        }
      },
      getAuthCodeImgSrc() {
        if (this.authCodeBase64) {
          return `${base64Prefix}${this.authCodeBase64}`;
        } else {
          return '';
        }
      },
    },
  };
</script>

<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
    background: url('../assets/background.png') no-repeat center center;
    background-size: 100% 100%;
    /* background-attachment:fixed;*/
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    /* background-color: #fff; */
    /*background:url('/background.png') no-repeat 0 -70;*/
    /* background-size:cover;  */
  }
  .left-content {
    width: 810px;
    height: 472px;
    /* background: url('../assets/whale.gif') no-repeat; */
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    /* position: relative; */
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 0 -160px;
  }
  .header {
    height: 113px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 1.25vw 7.92vw 0 7.55vw;
  }

  .header > * {
    margin: 0;
  }

  .header > img {
    width: 167px;
  }

  .header__divider {
    width: 2px;
    height: 26px;
    background-color: #fff;
    margin: 0 10px;
  }

  .header__title {
    color: #fff;
    font-size: 24px;
    margin-right: auto;
  }

  .header__hotline {
    color: #333;
    font-size: 22px;
  }

  .content {
    height: calc(100% - 113px - 80px);
    padding: 5.04vw 12.02vw;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    /* position: relative; */
    /* background-image: url("./login/assets/background@2x.png"); */
    background-repeat: no-repeat;
    background-size: auto 80%;
    background-position: 20% center;
  }

  .content__background {
    height: 100%;
  }

  .login-form {
    flex-shrink: 0;
    width: 531px;
    padding: 58px 48px;
    background-color: #fff;
    box-shadow: 0px 5px 21px 0px rgba(120, 121, 161, 0.23);
    border-radius: 4px;
    position: absolute;
    left: 53%;
    transform: translateX(4vw);
  }

  .login-form >>> .ant-form-item {
    margin-bottom: 38px;
  }

  .login-form >>> .ant-form-item:last-child {
    margin-bottom: 0;
  }

  .login-form >>> .ant-form-item.ant-form-item-with-help {
    margin-bottom: calc(38px - 19px);
  }

  .login-form__title {
    color: #333;
    font-size: 26px;
    margin-bottom: 38px;
    text-align: center;
  }

  .login-form__item {
    color: #999;
    font-size: 18px;
    /* margin-bottom: 24px; */
  }

  .login-form__authCode {
    width: 100%;
    display: block;
    cursor: pointer;
  }

  .login-form-forgot {
    float: right;
  }

  .login-form-button {
    width: 100%;
    background: #3e97a1;
    border-radius: 4px;
    height: 65px;
    line-height: 65px;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    font-family: Microsoft YaHei;
  }

  .footer {
    color: #888888;
    font-size: 12px;
    text-align: center;
    bottom: 0;
    margin: 0 auto;
    margin-bottom:25px;
    margin-left: calc(50% - 115px);
    font-family: Microsoft YaHei;
  }

  .footer > a {
    color: inherit;
  }

  .footer > a:active {
    color: inherit;
  }
</style>
<style scoped>
  /deep/ .custom-input .ant-input:not(:first-child){
    padding-left:48px;
    font-size:16px;
    
  }
  /deep/ .custom-input .ant-input-lg {
    height: 60px;
  }
</style>
<style lang="scss" scoped>
  .ant-divider-horizontal.ant-divider-with-text-center,
  .ant-divider-horizontal.ant-divider-with-text-left,
  .ant-divider-horizontal.ant-divider-with-text-right {
    font-size: 22px;
    color: #333;
    font-weight: 600;
  }
  // .ant-input-affix-wrapper .ant-input:not(:first-child) {
  //   padding-left: 48px;
  // }
  .ant-btn-primary {
    background: #357981;
    color: #fff;
  }
  input {
    &::placeholder {
      // 自定义样式
      color: #999;
      font-size: 14px;
    }
  }
  .ant-input-lg {
    height: 45px;
  }
</style>
<style lang="scss" scoped>
  .anticon {
    padding-left: 7px;
    padding-top: 5px;
  }
</style>
