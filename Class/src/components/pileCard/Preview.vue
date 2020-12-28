<template>
  <CardLayout
    title="T 子任务卡"
    subTitle="这张活动卡通过设计一个有可见产出的子任务（里程碑），确保学生完成阶段交付目标"
    color="#1ba2c9"
    :small="small"
    :interactable="interactable"
    :showTimeLine="showTimeLine"
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
    @clickLeftButton="handleClickLeftButton"
    @clickRightButton="handleClickRightButton"
    @click="handleClick"
    @dblclick="handleDBClick"
    :dragStart="dragStart"
    :dragEnd="dragEnd"
  >
    <!-- 子任务卡预览内容区域 -->
    <form class="container">
      <div :class="[small === true ? 'sub-task-small' : 'sub-task']">
        这个子任务/里程碑的名称是什么?
      </div>
      <div :class="[small === true ? 'sub-task-name-small' : 'sub-task-name']">
        {{ subName }}
      </div>
      <div :class="[small === true ? 'task-detail-small' : 'task-detail']">
        <!-- 任务完成形式 -->
        <div :class="[small === true ? 'task-forms-small' : 'task-forms']">
          <div :class="[small === true ? 'forms-small' : 'forms']">
            我要通过什么活动形式让学生完成这个子任务?
          </div>
          <div :class="[small === true ? 'forms-content-small' : 'forms-content']">
            {{ taskForm }}
          </div>
        </div>
        <!-- 任务时间 -->
        <div :class="[small === true ? 'subtask-time-small' : 'subtask-time']">
          <div :class="small === true ? 'time-small' : 'time'">
            我预期多久可以完成该任务?
          </div>
          <div :class="[small === true ? 'time-content-small' : 'time-content']">
            {{ taskTime }}
          </div>
        </div>
      </div>
      <div :class="[small === true ? 'task-question-small' : 'task-question']">
        这个子任务的具体要求是什么？
      </div>
      <div :class="[small === true ? 'question-describe-small' : 'question-describe']">
        如：产物的具体要求、任务的时间/步骤、讨论的主题/时间、展示的要求等等
      </div>
      <div :class="[small === true ? 'question-content-small' : 'question-content']">
        {{ requires }}
      </div>
    </form>
  </CardLayout>
</template>

<script>
  import Card from '../ThumbnailCard';
  import {createNamespacedHelpers} from 'vuex';
  const {mapState: canvasMapState, mapActions: canvasMapActions} = createNamespacedHelpers('canvas');
  export default {
    name: 'Preview',
    components: {
      CardLayout: Card,
    },
    computed: {
      ...canvasMapState(['teachingFormat', 'subTaskTimeCost']),
      subName() {
        if (this.originFormData) {
          return this.originFormData.name;
        } else {
          return '';
        }
      },
      taskForm() {
        if (this.originFormData && this.originFormData.teachingFormat) {
          if (this.teachingFormat.status === 'resolved') {
            return this.teachingFormat.data.find((method) => method.value === this.originFormData.teachingFormat).label;
          } else {
            return '';
          }
        }
      },
      taskTime() {
        if (this.originFormData && this.originFormData.timeCost) {
          if (this.subTaskTimeCost.status === 'resolved') {
            return this.subTaskTimeCost.data.find((method) => method.value === this.originFormData.timeCost).label;
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      requires() {
        if (this.originFormData) {
          return this.originFormData.requirement;
        } else {
          return '';
        }
      },
    },
    props: {
      pileCardAllTime: {
        type: Array,
        default: () => [],
      },
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
      leftButtonTooltip: String,
      protrudeRightTimeLineLength: {
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
      dragEnd: {
        type: Function,
      },
      originFormData: {
        type: Object,
        default: () => ({}),
      },
      leftTime: {
        type: Number,
      },
      rightTime: {
        type: Number,
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
    methods: {
      ...canvasMapActions(['fetchTeachingFormat', 'fetchSubTaskTimeCost']),
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
  .sub-task {
    font-size: 20px;
    font-weight: 700;
    color: rgb(27, 162, 201);
    text-align: center;
    margin-top: 10px;
  }

  .sub-task-small {
    font-size: 3px;
    font-weight: 700;
    color: rgb(27, 162, 201);
    text-align: center;
    margin: 0 0 2px;
  }

  .sub-task-name {
    width: 100%;
    height: 140px;
    font-size: 23px;
    font-weight: 700;
    margin-top: 10px;
    padding-left: 10px;
    border-bottom: 2px dotted #ccc;
    overflow: auto;
    word-break: break-all;
    text-align: center;
  }

  .sub-task-name-small {
    width: 100%;
    height: 18px;
    font-size: 2px;
    font-weight: 700;
    text-align: center;
    padding: 4px 0 2px 2px;
    border-bottom: 1px dotted #ccc;
    word-break: break-all;
    overflow: hidden;
  }

  .task-detail {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px dotted #ccc;
    margin-bottom: 10px;
    padding: 20px 0;
  }

  .task-detail-small {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dotted #ccc;
    padding: 2px 0;
  }

  .task-forms {
    height: 120px;
    border-right: 2px dotted #ccc;
  }

  .task-forms-small {
    border-right: 1px dotted #ccc;
  }
  .task-forms,
  .subtask-time,
  .task-forms-small,
  .subtask-time-small {
    width: 50%;
  }

  .forms,
  .time,
  .task-question,
  .question-describe {
    font-size: 17px;
    color: rgb(27, 162, 201);
    text-align: center;
  }

  .forms,
  .time {
    padding: 0 10px;
    height: 42px;
  }
  .question-describe {
    margin-top: 10px;
    font-size: 13px;
  }
  .forms-small,
  .time-small,
  .task-question-small,
  .question-describe-small {
    font-size: 3px;
    color: rgb(27, 162, 201);
    text-align: center;
  }

  .question-describe-small {
    font-size: 2px;
  }
  .forms-content,
  .time-content {
    font-size: 21px;
    // font-weight: 700;
    text-align: center;
    margin-top: 20px;
  }

  .task-question {
    margin-top: 20px;
  }

  .task-question-small {
    margin-top: 2px;
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
    height: 195px;
    font-size: 21px;
    text-align: center;
    margin-top: 10px;
    padding: 10px 0 0 10px;
    overflow: auto;
    word-break: break-all;
  }

  .question-content-small {
    width: 100%;
    height: 18px;
    font-size: 2px;
    font-weight: 700;
    text-align: center;
    margin-top: 2px;
    padding: 2px 0 0 2px;
    word-break: break-all;
    overflow: hidden;
  }
</style>
