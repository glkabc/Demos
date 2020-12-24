<template>
  <div class="home">
    <!-- <h1>Home page</h1> -->
    <div class="home_router">
      <router-link :to="{name: '我的创作'}" class="lef">我创作的</router-link>
      <router-link :to="{name: '我的实战'}" class="rig">我实战的</router-link>
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
    margin: 20px 50px;
    height: 100%;
    .home_router {
      text-align: center;
      a {
        font-size: 16px;
        color: #000;
        padding: 5px 20px;
        text-decoration: none;
        &.router-link-exact-active {
          font-weight: 700;
          font-size: 20px;
          border-bottom: 3px solid #fff;
        }
      }
    } 
  }
  // .lef {
  //   border-bottom: 3px solid #fff;
  //   &.active {
  //     border-right: 3px solid #fff;
  //     border-top:3px solid #fff;
  //     border-left: 3px solid #fff;
  //     border-bottom: 0px;
  //   }
  // }
  // .rig {
  //   border-bottom: 3px solid #fff;
  //   &.active {
  //     border-top: 3px solid #fff;
  //     border-left: 3px solid #fff;
  //     border-right: 3px solid #fff;
  //     border-bottom: 0;
  //   }
  //  }
</style>
