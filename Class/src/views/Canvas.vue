<template>
  <div
    class="page-container"
    :style="{paddingBottom: inValidEditMode ? '80px' : '0'}"
  >
    <Navigation :style="navigationStyle" />
    <div
      v-if="classInfoStatus === 'resolved'"
      class="class-info-loading-success-wrapper"
    >
      <CanvasHeader
        :classId="classId"
        @changeClassName="
          isClassNameChangedByUser = true;
          handleChangeClassName($event);
        "
        :className="className"
      />
      <div class="preserve-vertical-line">
        <CanvasSectionBlock
          @addMainTask="handleAddMainTask"
          @previewMainTask="handlePreviewCard('mainTask')"
          @editMainTask="handleEditCard('mainTask')"
          :mainTask="mainTask"
          :classId="classId"
          :subTaskCount="subTasks.length"
          :timeCostSum="calculatePrevSubtaskTimeCost(subTasks.length)"
        />
        <div class="subtask-container">
          <draggable
            class="subtasks"
            :list="subTasks"
            :animation="200"
            :draggable="isSubTaskCardDragging ? '' : '.subtask'"
            :disabled="!inValidEditMode"
            direction="vertical"
            :setData="handleSetData"
            @start="handleSubTaskDragStart"
            @end="handleSubTaskDragEnd"
          >
            <transition-group
              style="display: block"
              type="transition"
              :name="!isSubTaskDragging ? 'flip-list' : null"
            >
              <div
                class="subtask"
                v-for="(subTask, index) of subTasks"
                :key="subTask.id"
              >
                <h6 class="subtask-title">
                  子任务({{
                    subTask.subTask
                      ? getDisplayedSubTaskName(subTask.subTask.formData.name)
                      : '任务中的应用 ' + (index + 1)
                  }}) : {{ calculateSpecificSubTaskTimeCost(index) }}min
                </h6>
                <CanvasCapsuleGroup
                  :capsuleGroup="subTask.capsuleGroup"
                  :inEditMode="subTask.inEditMode"
                  :hasSubTaskCard="Boolean(subTask.subTask)"
                  :subTaskId="subTask.id"
                  :prevSubtaskTimeCost="calculatePrevSubtaskTimeCost(index)"
                  @save="(...props) => handleSaveCard(subTask.id, ...props)"
                  @update="(...props) => handleUpdateCard(subTask.id, ...props)"
                  @deleteCard="
                    (...props) => handleDeleteCard(subTask.id, ...props)
                  "
                  @deleteQuotedDescriptionCard="
                    (...props) =>
                      handleDeleteQuotedDescriptionCard(subTask.id, ...props)
                  "
                  @deleteGroup="handleDeleteGroup(subTask.id, $event)"
                  @toggleInEditMode="handleToggleInEditMode(subTask.id, $event)"
                  @capsuleGroupDragStart="
                    handleCapsuleGroupDragStart(subTask.id)
                  "
                  @resetCapsuleGroup="handleResetCapsuleGroup(subTask.id)"
                  @cardDragStart="handleCardDragStart(subTask.id, $event)"
                  @resetCards="handleResetCards(subTask.id, $event)"
                  @associate="
                    (...props) => handleAssociate(subTask.id, ...props)
                  "
                />
                <AddCardButton
                  :style="subTaskStyle"
                  @click="handleAddSubTask(subTask.id)"
                  v-if="inValidEditMode && subTask.subTask == null"
                >
                  <div class="add-card-button__content">
                    <img src="./canvas/assets/add-subtask-card.png" alt="" />
                    <p>创建<span>子任务</span></p>
                  </div>
                </AddCardButton>
                <SubTaskCard
                  v-else-if="subTask.subTask != null"
                  :style="subTaskStyle"
                  mode="preview"
                  :small="true"
                  :interactable="true"
                  :showTimeLine="true"
                  :dragStart="
                    (event) =>
                      handleSubTaskCardDragStart(
                        subTask.id,
                        subTask.subTask.id,
                        event
                      )
                  "
                  :originFormData="subTask.subTask.formData"
                  :leftButtonTooltip="
                    inValidEditMode ? '创建知识点胶囊' : undefined
                  "
                  :dragEnd="handleSubTaskCardDragEnd"
                  :showRightFlag="true"
                  :protrudeLeftTimeLineLength="10"
                  :protrudeRightTimeLineLength="10"
                  :scaleNumber="12"
                  :leftTime="
                    calculatePrevSubtaskTimeCost(index + 1) -
                      subTask.subTask.timeCost
                  "
                  :rightTime="calculatePrevSubtaskTimeCost(index + 1)"
                  :showLeftThickScale="true"
                  :showRightThickScale="true"
                  @clickLeftButton="handleClickLeftButton(subTask.id)"
                  @click="
                    inValidEditMode
                      ? handleEditCard('subTask', subTask.id)
                      : undefined
                  "
                  @dblclick="handlePreviewCard('subTask', subTask.id)"
                />
                <span class="time-unit">(单位:min)</span>
              </div>
            </transition-group>
          </draggable>
          <div
            v-if="inValidEditMode"
            key="createNewSubTask"
            class="add-capsule-button"
            @click="handleCreateSubTask"
          >
            <AntIcon type="plus" />
            增加子任务
          </div>
        </div>
      </div>
      <CanvasFooter v-if="inValidEditMode">
        <div class="footer__left"></div>
        <div class="footer__middle">
          <img
            class="icon"
            v-if="isAnyThingDragEnterDelete"
            src="./canvas/assets/bin-animate.gif"
            alt="一个打开的垃圾箱"
          />
          <img
            class="icon"
            v-else
            src="./canvas/assets/bin.png"
            alt="一个垃圾箱"
          />
          <span>拖拽到红色框内即可删除哦~</span>
          <div
            class="mask"
            data-delete-area
            @dragenter="handleDeleteDragEnter"
            @dragleave="handleDeleteDragLeave"
            @dragover="handleDeleteDragOver"
            @drop="handleDeleteDrop"
          />
        </div>
        <div class="footer__right">
          <button class="publish" @click="handlePublish">
            <AntIcon
              v-if="publishStatus === 'pending'"
              class="icon"
              type="loading"
            />
            <svg
              v-else
              t="1606876399656"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2232"
            >
              <path
                d="M864.128 825.664L448.32 693.12l415.808-495.936-544.448 495.936L0 561.6 1024 0l-159.872 825.664zM448.32 1024v-231.808l128.512 65.728L448.32 1024z"
                p-id="2233"
              ></path>
            </svg>
            发布
          </button>
        </div>
      </CanvasFooter>
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
          :mode="mode"
          v-bind="getCardComponentProps(editCardType, editSubTaskId)"
          @dismiss="handleDismiss"
          @update="handleUpdate"
        />
      </AntModal>
    </div>
    <div
      v-if="classInfoStatus === 'pending'"
      class="class-info-loading-wrapper"
    >
      <AntSpin size="large" />
    </div>
    <div
      v-if="classInfoStatus === 'rejected'"
      class="class-info-loading-failure-wrapper"
    >
      <AntResult status="500" title="500" sub-title="服务器出错啦！">
        <template slot="extra">
          <AntButton
            type="primary"
            @click="fetchClassInfo"
            :disabled="classInfoStatus === 'pending'"
            :loading="classInfoStatus === 'pending'"
          >
            重新加载
          </AntButton>
        </template>
      </AntResult>
    </div>
  </div>
