<template>
  <CardLayout
    title="B 讲解卡"
    subTitle="这张活动卡要通过举例或演示来讲解一个新的知识点"
    color="#e56b16"
    :small="small"
    :interactable="interactable"
    :showTimeLine="showTimeLine"
    :showLeftLink="showLeftLink"
    :showRightLink="showRightLink"
    :leftButtonTooltip="leftButtonTooltip"
    :rightButtonTooltip="rightButtonTooltip"
    :protrudeLeftTimeLineLength="protrudeLeftTimeLineLength"
    :protrudeRightTimeLineLength="protrudeRightTimeLineLength"
    :leftButtonColor="leftButtonColor"
    :rightButtonColor="rightButtonColor"
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
    <div :class="{'content-wrapper': true, small: this.small}">
      <div class="item">
        <h5 class="item__title large">
          我要讲解的新知识点是什么？
        </h5>
        <p class="item__content large">
          <span>{{ knowledge }}</span>
        </p>
      </div>
      <div class="horizontal-seperator" />
      <div class="item half-width">
        <h5 class="item__title">
          我要怎样来示证新知？
        </h5>
        <p class="item__content">
          <span>{{ how }}</span>
        </p>
      </div>
      <div class="vertical-seperator" />
      <div class="item half-width">
        <h5 class="item__title">
          我计划用多久来完成？
        </h5>
        <p class="item__content">
          <span>{{ timeCostLabel }}</span>
        </p>
      </div>
      <div class="horizontal-seperator" />
      <div class="item">
        <h5 class="item__title">
          我要什么案例或演示方法为讲解？
        </h5>
        <h6 class="item__subtitle" style="color: red;">
          注: 要说明这种方法如何应用新知识点
        </h6>
        <p class="item__content">
          <span>{{ description }}</span>
        </p>
      </div>
      <div class="horizontal-seperator" />
      <div class="item half-width">
        <h5 class="item__title">
          我需要的媒体材料是什么？
        </h5>
        <h6 class="item__subtitle">
          如: 什么图片、什么音/视频、什么编译器等
        </h6>
        <div class="item__content normal">
          <AntTooltip
            v-for="(attachment, index) of attachment"
            :key="attachment.id"
            :title="attachment.fileName"
            placement="right"
          >
            <p class="file-container">
              <span class="file__name">
                {{ index + 1 }}. {{ attachment.fileName }}
              </span>
              <svg
                :style="{
                  width: '16px',
                  height: '16px',
                  display: small ? 'none' : 'inline-block',
                }"
                class="file__button"
                @click="handleDownloadAttachment(attachment.id)"
                t="1607650326208"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2293"
                width="200"
                height="200"
              >
                <path
                  d="M192.639798 1023.9968h638.718004A63.9998 63.9998 0 0 0 895.9976 959.997c0-35.07189-29.183909-63.9998-64.639798-63.9998H192.639798a63.9998 63.9998 0 1 0 0 127.9996z m269.759157-280.447124c27.327915 32.639898 71.871775 32.639898 100.095687 0l248.959222-295.103077c16.255949-19.391939 23.103928-45.823857 19.711939-71.359777a53.119834 53.119834 0 0 0-52.223837-46.719854H619.774463V54.591829A53.567833 53.567833 0 0 0 566.782629 0H459.838963a53.567833 53.567833 0 0 0-53.119834 54.591829v275.775139H245.119634a53.119834 53.119834 0 0 0-52.223837 46.719854c-3.391989 25.53592 3.455989 51.967838 19.711939 71.359777l249.855219 295.103077z"
                  p-id="2294"
                ></path>
              </svg>
            </p>
          </AntTooltip>
        </div>
      </div>
      <div class="vertical-seperator" />
      <div class="item half-width">
        <h5 class="item__title">
          我该如何通俗地表达难懂的学术名词？
        </h5>
        <p class="item__content">
          <span>{{ termExplanation }}</span>
        </p>
      </div>
    </div>
  </CardLayout>
</template>

