<template>
  <div class="container">
      <h1>Home Page</h1>
      <p>{{this.$route.params.time}}</p>
      <p>{{this.$route.params.hour}}</p>
      <div class="nav">
          <!-- <router-link to="children1" tag="p">Children1</router-link> -->
          <router-link :to="{name:'children1', params: {name: '大明'}}" tag="p">Children1</router-link>
          <router-link to="children2" tag="p">Children2</router-link>
      </div>
      <transition name="childrenTransition" mode="out-in">
          <keep-alive :include="/children1|chikdren2/" :max="10">
              <router-view></router-view>
          </keep-alive>
      </transition>
  </div>
</template>

<script>
export default {
  name:  'Home',
  data() {
    return {

    }
  },
  components: {

  },
  beforeRouterLeave(to, from, next) {
      console.log(222);
      console.log(to);
      console.log(from);
      next();
  },
//   beforeRouteUpdate (to, from, next) {
//       console.log(22222);
//       console.log(to);
//       console.log(from);
//       next();
//   }
}
</script>

<style scoped lang="css">
 .nav {
    display: flex;
    background-color: #eee;
  }
  .nav p {
    flex: 1;
  }
  .nav p:hover {
    color: red;
  }
  .childrenTransition-enter-active, .childrenTransition-leave-active {
      transition: all 0.5s;
  }
  .childrenTransition-enter {
      position: relative;
      opacity: 0;
      transform: rotateX(90deg);
  }
  .childrenTransition-enter-to {
      opacity: 1;
      transform: rotateX(0deg);
  }
  .childrenTransition-leave {
      opacity: 1;
      transform: translateX(0px);
  }
  .childrenTransition-leave-to {
      opacity: 0;
      /* transform: scaleX(20deg); */
      transform: translateX(-50px);
  }
</style>