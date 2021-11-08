<template>
  <div
    class="box"
    :class="{
      success: type == 'success',
      warning: type == 'warning',
      primary: type == 'primary',
      info: type == 'info',
      danger: type == 'danger',
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
  left: -44px;
  top: 7px;
  width: 120px;
  height: 20px;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
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
.danger {
  color: #FD5158;
  background-color: #FEEBEC;
}
</style>
