<template>
  <Preview
    v-if="mode === 'preview'"
    :small="mode === 'preview' && small ? true : false"
    :interactable="mode === 'preview' && interactable ? true : false"
    :dragStart="dragStart"
    :showTimeLine="showTimeLine"
    :originFormData="originFormData"
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
    :showLeftThickScale="showLeftThickScale"
    :showRightThickScale="showRightThickScale"
    @clickLeftButton="handleclickLeftButton"
    @clickRightButton="handleclickRightButton"
    @click="handleClick"
    @dblclick="handleDBClick"
  />
  <Edit v-else @cancel="handleCancel" @save="handleSave" :originFormData="originFormData" :classId="classId" />
</template>

<script>
  import Preview from './mainTaskCard/Preview';
  import Edit from './mainTaskCard/Edit';

  export default {
    name: 'MainTaskCard',
    components: {
      Preview,
      Edit,
    },
    props: {
      showLeftThickScale: Boolean,
      showRightThickScale: Boolean,
      classId: String,
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

<style lang="scss" scoped></style>
