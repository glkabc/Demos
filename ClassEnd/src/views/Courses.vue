<template>
  <div class="container">
    <Navigation />
    <Home/>
    <div id="Footer">
      <span>Copyright &copy; 2008-2020 (V2.9) 科大讯飞教育</span>
    </div>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation.vue';
  import Home from './writ/Home'
  export default {
    name: 'Courses',
    components: {
      Navigation,
      Home
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    #Footer {
      text-align: center;
      margin-bottom: 15px;
      // position: absolute;
      // left: 50%;
      // bottom: 20px;
      // transform: translateX(-50%);
    }
  }
  
</style>
