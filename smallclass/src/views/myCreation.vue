<template>
  <div class="container" v-if="message">
      <AddClass/>
      <ClassItem v-for="(item,index) in 14" :key="index"/>
  </div>
  <div class="containers" v-else>
      <img src="@/assets/noCourses.png" alt="无课程" id="noClass">
  </div>
</template>

<script>
import AddClass from './addClass'
import ClassItem from './classItem'
export default {
  name:  'MyCreation',
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
    }
    #noClass {
        margin-top: 200px;
    }
    // .containers {
    //     background-image: url('../assets/noCourses.png');
    //     background-repeat: no-repeat;
    // }
</style>