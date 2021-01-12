<template>
  <div class="quality-score-container">
    <Navigation />
    <div class="content-show" v-if="qualityInfoStatus === 'resolved'">
      <div class="quality-box">
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
                  <span class="left-route">审核中列表</span>
                  <span style="padding:0 6px;">|</span>
                </span>
              <span class="route no-select">画布清单</span>
            </a-col>
          </a-row>
        </div>
        <div class="each-bg">
          <!-- 画布介绍 -->
          <div class="top-box">
            <span>课堂画布《{{ className }}》</span>
            <div class="top-box-status2" style="color:#046E72">
              <span>
                <span>{{ checkFormData.aclass.createUserName }}老师</span>
              </span>
            </div>
          </div>
          <!-- 画布展示 -->
          <div class="flexs-box">
            <!-- 主任务卡 -->
            <div class="flex-box " style="padding-top:32px;">
              <MainTaskCard
                :originFormData="
                  getMainTaskOriginFormData(mainTaskCardId)
                "
                mode="preview"
                :small="true"
                :interactable="true"
                :showTimeLine="true"
                :leftTime="0"
                :rightTime="mainTaskCardRightTime"
                :showLeftRightDot="true"
                @dblclick="
                  handlePreviewCard('mainTask', mainTaskCardId)
                "
                :protrudeRightTimeLineLength="10"
                :scaleNumber="11"
              />
              <span v-if="checkFormData.capsuleList.length == 0" class="time-unit"
                >(单位:min)</span
              >
            </div>
            <!-- 画布展示 -->
            <!-- <div class="flexs-box"> -->

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
                          hideEachShow(card.capsule.id, checkFormData.aclass.id)
                        "
                        :protrudeRightTimeLineLength="2"
                        :protrudeLeftTimeLineLength="10.5"
                        :scaleNumber="6"
                        :showRightThickScale="true"
                        :showLeftThickScale="true"
                      />
                      </a-tooltip>
                      <div
                        v-for="(crd,crdIdx) in card.groupList"
                        :key="crd.group.id"
                        class="flex-box"
                        :style="crdIdx > 0 ? bigStyle : smallStyle"  style="position:relative"
                      >
                      <div class="quote-name-box">
                          <span v-if="crd.group.quoteCreateUserName"
                            >感谢<span>{{ crd.group.quoteCreateUserName }}</span
                            >的贡献</span
                          >
                        </div>
                        <!-- <div
                          v-for="crd in card.groupList"
                          :key="crd.group.id"
                          class="flex-box"
                        > -->
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
                                childOneIdx==0? 10 : 0
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
                                 crd.activationCard.length == 0? 10 : 0
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
                        <!-- </div> -->
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
                  <span slot="tab" class="custom-tabs-tab">
                    <AntTooltip :title="capsule.subTaskCardName || '未命名'" placement="right">
                    {{ capsule.subTaskCardName || '未命名' }}
                    </AntTooltip>
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
          <div class="right-box">
            <div class="box-one">
              <div class="score-header">
                <!-- 第一行 -->
                <a-row class="row-one">
                  <a-col :span="4" class="col-one">
                    <span>五星教学技巧加权总分</span>
                  </a-col>
                  <!-- 总进度条 -->
                  <a-col :span="20" class="col-two">
                    <p class="selectValue">{{ totalScore.toFixed(2) }}</p>
                    <a-progress v-if="totalScorePercent > 0"
                      class="custom-progress"
                      :showInfo="false"
                      :percent="totalScorePercent"
                      :strokeColor="{from: '#f5c242', to: '#fdf5d8'}"
                    ></a-progress>
                  </a-col>
                </a-row>
                <!-- 第二行 -->
                <a-row class="row-two">
                  <a-col :span="4" class="col-one">
                    <span>授课技巧部分判断结果：</span>
                  </a-col>
                  <a-col :span="20" class="col-two">
                    <a href="#">{{totalResult}}</a>
                  </a-col>
                </a-row>
              </div>
              <div class="score-body">
                <!-- 第一个评分模块 -->
                <div class="section-one">
                  <!-- 第一行 -->
                  <a-row class="row-one">
                    <a-col :span="4" class="col-one">
                      {{ selection(1).evaluationIndex }}
                    </a-col>
                    <a-col :span="17" class="col-two">
                      {{ selection(1).indexDescription }}
                    </a-col>
                    <a-col :span="3" class="col-three">
                      自定义权重[默认为{{ selection(1).defaultWeightValue }}]
                    </a-col>
                  </a-row>
                  <!-- 第二行 -->
                  <div class="row-two-box">
                    <a-row class="row-two">
                      <a-col :span="4" class="col-one">
                        {{ target1 }}
                      </a-col>
                      <!-- 总分进度条 -->
                      <a-col :span="17" class="col-two">
                        <p class="selectValue">{{ itemOneScoreSum }}</p>
                        <a-progress
                          :showInfo="false"
                          :percent="
                            (itemOneScoreSum * 100) /
                              getAllScore(this.selection(1))
                          "
                          :strokeColor="'#f5c242'"
                          :format="
                            (percent) =>
                              `${Math.round(
                                (percent / 100) * getAllScore(this.selection(1))
                              )}`
                          "
                        />
                      </a-col>
                      <!-- 权重选择框 -->
                      <a-col :span="3" class="col-three">
                        <a-select
                          style="width:100%"
                          class="significantSelect"
                          :showArrow="false"
                          v-model="tableDataOne.selectWeight"
                        >
                          <a-select-option
                            v-for="(item, index) in selection(1)
                              .scoreDictionaries"
                            :key="index"
                            :value="item.score"
                            >{{ item.item }}</a-select-option
                          >
                        </a-select>
                      </a-col>
                    </a-row>
                  </div>
                  <!-- 第三行及以下 -->
                  <div class="row-three-box">
                    <a-row
                      class="row-three"
                      v-for="(item1, index1) in selection(1).children"
                      :key="index1"
                    >
                      <a-col :span="4" class="col-one">
                        {{ item1.evaluationIndex }}
                      </a-col>
                      <a-col :span="8" class="col-two">
                        {{ item1.indexDescription }}
                      </a-col>
                      <a-col :span="9" class="col-three">
                        <!-- 评分下拉框 -->
                          <a-select
                            v-model="tableDataOne['selectScore' + index1]"
                            style="width:100%"
                            :showArrow="false"
                          >
                            <a-select-option
                              v-for="(item2, index2) in item1.scoreDictionaries"
                              :key="index2"
                              :value="item2.score"
                            >
                              <AntTooltip :title="item2.item" placement="left">
                                {{ item2.item }}</AntTooltip
                              ></a-select-option
                            >
                          </a-select>
                      </a-col>
                      <a-col :span="3" class="col-four">
                        <!-- 评分进度条 -->
                        <p class="selectValue">
                          {{ tableDataOne['selectScore' + index1] }}
                        </p>
                        <a-progress
                          :percent="
                            (tableDataOne['selectScore' + index1] * 100) /
                              getMaxScore(item1.scoreDictionaries)
                          "
                          :showInfo="false"
                          strokeColor='#fae7a3'
                        ></a-progress>
                      </a-col>
                    </a-row>
                  </div>
                </div>
                <!-- 第二个评分模块 -->
                <div class="section-two">
                  <!-- 第一行 -->
                  <a-row class="row-one">
                    <a-col :span="4" class="col-one">
                      {{ selection(2).evaluationIndex }}
                    </a-col>
                    <a-col :span="17" class="col-two">
                      {{ selection(2).indexDescription }}
                    </a-col>
                    <a-col :span="3" class="col-three">
                      自定义权重[默认为{{ selection(2).defaultWeightValue }}]
                    </a-col>
                  </a-row>
                  <!-- 第二行 -->
                  <div class="row-two-box">
                    <a-row class="row-two">
                      <a-col :span="4" class="col-one">
                        {{ target2 }}
                      </a-col>
                      <!-- 总分进度条 -->
                      <a-col :span="17" class="col-two">
                        <p class="selectValue">{{itemTwoScoreSum}}</p>
                        <a-progress
                          :showInfo="false"
                          :percent="
                            (itemTwoScoreSum * 100) /
                              getAllScore(this.selection(2))
                          "
                          :strokeColor="'#f5c242'"
                          :format="
                            (percent) =>
                              `${Math.round(
                                (percent / 100) * getAllScore(this.selection(2))
                              )}`
                          "
                        >
                        </a-progress>
                      </a-col>
                      <!-- 权重选择框 -->
                      <a-col :span="3" class="col-three">
                        <a-select
                          style="width:100%"
                          class="significantSelect"
                          :showArrow="false"
                          v-model="tableDataTwo.selectWeight"
                        >
                          <a-select-option
                            v-for="(item, index) in selection(2)
                              .scoreDictionaries"
                            :key="index"
                            :value="item.score"
                            >{{ item.item }}</a-select-option
                          >
                        </a-select>
                      </a-col>
                    </a-row>
                  </div>
                  <!-- 第三行及以下 -->
                  <div class="row-three-box">
                    <a-row
                      class="row-three"
                      v-for="(item1, index1) in selection(2).children"
                      :key="index1"
                    >
                      <a-col :span="4" class="col-one">
                        {{ item1.evaluationIndex }}
                      </a-col>
                      <a-col :span="8" class="col-two">
                        {{ item1.indexDescription }}
                      </a-col>
                      <a-col :span="9" class="col-three">
                        <!-- 评分下拉框 -->
                        <a-select
                          v-model="tableDataTwo['selectScore' + index1]"
                          style="width:100%"
                          :showArrow="false"
                        >
                          <a-select-option
                            v-for="(item2, index2) in item1.scoreDictionaries"
                            :key="index2"
                            :value="item2.score"
                          >
                            <AntTooltip :title="item2.item" placement="left">
                              {{ item2.item }}</AntTooltip
                            ></a-select-option
                          >
                        </a-select>
                      </a-col>
                      <a-col :span="3" class="col-four" v-if = "index1 !== 1">
                       <div v-if = "index1 === 0" class="special-box">
                          <!-- 评分进度条 -->
                        <p class="selectValue">
                          {{ getTwoItemAverageScore(tableDataTwo.selectScore0 , tableDataTwo.selectScore1 ) }}
                        </p>
                        <a-progress
                          :percent="getTwoItemScorePercent(tableDataTwo.selectScore0, tableDataTwo.selectScore1, item1.scoreDictionaries)"
                          :showInfo="false"
                          strokeColor="#fae7a3"
                        ></a-progress>
                       </div>
                       <div v-else-if = "index1 === 2">
                           <p class="selectValue">
                          {{ tableDataTwo['selectScore' + index1] }}
                        </p>
                        <a-progress
                          :percent="
                            (tableDataTwo['selectScore' + index1] * 100) /
                              getMaxScore(item1.scoreDictionaries)
                          "
                          :showInfo="false"
                          strokeColor="#fae7a3"
                        ></a-progress>
                       </div>
                        <!-- <a-progress
                        v-if = "index1 === 0"
                          :percent="
                             ((tableDataTwo.selectScore0 + tableDataTwo.selectScore1)/2 * 100) /
                              getMaxScore(item1.scoreDictionaries)*2
                          "
                          :showInfo="false"
                          :strokeColor="'#f5c242'"
                        ></a-progress> -->
                      </a-col>
                    </a-row>
                  </div>
                </div>
                <!-- 第三个评分模块 -->
                <div class="section-three">
                  <!-- 第一行 -->
                  <a-row class="row-one">
                    <a-col :span="4" class="col-one">
                      {{ selection(3).evaluationIndex }}
                    </a-col>
                    <a-col :span="17" class="col-two">
                      {{ selection(3).indexDescription }}
                    </a-col>
                    <a-col :span="3" class="col-three">
                      自定义权重[默认为{{ selection(3).defaultWeightValue }}]
                    </a-col>
                  </a-row>
                  <!-- 第二行 -->
                  <div class="row-two-box">
                    <a-row class="row-two">
                      <a-col :span="4" class="col-one">
                        {{ target3 }}
                      </a-col>
                      <!-- 进度条 -->
                      <a-col :span="17" class="col-two">
                        <p class="selectValue">{{itemThreeScoreSum}}</p>
                        <a-progress
                          :showInfo="false"
                          :percent="
                            (itemThreeScoreSum * 100) /
                              getAllScore(this.selection(3))
                          "
                          :strokeColor="'#f5c242'"
                          :format="
                            (percent) =>
                              `${Math.round(
                                (percent / 100) * getAllScore(this.selection(3))
                              )}`
                          "
                        >
                        </a-progress>
                      </a-col>
                      <a-col :span="3" class="col-three">
                        <a-select
                          style="width:100%"
                          class="significantSelect"
                          :showArrow="false"
                          v-model="tableDataThree.selectWeight"
                        >
                          <a-select-option
                            v-for="(item, index) in selection(3)
                              .scoreDictionaries"
                            :key="index"
                            :value="item.score"
                            >{{ item.item }}</a-select-option
                          >
                        </a-select>
                      </a-col>
                    </a-row>
                  </div>
                  <!-- 第三行及以下 -->
                  <div class="row-three-box">
                    <a-row
                      class="row-three"
                      v-for="(item1, index1) in selection(3).children"
                      :key="index1"
                    >
                      <a-col :span="4" class="col-one">
                        {{ item1.evaluationIndex }}
                      </a-col>
                      <a-col :span="8" class="col-two">
                        {{ item1.indexDescription }}
                      </a-col>
                      <a-col :span="9" class="col-three">
                        <!-- 评分下拉框 -->
                        <a-select
                          v-model="tableDataThree['selectScore' + index1]"
                          style="width:100%"
                          :showArrow="false"
                        >
                          <a-select-option
                            v-for="(item2, index2) in item1.scoreDictionaries"
                            :key="index2"
                            :value="item2.score"
                          >
                            <AntTooltip :title="item2.item" placement="left">
                              {{ item2.item }}</AntTooltip
                            ></a-select-option
                          >
                        </a-select>
                      </a-col>
                      <a-col :span="3" class="col-four">
                        <!-- 评分进度条 -->
                        <p class="selectValue">
                          {{ tableDataThree['selectScore' + index1] }}
                        </p>
                        <a-progress
                          :percent="
                            (tableDataThree['selectScore' + index1] * 100) /
                              getMaxScore(item1.scoreDictionaries)
                          "
                          :showInfo="false"
                          strokeColor="#fae7a3"
                        ></a-progress>
                      </a-col>
                    </a-row>
                  </div>
                </div>
                <!-- 第四个评分模块 -->
                <div class="section-four">
                  <!-- 第一行 -->
                  <a-row class="row-one">
                    <a-col :span="4" class="col-one">
                      {{ selection(4).evaluationIndex }}
                    </a-col>
                    <a-col :span="17" class="col-two">
                      {{ selection(4).indexDescription }}
                    </a-col>
                    <a-col :span="3" class="col-three">
                      自定义权重[默认为{{ selection(4).defaultWeightValue }}]
                    </a-col>
                  </a-row>
                  <!-- 第二行 -->
                  <div class="row-two-box">
                    <a-row class="row-two">
                      <a-col :span="4" class="col-one">
                        {{ target4 }}
                      </a-col>
                      <!-- 进度条 -->
                      <a-col :span="17" class="col-two">
                        <p class="selectValue">{{itemFourScoreSum}}</p>
                        <a-progress
                          :showInfo="false"
                          :percent="
                            (itemFourScoreSum * 100) /
                              getAllScore(this.selection(4))
                          "
                          :strokeColor="'#f5c242'"
                          :format="
                            (percent) =>
                              `${Math.round(
                                (percent / 100) * getAllScore(this.selection(4))
                              )}`
                          "
                        >
                        </a-progress>
                      </a-col>
                      <a-col :span="3" class="col-three">
                        <a-select
                          style="width:100%"
                          class="significantSelect"
                          :showArrow="false"
                          v-model="tableDataFour.selectWeight"
                        >
                          <a-select-option
                            v-for="(item, index) in selection(4)
                              .scoreDictionaries"
                            :key="index"
                            :value="item.score"
                            >{{ item.item }}</a-select-option
                          >
                        </a-select>
                      </a-col>
                    </a-row>
                  </div>
                  <!-- 第三行及以下 -->
                  <div class="row-three-box">
                    <a-row
                      class="row-three"
                      v-for="(item1, index1) in selection(4).children"
                      :key="index1"
                    >
                      <a-col :span="4" class="col-one">
                        {{ item1.evaluationIndex }}
                      </a-col>
                      <a-col :span="8" class="col-two">
                        {{ item1.indexDescription }}
                      </a-col>
                      <a-col :span="9" class="col-three">
                        <!-- 评分下拉框 -->
                        <a-select
                          v-model="tableDataFour['selectScore' + index1]"
                          style="width:100%"
                          :showArrow="false"
                        >
                          <a-select-option
                            v-for="(item2, index2) in item1.scoreDictionaries"
                            :key="index2"
                            :value="item2.score"
                          >
                            <AntTooltip :title="item2.item" placement="left">
                              {{ item2.item }}</AntTooltip
                            ></a-select-option
                          >
                        </a-select>
                      </a-col>
                      <a-col :span="3" class="col-four">
                        <!-- 评分进度条 -->
                        <p class="selectValue">
                          {{ tableDataFour['selectScore' + index1] }}
                        </p>
                        <a-progress
                          :percent="
                            (tableDataFour['selectScore' + index1] * 100) /
                              getMaxScore(item1.scoreDictionaries)
                          "
                          :showInfo="false"
                          strokeColor="#fae7a3"
                        ></a-progress>
                      </a-col>
                    </a-row>
                  </div>
                </div>
                <!-- 第五个评分模块 -->
                <div class="section-five">
                  <!-- 第一行 -->
                  <a-row class="row-one">
                    <a-col :span="4" class="col-one">
                      {{ selection(5).evaluationIndex }}
                    </a-col>
                    <a-col :span="17" class="col-two">
                      {{ selection(5).indexDescription }}
                    </a-col>
                    <a-col :span="3" class="col-three">
                      自定义权重[默认为{{ selection(5).defaultWeightValue }}]
                    </a-col>
                  </a-row>
                  <!-- 第二行 -->
                  <div class="row-two-box">
                    <a-row class="row-two">
                      <a-col :span="4" class="col-one">
                        {{ target5 }}
                      </a-col>
                      <!-- 进度条 -->
                      <a-col :span="17" class="col-two">
                        <p class="selectValue">{{itemFiveScoreSum}}</p>
                        <a-progress
                          :showInfo="false"
                          :percent="
                            (itemFiveScoreSum * 100) /
                              getAllScore(this.selection(5))
                          "
                          :strokeColor="'#f5c242'"
                          :format="
                            (percent) =>
                              `${Math.round(
                                (percent / 100) * getAllScore(this.selection(5))
                              )}`
                          "
                        >
                        </a-progress>
                      </a-col>
                      <!-- 权重下拉框 -->
                      <a-col :span="3" class="col-three">
                        <a-select
                          style="width:100%"
                          class="significantSelect"
                          :showArrow="false"
                          v-model="tableDataFive.selectWeight"
                        >
                          <a-select-option
                            v-for="(item, index) in selection(5)
                              .scoreDictionaries"
                            :key="index"
                            :value="item.score"
                            >{{ item.item }}</a-select-option
                          >
                        </a-select>
                      </a-col>
                    </a-row>
                  </div>
                  <!-- 第三行及以下 -->
                  <div class="row-three-box">
                    <a-row
                      class="row-three"
                      v-for="(item1, index1) in selection(5).children"
                      :key="index1"
                    >
                      <a-col :span="4" class="col-one">
                        {{ item1.evaluationIndex }}
                      </a-col>
                      <a-col :span="8" class="col-two">
                        {{ item1.indexDescription }}
                      </a-col>
                      <a-col :span="9" class="col-three">
                        <!-- 第一个下拉框 -->
                        <a-select
                          v-model="tableDataFive['selectScore' + index1]"
                          style="width:100%"
                          :showArrow="false"
                        >
                          <a-select-option
                            v-for="(item2, index2) in item1.scoreDictionaries"
                            :key="index2"
                            :value="item2.score"
                          >
                            <AntTooltip :title="item2.item" placement="left">
                              {{ item2.item }}</AntTooltip
                            ></a-select-option
                          >
                        </a-select>
                      </a-col>
                      <a-col :span="3" class="col-four">
                        <!-- 评分进度条 -->
                        <p class="selectValue">
                          {{ tableDataFive['selectScore' + index1] }}
                        </p>
                        <a-progress
                          :percent="
                            (tableDataFive['selectScore' + index1] * 100) /
                              getMaxScore(item1.scoreDictionaries)
                          "
                          :showInfo="false"
                          strokeColor="#fae7a3"
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
      <!-- 底部提交区域 -->
      <div class="btn-container">
        <button class="submit-btn" @click="handleTableSubmit">提交</button>
        <!-- <a-modal title="确认提交" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel" centered width="500px" height="300px" :closable="false">
        <p>提交{{ checkFormData.aclass.createUserName }}老师的分数吗</p>
      </a-modal> -->
        <a-modal
          v-model="visible"
          title="确认提交"
          on-ok="handleOk"
          centered
          :closable="false"
        >
          <template slot="footer">
            <a-button key="back" @click="handleCancel" :disabled="submitStatus === 'pending'">
              取消
            </a-button>
            <a-button
              class="custom-submit-button"
              key="submit"
              type="primary"
              :loading="submitStatus === 'pending'"
              :disabled="submitStatus === 'pending'"
              @click="handleOk"
            >
              确认
            </a-button>
          </template>
          <p>提交{{ checkFormData.aclass.createUserName }}老师《{{checkFormData.aclass.name}}》的分数吗</p>
        </a-modal>
      </div>
    </div>
    <div
      v-if="qualityInfoStatus === 'pending'"
      class="quality-info-loading-wrapper"
    >
      <AntSpin size="large" />
    </div>
    <div
      v-if="qualityInfoStatus === 'rejected'"
      class="quality-info-loading-failure-wrapper"
    >
      <AntResult status="500" title="500" sub-title="服务器出错啦！">
        <template slot="extra">
          <AntButton
            type="primary"
            @click="getClassInfo"
            :disabled="qualityInfoStatus === 'pending'"
            :loading="qualityInfoStatus === 'pending'"
          >
            重新加载
          </AntButton>
        </template>
      </AntResult>
    </div>
  </div>
  </div>
