<template>
  <div class="container">
    <Navigation />
    <Home/>
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

</style>
