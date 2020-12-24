<template>
  <div id="app">
    <div id="head">
      <div class="logo">
        <img src="@/assets/headerLogo.png" alt="logo">
        <span>| 备课平台</span>
      </div>
      <div class="head_tab">
        <router-link to="/home">我的课程</router-link>
        <router-link to="/about">质检评分</router-link>
        <div><img src="@/assets/avatar.png" alt="头像"><span>账号昵称</span></div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: rgb(241, 242, 246);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
}

#head {
  background-color: rgb(49, 52, 61);
  color: #fff;
  padding: 0px 20px;
  .logo {
    float: left;
    // padding: 10px;
    line-height: 70px;
    font-size: 20px;
    cursor: pointer;
    img {
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .head_tab {
    float: right;
    display: flex;
    font-size: 16px;
    cursor: pointer;
    a {
      flex: 1;
      min-width: 90px;
      color: #fff;
      text-decoration: none;
      text-align: center;
      line-height: 70px;
      &.active {
        font-weight: 700;
        border-bottom: 4px solid #fff;
      }
    }
    div {
      flex: 2;
      min-width: 160px;
      line-height: 70px;
      img {
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
}
#head::after {
  content: '';
  display: block;
  clear: both;
  height: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
