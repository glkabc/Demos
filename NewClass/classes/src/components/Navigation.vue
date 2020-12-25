<template>
  <div class="header-box">
    <div class="main-box">
      <div class="logo-pic" @click="goToCourse">
        <img src="../assets/headerLogo.png" alt="" />
      </div>
      <!-- <span class="divider"></span> -->
      <a-divider type="vertical" />
      <div class="header-company-name">
        备课平台
      </div>

      <div class="user-box">
        <div style="top:60px;">
          <!-- <a-dropdown> -->
          <!-- <a class="ant-dropdown-link" @click="(e) => e.preventDefault()"> -->
          <!-- <a-avatar icon="user" size="small" /> -->
          <img src="../assets/avatar.png" alt="" style="width:24px;height:25px;" />
          <span class="company">{{ name }}</span>
          <!-- <img src="../assets/logo.png" alt="" style="width:40px;height:30px"> -->
          <!-- <a-icon type="down" /> -->
          <!-- </a> -->
          <!-- <a-menu slot="overlay">
              <a-menu-item>
                <span @click="handleLogOut"><icon-font type="icon-quit" style="font-size:16px;"/>退出</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown> -->
        </div>
      </div>
      <!-- <div class="company-box">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            科大讯飞教育 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div> -->
      <!-- menu -->
      <div class="menu-box">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item v-for="(menuItem, index) in menuData" :key="menuItem.meta.authCode" @click="handlePath(menuItem, index)"
            >{{ menuItem.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </div>
  </div>
</template>
<script>
  import {canIUse} from '@/components/CanIUse.js';
  import {IconFont} from '@/configs/scriptURL.js';
  import {createNamespacedHelpers} from 'vuex';
  const {mapActions, mapState} = createNamespacedHelpers('auth');
  // import { createNamespacedHelpers } from "vuex";
  // const { mapActions, mapState } = createNamespacedHelpers("auth");

  import {logout as logoutRequest} from '../api/login';
  export default {
    data() {
      return {
        current: ['wdkc'],
        menuData: [],
        userName: window.localStorage.getItem('auth'),
        idx:'',
      };
    },
    components: {
      IconFont,
    },
    computed: {
      ...mapState({
        name: (state) => (state.userInfo ? state.userInfo.userName : ''),
      }),
    },
    mounted() {
      // console.log(window.localStorage.getItem('auth').userInfo);
      //导航栏菜单权限
      this.menuData = [];
      this.$router.options.routes.forEach((routeItem) => {
        if (routeItem.meta) {
          if (canIUse({code: routeItem.meta.authCode})) {
            this.menuData.push(routeItem);
          }
        }
      });
      this.current=[];
      if(window.localStorage.getItem('path')){
        this.current.push(window.localStorage.getItem('path'))
      }else{
        this.current.push(this.menuData[0].meta.authCode)
      }
     
    },
    methods: {
      ...mapActions(['logout']),
      async handleLogOut() {
        logoutRequest();
        await this.logout();
        this.$router.replace({
          name: '登录',
          params: {reason: 'logout'},
        });
      },
      handlePath(item, index) {
        this.idx='';
        console.log(item, index);
        this.idx = item.meta.authCode;
        this.$router.push(item.path);
        window.localStorage.setItem('path',item.meta.authCode)
      },
      goToCourse(){
        console.log(this.menuData,'menuData');
        if(this.menuData[0].path=='/courses'){
          this.$router.push('/courses');
         window.localStorage.setItem('path','wdkc')
        }else{
          this.$router.push('/quality');
         window.localStorage.setItem('path','zkpf')
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
        font-size: 20px;
        -webkit-user-select: none; /* Chrome all / Safari all */
        -moz-user-select: none; /* Firefox all */
        -ms-user-select: none; /* IE 10+ */
        -o-user-select: none;
        user-select: none;
      }
      .logo-pic {
        display: inline-block;
        width: 89px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor:pointer;
        img {
          width: 89px;
          height: 32px;
          margin-top: -8px;
        }
      }
      .menu-box {
        display: inline-block;
        float: right;
        width: 250px;
      }
      .company-box {
        display: inline-block;
        float: right;

        a {
          color: #7b90b1;
        }
      }
      .user-box {
        float: right;
        display: inline-block;
        margin-left: 40px;
        a {
          color: #7b90b1;
        }
        .company {
          color: #929398;
          font-size: 14px;
          padding-left: 4px;
          -webkit-user-select: none; /* Chrome all / Safari all */
          -moz-user-select: none; /* Firefox all */
          -ms-user-select: none; /* IE 10+ */
          -o-user-select: none;
          user-select: none;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
.menu-box{
  .ant-menu {
    background: transparent;
    color: #fff;
  }
  .ant-menu-horizontal {
    border-bottom: none ;
  }
  .ant-menu-item {
    color: #ccc;
    padding: 0;
    margin: 0 20px;
    line-height: 57px;
  }
  .ant-menu-item:hover{
    color:#fff;
     border-bottom: 2px solid #fff;
  }
  .ant-menu-item-selected,
  .ant-menu-item-active {
    color: #fff;
    border-bottom: 2px solid #fff;
  }
}
  
</style>
<style scoped>
  .ant-divider,
  .ant-divider-vertical {
    top: -2px;
    height: 20px;
  }
</style>
