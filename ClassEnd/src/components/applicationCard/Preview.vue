<template>
  <CardLayout
    title="C 应用卡"
    subTitle="这张活动卡要通过设计练习活动，让学生在应用新知的过程中更好地掌握新知"
    color="#e3635c"
    :small="small"
    :interactable="interactable"
    :showTimeLine="showTimeLine"
    :showLeftLink="showLeftLink"
    :showRightLink="showRightLink"
    :leftButtonTooltip="leftButtonTooltip"
    :rightButtonTooltip="rightButtonTooltip"
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
    @clickLeftButton="handleClickLeftButton"
    @clickRightButton="handleClickRightButton"
    @click="handleClick"
    @dblclick="handleDBClick"
  >
    <div :class="{'content-wrapper': true, small: this.small}">
      <div class="item">
        <h5 class="item__title large">
          为了让学生应用这个知识点，我要设计的练习是什么？
        </h5>
        <p class="item__content large">
          <span>
            {{ how }}
          </span>
        </p>
      </div>
      <div class="item">
        <h5 class="item__title">
          我计划用多久来完成？
        </h5>
        <p class="item__content">
          <span>
            {{ timeCostLabel }}
          </span>
        </p>
      </div>
      <div class="item">
        <h5 class="item__title">
          这个练习的具体内容是什么？
        </h5>
        <h6 class="item__subtitle">
          如: 提问的题目内容、活动的时间/步骤、讨论的主题/时间等等
        </h6>
        <p class="item__content">
          <span>
            {{ description }}
          </span>
        </p>
      </div>
    </div>
  </CardLayout>
</template>

<script>
  import Card from '../Card';
  import {createNamespacedHelpers} from 'vuex';

  const {mapState: canvasMapState} = createNamespacedHelpers('canvas');
  export default {
    name: 'Preview',
    components: {
      CardLayout: Card,
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
      ...canvasMapState(['applicationMethod', 'applicationTimeCost']),
      how() {
        if (this.originFormData && this.originFormData.how) {
          if (this.applicationMethod.status === 'resolved') {
            return this.applicationMethod.data.find((method) => method.value === this.originFormData.how).label;
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      timeCostLabel() {
        if (this.originFormData && this.originFormData.timeCost) {
          if (this.applicationTimeCost.status === 'resolved') {
            return this.applicationTimeCost.data.find((time) => time.value === this.originFormData.timeCost).label;
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      description() {
        if (this.originFormData) {
          return this.originFormData.description;
        } else {
          return '';
        }
      },
    },
    methods: {
      handleClickLeftButton() {
        this.$emit('clickLeftButton');
      },
      handleClickRightButton() {
        this.$emit('clickRightButton');
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
  .content-wrapper {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    .item {
      width: 100%;

      &:not(:first-child) {
        border-top: dashed 1px #e3635c;
        padding-top: 12px;
      }

      &.half-width {
        width: 48%;
      }
      &__title {
        font-size: 17px;
        color: #e3635c;
        text-align: center;
      }
      &__title.large {
        font-weight: bold;
        font-size: 20px;
      }
      &__subtitle {
        font-size: 11px;
        color: #e3635c;
        text-align: center;
      }
      &__content {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0;
        font-size: 21px;
        height: 132px;
        overflow-y: auto;
      }
      &__content.large {
        font-size: 23px;
        font-weight: bold;
      }
    }
    &.small {
      .item {
        &:not(:first-child) {
          border-top: dotted 0.5px #e3635c;
          padding-top: 2px;
        }

        &__title {
          font-size: 3px;
          color: #e3635c;
          font-weight: bold;
          text-align: center;
        }
        &__subtitle {
          font-size: 2px;
          color: #e3635c;
          text-align: center;
        }
        &__content {
          text-align: center;
          font-size: 2px;
          height: 14px;
          overflow: hidden;
        }
      }
    }
  }
</style>
