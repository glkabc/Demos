<template>
  <div>
    <div class="header-box">
      <div class="main-box">
        <div class="logo-pic">
          <img src="../assets/headerLogo.png" alt="" />
        </div>
        <a-divider type="vertical" />
        <div class="header-company-name">
          备课平台
        </div>
      </div>
    </div>
    <div class="content">
      <div class="pic-box">
        <img src="../assets/loading.png" alt="" />
      </div>
      <p class="no-auth">
        <a-icon
          type="sync"
          spin
          style="font-size:18px;padding-right:5px;color:#0153ea"
        />登录中<span class="dot">...</span>
      </p>
    </div>
    <Footer />
  </div>
</template>
<script>
  import {createNamespacedHelpers} from 'vuex';
  const {mapActions, mapState} = createNamespacedHelpers('auth');
  import {zeroLogin} from '@/api/loginbs';
  export default {
    data() {
      return {
        id: this.$route.query.id,
      };
    },
    computed: {
      ...mapState({
        // isLoading: state => state.isLoading,
        isError: (state) => state.isError,
        auth: (state) => state.auth,
      }),
    },
    mounted() {
      this.zeroLogins(this.id);
    },
    methods: {
      ...mapActions(['zeroLogin']),

      async zeroLogins(id) {
        // window.localStorage.removeItem('auth');
        const res = await this.zeroLogin(id);
        console.log(res);
        if (res) {
          this.$router.push('/courses');
        } else {
          this.$router.push('/noAuth');
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .header-box {
    height: 60px;
    width: 100%;
    background: #31343d;
    .main-box {
      width: 80%;
      margin: 0 auto;
      line-height: 60px;
      .header-company-name {
        width: 200px;
        display: inline-block;
        color: #fff;
        font-size:20px;
      }
      .logo-pic {
        display: inline-block;
        width: 89px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        img {
          width: 89px;
          height: 32px;
          margin-top:-8px;
        }
      }
    }
  }
  .pic-box {
    width: 257px;
    height: 202px;
    margin: 0 auto;
    margin-top: 165px;
  }
  .no-auth {
    text-align: center;
    font-size: 14px;
    color: #000;
    margin-top: 24px;
  }
  .dot {
    font-size: 20px;
    padding-left: 2px;
  }
  .ant-divider, .ant-divider-vertical{
  top:-2px ;
  height:20px;
  
}
</style>
<style lang="scss" scoped></style>
