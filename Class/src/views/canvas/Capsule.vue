<template>
  <div
    class="capsule-container"
    :style="capsuleContainerStyle"
    @dblclick="handeDBClick"
    ref="capsuleContainer"
  >
    <div class="drag-bar" :class="{movable: inValidEditMode}">
      <h4 v-if="originAuthor" class="origin-author">
        感谢<span> {{ originAuthor }} </span>的贡献
      </h4>
    </div>
    <Draggable
      class="draggable"
      :list="cards"
      :animation="200"
      direction="horizontal"
      :move="checkMove"
      :disabled="!inValidEditMode"
      :setData="handleSetData"
      @start="handleDragStart"
      @end="handleDragEnd"
    >
      <transition-group
        class="cards-container"
        type="transition"
        :name="!isCardDragging ? 'flip-list' : null"
      >
        <div
          v-for="(card, index) of cards"
          :key="card.id"
          class="capsule-card-container"
        >
          <component
            :is="getCardComponent(card.type)"
            v-bind="getCardComponentPreviewProps(card, index, cards)"
            @clickLeftButton="handleClickLeftButton(card.id, card.type, index)"
            @clickRightButton="
              handleClickRightButton(card.id, card.type, index)
            "
            @click="
              inValidEditMode
                ? card.type === 'descriptionPlaceholder'
                  ? handleClickAddDescriptionCard(index)
                  : handleEditCard(card.type, card.id)
                : undefined
            "
            @dblclick="
              card.type === 'descriptionPlaceholder'
                ? undefined
                : handlePreviewCard(card.type, card.id)
            "
          />
        </div>
      </transition-group>
    </Draggable>
    <AntModal
      :visible="shouldShowDialog"
      :centered="true"
      :closable="false"
      :bodyStyle="{padding: 0}"
      :destroyOnClose="true"
      :footer="null"
      :width="558"
      dialogClass="custom-dialog"
      @cancel="handleClickDialogMask"
    >
      <component
        :is="getCardComponent(editCardType)"
        :isQuoted="cardInModalIsQuoted"
        :originFormData="cardInModalOriginFormData"
        :mode="mode"
        :groupId="groupId"
        :suggestedIndex="suggestedIndex"
        @dismiss="handleDismiss"
        @save="handleSave"
        @update="handleUpdate"
        @associate="handleAssociate"
      />
    </AntModal>
  </div>
</template>

