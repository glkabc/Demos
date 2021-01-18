<template>
  <div class="container">
      A<input type="radio" name="input"  checked @click="view = 'va'">
      B<input type="radio" name="input"  @click="view = 'vb'">
      <transition name="component-fade" mode="out-in">
          <component :is="view"></component>
      </transition>
  </div>
</template>

<script>
import va from '../tempfile/v-a';
import vb from '../tempfile/v-b';
export default {
  name:  'MoreComponentTransition',
  data() {
    return {
        view: 'va'
    }
  },
  components: {
      va,
      vb
  }
}
</script>

<style scoped lang="css">
    .component-fade-enter-active, .component-fade-leave-active {
        transition: all 1s;
    }
    .component-fade-enter {
        opacity: 1;
    }
    .component-fade-leave-to {
        opacity: 0;
    }
</style>