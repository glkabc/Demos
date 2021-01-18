<template>
  <div class="container">
      <input type="text" v-model="query">
      <transition-group
      name="list"
      tag="ul"
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      >
          <li
          v-for="(item, index) in computedList"
          :key="item.message"
          :data-index="index"
          >{{item.message}}</li>
      </transition-group>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';
export default {
  name:  'listTransition',
  data() {
    return {
        query: '',
        list: [
            {message: 'LiLie'},
            {message: 'Jack'},
            {message: 'Jet Li'},
            {message: 'Jen Chen'},
            {message: 'Kong Fu'},
            {message: 'Lee Li'},
        ]
    }
  },
  components: {

  },
  computed: {
      computedList() {
          let vm = this;
          return this.list.filter((item) => {
              return item.message.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
          }) 
      }
  },
  methods: {
      beforeEnter(el) {
          el.style.opacity = 0;
          el.style.height = 0;
      },
      enter(el, done) {
          let delay = el.dataset.index * 200;
        //   console.log(delay);
        //   console.log(el.dataset.index);

        // 等待列表上面的都出现或隐藏后才对其隐藏或展示
          setTimeout(() => {
              Velocity(el, {
                  opacity: 1,
                  height: '1.5em'
              }, {
                  complete: done
              });
          }, delay);
      },
      leave(el, done) {
          let delay = el.dataset.index * 200;
          setTimeout(() => {
              Velocity(el, {
                  opacity: 0,
                  height: 0
              }, {
                  complete: done
             });
          }, delay);
      }
  }
}
</script>

<style scoped lang="css">
    ul {
        padding: 0;
    }
    ul li{
        list-style-type: none;
        display: block;
        background-color: #eee;
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
    }
</style>