<template>
  <div class="classes-contain-box">
    <Navigation />
    <div class="title">
      <a-row>
        <a-col :span="5">
          <span @click="goBack" class="left-arrow">
            <span class="back">
              <!-- <icon-font type="icon-fanhui"/> -->
              <i
                class="iconfont icon-fanhui"
                style="font-size:16px;padding-right:6px;"
              ></i> </span
            ><span class="left-route">{{ routeType }} </span>
            <span style="padding:0 6px;">|</span>
          </span>

          <span class="route no-select">画布清单</span>
        </a-col>
        <a-col
          :span="14"
          style="text-align:center;overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;"
          ><span class="name">{{ name }}</span></a-col
        >
        <a-col :span="5" style="text-align:right">
          <a-button
            class="create-btn"
            @click="goToCanvas"
            :disabled="disabledCreate == true ? true : false"
          >
            <!-- <icon-font type="icon-jia" style="padding-right:5px;" /> -->

            <i
              class="iconfont icon-jia"
              style="font-size:15px;padding-right:5px;"
            ></i>
            新建画布
          </a-button></a-col
        >
      </a-row>
    </div>
    <div class="scroll-wrapper">
      <vuedraggable
        v-if="listData.length > 0"
        class="capsule-draggable-container"
        :list="listData"
        :animation="200"
        direction="horizontal"
        :setData="handleSetData"
        @start="handleDragStart"
        @end="handleDragEnd"
      >
        <!-- <div class="capsule-list-content"> -->
        <div
          v-for="(item, indexs) in listData"
          :key="item.aclass.id"
          class="each-bg"
        >
          <div class="top-box">
            <span
              >课堂画布《<span class="class-name-contain-box-list"
                ><a-tooltip placement="right">
                  <template slot="title" v-if="isShowClassName">
                    {{ item.aclass.name }}
                  </template>
                  <div
                    class="add-item-aclass-name-list"
                    ref="classNameBoxRefs"
                    @mouseenter="handleShowClassName(item.aclass.id)"
                    :data-id="item.aclass.id"
                  >
                    {{ item.aclass.name }}
                  </div>
                </a-tooltip> </span
              >》</span
            >
            <div class="top-box-status" :style="activation(item.aclass)">
              <span v-if="item.aclass.status == 3"
                ><span>{{ item.aclass.score }}分</span>&nbsp;<span>{{
                  item.aclass.scoreDesc
                }}</span></span
              >
              <span v-else>{{ item.aclass.statusDesc }}</span>
            </div>
            <div class="top-box-right">
              <img src="../assets/user.png" />&nbsp;引用：{{
                item.aclass.quoteNum
              }}次
            </div>
          </div>
          <div class="flexs-box">
            <div class="flex-box " style="padding-top:32px;">
              <MainTaskCard
                :originFormData="getMainTaskOriginFormData(item.mainTask.id)"
                mode="preview"
                :small="true"
                :interactable="true"
                :showTimeLine="true"
                :leftTime="0"
                :rightTime="item.mainTask.endTime"
                :showLeftRightDot="true"
                @dblclick="handlePreviewCard('mainTask', item.mainTask.id)"
                :protrudeRightTimeLineLength="10"
                :scaleNumber="11"
                :showLeftThickScale="true"
              />
              <span v-if="item.capsuleList.length == 0" class="time-unit"
                >(单位:min)</span
              >
            </div>
            <div
              class="other-cards"
              ref="capsuleGroupContainerRef"
              :id="item.aclass.id"
              :data-id="item.aclass.id"
            >
              <div v-if="item.capsuleList.length > 0" class="flex-box ">
                <div
                  v-for="(card, index) of item.capsuleList"
                  :key="card.capsule.id"
                  class="flex-box add-bg"
                >
                  <div
                    v-for="(showIdx, t) in showAllIndex"
                    :key="t + Math.random() * 10 + 1"
                    class="flex-box"
                  >
                    <div v-if="card.capsule.id == showIdx" class="flex-box">
                      <a-tooltip title="在讲解前先说明要完成什么子任务">
                        <SupplementCard
                          mode="preview"
                          :interactable="true"
                          :showTimeLine="true"
                          style="margin:0 10px 0 0"
                          :rightTime="card.secondaryCard.endTime"
                          :showLeftDot="index == 0 ? true : false"
                          @dblclick="
                            hideEachShow(
                              card.capsule.id,
                              indexs,
                              item.aclass.id
                            )
                          "
                          :protrudeRightTimeLineLength="2"
                          :protrudeLeftTimeLineLength="10.5"
                          :scaleNumber="6"
                          :showRightThickScale="true"
                          :showLeftThickScale="true"
                        />
                      </a-tooltip>
                      <div
                        v-for="(crd, crdIdx) in card.groupList"
                        :key="crd.group.id"
                        :style="crdIdx > 0 ? bigStyle : smallStyle"
                        class="flex-box"
                        style="position:relative"
                      >
                        <!--  -->
                        <div class="quote-name-box">
                          <span v-if="crd.group.quoteCreateUserName"
                            >感谢<span>{{ crd.group.quoteCreateUserName }}</span
                            >的贡献</span
                          >
                        </div>
                        <div
                          v-if="crd.activationCard.length > 0"
                          class="flex-box"
                        >
                          <div
                            v-for="(childOne,
                            childOneIdx) in crd.activationCard"
                            :key="childOne.id"
                          >
                            <!-- {{crdIdx}},{{crd.activationCard.length}} -->
                            <!-- {{childOneIdx}} -->
                            <component
                              :is="getCardComponent(childOne.cardType)"
                              :originFormData="
                                getActivationOriginFormData(childOne.id)
                              "
                              mode="preview"
                              style="padding:0 0.5px"
                              :small="true"
                              :interactable="true"
                              :showTimeLine="true"
                              :rightTime="childOne.endTime"
                              :protrudeLeftTimeLineLength="
                                childOneIdx == 0 ? 10 : 0
                              "
                              :protrudeRightTimeLineLength="
                                childOneIdx !== childOne.length - 1 ? 2 : 0
                              "
                              @dblclick="
                                handlePreviewCard(
                                  'IntroductionCard',
                                  childOne.id
                                )
                              "
                              :scaleNumber="11"
                              :showRightThickScale="true"
                            />
                          </div>
                        </div>
                        <div
                          v-if="crd.demonstrationCard.length > 0"
                          class="flex-box"
                        >
                          <div
                            v-for="(childThree,
                            lineIdx) in crd.demonstrationCard"
                            :key="childThree.id"
                          >
                            <component
                              :is="getCardComponent(childThree.cardType)"
                              :originFormData="
                                getDemonstrationkOriginFormData(childThree.id)
                              "
                              mode="preview"
                              :small="true"
                              style="padding:0 0.5px"
                              :interactable="true"
                              :showTimeLine="true"
                              :rightTime="childThree.endTime"
                              :protrudeLeftTimeLineLength="
                                crd.activationCard.length == 0 ? 10 : 0
                              "
                              :protrudeRightTimeLineLength="
                                lineIdx !== childThree.length - 1 ? 2 : 0
                              "
                              @dblclick="
                                handlePreviewCard(
                                  'DescriptionCard',
                                  childThree.id
                                )
                              "
                              :scaleNumber="11"
                              :showRightThickScale="true"
                            />
                          </div>
                        </div>
                        <div
                          v-if="crd.applicationCard.length > 0"
                          class="flex-box"
                        >
                          <div
                            v-for="(child, childIdx) in crd.applicationCard"
                            :key="child.id"
                          >
                            <component
                              :is="getCardComponent(child.cardType)"
                              :originFormData="
                                getApplicationOriginFormData(child.id)
                              "
                              mode="preview"
                              :small="true"
                              style="padding:0 0.5px"
                              :interactable="true"
                              :showTimeLine="true"
                              :rightTime="child.endTime"
                              :protrudeLeftTimeLineLength="
                                childIdx !== 0 ? 0 : 0
                              "
                              :protrudeRightTimeLineLength="
                                childIdx !== child.length - 1 ? 2 : 10
                              "
                              @dblclick="
                                handlePreviewCard('ApplicationCard', child.id)
                              "
                              :scaleNumber="11"
                              :showRightThickScale="true"
                            />
                          </div>
                        </div>
                      </div>
                      <SubTaskCard
                        mode="preview"
                        :originFormData="
                          getSubTaskOriginFormData(card.subTask.id)
                        "
                        :small="true"
                        :protrudeLeftTimeLineLength="
                          card.groupList.length == 0 ? 18 : 10
                        "
                        :protrudeRightTimeLineLength="10"
                        :interactable="true"
                        :showTimeLine="true"
                        style="margin-left:10px;"
                        :showRightFlag="true"
                        :rightTime="card.subTask.endTime"
                        @dblclick="
                          handlePreviewCard('subTask', card.subTask.id)
                        "
                        :scaleNumber="11"
                      />
                    </div>
                  </div>

                  <div
                    v-for="(pileIndex, pileIdx) in showHideArr"
                    :key="pileIdx + Math.random() * 10 + 1"
                  >
                    <div v-if="card.capsule.id == pileIndex">
                      <PileCard
                        @dblclick="
                          showAll(card.capsule.id, indexs, item.aclass.id)
                        "
                        mode="preview"
                        :originFormData="
                          getSubTaskOriginFormData(card.subTask.id)
                        "
                        :small="true"
                        :interactable="true"
                        :showTimeLine="true"
                        :protrudeLeftTimeLineLength="10"
                        :protrudeRightTimeLineLength="10"
                        :pileCardAllTime="treeArr[indexs][index]"
                        :rightTime="card.capsule.endTime"
                        :showRightFlag="true"
                        :showLeftDot="index == 0 ? true : false"
                        :scaleNumber="15"
                      />
                    </div>
                  </div>
                </div>
                <span class="time-unit">(单位:min)</span>
              </div>
            </div>

            <div class="capsule-btn-box">
              <div class="btn-box">
                <template placement="bottomCenter">
                  <a-dropdown
                    :disabled="item.aclass.id == showLoadingId ? true : false"
                  >
                    <a-menu slot="overlay">
                      <a-menu-item
                        :key="1"
                        @click="exportWord(item.aclass.id, item.aclass.name)"
                      >
                        word
                      </a-menu-item>
                      <a-menu-item
                        :key="2"
                        @click="exportFile(item.aclass.id, item.aclass.name)"
                      >
                        ppt
                      </a-menu-item>
                    </a-menu>
                    <!-- {{item.aclass.id == showLoadingId}} -->
                    <a-button
                      class="export-btn"
                      v-if="
                        item.aclass.status == 1 ||
                          item.aclass.status == 2 ||
                          item.aclass.status == 3
                      "
                    >
                      <i
                        class="iconfont icon-tijiao"
                        style="font-size:16px;padding-right:6px;"
                      ></i>
                      导出<a-icon
                        v-if="showLoading && item.aclass.id == showLoadingId"
                        style="position:absolute;margin-left:15px;font-size:20px;color:#017B83"
                        type="sync"
                        spin
                      />
                    </a-button>
                  </a-dropdown>
                </template>
                <a-button
                  class="export-btn"
                  @click="preview(item.aclass.id)"
                  :disabled="item.aclass.id == showLoadingId ? true : false"
                  v-if="item.aclass.status == 2 || item.aclass.status == 3"
                >
                  <i
                    class="iconfont icon-chakan"
                    style="font-size:16px;padding-right:6px;"
                  ></i>
                  预览</a-button
                >
                <a-button
                  @click="edit(item.aclass.id)"
                  class="export-btn"
                  :disabled="item.aclass.id == showLoadingId ? true : false"
                  v-if="item.aclass.status == 1 || item.aclass.status == 2"
                >
                  <i
                    class="iconfont icon-zhongmingming"
                    style="font-size:15px;padding-right:6px;"
                  ></i>
                  编辑</a-button
                >
                <a-button
                  class="export-btn"
                  :disabled="item.aclass.id == showLoadingId ? true : false"
                  v-if="item.aclass.status == 1"
                  @click="submitBtn(item.aclass.id)"
                >
                  <i
                    class="iconfont icon-weibiaoti-1_huaban1"
                    style="font-size:15px;padding-right:6px;"
                  ></i>
                  发布</a-button
                >
                <a-button
                  class="export-btn delete-btn"
                  :disabled="item.aclass.id == showLoadingId ? true : false"
                  v-if="item.aclass.status == 1"
                  @click="deleCanvas(item.aclass.id)"
                >
                  <i
                    class="iconfont icon-lajitong"
                    style="font-size:17px;padding-right:6px;"
                  ></i>
                  删除</a-button
                >
              </div>
            </div>
          </div>

          <div
            class="sroll-button-group"
            v-if="
              doesNeedScrollButtons &&
                doesNeedScrollButtons.find(
                  (it) => it.id == item.aclass.id && it.bool == true
                )
            "
          >
            <button
              class="scroll-button"
              @mouseenter="handleScrollLeft($event, item.aclass.id)"
            >
              <a-icon type="double-left" />
            </button>
            <button
              class="scroll-button"
              @mouseenter="handleScrollRight($event, item.aclass.id)"
            >
              <a-icon type="double-right" />
            </button>
          </div>
        </div>
        <!-- </div> -->
      </vuedraggable>
      <div class="no-data" v-if="listData.length == 0 && loadingEnd">
        <img src="../assets/noCourses.png" alt="" /><br />
        <p class="no-data-text">您还没有创建画布哦！可单击“+新建画布”创建！</p>
      </div>
      <div class="pagination-box" v-if="listData.length > 0 && loadingEnd">
        <a-pagination
          v-model="current"
          :pageSize="pageSize"
          :total="total"
          :itemRender="itemRender"
          @change="changeNum"
          :showTotal="showTotal"
        />
      </div>
      <div class="footer-container" v-if="loadingEnd">
        CopyRight<span
          >&nbsp;&copy;&nbsp;2019-2020 (V1.0)&nbsp;科大讯飞教育</span
        >
      </div>

      <!-- <div class="footer-container" v-if="listData.length == 0 && loadingEnd">
        CopyRight<span>&nbsp;&copy;&nbsp;2019-2020 (V1.0)&nbsp;科大讯飞教育</span>
      </div> -->
    </div>
    <div class="loading-content" v-if="!loadingEnd">
      <a-spin size="large" class="initial-loading-box" />
    </div>
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
      <MainTaskCard
        :originFormData="cardInModalOriginFormData"
        mode="preview"
        :interactable="true"
        v-if="whichCard == 'mainTask'"
      />
      <SubTaskCard
        :originFormData="cardInModalOriginFormData"
        mode="preview"
        :interactable="true"
        v-if="whichCard == 'subTask'"
      />
      <component
        :is="getCardComponent(1)"
        :originFormData="cardInModalOriginFormData"
        mode="preview"
        v-if="whichCard == 'IntroductionCard'"
      />
      <component
        :is="getCardComponent(2)"
        :originFormData="cardInModalOriginFormData"
        mode="preview"
        v-if="whichCard == 'DescriptionCard'"
      />
      <component
        :is="getCardComponent(3)"
        :originFormData="cardInModalOriginFormData"
        mode="preview"
        v-if="whichCard == 'ApplicationCard'"
      />
    </AntModal>
  </div>
