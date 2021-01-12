<template>
  <!-- <a-result :status="getStatus" :title="getStatus" sub-title="Sorry, the server is wrong."> -->
  <a-result :status="getStatus" :title="getStatus">
    <!-- <template #extra>
      <a-button type="primary">
        Back Home
      </a-button>
    </template> -->
  </a-result>
</template>

<script>
export default {
  name:  'RequestStatus',
  props: {
    getStatus: String
  }
}
</script>

<style scoped lang="css">

</style>