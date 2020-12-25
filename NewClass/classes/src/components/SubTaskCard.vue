<template>
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
  <Edit
    v-else
    @cancel="handleCancel"
    @save="handleSave"
    :originFormData="originFormData"
    :classId="classId"
    :subTaskId="subTaskId"
  />
</template>

<script>
  import Preview from './subTaskCard/Preview';
  import Edit from './subTaskCard/Edit';
  import {createNamespacedHelpers} from 'vuex';

  const {mapState, mapActions} = createNamespacedHelpers('canvas');
  export default {
    name: 'SubTaskCard',
    components: {
      Preview,
      Edit,
    },
    props: {
      showLeftThickScale: Boolean,
      showRightThickScale: Boolean,
      leftButtonTooltip: String,
      classId: String,
      subTaskId: Number,
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
      dragEnd: {
        type: Function,
      },
      originFormData: {
        type: Object,
      },
    },
    created() {
      if (['idle', 'rejected'].includes(this.teachingFormat.status)) {
        this.fetchTeachingFormat();
      }
      if (['idle', 'rejected'].includes(this.subTaskTimeCost.status)) {
        this.fetchSubTaskTimeCost();
      }
    },
    computed: {
      ...mapState(['teachingFormat', 'subTaskTimeCost']),
    },
    methods: {
      ...mapActions(['fetchTeachingFormat', 'fetchSubTaskTimeCost']),
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
