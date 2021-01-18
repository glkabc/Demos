<template>
  <div class="container">
      <!-- 页面打开输入框会自动聚焦到框上 -->
      <input type="text" v-focus>
      <h4>钩子函数</h4>
      <p>一个指令定义对象可以提供如下几个钩子函数 (均为可选)：</p>
      <ul>
          <li><b>bind</b>：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。</li>
          <li><b>inserted</b>：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。</li>
          <li><b>update</b>：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。</li>
          <li><b>componentUpdated</b>：指令所在组件的 VNode 及其子 VNode 全部更新后调用。</li>
          <li><b>unbind</b>：只调用一次，指令与元素解绑时调用。</li>
      </ul>
  </div>
</template>

<script>
// 要定义一下全局的指令可以定义成下面形式
// Vue.directive('focus', {
//     inserted (el) {
//         // 自定义指令要做的事
//         el.focus();
//     }
// });

export default {
  name:  'Directives',
  data() {
    return {

    }
  },
  components: {

  },
  // 局部定义指令
  directives: {
      // 自定义的指令
      focus: {
          // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
          bind: function () {},
          // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
          inserted: function (el) {
            //   console.log(el.dateset = 'dss')
              el.focus();
          },
          // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
          update: function () {},
          // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
          componentUpdated: function () {},
          // 只调用一次，指令与元素解绑时调用。
          unbind: function () {}
      }
  }
}
</script>

<style scoped lang="css">

</style>