</template>

<script>
  import {Button, Modal, Icon, message, notification, Spin, Result} from 'ant-design-vue';
  import draggable from 'vuedraggable';
  import warning from 'warning';
  import client from '@/configs/request';
  import {createNamespacedHelpers} from 'vuex';

  import Navigation from '@/components/Navigation';
  import Header from './canvas/Header';
  import SectionBlock from './canvas/SectionBlock';
  import CapsuleGroup from './canvas/CapsuleGroup';
  import Footer from './canvas/Footer';
  import AddCardButton from '../components/AddCardButton';
  import MainTaskCard from '../components/MainTaskCard';
  import SubTaskCard from '../components/SubTaskCard';
  import confirm from '@utils/confirm';
  import {CANVAS_MUTATIONS} from '@/store/modules/canvas';

  const {
    mapActions: canvasMapActions,
    mapState: canvasMapState,
    mapMutations: canvasMapMutations,
  } = createNamespacedHelpers('canvas');

  export default {
    name: 'Canvas',
    components: {
      Navigation,
      CanvasSectionBlock: SectionBlock,
      CanvasCapsuleGroup: CapsuleGroup,
      CanvasHeader: Header,
      CanvasFooter: Footer,
      AntModal: Modal,
      AntButton: Button,
      AntIcon: Icon,
      AntSpin: Spin,
      AntResult: Result,
      AddCardButton,
      draggable,
      SubTaskCard,
    },
    data() {
      return {
        className: '',
        isClassNameChangedByUser: '',
        mainTask: null,
        subTasks: [],
        isSubTaskDragging: false,
        shouldShowDialog: false,
        editCardType: 'subTask',
        editSubTaskId: '',
        mode: 'edit',
        isSubTaskCardDragging: false,
        isAnyThingDragEnterDelete: false,
        addSubTaskStatus: 'idle',
        deleteSubTaskStatus: 'idle',
        reorderingSubTaskStatus: 'idle',
        createCapsuleStatus: 'idle',
        publishStatus: 'idle',
        resetStatus: 'idle',
        classInfoStatus: 'idle',
        unmounted: false,
      };
    },
    provide() {
      return {
        inValidEditMode: this.inValidEditMode,
      };
    },
    created() {
      this.fetchAllDictionary();
      if (this.classId) {
        this.fetchClassInfo();
      }
    },
    beforeRouteLeave(...props) {
      this.unmounted = true;
      const [,,next] = props;
      client.post('canvas/clearEmptyClass', {classId: Number(this.classId)})
      next();
    },
    computed: {
      ...canvasMapState(['operationLocked']),
      inValidEditMode() {
        return this.$route.fullPath.endsWith('edit');
      },
      classId() {
        return this.$route.params.classId;
      },
      navigationStyle() {
        return {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
        };
      },
      subTaskStyle() {
        return {
          position: 'absolute',
          top: '65px',
          right: '103px',
          zIndex: '3',
        };
      },
    },
    watch: {
      subTasks: {
        handler() {
          this.updateMainTaskCardInfo();
        },
        deep: true
      },
      mainTask() {
        this.updateMainTaskCardInfo();
      }
    },
    methods: {
      ...canvasMapMutations({
        lockOperation: CANVAS_MUTATIONS.LOCK_OPERATION,
        unlockOperation: CANVAS_MUTATIONS.UNLOCK_OPERATION
      }),
      ...canvasMapActions(['fetchAllDictionary']),
      handleSetData(dataTransfer, dragEl) {
        dataTransfer.setData("Text", '');
      },
      getDisplayedSubTaskName(subTaskName) {
        if (subTaskName) {
          if (subTaskName.length > 25) {
            return subTaskName.substr(0, 26) + '...'
          } else {
            return subTaskName;
          }
        } else {
          return ''
        }
      },
      updateMainTaskCardInfo() {
        if (this.mainTask) {
          const subTaskCount = this.subTasks.length;
          const totalTimeCost = this.calculatePrevSubtaskTimeCost(this.subTasks.length);
          this.mainTask.formData.timeContent = totalTimeCost;
          this.mainTask.formData.numContent = subTaskCount;
        }
      },
      async fetchClassInfo() {
        try {
          this.classInfoStatus = 'pending';
          let response;
          try {
            response = await client.post('/canvas/getClassDetail', {classId: this.classId});
          } catch {
            throw {globalHandled: true}
          }
          if (response.status === 200 && response.data.code === 0) {
            this.className = response.data.data.name;

            this.isClassNameChangedByUser = response.data.data.isRewrite !== 0;

            // 尝试赋值主任务卡数据，如果有就赋值
            const mainTaskInfo = response.data?.data?.maintask;
            if (mainTaskInfo) {
              this.mainTask = {
                id: mainTaskInfo.id,
                formData: {
                  id: mainTaskInfo.id,
                  name: mainTaskInfo.name,
                  criteria: mainTaskInfo.finalProduct,
                  scene: mainTaskInfo.designSight,
                },
                type: 'mainTask',
              };
            }

            // 尝试赋值子任务数据
            const originSubTasks = response.data?.data?.capsuleList;
            if (Array.isArray(originSubTasks)) {
              const sortedOriginSubTasks = [...originSubTasks].sort((a, b) => a.orderNum - b.orderNum);
              const subTasks = [];
              for (const originSubTask of sortedOriginSubTasks) {
                const subTask = {};
                subTask.id = originSubTask.id;

                // 尝试赋值子任务卡数据
                if (originSubTask.subtask) {
                  subTask.subTask = {
                    id: originSubTask.subtask.id,
                    type: 'subTask',
                    formData: {
                      id: originSubTask.subtask.id,
                      name: originSubTask.subtask.name,
                      requirement: originSubTask.subtask.specificRequirements,
                      teachingFormat: originSubTask.subtask.activityTypeId,
                      timeCost: originSubTask.subtask.dictionaryExcepttimeId,
                    },
                    timeCost: originSubTask.subtask.average,
                  };
                } else {
                  subTask.subTask = null;
                }

                // 尝试赋值胶囊组数据
                const capsuleGroup = [];
                if (Array.isArray(originSubTask.groupList)) {
                  const generateCardsFromOriginData = (originCards) => {
                    if (Array.isArray(originCards)) {
                      const sorttedCards = originCards.sort((a, b) => a.orderNum - b.orderNum);
                      const cards = [];
                      const processedCardType = [];
                      for (const [cardIndex, card] of sorttedCards.entries()) {
                        if (!this.checkCardPositionCorrectness(card, processedCardType)) {
                          throw '数据异常，请联系管理员';
                        }
                        cards.push({
                          id: card.id,
                          type: this.getCardType(card.cardType),
                          formData: this.getFormData(card),
                          timeCost: card.average,
                          isQuoted: card.isQuote !== 0,
                          isEmptyDescription: card.cardType === 2 ? (card.isEmpty !== 0 ? true : false) : undefined
                        });
                      }
                      if (cards.length === 0) {
                        cards.push({
                          id: 'descriptionPlaceholder',
                          type: 'descriptionPlaceholder',
                        });
                      } else {
                        const hasDescriptionCardYet = cards.find((card) => card.type === 'description');
                        // 如果没有讲解卡则要插入占位符数据
                        if (!hasDescriptionCardYet) {
                          const lastIntroductionCardIndex = cards.map((card) => card.type).lastIndexOf('introduction');
                          cards.splice(~lastIntroductionCardIndex ? lastIntroductionCardIndex + 1 : 0, 0, {
                            id: 'descriptionPlaceholder',
                            type: 'descriptionPlaceholder',
                          });
                        }
                      }
                      return cards;
                    } else {
                      return [];
                    }
                  };

                  const sortedGroups = [...originSubTask.groupList].sort((a, b) => a.orderNum - b.orderNum);
                  for (const originGroup of sortedGroups) {
                    const group = {};
                    group.id = originGroup.id;
                    group.cards = generateCardsFromOriginData(originGroup.cards);
                    group.originAuthor = originGroup.quoteCreateUserName;
                    group.isQuoted = originGroup.isQuote !== 0;
                    group.hadDescriptionBefore = originGroup.isCreateDemonstration !== 0;
                    // 如果这个课堂只有一子任务，一个空组，那么这个空组处于编辑状态
                    if (sortedOriginSubTasks.length === 1 && sortedGroups.length === 1 && group.cards.length === 1 && group.cards[0].type==="descriptionPlaceholder") {
                      group.inEditMode = true;
                    }
                    capsuleGroup.push(group);
                  }
                }
                subTask.capsuleGroup = capsuleGroup;
                subTasks.push(subTask);
              }
              this.subTasks = subTasks;
            }
            this.classInfoStatus = 'resolved';
          } else {
            this.classInfoStatus = 'rejected';
            message.warn(response.data.mesg);
            warning(false, `<Canvas>:(fetchClassInfo):${response.data.mesg}`);
          }
        } catch (error) {
          this.classInfoStatus = 'rejected';
          warning(false, `<Canvas>:(fetchClassInfo):捕获到异常 ${error}`);
          if (error.globalHandled !== true) {
            message.warn(error.toString());
          }
        }
      },
      checkCardPositionCorrectness(currentCard, proccessedCardType) {
        const biggestCardTypeThatAleadyProcessed = proccessedCardType.reduce((acc, cur) => (cur > acc ? cur : acc), 0);
        if (currentCard.cardType < biggestCardTypeThatAleadyProcessed) {
          return false;
        }
        proccessedCardType.push(currentCard.cardType);
        return true;
      },
      async handlePublish() {
        if (this.publishStatus === 'pending' || this.operationLocked) {
          return;
        }
        this.publishStatus = 'pending';
        const hide = message.loading('发布中...', 0)
        try {
          let response;
          this.lockOperation();
          try {
            response = await client.post('/canvas/publishClass', {
              classId: this.classId,
              duration: 30,
              subtaskNum: this.subTasks.length,
            });
          } catch {
            throw {globalHandled : true}
          }
          if ((response.status === 200) & (response.data.code === 0)) {
            this.publishStatus = 'resolved';
            this.$router.back();
          } else {
            this.publishStatus = 'rejected';
            message.warn(`发布失败，${response.data.mesg}`);
          }
        } catch (error) {
          this.publishStatus = 'rejected';
          warning(false, `<Canvas>:(handlePublish):catched error ${error}`);
          if (error.globalHandled !== true) {
            message.warn('内容发布失败');
          }
        } finally {
          hide();
          this.unlockOperation()
        }
      },
      async handleChangeClassName(newClassName) {
        if (this.operationLocked || this.unmounted) return
        const oldClassName = this.className;
        this.className = newClassName.trim();
        const hide = this.$message.loading('更新画布名称...', 0);
        try {
          let response;
          this.lockOperation();
          try {
            response = await client.post('/canvas/updateClass', {
              classId: Number.parseInt(this.classId),
              name: newClassName,
              duration: this.calculatePrevSubtaskTimeCost(this.subTasks.length),
              subtaskNum: this.subTasks.length,
              isRewrite: this.isClassNameChangedByUser ? 1 : 0
            });
          } catch {
            throw {globalHandled: true}
          }
          if (response.status !== 200 || response.data.code !== 0) {
            this.className = oldClassName;
            message.warn(`画布名称更新失败，${response.data.mesg}`);
          }
        } catch (error) {
          warning(false, `<Canvas>:(handleChangeClassName):捕获到错误${error}`);
          this.className = oldClassName;
          if (error.globalHandled !== true) {
            message.warn('画布名称更新失败');
          }
        } finally {
          hide();
          this.unlockOperation();
        }
      },
      handleResetCapsuleGroup(subTaskId) {
        this.['resetCapsuleGroup' + subTaskId]();
      },
      handleCapsuleGroupDragStart(subTaskId) {
        const matchedSubTask = this.subTasks.find((subTask) => subTask.id === subTaskId);
        warning(matchedSubTask, `<Canvas>:(handleCapsuleGroupDragStart):can't find matchedSubTask`);
        const capturedCapsuleGroup = [...matchedSubTask.capsuleGroup];
        this.['resetCapsuleGroup' + subTaskId] = () => {
          matchedSubTask.capsuleGroup = capturedCapsuleGroup;
        };
      },
      handleToggleInEditMode(subTaskId, groupId) {
        warning(subTaskId && groupId, `<Canvas>:(handleToggleInEditMode):missing one of these prop, subTaskId, groupId`);
        const matchedSubTask = this.subTasks.find((subTask) => subTask.id === subTaskId);
        warning(matchedSubTask, `<Canvas>:(handleToggleInEditMode):can't find matchedSubTask`);
        let newCapsuleGroup = [...matchedSubTask.capsuleGroup].map(group => ({
          ...group,
          inEditMode: group.id === groupId ? group.inEditMode = !group.inEditMode : false
        }))
        matchedSubTask.capsuleGroup = newCapsuleGroup
      },
      handleDeleteDragEnter(event) {
        event.preventDefault();
        this.isAnyThingDragEnterDelete = true;
      },
      handleDeleteDragLeave() {
        this.isAnyThingDragEnterDelete = false;
      },
      handleSubTaskCardDragEnd() {
        this.isSubTaskCardDragging = false;
      },
      handleSubTaskCardDragStart(subTaskId, subTaskCardId, event) {
        event.stopPropagation();
        this.isSubTaskCardDragging = true;
        event.dataTransfer.setData(
          'text/card-info',
          JSON.stringify({
            shouldHandleManully: true,
            draggedCardType: 'subTask',
            subTaskId,
            subTaskCardId,
          })
        );
      },
      handleSubTaskDragStart(event) {
        this.isSubTaskDragging = true;
        // 用户拖动子任务到删除区域，但是依旧会出发子任务数组本地顺序的更改，但是由于子任务被拖拽到删除区域内被放开，所以不会触发子任务的重新排序接口，
        // 这里需要提供一个还原子任务顺序的函数
        const capturedOriginSubTask = [...this.subTasks];
        this.resetSubTaskOrder = () => {
          this.subTasks = capturedOriginSubTask;
        };
        if (this.isSubTaskCardDragging) {
          // TODO preventDefault 不能阻止子任务块被drag，子任务元素上的 draggble 属性依然为 true，可以删吗
          event.preventDefault();
        }
      },
      async handleSubTaskDragEnd(customEvent) {
        console.log(customEvent)
        this.isSubTaskDragging = false;
        if (customEvent?.originalEvent.target.closest('[data-delete-area]') && !this.isSubTaskCardDragging) {
          this.resetSubTaskOrder();
          if (this.deleteSubTaskStatus === 'pending' || this.reorderingSubTaskStatus === 'pending' || this.operationLocked) return;
          try {
            await confirm({
              title: '确认删除',
              content: '永久删除该子任务吗？',
              okText: '删除',
              class: 'my-custom-confirm-sk'
            });
          } catch (error) {
            return;
          }
          this.deleteSubTaskStatus = 'pending';
          const hide = message.loading('删除子任务...', 0)
          try {
            const matchedSubTaskId = this.subTasks[customEvent.oldIndex].id;
            let response;
            this.lockOperation();
            try {
              response = await client.post('/canvas/deleteCapsule', {
                capsuleId: matchedSubTaskId,
              });
            } catch {
              throw {globalHandled: true}
            }
            if (response.status === 200 && response.data.code === 0) {
              this.deleteSubTaskStatus = 'resolved';
              this.subTasks = this.subTasks.filter((subTask) => subTask.id !== matchedSubTaskId);
            } else {
              this.deleteSubTaskStatus = 'rejected';
              message.warn(`子任务删除失败，${response.data.mesg}`);
            }
          } catch (err) {
            warning(false, `<Canvas>:(handleSubTaskDragEnd):error catched ${err}`);
            this.deleteSubTaskStatus = 'rejected';
            if (err.globalHandled !== true) {
              message.warn('子任务删除失败');
            }
          } finally {
            hide();
            this.unlockOperation()
          }
        } else {
          if (customEvent.newIndex === customEvent.oldIndex) return false;
          if (this.reorderingSubTaskStatus === 'pending' || this.operationLocked) {
            this.resetSubTaskOrder();
            return false;
          }
          this.reorderingSubTaskStatus = 'pending';
          this.lockOperation();
          const hide = message.loading('同步子任务排序...', 0);
          client
            .post('/canvas/moveCapsule', {
              capsuleId: this.subTasks[customEvent.newIndex].id,
              classId: Number.parseInt(this.classId),
              startOrderNum: customEvent.oldIndex,
              endOrderNum: customEvent.newIndex,
            })
            .then((response) => {
              if (response.status === 200 && response.data.code === 0) {
                this.reorderingSubTaskStatus = 'resolved';
              } else {
                this.reorderingSubTaskStatus = 'rejected';
                this.resetSubTaskOrder();
                message.warn(`子任务排序同步失败，${response.data.mesg}`);
              }
            })
            .catch((error) => {
              this.reorderingSubTaskStatus = 'rejected';
              this.resetSubTaskOrder();
              warning(false, `<Canvas>:(handleSubTaskDragEnd):catch error in api call: ${error}`);
            }).finally(() => {
              hide();
              this.unlockOperation()
            });
        }
      },
      handleDeleteGroup(subTaskId, groupId) {
        warning(subTaskId && groupId, `<Canvas>:(handleDeleteGroup):missing one of these prop, subTaskId, groupId`);
        const matchedSubTask = this.subTasks.find((subTask) => subTask.id === subTaskId);
        warning(matchedSubTask, `<Canvas>:(handleDeleteGroup):can't find matchedSubTask`);
        const matchedGroupIndex = matchedSubTask.capsuleGroup.findIndex((group) => group.id === groupId);
        warning(matchedGroupIndex != null, `<Canvas>:(handleDeleteGroup):can't find matchedGroupIndex`);
        matchedSubTask.capsuleGroup.splice(matchedGroupIndex, 1);
      },
      handleDeleteQuotedDescriptionCard(subTaskId, groupId, cardId) {
        warning(
          subTaskId && groupId && cardId,
          `<Canvas>:(handleDeleteQuotedDescriptionCard):missing one of these prop, subTaskId, groupId, cardId`
        );
        const matchedSubTask = this.subTasks.find((subTask) => subTask.id === subTaskId);
        warning(matchedSubTask, `<Canvas>:(handleDeleteQuotedDescriptionCard):can't find matchedSubTask`);
        const matchedGroup = matchedSubTask.capsuleGroup.find((group) => group.id === groupId);
        warning(matchedGroup, `<Canvas>:(handleDeleteQuotedDescriptionCard):can't find matchedGroup`);
        const matchedDescriptionCard = matchedGroup.cards.find((card) => card.id === cardId);
        warning(matchedDescriptionCard != null, `<Canvas>:(handleDeleteQuotedDescriptionCard):can't find matchedDescriptionCard`);
        matchedDescriptionCard.isEmptyDescription = true;
        matchedDescriptionCard.isEmptyDescription = true;
        matchedDescriptionCard.formData = {...matchedDescriptionCard.formData, attachment: [], description: '', how: '', termExplanation: '', timeCost: ''};
      },
      handleDeleteCard(subTaskId, groupId, cardId) {
        warning(
          subTaskId && groupId && cardId,
          `<Canvas>:(handleDeleteCard):missing one of these prop, subTaskId, groupId, cardId`
        );
        const matchedSubTask = this.subTasks.find((subTask) => subTask.id === subTaskId);
        warning(matchedSubTask, `<Canvas>:(handleDeleteCard):can't find matchedSubTask`);
        const matchedGroup = matchedSubTask.capsuleGroup.find((group) => group.id === groupId);
        warning(matchedGroup, `<Canvas>:(handleDeleteCard):can't find matchedGroup`);
        const matchedCardIndex = matchedGroup.cards.findIndex((card) => card.id === cardId);
        warning(matchedCardIndex != null, `<Canvas>:(handleDeleteCard):can't find matchedCardIndex`);
        const {type} = matchedGroup.cards[matchedCardIndex];
        if (matchedGroup.cards.length > 0) {
          // 根据下标删除卡片
          matchedGroup.cards.splice(matchedCardIndex, 1);
          // 如果删除的是讲解卡，要添加展位数据
          if (type === 'description') {
            matchedGroup.cards.splice(matchedCardIndex, 0, {
              id: 'descriptionPlaceholder',
              type: 'descriptionPlaceholder',
            });
          }
        } else {
          warning(false, `卡片组已经为空`);
        }
      },
      handleResetCards(subTaskId, groupId) {
        this.['resetCards'+ subTaskId + groupId]();
      },
      handleCardDragStart(subTaskId, groupId) {
        const matchedGroup = this.subTasks
          .find((subTask) => subTask.id === subTaskId)
          .capsuleGroup.find((group) => group.id === groupId);
        warning(matchedGroup, `<Canvas>:(handleCardDragStart):can't find matchedGroup`);
        const capturedCards = [...matchedGroup.cards];
        this.['resetCards' + subTaskId + groupId] = () => {
          matchedGroup.cards = capturedCards;
        };
      },
      handleDeleteDragOver(event) {
        event.preventDefault();
      },
      async handleDeleteDrop(event) {
        this.isAnyThingDragEnterDelete = false;
        event.preventDefault();
        const data = event.dataTransfer.getData('text/card-info');
        if (data) {
          let parsedData;
          try {
            parsedData = JSON.parse(data);
          } catch (error) {
            warning(false, '<Canvas>:(handleDeleteDrop):Json.parse error');
            return;
          }
          if (parsedData.shouldHandleManully === true) {
            if (parsedData.draggedCardType === 'mainTask') {
              try {
                await confirm({
                  title: '确认删除',
                  content: '永久删除该主任务卡吗？',
                  okText: '删除',
                  class: 'my-custom-confirm-sk'
                });
              } catch (error) {
                return;
              }
              const hide = message.loading('删除主任务卡...', 0)
              const isSuccess = await this.handleDeleteMainTaskCard();
              hide();
              if (isSuccess === true) {
                this.mainTask = null;
              } else if (isSuccess === false){
                message.warn('总任务卡删除失败');
              }
            } else if (parsedData.draggedCardType === 'subTask') {
              try {
                await confirm({
                  title: '确认删除',
                  content: '永久删除该子任务卡吗？',
                  okText: '删除',
                  class: 'my-custom-confirm-sk'
                });
              } catch (error) {
                return;
              }
              const matchedSubTask = this.subTasks.find((subTask) => subTask.id === parsedData.subTaskId);
              warning(matchedSubTask, `<Canvas>:(handleDeleteDrop):can't find matchedSubTask`);
              const hide = message.loading('删除子任务卡...', 0)
              const isSuccess = await this.handleDeleteSubtaskCard(parsedData.subTaskCardId);
              hide()
              if (isSuccess === true) {
                message.success('子任务卡删除成功');
                matchedSubTask.subTask = null;
              } else if (isSuccess === false){
                message.warn('子任务卡删除失败');
              }
            }
          }
        }
      },
      async handleDeleteSubtaskCard(subTaskCardId) {
        if (this.operationLocked) return;
        try {
          this.lockOperation()
          const response = await client.post('/canvas/deleteSubtask', {
            id: subTaskCardId,
          });
          if (response.status === 200 && response.data.code === 0) {
            return Promise.resolve(true);
          } else {
            return Promise.resolve(false);
          }
        } catch (error) {
          warning(false, `<Canvas>:(handleDeleteSubTaskCard):catched error: ${error}`);
          return Promise.resolve(undefined);
        } finally {
          this.unlockOperation();
        }
      },
      async handleDeleteMainTaskCard() {
        if (this.operationLocked) return;
        try {
          this.lockOperation();
          const response = await client.post('/canvas/deleteMainTask', {
            id: this.mainTask.id,
          });
          if (response.status === 200 && response.data.code === 0) {
            return Promise.resolve(true);
          } else {
            return Promise.resolve(false);
          }
        } catch (error) {
          warning(false, `<Canvas>:(handleDeleteMainTaskCard):catched error: ${error}`);
          return Promise.resolve(undefined);
        } finally {
          this.unlockOperation();
        }
      },
      handleAddMainTask() {
        this.mode = 'edit';
        this.editCardType = 'mainTask';
        this.shouldShowDialog = true;
      },
      async handleClickLeftButton(subTaskId) {
        warning(subTaskId, `<Canvas>:(handleClickLeftButton):missing subTaskId`);
        const matchedSubTask = this.subTasks.find((subTask) => subTask.id === subTaskId);
        warning(matchedSubTask, `<Canvas>:(handleClickLeftButton):can't find matchedSubTask`);
        // 移除之前胶囊的编辑状态
        matchedSubTask.capsuleGroup.forEach((group) => (group.inEditMode = false));
        if (this.createCapsuleStatus === 'pending' || this.operationLocked) return;
        this.createCapsuleStatus = 'pending';
        const hide = message.loading('创建胶囊...', 0);
        try {
          let response;
          this.lockOperation();
          try {
            response = await client.post('/canvas/createGroup', {
              capsuleId: subTaskId,
            });
          } catch {
            throw {globalHandled: true}
          }
          if (response.status === 200 && response.data.code === 0) {
            this.createCapsuleStatus = 'resolved';
            const newCapsuleId = response.data?.data?.groups[0]?.id;
            if (!newCapsuleId) throw new Error(`无法获取新的胶囊`);
            matchedSubTask.capsuleGroup.push({
              id: newCapsuleId,
              cards: [{id: 'descriptionPlaceholder', type: 'descriptionPlaceholder'}],
              inEditMode: true,
            });
          } else {
            this.createCapsuleStatus = 'rejected';
            message.warn(`创建胶囊失败，${response.data.mesg}`);
          }
        } catch (error) {
          this.createCapsuleStatus = 'rejected';
          warning(false, `<Canvas>:(handleClickLeftButton):catched error ${error}`);
          if (error.globalHandled !== true) {
            message.warn(`创建胶囊失败`);
          }
        } finally {
          hide();
          this.unlockOperation()
        }
      },
      handlePreviewCard(cardType, subTaskId) {
        warning(
          cardType === 'subTask' ? subTaskId != null : true,
          `<Canvas>:(handlePreviewCard):subTaskId is required if cardType is 'subTask'`
        );
        if (subTaskId) {
          this.editSubTaskId = subTaskId;
        }
        this.editCardType = cardType;
        this.mode = 'preview';
        this.shouldShowDialog = true;
      },
      handleEditCard(cardType, subTaskId) {
        warning(
          cardType === 'subTask' ? subTaskId != null : true,
          `<Canvas>:(handleEditCard):subTaskId is required if cardType is 'subTask'`
        );
        if (subTaskId) {
          this.editSubTaskId = subTaskId;
        }
        this.editCardType = cardType;
        this.mode = 'edit';
        this.shouldShowDialog = true;
      },
      handleAddSubTask(subTaskId) {
        this.editSubTaskId = subTaskId;
        this.mode = 'edit';
        this.editCardType = 'subTask';
        this.shouldShowDialog = true;
      },
      handleClickDialogMask() {
        if (this.mode === 'edit') {
          return;
        }
        this.shouldShowDialog = false;
      },
      getCardComponent(type) {
        switch (type) {
          case 'mainTask':
            return MainTaskCard;
          case 'subTask':
            return SubTaskCard;
          default:
            warning(false, `<Canvas>:getCardComponent:unknown type`);
        }
      },
      getCardComponentProps(type, subTaskId) {
        warning(
          type === 'subTask' ? subTaskId != null : true,
          `<Canvas>:(handleEditCard):subTaskId is required if cardType is 'subTask'`
        );
        switch (type) {
          case 'mainTask':
            return {
              originFormData: this.mainTask?.formData ?? null,
              classId: this.classId,
            };
          case 'subTask':
            return {
              classId: this.classId,
              subTaskId: subTaskId,
              originFormData: this.subTasks.find((subTask) => subTask.id === subTaskId)?.subTask?.formData ?? null,
            };
          default:
            warning(false, `<Canvas>:getCardComponent:unknown type`);
        }
      },
      handleDismiss() {
        this.shouldShowDialog = false;
      },
      handleUpdate(data) {
        this.shouldShowDialog = false;
        const {type} = data;
        warning(type, '<Canvas>:(handleUpdate):empty type');
        if (type === 'mainTask') {
          this.mainTask = data;
          if (!this.isClassNameChangedByUser) {
            this.handleChangeClassName(data.formData.name)
          }
        } else if (type === 'subTask') {
          const matchedSubTask = this.subTasks.find((subTask) => subTask.id === this.editSubTaskId);
          warning(matchedSubTask, `<Canvas>:(handleUpdate):can not find matchedSubTask`);
          matchedSubTask.subTask = data;
        } else {
          warning(false, `<Canvas>:(handleUpdate):unknown type ${type}`);
        }
      },
      async handleCreateSubTask() {
        if (this.addSubTaskStatus === 'pending' || this.operationLocked) return;
        this.addSubTaskStatus = 'pending';
        const hide = message.loading('创建子任务...', 0)
        try {
          let response;
          this.lockOperation();
          try {
            response = await client.post('/canvas/createCapsuleOnly', {
              classId: Number.parseInt(this.classId),
            });
          } catch {
            throw {globalHandled: true}
          }
          if (response.status === 200 && response.data.code === 0) {
            this.addSubTaskStatus = 'resolved';
            // TODO 这里可以写的更灵活一点
            this.subTasks.push({
              id: response.data.data.capsule.id,
              subTask: null,
              capsuleGroup: [
                {
                  id: response.data.data.capsule.groups[0].id,
                  cards: [{id: 'descriptionPlaceholder', type: 'descriptionPlaceholder'}],
                  inEditMode: true,
                },
              ],
            });
          } else {
            this.addSubTaskStatus = 'rejected';
            message.warn(`创建子任务失败，${response.data.mesg}`);
          }
        } catch (err) {
          warning(false, `<Canvas>:(handleCreateSubTask):error catched ${err}`);
          this.addSubTaskStatus = 'rejected';
          if (err.globalHandled !== true) {
            message.warn('创建子任务失败');
          }
        } finally {
          hide();
          this.unlockOperation();
        }
      },
      handleUpdateCard(subTaskId, groupId, data) {
        warning(subTaskId && groupId && data, '<Canvas> handleUpdateCard method missing props');
        const matchedSubTask = this.subTasks.find((subTask) => subTask.id === subTaskId);

        warning(matchedSubTask, `<Canvas> handleUpdate method can't find matchedSubtask`);

        const matchedGroup = matchedSubTask.capsuleGroup.find((group) => group.id === groupId);

        warning(matchedGroup, `<Canvas> handleUpdate method can't find matchedGroup`);

        const matchedCardIndex = matchedGroup.cards.findIndex((card) => card.id === data.id);
        warning(matchedGroup, `<Canvas> handleUpdate method can't find matchedCardIndex`);
        matchedGroup.cards.splice(matchedCardIndex, 1, data);
      },
      handleSaveCard(subTaskId, groupId, data, suggestedPosition) {
        warning(subTaskId && groupId && data && suggestedPosition, '<Canvas> handleSaveCard method missing props');
        const [referenceCardId, referenceCardSide] = suggestedPosition;
        const {type} = data;
        let referenceCardIndex;

        const matchedSubTask = this.subTasks.find((subTask) => subTask.id === subTaskId);

        warning(matchedSubTask, `<Canvas> handleSaveCard method can't find matchedSubtask`);

        const matchedGroup = matchedSubTask.capsuleGroup.find((group) => group.id === groupId);

        warning(matchedGroup, `<Canvas> handleSaveCard method can't find matchedGroup`);
        switch (type) {
          case 'description':
            // 如果添加的是讲解卡，要把占位数据删除
            const placeholderIndex = matchedGroup.cards.findIndex((card) => card.type === 'descriptionPlaceholder');
            matchedGroup.hadDescriptionBefore = true;
            matchedGroup.cards.splice(placeholderIndex, 1, data);
            break;
          case 'introduction':
          case 'application':
            referenceCardIndex = matchedGroup.cards.findIndex((card) => card.id === referenceCardId);
            if (referenceCardSide === 'left') {
              matchedGroup.cards.splice(referenceCardIndex, 0, data);
            } else if (referenceCardSide === 'right') {
              matchedGroup.cards.splice(referenceCardIndex + 1, 0, data);
            } else {
              warning(false, `unkown side when type is [${type}]`);
            }
            break;
          default:
            warning(false, `unknown type [${type}]`);
        }
      },
      handleAssociate(subTaskId, groupId, data) {
        try {
          const matchedGroup = this.subTasks
            .find((subTask) => subTask.id === subTaskId)
            .capsuleGroup.find((group) => group.id === groupId);
          if (!matchedGroup) {
            warning(false, `<Canvas>:(handleAssociate):找不到matchedGroup`);
          }
          const formatedCard = data.cardList
            .sort((a, b) => a.orderNum - b.orderNum)
            .map((originData) => {
              return {
                id: originData.id,
                type: this.getCardType(originData.cardType),
                formData: this.getFormData(originData),
                timeCost: originData.average,
                isQuoted: originData.isQuote !== 0
              };
            });
          matchedGroup.cards = formatedCard;
          matchedGroup.originAuthor = data.quoteCreateUserName;
          matchedGroup.isQuoted = data.isQuote !== 0;
        } catch (error) {
          warning(false, `<Canvas>:(handleAssociate):捕获到错误${error}`);
        }
      },
      getCardType(cardType) {
        switch (cardType) {
          case 1:
            return 'introduction';
          case 2:
            return 'description';
          case 3:
            return 'application';
          default:
            warning(false, `<Canvas>:(getCardType):unknown cardType ${cardType}`);
        }
      },
      getFormData(originData) {
        const {cardType} = originData;
        const formData = {id: originData.id};

        switch (cardType) {
          case 1:
            formData.introContent = originData.relatedKnowledge;
            formData.introFormat = originData.activationTypeId;
            formData.timeCost = originData.dictionaryExcepttimeId;
            formData.activityContent = originData.content;
            break;
          case 2:
            formData.knowledge = originData.knowledgePoint;
            formData.how = originData.demonstrationTypeid || '';
            formData.timeCost = originData.dictionaryExcepttimeId || '';
            formData.description = originData.displayCase || '';
            formData.termExplanation = originData.popularDescription || '';
            formData.attachment =
              originData?.files?.map((file) => ({
                id: file.id,
                status: 'resolved',
                fileName: file.fileName,
                url: file.url,
              })) ?? [];
            break;
          case 3:
            formData.how = originData.practiceId;
            formData.timeCost = originData.dictionaryExcepttimeId;
            formData.description = originData.content;
            break;
          default:
            warning(false, `<Canvas>:(fetchClassInfo):(getFormData):unknown cardType ${cardType}`);
        }

        return formData;
      },
      calculatePrevSubtaskTimeCost(currentIndex) {
        let timeCost = 0;
        if (this.mainTask) {
          timeCost += 3;
        }
        for (const [subTaskIndex, subTask] of this.subTasks.entries()) {
          if (subTaskIndex >= currentIndex) break;
          let subTaskTimeCost = 0;
          if (subTask.subTask) {
            subTaskTimeCost += 1.5;
            subTaskTimeCost += subTask.subTask.timeCost ?? 0;
          }
          const allCardTimeCostWithinSubTask = subTask.capsuleGroup.reduce((accGroup, curGroup) => {
            return (
              accGroup +
              curGroup.cards.reduce((accCard, curCard) => {
                return accCard + (curCard.timeCost ?? 0);
              }, 0)
            );
          }, 0);
          subTaskTimeCost += allCardTimeCostWithinSubTask;
          timeCost += subTaskTimeCost;
        }
        return timeCost;
      },
      calculateSpecificSubTaskTimeCost(currentIndex) {
        let timeCost = 0;
        const subTask = this.subTasks[currentIndex]
        if (subTask.subTask) {
          timeCost += 1.5;
          timeCost += subTask.subTask.timeCost ?? 0;
        }
        const allCardTimeCostWithinSubTask = subTask.capsuleGroup.reduce((accGroup, curGroup) => {
          return (
            accGroup +
            curGroup.cards.reduce((accCard, curCard) => {
              return accCard + (curCard.timeCost ?? 0);
            }, 0)
          );
        }, 0);
        timeCost += allCardTimeCostWithinSubTask;
        return timeCost;
      }
    },
  };
