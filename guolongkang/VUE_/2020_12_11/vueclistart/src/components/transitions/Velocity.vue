<template>
  <div class="container">
      <button @click="show = !show">Velocity</button>
      <transition name='velocity'
      @before-enter='beforeEnter'
      @enter='enter'
      @after-enter='afterEnter'
      @enter-cancelled='enterCancelled'

      @before-leave='beforeEnter'
      @leave='leave'
      @after-leave='afterLeave'
      @leave-cancelled='leaveCancelled'
      :css='false'
      >
        <p v-if="show">旋转跳跃</p>
      </transition>
      <hr>
      <p>初始化过度</p>
      <pre>
&lt;transition appear @before-appear="beforAppear" @appear="appear" @after-appear="afterAppear" @appear-cancelled="appearCancelled"&gt;&lt;/transition&gt;
      </pre>

      <hr>
      <!-- <transition name="kkkk" mode="in-out" duration="{enter: 1000, leave: 1000}"> -->
      <transition name="kkkk" mode="out-in">
          <button :key="docState">
              {{buttonMessage}}
          </button>
      </transition>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name:  'Velocity',
  data() {
    return {
        show: true,
        docState: 'saved'
    }
  },
  components: {

  },
  methods: {
      /**
       * 过度动画
       */
      beforeEnter(el) {
          $(el).animate({opacity: 0}, 0);
      },
      enter(el, done) {
        // el.style.opacity = 1;
        $(el).animate({opacity: 1, fontSize: '1.4em'}, 1000);
        // $(el).animate({fontSize: '1em'}, 'slow', done());
        done();
      },
      afterEnter(el) {
          $(el).animate({fontSize: '1em'}, 'slow');
      },
      enterCancelled() {},

      beforeLeave() {},
      leave(el, done) {
          console.log(el);
          $(el).animate({
              opacity: 1,
              fontSize: '0.5em',
              translateX: '20px',
              rotateZ: '50deg'
          }, 1000)
          .animate({
              fontSize: '1.5em',
              rotateZ: '45deg',
              translateY: '50px',
              translateX: '30px',
              opacity: 0
          }, 2000, done);
        //   done();
        // setTimeout(done, 4000);
      },
      afterLeave() {},
      leaveCancelled() {},
  },
  computed: {
      buttonMessage () {
          switch(this.docState) {
              case 'saved': return 'Edit'
              case 'edited': return 'Save'
              case 'editing': return 'Cancel'
          }
          return '';
      }
  }
}
</script>

<style scoped lang="css">
    pre {
        width: 100%;
        overflow: auto;
    }
    .kkkk-enter-active, .kkkk-leave-active {
        transition: all 2s;
    }
    .kkkk-leave-to {
        transform: translateX(-20px);
        opacity: 0;
    }
    .kkkk-enter {
        transform: translateX(20px);
    }
</style>