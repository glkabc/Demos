<template>
  <CardLayout
    color="#1ba2c9"
    title="T 副卡"
    :small="true"
    :showTimeLine="true"
    :customStyle="{width: '26px'}"
    :showLeftLink="showLeftLink"
    :showRightLink="showRightLink"
    :protrudeLeftTimeLineLength="protrudeLeftTimeLineLength"
    :protrudeRightTimeLineLength="protrudeRightTimeLineLength"
    :showLeftFlag="showLeftFlag"
    :showRightFlag="showRightFlag"
    :showLeftDot="showLeftDot"
    :showRightDot="showRightDot"
    :leftTime="leftTime"
    :rightTime="rightTime"
    :scaleNumber="scaleNumber"
    :customContentStyle="{backgroundColor: '#1ba2c9'}"
    :showLeftThickScale="showLeftThickScale"
    :showRightThickScale="showRightThickScale"
    @dblclick="handleDBClick"
  >
    <template slot="header">
      <span></span>
    </template>
    <span class="content">在讲解前先说明要完成什么子任务</span>
  </CardLayout>
</template>

<script>
  import Card from './Card';
  export default {
    name: 'SupplementCard',
    components: {
      CardLayout: Card,
    },
    props: {
      showLeftThickScale: Boolean,
      showRightThickScale: Boolean,
      showLeftFlag: Boolean,
      showRightFlag: Boolean,
      showLeftDot: Boolean,
      showRightDot: Boolean,
      leftTime: Number,
      rightTime: Number,
      scaleNumber: Number,
      protrudeLeftTimeLineLength: {
        type: Number,
      },
      protrudeRightTimeLineLength: {
        type: Number,
      },
      showLeftLink: {
        type: Boolean,
        default: false,
      },
      showRightLink: {
        type: Boolean,
        default: false,
      },
      width: {
        type: String,
      },
      customContainerStyle: {
        type: Object,
        default: () => ({}),
      },
      customStyle: {
        type: Object,
        default: () => ({}),
      },
    },
    methods: {
      handleDBClick() {
        this.$emit('dblclick');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header {
    color: #fff;
    font-size: 9px;
    font-weight: bold;
  }
  .content.content.content {
    color: #fff;
    font-size: 5px;
    display: inline-block;
    width: 7px;
    margin: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #1ba2c9;
  }
</style>
