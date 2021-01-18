<template>
  <div class="demo">
      <button @click="add">Add</button>
      <button @click="remove">Remove</button>
      <button v-on:click="shuffle">Shuffle</button>
      <transition-group name="list" tag="p">
          <span v-for="(item) in items" :key="item" class="list-item">
              {{item}}
          </span>
      </transition-group>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name:  'ListTransition',
  data() {
    return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nextNum: 10,
        lists: [[1,2,3,4,5],[4,3,2,4,5],[6,7,8,4,3],[4,3,3,2,3],[5,5,1,2,4]]
    }
  },
  components: {},
  methods: {
      randomIndex() {
          let num =Math.floor(Math.random() * this.items.length);
        //   console.log(num);
          return num;
      },
      add() {
          let num = this.randomIndex()
          this.items.splice(num, 0, this.nextNum++);
      },
      remove() {
          this.items.splice(this.randomIndex(), 1);
      },
      shuffle: function () {
        this.items = _.shuffle(this.items)
      }
  }
}
</script>

<style scoped lang="css">
    .list-item {
        display: inline-block;
        margin: 0px 5px
    }
    
    .list-move,
    .list-enter-active,
    .list-leave-active {
        transition: all 1s;
    }

    .list-enter,
    .list-leave-to { 
        opacity: 0;
        transform: translateY(30px);
    }
</style>