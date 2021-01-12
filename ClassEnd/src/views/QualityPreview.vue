<template>
  <div class="quality-preview-box">
    <Navigation />
    <div class="quality-box1" v-if="qualityInfoStatus === 'resolved' && qualityInfoStatusTab === 'resolved'">
      <div class="quality-main-box">
        <!-- 头部课程展示区域 -->
        <div class="header">
          <div class="title">
            <a-row>
              <a-col :span="8">
                <span @click="goBack" class="left-arrow">
                  <span class="back">
                    <i
                      class="iconfont icon-fanhui"
                      style="font-size:16px;padding-right:6px;"
                    ></i>
                  </span>
                  <span class="left-route">已审核列表</span>
                  <span style="padding:0 6px;">|</span>
                </span>
                <span class="route no-select">画布清单</span>
              </a-col>
            </a-row>
          </div>
          <div class="each-bg">
            <!-- 画布介绍 -->
            <div class="top-box">
              <span
                >课堂画布《
                <span class="class-name-contain-box-preview"
                  ><a-tooltip placement="right">
                    <template slot="title" v-if="isShowName">
                      {{ checkFormData.aclass.name }}
                    </template>
                    <div
                      class="add-item-aclass-name-preview"
                      ref="classNameBoxRef"
                      @mouseenter="handleShowName(checkFormData.aclass.id)"
                      :data-id="checkFormData.aclass.id"
                    >
                      {{ checkFormData.aclass.name }}
                    </div>
                  </a-tooltip> </span
                >》</span
              >
              <div
                class="top-box-status3"
                :style="activation(checkFormData.aclass)"
              >
                <span>
                  <span
                    >{{ checkFormData.aclass.createUserName }}老师 /
                    {{ checkFormData.aclass.score }}分
                    {{ checkFormData.aclass.scoreEvaluate }}</span
                  >
                </span>
              </div>
            </div>
            <!-- 画布展示 -->
            <div class="flexs-box">
              <!-- 主任务卡 -->
              <div class="flex-box " style="padding-top:32px;">
                <MainTaskCard
                  :originFormData="
                    getMainTaskOriginFormData(checkFormData.mainTask.id)
                  "
                  mode="preview"
                  :small="true"
                  :interactable="true"
                  :showTimeLine="true"
                  :leftTime="0"
                  :rightTime="checkFormData.mainTask.endTime"
                  :showLeftRightDot="true"
                  @dblclick="
                    handlePreviewCard('mainTask', checkFormData.mainTask.id)
                  "
                  :protrudeRightTimeLineLength="10"
                  :scaleNumber="11"
                  :showLeftThickScale="true"
                />
                <span
                  v-if="checkFormData.capsuleList.length == 0"
                  class="time-unit"
                  >(单位:min)</span
                >
              </div>
              <!-- 其他卡片 -->
              <div
                class="other-cards"
                ref="capsuleGroupContainerRef"
                :id="checkFormData.aclass.id"
                :data-id="checkFormData.aclass.id"
              >
                <div
                  v-if="checkFormData.capsuleList.length > 0"
                  class="flex-box "
                >
                  <div
                    v-for="(card, index) of checkFormData.capsuleList"
                    :key="card.capsule.id"
                    class="flex-box add-bg"
                  >
                    <!-- 展示卡片 -->
                    <div
                      v-for="(showIdx, t) in showAllIndex"
                      :key="t + Math.random() * 10 + 1"
                      class="flex-box"
                    >
                      <div v-if="card.capsule.id == showIdx" class="flex-box">
                        <!-- 副卡 -->
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
                                checkFormData.aclass.id
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
                          class="flex-box"
                          :style="crdIdx > 0 ? bigStyle : smallStyle"
                          style="position:relative"
                        >
                          <div class="quote-name-box">
                            <span v-if="crd.group.quoteCreateUserName"
                              >感谢<span>{{
                                crd.group.quoteCreateUserName
                              }}</span
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
                                  crd.activationCard.length == 0
                                    ? 10
                                    : 0
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
                        <!-- 子任务卡 -->
                        <SubTaskCard
                          mode="preview"
                          :originFormData="
                            getSubTaskOriginFormData(card.subTask.id)
                          "
                          :small="true"
                          :protrudeLeftTimeLineLength="card.groupList.length==0? 18:10"
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
                    <!-- 展示折叠卡片 -->
                    <div
                      v-for="(pileIndex, pileIdx) in showHideArr"
                      :key="pileIdx + Math.random() * 10 + 1"
                    >
                      <div v-if="card.capsule.id == pileIndex">
                        <PileCard
                          @dblclick="
                            showAll(card.capsule.id, checkFormData.aclass.id)
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
                          :pileCardAllTime="treeArr[index]"
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
            </div>
            <!-- 滚动条 -->
            <div class="sroll-button-group" v-if="doesNeedScrollButtons">
              <button
                class="scroll-button"
                @mouseenter="handleScrollLeft($event, checkFormData.aclass.id)"
              >
                <a-icon type="double-left" />
              </button>
              <button
                class="scroll-button"
                @mouseenter="handleScrollRight($event, checkFormData.aclass.id)"
              >
                <a-icon type="double-right" />
              </button>
            </div>
          </div>
          <!-- <div class="loading-content" v-if="qualityInfoStatus === 'pending'">
          <a-spin size="large" class="initial-loading-box" />
        </div> -->
          <!-- 弹框区域 -->
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
        <div class="body">
          <!-- 左侧子任务展示区域 -->
          <div class="left-cards">
            <div class="subTaskCardShow">
              <a-tabs type="card" @change="callback" class="custom-tabs">
                <a-tab-pane
                  v-for="(capsule, capsuleIndex) of formatedLeftData"
                  :key="capsuleIndex"
                >
                  <span
                    slot="tab"
                    v-if="capsule.subTaskCardName"
                    class="custom-tabs-wj"
                  >
                    <span class="tab-item-name"
                      ><a-tooltip placement="right">
                        <template slot="title" v-if="isShowTabName">
                          {{ capsule.subTaskCardName }}
                        </template>
                        <div
                          class="add-tab-item-name"
                          ref="tabItemNameRef"
                          @mouseenter="
                            handleShowTabName(capsule.subTaskCardName)
                          "
                          :data-id="capsule.subTaskCardName"
                        >
                          {{ capsule.subTaskCardName }}
                        </div>
                      </a-tooltip>
                    </span>
                  </span>
                  <span slot="tab" v-else class="custom-tabs-wj">
                    子任务{{ capsuleIndex + 1 }}
                  </span>
                  <!-- 展示普通卡片 -->
                  <div class="left-card-container">
                    <div
                      v-for="(item, cardIndex) in capsule.cards"
                      :key="cardIndex"
                    >
                      <component
                        :is="getCardComponent(item.cardType)"
                        :originFormData="
                          getCardOriginFormData(capsuleIndex, cardIndex)
                        "
                        mode="preview"
                        :small="true"
                        style="padding:0 0.5px;display:inline-block;"
                        :interactable="true"
                        :showTimeLine="false"
                        :rightTime="item.endTime"
                        :protrudeLeftTimeLineLength="cardIndex !== 0 ? 1 : 0"
                        :protrudeRightTimeLineLength="
                          cardIndex !== item.length - 1 ? 1 : 0
                        "
                        @dblclick="handlePreview(capsuleIndex, cardIndex)"
                        :scaleNumber="11"
                      />
                    </div>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </div>
          <!-- 右侧评分区域 -->
          <div class="right-box" >
            <div class="box-one" v-if="Object.keys(this.previewList).length>0">
              <div class="preview-header" >
                <!-- 第一行 -->
                <a-row class="row-one">
                  <a-col :span="4" class="col-one">
                    <span>五星教学技巧加权总分</span>
                  </a-col>
                  <!-- 总进度条 -->
                  <a-col :span="20" class="col-two inner-progress">
                    <p class="selectValue " style="color:#45ad8a">{{ previewList.score }}</p>
                    <a-progress
                      :showInfo="false"
                      :percent="(previewList.score * 100) / 45"
                      :format="
                        (percent) => `${((percent / 100) * 45).toFixed(1)}`
                      "
                      :strokeColor="{
                        '0%': '#f5c242',
                        '100%': '#fdf5d8',
                      }"
                    ></a-progress>
                  </a-col>
                </a-row>
                <!-- 第二行 -->
                <a-row class="row-two">
                  <a-col :span="4" class="col-one">
                    <span>授课技巧部分判断结果：</span>
                  </a-col>
                  <a-col :span="20" class="col-two">
                    <a
                      href="#"
                      v-if="previewList.score > 0 && previewList.score < 24"
                      >【讲师授课技巧评价未通过】</a
                    >
                    <a
                      href="#"
                      v-if="
                        (previewList.score > 24 || previewList.score == 24) &&
                          previewList.score < 26
                      "
                      >【讲师授课技巧评价修改PPT通过】</a
                    >
                    <a
                      href="#"
                      v-if="previewList.score > 26 || previewList.score == 26"
                      >【讲师授课技巧评价通过】</a
                    >
                  </a-col>
                </a-row>
              </div>
              <div class="preview-body">
                <!-- 第一个评分模块 -->
                <div class="section-one">
                  <!-- 第一行 -->
                  <a-row class="row-one">
                    <a-col :span="4" class="col-one">
                      {{ getPreviewData(0)[0].evaluationIndex }}
                    </a-col>
                    <a-col :span="17" class="col-two ">
                      {{ getPreviewData(0)[0].indexDescription }}
                    </a-col>
                    <a-col :span="3" class="col-three">
                      自定义权重[默认为{{
                        getPreviewData(0)[0].defaultWeightValue
                      }}]
                    </a-col>
                  </a-row>
                  <!-- 第二行 -->
                  <div class="row-two-box">
                    <a-row class="row-two">
                      <a-col :span="4" class="col-one">
                        {{ target1 }}
                      </a-col>
                      <!-- 总进度条 -->
                      <a-col :span="17" class="col-two">
                        <p class="selectValue">{{ getTotalScore(1) }}</p>
                        <a-progress
                          :showInfo="false"
                          :percent="(getTotalScore(1) * 100) / getMaxTotal(1)"
                          :strokeColor="'#fec012'"
                          :format="
                            (percent) =>
                              `${Math.round((percent / 100) * getMaxTotal(1))}`
                          "
                        >
                        </a-progress>
                      </a-col>
                      <!-- 权重显示框 -->

                      <a-col :span="3" class="col-three">
                        {{ getPreviewData(0)[0].item }}
                      </a-col>
                    </a-row>
                  </div>
                  <!-- 第三行及以下 -->
                  <a-row
                    class="row-three"
                    v-for="(item1, index1) in getPreviewData(1)"
                    :key="index1"
                  >
                    <a-col :span="4" class="col-one">
                      <div>{{ item1.evaluationIndex }}</div>
                    </a-col>
                    <a-col :span="8" class="col-two add-col-two">
                      {{ item1.indexDescription }}
                    </a-col>
                    <a-col :span="9" class="col-three">
                      <!-- 评分显示框 -->
                      {{ item1.item }}
                    </a-col>
                    <a-col :span="3" class="col-four">
                      <!-- 评分进度条 -->
                      <p class="selectValue">{{ item1.score }}</p>
                      <a-progress
                        :percent="(item1.score * 100) / item1.maxScore"
                        :showInfo="false"
                        :strokeColor="'#ffe799'"
                      ></a-progress>
                    </a-col>
                  </a-row>
                </div>
                <!-- 第二个评分模块 -->
                <div class="section-two">
                  <!-- 第一行 -->
                  <a-row class="row-one">
                    <a-col :span="4" class="col-one">
                      {{ getPreviewData(0)[1].evaluationIndex }}
                    </a-col>
                    <a-col :span="17" class="col-two ">
                      {{ getPreviewData(0)[1].indexDescription }}
                    </a-col>
                    <a-col :span="3" class="col-three">
                      自定义权重[默认为{{
                        getPreviewData(0)[1].defaultWeightValue
                      }}]
                    </a-col>
                  </a-row>
                  <!-- 第二行 -->
                  <a-row class="row-two">
                    <a-col :span="4" class="col-one">
                      {{ target2 }}
                    </a-col>
                    <!-- 总分进度条 -->
                    <a-col :span="17" class="col-two">
                      <p class="selectValue">{{ getTotalScore(2) }}</p>
                      <a-progress
                        :showInfo="false"
                        :percent="(getTotalScore(2) * 100) / getMaxTotal(2)"
                        :strokeColor="'#fec012'"
                        :format="
                          (percent) =>
                            `${Math.round((percent / 100) * getMaxTotal(2))}`
                        "
                      >
                      </a-progress>
                    </a-col>
                    <!-- 权重显示框 -->
                    <a-col :span="3" class="col-three">
                      {{ getPreviewData(0)[1].item }}
                    </a-col>
                  </a-row>
                  <!-- 第三行及以下 -->
                  <div class="row-three-box">
                    <a-row
                      class="row-three"
                      v-for="(item1, index1) in getPreviewData(2)"
                      :key="index1"
                    >
                      <a-col :span="4" class="col-one">
                        {{ item1.evaluationIndex }}
                      </a-col>
                      <a-col :span="8" class="col-two add-col-two">
                        {{ item1.indexDescription }}
                      </a-col>
                      <a-col :span="9" class="col-three">
                        <!-- 评分显示框 -->
                        {{ item1.item }}
                      </a-col>
                      <a-col :span="3" class="col-four" v-if="index1 !== 1">
                        <!-- 评分进度条 -->

                        <div v-if="index1 === 0" class="special-box">
                          <p class="selectValue">
                            {{ getTwoItemAverageScore(getPreviewData(2)) }}
                          </p>
                          <a-progress
                            :percent="getTwoItemScorePercent(getPreviewData(2))"
                            :showInfo="false"
                            :strokeColor="'#ffe799'"
                          ></a-progress>
                        </div>
                        <div v-else-if="index1 === 2">
                          <p class="selectValue">{{ item1.score }}</p>
                          <a-progress
                            :percent="(item1.score * 100) / item1.maxScore"
                            :showInfo="false"
                            :strokeColor="'#ffe799'"
                          ></a-progress>
                        </div>
                      </a-col>
                    </a-row>
                  </div>
                </div>
                <!-- 第三个评分模块 -->
                <div class="section-three">
                  <!-- 第一行 -->
                  <a-row class="row-one">
                    <a-col :span="4" class="col-one">
                      {{ getPreviewData(0)[2].evaluationIndex }}
                    </a-col>
                    <a-col :span="17" class="col-two">
                      {{ getPreviewData(0)[2].indexDescription }}
                    </a-col>
                    <a-col :span="3" class="col-three">
                      自定义权重[默认为{{
                        getPreviewData(0)[2].defaultWeightValue
                      }}]
                    </a-col>
                  </a-row>
                  <!-- 第二行 -->
                  <a-row class="row-two">
                    <a-col :span="4" class="col-one">
                      {{ target3 }}
                    </a-col>
                    <!-- 进度条 -->
                    <a-col :span="17" class="col-two">
                      <p class="selectValue">{{ getTotalScore(3) }}</p>
                      <a-progress
                        :showInfo="false"
                        :percent="(getTotalScore(3) * 100) / getMaxTotal(3)"
                        :strokeColor="'#fec012'"
                        :format="
                          (percent) =>
                            `${Math.round((percent / 100) * getMaxTotal(3))}`
                        "
                      >
                      </a-progress>
                    </a-col>
                    <!-- 权重显示框 -->
                    <a-col :span="3" class="col-three">
                      {{ getPreviewData(0)[2].item }}
                    </a-col>
                  </a-row>
                  <!-- 第三行及以下 -->
                  <a-row
                    class="row-three"
                    v-for="(item1, index1) in getPreviewData(3)"
                    :key="index1"
                  >
                    <a-col :span="4" class="col-one">
                      {{ item1.evaluationIndex }}
                    </a-col>
                    <a-col :span="8" class="col-two add-col-two">
                      {{ item1.indexDescription }}
                    </a-col>
                    <a-col :span="9" class="col-three">
                      <!-- 评分显示框 -->
                      {{ item1.item }}
                    </a-col>
                    <a-col :span="3" class="col-four">
                      <!-- 评分进度条 -->
                      <p class="selectValue">{{ item1.score }}</p>
                      <a-progress
                        :percent="(item1.score * 100) / item1.maxScore"
                        :showInfo="false"
                        :strokeColor="'#ffe799'"
                      ></a-progress>
                    </a-col>
                  </a-row>
                </div>
                <!-- 第四个评分模块 -->
                <div class="section-four">
                  <!-- 第一行 -->
                  <a-row class="row-one">
                    <a-col :span="4" class="col-one">
                      {{ getPreviewData(0)[3].evaluationIndex }}
                    </a-col>
                    <a-col :span="17" class="col-two ">
                      {{ getPreviewData(0)[3].indexDescription }}
                    </a-col>
                    <a-col :span="3" class="col-three">
                      自定义权重[默认为{{
                        getPreviewData(0)[3].defaultWeightValue
                      }}]
                    </a-col>
                  </a-row>
                  <!-- 第二行 -->
                  <a-row class="row-two">
                    <a-col :span="4" class="col-one">
                      {{ target4 }}
                    </a-col>
                    <!-- 进度条 -->
                    <a-col :span="17" class="col-two">
                      <p class="selectValue">{{ getTotalScore(4) }}</p>
                      <a-progress
                        :showInfo="false"
                        :percent="(getTotalScore(4) * 100) / getMaxTotal(3)"
                        :strokeColor="'#fec012'"
                        :format="
                          (percent) =>
                            `${Math.round((percent / 100) * getMaxTotal(4))}`
                        "
                      >
                      </a-progress>
                    </a-col>
                    <a-col :span="3" class="col-three">
                      {{ getPreviewData(0)[3].item }}
                    </a-col>
                  </a-row>
                  <!-- 第三行及以下 -->
                  <a-row
                    class="row-three"
                    v-for="(item1, index1) in getPreviewData(4)"
                    :key="index1"
                  >
                    <a-col :span="4" class="col-one">
                      {{ item1.evaluationIndex }}
                    </a-col>
                    <a-col :span="8" class="col-two add-col-two">
                      {{ item1.indexDescription }}
                    </a-col>
                    <a-col :span="9" class="col-three">
                      <!-- 评分显示框 -->
                      {{ item1.item }}
                    </a-col>
                    <a-col :span="3" class="col-four">
                      <!-- 评分进度条 -->
                      <p class="selectValue">{{ item1.score }}</p>
                      <a-progress
                        :percent="(item1.score * 100) / item1.maxScore"
                        :showInfo="false"
                        :strokeColor="'#ffe799'"
                      ></a-progress>
                    </a-col>
                  </a-row>
                </div>
                <!-- 第五个评分模块 -->
                <div class="section-five">
                  <!-- 第一行 -->
                  <a-row class="row-one">
                    <a-col :span="4" class="col-one">
                      {{ getPreviewData(0)[4].evaluationIndex }}
                    </a-col>
                    <a-col :span="17" class="col-two">
                      {{ getPreviewData(0)[4].indexDescription }}
                    </a-col>
                    <a-col :span="3" class="col-three">
                      自定义权重[默认为{{
                        getPreviewData(0)[4].defaultWeightValue
                      }}]
                    </a-col>
                  </a-row>
                  <!-- 第二行 -->
                  <a-row class="row-two">
                    <a-col :span="4" class="col-one">
                      {{ target5 }}
                    </a-col>
                    <!-- 进度条 -->
                    <a-col :span="17" class="col-two">
                      <p class="selectValue">{{ getTotalScore(5) }}</p>
                      <a-progress
                        :showInfo="false"
                        :percent="(getTotalScore(5) * 100) / getMaxTotal(5)"
                        :strokeColor="'#fec012'"
                        :format="
                          (percent) =>
                            `${Math.round((percent / 100) * getMaxTotal(5))}`
                        "
                      >
                      </a-progress>
                    </a-col>
                    <!-- 权重显示框 -->
                    <a-col :span="3" class="col-three">
                      {{ getPreviewData(0)[4].item }}
                    </a-col>
                  </a-row>
                  <!-- 第三行及以下 -->
                  <a-row
                    class="row-three"
                    v-for="(item1, index1) in getPreviewData(5)"
                    :key="index1"
                  >
                    <a-col :span="4" class="col-one">
                      {{ item1.evaluationIndex }}
                    </a-col>
                    <a-col :span="8" class="col-two add-col-two">
                      {{ item1.indexDescription }}
                    </a-col>
                    <a-col :span="9" class="col-three">
                      <!-- 评分显示框 -->
                      {{ item1.item }}
                    </a-col>
                    <a-col :span="3" class="col-four">
                      <!-- 评分进度条 -->
                      <p class="selectValue">{{ item1.score }}</p>
                      <a-progress
                        :percent="(item1.score * 100) / item1.maxScore"
                        :showInfo="false"
                        :strokeColor="'#ffe799'"
                      ></a-progress>
                    </a-col>
                  </a-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="quality-info-loading-wrapper" v-if="qualityInfoStatus === 'pending'|| qualityInfoStatusTab==='pending'">
      <a-spin size="large" />
    </div>
    <div
      v-if="qualityInfoStatus === 'rejected' || qualityInfoStatusTab==='rejected'"
      class="quality-info-loading-failure-wrapper"
    >
      <Result status="500" title="500" sub-title="未找到该课程的评价记录！">
        <template slot="extra">
          <a-button
            type="primary"
            @click="getClassInfos"
            :disabled="qualityInfoStatus === 'pending' || qualityInfoStatusTab==='pending'"
            :loading="qualityInfoStatus === 'pending' || qualityInfoStatusTab==='pending'"
          >
            重新加载
          </a-button>
        </template>
      </Result>
    </div>
  </div>
