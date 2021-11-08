<template>
  <div class="login-container">
    <header class="header">
      <img
        :srcset="`${images.logo.original}, ${images.logo.large} 2x`"
        :src="images.logo.large"
        alt="公司logo"
      />
      <div class="header__divider" />
      <h1 class="header__title">招聘管理系统</h1>
      <span class="header__hotline">客服热线 : 0551-65309436</span>
    </header>
    <section class="content">
      <!-- <img class="content__background" :src="images.background.large" alt="背景图" /> -->
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <h2 class="login-form__title">欢迎登录招聘系统</h2>
        <a-form-item class="login-form__item">
          <a-input
            v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '请输入用户名!' }],
              },
            ]"
            placeholder="用户名"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
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
                    message: '请输入用户密码!',
                  },
                ],
              },
            ]"
            type="password"
            placeholder="密码"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item class="login-form__item">
          <a-row :gutter="8" type="flex" align="middle">
            <a-col :span="19">
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
                placeholder="请输入验证码"
                size="large"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </a-input>
            </a-col>
            <a-col :span="5">
              <a-popover placement="top">
                <template slot="content">
                  <p style="color: #999; margin-bottom: 0">点击验证码刷新</p>
                </template>
                <img
                  :src="getAuthCodeImgSrc()"
                  alt="验证码"
                  class="login-form__authCode"
                  @click="getAuthCode"
                />
              </a-popover>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
            >记住密码</a-checkbox
          >
          <a-button
            type="primary"
            size="large"
            html-type="submit"
            class="login-form-button"
            :disabled="isProcessStart"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </section>
    <footer class="footer">
      <a
        href="http://beian.miit.gov.cn"
        rel="noreferrer noopener"
        target="_blank"
      >
        版权所有&#169; 2013 -
        {{ thisYear }} 安徽百得思维信息科技有限公司 皖ICP备19002096号-1
      </a>
    </footer>
  </div>
</template>

