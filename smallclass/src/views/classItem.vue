<template>
  <div class="classitem">
      <img src="@/assets/upload.png" alt="图片描述">
      <p>ClassItem</p>
  </div>
</template>

<script>
export default {
  name:  'ClassItem',
  props: {
      message: Object
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
    .classitem {
        width: 215px;
        background-color: #eee;
        height: 199px;
        margin: 20px;
        position: relative;
        &:hover {
          box-shadow: 0 0 10px #666;  
        }
        img {
            // width: 100%;
        }
        p {
            position: absolute;
            left: 0;
            bottom: 0;
            text-align: center;
            background-color: #fff;
            line-height: 50px;
            width: 100%;
            margin: 0;
        }
    }
</style>