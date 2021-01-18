<template>
  <div class="container">
      <h1>Mine Page</h1>
      <p>{{this.$route.params.name}}</p>
  </div>
</template>

<script>
export default {
  name:  'Mine',
  data() {
    return {

    }
  },
  mounted: {},
  components: {

  },
  methods: {
      getfilter() {
          console.log(this.$store.getters.doneTodos)
      }
  }
}
</script>

<style scoped lang="css">

</style>