<template>
  <div class="hello">
    <h2>过度动画</h2>
    <Transitions/>
    <hr>
    <Brounce/>
    <hr>
    <Velocity/>
    <hr>
    <p>多个组件的过渡</p>
    <MoreComponentTransition/>
    <hr>
    <p>列表过度</p>
    <ListTransition/>
  </div>
</template>

<script>
import Transitions from './transitions/Transitions.vue';
import Brounce from './transitions/brounce';
import Velocity from './transitions/Velocity';
import MoreComponentTransition from './transitions/MoreComponentTransition';
import ListTransition from './transitions/ListTransition'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Transitions,
    // Brounce: () => {require( './transitions/brounce.vue')}
    Brounce,
    Velocity,
    MoreComponentTransition,
    ListTransition
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
