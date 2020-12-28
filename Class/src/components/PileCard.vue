<template>
  <div class="bg-box">
      <Preview
    v-if="mode === 'preview'"
    :small="mode === 'preview' && small ? true : false"
    :interactable="mode === 'preview' && interactable ? true : false"
    :dragStart="dragStart"
    :dragEnd="dragEnd"
    :showTimeLine="showTimeLine"
    :originFormData="originFormData"
    :leftButtonTooltip="leftButtonTooltip"
    :showLeftLink="showLeftLink"
    :showRightLink="showRightLink"
    :protrudeLeftTimeLineLength="protrudeLeftTimeLineLength"
    :protrudeRightTimeLineLength="protrudeRightTimeLineLength"
    :leftTime="leftTime"
    :rightTime="rightTime"
    :showLeftFlag="showLeftFlag"
    :showRightFlag="showRightFlag"
    :showLeftDot="showLeftDot"
    :showRightDot="showRightDot"
    :pileCardAllTime="pileCardAllTime"
    @clickLeftButton="handleclickLeftButton"
    @clickRightButton="handleclickRightButton"
    @click="handleClick"
    @dblclick="handleDBClick"
  />
  </div>
</template>

<script>
  import Preview from './pileCard/Preview';

  export default {
    name: 'PileCard',
    components: {
      Preview
    },
    props: {
      pileCardAllTime:{
        type:Array,
        default:() => ([])
      },
      leftTime:{
        type:Number
      },
      rightTime:{
        type:Number
      },
      leftButtonTooltip: String,
      classId: String,
      subTaskId: String,
      showLeftFlag: Boolean,
      showRightFlag: Boolean,
      showLeftDot: Boolean,
      showRightDot: Boolean,
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
      showTimeLine: {
        type: Boolean,
        default: false,
      },
      mode: {
        type: String,
        default: 'preview',
      },
      small: {
        type: Boolean,
        default: false,
      },
      interactable: {
        type: Boolean,
        default: false,
      },
      dragStart: {
        type: Function,
      },
      dragEnd: {
        type: Function,
      },
      originFormData: {
        type: Object,
      },
    },
    methods: {
      handleclickLeftButton() {
        this.$emit('clickLeftButton');
      },
      handleclickRightButton() {
        this.$emit('clickRightButton');
      },
      handleSave(data) {
        this.$emit('update', data);
      },
      handleCancel() {
        this.$emit('dismiss');
      },
      handleClick() {
        this.$emit('click');
      },
      handleDBClick() {
        this.$emit('dblclick');
      },
    },
  };
</script>

<style lang="scss" scoped>
.bg-box{
    // position:absolute;
    width:116px;
    height:125px;
    background:url('../assets/12.png') no-repeat ;
    background-size:100% 100%;
    position:relative;
}
</style>
