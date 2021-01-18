<template>
  <div class="container">
      <button @click="show">展示/隐藏</button><br>
      <transition name="box">
          <span v-if="textshow">你好</span>
      </transition>
  </div>
</template>

<script>
export default {
  name:  'Transitions',
  data() {
    return {
        textshow: true,
    }
  },
  components: {

  },
  methods: {
      show() {
          this.textshow = !this.textshow;
      }
  }
}
</script>

<style scoped lang="css">
    .box-enter-active, .box-leave-active {
        transition: all 2s;
    }
    .box-enter, .box-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
    span {
        display: block;
    }
</style>