<script>
  import {message, Modal} from 'ant-design-vue';
  import Draggable from 'vuedraggable';
  import warning from 'warning';
  import {createNamespacedHelpers} from 'vuex';

  import client from '@/configs/request';
  import confirm from '@utils/confirm';
  import AddCardButton from '../../components/AddCardButton';
  import DescriptionCard from '../../components/DescriptionCard';
  import IntroductionCard from '../../components/IntroductionCard';
  import ApplicationCard from '../../components/ApplicationCard';
  import DescriptionCardPlaceholder from '@/components/DescriptionCardPlaceholder';
  import {CANVAS_MUTATIONS} from '@/store/modules/canvas';

  const {
    mapState: canvasMapState,
    mapMutations: canvasMapMutations,
  } = createNamespacedHelpers('canvas');
  export default {
    name: 'Capsule',
    components: {
      AddCardButton,
      AntModal: Modal,
      DescriptionCard,
      IntroductionCard,
      ApplicationCard,
      Draggable,
    },
    props: {
      hadDescriptionBefore: Boolean,
      isQuoted: Boolean,
      isAlmostNeedScroll: Boolean,
      originAuthor: String,
      isFirstCapsule: Boolean,
      isLastCapsule: Boolean,
      hasSupplementCard: {
        type: Boolean,
        default: false,
      },
      prevGroupTimeCost: Number,
      groupId: Number,
      cards: {
        type: Array,
        default: () => [],
      },
      capsuleAvailableMaxWidth: {
        type: Number,
        default: 0,
      },
      inEditMode: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        shouldShowDialog: false,
        editCardType: 'description',
        editCardId: '',
        suggestedPosition: [],
        suggestedIndex: null,
        isCardDragging: false,
        mode: 'edit',
        cardDeleteStatus: 'idle',
        reorderingCardsStatus: 'idle',
      };
    },
    inject: ['inValidEditMode'],
    computed: {
      ...canvasMapState(['operationLocked']),
      hasDescriptionPlaceholder() {
        return Boolean(
          this.cards.find((card) => card.type === 'descriptionPlaceholder')
        );
      },
      cardInModalIsQuoted() {
        if (this.editCardId) {
          return (
            this.cards.find((card) => card.id === this.editCardId)?.isQuoted ??
            false
          );
        } else {
          return false;
        }
      },
      cardInModalOriginFormData() {
        if (this.editCardId) {
          return (
            this.cards.find((card) => card.id === this.editCardId)?.formData ??
            null
          );
        } else {
          return null;
        }
      },
      capsuleContainerStyle() {
        return {
          width: this.inEditMode
            ? `${this.capsuleAvailableMaxWidth - 44}px`
            : 'auto',
          overflowX: this.inEditMode ? 'auto' : 'visible',
          paddingLeft: this.isFirstCapsule ? '26px' : '8px',
          paddingRight: this.isLastCapsule ? '24px' : '8px',
          marginRight: this.inEditMode ? '2px' : '0',
        };
      },
    },
    watch: {
      'cards.length'(newLength, oldLength) {
        if (newLength > oldLength) {
          const allCardWidthSum = Array.from(
            this.$refs.capsuleContainer.querySelectorAll(
              '.capsule-card-container'
            )
          ).reduce((acc, cur) => acc + cur.offsetWidth, 0);
          const isContentWiderThanContainer =
            this.capsuleAvailableMaxWidth < allCardWidthSum + 70;
          if (isContentWiderThanContainer && this.inEditMode) {
            this.$emit('toggleInEditMode');
          }
        }
        if (newLength === 10 && oldLength === 9) {
          message.info('一个胶囊最多可以有十张卡片');
        }
      },
    },
    methods: {
      ...canvasMapMutations({
        lockOperation: CANVAS_MUTATIONS.LOCK_OPERATION,
        unlockOperation: CANVAS_MUTATIONS.UNLOCK_OPERATION,
      }),
      handleSetData(dataTransfer, dragEl) {
        dataTransfer.setData('Text', '');
      },
      handeDBClick(event) {
        if (
          this.cards.length === 1 &&
          this.cards[0].type === 'descriptionPlaceholder'
        ) {
          this.$emit('deleteGroup');
          return;
        } else if (
          this.$refs.capsuleContainer.offsetWidth <
          this.capsuleAvailableMaxWidth
        ) {
          this.$emit('toggleInEditMode');
        } else {
          this.$emit('scrollCapsuleToMiddle');
        }
      },
      handleDragStart() {
        this.isCardDragging = true;
        this.$emit('cardDragStart');
      },
      handleDragEnd(customEvent) {
        this.isCardDragging = false;
        if (customEvent?.originalEvent.target.closest('[data-delete-area]')) {
          this.$emit('resetCards');
          this.$nextTick(async () => {
            if (
              this.cards[customEvent.oldIndex].type === 'descriptionPlaceholder'
            )
              return;
            if (
              this.cardDeleteStatus === 'pending' ||
              this.reorderingCardsStatus === 'pending' ||
              this.operationLocked
            )
              return;

            const cardId = this.cards[customEvent.oldIndex].id;
            const cardType = this.cards[customEvent.oldIndex].type;
            const isCardQuoted = this.cards[customEvent.oldIndex].isQuoted;
            let endPoint = '';
            if (this.inEditMode) {
              try {
                await confirm({
                  title: '确认删除',
                  content: '永久删除该卡片吗？',
                  okText: '删除',
                  class: 'my-custom-confirm-sk',
                });
              } catch (error) {
                return;
              }
              if (cardType === 'description') {
                if (this.isQuoted) {
                  endPoint = '/canvasCard/deleteQuoteDemonstrationCard';
                } else {
                  endPoint = getDeleteEndPointByType(cardType);
                }
              } else {
                endPoint = getDeleteEndPointByType(cardType);
              }
            } else {
              if (this.isQuoted) {
                if (this.cards.length > 2) {
                  try {
                    await confirm({
                      title: '确认删除',
                      content: '永久删除该卡片吗？',
                      okText: '删除',
                      class: 'my-custom-confirm-sk',
                    });
                  } catch (error) {
                    return;
                  }
                  if (cardType === 'description') {
                    endPoint = '/canvasCard/deleteQuoteDemonstrationCard';
                  } else {
                    endPoint = getDeleteEndPointByType(cardType);
                  }
                } else if (this.cards.length === 2) {
                  if (cardType === 'description') {
                    try {
                      await confirm({
                        title: '确认删除',
                        content: '永久删除该卡片吗？',
                        okText: '删除',
                        class: 'my-custom-confirm-sk',
                      });
                    } catch (error) {
                      return;
                    }
                    endPoint = '/canvasCard/deleteQuoteDemonstrationCard';
                  } else {
                    const isEmptyDescription = this.cards.find(
                      (card) => card.type === 'description'
                    ).isEmptyDescription;
                    if (isEmptyDescription) {
                      try {
                        await confirm({
                          title: '确认删除',
                          content: '删除卡片同时也会删除该组,删除该卡片吗？',
                          okText: '删除',
                          class: 'my-custom-confirm-sk',
                        });
                      } catch (error) {
                        return;
                      }
                      this.$emit('deleteGroup');
                      return;
                    } else {
                      try {
                        await confirm({
                          title: '确认删除',
                          content: '永久删除该卡片吗？',
                          okText: '删除',
                          class: 'my-custom-confirm-sk',
                        });
                      } catch (error) {
                        return;
                      }
                      endPoint = getDeleteEndPointByType(cardType);
                    }
                  }
                } else {
                  try {
                    await confirm({
                      title: '确认删除',
                      content: '删除卡片同时也会删除该组,删除该卡片吗？',
                      okText: '删除',
                      class: 'my-custom-confirm-sk',
                    });
                  } catch (error) {
                    return;
                  }
                  this.$emit('deleteGroup');
                  return;
                }
              } else {
                const hasPlaceholderCard = Boolean(
                  this.cards.find(
                    (card) => card.type === 'descriptionPlaceholder'
                  )
                );
                if (this.cards.length > 2) {
                  try {
                    await confirm({
                      title: '确认删除',
                      content: '永久删除该卡片吗？',
                      okText: '删除',
                      class: 'my-custom-confirm-sk',
                    });
                  } catch (error) {
                    return;
                  }
                  endPoint = getDeleteEndPointByType(cardType);
                } else if (this.cards.length === 2 && !hasPlaceholderCard) {
                  try {
                    await confirm({
                      title: '确认删除',
                      content: '永久删除该卡片吗？',
                      okText: '删除',
                      class: 'my-custom-confirm-sk',
                    });
                  } catch (error) {
                    return;
                  }
                  endPoint = getDeleteEndPointByType(cardType);
                } else {
                  try {
                    await confirm({
                      title: '确认删除',
                      content: '删除卡片同时也会删除该组,删除该卡片吗？',
                      okText: '删除',
                      class: 'my-custom-confirm-sk',
                    });
                  } catch (error) {
                    return;
                  }
                  this.$emit('deleteGroup');
                  return;
                }
              }
            }
            this.cardDeleteStatus = 'pending';
            const hide = message.loading('删除卡片...', 0);
            try {
              let response;
              this.lockOperation();
              try {
                response = await client.post(endPoint, {
                  cardId,
                  groupId: this.groupId,
                });
              } catch {
                throw {globalHandled: true};
              }
              if (response.status === 200 && response.data.code === 0) {
                this.cardDeleteStatus = 'resolved';
                const isDeleteQuotedDescriptionCard =
                  endPoint === '/canvasCard/deleteQuoteDemonstrationCard';
                if (isDeleteQuotedDescriptionCard) {
                  this.$emit('deleteQuotedDescriptionCard', cardId);
                } else {
                  this.$emit('deleteCard', cardId);
                }
              } else {
                this.cardDeleteStatus = 'rejected';
                message.warn(`删除卡片失败，${response.data.mesg}`);
              }
            } catch (error) {
              warning(
                false,
                `<Capsule>:(handleDragEnd):error catched ${error}`
              );
              this.cardDeleteStatus = 'rejected';
              if (error.globalHandled !== true) {
                message.warn('删除卡片失败');
              }
            } finally {
              hide();
              this.unlockOperation();
            }
          });
        } else {
          if (customEvent.oldIndex === customEvent.newIndex) return false;
          if (
            this.reorderingCardsStatus === 'pending' ||
            this.operationLocked
          ) {
            this.$emit('resetCards');
            return false;
          }
          this.reorderingCardsStatus = 'pending';
          this.lockOperation();
          const hide = message.loading('同步卡片排序...', 0);
          const groupId = this.groupId;
          const cardId = this.cards[customEvent.newIndex].id;
          const cardType = this.cards[customEvent.newIndex].type;
          // 卡片移动的起始和结束的下标要考虑到点位数据是不是存在的情况
          const startOrderNum =
            this.hasDescriptionPlaceholder && cardType === 'application'
              ? customEvent.oldIndex - 1
              : customEvent.oldIndex;
          const endOrderNum =
            this.hasDescriptionPlaceholder && cardType === 'application'
              ? customEvent.newIndex - 1
              : customEvent.newIndex;
          client
            .post('/canvasCard/moveCard', {
              groupId,
              cardId,
              startOrderNum,
              endOrderNum,
            })
            .then((response) => {
              if (response.status === 200 && response.data.code === 0) {
                this.reorderingCardsStatus = 'resolved';
              } else {
                this.reorderingCardsStatus = 'rejected';
                this.$emit('resetCards');
                message.warn(`卡片排序同步失败，${response.data.mesg}`);
              }
            })
            .catch((error) => {
              this.reorderingCardsStatus = 'rejected';
              this.$emit('resetCards');
              warning(
                false,
                `<Capsule>:(handleDragEnd):catch error in api call: ${error}`
              );
            })
            .finally(() => {
              hide();
              this.unlockOperation();
            });
        }
        function getDeleteEndPointByType(type) {
          switch (type) {
            case 'application':
              return '/canvasCard/deleteApplicationCard';
            case 'description':
              return '/canvasCard/deleteDemonstrationCard';
            case 'introduction':
              return '/canvasCard/deleteActivationCard';
            default:
              warning(false, `<Capsule>:(handleDragEnd):未知的卡片类型`);
              throw new Error('未知的卡片类型');
          }
        }
      },
      handleEditCard(cardType, cardId) {
        if (this.operationLocked) return;
        this.editCardType = cardType;
        this.editCardId = cardId;
        this.mode = 'edit';
        this.shouldShowDialog = true;
      },
      handlePreviewCard(cardType, cardId) {
        this.editCardType = cardType;
        this.editCardId = cardId;
        this.mode = 'preview';
        this.shouldShowDialog = true;
      },
      checkMove(event) {
        const {draggedContext, relatedContext} = event;
        const draggedCardType = draggedContext?.element?.type;
        const targetCardType = relatedContext?.element?.type;
        warning(
          Boolean(draggedCardType && targetCardType),
          `<Capsule>:checkMove:can't find draggedCardType or targetCardType`
        );
        if (
          ['description', 'descriptionPlaceholder'].includes(draggedCardType)
        ) {
          return false;
        } else if (draggedCardType === 'introduction') {
          return targetCardType === 'introduction';
        } else {
          return targetCardType === 'application';
        }
      },
      handleClickLeftButton(cardId, cardType, cardIndex) {
        if (this.operationLocked) {
          return;
        }
        if (cardType === 'description') {
          this.editCardType = 'introduction';
        } else if (cardType === 'introduction') {
          this.editCardType = 'introduction';
        } else if (cardType === 'application') {
          this.editCardType = 'application';
        } else {
          throw new Error(`unkown cardType [${cardType}]`);
        }
        this.editCardId = '';
        this.mode = 'edit';
        this.suggestedPosition = [cardId, 'left'];
        this.suggestedIndex = cardIndex;
        this.shouldShowDialog = true;
      },
      handleClickRightButton(cardId, cardType, cardIndex) {
        if (this.operationLocked) {
          return;
        }
        if (cardType === 'description') {
          this.editCardType = 'application';
        } else if (cardType === 'introduction') {
          this.editCardType = 'introduction';
        } else if (cardType === 'application') {
          this.editCardType = 'application';
        } else {
          throw new Error(`unkown cardType [${cardType}]`);
        }
        this.editCardId = '';
        this.mode = 'edit';
        this.suggestedPosition = [cardId, 'right'];
        this.suggestedIndex = cardIndex + 1;
        this.shouldShowDialog = true;
      },
      handleClickAddDescriptionCard(placeholderIndex) {
        if (this.operationLocked) return;
        this.mode = 'edit';
        this.editCardId = '';
        this.editCardType = 'description';
        this.suggestedIndex = placeholderIndex;
        this.shouldShowDialog = true;
      },
      handleDismiss() {
        this.shouldShowDialog = false;
      },
      handleSave(data) {
        this.shouldShowDialog = false;
        this.$emit('save', data, this.suggestedPosition);
      },
      handleUpdate(data) {
        this.shouldShowDialog = false;
        const originalCard = this.cards.find(
          (card) => card.id === this.editCardId
        );
        const processedData = {...data};
        if (originalCard.type === 'description' && originalCard.isQuoted) {
          processedData.isEmptyDescription = false;
        }
        this.$emit('update', processedData);
      },
      getCardComponent(type) {
        switch (type) {
          case 'description':
            return DescriptionCard;
          case 'introduction':
            return IntroductionCard;
          case 'application':
            return ApplicationCard;
          case 'descriptionPlaceholder':
            if (this.hadDescriptionBefore) {
              return DescriptionCard;
            } else {
              return DescriptionCardPlaceholder;
            }
          default:
            throw new Error('unkown type');
        }
      },
      getCardComponentPreviewProps(card, index, cards) {
        let protrudeLeftTimeLineLength = 0;
        let protrudeRightTimeLineLength = 0;
        if (cards.length === 1 || index === 0) {
          if (this.isFirstCapsule && !this.inEditMode) {
            if (this.hasSupplementCard) {
              protrudeLeftTimeLineLength = 26;
            } else {
              protrudeLeftTimeLineLength = 0;
            }
          } else {
            protrudeLeftTimeLineLength = 9.5;
          }
        } else {
          protrudeLeftTimeLineLength = 0.5;
        }

        if (cards.length === 1 || index === cards.length - 1) {
          if (this.isLastCapsule && !this.inEditMode) {
            if (this.hasSupplementCard) {
              protrudeRightTimeLineLength = 26;
            } else {
              protrudeRightTimeLineLength = 0;
            }
          } else {
            protrudeRightTimeLineLength = 9.5;
          }
        } else {
          protrudeRightTimeLineLength = 0.5;
        }

        const props = {
          originFormData: card.formData,
          isQuoted: card.isQuoted,
          mode: 'preview',
          small: true,
          interactable: true,
          showTimeLine: true,
          showLeftLink: index !== 0,
          showRightLink: index !== cards.length - 1,
          protrudeLeftTimeLineLength,
          protrudeRightTimeLineLength,
          rightTime: this.calculateCardRightTimeByIndex(index),
          leftTime: this.calculateCardLeftTimeByIndex(index),
          showLeftThickScale: index === 0 && this.inEditMode ? true : false,
          showRightThickScale:
            index === cards.length - 1
              ? this.inEditMode
                ? true
                : this.isAlmostNeedScroll
                ? false
                : true
              : false,
        };
        const totalValidCardCount = this.cards.reduce(
          (acc, cur) => acc + (cur.type === 'descriptionPlaceholder' ? 0 : 1),
          0
        );
        if (this.inValidEditMode && totalValidCardCount < 10) {
          switch (card.type) {
            case 'description':
              props.leftButtonTooltip = '创建激活卡';
              props.rightButtonTooltip = '创建应用卡';
              break;
            case 'introduction':
              props.leftButtonTooltip = '创建激活卡';
              props.rightButtonTooltip = '创建激活卡';
              break;
            case 'application':
              props.leftButtonTooltip = '创建应用卡';
              props.rightButtonTooltip = '创建应用卡';
              break;
            case 'descriptionPlaceholder':
              break;
            default:
              throw new Error('unkown type');
          }
        }
        return props;
      },
      handleClickDialogMask() {
        if (this.mode === 'edit') {
          return;
        }
        this.shouldShowDialog = false;
      },
      handleAssociate(data) {
        this.shouldShowDialog = false;
        this.$emit('associate', data);
      },
      calculateCardLeftTimeByIndex(currentIndex) {
        if (currentIndex === 0) {
          return this.prevGroupTimeCost;
        } else {
          let timeCost = this.prevGroupTimeCost;
          for (const [cardIndex, card] of this.cards.entries()) {
            if (cardIndex >= currentIndex) break;
            timeCost += card.timeCost || 0;
          }
          return timeCost;
        }
      },
      calculateCardRightTimeByIndex(currentIndex) {
        if (
          this.isLastCapsule &&
          currentIndex === this.cards.length - 1 &&
          this.isAlmostNeedScroll &&
          !this.inEditMode
        ) {
          return undefined;
        }
        let timeCost = this.prevGroupTimeCost;
        for (const [cardIndex, card] of this.cards.entries()) {
          if (cardIndex > currentIndex) break;
          timeCost += card.timeCost || 0;
        }
        return timeCost;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .capsule-container {
    height: 100%;
    padding-top: 54px;
    position: relative;
    border-radius: 8px;
    flex-shrink: 0;
    transition: border linear 0.2s;
    border: dashed 1px #8880;

    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .drag-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 54px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.movable:hover {
        cursor: move;
      }

      .origin-author {
        color: #888;
        font-size: 12px;
        text-align: center;
        span {
        }
      }
    }

    &:hover {
      border: dashed 1px #888;
    }

    .add-description-button {
      position: absolute;
      top: calc(50% + 13px);
      left: 50%;
      transform: translate(-50%, -50%);

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
            color: #14a2c9;
          }
        }
      }
    }
    .draggable {
      width: 100%;
      height: 100%;
    }
    .cards-container {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;

      & > * {
        padding: 0 0.5px;
      }
    }
  }
</style>

<style scoped>
  /deep/ .custom-dialog .ant-modal-content {
    border-radius: 28px;
  }

  /deep/ .flip-list-move {
    transition: transform 0.5s;
  }
</style>
