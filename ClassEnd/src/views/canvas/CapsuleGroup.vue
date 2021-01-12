`<template>
  <div class="capsule-group-container">
    <AntTooltip v-if="hasSubTaskCard" title="在讲解前先说明要完成什么子任务">
      <SupplementCard
        :leftTime="prevSubtaskTimeCost"
        :rightTime="prevSubtaskTimeCost + 1.5"
        :style="{marginTop: '55px', marginLeft: '36px', marginRight: '21px'}"
        :protrudeLeftTimeLineLength="23"
        :protrudeRightTimeLineLength="23"
        :scaleNumber="8"
        :showLeftThickScale="true"
        :showRightThickScale="!hasAnyEntityCards"
      />
    </AntTooltip>
    <div v-else class="supplement-card-placeholder" />
    <div class="scroll-wrapper">
      <div
        class="sroll-button-group"
        v-if="doesNeedScrollButtons && !inScrollLockedMode"
      >
        <button class="scroll-button" @mouseenter="handleScrollLeft">
          <AntIcon type="double-left" />
        </button>
        <button class="scroll-button" @mouseenter="handleScrollRight">
          <AntIcon type="double-right" />
        </button>
      </div>
      <div
        class="scroll-to-end-shadow-box left-middle"
        :style="leftShadowBoxStyle"
      />
      <div class="connect-line" v-if="hasSubTaskCard" />
      <Draggable
        class="capsule-draggable-container"
        :style="capsuleDraggableContainerStyle"
        ref="capsuleGroupContainerRef"
        :list="capsuleGroup"
        :animation="200"
        :disabled="!inValidEditMode"
        direction="horizontal"
        :setData="handleSetData"
        @start="handleDragStart"
        @end="handleDragEnd"
      >
        <transition-group
          class="group-container"
          ref="groupContainerRef"
          type="transition"
          :name="!isCapsuleGroupDragging ? 'flip-list' : null"
        >
          <Capsule
            v-for="(group, index) of capsuleGroup"
            :key="group.id"
            :cards="group.cards"
            :originAuthor="group.originAuthor"
            :capsuleAvailableMaxWidth="capsuleGroupContainerWidth"
            :inEditMode="group.inEditMode"
            :groupId="group.id"
            :hasSupplementCard="hasSubTaskCard"
            :prevGroupTimeCost="calculatePrevGroupTimeCost(index)"
            :isFirstCapsule="index === 0"
            :isLastCapsule="index === capsuleGroup.length - 1"
            :isAlmostNeedScroll="isAlmostNeedScroll"
            :isQuoted="group.isQuoted"
            :hadDescriptionBefore="group.hadDescriptionBefore"
            @save="(...props) => handleSave(group.id, ...props)"
            @update="(...props) => handleUpdate(group.id, ...props)"
            @deleteCard="handleDeleteCard(group.id, $event)"
            @toggleInEditMode="handleToggleInEditMode(group.id)"
            @cardDragStart="handleCardDragStart(group.id)"
            @resetCards="handleResetCards(group.id)"
            @associate="handleAssociate(group.id, $event)"
            @deleteGroup="handleDeleteGroup(group.id)"
            @scrollCapsuleToMiddle="scrollNthCapsule(index)"
            @deleteQuotedDescriptionCard="
              handleDeleteQuotedDescriptionCard(group.id, $event)
            "
          />
        </transition-group>
      </Draggable>
      <div
        class="scroll-to-end-shadow-box right-middle"
        :style="rightShadowBoxStyle"
      />
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable';
  import {throttle} from 'lodash-es';
  import {Icon, message, Tooltip} from 'ant-design-vue';
  import warning from 'warning';
  import client from '@/configs/request';
  import {createNamespacedHelpers} from 'vuex';

  import Capsule from './Capsule';
  import SupplementCard from '@components/SupplementCard';
  import confirm from '@utils/confirm';
  import {CANVAS_MUTATIONS} from '@/store/modules/canvas';

  const {
    mapState: canvasMapState,
    mapMutations: canvasMapMutations,
  } = createNamespacedHelpers('canvas');
  const boxShadow =
    '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)';
  const boxShadowReverse =
    '0px -3px 1px -2px rgba(0,0,0,0.2), 0px -2px 2px 0px rgba(0,0,0,0.14), 0px -1px 5px 0px rgba(0,0,0,0.12)';
  export default {
    name: 'CapsuleGroup',
    components: {
      Capsule,
      Draggable,
      AntIcon: Icon,
      SupplementCard,
      AntTooltip: Tooltip,
    },
    props: {
      capsuleGroup: {
        type: Array,
        default: () => [],
      },
      hasSubTaskCard: {
        type: Boolean,
        default: false,
      },
      subTaskId: Number,
      prevSubtaskTimeCost: Number,
    },
    data() {
      return {
        isCapsuleGroupDragging: false,
        capsuleGroupContainerWidth: 0,
        hasScrollToLeftMost: true,
        hasScrollToRightMost: true,
        inScrollLockedMode: false,
        doesNeedScrollButtons: false,
        deleteGroupStatus: 'idle',
        reorderingCapsuleStatus: 'idle',
        isAlmostNeedScroll: false,
      };
    },
    inject: ['inValidEditMode'],
    computed: {
      ...canvasMapState(['operationLocked']),
      hasAnyEntityCards() {
        if (this.capsuleGroup.length === 0) {
          return false;
        } else {
          return (
            this.capsuleGroup.reduce(
              (acc, cur) =>
                acc +
                cur.cards.reduce(
                  (accCard, curCard) =>
                    accCard +
                    (curCard.type !== 'descriptionPlaceholder' ? 1 : 0),
                  0
                ),
              0
            ) > 0
          );
        }
      },
      leftShadowBoxStyle() {
        return {
          boxShadow: !this.hasScrollToLeftMost ? boxShadow : '',
        };
      },
      leftShadowBoxStyleReverse() {
        return {
          boxShadow: !this.hasScrollToLeftMost ? boxShadowReverse : '',
        };
      },
      rightShadowBoxStyle() {
        return {
          boxShadow: !this.hasScrollToRightMost ? boxShadow : '',
        };
      },
      rightShadowBoxStyleReverse() {
        return {
          boxShadow: !this.hasScrollToRightMost ? boxShadowReverse : '',
        };
      },
      capsuleDraggableContainerStyle() {
        return {
          overflowX: this.inScrollLockedMode ? 'hidden' : 'auto',
        };
      },
    },
    watch: {
      capsuleGroup: {
        handler() {
          const groupInEditModeIndex = this.capsuleGroup.findIndex(
            (group) => group.inEditMode === true
          );
          this.$nextTick(() => {
            if (~groupInEditModeIndex) {
              this.scrollNthCapsule(groupInEditModeIndex);
              this.activateScrollLockedMode();
            } else {
              this.deactivateScrollLockedMode();
            }
          });
        },
        deep: true,
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.updateNeedOfScrollButton();
        this.setupResizeObserver();

        this.capsuleGroupContainerWidth = this.$refs.capsuleGroupContainerRef.$el.clientWidth;

        this.handleWindowWidthChange = throttle(
          function() {
            this.capsuleGroupContainerWidth = this.$refs.capsuleGroupContainerRef.$el.clientWidth;
          }.bind(this),
          50
        );
        window.addEventListener('resize', this.handleWindowWidthChange);

        this.handleCapsuleGroupContainerScroll = throttle(
          function() {
            this.updateControlScrollPosistion();
            this.updateNeedOfScrollButton();
          }.bind(this),
          50
        );
        this.$refs.capsuleGroupContainerRef.$el.addEventListener(
          'scroll',
          this.handleCapsuleGroupContainerScroll,
          false
        );
      });
    },
    updated() {
      this.updateNeedOfScrollButton();
      this.updateControlScrollPosistion();
    },
    beforeDestroy() {
      this.$refs.capsuleGroupContainerRef.$el.removeEventListener(
        'scroll',
        this.handleCapsuleGroupContainerScroll
      );
      window.removeEventListener('resize', this.handleWindowWidthChange);
      this.tearDownResizeOberver();
    },
    methods: {
      ...canvasMapMutations({
        lockOperation: CANVAS_MUTATIONS.LOCK_OPERATION,
        unlockOperation: CANVAS_MUTATIONS.UNLOCK_OPERATION,
      }),
      handleSetData(dataTransfer, dragEl) {
        dataTransfer.setData('Text', '');
      },
      scrollNthCapsule(index) {
        const container = this.$refs.capsuleGroupContainerRef.$el;
        const inEditModeCapsuleElement = container.querySelectorAll(
          '.capsule-container'
        )[index];
        if (inEditModeCapsuleElement) {
          const left =
            inEditModeCapsuleElement.getBoundingClientRect().left -
            container.getBoundingClientRect().left;
          container.scrollTo({
            top: 0,
            left: container.scrollLeft + left,
            behavior: 'smooth',
          });
        }
      },
      setupResizeObserver() {
        this.resizeObserver = new ResizeObserver((entries) => {
          for (let entry of entries) {
            if (entry.target === this.$refs.groupContainerRef.$el) {
              if (
                this.$refs.groupContainerRef.$el.offsetWidth + 100 >=
                this.$refs.capsuleGroupContainerRef.$el.clientWidth
              ) {
                this.isAlmostNeedScroll = true;
              } else {
                this.isAlmostNeedScroll = false;
              }
            }
          }
        });
        this.resizeObserver.observe(this.$refs.groupContainerRef.$el);
      },
      tearDownResizeOberver() {
        this.resizeObserver?.disconnect();
      },
      handleAssociate(groupId, data) {
        this.$emit('associate', groupId, data);
      },
      handleResetCards(groupId) {
        this.$emit('resetCards', groupId);
      },
      handleCardDragStart(groupId) {
        this.$emit('cardDragStart', groupId);
      },
      handleScrollLeft(event) {
        let cancelScroll = false;
        const continueScrollLeft = function() {
          if (this.$refs.capsuleGroupContainerRef.$el.scrollLeft > 0) {
            this.$refs.capsuleGroupContainerRef.$el.scrollLeft -= 20;
          }
          if (!cancelScroll) requestAnimationFrame(continueScrollLeft);
        }.bind(this);
        continueScrollLeft();
        event.target.addEventListener(
          'mouseleave',
          function cancelScrollWhenMouseLeave() {
            cancelScroll = true;
          },
          {once: true}
        );
      },
      handleScrollRight(event) {
        let cancelScroll = false;
        const continueScrollRight = function() {
          if (
            this.$refs.capsuleGroupContainerRef.$el.scrollLeft <
            this.$refs.capsuleGroupContainerRef.$el.scrollWidth
          ) {
            this.$refs.capsuleGroupContainerRef.$el.scrollLeft += 20;
          }
          if (!cancelScroll) requestAnimationFrame(continueScrollRight);
        }.bind(this);
        continueScrollRight();
        event.target.addEventListener(
          'mouseleave',
          function cancelScrollWhenMouseLeave() {
            cancelScroll = true;
          },
          {once: true}
        );
      },
      updateNeedOfScrollButton() {
        this.doesNeedScrollButtons =
          this.$refs.capsuleGroupContainerRef.$el.scrollWidth >
          this.$refs.capsuleGroupContainerRef.$el.clientWidth;
      },
      activateScrollLockedMode() {
        this.inScrollLockedMode = true;
      },
      deactivateScrollLockedMode() {
        this.inScrollLockedMode = false;
      },
      handleToggleInEditMode(groupId) {
        this.$emit('toggleInEditMode', groupId);
      },
      updateControlScrollPosistion() {
        const scrollLeft = this.$refs.capsuleGroupContainerRef.$el.scrollLeft;
        const clientWidth = this.$refs.capsuleGroupContainerRef.$el.clientWidth;
        const scrollWidth = this.$refs.capsuleGroupContainerRef.$el.scrollWidth;
        if (scrollLeft === 0) {
          this.hasScrollToLeftMost = true;
        } else {
          this.hasScrollToLeftMost = false;
        }
        if (scrollWidth - Math.ceil(scrollLeft) - clientWidth <= 0) {
          this.hasScrollToRightMost = true;
        } else {
          this.hasScrollToRightMost = false;
        }
      },
      handleDragStart(event) {
        this.isCapsuleGroupDragging = true;
        this.$emit('capsuleGroupDragStart');
      },
      async handleDeleteGroup(groupId, prompt) {
        if (
          this.deleteGroupStatus === 'pending' ||
          this.reorderingCapsuleStatus === 'pending' ||
          this.operationLocked
        )
          return;
        if (prompt) {
          try {
            await confirm({
              title: '确认删除',
              content: prompt,
              okText: '删除',
              class: 'my-custom-confirm-sk',
            });
          } catch (error) {
            return;
          }
        }
        this.deleteGroupStatus = 'pending';
        this.lockOperation();
        const hide = message.loading('删除胶囊...', 0);
        try {
          let response;
          try {
            response = await client.post('/canvas/deleteGroup', {
              groupId,
            });
          } catch {
            throw {globalHandled: true};
          }
          if (response.status === 200 && response.data.code === 0) {
            this.deleteGroupStatus = 'resolved';
            this.deactivateScrollLockedMode();
            this.$emit('deleteGroup', groupId);
          } else {
            this.deleteGroupStatus = 'rejected';
            message.warn(`删除胶囊失败，${response.data.mesg}`);
          }
        } catch (err) {
          warning(
            false,
            `<CapsuleGroup>:(handleDeleteGroup):error catched ${err}`
          );
          this.deleteGroupStatus = 'rejected';
          if (err.globalHandled !== true) {
            message.warn('删除胶囊失败');
          }
        } finally {
          hide();
          this.unlockOperation();
        }
      },
      async handleDragEnd(customEvent) {
        this.isCapsuleGroupDragging = false;
        if (customEvent?.originalEvent.target.closest('[data-delete-area]')) {
          this.$emit('resetCapsuleGroup');
          // 上面那个$emit是一个异步的操作，所以下面的逻辑执行的时候胶囊组的顺序还没有被还原
          // 所以要用$nextTick，也许有更好的方法
          this.$nextTick(() => {
            this.handleDeleteGroup(
              this.capsuleGroup[customEvent.oldIndex].id,
              '永久删除该胶囊吗？'
            );
          });
        } else {
          if (customEvent.oldIndex === customEvent.newIndex) return false;
          if (this.reorderingCapsuleStatus === 'pending') {
            this.$emit('resetCapsuleGroup');
            return false;
          }
          this.reorderingCapsuleStatus = 'pending';
          const hide = message.loading('同步胶囊排序...', 0);
          this.lockOperation();
          client
            .post('/canvas/moveGroup', {
              capsuleId: this.subTaskId,
              id: this.capsuleGroup[customEvent.newIndex].id,
              startOrderNum: customEvent.oldIndex,
              endOrderNum: customEvent.newIndex,
            })
            .then((response) => {
              if (response.status === 200 && response.data.code === 0) {
                this.reorderingCapsuleStatus = 'resolved';
              } else {
                this.reorderingCapsuleStatus = 'rejected';
                this.$emit('resetCapsuleGroup');
                message.warn(`胶囊排序同步失败，${response.data.mesg}`);
              }
            })
            .catch((error) => {
              this.reorderingCapsuleStatus = 'rejected';
              this.$emit('resetCapsuleGroup');
              warning(
                false,
                `<CapsuleGroup>:(checkCapsuleMove):catch error in api call: ${error}`
              );
            })
            .finally(() => {
              hide();
              this.unlockOperation();
            });
        }
      },
      handleDeleteCard(groupId, cardId) {
        this.$emit('deleteCard', groupId, cardId);
      },
      handleDeleteQuotedDescriptionCard(groupId, cardId) {
        this.$emit('deleteQuotedDescriptionCard', groupId, cardId);
      },
      handleSave(...props) {
        this.$emit('save', ...props);
      },
      handleUpdate(...props) {
        this.$emit('update', ...props);
      },
      calculatePrevGroupTimeCost(currentIndex) {
        let timeCost = this.prevSubtaskTimeCost;
        if (this.hasSubTaskCard) {
          timeCost += 1.5;
        }
        for (const [capsuleIndex, capsule] of this.capsuleGroup.entries()) {
          if (capsuleIndex >= currentIndex) break;
          const allCardTimeCostWithinGroup = capsule.cards.reduce(
            (accCard, curCard) => {
              return accCard + (curCard.timeCost ?? 0);
            },
            0
          );
          timeCost += allCardTimeCostWithinGroup;
        }
        return timeCost;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .capsule-group-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .supplement-card-placeholder {
      width: 62px;
    }
    .scroll-wrapper {
      width: 100%;
      height: 100%;
      padding-bottom: 30px;
      position: relative;
      overflow: hidden;
      .sroll-button-group {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        bottom: 0;
        height: 30px;
        display: flex;
        justify-content: center;

        button {
          height: 30px;
          padding: 0 20px;
          background-color: rgba(0, 0, 0, 0);
          transition: background-color linear 0.2s;
          border: none;
          cursor: pointer;
          outline: none;

          &:hover {
            background-color: #cbcbcb;
            /* color: #066c71; */
          }
        }
      }

      .connect-line {
        position: absolute;
        width: 100%;
        height: 4px;
        bottom: 53px;
        background-color: #d5d5d5;
      }

      .scroll-to-end-shadow-box {
        position: absolute;
        transition: box-shadow linear 0.2s;

        &.left-middle,
        &.right-middle {
          top: 0;
          width: 20px;
          height: 100%;
        }

        &.left-middle {
          right: 100%;
        }
        &.right-middle {
          left: 100%;
        }

        &.left-top,
        &.left-top-second,
        &.left-top-third,
        &.right-top,
        &.right-top-second,
        &.right-top-third,
        &.left-bottom,
        &.left-bottom-second,
        &.left-bottom-third,
        &.right-bottom,
        &.right-bottom-second,
        &.right-bottom-third {
          width: 10%;
          height: 20px;
        }

        &.left-top,
        &.right-top {
          bottom: 100%;
        }

        &.left-top-second,
        &.right-top-second {
          bottom: 100.5%;
        }

        &.left-top-third,
        &.right-top-third {
          bottom: 101%;
        }

        &.left-bottom,
        &.right-bottom {
          top: 100%;
        }

        &.left-bottom-second,
        &.right-bottom-second {
          top: 100.5%;
        }

        &.left-bottom-third,
        &.right-bottom-third {
          top: 101%;
        }

        &.left-top,
        &.left-bottom {
          left: 0;
        }

        &.left-top-second,
        &.left-bottom-second {
          left: 10%;
        }

        &.left-top-third,
        &.left-bottom-third {
          left: 20%;
        }

        &.right-top,
        &.right-bottom {
          right: 0;
        }

        &.right-top-second,
        &.right-bottom-second {
          right: 10%;
        }

        &.right-top-third,
        &.right-bottom-third {
          right: 20%;
        }
      }
      .capsule-draggable-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        overflow-y: hidden;

        scrollbar-width: none;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }

        .group-container {
          flex-shrink: 0;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
  }
</style>

<style scoped>
  /deep/ .flip-list-move {
    transition: transform 0.5s;
  }
</style>

<style lang="scss">
  .my-custom-confirm-sk {
    .ant-modal-body {
      padding: 30px 24px;
    }
    .anticon.anticon-question-circle {
      display: none;
    }
    .ant-modal-confirm-content.ant-modal-confirm-content.ant-modal-confirm-content {
      margin-left: 0;
      color: #666;
    }
    .ant-modal-confirm-title {
      color: #000;
      font-size: 20px;
      font-weight: bold;
    }

    .ant-btn {
      width: 88px;
      height: 40px;
      background-color: #e5e5e5;
      border-color: #e5e5e5;
      color: #666;

      &:hover {
        background-color: #d7d7d7;
        border-color: #d7d7d7;
      }

      &.ant-btn-primary {
        background-color: #ff7fa4;
        border-color: #ff7fa4;
        color: #fff;

        &:hover {
          background-color: #fb6f98;
          border-color: #fb6f98;
        }
      }
    }
  }
</style>
