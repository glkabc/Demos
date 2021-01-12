<template>
  <header class="header-container">
    <h6 class="maintask-title">总任务 {{ mainTask ? ': 3min' : '' }}</h6>
    <section class="main-task-card-area">
      <AddCardButton @click="handleClickAdd" v-if="inValidEditMode && mainTask == null">
        <div class="add-card-button__content">
          <img src="./sectionBlock/assets/add-maintask-card.png" alt="" />
          <p>快速创建<span>总任务</span></p>
        </div>
      </AddCardButton>
      <MainTaskCard
        v-else-if="mainTask != null"
        mode="preview"
        :small="true"
        :interactable="true"
        :showTimeLine="true"
        :originFormData="mainTask.formData"
        :leftTime="0"
        :rightTime="3"
        :showLeftThickScale="true"
        :showRightThickScale="true"
        @click="inValidEditMode ? handleDBClickMainTask() : undefined"
        @dblclick="handleClickMainTask"
        :dragStart="handleMainTaskCardDargStart"
      />
    </section>
    <section class="info">
      <div class="left">
        <img class="icon" src="./sectionBlock/assets/time-cost-sum.png" alt="" />
        <div class="textBox">
          <p>{{ timeCostSum }}<span>分钟</span></p>
          <p>总时长</p>
        </div>
      </div>
      <div class="right">
        <img class="icon" src="./sectionBlock/assets/subtask-sum-icon.png" alt="" />
        <div class="textBox">
          <p>{{ subTaskCount }}<span>个</span></p>
          <p>子任务</p>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
  import AddCardButton from '../../components/AddCardButton';
  import MainTaskCard from '../../components/MainTaskCard';

  export default {
    name: 'SectionBlock',
    components: {
      AddCardButton,
      MainTaskCard,
    },
    props: {
      mainTask: Object,
      timeCostSum: Number,
      subTaskCount: {
        type: Number,
        default: 0,
      },
    },
    inject: ['inValidEditMode'],
    methods: {
      handleMainTaskCardDargStart(event) {
        event.dataTransfer.setData(
          'text/card-info',
          JSON.stringify({
            shouldHandleManully: true,
            draggedCardType: 'mainTask',
          })
        );
      },
      handleClickAdd() {
        this.$emit('addMainTask');
      },
      handleClickMainTask() {
        this.$emit('previewMainTask');
      },
      handleDBClickMainTask() {
        this.$emit('editMainTask');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .header-container {
    display: flex;
    flex-direction: row;
    height: 235px;
    margin-top: 52px;
    margin-bottom: 12px;
    position: relative;
    .maintask-title {
      position: absolute;
      bottom: 100%;
      left: 0;
      font-size: 18px;
      margin-bottom: 14px;
      font-weight: bold;

      &::before {
        content: '';
        display: block;
        width: 14px;
        height: 14px;
        border: solid 1px #017b83;
        border-radius: 50%;
        position: absolute;
        right: calc(100% + 7px);
        top: 50%;
        transform: translateY(-50%);
      }
    }
    &::before {
      content: '';
      display: block;
      width: 1px;
      height: 100%;
      background-color: #d3d3d3;
      position: absolute;
      top: 0;
      right: calc(100% + 14px);
    }

    .main-task-card-area {
      width: 50%;
      margin-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e8eaec;
      border-radius: 6px;

      .add-card-button__content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
        }

        p {
          margin-top: 15px;
          margin-bottom: 0;
          color: #999;
          font-size: 12px;

          span {
            color: #15629c;
          }
        }
      }
    }
    .info {
      width: calc(50% - 20px);
      height: 100%;
      background-color: #fff;
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      .left,
      .right {
        width: 50%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;

        .icon {
          width: 52px;
          height: 52px;
          margin-right: 16px;
        }

        .textBox {
          display: flex;
          flex-direction: column;

          p {
            line-height: 1;
            margin-bottom: 0;

            &:nth-child(1) {
              margin-bottom: 9px;
              font-size: 30px;
              display: flex;
              flex-direction: row;
              align-items: center;
              font-weight: bold;

              span {
                font-size: 12px;
                color: #000;
                margin-left: 5px;
                font-weight: normal;
              }
            }

            &:nth-child(2) {
              font-size: 14px;
              color: #000;
            }
          }
        }
      }
      .left {
        .textBox {
          p:nth-child(1) {
            color: #1461a3;
          }
        }
      }
      .right {
        .textBox {
          p:nth-child(1) {
            color: #e36b18;
          }
        }
      }
    }
  }
</style>