<script>
  import Card from '../Card';
  import {createNamespacedHelpers} from 'vuex';
  import {Tooltip, message} from 'ant-design-vue';
  import warning from 'warning';
  import client from '@/configs/request';

  const {
    mapState: canvasMapState,
    mapActions: canvasMapActions,
  } = createNamespacedHelpers('canvas');
  export default {
    name: 'Preview',
    components: {
      CardLayout: Card,
      AntTooltip: Tooltip,
    },
    props: {
      showLeftThickScale: Boolean,
      showRightThickScale: Boolean,
      originFormData: Object,
      leftButtonTooltip: String,
      rightButtonTooltip: String,
      leftButtonColor: String,
      rightButtonColor: String,
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
    },
    computed: {
      ...canvasMapState([
        'descriptionMethod',
        'timeCost',
        'descriptionTimeCost',
      ]),
      knowledge() {
        if (this.originFormData) {
          return this.originFormData.knowledge;
        } else {
          return '';
        }
      },
      how() {
        if (this.originFormData && this.originFormData.how) {
          if (this.descriptionMethod.status === 'resolved') {
            return this.descriptionMethod.data.find(
              (method) => method.value === this.originFormData.how
            ).label;
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      timeCostLabel() {
        if (this.originFormData && this.originFormData.timeCost) {
          if (this.descriptionTimeCost.status === 'resolved') {
            return this.descriptionTimeCost.data.find(
              (time) => time.value === this.originFormData.timeCost
            ).label;
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      description() {
        if (this.originFormData) {
          return this.originFormData.description;
        } else {
          return '';
        }
      },
      termExplanation() {
        if (this.originFormData) {
          return this.originFormData.termExplanation;
        } else {
          return '';
        }
      },
      attachment() {
        if (this.originFormData) {
          return this.originFormData.attachment;
        } else {
          return [];
        }
      },
    },
    methods: {
      async handleDownloadAttachment(id) {
        let hide;
        try {
          const attachment = this.attachment.find(
            (attachment) => attachment.id === id
          );
          if (!attachment) return;
          hide = message.loading('下载附件...', 0);
          let response;
          try {
            response = await client.get(attachment.url, {
              responseType: 'blob',
              timeout: 0,
            });
          } catch {
            throw {globalHandled: true};
          }
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', attachment.fileName);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          hide?.();
        } catch (error) {
          hide?.();
          if (error.globalHandled !== true) {
            message.warn('附件下载失败');
          }
        }
      },
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
  .content-wrapper {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;

    .horizontal-seperator {
      width: 100%;
      height: 1;
      border-bottom: dashed 1px #e56b16;
    }

    .vertical-seperator {
      width: 1px;
      height: 128px;
      border-left: dashed 1px #e56b16;
      margin: auto;
    }
    .item {
      width: 100%;

      &:not(:last-child) {
      }

      &.half-width {
        width: 48%;
      }

      &.half-width {
        width: 48%;
      }
      &__title {
        font-size: 17px;
        color: #e56b16;
        text-align: center;
      }

      &__title.large {
        font-size: 20px;
        font-weight: bold;
      }
      &__subtitle {
        font-size: 11px;
        color: #e56b16;
        text-align: center;
      }
      &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 0;
        font-size: 21px;
        height: 97px;
        word-break: break-all;
        overflow-y: auto;

        .file-container {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 2px;
          cursor: default;

          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;

          .file__name {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .file__button {
            cursor: pointer;
            flex-shrink: 0;
            display: block;
            width: 20px;
            height: 20px;
            margin-right: 8px;
            fill: #666;

            &:hover {
              fill: #017b83;
            }
          }
        }
      }

      &__content.normal {
        display: block;
        height: 100px;
      }

      &__content.large {
        font-size: 23px;
        font-weight: bold;
      }
    }
    &.small {
      .horizontal-seperator {
        width: 100%;
        height: 1;
        border-bottom-style: dotted;
      }

      .vertical-seperator {
        height: 12px;
        border-left-style: dotted;
      }
      .item {
        &:not(:last-child) {
          margin-bottom: 2px;
        }

        &__title {
          font-size: 3px;
          color: #e56b16;
          font-weight: bold;
          text-align: center;
        }
        &__subtitle {
          font-size: 2px;
          color: #e56b16;
          text-align: center;
        }
        &__content {
          text-align: center;
          font-size: 2px;
          min-height: 0;
          height: 9px;
          overflow: hidden;
        }

        &__content.normal {
          display: block;
          height: 17px;
        }
      }
    }
  }
</style>
