<template>
  <transition-group v-if="transitionType === 'group'"
  :tag="tag"
  name="tansition-group"
  :css="false"
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"

  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  >
      <slot></slot>
  </transition-group>
  <transition v-else
  :tag="tag"
  name="tansition"
  :css="false"
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"

  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  >
      <slot></slot>
  </transition>
</template>

<script>
export default {
  name:  'reuseTransition',
  props: {
      transitionType: {
          type: String,
          default() {
              return 'group';
          }
      },
      tag: {
          type: String,
          default() {
              return 'div';
          }
      }
  },
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
      // 过渡动画钩子
      beforeEnter() {},
      enter() {},
      afterEnter() {},
      beforeLeave() {},
      leave() {},
      afterLeave() {}
  }
}
</script>

<style scoped lang="css">

</style>