<template>
  <div
    class="box"
    :class="{
      success: type == 'success',
      warning: type == 'warning',
      primary: type == 'primary',
      info: type == 'info',
    }"
  >
    {{ text }}
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      
    };
  },
};
</script>
<style scoped>
.box {
  position: absolute;
  left: -28px;
  top: 17px;
  width: 120px;
  height: 30px;
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  transform: rotate(-45deg);
}
.success {
  color: rgba(85, 211, 121, 1);
  background-color: rgba(85, 211, 121, 0.5);
}
.warning {
  color: #feaa19;
  background-color: #fffbe0;
}
.primary {
  color: #1478e3;
  background-color: #e6f2fe;
}
.info {
  color: #999999;
  background-color: #f1f1f1;
}
</style>
