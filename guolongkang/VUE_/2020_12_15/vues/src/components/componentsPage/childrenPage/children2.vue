<template>
  <div class="container">
      <h2>Children2</h2>
      <span v-text="count"></span>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name:  'Children2',
  data() {
    return {

    }
  },
  mounted() {
      this.add();
  },
  components: {

  },
  beforeRouteUpdate (to, from, next) {
      console.log(1111);
      console.log(to);
      console.log(from);
      next();
  },
  methods: {
      add() {
          this.$store.commit('addCount');
          console.log(this.$store.state.count);
      }
  },
  computed: {
      count() {
          return this.$store.state.count;
      },
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState([
          'count'
      ])
  }
}
</script>

<style scoped lang="css">

</style>