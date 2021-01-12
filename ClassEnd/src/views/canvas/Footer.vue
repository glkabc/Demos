<template>
  <footer class="footer-container">
    <slot></slot>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
  };
</script>

<style lang="scss" scoped>
  .footer-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
