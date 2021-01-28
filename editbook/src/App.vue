<template>
  <div id="app">
    <a-layout id="components-layout-demo-top-side" style="height: 100%">  
      <a-layout-header class="header">
        <div class="logo">
          <span>测试页面</span>
        </div>
        <div class="User">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <a-avatar icon="user" style="margin-right: 15px" />
              <span>admin</span>
              <a-icon type="down" style="padding-left: 10px; color: #fff" />
            </a>
            <a-menu slot="overlay" :getPopupContainer="(triggerNode) => triggerNode.parentNode" style="margin-top: 10px">
              <a-menu-item>
                <a href="javascript:;"><a-icon type="user" style="padding-right: 10px" />我的</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;"><a-icon type="export" style="padding-right: 10px" />退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          
        </div>
      </a-layout-header>
      <a-layout-content style="padding: 20px 30px 0px">
        <a-layout style="padding: 0px; background: #fff; height: 100%">
          <a-layout-sider width="200" style="background: #fff">
            <a-menu
              mode="inline"
              :default-selected-keys="['1']"
              :default-open-keys="['sub1']"
              style="height: 100%"
            >
              <a-menu-item key="1" @click="$router.replace({name: '主页'})">
                <a-icon type="home" />
                <span>主页</span>
              </a-menu-item>
              <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="user" />我的</span>
                <a-menu-item key="4" @click="$router.replace({name: '我的夏季'})">
                  我的夏季
                </a-menu-item>
                <a-menu-item key="2" @click="$router.replace({name: '图片展示'})">
                  我的冬季
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub3">
                <span slot="title"><a-icon type="laptop" />电脑</span>
                <a-menu-item key="5">
                  option5
                </a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="sub4">
                <span slot="title"><a-icon type="notification" />喇叭</span>
                <a-menu-item key="9" @click="$router.push({name: 'NotFound'})">
                  NotFoundPage
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </a-layout-sider>
          <a-layout-content :style="{ padding: '10px 24px', minHeight: '280px' }">
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout-content>
      <a-layout-footer style="text-align: center; padding: 10px 50px">
        copyRight ©2020 Created by Me
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
  #app {
    height: 100%;
    #components-layout-demo-top-side {
      .logo {
        width: 120px;
        height: 31px;
        line-height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 28px 16px 0;
        float: left;
        text-align: center;
        span {
          // float: right;
          // padding-right: 10px;
          color: #fff;
          font-weight: 700;
        }
      }
      .User {
        float: right;
        span {
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
  
</style>
