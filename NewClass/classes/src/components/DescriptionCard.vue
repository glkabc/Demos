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
    leftButtonColor="#066c71"
    rightButtonColor="#e3635c"
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
    @update="handleUpdate"
    @associate="handleAssociate"
    :suggestedIndex="suggestedIndex"
    :originFormData="originFormData"
    :groupId="groupId"
    :isQuoted="isQuoted"
  />
</template>

<script>
  import {createNamespacedHelpers} from 'vuex';
  import Preview from './descriptionCard/Preview';
  import Edit from './descriptionCard/Edit';

  const {mapState: canvasMapState, mapActions: canvasMapActions} = createNamespacedHelpers('canvas');
  export default {
    name: 'DescriptionCard',
    components: {
      Preview,
      Edit,
    },
    props: {
      isQuoted: Boolean,
      showLeftThickScale: Boolean,
      showRightThickScale: Boolean,
      showLeftFlag: Boolean,
      showRightFlag: Boolean,
      showLeftDot: Boolean,
      showRightDot: Boolean,
      leftButtonTooltip: String,
      rightButtonTooltip: String,
      originFormData: Object,
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
    created() {
      if (['idle', 'rejected'].includes(this.descriptionMethod.status)) {
        this.fetchDescriptionMethod();
      }
      if (['idle', 'rejected'].includes(this.descriptionTimeCost.status)) {
        this.fetchDescriptionTimeCost();
      }
    },
    computed: {
      ...canvasMapState(['descriptionMethod', 'descriptionTimeCost']),
    },
    methods: {
      ...canvasMapActions(['fetchDescriptionMethod', 'fetchDescriptionTimeCost']),
      handleAssociate(data) {
        this.$emit('associate', data);
      },
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
