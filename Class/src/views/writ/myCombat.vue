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
        width: 70%;
        margin: 30px auto;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        overflow: hidden;
    }
    .containers {
        text-align: center;
        #noClass {
            margin-top: 50%;
            transform: translateY(-100%);
        }
    }
    
</style>