</script>

<style lang="scss" scoped>
  .page-container {
    width: 100%;
    height: 100%;
    padding: 62px 5% 0px 5%;
    overflow: hidden;
    background-color: #f1f2f6;

    .class-info-loading-success-wrapper {
      height: 100%;
    }

    .class-info-loading-wrapper {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .class-info-loading-failure-wrapper {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .preserve-vertical-line {
      height: calc(100% - 56px);
      padding-left: 28px;
      overflow-y: auto;

      scrollbar-width: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      .subtask-container {
        .subtasks {
          width: 100%;
          margin-bottom: 16px;
          .subtask {
            width: 100%;
            height: 293px;
            padding: 10px;
            padding-right: 200px;
            margin-top: 52px;
            position: relative;
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
                margin-top: 6px;
                margin-bottom: 0;
                color: #999;
                font-size: 12px;

                span {
                  color: #14a2c9;
                }
              }
            }
            .subtask-title {
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
            .time-unit {
              position: absolute;
              bottom: 43px;
              right: 8px;
              color: #b4b4b4;
            }

            &:not(:last-child) {
              margin-bottom: 16px;
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
          }
        }
        .add-capsule-button {
          color: #046e72;
          width: 100%;
          padding: 21px 0;
          margin: auto;
          margin-bottom: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border: 1px dashed #b9b9b9;
          border-radius: 6px;
        }
      }
    }
    .footer__left,
    .footer__middle,
    .footer__right {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .footer__left {
      flex: 1;
    }
    .footer__middle {
      width: 60%;
      border: solid 1px #fd473e;
      position: relative;

      .mask {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
      }

      .icon {
        width: 48px;
        height: 48px;
      }
    }
    .footer__right {
      flex: 1;

      button {
        background: none;
        outline: none;
        border: none;
        width: 105px;
        height: 40px;
        cursor: pointer;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;

        .icon {
          width: 14px;
          height: 14px;
          margin-right: 8px;
        }

        &.reset {
          margin-right: 16px;

          .icon {
            fill: #bebebe;
          }
        }
        &.publish {
          background-color: #017b83;
          color: #fff;
          box-shadow: 0px 2px 4px 0px rgba(20, 81, 88, 0.35);

          .icon {
            fill: #fff;
          }

          &:hover {
            background-color: #026f76;
          }
        }
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
