<template>
  <div class="add-button" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'AddCardButton',
    methods: {
      handleClick() {
        this.$emit('click');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .add-button {
    width: 88px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
