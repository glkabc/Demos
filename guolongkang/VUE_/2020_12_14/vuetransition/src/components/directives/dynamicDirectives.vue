<template>
  <div class="DynamicDirectives">
      <p>指令的参数可以是动态的： v-mydirective:[argument]="value"</p>
      <p>定位到屏幕下方</p>
      <p v-pin:[position]="10">这是一个动态指令定位</p>
      <h4>函数简写</h4>
      <p>有很多时候，你可能想在 bind and update 时触发相同的行为，而不关心其他的钩子。</p>
      <code>
          Vue.directive('color-swatch', function (el, binding) {
            el.style.backgroundColor = binding.value
          })
      </code>
      <h4 ref="oo">对象字面量</h4>
      <p>如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。</p>
      <code>
          &lt;div v-demo="{ color: 'white', text: 'hello!' }"&gt;&lt;/div&gt;
      </code>
  </div>
</template>

<script>
export default {
  name:  'DynamicDirectives',
  props: {
      items: {
          type: Object,
          default() {
              return {};
          }
      }
  },
  data() {
    return {
        position: 'bottom'
    }
  },
  /**
   * <ul v-if="items.length">
   *    <li v-for="item in items">{{ item.name }}</li>
   * </ul>
   * <p v-else>No items found.</p>
   */
  // 使用 JavaScript 代替模板功能
  render: function (createElement) {
      if(this.items.length) {
          return createElement('ul', this.items.map((item) => {
              return createElement('li', item.name);
          }));
      } else {
          return createElement('p', 'not items found');
      }
  },
  components: {

  },
  directives: {
      pin: {
          bind: function (el, binding, vnode) {
              el.style.position = 'fixed';
              el.style.left = '50px';
              let s = (binding.arg == 'bottom' ? 'bottom' : 'top');
              el.style[s] = binding.value + 'px';
              console.log(vnode);
          }
      }
  },
  mounted() {
    //   console.log(this.$refs);
  }
}
</script>

<style scoped lang="css">

</style>