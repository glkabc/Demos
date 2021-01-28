<template>
  <div class="notFound">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <a-button type="primary" @click="backHome">
          回到主页
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name:  'NotFound',
  methods: {
    backHome() {
      this.$router.replace({name: '主页'})
      location.reload()
    }
  }
}
</script>

<style scoped lang="css">
  .notFound {
    height: 100%;
    padding-top: 100px;
  }
</style>