<template>
  <div class="hello">
    <nav>
      <!-- <ul>
        <li path='/'>HomePage</li>
        <li path='/mine'>MinePage</li>
      </ul> -->
      <router-link to="/home/20201215/10" tag="p">
        HomePage
      </router-link>
      <router-link to="/mine/xiaoming" tag="p">
        MinePage
      </router-link>
    </nav>
    <transition name='routerTransition' mode='out-in'>
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  nav ul {
    display: flex;
  }
  nav ul li {
    flex: 1;
    list-style-type: none;
  }

  nav {
    display: flex;
    background-color: #eee;
  }
  nav p {
    flex: 1;
  }
  nav p:hover {
    color: red;
  }
  .routerTransition-enter-active, .routerTransition-leave-active {
    transition: all 1s;
  }
  .routerTransition-enter {
    position: relative;
    left: 100px;
    opacity: 0;
  }
  .routerTransition-enter-to {
    position: relative;
    left: 0px;
    opacity: 1;
  }
  .routerTransition-leave {
    position: relative;
    left: 0px;
    /* opacity: 0; */
  }
  .routerTransition-leave-to {
    position: relative;
    left: -100px;
    opacity: 0;
  }
</style>
