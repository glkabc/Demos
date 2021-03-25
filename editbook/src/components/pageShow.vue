<template>
  <div class="container">
    <!-- <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo"
      background-color="#fff"
      text-color="#888"
      mode="horizontal"
      active-text-color='#1890ff'
      @select="handleSelect">
      <el-menu-item index="1">动漫</el-menu-item>
      <el-menu-item index="2">风景</el-menu-item>
      <el-menu-item index="3">动物</el-menu-item>
      <el-menu-item index="4">游戏</el-menu-item>
      <el-menu-item index="5">美食</el-menu-item>
    </el-menu> -->
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <div id="logo">
          <a-icon type="slack" /> <a-icon type="slack" /> <a-icon type="slack" /> <a-icon type="slack" /> <a-icon type="slack" /> <a-icon type="slack" />
        </div>
        <a-menu
          mode="horizontal"
          :default-selected-keys="['2']"
        >
          <a-menu-item key="1">
            <a-icon type="home" />
            首页
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="desktop" />
            桌面
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="mobile" />
            手机
          </a-menu-item>
        </a-menu>
        <!-- <div class="User">
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
        </div> -->
      </a-layout-header>
    </a-layout>
    <div class="nav">
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="mail"> <a-icon type="mail" />动漫</a-menu-item>
        <a-menu-item key="app" > <a-icon type="appstore" />风景</a-menu-item>
        <a-menu-item key="app2" > <a-icon type="appstore" />风景</a-menu-item>
        <a-menu-item key="app3" > <a-icon type="appstore" />风景</a-menu-item>
        <a-menu-item key="app4" > <a-icon type="appstore" />风景</a-menu-item>
        <a-menu-item key="app5" > <a-icon type="appstore" />风景</a-menu-item>
        <a-menu-item key="app6" > <a-icon type="appstore" />风景</a-menu-item>
        <a-menu-item key="alipay">
          <a href="#" target="_blank" rel="noopener noreferrer"
            ><a-icon type="appstore" />动物</a
          >
        </a-menu-item>
      </a-menu>
    </div>
    <div class="image-list">
      
      <el-upload
        limit='1'
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div class="pagination">
      <a-pagination 
        :default-current="6" 
        :total="total"
        :hideOnSinglePage='true'
        v-model="currentPage"
        @change='pageChange'
      />
    </div>
  </div>
</template>

<script>
export default {
  name:  'pageShow',
  data() {
    return {
      current: ['mail'],
      activeIndex: '1',
      activeIndex2: '1',
      currentPage: 5,
      total: 20,
    }
  },
  components: {

  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    pageChange(page, pageSize) {
      console.log(page, pageSize)
    }
  }
}
</script>

<style scoped lang="scss">
#components-layout-demo-top-side-2 {
  width: 100%;
  height: 64px;
  background: rgba(255, 255, 255, 1);
  .header {
    background-color: #fff;
    padding: 0px;
    height: 58px;
    display: flex;
    #logo {
      line-height: 20px;
      margin-right: 20px;
      float: left;
    }
    ul {
      border: 0;
    }
    .User {
        float: right;
        line-height: 20px;
        span {
          color: #000;
          font-size: 16px;
        }
      }
  }
}
.container {
  position: relative;
  height: 100%;
  .el-menu-demo {
  }
  .pagination {
    /* position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translateX(-50%); */
    text-align: center;
    padding-bottom: 20px;
  }
  .image-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    padding: 20px;
  }
}

</style>

<style lang="scss" scoped>
.nav {
  padding: 10px;
  .ant-menu-horizontal {
    border: 0px;
    line-height: 30px;
    padding: 0 5px;
  }
  .ant-menu-item {
    border: 2px solid #fff;
    border-radius: 10px;
    margin: 0px 5px;
  }
  .ant-menu-item-selected {
    color: #1890ff;
    border: 2px solid #1890ff;
  }
  .ant-menu-item-active {
    color:#99cbfa;
    border: 2px solid #99cbfa;
    background-color: #ffffff;
  }
}
</style>>