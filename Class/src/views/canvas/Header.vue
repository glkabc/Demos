<template>
  <header class="header-container">
    <span style="color: #666666; cursor: pointer; font-size: 16px" @click="handleBack">
      <AntIcon type="left" style="color: #000" />
      画布清单 |</span
    >
    <span style="color: #000; font-size: 16px" class="no-select">创建画布</span>
    <div class="input-wrapper">
      <input
        :value="className"
        type="text"
        class="class-name-input"
        placeholder="请输入课堂名称"
        @change="handleChange"
        :disabled="!inValidEditMode"
      />
    </div>
  </header>
</template>

<script>
  import {Icon} from 'ant-design-vue';

  export default {
    name: 'Header',
    components: {
      AntIcon: Icon,
    },
    props: {
      className: String,
      classId: String,
    },
    inject: ['inValidEditMode'],
    methods: {
      handleBack() {
        this.$router.back();
      },
      handleChange(event) {
        console.log('change class name');
        this.$emit('changeClassName', event.target.value);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header-container {
    position: relative;
    padding: 16px 0;
    .no-select {
      -webkit-user-select: none; /* Chrome all / Safari all */
      -moz-user-select: none; /* Firefox all */
      -ms-user-select: none; /* IE 10+ */
      -o-user-select: none;
      user-select: none;
    }
    .input-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .class-name-input {
        background-color: rgba(0, 0, 0, 0);
        border-left: none;
        border-top: none;
        border-right: none;
        border-bottom: solid 2px #017b83;
        outline: none;
        display: inline-block;
        width: 561px;
        padding: 4px 8px 4px 16px;
      }
      &::before {
        content: '*';
        color: #fd0000;
        display: block;
        position: absolute;
        left: 5px;
        top: 6px;
      }
    }
  }
</style>