<script>
import { JSEncrypt } from "jsencrypt";
import { Popover } from "ant-design-vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("auth");
import {
  getAuthCode,
  verifyAuthCode,
  login,
  isAlreadyLogin,
  getKey,
} from "@/api/login";
const base64Prefix = "data:image/png;base64,";
export default {
  name: "Login",
  components: {
    [Popover.name]: Popover,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  // 跳转到 Login 页面可能是用户点击注销主动的 logout 、或 token 过期后的自动 logout
  // 在这里判断，如果是因为token过期的跳转到 Login 页面的情况，将from对像传给组件属性 nextRoute 保存
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.token) {
        vm.$router.replace({ name: "Welcome" });
        return;
      }
      if (to.params.reason === "token-expired") {
        vm.nextRoute = from;
      } else {
        vm.nextRoute = null;
      }
    });
  },
  created() {
    this.getAuthCode();
    // this.getRsaKey();
  },
  data() {
    return {
      images: {
        logo: {
          original: require("./login/assets/logo.png"),
          large: require("./login/assets/logo@2x.png"),
        },
        // background: {
        // 	original: require("./login/assets/background.png"),
        // 	large: require("./login/assets/background@2x.png")
        // }
      },
      thisYear: new Date().getFullYear(),
      authCodeId: null,
      authCodeBase64: null,
      isProcessStart: false,
      rsaKey: "",
      // privateKey: "",
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
    //密码加密方法
    //密码加密方法
    // encryptedData(data) {
    //   let publicKey = this.rsaKey; // 从后台获取公钥

    //   let encryptor = new JSEncrypt();
    //   // 设置公钥
    //   encryptor.setPublicKey(publicKey);
    //   // 加密数据
    //   return encryptor.encrypt(data);
    // },
    // 获取公钥的方法
    // getRsaKey() {
    //   getKey().then((res) => {
    //     this.rsaKey = res.data.data.publicKey;
    //     this.privateKey = res.data.data.privateKey;
    //   });
    // },
    ...mapActions(["login"]),
    async loginSetup({ username, password}) {
      password = password;
      // privateKey = this.privateKey.replace(/\+/g, '%2B');
      const isSuccess = await this.login({
        username,
        password
        // privateKey,
      });
      this.isProcessStart = false;
      if (this.closeLoadingIndicator) {
        this.closeLoadingIndicator();
      }
      if (isSuccess) {
        // 这里根据 nextRoute 来判断，是否返回之前的页面，还是正常进入控制台
        this.$router
          .replace(this.nextRoute ? this.nextRoute : { name: "Welcome" })
          .catch((err) => {});
      } else {
        this.$message.warning(this.isError, 2);
      }
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.isProcessStart = true;
          this.closeLoadingIndicator = this.$message.loading("登录中", 0);
          // 验证码验证是否正确
          const codeVerifiedResult = await verifyAuthCode({
            authCodeId: this.authCodeId,
            authCode: values.authCode,
          });
          if (
            codeVerifiedResult.status === 200 &&
            codeVerifiedResult.data.code === 0
          ) {
            // 判断用户是否已登陆
            const isAlreadyLoginResult = await isAlreadyLogin(values.username);
            if (isAlreadyLoginResult.status === 200) {
              if (isAlreadyLoginResult.data.code === 0) {
                if (isAlreadyLoginResult.data.data.isLogin === 0) {
                  // 该用户未登陆;
                  this.loginSetup({
                    username: values.username,
                    password: values.password,
                    // privateKey:this.privateKey
                  });
                } else if (isAlreadyLoginResult.data.data.isLogin === 1) {
                  // 该用户已登陆
                  this.$confirm({
                    title: "该用户已经登陆，确认继续？",
                    content: "继续登陆会强制已登陆用户退出登陆",
                    onOk: () => {
                      this.loginSetup({
                        username: values.username,
                        password: values.password,
                        // privateKey:this.privateKey
                      });
                    },
                    onCancel: () => {
                      this.isProcessStart = false;
                      this.closeLoadingIndicator();
                    },
                  });
                }
              } else {
                this.isProcessStart = false;
                this.closeLoadingIndicator();
                this.getAuthCode();
                this.$message.error(isAlreadyLoginResult.data.mesg, 1.5);
              }
            } else {
              this.isProcessStart = false;
              this.closeLoadingIndicator();
              this.getAuthCode();
            }
          } else {
            this.isProcessStart = false;
            this.closeLoadingIndicator();
            this.$message.error(codeVerifiedResult.data.mesg, 1.5);
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
        this.$message.error("获取验证码失败", 1.5);
        // this.getAuthCode();
      }
    },
    getAuthCodeImgSrc() {
      if (this.authCodeBase64) {
        return `${base64Prefix}${this.authCodeBase64}`;
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  min-height: 768px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fff;
}

.header {
  height: 113px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 1.25vw 7.92vw 1.25vw 7.55vw;
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
  background-color: #999;
  margin: 0 20px;
}

.header__title {
  color: #666;
  font-size: 26px;
  margin-right: auto;
}

.header__hotline {
  color: #333;
  font-size: 22px;
}

.content {
  height: calc(100% - 113px - 124px);
  padding: 5.04vw 12.02vw;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
  background-image: url("./login/assets/background@2x.png");
  background-repeat: no-repeat;
  background-size: auto 80%;
  background-position: 20% center;
}

.content__background {
  height: 100%;
}

.login-form {
  flex-shrink: 0;
  width: 425px;
  padding: 58px 48px;
  background-color: #fff;
  box-shadow: 0px 5px 21px 0px rgba(120, 121, 161, 0.23);
  border-radius: 4px;
  position: absolute;
  left: 50%;
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
  margin-bottom: 58px;
  text-align: center;
}

/* .login-form__item {
	margin-bottom: 24px;
} */

.login-form__authCode {
  width: 100px;
  display: block;
  cursor: pointer;
}

.login-form-forgot {
  float: right;
}

.login-form-button {
  width: 100%;
}

.footer {
  height: 124px;
  color: #999;
  font-size: 16px;
  text-align: center;
  padding: 50px 0;
}

.footer > a {
  color: inherit;
}

.footer > a:active {
  color: inherit;
}
</style>
