<template>
  <AddCardButton>
    <div class="add-card-button__content" @click="handleClick">
      <img src="./descriptionCardPlaceholder/assets/add-description-card.png" alt="" />
      <p>创建<span>讲解卡</span></p>
    </div>
  </AddCardButton>
</template>

<script>
  import AddCardButton from '@/components/AddCardButton';

  export default {
    name: 'ApplicationCardPlaceholder',
    components: {
      AddCardButton,
    },
    methods: {
      handleClick() {
        this.$emit('click');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .add-card-button__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }

    p {
      margin-top: 6px;
      margin-bottom: 0;
      color: #999;
      font-size: 12px;

      span {
        color: #e56b16;
      }
    }
  }
</style>
