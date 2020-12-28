<template>
  <CardLayout
    title="A 激活卡"
    subTitle="这张卡通过设计活动来激活学生相关的旧知（学过的知识或生活经验）以降低学习难度"
    color="#066c71"
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
    <div class="container">
      <div :class="[small === true ? 'introduce-items-small' : 'introduce-items']">
        我要激活的一个已学知识或相关生活经验是什么?
      </div>
      <div :class="[small === true ? 'introduce-content-small' : 'introduce-content']">
        {{ knowledge }}
      </div>
      <div :class="[small === true ? 'introduce-detail-small' : 'introduce-detail']">
        <!-- 任务完成形式 -->
        <div :class="[small === true ? 'introduce-forms-small' : 'introduce-forms']">
          <div :class="[small === true ? 'forms-small' : 'forms']">
            我要怎样来激活旧知?
          </div>
          <div :class="[small === true ? 'forms-content-small' : 'forms-content']">
            {{ taskForm }}
          </div>
        </div>
        <!-- 任务时间 -->
        <div :class="[small === true ? 'introduce-time-small' : 'introduce-time']">
          <div :class="small === true ? 'time-small' : 'time'">
            我计划用多久来完成?
          </div>
          <div :class="[small === true ? 'time-content-small' : 'time-content']">
            {{ taskTime }}
          </div>
        </div>
      </div>
      <div :class="[small === true ? 'intro-question-small' : 'intro-question']">
        这个活动具体内容是什么？
      </div>
      <div :class="[small === true ? 'question-describe-small' : 'question-describe']">
        如：演示/讲解的方法、提问的题目内容、活动的时间/步骤、讨论的主题/时间等等
      </div>
      <div :class="[small === true ? 'question-content-small' : 'question-content']">
        {{ activity }}
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
      originFormData: {
        type: Object,
      },
    },
    computed: {
      ...canvasMapState(['introductionMethod', 'introductionTimeCost']),
      knowledge() {
        if (this.originFormData) {
          return this.originFormData.introContent;
        } else {
          return '';
        }
      },
      taskForm() {
        if (this.originFormData && this.originFormData.introFormat) {
          if (this.introductionMethod.status === 'resolved') {
            return this.introductionMethod.data.find((method) => method.value === this.originFormData.introFormat)
              .label;
          } else {
            return '';
          }
        }
      },
      taskTime() {
        if (this.originFormData && this.originFormData.timeCost) {
          if (this.introductionTimeCost.status === 'resolved') {
            return this.introductionTimeCost.data.find((method) => method.value === this.originFormData.timeCost).label;
          } else {
            ('');
          }
        } else {
          return '';
        }
      },
      activity() {
        if (this.originFormData) {
          return this.originFormData.activityContent;
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
  .introduce-items {
    font-size: 20px;
    font-weight: 700;
    color: #066c71;
    text-align: center;
  }

  .introduce-items-small {
    font-size: 3px;
    font-weight: 700;
    color: #066c71;
    text-align: center;
    margin: 0 0 2px;
  }

  .introduce-content {
    width: 100%;
    height: 130px;
    font-size: 23px;
    font-weight: 700;
    margin-top: 10px;
    border-bottom: 2px dotted #ccc;
    overflow: auto;
    text-align: center;
  }

  .introduce-content-small {
    width: 100%;
    height: 10px;
    font-size: 2px;
    font-weight: 700;
    text-align: center;
    margin-top: 5px;
    padding: 0 0 2px 2px;
    border-bottom: 1px dotted #ccc;
    word-break: break-all;
    overflow: hidden;
  }

  .introduce-detail {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px dotted #ccc;
    padding: 20px 0;
  }

  .introduce-detail-small {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dotted #ccc;
    padding: 2px 0;
  }

  .introduce-forms {
    height: 120px;
    border-right: 2px dotted #ccc;
  }

  .introduce-forms-small {
    border-right: 1px dotted #ccc;
  }
  .introduce-forms,
  .introduce-time,
  .introduce-forms-small,
  .introduce-time-small {
    width: 50%;
  }

  .forms,
  .time,
  .intro-question,
  .question-describe {
    font-size: 17px;
    // font-weight: 700;
    color: #066c71;
    text-align: center;
  }

  .forms {
    padding: 0 10px;
  }

  .question-describe {
    font-size: 11px;
    margin-top: 5px;
  }

  .forms-small,
  .time-small,
  .intro-question-small,
  .question-describe-small {
    font-size: 3px;
    font-weight: 700;
    color: #066c71;
    text-align: center;
  }

  .question-describe-small {
    font-size: 2px;
  }
  .forms-content,
  .time-content {
    font-size: 21px;
    text-align: center;
    margin-top: 20px;
  }

  .intro-question {
    margin-top: 10px;
  }

  .intro-question-small {
    margin-top: 3px;
  }

  .forms-content-small,
  .time-content-small {
    height: 10px;
    font-size: 2px;
    font-weight: 700;
    text-align: center;
    margin-top: 6px;
  }

  .question-content {
    width: 100%;
    height: 160px;
    font-size: 21px;
    margin-top: 10px;
    // padding: 10px 0 0 10px;
    overflow: auto;
    text-align: center;
  }

  .question-content-small {
    width: 100%;
    height: 15px;
    font-size: 2px;
    font-weight: 700;
    text-align: center;
    margin-top: 2px;
    padding: 2px 0 0 2px;
    word-break: break-all;
    overflow: hidden;
  }
</style>