</template>

<script>
  import {Modal} from 'ant-design-vue';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';
  import vuedraggable from 'vuedraggable';
  import {throttle} from 'lodash-es';
  import Navigation from '@/components/Navigation.vue';
  import {IconFont} from '@/configs/scriptURL.js';
  import CapsuleGroup from './canvas/CapsuleGroup.vue';
  import MainTaskCard from '@/components/MainTaskCard.vue';
  import SubTaskCard from '@/components/SubTaskCard.vue';
  import SupplementCard from '@/components/SupplementCard.vue';
  import IntroductionCard from '@/components/IntroductionCard.vue';
  import DescriptionCard from '@/components/DescriptionCard.vue';
  import ApplicationCard from '@/components/ApplicationCard.vue';
  import PileCard from '@/components/PileCard.vue';
  import warning from 'warning';
  import confirm from '@utils/confirm';
  import {
    getClassList,
    changeClassOrder,
    updateEdit,
    updateStatus,
    deleteClass,
    leadingOutPPT,
    leadingOutWord,
    createClass,
    publishClass,
  } from '@/api/classes/index.js';
  import {createNamespacedHelpers} from 'vuex';
  const {
    mapMutations: canvasMapMutations,
    mapActions: canvasMapActions,
  } = createNamespacedHelpers('canvas');
  import axios from 'axios';
  const apiURL = process.env.VUE_APP_BASE_API;
  const client = axios.create({baseURL: apiURL, timeout: 2000});
  // 随机id
  const easyId = () =>
    Math.random()
      .toString(36)
      .slice(2);
  export default {
    name: 'Classes',
    components: {
      Navigation,
      swiper,
      swiperSlide,
      vuedraggable,
      IconFont,
      IntroductionCard,
      ApplicationCard,
      DescriptionCard,
      SupplementCard,
      MainTaskCard,
      SubTaskCard,
      PileCard,
      AntModal: Modal,
    },
    data() {
      return {
        current: 1,
        isCardDragging: false,
        name: this.$route.query.name,
        courseId: this.$route.query.courseId,
        hasScrollToLeftMost: true,
        hasScrollToRightMost: true,
        inScrollLockedMode: false,
        doesNeedScrollButtons: [],
        total: 0,
        showTotal: (total) => `共${total}条`,
        listData: [],
        showAllIndex: [], //展开的子卡id
        subTaskAllId: [], //所有子卡id
        showHideArr: [], //堆叠的子卡id
        isShow: false,
        treeArr: [],
        pageSize: 5,
        pageNum: 1,
        sum: 3,
        averageArr: [],
        rightTime: 0,
        shouldShowDialog: false,
        whichCard: null,
        editCardId: '',
        mainTaskFormData: [],
        subTaskFormData: [],
        activationCardFormData: [],
        applicationCardFormData: [],
        demonstrationCardFormData: [],
        cardInModalOriginFormData: {},
        durationSumTime: [],
        showLoading: false,
        showLoadingId: null,
        canClickOtherBtn: true,
        loadingEnd: false,
        routeType: this.$route.query.type == 1 ? '我创作的' : '我实践的',
        disabledCreate: false,
        isShowClassName: false,
      };
    },
    created() {
      this.fetchAllDictionary();
    },
    mounted() {
      this.getClassList();
    },
    updated() {
      // this.$nextTick(()=>{
      //     this.updateNeedOfScrollButton();
      //     this.updateControlScrollPosistion();
      // })
    },
    computed: {
      subTaskStyle() {
        return {
          position: 'absolute',
          top: '66px',
          right: '35px',
          zIndex: '3',
        };
      },
      smallStyle() {
        return {
          padding: '0 0.5px',
        };
      },
      bigStyle() {
        return {
          padding: '0 0.5px 0 10px',
        };
      },
      capsuleDraggableContainerStyle() {
        return {
          overflowX: this.inScrollLockedMode ? 'hidden' : 'auto',
        };
      },
      activation() {
        return (icontent) => {
          if (icontent.status === 1) {
            return {color: '#FF9F48'};
          } else if (icontent.status === 2) {
            return {color: '#FF9F48'};
          } else if (icontent.status === 3) {
            if (icontent.totalScore < 60 || icontent.totalScore == 60) {
              return {color: '#08A4C9'};
            } else if (icontent.totalScore > 60 && icontent.totalScore < 90) {
              return {color: '#046E72'};
            } else {
              return {color: '#1461A3'};
            }
          }
        };
      },
    },
    methods: {
      ...canvasMapActions(['fetchAllDictionary']),
      //显示课程名的tooltip
      handleShowClassName(id) {
        const matcher = this.$refs.classNameBoxRefs.find(
          (item) => item.dataset.id == id
        );
        if (matcher.scrollWidth > matcher.clientWidth) {
          this.isShowClassName = true;
        } else {
          this.isShowClassName = false;
        }
      },
      handleSetData(dataTransfer, dragEl) {
        dataTransfer.setData('Text', '');
      },
      handleScrollLeft(event, id) {
        let cancelScroll = false;
        const matchedContainer = this.$refs.capsuleGroupContainerRef.find(
          (elm) => elm.dataset.id == id
        );
        const continueScrollLeft = function() {
          if (matchedContainer.scrollLeft > 0) {
            matchedContainer.scrollLeft -= 20;
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
      handleScrollRight(event, id) {
        let cancelScroll = false;
        const matchedContainer = this.$refs.capsuleGroupContainerRef.find(
          (elm) => elm.dataset.id == id
        );
        const continueScrollRight = function() {
          if (matchedContainer.scrollLeft < matchedContainer.scrollWidth) {
            matchedContainer.scrollLeft += 20;
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
        this.doesNeedScrollButtons = [];
        for (let i = 0; i < this.$refs.capsuleGroupContainerRef.length; i++) {
          let obj = {};
          obj.id = this.$refs.capsuleGroupContainerRef[i].id;
          if (
            this.$refs.capsuleGroupContainerRef[i].scrollWidth >
            this.$refs.capsuleGroupContainerRef[i].clientWidth
          ) {
            obj.bool = true;
            this.doesNeedScrollButtons.push(obj);
          } else {
            obj.bool = false;
            this.doesNeedScrollButtons.push(obj);
          }
        }
      },
      updateControlScrollPosistion() {
        const scrollLeft = this.$refs.capsuleGroupContainerRef.scrollLeft;
        const clientWidth = this.$refs.capsuleGroupContainerRef.clientWidth;
        const scrollWidth = this.$refs.capsuleGroupContainerRef.scrollWidth;
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
      getCardComponent(type) {
        switch (type) {
          case 2:
            return DescriptionCard;
          case 1:
            return IntroductionCard;
          case 3:
            return ApplicationCard;
          default:
            throw new Error('unkown type');
        }
      },
      handleDragStart(customEvent) {
        //  console.log(this.listDataDraggable,this.listData, 'customEvent');
        // console.log(customEvent,'customEventStart')
      },
      handleDragEnd(customEvent) {
        if (customEvent.newIndex === customEvent.oldIndex) return false;
        console.log(this.listData, 'customEvent');
        const obj = {};
        if (customEvent.oldIndex < customEvent.newIndex) {
          //从上到下
          obj.oldId = this.listData[customEvent.newIndex].aclass.id;
          obj.newId = this.listData[customEvent.newIndex - 1].aclass.id;
        }
        if (customEvent.oldIndex > customEvent.newIndex) {
          obj.oldId = this.listData[customEvent.newIndex].aclass.id;
          obj.newId = this.listData[customEvent.newIndex + 1].aclass.id;
        }
        obj.courseId = this.courseId;
        this.changeClassOrder(obj);
      },
      // 自定义分页
      itemRender(current, type, originalElement) {
        if (type == 'prev') {
          return <a class="ant-pagination-item itxst">上一页</a>;
        } else if (type == 'next') {
          return <a class="ant-pagination-item itxst">下一页</a>;
        }
        return originalElement;
      },
      changeNum(current, pageSize) {
        //分页

        this.pageNum = current;
        this.pageSize = pageSize;
        this.getClassList();
      },
      goBack() {
        // this.$router.go(-1);
        this.$router.push({
          path: '/courses',
          query: {type: this.$route.query.type},
        });
      },
      async getClassList() {
        this.loadingEnd = false;
        this.listData = [];
        this.showAllIndex = [];
        this.showHideArr = [];
        this.subTaskAllId = [];
        const obj = {};
        obj.pageSize = this.pageSize;
        obj.pageNum = this.pageNum;
        obj.courseId = this.courseId;
        // obj.status =2
        const res = await getClassList(obj);
        if (res.data.code == 0) {
          //  res.data.data.classList.forEach((value,index)=>{
          //    console.log(value,'val')
          //    if(value.capsuleList){
          //      value.capsuleList.forEach((val,idx)=>{
          //        if(val.groupList){
          //          val.groupList.forEach((group,i) =>{
          //           //  console.log(group,i)
          //             if(group.activationCard.length==0 && group.applicationCard.length==0 && group.demonstrationCard.length==0){
          //               console.log(val.groupList,'val')
          //               val.groupList.splice(1,i);
          //             }
          //          })
          //        }
          //      })
          //    }
          //  })
          this.listData = res.data.data.classList;
          //  console.log(this.listData,'this.listData')

          this.loadingEnd = true;
          //课堂排序
          this.listData.sort((a, b) => {
            return a.aclass.orderNum - b.aclass.orderNum;
          });

          this.listData.forEach((classItem) => {
            let totalTime = 0;
            if (classItem.mainTask == null) {
              classItem.mainTask = {};
              //总任务卡时间
              Object.assign(classItem.mainTask, {
                beginTime: totalTime,
                endTime: totalTime + 0,
              });
              // totalTime = totalTime + 0;
            } else {
              classItem.mainTask.beginTime = 0;
              classItem.mainTask.endTime = totalTime + 3;
              // totalTime = totalTime + 3;
            }

            totalTime = totalTime + classItem.mainTask.endTime;

            // //总任务卡时间
            // Object.assign(classItem.mainTask, {
            //   beginTime: totalTime,
            //   endTime: totalTime + classItem.mainTask.dictionaryExcepttime?classItem.mainTask.dictionaryExcepttime:0,
            // });
            // totalTime = totalTime + classItem.mainTask.dictionaryExcepttime?classItem.mainTask.dictionaryExcepttime:0;
            //胶囊
            classItem.capsuleList.sort((a, b) => {
              return a.capsule.orderNum - b.capsule.orderNum;
            });

            let mainTaskData = {};

            if (classItem.capsuleList.length > 0) {
              classItem.capsuleList.forEach((capsule) => {
                //组开始时间
                capsule.capsule.beginTime = totalTime;
                //副卡时间
                if (capsule.subTask != null) {
                  capsule.secondaryCard = {
                    beginTime: totalTime,
                    endTime: totalTime + 1.5,
                  };
                  totalTime = totalTime + 1.5;
                } else {
                  capsule.secondaryCard = {
                    beginTime: totalTime,
                    endTime: totalTime + 0,
                  };
                  totalTime = totalTime + 0;
                }

                // totalTime = totalTime +capsule.subTask?(capsule.subTask.average?1.5:0):0;
                //组排序
                capsule.groupList.sort((a, b) => {
                  return a.group.orderNum - b.group.orderNum;
                });
                if (capsule.groupList.length > 0) {
                  //   capsule.groupList.forEach((group,groupIdx) => {
                  //     // if(group.activationCard.length==0 && group.demonstrationCard.length==0 &&group.applicationCard.length==0) {

                  //     //  capsule.groupList.splice(1,groupIdx);
                  //     // }
                  //     //  console.log(capsule.groupList,'p')
                  //     //激活卡排序
                  //   });
                  // }

                  for (const [
                    groupIndex,
                    group,
                  ] of capsule.groupList.entries()) {
                    if (
                      group.activationCard.length == 0 &&
                      group.demonstrationCard.length == 0 &&
                      group.applicationCard.length == 0
                    ) {
                      capsule.groupList.splice(groupIndex, 1);
                      continue;
                    } else {
                      if (group.activationCard.length > 0) {
                        group.activationCard.sort((a, b) => {
                          return a.orderNum - b.orderNum;
                        });
                        group.activationCard.forEach((aCard) => {
                          aCard.beginTime = totalTime;
                          totalTime = totalTime + aCard.average;
                          aCard.endTime = totalTime;
                        });
                      }

                      //讲解卡排序
                      if (group.demonstrationCard.length > 0) {
                        group.demonstrationCard.sort((a, b) => {
                          return a.orderNum - b.orderNum;
                        });
                        group.demonstrationCard.forEach((dCard) => {
                          dCard.beginTime = totalTime;
                          totalTime = totalTime + dCard.average;
                          dCard.endTime = totalTime;
                        });
                      }

                      //应用卡排序
                      if (group.applicationCard.length > 0) {
                        group.applicationCard.sort((a, b) => {
                          return a.orderNum - b.orderNum;
                        });
                        group.applicationCard.forEach((acCard) => {
                          acCard.beginTime = totalTime;
                          totalTime = totalTime + acCard.average;
                          acCard.endTime = totalTime;
                        });
                      }
                    }
                  }
                }
                //子任务卡
                if (capsule.subTask == null) {
                  capsule.subTask = {};
                  Object.assign(capsule.subTask, {
                    beginTime: totalTime,
                    average: 0,
                    endTime: totalTime + 0,
                  });
                } else {
                  (capsule.subTask.beginTime = totalTime),
                    (capsule.subTask.endTime =
                      totalTime + capsule.subTask.average);
                }
                totalTime = totalTime + capsule.subTask.average;
                //组结束时间
                capsule.capsule.endTime = totalTime;
              });
              let obj = {};
              obj.id = classItem.aclass.id;
              obj.time = totalTime;
              obj.subTaskNum = classItem.capsuleList.length;
              this.durationSumTime.push(obj);
              mainTaskData = {
                id: classItem.mainTask.id,
                name: classItem.mainTask.name,
                criteria: classItem.mainTask.finalProduct,
                scene: classItem.mainTask.designSight,
                timeContent: totalTime,
                numContent: classItem.capsuleList.length,
              };
            } else {
              mainTaskData = {
                id: classItem.mainTask.id,
                name: classItem.mainTask.name,
                criteria: classItem.mainTask.finalProduct,
                scene: classItem.mainTask.designSight,
                timeContent: totalTime,
                numContent: 0,
              };
            }
            // console.log(classItem.mainTask.endTime,'classItem.mainTask.endTime')

            this.mainTaskFormData.push(mainTaskData);
          });
          if (this.listData.length > 0) {
            this.$nextTick(() => {
              this.updateNeedOfScrollButton();
              this.updateControlScrollPosistion();
            });
          }
          let capsuleListLength = 0;
          const supplementCardRightTime = 4;
          res.data.data.classList.forEach((item) => {
            // let mainTaskData = {};
            // mainTaskData = {
            //   id: item.mainTask.id,
            //   name: item.mainTask.name,
            //   criteria: item.mainTask.finalProduct,
            //   scene: item.mainTask.designSight,
            // };
            // this.mainTaskFormData.push(mainTaskData);
            //有胶囊组
            if (item.capsuleList.length > 0) {
              for (let i = 0; i < item.capsuleList.length; i++) {
                this.subTaskAllId.push(item.capsuleList[i].capsule.id);
                if (item.capsuleList[i].subTask == null) {
                  //如果没有子卡，但是有其他卡，生成空的子卡，
                  let obj = {};
                  obj.id = easyId();
                  obj.average = 0;
                  item.capsuleList[i].subTask = obj;
                }
                let subTaskData = {};
                subTaskData = {
                  id: item.capsuleList[i].subTask.id,
                  name: item.capsuleList[i].subTask.name,
                  requirement: item.capsuleList[i].subTask.specificRequirements,
                  teachingFormat: item.capsuleList[i].subTask.activityTypeId,
                  timeCost: item.capsuleList[i].subTask.dictionaryExcepttimeId,
                };
                this.subTaskFormData.push(subTaskData);
                if (i == 0) {
                  //默认展示第一个卡片组
                  this.showAllIndex.push(item.capsuleList[i].capsule.id);
                } else {
                  //其他卡片组默认隐藏
                  this.showHideArr.push(item.capsuleList[i].capsule.id);
                }
              }
            }
          });
          this.total = res.data.data.meta.total;
          // 定义一个二位数组，往组件中传每一行的堆叠的卡片的，各个时间
          // 定义一个二位数组，往数组里存放所有的分钟，作用与堆叠卡下面的刻度线占比
          for (let i = 0; i < res.data.data.classList.length; i++) {
            this.treeArr[i] = new Array();
            let averageObj = {};
            for (
              let j = 0;
              j < res.data.data.classList[i].capsuleList.length;
              j++
            ) {
              let obj = {};
              let capsuleListData = res.data.data.classList[i].capsuleList[j];
              obj.subTask = capsuleListData.subTask.average;
              obj.secondaryCard = capsuleListData.secondaryCard.endTime;
              if (
                capsuleListData.secondaryCard.endTime ==
                capsuleListData.secondaryCard.beginTime
              ) {
                obj.secondaryCard = 0;
              } else {
                obj.secondaryCard = 1.5;
              }
              let activeSum = 0;
              let applicationSum = 0;
              let domensionSum = 0;
              for (let y = 0; y < capsuleListData.groupList.length; y++) {
                for (
                  let q = 0;
                  q < capsuleListData.groupList[y].activationCard.length;
                  q++
                ) {
                  activeSum +=
                    capsuleListData.groupList[y].activationCard[q].average;
                  let activationCardData = {};
                  (activationCardData.introContent =
                    capsuleListData.groupList[y].activationCard[
                      q
                    ].relatedKnowledge),
                    (activationCardData.introFormat =
                      capsuleListData.groupList[y].activationCard[
                        q
                      ].activationTypeId),
                    (activationCardData.timeCost =
                      capsuleListData.groupList[y].activationCard[
                        q
                      ].dictionaryExcepttimeId),
                    (activationCardData.activityContent =
                      capsuleListData.groupList[y].activationCard[q].content),
                    (activationCardData.id =
                      capsuleListData.groupList[y].activationCard[q].id),
                    this.activationCardFormData.push(activationCardData);
                }
                for (
                  let w = 0;
                  w < capsuleListData.groupList[y].applicationCard.length;
                  w++
                ) {
                  applicationSum +=
                    capsuleListData.groupList[y].applicationCard[w].average;
                  let applicationCardData = {};
                  (applicationCardData.how =
                    capsuleListData.groupList[y].applicationCard[w].practiceId),
                    (applicationCardData.timeCost =
                      capsuleListData.groupList[y].applicationCard[
                        w
                      ].dictionaryExcepttimeId),
                    (applicationCardData.description =
                      capsuleListData.groupList[y].applicationCard[w].content),
                    (applicationCardData.id =
                      capsuleListData.groupList[y].applicationCard[w].id),
                    this.applicationCardFormData.push(applicationCardData);
                }
                for (
                  let e = 0;
                  e < capsuleListData.groupList[y].demonstrationCard.length;
                  e++
                ) {
                  domensionSum +=
                    capsuleListData.groupList[y].demonstrationCard[e].average;
                  let demonstrationCardData = {};

                  (demonstrationCardData.knowledge =
                    capsuleListData.groupList[y].demonstrationCard[
                      e
                    ].knowledgePoint),
                    (demonstrationCardData.how =
                      capsuleListData.groupList[y].demonstrationCard[
                        e
                      ].demonstrationTypeid),
                    (demonstrationCardData.timeCost =
                      capsuleListData.groupList[y].demonstrationCard[
                        e
                      ].dictionaryExcepttimeId),
                    (demonstrationCardData.description =
                      capsuleListData.groupList[y].demonstrationCard[
                        e
                      ].displayCase),
                    (demonstrationCardData.termExplanation =
                      capsuleListData.groupList[y].demonstrationCard[
                        e
                      ].popularDescription),
                    (demonstrationCardData.id =
                      capsuleListData.groupList[y].demonstrationCard[e].id),
                    (demonstrationCardData.attachment =
                      capsuleListData.groupList[y].demonstrationCard[
                        e
                      ]?.files?.map((file) => ({
                        id: file.id,
                        status: 'resolved',
                        fileName: file.fileName,
                        url: file.url,
                      })) ?? []),
                    this.demonstrationCardFormData.push(demonstrationCardData);
                }
              }
              obj.activeSum = activeSum;
              obj.applicationSum = applicationSum;
              obj.domensionSum = domensionSum;
              this.treeArr[i][j] = new Array(obj);
            }
          }
          // this.listDataDraggable = this.listData
          console.log(this.treeArr);
        } else {
          this.loadingEnd = true;
          this.$message.warning(res.data.mesg);
        }
      },
      async changeClassOrder(obj) {
        const res = await changeClassOrder(obj);
        if (res.data.code == 0) {
          this.$message.success('成功');
        } else {
          this.$message.warning('调换顺序失败！');
        }
      },
      async goToCanvas() {
        this.disabledCreate = true;
        const obj = {};
        obj.courseId = this.courseId;
        const res = await createClass(obj);
        if (res.data.code == 0) {
          this.disabledCreate = false;
          this.$router.push(
            `/course/${this.courseId}/class/${res.data.data.classId}/canvas/edit`
          );
        } else {
          this.disabledCreate = false;
          this.$message.warning(res.data.mesg);
        }
      },
      showAll(id, indexs, aclassId) {
        this.showAllIndex.push(id);
        let idx = this.showHideArr.indexOf(id);
        this.showHideArr.splice(idx, 1);
        this.$nextTick(() => {
          this.updateNeedOfScrollButton();
          this.updateControlScrollPosistion();
        });
      },
      hideEachShow(id, indexs, aclassId) {
        let i = this.showAllIndex.indexOf(id);
        this.showAllIndex.splice(i, 1);
        this.showHideArr.push(id);
        this.$nextTick(() => {
          this.updateNeedOfScrollButton();
          this.updateControlScrollPosistion();
        });
      },
      preview(id) {
        this.$router.push(`/course/${this.courseId}/class/${id}/canvas`);
      },
      // 编辑
      async edit(id) {
        this.showLoadingId = id;
        const listQuery = {};
        listQuery.id = id;
        const res = await updateEdit(listQuery);
        if (res.data.code == 0) {
          this.showLoadingId = null;
          this.$router.push(`/course/${this.courseId}/class/${id}/canvas/edit`);
        } else {
          this.showLoadingId = null;
          this.$message.warning(res.data.mesg);
        }
      },
      deleCanvas(id) {
        const listQuery = {};
        listQuery.id = id;
        this.showLoadingId = id;
        this.$confirm({
          title: '确认删除',
          content: '永久删除该课堂吗？',
          okText: '删除',
          cancelText: '取消',
          class: 'my-custom-confirm-wj',

          onOk: () => {
            this.deleteClass(listQuery);
          },
          onCancel: () => {
            this.showLoadingId = null;
            this.$message.warning('已取消');
          },
        });
      },
      async deleteClass(listQuery) {
        const res = await deleteClass(listQuery);
        if (res.data.code == 0) {
          this.$message.success('删除成功');
          this.showLoadingId = null;
          this.getClassList();
        } else {
          this.showLoadingId = null;
          this.$message.warning(res.data.mesg);
        }
      },
      // 导出

      async exportFile(classId, name) {
        this.showLoading = true;
        this.showLoadingId = classId;
        const res = await leadingOutPPT(classId);
        let fileName = res.headers['content-disposition']
          .split(';')[1]
          .split('filename=')[1];
        fileName = decodeURIComponent(fileName);
        let blob = new Blob([res.data], {
          type:
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        });
        if (window.navigator && window.navigator.msSaveBlob) {
          //ie和微软
          window.navigator.msSaveBlob(blob, 'pptx');
          this.showLoading = false;
          this.showLoadingId = null;
        } else {
          // console.log(blob);
          let url = URL.createObjectURL(blob);
          let link = document.createElement('a'); // 创建a标签
          link.href = url;
          link.setAttribute('download', name + '.pptx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          this.showLoading = false;
          this.showLoadingId = null;
        }
        if (res.data.code == 2) {
          this.showLoading = false;
          this.showLoadingId = null;
          this.$message.warning(res.data.mesg);
        }
      },
      async exportWord(classId, name) {
        this.showLoading = true;
        this.showLoadingId = classId;
        const res = await leadingOutWord(classId);
        if (res.status === 200 || res.status === 201) {
          if (res.data.type === 'application/octet-stream') {
            // let fileName = res.headers['content-disposition']
            //   .split(';')[1]
            //   .split('filename=')[1];
            // fileName = decodeURIComponent(fileName);
            let blob = new Blob([res.data], {
              type:
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            //  if (window.navigator.userAgent.indexOf('Firefox') >= 0) {
            //       let point = name.indexOf('.')
            //       if (point == -1) {
            //         name = name + '.xls'
            //       } else {
            //         name = name
            //       }
            //  }

            if (window.navigator && window.navigator.msSaveBlob) {
              //ie和微软
              window.navigator.msSaveBlob(blob, 'docx');
              this.showLoading = false;
              this.showLoadingId = null;
            } else {
              console.log(blob);
              let link = document.createElement('a'); // 创建a标签
              document.body.appendChild(link);
              let url = window.URL.createObjectURL(blob);

              link.href = url;
              link.setAttribute('download', name + '.docx');

              link.click();
              document.body.removeChild(link);
              this.showLoading = false;
              this.showLoadingId = null;
            }
          }
          //   else{
          //     this.$message.error(
          //   res.data.mesg ? res.data.mesg : '导出word失败',
          //   this.showLoading = false

          // )}
        } else {
          this.$message.warning(
            res.data.mesg ? res.data.mesg : '导出word失败',
            (this.showLoading = false)
          );
        }
        if (res.data.code == 2) {
          this.showLoadingId = null;
          this.showLoading = false;
          this.$message.warning(res.data.mesg);
        }
      },
      // 提交
      async submitBtn(id) {
        const obj = {};
        obj.classId = id;
        this.showLoadingId = id;
        this.durationSumTime.forEach((item) => {
          if (item.id === id) {
            obj.duration = item.time;
            obj.subtaskNum = item.subTaskNum;
          }
        });
        const res = await publishClass(obj);
        if (res.data.code == 0) {
          this.showLoadingId = null;
          this.$message.success('发布成功');
          this.getClassList();
        } else {
          this.showLoadingId = null;
          this.$message.warning(res.data.mesg);
        }
      },
      // 列表总任务卡片数据
      getMainTaskOriginFormData(cardId) {
        return this.mainTaskFormData.find((mainTask) => mainTask.id === cardId);
      },
      //列表子任务卡
      getSubTaskOriginFormData(cardId) {
        return this.subTaskFormData.find((subTask) => subTask.id === cardId);
      },
      getActivationOriginFormData(cardId) {
        return this.activationCardFormData.find(
          (activation) => activation.id === cardId
        );
      },

      getDemonstrationkOriginFormData(cardId) {
        return this.demonstrationCardFormData.find(
          (demonstration) => demonstration.id === cardId
        );
      },
      getApplicationOriginFormData(cardId) {
        return this.applicationCardFormData.find(
          (application) => application.id === cardId
        );
      },
      // 预览卡片数据
      handlePreviewCard(cardType, cardId) {
        this.cardInModalOriginFormData = {};
        console.log(cardType, 'cardType');
        this.whichCard = cardType;
        this.editCardType = cardType;
        this.editCardId = cardId;
        this.shouldShowDialog = true;
        if (cardType == 'mainTask') {
          this.cardInModalOriginFormData = this.mainTaskFormData.find(
            (mainTask) => mainTask.id === cardId
          );
        }
        if (cardType == 'subTask') {
          this.cardInModalOriginFormData = this.subTaskFormData.find(
            (subTask) => subTask.id === cardId
          );
        }
        if (cardType == 'IntroductionCard') {
          this.cardInModalOriginFormData = this.activationCardFormData.find(
            (activationCard) => activationCard.id === cardId
          );
          console.log(
            this.cardInModalOriginFormData,
            'cardInModalOriginFormData'
          );
        }
        if (cardType == 'ApplicationCard') {
          this.cardInModalOriginFormData = this.applicationCardFormData.find(
            (applicationCard) => applicationCard.id === cardId
          );
        }
        if (cardType == 'DescriptionCard') {
          this.cardInModalOriginFormData = this.demonstrationCardFormData.find(
            (demonstrationCard) => demonstrationCard.id === cardId
          );
        }
      },
      handleClickDialogMask() {
        this.shouldShowDialog = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .classes-contain-box {
    .title {
      height: 50px;
      line-height: 50px;
      width: 90%;
      margin: 0 auto;
      margin-top: 15px;
      .left-arrow {
        cursor: pointer;
      }
      .back {
        font-size: 18px;
        padding-right: 5px;
        cursor: pointer;
      }
      .left-route {
        font-size: 16px;
        color: #666;
      }
      .route {
        color: #000;
        font-size: 16px;
      }
      .no-select {
        -webkit-user-select: none; /* Chrome all / Safari all */
        -moz-user-select: none; /* Firefox all */
        -ms-user-select: none; /* IE 10+ */
        -o-user-select: none;
        user-select: none;
      }
      .name {
        font-weight: 600;
        font-size: 18px;
      }
      .create-btn {
        background: #357981;
        color: #fff;
        font-size: 14px;
        width: 105px;
        height: 40px;
        line-height: 40px;
        outline: none;
        border: none;
        border-radius: 3px;
        &.ant-btn:hover,
        .ant-btn:focus {
          background-color: #026f76;
        }
        // cursor: pointer;
      }
      // .create-btn:hover {
      //   background-color: #026f76;
      // }
    }
    .card {
      width: 128px;
      height: 160px;
      border: 1px solid #999;
    }
    .each-canvas {
      width: 100%;
      margin: 0 auto;
      // border:1px solid #afa;
      .class-name {
        text-align: left;
        font-size: 16px;
        font-weight: 400;
        color: #000000;
      }
      .left-detail {
        width: 8%;
        // border:1px solid #000;
        display: inline-block;
        vertical-align: top;
      }
      .right-detail {
        width: 90%;
        display: inline-block;
        height: 300px;
        // border:1px solid red;
        .line {
          margin-top: 20px;
          width: 128px;
          height: 4px;
          background: #de915e;
          display: inline-block;
        }
        .dot {
          width: 5px;
          height: 5px;
          margin-left: 10px;
          border-radius: 50%;
          background: #de915e;
          display: inline-block;
        }
        .time {
          text-align: center;
        }
      }
    }
    .wrapper {
      height: 100%;
      overflow-y: auto;
      position: absolute;
      width: 90%;
      text-align: center;
      margin-left: 5%;
      background: #e8eaec;
    }
    .pagination-box {
      width: 100%;
      height: 50px;
      margin: 0 auto;
      text-align: center;
      margin-top: 30px;
    }
    .cards-container {
      height: 80%;
      display: flex;
      margin: 0 2% 0 4%;
      width: 84%;
      overflow-x: hidden;
      & > * {
        padding: 0 16px;
        margin-bottom: 30px;
      }
    }
    .scroll-wrapper {
      width: 100%;
      margin: 0 auto;
      overflow-y: auto;
      overflow-x: hidden;
      height: calc(100% - 124px);
      // border: 1px solid #afa;
      position: absolute;
      .sroll-button-group {
        // position: absolute;
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
          }
        }
      }
    }
    .capsule-draggable-container {
      width: 90%;
      margin: 0 auto;
      // height: 100%;
      min-height: calc(100% - 139px);
      // height:calc(100% - 60px);
      // border:1px solid red;
    }
    .capsule-list-content {
      min-height: calc(100% - 135px);
    }
    .each-bg {
      background: #e8eaec;
      margin-top: 20px;
      border-radius: 20px;
      height: 300px;
    }
    .top-box {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #000;
      padding-left: 2%;
      .top-box-name {
        display: inline-block;
      }
      .top-box-pic {
        width: 97px;
        height: 25px;
        display: inline-block;
      }
      .class-name-contain-box-list {
        max-width: 300px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        vertical-align: top;
        cursor: pointer;
      }
      .add-item-aclass-name-list {
        max-width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .top-box-status {
        display: inline-block;
        height: 27px;
        line-height: 27px;
        // border: 1px solid #000;
        font-size: 14px;
        font-weight: bold;
        padding: 0 20px;
        border-radius: 45px 30px 30px 0;
        background-color: #fff;
        position: absolute;
        margin-top: 8px;
      }
      .top-box-right {
        display: inline-block;
        text-align: right;
        float: right;
        margin-right: 40px;
        color: #666;
        font-size: 14px;
      }
    }
    .capsule-btn-box {
      width: 144px;
      text-align: center;
      .export-btn {
        margin-top: 10px;
      }
      .delete-btn {
        line-height: 30px;
      }
    }
    .box-empty {
      width: 100%;
      height: 20px;
      background: #f1f2f6;
    }
    .btn-box {
      .ant-btn:active,
      .ant-btn.active {
        color: #017b83;
      }
      .ant-btn:hover,
      .ant-btn:focus {
        color: #017b83;
        border-color: #017b83;
      }
      .ant-btn {
        padding: 0 10px;
      }
    }

    .blue {
      color: #046e72;
    }
    .orange {
      color: #ff9f48;
    }
    .black {
      color: #1461a3;
    }
    .flexs-box {
      display: flex;
      width: calc(100% - 40px);
      margin: 0 20px 0 40px;
      height: 215px;
    }
    .time-unit {
      margin-top: 165px;
      margin-left: 35px;
      color: #b4b4b4;
      width: 70px;
    }
    .other-cards {
      width: calc(100% - 228px);
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      padding-top: 32px;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
    .flex-box {
      display: flex;
    }
    .add-bg {
      background-position: 0 100px;
      margin-left: 20px;
      position: relative;
    }
    .add-bg::before {
      position: absolute;
      bottom: 50px;
      left: 0;
      width: 100%;
      height: 40px;
      z-index: 0;
      content: '';
      background-color: #a8d4e1;
      border-radius: 0 0 5px 5px;
    }
    .footer-container {
      // height: 14px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #888888;
      margin-bottom: 25px;
      text-align: center;
    }
    .no-data {
      height: calc(100% - 39px);
      text-align: center;
      margin: 0 auto;
      img {
        margin-top: 6%;
        margin-bottom: 20px;
      }
      .no-data-text {
        font-size: 14px;
        color: #000;
      }
    }
    .loading-content {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: fixed;
      // background: rgba(0, 0, 0, 0.5);
      text-align: center;
      margin: 0 auto;
    }
    .initial-loading-box {
      height: 100px;
      margin: 0 auto;
      text-align: center;
      // border:1px solid #afa;
      top: 50%;
      left: 50%;
      transform: translate(-50% -50%);
      position: absolute;
      font-size: 16px;
      color: #fff;
    }
    .quote-name-box {
      position: absolute;
      margin-top: -35px;
      left: calc(50% - 40px);
      // height: 20px;
      font-size: 12px;
    }
  }
</style>

<style lang="scss">
  .my-custom-confirm-wj {
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
<style scoped>
  /deep/ .custom-dialog .ant-modal-content {
    border-radius: 28px;
  }
  .pagination-box /deep/ .ant-pagination-item:hover > a {
    color: #357981;
  }
</style>
