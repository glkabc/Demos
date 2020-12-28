<template>

  <div class="home">
     <Navigation/>
    <a-button type="primary" @click="showCourses">课程</a-button>
   
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Navigation from "@/components/Navigation.vue";
export default {
  name: "Home",
  components: {
    Navigation
  },
  data(){
    return{}
  },
  mounted(){},
  methods:{
    showCourses(){
      this.$router.push('./courses')
    },
    

  }
};
</script>
<style lang="scss" scoped></style>
