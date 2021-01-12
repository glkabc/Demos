<template>
  <Preview
    v-if="mode === 'preview'"
    :small="mode === 'preview' && small ? true : false"
    :interactable="mode === 'preview' && interactable ? true : false"
    :showTimeLine="showTimeLine"
    :showLeftLink="showLeftLink"
    :showRightLink="showRightLink"
    :leftButtonTooltip="leftButtonTooltip"
    :rightButtonTooltip="rightButtonTooltip"
    :originFormData="originFormData"
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
    :groupId="groupId"
    :suggestedIndex="suggestedIndex"
    :originFormData="originFormData"
    @cancel="handleCancel"
    @save="handleSave"
    @update="handleUpdate"
  />
</template>

<script>
  import Preview from './introductionCard/Preview';
  import Edit from './introductionCard/Edit';
  import {createNamespacedHelpers} from 'vuex';

  const {mapState: canvasMapState, mapActions: canvasMapActions} = createNamespacedHelpers('canvas');
  export default {
    name: 'IntroductionCard',
    components: {
      Preview,
      Edit,
    },
    props: {
      showLeftThickScale: Boolean,
      showRightThickScale: Boolean,
      leftButtonTooltip: String,
      rightButtonTooltip: String,
      originFormData: Object,
      showLeftFlag: Boolean,
      showRightFlag: Boolean,
      showLeftDot: Boolean,
      showRightDot: Boolean,
      leftTime: Number,
      rightTime: Number,
      scaleNumber: Number,
      groupId: Number,
      suggestedIndex: Number,
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
    },
    computed: {
      ...canvasMapState(['introductionMethod', 'introductionTimeCost']),
    },
    created() {
      if (['idle', 'rejected'].includes(this.introductionMethod.status)) {
        this.fetchIntroductionMethod();
      }
      if (['idle', 'rejected'].includes(this.introductionTimeCost.status)) {
        this.fetchIntroductionTimeCost();
      }
    },
    methods: {
      ...canvasMapActions(['fetchIntroductionMethod', 'fetchIntroductionTimeCost']),
      handleclickLeftButton() {
        this.$emit('clickLeftButton');
      },
      handleclickRightButton() {
        this.$emit('clickRightButton');
      },
      handleSave(data) {
        this.$emit('save', data);
      },
      handleUpdate(data) {
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