</template>

<script>
  import {message, Modal, Tabs, Tooltip, Result, Spin, Button} from 'ant-design-vue';
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
  import quality from '../store/modules/quality';
  import warning from 'warning';
  import {
    getClassListInfo,
    updateEdit,
    updateStatus,
    deleteClass,
    createClass,
    publishClass,
  } from '@/api/classes/index.js';
  import {createNamespacedHelpers, mapState} from 'vuex';
  import {CANVAS_MUTATIONS} from '@/store/modules/canvas';
  import 'swiper/dist/css/swiper.css';
  import Footer from '@/components/Footer.vue';
  import mainTaskCard from '@/components/mainTaskCard/Preview';
  import subTaskCard from '@/components/subTaskCard/Preview';
  import introductionCard from '../components/introductionCard/Preview';
  import descriptionCard from '../components/descriptionCard/Preview';
  import applicationCard from '../components/applicationCard/Preview';
  import axios from 'axios';
  import {qualityInfo, tableDataSubmit, previewData} from '@/api/quality';

  export default {
    name: 'QualityScore',
    data() {
      return {
        leftPreviewCard: null,
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
        mainTaskData: {},
        subTaskData: {},
        introductionCardData: {},
        applicationCardData: {},
        descriptionCardData: {},
        showList: [],
        tableDataOne: {
          selectWeight: 0,
          selectScore0: 0,
          selectScore1: 0,
          selectScore2: 0,
          allScore: 0,
        },
        tableDataTwo: {
          selectWeight: 0,
          selectScore0: 0,
          selectScore1: 0,
          selectScore2: 0,
          allScore: 0,
        },
        tableDataThree: {
          selectWeight: 0,
          selectScore0: 0,
          selectScore1: 0,
          selectScore2: 0,
          allScore: 0,
        },
        tableDataFour: {
          selectWeight: 0,
          selectScore0: 0,
          selectScore1: 0,
          selectScore2: 0,
          allScore: 0,
        },
        tableDataFive: {
          selectWeight: 0,
          selectScore0: 0,
          selectScore1: 0,
          selectScore2: 0,
          allScore: 0,
        },
        visible: false,
        loading: false,
        swiperOption: {
          slidesPerView: 8,
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        },
        small: true,
        confirmLoading: false,
        checkFormData:{},
        qualityInfoStatus: 'idle',
        submitStatus: 'idle',
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
      AntTooltip: Tooltip,
      AntResult: Result,
      AntSpin: Spin,
      AntButton: Button
    },
    computed: {
      className() {
        const originClassName = this.checkFormData?.aclass?.name;
        if (originClassName) {
          if (originClassName.length > 25) {
            return originClassName.substr(0, 26) + '...'
          } else {
            return originClassName;
          }
        } else {
          return ''
        }
      },
      classCreatedBy() {
        const originAuthor = this.checkFormData?.aclass?.name;
        if (originAuthor) {
          if (originAuthor.length > 25) {
            return originAuthor.substr(0, 26)
          } else {
            return originAuthor;
          }
        } else {
          return ''
        }
      },
      mainTaskCardId() {
        return this?.checkFormData?.mainTask?.id;
      },
      mainTaskCardRightTime() {
        return this.checkFormData?.mainTask?.endTime ?? 0;
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
      totalResult() {
        if([this.target1,this.target2,this.target3,this.target4,this.target5].some(pass => pass === '【评价未完成】')) {
          return '【讲师授课技巧评价未完成】'
        } else if (this.totalScore < 24) {
          return '【讲师授课技巧评价未通过】'
        } else if (this.totalScore >= 24 && this.totalScore < 26) {
          return '【讲师授课技巧评价修改PPT后通过】'
        } else {
          return '【讲师授课技巧评价通过】'
        }
      },
      totalScore() {
        return (this.itemOneScoreSum * this.tableDataOne.selectWeight +
              this.itemTwoScoreSum * this.tableDataTwo.selectWeight +
              this.itemThreeScoreSum * this.tableDataThree.selectWeight +
              this.itemFourScoreSum * this.tableDataFour.selectWeight +
              this.itemFiveScoreSum * this.tableDataFive.selectWeight) /
              (this.tableDataOne.selectWeight +
              this.tableDataTwo.selectWeight +
              this.tableDataThree.selectWeight +
              this.tableDataFour.selectWeight +
              this.tableDataFive.selectWeight) *
              5;
      },
      totalScorePercent() {
        return this.totalScore /
              ((this.getAllScore(this.selection(1)) * this.tableDataOne.selectWeight +
              this.getAllScore(this.selection(2))* this.tableDataTwo.selectWeight +
              this.getAllScore(this.selection(3)) * this.tableDataThree.selectWeight +
              this.getAllScore(this.selection(4)) * this.tableDataFour.selectWeight +
              this.getAllScore(this.selection(5)) * this.tableDataFive.selectWeight) /
              (this.tableDataOne.selectWeight +
              this.tableDataTwo.selectWeight +
              this.tableDataThree.selectWeight +
              this.tableDataFour.selectWeight +
              this.tableDataFive.selectWeight) *
              5) * 100;
      },
      itemOneScoreSum() {
        return this.tableDataOne.selectScore0 +
              this.tableDataOne.selectScore1 +
              this.tableDataOne.selectScore2;
      },
      itemTwoScoreSum() {
        return this.getTwoItemAverageScore(this.tableDataTwo.selectScore0, this.tableDataTwo.selectScore1) +
              this.tableDataTwo.selectScore2;
      },
      itemThreeScoreSum() {
        return this.tableDataThree.selectScore0 +
              this.tableDataThree.selectScore1 +
              this.tableDataThree.selectScore2;
      },
      itemFourScoreSum() {
        return this.tableDataFour.selectScore0 +
              this.tableDataFour.selectScore1 +
              this.tableDataFour.selectScore2;
      },
      itemFiveScoreSum() {
        return this.tableDataFive.selectScore0 +
              this.tableDataFive.selectScore1 +
              this.tableDataFive.selectScore2;
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
              capsule.cards.push({...originCapsule.subTask, cardType: 4})
            }
            return capsule;
          });
        } else {
          return [];
        }
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
      target1() {
        if (this.tableDataOne.selectScore0 && this.tableDataOne.selectScore1 && this.tableDataOne.selectScore2) {
          if (
            this.itemOneScoreSum / this.getAllScore(this.selection(1)) >
            0.6
          ) {
            return '【该模块已达标】';
          } else {
            return '【该模块未达标】';
          }
        } else {
          return '【评价未完成】'
        }
      },
      target2() {
        if ((this.tableDataTwo.selectScore0 || this.tableDataTwo.selectScore1) && this.tableDataTwo.selectScore2) {
          if (
            this.itemTwoScoreSum / this.getAllScore(this.selection(2)) >
            0.6
          ) {
            return '【该模块已达标】';
          } else {
            return '【该模块未达标】';
          }
        } else {
          return '【评价未完成】'
        }
      },
      target3() {
        if (this.tableDataThree.selectScore0 && this.tableDataThree.selectScore1 && this.tableDataThree.selectScore2) {
          if (
            this.itemThreeScoreSum / this.getAllScore(this.selection(3)) >
            0.6
          ) {
            return '【该模块已达标】';
          } else {
            return '【该模块未达标】';
          }
        } else {
          return '【评价未完成】'
        }
      },
      target4() {
        if (this.tableDataFour.selectScore0 && this.tableDataFour.selectScore1 && this.tableDataFour.selectScore2) {
          if (
            this.itemFourScoreSum / this.getAllScore(this.selection(4)) >
            0.6
          ) {
            return '【该模块已达标】';
          } else {
            return '【该模块未达标】';
          }
        } else {
          return '【评价未完成】'
        }
      },
      target5() {
        if (this.tableDataFive.selectScore0 && this.tableDataFive.selectScore1 && this.tableDataFive.selectScore2) {
          if (
            this.itemFiveScoreSum / this.getAllScore(this.selection(5)) >
            0.6
          ) {
            return '【该模块已达标】';
          } else {
            return '【该模块未达标】';
          }
        } else {
          return '【评价未完成】'
        }
      },
    },
    created() {
      // 获取评分表单的展示数据
      this.handleShow();
      this.getClassInfo()
    },
    methods: {
      getTwoItemAverageScore(scoreA, scoreB) {
        if (scoreA && scoreB) {
          return (scoreA + scoreB) / 2;
        } else {
          return scoreA || scoreB;
        }
      },
      getTwoItemScorePercent(scoreA, scoreB, dictionary) {
        const score = this.getTwoItemAverageScore(scoreA, scoreB);
        const highestScore = dictionary.reduce((acc ,cur) => acc > cur.score ? acc : cur.score, 0);
        return score / highestScore * 100;
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
            formData.name =  originData.name;
            formData.requirement= originData.specificRequirements;
            formData.teachingFormat= originData.activityTypeId;
            formData.timeCost= originData.dictionaryExcepttimeId;
            break;
          default:
            warning(
              false,
              `<Canvas>:(fetchClassInfo):(getFormData):unknown cardType ${cardType}`
            );
        }

        return formData;
      },
      goBack() {
        this.$router.push({
          path: '/quality',
          query: {status: this.$route.query.status},
        });
      },
      getMainTaskOriginFormData(cardId) {
        if (cardId) {
          return this.mainTaskFormData.find((mainTask) => mainTask.id === cardId);
        } else {
          return {}
        }
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
        switch (cardData.cardType) {
          case 1:
            this.whichCard = 'IntroductionCard';
            break;
          case 2:
            this.whichCard = 'DescriptionCard';
            break;
          case 3:
            this.whichCard = 'ApplicationCard';
            break;
          case 4:
            this.whichCard = 'subTask';
            break;
          default:
            warning(false, `<QualityScore>:(handlePreview)未知的卡片类型:${cardData.cardType}`)
        }
      },
      // 双击预览卡片的数据
      handlePreviewCard(cardType, cardId) {
        this.cardInModalOriginFormData = {};
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
      async getClassInfo() {
        this.showAllIndex = [];
        this.showHideArr = [];
        this.subTaskAllId = [];
        const obj ={};
        obj.classId = this.$route.query.classId;
        this.qualityInfoStatus = 'pending'
        try {
          const response = await getClassListInfo(obj);
        if (response.status === 200 && response.data.code === 0) {
          this.checkFormData = response.data.data.list[0]
          let totalTime = 0;
          if (!this.checkFormData.mainTask) {
            this.checkFormData.mainTask = {};
            Object.assign(this.checkFormData.mainTask, {
                beginTime: totalTime,
                endTime: totalTime + 0,
              });
          }else{
             this.checkFormData.mainTask.beginTime = 0;
              this.checkFormData.mainTask.endTime = totalTime + 3;
          }
           totalTime = totalTime + this.checkFormData.mainTask.endTime;
          //总任务卡时间
          // Object.assign(this.checkFormData.mainTask, {
          //   beginTime: totalTime,
          //   endTime: totalTime + 3,
          // });
          // totalTime = totalTime + 3;
          //胶囊
          this.checkFormData.capsuleList.sort((a, b) => {
            return a.capsule.orderNum - b.capsule.orderNum;
          });
          let mainTaskData={};
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
            mainTaskData = {
                id: this.checkFormData.mainTask.id,
                name: this.checkFormData.mainTask.name,
                criteria: this.checkFormData.mainTask.finalProduct,
                scene: this.checkFormData.mainTask.designSight,
                timeContent: totalTime,
                numContent: this.checkFormData.capsuleList.length,
              };
          }else{
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
              this.showIndex.push(this.checkFormData.capsuleList[i].capsule.id);
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
            let obj = {};
            this.treeArr[j] = new Array();
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
              if (this.checkFormData.capsuleList[j].groupList.length > 0) {
            for (
              let y = 0;
              y < this.checkFormData.capsuleList[j].groupList.length;
              y++
            ) {
              for (
                let q = 0;
                q <
                this.checkFormData.capsuleList[j].groupList[y].activationCard
                  .length;
                q++
              ) {
                activeSum += this.checkFormData.capsuleList[j].groupList[y]
                  .activationCard[q].average;
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
                this.checkFormData.capsuleList[j].groupList[y].applicationCard
                  .length;
                w++
              ) {
                applicationSum += this.checkFormData.capsuleList[j].groupList[y]
                  .applicationCard[w].average;
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
                this.checkFormData.capsuleList[j].groupList[y].demonstrationCard
                  .length;
                e++
              ) {
                domensionSum += this.checkFormData.capsuleList[j].groupList[y]
                  .demonstrationCard[e].average;
                let demonstrationCardData = {};

                (demonstrationCardData.knowledge = this.checkFormData.capsuleList[
                  j
                ].groupList[y].demonstrationCard[e].knowledgePoint),
                  (demonstrationCardData.how = this.checkFormData.capsuleList[
                    j
                  ].groupList[y].demonstrationCard[e].demonstrationTypeid),
                  (demonstrationCardData.timeCost = this.checkFormData.capsuleList[
                    j
                  ].groupList[y].demonstrationCard[e].dictionaryExcepttimeId),
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
                  this.demonstrationCardFormData.push(demonstrationCardData);
              }
               obj.activeSum = activeSum;
              obj.applicationSum = applicationSum;
              obj.domensionSum = domensionSum;
              this.treeArr[j] = new Array(obj);
            }
             
            }else{
              this.treeArr[j] = new Array(obj);
            }
          }
          this.qualityInfoStatus = 'resolved';
        } else {
          this.qualityInfoStatus = 'rejected';
           this.$message.warning('获取课程失败');
          }
        } catch (error) {
          this.qualityInfoStatus = 'rejected';
        }
      },

      handleScrollLeft(event, id) {
        let cancelScroll = false;
        // const matchedContainer = this.$refs.capsuleGroupContainerRef.find((elm) => elm.dataset.id == id);
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
        // const matchedContainer = this.$refs.capsuleGroupContainerRef.find((elm) => elm.dataset.id == id);
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
        if (
          this.$refs.capsuleGroupContainerRef.scrollWidth >
          this.$refs.capsuleGroupContainerRef.clientWidth
        ) {
          this.doesNeedScrollButtons = true;
        }else{
          this.doesNeedScrollButtons = false;
        }
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
          case 4:
            return SubTaskCard
          default:
            throw new Error('unkown type');
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
      handleClickDialogMask() {
        this.shouldShowDialog = false;
      },
      callback() {},
      // 获取对应评分项的数据
      selection(i) {
        const selectionReturn =
          this.showList?.filter((item) => {
            return item.id === i;
          })?.[0] ?? {};
        return selectionReturn;
      },
      // 获取单个评分选择框分数的最大值
      getMaxScore(selectItem) {
        const maxScore = selectItem.map((item) => {
          return item.score;
        });
        return Math.max(...maxScore);
      },
      // 获取评分选择框各项最大值的和
      getAllScore(selectItem) {
        if (Array.isArray(selectItem.children)) {
          const maxArr = selectItem.children.map((val) => {
            return this.getMaxScore(val.scoreDictionaries);
          });
          if (selectItem.id === 2) {
            let sum = 0;
            maxArr.forEach((value, index) => {
              if (index === 0 || index === 1) {
                sum += value;
              } else {
                sum = sum / 2 + value;
              }
            });
            return sum;
          } else {
            return maxArr.reduce((acc, cur) => acc + cur, 0);
          }
        } else {
          0;
        }
      },
      // 获取选中的评分或权重项对应的对象信息
      getSelectInfo(selectItem, weightItem) {
        return selectItem.filter((item) => {
          return item.score === weightItem;
        })[0];
      },
      // 页面加载时获取评分表格的数据
      async handleShow() {
        try {
          const response = await qualityInfo();
          if (response.status === 200 && response.data.code === 0) {
            this.showList = response.data.data;
            const dataMapper = ['One', 'Two', 'Three', 'Four', 'Five']
            for (const [index, selectData] of this.showList.entries()) {
              this['tableData' + dataMapper[index]].selectWeight = selectData.defaultWeightValue;
            }
          }
        } catch (error) {}
      },
      // 点击提交按钮时将数据传递到后台
      async handleTableSubmit() {
        if (this.totalResult === '【讲师授课技巧评价未完成】') {
          message.warn('讲师授课技巧评价未完成')
          return;
        }
        this.visible = true;
      },
      async handleOk() {
        try {
          const tableData = {
            classId: this.checkFormData.aclass.id,
            score: this.totalScore.toFixed(2),
            detailList: [
              {
                auditId: 1,
                evaluationIndex: this.selection(1).evaluationIndex,
                indexDescription: this.selection(1).indexDescription,
                parentId: 0,
                defaultWeightValue: 1.5,
                item: this.tableDataOne.selectWeight.toString(),
                score: this.itemOneScoreSum,
                itemId: this.getSelectInfo(
                  this.selection(1).scoreDictionaries,
                  this.tableDataOne.selectWeight
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(1).scoreDictionaries,
                  this.tableDataOne.selectWeight
                ).orderNum,
              },
              {
                auditId: 6,
                evaluationIndex: this.selection(1).children[0].evaluationIndex,
                indexDescription: this.selection(1).children[0]
                  .indexDescription,
                parentId: 1,
                defaultWeightValue: 0,
                score: this.tableDataOne.selectScore0,
                item: this.getSelectInfo(
                  this.selection(1).children[0].scoreDictionaries,
                  this.tableDataOne.selectScore0
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(1).children[0].scoreDictionaries,
                  this.tableDataOne.selectScore0
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(1).children[0].scoreDictionaries,
                  this.tableDataOne.selectScore0
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(1).children[0].scoreDictionaries
                ),
              },
              {
                auditId: 7,
                evaluationIndex: this.selection(1).children[1].evaluationIndex,
                indexDescription: this.selection(1).children[1]
                  .indexDescription,
                parentId: 1,
                defaultWeightValue: 0,
                score: this.tableDataOne.selectScore1,
                item: this.getSelectInfo(
                  this.selection(1).children[1].scoreDictionaries,
                  this.tableDataOne.selectScore1
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(1).children[1].scoreDictionaries,
                  this.tableDataOne.selectScore1
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(1).children[1].scoreDictionaries,
                  this.tableDataOne.selectScore1
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(1).children[1].scoreDictionaries
                ),
              },
              {
                auditId: 8,
                evaluationIndex: this.selection(1).children[2].evaluationIndex,
                indexDescription: this.selection(1).children[2]
                  .indexDescription,
                parentId: 1,
                defaultWeightValue: 0,
                score: this.tableDataOne.selectScore2,
                item: this.getSelectInfo(
                  this.selection(1).children[2].scoreDictionaries,
                  this.tableDataOne.selectScore2
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(1).children[2].scoreDictionaries,
                  this.tableDataOne.selectScore2
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(1).children[2].scoreDictionaries,
                  this.tableDataOne.selectScore2
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(1).children[2].scoreDictionaries
                ),
              },
              {
                auditId: 2,
                evaluationIndex: this.selection(2).evaluationIndex,
                indexDescription: this.selection(2).indexDescription,
                parentId: 0,
                defaultWeightValue: 1,
                item: this.tableDataTwo.selectWeight.toString(),
                score: this.itemTwoScoreSum,
                itemId: this.getSelectInfo(
                  this.selection(2).scoreDictionaries,
                  this.tableDataTwo.selectWeight
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(2).scoreDictionaries,
                  this.tableDataTwo.selectWeight
                ).orderNum,
              },
              {
                auditId: 9,
                evaluationIndex: this.selection(2).children[0].evaluationIndex,
                indexDescription: this.selection(2).children[0]
                  .indexDescription,
                parentId: 2,
                defaultWeightValue: 0,
                score: this.tableDataTwo.selectScore0,
                item: this.getSelectInfo(
                  this.selection(2).children[0].scoreDictionaries,
                  this.tableDataTwo.selectScore0
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(2).children[0].scoreDictionaries,
                  this.tableDataTwo.selectScore0
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(2).children[0].scoreDictionaries,
                  this.tableDataTwo.selectScore0
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(2).children[0].scoreDictionaries
                ),
              },
              {
                auditId: 10,
                evaluationIndex: this.selection(2).children[1].evaluationIndex,
                indexDescription: this.selection(2).children[1]
                  .indexDescription,
                parentId: 2,
                defaultWeightValue: 0,
                score: this.tableDataTwo.selectScore1,
                item: this.getSelectInfo(
                  this.selection(2).children[1].scoreDictionaries,
                  this.tableDataTwo.selectScore1
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(2).children[1].scoreDictionaries,
                  this.tableDataTwo.selectScore1
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(2).children[1].scoreDictionaries,
                  this.tableDataTwo.selectScore1
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(2).children[1].scoreDictionaries
                ),
              },
              {
                auditId: 11,
                evaluationIndex: this.selection(2).children[2].evaluationIndex,
                indexDescription: this.selection(2).children[2]
                  .indexDescription,
                parentId: 2,
                defaultWeightValue: 0,
                score: this.tableDataTwo.selectScore2,
                item: this.getSelectInfo(
                  this.selection(2).children[2].scoreDictionaries,
                  this.tableDataTwo.selectScore2
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(2).children[2].scoreDictionaries,
                  this.tableDataTwo.selectScore2
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(2).children[2].scoreDictionaries,
                  this.tableDataTwo.selectScore2
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(2).children[2].scoreDictionaries
                ),
              },
              {
                auditId: 3,
                evaluationIndex: this.selection(3).evaluationIndex,
                indexDescription: this.selection(3).indexDescription,
                parentId: 0,
                defaultWeightValue: 1,
                item: this.tableDataThree.selectWeight.toString(),
                score: this.itemThreeScoreSum,
                itemId: this.getSelectInfo(
                  this.selection(3).scoreDictionaries,
                  this.tableDataThree.selectWeight
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(3).scoreDictionaries,
                  this.tableDataThree.selectWeight
                ).orderNum,
              },
              {
                auditId: 12,
                evaluationIndex: this.selection(3).children[0].evaluationIndex,
                indexDescription: this.selection(3).children[0]
                  .indexDescription,
                parentId: 3,
                defaultWeightValue: 0,
                score: this.tableDataThree.selectScore0,
                item: this.getSelectInfo(
                  this.selection(3).children[0].scoreDictionaries,
                  this.tableDataThree.selectScore0
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(3).children[0].scoreDictionaries,
                  this.tableDataThree.selectScore0
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(3).children[0].scoreDictionaries,
                  this.tableDataThree.selectScore0
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(3).children[0].scoreDictionaries
                ),
              },
              {
                auditId: 13,
                evaluationIndex: this.selection(3).children[1].evaluationIndex,
                indexDescription: this.selection(3).children[1]
                  .indexDescription,
                parentId: 3,
                defaultWeightValue: 0,
                score: this.tableDataThree.selectScore1,
                item: this.getSelectInfo(
                  this.selection(3).children[1].scoreDictionaries,
                  this.tableDataThree.selectScore1
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(3).children[1].scoreDictionaries,
                  this.tableDataThree.selectScore1
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(3).children[1].scoreDictionaries,
                  this.tableDataThree.selectScore1
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(3).children[1].scoreDictionaries
                ),
              },
              {
                auditId: 14,
                evaluationIndex: this.selection(3).children[2].evaluationIndex,
                indexDescription: this.selection(3).children[2]
                  .indexDescription,
                parentId: 3,
                defaultWeightValue: 0,
                score: this.tableDataThree.selectScore2,
                item: this.getSelectInfo(
                  this.selection(3).children[2].scoreDictionaries,
                  this.tableDataThree.selectScore2
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(3).children[2].scoreDictionaries,
                  this.tableDataThree.selectScore2
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(3).children[2].scoreDictionaries,
                  this.tableDataThree.selectScore2
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(3).children[2].scoreDictionaries
                ),
              },
              {
                auditId: 4,
                evaluationIndex: this.selection(4).evaluationIndex,
                indexDescription: this.selection(4).indexDescription,
                parentId: 0,
                defaultWeightValue: 1,
                item: this.tableDataFour.selectWeight.toString(),
                score: this.itemFourScoreSum,
                itemId: this.getSelectInfo(
                  this.selection(4).scoreDictionaries,
                  this.tableDataFour.selectWeight
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(4).scoreDictionaries,
                  this.tableDataFour.selectWeight
                ).orderNum,
              },
              {
                auditId: 15,
                evaluationIndex: this.selection(4).children[0].evaluationIndex,
                indexDescription: this.selection(4).children[0]
                  .indexDescription,
                parentId: 4,
                defaultWeightValue: 0,
                score: this.tableDataFour.selectScore0,
                item: this.getSelectInfo(
                  this.selection(4).children[0].scoreDictionaries,
                  this.tableDataFour.selectScore0
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(4).children[0].scoreDictionaries,
                  this.tableDataFour.selectScore0
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(4).children[0].scoreDictionaries,
                  this.tableDataFour.selectScore0
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(4).children[0].scoreDictionaries
                ),
              },
              {
                auditId: 16,
                evaluationIndex: this.selection(4).children[1].evaluationIndex,
                indexDescription: this.selection(4).children[1]
                  .indexDescription,
                parentId: 4,
                defaultWeightValue: 0,
                score: this.tableDataFour.selectScore1,
                item: this.getSelectInfo(
                  this.selection(4).children[1].scoreDictionaries,
                  this.tableDataFour.selectScore1
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(4).children[1].scoreDictionaries,
                  this.tableDataFour.selectScore1
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(4).children[1].scoreDictionaries,
                  this.tableDataFour.selectScore1
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(4).children[1].scoreDictionaries
                ),
              },
              {
                auditId: 17,
                evaluationIndex: this.selection(4).children[2].evaluationIndex,
                indexDescription: this.selection(4).children[2]
                  .indexDescription,
                parentId: 4,
                defaultWeightValue: 0,
                score: this.tableDataFour.selectScore2,
                item: this.getSelectInfo(
                  this.selection(4).children[2].scoreDictionaries,
                  this.tableDataFour.selectScore2
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(4).children[2].scoreDictionaries,
                  this.tableDataFour.selectScore2
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(4).children[2].scoreDictionaries,
                  this.tableDataFour.selectScore2
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(4).children[2].scoreDictionaries
                ),
              },
              {
                auditId: 5,
                evaluationIndex: this.selection(5).evaluationIndex,
                indexDescription: this.selection(5).indexDescription,
                parentId: 0,
                defaultWeightValue: 1,
                item: this.tableDataFive.selectWeight.toString(),
                score: this.itemFiveScoreSum,
                itemId: this.getSelectInfo(
                  this.selection(5).scoreDictionaries,
                  this.tableDataFive.selectWeight
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(5).scoreDictionaries,
                  this.tableDataFive.selectWeight
                ).orderNum,
              },
              {
                auditId: 18,
                evaluationIndex: this.selection(5).children[0].evaluationIndex,
                indexDescription: this.selection(5).children[0]
                  .indexDescription,
                parentId: 5,
                defaultWeightValue: 0,
                score: this.tableDataFive.selectScore0,
                item: this.getSelectInfo(
                  this.selection(5).children[0].scoreDictionaries,
                  this.tableDataFive.selectScore0
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(5).children[0].scoreDictionaries,
                  this.tableDataFive.selectScore0
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(5).children[0].scoreDictionaries,
                  this.tableDataFive.selectScore0
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(5).children[0].scoreDictionaries
                ),
              },
              {
                auditId: 19,
                evaluationIndex: this.selection(5).children[1].evaluationIndex,
                indexDescription: this.selection(5).children[1]
                  .indexDescription,
                parentId: 5,
                defaultWeightValue: 0,
                score: this.tableDataFive.selectScore1,
                item: this.getSelectInfo(
                  this.selection(5).children[1].scoreDictionaries,
                  this.tableDataFive.selectScore1
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(5).children[1].scoreDictionaries,
                  this.tableDataFive.selectScore1
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(5).children[1].scoreDictionaries,
                  this.tableDataFive.selectScore1
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(5).children[1].scoreDictionaries
                ),
              },
              {
                auditId: 20,
                evaluationIndex: this.selection(5).children[2].evaluationIndex,
                indexDescription: this.selection(5).children[2]
                  .indexDescription,
                parentId: 5,
                defaultWeightValue: 0,
                score: this.tableDataFive.selectScore2,
                item: this.getSelectInfo(
                  this.selection(5).children[2].scoreDictionaries,
                  this.tableDataFive.selectScore2
                ).item,
                itemId: this.getSelectInfo(
                  this.selection(5).children[2].scoreDictionaries,
                  this.tableDataFive.selectScore2
                ).id,
                orderNum: this.getSelectInfo(
                  this.selection(5).children[2].scoreDictionaries,
                  this.tableDataFive.selectScore2
                ).orderNum,
                maxScore: this.getMaxScore(
                  this.selection(5).children[2].scoreDictionaries
                ),
              },
            ],
          };
          this.submitStatus = 'pending';
          const response = await tableDataSubmit(tableData);
          if (response.status === 200 && response.data.code === 0) {
            this.visible = false;
            this.submitStatus = 'resolved';
            message.success('提交成功')
            this.$router.replace('/quality');
          } else {
            this.submitStatus = 'rejected'
          }
        } catch (error) {
          this.submitStatus = 'rejected'
        }
      },
      handleCancel() {
        this.visible = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .significantSelect {
    background-color: #cfcecd;
  }
  .custom-submit-button {
    background-color: #026f76;
    border-color: #026f76;

    color: #fff;
  }
  .col-one,
  .col-two {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .quality-info-loading-wrapper,
  .quality-info-loading-failure-wrapper {
    height: calc(100% - 60px);
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .quality-score-container {
    height: 100%;
    overflow: hidden;
  }

  .content-show {
    height: calc(100% - 60px - 80px);
    overflow-y: auto;
  }

  .custom-tabs {
    overflow: visible;
  }


  .custom-tabs-tab {
    max-width: 142px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    span {
      width: 100%;
      display: inline-block;
    }
  }

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
  .ant-row {
    margin-top: 0;
  }
  .quality-box {
    width: 90%;
    margin: 0 auto;
    padding-top: 1px;
    margin-top: -1px;
    // 头部课程展示区域
    .header {
      width: 100%;
      height: 400px;
      margin: 15px auto;
      .title {
        width: 100%;
        height: 50px;
        line-height: 50px;
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
      .each-bg {
        background: #e8eaec;
        margin-top: 20px;
        border-radius: 20px;
        height: 300px;
        .sroll-button-group {
          // position: absolute;
          left: 0;
          top: 0;
          right: 0;
          width: 100%;
          bottom: 0;
          height: 30px;
          display: flex;
          justify-content: center;
          // margin: 0 auto;
          .scroll-button {
            // height: 30px;
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
    }
    .body {
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-bottom: 30px;
      // 左侧子任务卡区域
      .left-cards {
        width: 375px;
        flex-shrink: 0;
        height: 838px;
        margin-right: 20px;
        padding: 30px;
        background-color: #e8eaec;
        .subTaskCardShow {
          width: 100%;
          .flex-box1 {
            width: 100%;
            display: flex;
            margin-top: 15px;
          }
          .flex-box1 > .flex-box {
            width: 25%;
          }
        }
      }
      // 右侧评分区域
      .right-box {
        flex-grow: 1;
        display: inline-block;
        font-size: 14px;

        .box-one {
          .score-header {
            border: 2px solid #357983;
            margin-bottom: 20px;
            .row-one {
              .col-one {
                height: 30px;
                line-height: 30px;
                color: #fff;
                background-color: #357983;
                padding-left: 2px;
              }
              .col-two {
                height: 30px;
                .selectValue {
                  color: #357983;
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
                background-color: #62aa8c;
                a {
                  color: #fff;
                  text-decoration: underline;
                }
              }
            }
          }

          .score-body {
            border: 2px solid #357983;
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
                  background-color: #357983;
                }
                .col-two {
                  height: 30px;
                  line-height: 30px;
                  background-color: #cfcecd;
                  color: #000;
                  padding-left: 2px;
                }
                .col-three {
                  height: 30px;
                  line-height: 30px;
                  color: #fff;
                  text-align: center;
                  background-color: #818080;
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
                  // position: relative;
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
                  background-color: #fff;
                  border: 1px dashed #595958;
                }
              }

              .row-three {
                // border-bottom: 1px solid #d9d9d9;
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
                  }
                }
                // .col-four:first-child {
                //   border-bottom: none;
                // }
                .special-box {
                  border-bottom: dashed 1px #d9d9d9;
                  .selectValue {
                    width: 100%;
                    text-align: center;
                    height: 62px;
                    line-height: 62px;
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

  .btn-container {
    z-index: 2;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    // margin-top: 150px;
    padding-left: 200px;
    background-color: #fff;

    .submit-btn {
      position: absolute;
      top: 25%;
      right: 100px;
      width: 92px;
      height: 40px;
      background-color: #017b83;
      border-radius: 4px;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      border: none;
      outline: none;
      cursor: pointer;
      transition: background-color linear 0.2s;
    }

    .submit-btn:hover {
      background-color: #026f76;
    }
  }

  .one {
    margin-top: 50px;
  }
</style>
<style lang="scss">
  .quality-score-container {
  .row-two-box {
    .ant-row {
      margin-top: 0;
    }
  }
  .section-two {
     .row-three.ant-row {
       .col-four {
         z-index:2;
        .ant-progress
        .ant-progress-line
        .ant-progress-status-normal
        .ant-progress-default {
        height: 100%;
      }
     }
   }
  }
  .section-two {
     .row-three.ant-row:first-child {
        .ant-progress-success-bg,.ant-progress-bg {
          height: 59px !important;
        }
     }
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
      outline: none;
    }
    // 下拉框默认为文字样式
    .ant-select-selection__placeholder {
      color: #000;
    }
    .ant-select.ant-select-enabled.ant-select-no-arrow {
      border: none;
    }
  }

  .row-three {
    // 下拉框选项样式
    .ant-select-selection-selected-value {
      color: #000;
    }
    // 下拉框的样式
    .ant-select-selection {
      height: 32px;
      background-color: transparent;
      border: none;
      box-shadow: none;
    }
    // 下拉框默认为文字样式
    .ant-select-selection__placeholder {
      color: #000;
    }
  }

  .quality-box {
    .subTaskCardShow {
      .ant-tabs-nav-container {
        height: 42px;
      }
      .ant-tabs-tab.ant-tabs-tab.ant-tabs-tab.ant-tabs-tab {
        background-color: #fff;
        font-size: 14px;
        font-weight: 700;
        // border-radius: 10px;
        padding: 0 10px;
        height: 40px;
      }
      .ant-tabs-nav.ant-tabs-nav-animated {
        height: 40px;
      }
      .ant-tabs-tab-active {
        // color: #fff;
        background-color: red;
      }
      .ant-tabs-nav-scroll {
        height: 40px;
        border-bottom: 1px solid #046e72;
      }
      .ant-tabs-content
        .ant-tabs-content-no-animated
        .ant-tabs-top-content
        .ant-tabs-card-content {
        height: 155px;
      }
      // .ant-tabs-nav .ant-tabs-nav-animated
      .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
        background-color: #046e72;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
      }
      .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
        margin-right: 10px;
      }
      .ant-tabs-tab {
        background: #fff;
        overflow: visible;
      }

      .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
        font-size: 16px;
      }
      .ant-tabs-nav .ant-tabs-tab .anticon {
        margin-right: 0;
      }
      .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
        height: 40px;
      }
    }
  }
  .ant-btn.ant-btn-primary {
    background-color: #017b83;
    color: #fff;
  }
  .ant-btn.ant-btn-primary:hover {
    background-color: #017b83;
    color: #fff;
  }
  .ant-btn.ant-btn-primary:focus {
    background-color: #017b83;
    color: #fff;
  }
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
  .ant-tabs-content
    .ant-tabs-content-no-animated
    .ant-tabs-top-content
    .ant-tabs-card-content {
    width: 100%;
  }
  }
</style>
<style scoped>

  .custom-tabs /deep/ .ant-tabs-tab:hover {
    color: #046e72;
  }
  .custom-progress /deep/ .ant-progress-bg {
    border: solid 1px #f5c242;
    height: 30px !important;
  }
  /deep/ .ant-modal-header {
    border: none;
  }
  /deep/.ant-modal-footer {
    border: none;
  }
  /* /deep/
    .ant-progress.ant-progress-line.ant-progress-status-normal.ant-progress-default
    * {
    height: 100%;
  } */
  /deep/ .custom-dialog .ant-modal-content {
    border-radius: 28px;
  }
</style>
<style lang="scss" scoped>
  .card {
    width: 128px;
    height: 160px;
    border: 1px solid #999;
  }
  .header {
    width: 100%;
    margin: 0 auto;
    .class-name {
      text-align: left;
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }
    .left-detail {
      width: 8%;
      display: inline-block;
      vertical-align: top;
    }
    .right-detail {
      width: 90%;
      display: inline-block;
      height: 300px;
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
    // height: 100%;
    margin: 0 auto;
    // padding-bottom: 30px;
    // position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 130px);
    // border: 1px solid #afa;
    // position: absolute;
  }
  .capsule-draggable-container {
    width: 90%;
    margin: 0 auto;
    height: 100%;
    // min-height:600px;
    // height:calc(100% - 60px);
  }
  .capsule-list-content {
    min-height: calc(100% - 135px);
  }
  .top-box {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #000;
    padding-left: 2%;
    padding-top:6px;
    .top-box-name {
      display: inline-block;
    }
    .top-box-pic {
      width: 97px;
      height: 25px;
      display: inline-block;
    }
    .top-box-status2 {
      display: inline-block;
      height: 27px;
      line-height: 27px;
      font-size: 14px;
      font-weight: bold;
      padding: 0 20px;
      border-radius: 45px 30px 30px 0;
      background-color: #fff;
      position: relative;
      top: -5px;
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
    margin-right:10px;
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
  .no-data {
    height: calc(100% - 42px);
    text-align: center;
    margin: 0 auto;
    img {
      margin-top: 10%;
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
</style>
