<template>
  <div class="container" v-if="message">
      <AddClass/>
      <ClassItem v-for="(item,index) in 0" :key="index"/>
  </div>
      <div class="containers" v-else>
      <img src="../../assets/noCourses.png" alt="无课程" id="noClass">
  </div>
</template>

<script>
import AddClass from './addClass'
import ClassItem from './classItem'
export default {
  name:  'MyCombat',
  data() {
    return {
      message: Object
    }
  },
  components: {
    AddClass,
    ClassItem
  }
}
</script>

<style scoped lang="scss">
  .container {
        margin: 20px 250px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }
  .containers {
        // background-image: url('../../assets/noCourses.png');
        // background-repeat: no-repeat;
        position: relative;
        width: 100%;
        height: 740px;
        #noClass {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
    
</style>