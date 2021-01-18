<template>
  <div class="container">
      <h1>Mine Page</h1>
      <p>{{this.$route.params.name}}</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name:  'Mine',
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getfilter()

      // 此处每次调用 getters 中的方法不会使用缓存的方式得到结果
      console.log(this.$store.getters.getTodosById(3));

      this.$store.dispatch('showtepAsync', {name: 'xiaoming'});
    });
  },
  components: {

  },
  methods: {
      getfilter() {
          console.log(this.$store.getters.doenTodos)
      },

      // 应该注入到根组件上
      // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'doenTodosCount',
        'getTodosById'
      ]),
      ...mapGetters({
        // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
        getCount: 'doenTodosCount'
      })
  },
  computed: {
    
  }
}
</script>

<style scoped lang="css">

</style>