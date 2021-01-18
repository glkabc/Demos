<template>
  <div class="container">
      <button @click="show = !show">放大缩小</button><br>
      <!--  duration='{ enter: 122, leave: 122}' 可以设置动画持续的时间-->
      <transition name='brounce'
      >
        <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
      </transition>

      <!-- js动画钩子 -->
      <!-- <transition
      @before-enter='beforeEnter'
      @enter='enter'
      @after-enter='afterEnter'
      @enter-cancelled='enterCancelled'

      @before-leave='beforeEnter'
      @leave='leave'
      @after-leave='afterLeave'
      @leave-cancelled='leaveCancelled'
      >
      </transition> -->
  </div>
</template>

<script>
export default {
  name:  'Brounce',
  data() {
    return {
        show: true
    }
  },
  components: {
  },
//   methods: {
//     /**
//      * 进入中
//      */
//     //  进入前
//     beforeEnter(el) {
//         console.log(el);
//     },
//     //  进入
//     // 当与 CSS 结合使用时
//     // 回调函数 done 是可选的
//     // 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
//     enter(el, done) {
//         done();
//     },
//     // 进入后
//     afterEnter(el) {
//         console.log(el);
//     },
//     // 进入完成
//     enterCancelled(el) {
//         console.log(el);
//     },


//     /**
//      * 离开时
//      */
//     // 离开前
//     beforeLeave(el) {
//         console.log(el);
//     },
//     leave(el, done) {
//         done();
//     },
//     afterLeave(el) {
//         console.log(el);
//     },
//     leaveCancelled(el) {
//         console.log(el)
//     }
//   }
}
</script>

<style scoped lang="css">
    .brounce-enter-active {
        animation: bounce-in 1s;
    }

    .brounce-leave-active {
        animation: bounce-in 1s reverse;
        /* animation: 2s bounce-in 2s infinite; */
    }

    /* 自定义动画 */
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
</style>