</template>

<script>
  import {Modal, Tabs,Result,} from 'ant-design-vue';
  import {throttle} from 'lodash-es';
  import Navigation from '@/components/Navigation.vue';
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.css';
  import {IconFont} from '@/configs/scriptURL.js';
  import CapsuleGroup from './canvas/CapsuleGroup.vue';
  import Footer from '@/components/Footer.vue';
  import MainTaskCard from '@/components/MainTaskCard.vue';
  import SubTaskCard from '@/components/SubTaskCard.vue';
  import IntroductionCard from '@/components/IntroductionCard.vue';
  import DescriptionCard from '@/components/DescriptionCard.vue';
  import ApplicationCard from '@/components/ApplicationCard.vue';
  import mainTaskCard from '@/components/mainTaskCard/Preview';
  import SupplementCard from '@/components/SupplementCard.vue';
  import subTaskCard from '@/components/subTaskCard/Preview';
  import introductionCard from '@/components/introductionCard/Preview';
  import descriptionCard from '@/components/descriptionCard/Preview';
  import applicationCard from '@/components/applicationCard/Preview';
  import PileCard from '@/components/PileCard.vue';
  import warning from 'warning';
  import axios from 'axios';
  import {previewData} from '@/api/quality';
  import {createNamespacedHelpers} from 'vuex';
  import {getClassListInfo} from '../api/classes/index';
  const {
    mapActions: canvasMapActions,
    mapMutations: canvasMapMutations,
  } = createNamespacedHelpers('canvas');

  // const apiURL = process.env.VUE_APP_BASE_API;
  // const client = axios.create({baseURL: apiURL});

  export default {
    name: 'QualityPreview',
    data() {
      return {
        current: 1,
        isCardDragging: false,
        name: this.$route.query.name,
        courseId: this.$route.query.courseId,
        hasScrollToLeftMost: true,
        hasScrollToRightMost: true,
        inScrollLockedMode: false,
        doesNeedScrollButtons: false,
        total: 0,
        showTotal: (total) => `共${total}条`,
        pageNum: 1,
        pageSize: 4,
        size: 4,
        startRow: 1,
        endRow: 4,
        pages: 5,
        prePage: 0,
        nextPage: 2,
        tabNum: 2,
        isFirstPage: true,
        isLastPage: false,
        hasPreviousPage: false,
        hasNextPage: true,
        navigatePages: 8,
        navigatepageNums: [1, 2, 3, 4, 5],
        showAllIndex: [], //展开的子卡id
        showIndex: [],
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
        // durationSumTime: [],
        showLoading: false,
        showLoadingId: null,
        canClickOtherBtn: true,
        loadingEnd: false,
        mainTaskData: {},
        subTaskData: {},
        introductionCardData: {},
        applicationCardData: {},
        descriptionCardData: {},
        swiperOption: {
          slidesPerView: 8,
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        },
        small: true,
        // 评分表单数据
        previewList: {},
        // 课程数据
        checkFormData: {},
        isShowName: false,
        isShowTabName: false,
        loadingEndPreview: false,
        qualityInfoStatus: 'idle',
        qualityInfoStatusTab:'idle'
      };
    },
    components: {
      Navigation,
      swiper,
      swiperSlide,
      Footer,
      MainTaskCard: mainTaskCard,
      SubTaskCard: subTaskCard,
      IntroductionCard: introductionCard,
      DescriptionCard: descriptionCard,
      ApplicationCard: applicationCard,
      SupplementCard,
      PileCard,
      AntModal: Modal,
      Result,
    },
    computed: {
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
      formatedLeftData() {
        if (Array.isArray(this.checkFormData?.capsuleList)) {
          return this.checkFormData.capsuleList.map((originCapsule) => {
            const capsule = {
              subTaskCardName: originCapsule?.subTask?.name ?? '',
              cards: [],
            };
            const sortedGroupList = [...originCapsule.groupList].sort(
              (a, b) => a.group.orderNum - b.group.orderNum
            );
            for (const group of sortedGroupList) {
              const sortedActivationCard = [...group.activationCard].sort(
                (a, b) => a.orderNum - b.orderNum
              );
              const sortedDemonstrationCard = [...group.demonstrationCard].sort(
                (a, b) => a.orderNum - b.orderNum
              );
              const sortedApplicationCard = [...group.applicationCard].sort(
                (a, b) => a.orderNum - b.orderNum
              );
              capsule.cards.push(...sortedActivationCard);
              capsule.cards.push(...sortedDemonstrationCard);
              capsule.cards.push(...sortedApplicationCard);
            }
            if (originCapsule.subTask) {
              capsule.cards.push({...originCapsule.subTask, cardType: 4});
            }
            return capsule;
          });
        } else {
          return [];
        }
      },
      activation() {
        return (icontent) => {
          if (icontent.score < 26) {
            return {color: '#08A4C9'};
          } else if (
            icontent.score == 26 ||
            (icontent.score > 26 && icontent.score < 36)
          ) {
            return {color: '#046E72'};
          } else {
            return {color: '#1461A3'};
          }
        };
      },
      target1() {
        console.log(this.getTotalScore(1), this.getMaxTotal(1), '123456');
        if (this.getTotalScore(1) / this.getMaxTotal(1) > 0.6) {
          return '【该模块已达标】';
        }
        return '【该模块未达标】';
      },
      target2() {
        console.log(this.getTotalScore(2), this.getMaxTotal(2), '222');
        if (this.getTotalScore(2) / this.getMaxTotal(2) > 0.6) {
          return '【该模块已达标】';
        }
        return '【该模块未达标】';
      },
      target3() {
        if (this.getTotalScore(3) / this.getMaxTotal(3) > 0.6) {
          return '【该模块已达标】';
        }
        return '【该模块未达标】';
      },
      target4() {
        if (this.getTotalScore(4) / this.getMaxTotal(4) > 0.6) {
          return '【该模块已达标】';
        }
        return '【该模块未达标】';
      },
      target5() {
        if (this.getTotalScore(5) / this.getMaxTotal(5) > 0.6) {
          return '【该模块已达标】';
        }
        return '【该模块未达标】';
      },
    },
    created() {
     
    },
    mounted() {
      this.getClassInfo();
       // 获取预览页面的表格数据
      this.handlePreviewData();
      // 获取预览页面的课程数据
      
      // this.checkFormData = this.$store.state.quality.cardFormData;
      // console.log(this.checkFormData);
      // 获取评分展示数据
      // this.handlePreviewData(this.checkFormData.aclass.id);
      // if (this.checkFormData) {
      //   console.log(this.checkFormData, 'formData');
      //   setTimeout(() => {
      //     this.$nextTick(() => {
      //       this.updateNeedOfScrollButton();
      //       this.updateControlScrollPosistion();
      //     });
      //   }, 500);
      // }
    },
    methods: {
      getClassInfos(){
          this.getClassInfo();
       // 获取预览页面的表格数据
      this.handlePreviewData();
      },
      // 显示tooltip
      handleShowName(id) {
        if (
          this.$refs.classNameBoxRef.scrollWidth >
          this.$refs.classNameBoxRef.clientWidth
        ) {
          this.isShowName = true;
        } else {
          this.isShowName = false;
        }
      },
      getTwoItemAverageScore(item) {
        if (item[0].score > 0 && item[1].score > 0) {
          return (item[0].score + item[1].score) / 2;
        } else {
          return item[0].score || item[1].score;
        }
      },
      getTwoItemScorePercent(item) {
        console.log(this.getTwoItemAverageScore(item),item[2].maxScore,'item')
        return (
          (this.getTwoItemAverageScore(item)  /
            6) *
          100
        );
      },
      handleShowTabName(id) {
        const matcher = this.$refs.tabItemNameRef.find(
          (item) => item.dataset.id == id
        );
        if (matcher.scrollWidth > matcher.clientWidth) {
          this.isShowTabName = true;
        } else {
          this.isShowTabName = false;
        }
      },
      callback() {},
      handleChange() {},
      goBack() {
        this.$router.push({
          path: '/quality',
          query: {
            status: this.$route.query.status,
          },
        });
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
          case 4:
            formData.name = originData.name;
            formData.requirement = originData.specificRequirements;
            formData.teachingFormat = originData.activityTypeId;
            formData.timeCost = originData.dictionaryExcepttimeId;
            break;
          default:
            warning(
              false,
              `<Canvas>:(fetchClassInfo):(getFormData):unknown cardType ${cardType}`
            );
        }

        return formData;
      },
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
      getCardOriginFormData(capsuleIndex, cardIndex) {
        const originalCard = this.formatedLeftData[capsuleIndex].cards[
          cardIndex
        ];
        return this.getFormData(originalCard);
      },
      handlePreview(capsuleIndex, cardIndex) {
        const cardData = this.formatedLeftData[capsuleIndex].cards[cardIndex];
        this.cardInModalOriginFormData = this.getFormData(cardData);
        this.shouldShowDialog = true;
        if (cardData.cardType === 1) {
          this.whichCard = 'IntroductionCard';
        } else if (cardData.cardType === 2) {
          this.whichCard = 'DescriptionCard';
        } else if (cardData.cardType === 3) {
          this.whichCard = 'ApplicationCard';
        } else if (cardData.cardType === 4) {
          this.whichCard = 'subTask';
        }

        // console.log(thus.whichCard);
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

      handleScrollLeft(event, id) {
        let cancelScroll = false;
        const continueScrollLeft = function() {
          if (this.$refs.capsuleGroupContainerRef.scrollLeft > 0) {
            this.$refs.capsuleGroupContainerRef.scrollLeft -= 20;
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
        const continueScrollRight = function() {
          if (
            this.$refs.capsuleGroupContainerRef.scrollLeft <
            this.$refs.capsuleGroupContainerRef.scrollWidth
          ) {
            this.$refs.capsuleGroupContainerRef.scrollLeft += 20;
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
        console.log(this.$refs.capsuleGroupContainerRef, 'ref');
        if (
          this.$refs.capsuleGroupContainerRef.scrollWidth >
          this.$refs.capsuleGroupContainerRef.clientWidth
        ) {
          this.doesNeedScrollButtons = true;
        } else {
          this.doesNeedScrollButtons = false;
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
          case 4:
            return SubTaskCard;
          default:
            throw new Error('unkown type');
        }
      },
      handleDragEnd(customEvent) {
        if (customEvent.newIndex === customEvent.oldIndex) return false;
        console.log(customEvent, 'customEvent');
        const obj = {};
        for (let i = 0; i < this.listData.length; i++) {
          console.log(
            this.listData[customEvent.oldIndex].aclass.id,
            this.listData[customEvent.newIndex].aclass.id
          );
          const moveId = this.listData[customEvent.oldIndex].aclass.id;
          const oldNum = (this.pageNum - 1) * 4 + customEvent.oldIndex + 1;
          const newNum = (this.pageNum - 1) * 4 + customEvent.newIndex + 1;
          obj.oldId = moveId;
          obj.oldNum = oldNum;
          obj.newNum = newNum;
        }
        this.changeClassOrder(obj);
      },
      async goToCanvas() {
        const obj = {};
        obj.courseId = this.courseId;
        const res = await createClass(obj);
        if (res.data.code == 0) {
          this.activateCanvasEditMode();
          this.$router.push(
            `/course/${this.courseId}/class/${res.data.data.classId}/canvas/edit`
          );
        } else {
          this.$message.error(res.data.mesg);
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
      hideEachShow(id, aclassId) {
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
        if (this.canClickOtherBtn == false) {
          this.$message.error('请耐心等待上一步操作完成！');
        } else {
          this.canClickOtherBtn = false;
        }
        const listQuery = {};
        listQuery.id = id;
        const res = await updateEdit(listQuery);
        if (res.data.code == 0) {
          this.canClickOtherBtn = true;
          this.activateCanvasEditMode();
          this.$router.push(`/course/${this.courseId}/class/${id}/canvas/edit`);
        } else {
          this.canClickOtherBtn = true;
          this.$message.error(res.data.mesg);
        }
      },
      async deleCanvas(id) {
        if (this.canClickOtherBtn == false) {
          this.$message.error('请耐心等待上一步操作完成！');
        } else {
          this.canClickOtherBtn = false;
        }
        const listQuery = {};
        listQuery.id = id;
        const res = await deleteClass(listQuery);
        if (res.data.code == 0) {
          this.$message.success('删除成功');
          this.canClickOtherBtn = true;
          this.getClassList();
        } else {
          this.canClickOtherBtn = true;
          this.$message.error(res.data.mesg);
        }
      },
      handleClickDialogMask() {
        this.shouldShowDialog = false;
      },
      // 获取预览表格的特定项数据
      getPreviewData(i) {
        // 返回一个数组

         if (Object.keys(this.previewList).length>0) {
          return this.previewList.scoreDetails?.filter((item) => {
            return item.parentId === i;
          });
         }
      },
      // 计算单个模块评分总和
      getTotalScore(pid) {
        // 返回一个数组
        // console.log(this.getPreviewData(2))
        const scoreArr = this.getPreviewData(pid).map((item) => {
          return item.score;
        });
        if (pid === 2) {
          console.log(scoreArr, 'arr');
          let sum = 0;

          let idx = scoreArr.includes(0);
          console.log(idx);
          if (idx == false) {
            scoreArr.forEach((value, index) => {
              if (index === 0 || index === 1) {
                sum += value;
              } else {
                sum = sum / 2 + value;
              }
            });
            return sum;
          }
          if (idx == true) {
            scoreArr.forEach((value, index) => {
              sum += value;
            });
            return sum;
          }
        }
        return eval(scoreArr.join('+'));
      },
      // 计算单个模块最大评分总和
      getMaxTotal(pid) {
        // 返回一个数组
        const maxArr = this.getPreviewData(pid).map((item) => {
          return item.maxScore;
        });
        if (pid === 2) {
          let sum = 0;
          maxArr.forEach((value, index) => {
            if (index === 0 || index === 1) {
              sum += value;
            } else {
              sum = sum / 2 + value;
            }
          });
          return sum;
        }
        return eval(maxArr.join('+'));
      },

      // 获取预览页面的表格数据
      async handlePreviewData() {
        this.qualityInfoStatusTab = 'pending'
        // console.log(this.$route.query.classId);
        const obj = {};
        obj.classId = this.$route.query.classId;
        // console.log(obj);
        try {
          const response = await previewData(obj);
          if (response.data.code == 0) {
            this.previewList = response.data.data;
            this.qualityInfoStatusTab = 'resolved';
          } else {
            this.qualityInfoStatusTab = 'rejected';
            // this.$message.warning(response.data.mesg);
            
          }
        } catch (error) {}
      },
      // 获取预览页面的课程数据
      async getClassInfo() {
        this.loadingEndPreview = false;
        this.showAllIndex = [];
        this.showHideArr = [];
        this.subTaskAllId = [];
        this.loadingEnd = false;
        const obj = {};
        obj.classId = this.$route.query.classId;
        this.qualityInfoStatus = 'pending'
        console.log(obj);
        try {
          const response = await getClassListInfo(obj);
          if (response.data.code === 0) {
            this.loadingEndPreview = true;
            this.checkFormData = response.data.data.list[0];

            console.log(this.checkFormData);
            let totalTime = 0;
            if (!this.checkFormData.mainTask) {
              this.checkFormData.mainTask = {};
              Object.assign(this.checkFormData.mainTask, {
                beginTime: totalTime,
                endTime: totalTime + 0,
              });
            } else {
              this.checkFormData.mainTask.beginTime = 0;
              this.checkFormData.mainTask.endTime = totalTime + 3;
            }
            totalTime = totalTime + this.checkFormData.mainTask.endTime;
            //胶囊
            this.checkFormData.capsuleList.sort((a, b) => {
              return a.capsule.orderNum - b.capsule.orderNum;
            });
            let mainTaskData = {};
            if (this.checkFormData.capsuleList.length > 0) {
              this.checkFormData.capsuleList.forEach((capsule) => {
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
                //组排序
                capsule.groupList.sort((a, b) => {
                  return a.group.orderNum - b.group.orderNum;
                });
                if (capsule.groupList.length > 0) {
                  capsule.groupList.forEach((group) => {
                    //激活卡排序
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
                  });
                }
                //子任务卡
                if (capsule.subTask == null) {
                  capsule.subTask = {};
                }
                Object.assign(capsule.subTask, {
                  beginTime: totalTime,
                  average: capsule.subTask.average || 0,
                  endTime:
                    capsule.subTask.average > 0
                      ? totalTime + capsule.subTask.average
                      : totalTime,
                });
                totalTime = totalTime + capsule.subTask.average;
                // 组结束时间
                capsule.capsule.endTime = totalTime;
              });
              let obj = {};
              console.log(this.checkFormData, 'this.checkFormDatassss');
              // obj.id = this.checkFormData.aclass.id;
              // obj.time = totalTime;
              // obj.subTaskNum = this.checkFormData.capsuleList.length;
              // this.durationSumTime.push(obj);
              mainTaskData = {
                id: this.checkFormData.mainTask.id,
                name: this.checkFormData.mainTask.name,
                criteria: this.checkFormData.mainTask.finalProduct,
                scene: this.checkFormData.mainTask.designSight,
                timeContent: totalTime,
                numContent: this.checkFormData.capsuleList.length,
              };
            } else {
              mainTaskData = {
                id: this.checkFormData.mainTask.id,
                name: this.checkFormData.mainTask.name,
                criteria: this.checkFormData.mainTask.finalProduct,
                scene: this.checkFormData.mainTask.designSight,
                timeContent: totalTime,
                numContent: 0,
              };
            }
            this.mainTaskFormData.push(mainTaskData);
            if (this.checkFormData) {
              console.log(this.checkFormData, 'data');
              this.$nextTick(() => {
                setTimeout(() => {
                  this.updateNeedOfScrollButton();
                  this.updateControlScrollPosistion();
                }, 300);
              });
            }
            let capsuleListLength = 0;
            const supplementCardRightTime = 4;
            // this.mainTaskData = {
            //   id: this.checkFormData.mainTask.id,
            //   name: this.checkFormData.mainTask.name,
            //   criteria: this.checkFormData.mainTask.finalProduct,
            //   scene: this.checkFormData.mainTask.designSight,
            // };
            // this.mainTaskFormData.push(this.mainTaskData);
            // 有胶囊组
            console.log(this.checkFormData, 'data');
            if (this.checkFormData.capsuleList.length > 0) {
              for (let i = 0; i < this.checkFormData.capsuleList.length; i++) {
                this.subTaskAllId.push(
                  this.checkFormData.capsuleList[i].capsule.id
                );
                if (this.checkFormData.capsuleList[i].subTask == null) {
                  // 如果没有子卡，但是有其他卡，生成空的子卡，
                  let obj = {};
                  obj.id = easyId();
                  obj.average = 0;
                  this.checkFormData.capsuleList[i].subTask = obj;
                }
                // let subTaskData = {};
                this.subTaskData = {
                  id: this.checkFormData.capsuleList[i].subTask.id,
                  name: this.checkFormData.capsuleList[i].subTask.name,
                  requirement: this.checkFormData.capsuleList[i].subTask
                    .specificRequirements,
                  teachingFormat: this.checkFormData.capsuleList[i].subTask
                    .activityTypeId,
                  timeCost: this.checkFormData.capsuleList[i].subTask
                    .dictionaryExcepttimeId,
                };
                this.showIndex.push(
                  this.checkFormData.capsuleList[i].capsule.id
                );
                this.subTaskFormData.push(this.subTaskData);
                if (i == 0) {
                  //默认展示第一个卡片组
                  this.showAllIndex.push(
                    this.checkFormData.capsuleList[i].capsule.id
                  );
                } else {
                  //其他卡片组默认隐藏
                  this.showHideArr.push(
                    this.checkFormData.capsuleList[i].capsule.id
                  );
                }
              }
            }

            // this.total = res.data.data.total;
            // 定义一个二位数组，往组件中传每一行的堆叠的卡片的，各个时间
            // 定义一个二位数组，往数组里存放所有的分钟，作用与堆叠卡下面的刻度线占比

            let averageObj = {};
            for (let j = 0; j < this.checkFormData.capsuleList.length; j++) {
              this.treeArr[j] = new Array();
              let obj = {};
              obj.subTask = this.checkFormData.capsuleList[j].subTask.average;
              obj.secondaryCard = this.checkFormData.capsuleList[
                j
              ].secondaryCard.endTime;
              if (
                this.checkFormData.capsuleList[j].secondaryCard.endTime ==
                this.checkFormData.capsuleList[j].secondaryCard.beginTime
              ) {
                obj.secondaryCard = 0;
              } else {
                obj.secondaryCard = 1.5;
              }
              let activeSum = 0;
              let applicationSum = 0;
              let domensionSum = 0;
              obj.activeSum = activeSum;
              obj.applicationSum = applicationSum;
              obj.domensionSum = domensionSum;
              if (this.checkFormData.capsuleList[j].groupList.length > 0) {
                for (
                  let y = 0;
                  y < this.checkFormData.capsuleList[j].groupList.length;
                  y++
                ) {
                  for (
                    let q = 0;
                    q <
                    this.checkFormData.capsuleList[j].groupList[y]
                      .activationCard.length;
                    q++
                  ) {
                    activeSum += this.checkFormData.capsuleList[j].groupList[y]
                      .activationCard[q].average;
                    //  console.log(activeSum,'activeSum')
                    let activationCardData = {};
                    (activationCardData.introContent = this.checkFormData.capsuleList[
                      j
                    ].groupList[y].activationCard[q].relatedKnowledge),
                      (activationCardData.introFormat = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].activationCard[q].activationTypeId),
                      (activationCardData.timeCost = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].activationCard[q].dictionaryExcepttimeId),
                      (activationCardData.activityContent = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].activationCard[q].content),
                      (activationCardData.id = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].activationCard[q].id),
                      this.activationCardFormData.push(activationCardData);
                  }
                  for (
                    let w = 0;
                    w <
                    this.checkFormData.capsuleList[j].groupList[y]
                      .applicationCard.length;
                    w++
                  ) {
                    applicationSum += this.checkFormData.capsuleList[j]
                      .groupList[y].applicationCard[w].average;
                    let applicationCardData = {};
                    (applicationCardData.how = this.checkFormData.capsuleList[
                      j
                    ].groupList[y].applicationCard[w].practiceId),
                      (applicationCardData.timeCost = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].applicationCard[w].dictionaryExcepttimeId),
                      (applicationCardData.description = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].applicationCard[w].content),
                      (applicationCardData.id = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].applicationCard[w].id),
                      this.applicationCardFormData.push(applicationCardData);
                  }
                  for (
                    let e = 0;
                    e <
                    this.checkFormData.capsuleList[j].groupList[y]
                      .demonstrationCard.length;
                    e++
                  ) {
                    domensionSum += this.checkFormData.capsuleList[j].groupList[
                      y
                    ].demonstrationCard[e].average;
                    let demonstrationCardData = {};

                    (demonstrationCardData.knowledge = this.checkFormData.capsuleList[
                      j
                    ].groupList[y].demonstrationCard[e].knowledgePoint),
                      (demonstrationCardData.how = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].demonstrationCard[e].demonstrationTypeid),
                      (demonstrationCardData.timeCost = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].demonstrationCard[
                        e
                      ].dictionaryExcepttimeId),
                      (demonstrationCardData.description = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].demonstrationCard[e].displayCase),
                      (demonstrationCardData.termExplanation = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].demonstrationCard[e].popularDescription),
                      (demonstrationCardData.id = this.checkFormData.capsuleList[
                        j
                      ].groupList[y].demonstrationCard[e].id),
                      (demonstrationCardData.attachment =
                        this.checkFormData.capsuleList[j].groupList[
                          y
                        ].demonstrationCard[e]?.files?.map((file) => ({
                          id: file.id,
                          status: 'resolved',
                          fileName: file.fileName,
                          url: file.url,
                        })) ?? []),
                      this.demonstrationCardFormData.push(
                        demonstrationCardData
                      );
                  }
                  obj.activeSum = activeSum;
                  obj.applicationSum = applicationSum;
                  obj.domensionSum = domensionSum;
                  this.treeArr[j] = new Array(obj);
                }
              } else {
                this.treeArr[j] = new Array(obj);
              }
            }
           
            this.qualityInfoStatus = 'resolved';
             console.log(this.qualityInfoStatus,'this.qualityInfoStatus')
          } else {
            this.qualityInfoStatus = 'rejected';
            this.$message.warning('获取课程失败');
          }
        } catch (error) {
          this.qualityInfoStatus = 'rejected';
          console.log(error);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .quality-main-box {
    width: 90%;
    margin: 0 auto;
  }
  .col-one,
  .col-two {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .quality-preview-box {
    height: 100%;
    overflow: hidden;
    .custom-tabs {
      overflow: visible;
    }
    // .custom-tabs-wj{
    //   max-width: 142px;
    //   display: inline-block;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   white-space: nowrap;
    // }
    .left-card-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
     align-content: flex-start;
    margin: -10px;
    height: 742px;
    overflow-y: auto;

      & > div {
        padding: 10px;
      }
    }
    .quality-box1 {
      width: 100%;
      margin: 0 auto;
      // padding-top: 1px;
      // margin-top: -1px;
      height: calc(100% - 60px);
      overflow-y: auto;

      .header {
        width: 100%;
        height: 400px;
        margin: 15px auto;
      }
      .body {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin-bottom: 80px;
        // 左侧子任务卡区域
        .left-cards {
          width: 375px;
          flex-shrink: 0;
          // min-height: 888px;
          height: 838px;
          // overflow-y: auto;
          margin-right: 20px;
          padding: 30px;
          background-color: #e8eaec;
          border-radius: 6px;
          .subTaskCardShow {
            width: 100%;
            .tab-item-name {
              max-width: 142px;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              vertical-align: top;
              cursor: pointer;
            }
            .add-tab-item-name {
              max-width: 120px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        // 右侧评分区域
        .right-box {
          flex-grow: 1;
          display: inline-block;
          font-size: 14px;

          .box-one {
            .preview-header {
              border: 2px solid #087b85;
              margin-bottom: 20px;

              .row-one {
                .col-one {
                  height: 30px;
                  line-height: 30px;
                  color: #fff;
                  background-color: #087b85;
                  padding-left: 2px;
                }
                .col-two {
                  height: 30px;
                  .selectValue {
                    width: 100%;
                    text-align: right;
                    height: 30px;
                    line-height: 30px;
                    position: absolute;
                    right: 10px;
                    z-index: 1;
                  }
                }
              }
              .row-two {
                .col-one {
                  height: 30px;
                  line-height: 30px;
                  color: rgb(2, 123, 133);
                  font-weight: 700;
                  background-color: #fff;
                  padding-left: 2px;
                }
                .col-two {
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  background-color: rgb(69, 173, 138);

                  a {
                    color: #fff;
                    text-decoration: underline;
                  }
                }
              }
            }

            .preview-body {
              border: 2px solid #087b85;
              .section-one,
              .section-two,
              .section-three,
              .section-four,
              .section-five {
                .row-one,
                .row-two,
                .row-three {
                  .col-one,
                  .col-two,
                  .col-three,
                  .col-four {
                    border-right: 1px dashed #808080;
                  }
                }

                .row-one {
                  .col-one {
                    height: 30px;
                    line-height: 30px;
                    color: #fff;
                    background-color: #087b85;
                  }
                  .col-two {
                    height: 30px;
                    line-height: 30px;
                    background-color: rgb(208, 206, 206);
                    color: #000;
                    padding-left: 2px;
                  }
                  .col-three {
                    height: 30px;
                    line-height: 30px;
                    color: #fff;
                    text-align: center;
                    background-color: rgb(128, 128, 128);
                  }
                }

                .row-two {
                  .col-one {
                    height: 30px;
                    line-height: 30px;
                    color: #fff;
                    font-weight: 700;
                    text-align: right;
                    background-color: rgb(69, 173, 138);
                  }
                  .col-two {
                    height: 30px;
                    background-color: #fff;
                    border: 2px dashed #62aa8c;
                    .selectValue {
                      width: 100%;
                      text-align: right;
                      height: 30px;
                      line-height: 30px;
                      position: absolute;
                      right: 10px;
                      z-index: 1;
                      font-style: italic;
                      color: #087b85;
                    }
                  }
                  .col-three {
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background-color: #cfcecd;
                    border: 1px dashed #595958;
                  }
                }

                .row-three {
                  // border-bottom: 1px solid #ccc;
                  background-color: #fff;
                  color: #000;

                  .col-one {
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px dashed #d9d9d9;
                  }
                  .col-two {
                    height: 30px;
                    line-height: 30px;
                    border-bottom: 1px dashed #808080;
                    color: #333333;
                  }
                  .col-three {
                    height: 30px;
                    line-height: 30px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    border-bottom: 1px dashed #000000;
                  }
                  .col-four {
                    height: 30px;
                    border-bottom: 1px dashed #d9d9d9;
                    .selectValue {
                      width: 100%;
                      text-align: center;
                      height: 30px;
                      line-height: 30px;
                      position: absolute;
                      z-index: 1;
                      // border-bottom: 1px solid #ccc;
                    }
                  }
                  .special-box {
                    border-bottom: dashed 1px #d9d9d9;
                    .selectValue {
                      width: 100%;
                      text-align: center;
                      height: 60px;
                      line-height: 60px;
                      position: absolute;
                      z-index: 1;
                    }
                  }
                }
              }
              .section-two {
                .row-three {
                  .col-four {
                    border: none;
                  }
                }
              }
            }
          }
        }
      }
    }

    .title {
      height: 50px;
      line-height: 50px;
      // width: 90%;
      // margin: 0 auto;
      // margin-top: 15px;

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
        cursor: pointer;
      }
      .create-btn:hover {
        background-color: #026f76;
      }
    }
    .card {
      width: 128px;
      height: 160px;
      border: 1px solid #999;
    }
    .header {
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
      width: 95%;
      // height: 100%;
      margin: 0 auto;
      // padding-bottom: 30px;
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      // height: calc(100% - 130px);
      // border: 1px solid #afa;
      position: absolute;
    }
    .capsule-draggable-container {
      width: 90%;
      margin: 0 auto;
      height: 100%;
      // min-height:600px;
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
    .top-box {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #000;
      padding-left: 2%;
      padding-top: 6px;
      position: relative;
      .top-box-name {
        display: inline-block;
      }
      .top-box-pic {
        width: 97px;
        height: 25px;
        display: inline-block;
      }
      .class-name-contain-box-preview {
        max-width: 300px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        vertical-align: top;
        cursor: pointer;
      }
      .add-item-aclass-name-preview {
        max-width: 285px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .top-box-status3 {
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
        // float: right;
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
      .check-btn {
        height: 30px;
        margin-top: 70px;
        border: 1px solid #017b83;
        color: #017b83;
      }
    }
    .box-empty {
      width: 100%;
      height: 20px;
      background: #f1f2f6;
    }
  }
</style>
<style lang="scss">
  // .quality-preview-box{
  .ant-row.ant-row.ant-row.ant-row {
    margin-top: 0;
    // height: 34px;
  }
  .row-two {
    // 下拉框的文字样式
    .ant-select-selection-selected-value {
      width: 100%;
      text-align: center;
    }
    // 下拉框的样式
    .ant-select-selection {
      height: 30px;
      background-color: transparent;
      border: none;
      box-shadow: none;
    }
  }

  .row-three {
    // 下拉框选项样式
    .ant-select-selection-selected-value {
      color: #000;
    }
    // 下拉框的样式
    .ant-select-selection {
      height: 30px;
      background-color: transparent;
      border: none;
      box-shadow: none;
    }
  }

  .ant-tabs-nav-container {
    height: 42px;
  }

  .ant-tabs-tab {
    background-color: #fff;
    font-size: 14px;
    font-weight: 700;
    border-radius: 10px;
    padding: 0 10px;
  }
  .ant-tabs-tab-active {
    // color: #fff;
    background-color: red;
  }
  // 下拉框默认为文字样式
  .ant-select-selection__placeholder {
    color: #000;
  }
  // }
</style>
<style lang="scss">
  // .quality-preview-box{
  .quality-box1 {
    .section-two {
      .row-three.ant-row {
        .col-four {
          z-index: 2;
          .ant-progress.ant-progress-line.ant-progress-status-normal.ant-progress-default {
            height: 192%;
          }
        }
      }
    }
    .section-two {
      .row-three.ant-row:first-child {
        .ant-progress-success-bg,
        .ant-progress-bg {
          height: 59px !important;
        }
      }
    }

    .card-style {
      margin: 10px 10px;
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
    width: calc(100% - 88px);
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    padding-top: 32px;
    scrollbar-width: none;
    margin-right: 10px;
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
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    bottom: 10px;
    color: #888888;
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
  .quality-info-loading-wrapper,
  .quality-info-loading-failure-wrapper {
    height: calc(100% - 60px);
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .quote-name-box {
    position: absolute;
    margin-top: -35px;
    left: calc(50% - 40px);
    // height: 20px;
    font-size: 12px;
  }
  // }
  .add-col-two {
    color: #333;
  }
</style>
<style scoped>
  /deep/ .custom-dialog .ant-modal-content {
    border-radius: 28px;
  }
  /deep/
    .subTaskCardShow
    .ant-tabs.ant-tabs-card
    .ant-tabs-card-bar
    .ant-tabs-tab:hover {
    color: #046e72;
  }
  ::v-deep
    .subTaskCardShow
    .ant-tabs.ant-tabs-card
    .ant-tabs-card-bar
    .ant-tabs-tab-active:hover {
    color: #fff;
  }
  ::v-deep .subTaskCardShow .ant-tabs-nav-scroll {
    height: 40px;
    border-bottom: 1px solid #046e72;
  }
  ::v-deep
    .subTaskCardShow
    .ant-tabs.ant-tabs-card
    .ant-tabs-card-bar
    .ant-tabs-tab-active {
    background: #046e72;
    color: #fff;
  }
  ::v-deep
    .subTaskCardShow
    .ant-tabs.ant-tabs-card
    .ant-tabs-card-bar
    .ant-tabs-tab {
    margin-right: 10px;
  }
  ::v-deep .subTaskCardShow .ant-tabs-tab {
    background: #fff;
  }
  ::v-deep .subTaskCardShow .ant-tabs-tab-active .ant-tabs-tab {
    height: 41px;
  }
  ::v-deep
    .subTaskCardShow
    .ant-tabs.ant-tabs-card
    .ant-tabs-card-bar
    .ant-tabs-tab-active {
    font-weight: 600;
    font-size: 16px;
  }
  ::v-deep
    .subTaskCardShow
    .ant-tabs.ant-tabs-card
    .ant-tabs-card-bar
    .ant-tabs-tab {
    font-size: 16px;
  }
  ::v-deep .subTaskCardShow .ant-tabs-nav .ant-tabs-tab .anticon {
    margin-right: 0;
  }
  ::v-deep .inner-progress .ant-progress-inner .ant-progress-bg {
  }
  .inner-progress /deep/ .ant-progress-bg {
    border: 1px solid #f5c242;
    height: 30px !important;
  }
</style>
