<template>
  <CardLayout
    title="P 总任务说明"
    subTitle="这张活动卡通过设计一个总任务（项目），来确保学生在周期内达到最终的交付目标"
    color="#06629c"
    :small="small"
    :interactable="interactable"
    :showTimeLine="showTimeLine"
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
    @clickLeftButton="handleClickLeftButton"
    @clickRightButton="handleClickRightButton"
    @click="handleClick"
    @dblclick="handleDBClick"
    :dragStart="dragStart"
  >
    <!-- 主任务卡预览内容区域 -->
    <form class="container">
      <div :class="[small === true ? 'main-task-small' : 'main-task']">
        这个总任务/项目的名称是什么?
      </div>
      <div
        :class="[small === true ? 'main-task-name-small' : 'main-task-name']"
      >
        {{ originFormData.name }}
      </div>
      <div :class="[small === true ? 'task-detail-small' : 'task-detail']">
        <!-- 任务时间 -->
        <div
          :class="[small === true ? 'maintask-time-small' : 'maintask-time']"
        >
          <div :class="small === true ? 'time-small' : 'time'">
            我计划用多少课时开展该项目（包含知识讲解时间）
          </div>
          <div
            :class="[small === true ? 'time-content-small' : 'time-content']"
          >
            {{ originFormData.timeContent }}
          </div>
        </div>
        <!-- 任务完成形式 -->
        <div :class="[small === true ? 'task-forms-small' : 'task-forms']">
          <div :class="[small === true ? 'forms-small' : 'forms']">
            我计划分解为多少个子任务?
          </div>
          <div
            :class="[small === true ? 'forms-content-small' : 'forms-content']"
          >
            {{ originFormData.numContent }}
          </div>
        </div>
      </div>
      <div :class="[small === true ? 'task-question-small' : 'task-question']">
        该任务的最终产物和评价标准是什么？
      </div>
      <div
        :class="[
          small === true ? 'question-content1-small' : 'question-content1',
        ]"
      >
        {{ originFormData.criteria }}
      </div>
      <div :class="[small === true ? 'task-question-small' : 'task-question']">
        如果可以，我能为任务创设一个怎样的真实且有趣的发生情景？
      </div>
      <div
        :class="[
          small === true ? 'question-content2-small' : 'question-content2',
        ]"
      >
        {{ originFormData.scene }}
      </div>
    </form>
  </CardLayout>
</template>

<script>
  import Card from '../Card';

  export default {
    name: 'Preview',
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
      dragStart: {
        type: Function,
      },
      originFormData: {
        type: Object,
        default: () => ({}),
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
  * {
    margin: 0;
    padding: 0;
  }

  .main-task {
    font-size: 20px;
    font-weight: 700;
    color: rgb(6, 98, 156);
    text-align: center;
    margin: 0 0 15px;
  }

  .main-task-small {
    height: 8px;
    font-size: 3px;
    font-weight: 700;
    color: rgb(6, 98, 156);
    text-align: center;
  }

  .main-task-name {
    font-size: 23px;
    font-weight: 700;
    text-align: center;
    width: 100%;
    height: 90px;
    border-bottom: 2px dotted #ccc;
    overflow: auto;
  }

  .main-task-name-small {
    width: 100%;
    height: 10px;
    font-size: 2px;
    font-weight: 700;
    text-align: center;
    margin-top: 3px;
    padding: 0 0 2px 2px;
    border-bottom: 1px dotted #ccc;
    word-break: break-all;
    overflow: hidden;
  }

  .task-detail {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px dotted #ccc;
    margin-bottom: 10px;
    padding: 10px 0;
  }

  .task-detail-small {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dotted #ccc;
    padding: 2px 0;
  }

  .maintask-time {
    height: 100px;
    border-right: 2px dotted #ccc;
  }

  .task-forms-small {
    border-left: 1px dotted #ccc;
  }

  .task-forms,
  .maintask-time,
  .task-forms-small,
  .maintask-time-small {
    width: 50%;
  }

  .forms,
  .time {
    font-size: 17px;
    // font-weight: 700;
    color: rgb(6, 98, 156);
    text-align: center;
    height: 42px;
    padding: 0 10px;
  }

  .forms-small,
  .time-small {
    font-size: 3px;
    font-weight: 700;
    color: rgb(6, 98, 156);
    text-align: center;
    padding: 0 1px;
  }

  .forms-content,
  .time-content {
    font-size: 21px;
    text-align: center;
    margin-top: 20px;
  }

  .forms-content-small,
  .time-content-small {
    height: 4px;
    font-size: 2px;
    font-weight: 700;
    text-align: center;
    margin-top: 5px;
  }

  .task-question {
    font-size: 17px;
    color: rgb(6, 98, 156);
    margin: 10px 0;
    text-align: center;
  }

  .task-question-small {
    font-size: 3px;
    font-weight: 700;
    color: rgb(6, 98, 156);
    margin: 2px 0;
    text-align: center;
  }

  .question-content1 {
    font-size: 21px;
    text-align: center;
    width: 100%;
    height: 100px;
    border-bottom: 2px dotted #ccc;
    overflow: auto;
  }

  .question-content1-small {
    height: 10px;
    width: 100%;
    font-size: 2px;
    font-weight: 700;
    text-align: center;
    word-break: break-all;
    overflow: hidden;
    padding: 0 0 2px 2px;
    border-bottom: 1px dotted #ccc;
  }
  .question-content2 {
    width: 100%;
    height: 110px;
    margin-top: 10px;
    overflow: auto;
    font-size: 21px;
    text-align: center;
  }

  .question-content2-small {
    width: 100%;
    height: 15px;
    font-size: 2px;
    font-weight: 700;
    text-align: center;
    word-break: break-all;
    padding-left: 2px;
    overflow: hidden;
  }
</style>
