<template>
  <div class="home">
    <!-- <h1>Home page</h1> -->
    <div class="home_router">
      <router-link :to="{name: '我的创作', params: {type: 1}}" id="lef"><i class="iconfont icon-beike"></i> 我创作的</router-link>
      <router-link :to="{name: '我的实战', params: {type: 2}}" id="rig"><i class="iconfont icon-beike1"></i> 我实战的</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    margin: 20px 50px;
    height: 100%;
    .home_router {
      text-align: center;
      a {
        font-size: 16px;
        color: #000;
        padding: 5px 20px;
        text-decoration: none;
        font-weight: 700;
        border: 1px solid rgb(241, 242, 246);
      }
    }
    #Footer {
      position: absolute;
      left: 50%;
      bottom: -80px;
      transform: translateX(-50%);
    }
  }
  #lef {
    border-bottom: 1px solid #666;
    // border-right: 1px solid rgb(241, 242, 246);
    transition: border-left 0.5s;
    &.active {
      margin-right: -3px;
      border-right: 1px solid #666;
      border-top:1px solid #666;
      border-left: 1px solid #666;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 0px;
      color: #046e72;
    }
  }
  #rig {
    border-bottom: 1px solid #666;
    // border-left: 1px solid rgb(241, 242, 246);
    transition: border-right 0.5s;
    &.active {
      margin-left: -3px;
      border-left: 1px solid #666;
      border-top: 1px solid #666;
      border-right: 1px solid #666;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 0px;
      color: #046e72;
    }
   }
</style>
