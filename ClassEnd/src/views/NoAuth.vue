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
          <img src="../assets/noAuth.png" alt="">
      </div>
      <p class="no-auth">目前是内测版本，敬请期待<span class="dot">...</span></p>
  </div>
  <Footer/>
</div>
  
</template>
<script>
import{IconFont} from '@/configs/scriptURL.js'
import Footer from "@/components/Footer.vue"
export default {
  data() {
    return {
      current: [0],
      menuData: [],
    };
  },
  components:{
    IconFont,
    Footer
  },
  mounted() {

  },
  methods: {
    
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
      width:89px;
      height: 32px;
      line-height:32px;
      text-align: center;
      img {
        width: 89px;
        height: 32px;
        margin-top:-8px;
      }
    }
  }
}
.pic-box{
    width:274px;
    height:237px;
    // border:1px solid #afa;
    margin:0 auto;
    margin-top:165px;
}
.no-auth{
    text-align:center;
    font-size:14px;
    color:#000;
    margin-top:20px;

}
.dot{
  font-size:20px;
  padding-left:2px;
}
.ant-divider, .ant-divider-vertical{
  top:-2px ;
  height:20px;
  
}
</style>

