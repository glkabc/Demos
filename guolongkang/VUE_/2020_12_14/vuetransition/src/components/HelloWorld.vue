<template>
  <div class="hello">
    <h2>列表过渡</h2>
    <hr>
    <ListTransitions/>
    <hr>
    <h2>可复用的过渡</h2>
    <ReuseTransition :tag="'p'" :transitionType="'nogroup'">
      <span>hello</span>
    </ReuseTransition>
    <p>通过使用插槽来实现复用动画的目的</p>
    <hr>
    <h2>动态过渡</h2>
    <p>在 Vue 中即使是过渡也是数据驱动的！动态过渡最基本的例子是通过 name attribute 来绑定动态值。</p>
    <p>当你想用 Vue 的过渡系统来定义的 CSS 过渡/动画在不同过渡间切换会非常有用。</p>
    <p>所有过渡 attribute 都可以动态绑定，但我们不仅仅只有 attribute 可以利用，还可以通过事件钩子获取上下文中的所有数据，因为事件钩子都是方法。这意味着，根据组件的状态不同，你的 JavaScript 过渡会有不同的表现。</p>
    <hr>
    <p>自定义选项合并策略</p>
    <p>自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并，可以向 Vue.config.optionMergeStrategies 添加一个函数：</p>
    <hr>
    <Directives/>
    <hr>
    <h4>动态指令参数</h4>
    <DynamicDirectives/>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import ListTransitions from './transitions/listTransition';
import ReuseTransition from './transitions/reuseTransition';
import Directives from './directives/directives';
import DynamicDirectives from './directives/dynamicDirectives'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    ListTransitions,
    ReuseTransition,
    Directives,
    DynamicDirectives
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
