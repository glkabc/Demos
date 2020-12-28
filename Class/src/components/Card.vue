<template>
  <div :style="containerStyle">
    <div
      @click="handleClick"
      @dblclick="handleDBClick"
      class="card-container"
      :style="cardStyle"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      :draggable="isDraggable"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
    >
      <div v-if="false" class="left-link" :style="linkStyle" />
      <div v-if="false" class="right-link" :style="linkStyle" />
      <div class="header" :style="headerStyle" v-if="!hasHeaderSlot">
        <div class="title-container">
          <h4 class="title" :style="titleStyle">
            {{ title }}
          </h4>
          <div class="square" :style="squareStyle"></div>
          <img :style="logoStyle" src="./card/assets/logo.png" alt="logo" />
        </div>
        <p class="sub-title" :style="subTitleStyle">
          {{ subTitle }}
        </p>
        <slot name="header"></slot>
      </div>
      <div class="content" :style="contentStyle">
        <slot>
          请提供卡片内容
        </slot>
      </div>
      <div class="footer" v-if="shouldShowFooter">
        <slot name="footer"></slot>
      </div>
      <AntTooltip placement="left" v-if="shouldShowLeftButton">
        <template slot="title">
          {{ leftButtonTooltip }}
        </template>
        <div
          :style="hoveredLeftButtonStyle"
          v-if="small && interactable"
          @click="handleClickLeftButton"
          data-hovered-button
        >
          <AntIcon type="plus-circle" />
        </div>
      </AntTooltip>
      <AntTooltip placement="right" v-if="shouldShowRightButton">
        <template slot="title">
          {{ rightButtonTooltip }}
        </template>
        <div
          :style="hoveredRightButtonStyle"
          v-if="small && interactable"
          @click="handleClickRightButton"
          data-hovered-button
        >
          <AntIcon type="plus-circle" />
        </div>
      </AntTooltip>
    </div>
    <div v-if="shouldShowTimeLine" class="time-line" :style="timeLineStyle">
      <div
        v-for="n of scaleNumber"
        class="scale"
        :key="n"
        :style="computeScaleStyle(n - 1)"
      />
      <span class="leftTime" v-if="shouldShowLeftTime">{{ leftTime }}</span>
      <span class="rightTime" v-if="shouldShowRightTime">{{ rightTime }}</span>
      <img
        class="leftFlag"
        v-if="showLeftFlag"
        src="./card/assets/flag.png"
        alt="一个小红旗"
      />
      <img
        class="rightFlag"
        v-if="showRightFlag"
        src="./card/assets/flag.png"
        alt="一个小红旗"
      />
      <div class="time-line__cover" :style="timeLineCoverStyle" />
      <span class="leftDot" v-if="showLeftDot" />
      <span class="rightDot" v-if="showRightDot" />
    </div>
  </div>
</template>

<script>
  import {Icon, Tooltip} from 'ant-design-vue';
  import warning from 'warning';

  export default {
    name: 'Card',
    components: {
      AntIcon: Icon,
      AntTooltip: Tooltip,
    },
    props: {
      showLeftThickScale: {
        type: Boolean,
        default: false,
      },
      showRightThickScale: {
        type: Boolean,
        default: false,
      },
      customStyle: {
        type: Object,
        default: () => ({}),
      },
      customContentStyle: {
        type: Object,
        default: () => ({}),
      },
      leftTime: Number,
      rightTime: Number,
      showLeftFlag: {
        type: Boolean,
        default: false,
      },
      showRightFlag: {
        type: Boolean,
        default: false,
      },
      showLeftDot: {
        type: Boolean,
        default: true,
      },
      showRightDot: {
        type: Boolean,
        default: true,
      },
      protrudeLeftTimeLineLength: {
        type: Number,
        default: 0,
      },
      protrudeRightTimeLineLength: {
        type: Number,
        default: 0,
      },
      // deprecated!!!
      showLeftLink: {
        type: Boolean,
        default: false,
      },
      // deprecated!!!
      showRightLink: {
        type: Boolean,
        default: false,
      },
      showTimeLine: {
        type: Boolean,
        default: false,
      },
      scaleNumber: {
        validator(value) {
          if (typeof value !== 'number') {
            warning(false, `scaleNumber必须是数字类型`);
            return false;
          }
          if (!Number.isInteger(value)) {
            warning(false, `scaleNumber必须是整数`);
            return false;
          }
          if (value <= 1) {
            warning(false, `scaleNumber必须大于1`);
            return false;
          }
          return true;
        },
        default: 11,
      },
      title: {
        type: String,
        default: '',
      },
      subTitle: {
        type: String,
        default: '',
      },
      color: {
        type: String,
        default: 'gray',
      },
      small: {
        type: Boolean,
        default: false,
      },
      interactable: {
        type: Boolean,
        default: false,
      },
      leftButtonTooltip: {
        type: String,
        default: '',
      },
      rightButtonTooltip: {
        type: String,
        default: '',
      },
      leftButtonColor: String,
      rightButtonColor: String,
      dragStart: {
        type: Function,
      },
      dragEnd: {
        type: Function,
      },
    },
    data() {
      return {
        isHovering: false,
      };
    },
    computed: {
      isDraggable() {
        return this.dragStart ? true : false;
      },
      shouldShowFooter() {
        return !this.small;
      },
      shouldShowLeftButton() {
        return this.small && this.leftButtonTooltip;
      },
      shouldShowRightButton() {
        return this.small && this.rightButtonTooltip;
      },
      shouldShowLeftTime() {
        return this.small && this.leftTime != undefined;
      },
      shouldShowRightTime() {
        return this.small && this.rightTime != undefined;
      },
      shouldShowTimeLine() {
        return this.small && this.showTimeLine;
      },
      hasHeaderSlot() {
        return this.$slots.header !== undefined;
      },
      linkStyle() {
        return {
          borderColor: this.color,
        };
      },
      timeLineStyle() {
        return {
          backgroundColor: this.color,
          width: `calc(100% + ${this.protrudeLeftTimeLineLength}px + ${this.protrudeRightTimeLineLength}px)`,
          left: `-${this.protrudeLeftTimeLineLength}px`,
        };
      },
      containerStyle() {
        return {
          width: this.small ? '88px' : '558px',
          ...this.customStyle,
        };
      },
      cardStyle() {
        return {
          zIndex: this.isHovering ? '2' : '0',
          backgroundColor: this.color,
          height: this.small ? '125px' : '791px',
          borderRadius: this.small ? '8px' : '28px',
          padding: this.small ? '4px 3px' : '25px 22px',
          cursor: this.small ? 'pointer' : 'auto',
          transition: 'box-shadow linear 0.2s, transform linear 0.2s',
          boxShadow:
            this.small && this.interactable && this.isHovering
              ? '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
              : '',
          transform:
            this.small && this.interactable && this.isHovering
              ? 'scale(1.06)'
              : '',
        };
      },
      headerStyle() {
        return {
          height: this.small ? '23px' : '130px',
        };
      },
      titleStyle() {
        return {
          fontSize: this.small ? '6px' : '25px',
        };
      },
      squareStyle() {
        return {
          width: this.small ? '12px' : '106px',
          height: this.small ? '3px' : '19px',
          borderRadius: this.small ? '2px' : '5px',
          marginTop: this.small ? '4px' : '20px',
          marginLeft: this.small ? '2px' : '14px',
        };
      },
      logoStyle() {
        return {
          position: 'absolute',
          right: this.small ? '2px' : '0px',
          top: this.small ? '2px' : '0px',
          width: this.small ? '15px' : '89px',
          height: this.small ? '5.3px' : '32px;',
        };
      },
      subTitleStyle() {
        return {
          fontSize: this.small ? '3px' : '17px',
          height: this.small ? '8px' : '21px',
        };
      },
      contentStyle() {
        return {
          height: this.small ? 'calc(100% - 23px)' : 'calc(100% - 130px)',
          padding: this.small ? '2px' : '26px 26px 10px 26px',
          borderRadius: this.small ? '6px' : '28px',
          ...this.customContentStyle,
        };
      },
      hoveredButtonStyle() {
        return {
          position: 'absolute',
          backgroundColor: this.color,
          color: '#fff',
          top: '50%',
          zIndex: 2,
          fontSize: '14px',
          transition: 'transform linear 0.2s',
        };
      },
      hoveredLeftButtonStyle() {
        return {
          ...this.hoveredButtonStyle,
          backgroundColor: this.leftButtonColor
            ? this.leftButtonColor
            : this.color,
          right: 'calc(100% - 4px)',
          borderRadius: '16px 0 0 16px',
          padding: '4px 6px 4px 8px',
          transform: this.isHovering
            ? 'translate(0, -50%)'
            : 'translate(100%, -50%)',
        };
      },
      hoveredRightButtonStyle() {
        return {
          ...this.hoveredButtonStyle,
          backgroundColor: this.rightButtonColor
            ? this.rightButtonColor
            : this.color,
          left: 'calc(100% - 4px)',
          borderRadius: '0 16px 16px 0',
          padding: '4px 8px 4px 6px',
          transform: this.isHovering
            ? 'translate(0, -50% )'
            : 'translate(-100%, -50%)',
        };
      },
      timeLineCoverStyle() {
        return {
          backgroundColor: this.color,
        };
      },
    },
    methods: {
      computeScaleStyle(index) {
        if (
          typeof this.scaleNumber === 'number' &&
          Number.isInteger(this.scaleNumber) &&
          this.scaleNumber > 1
        ) {
          let style;
          try {
            if (index === 0) {
              style = {
                left: '0%',
                height: '14px',
                transform: this.showLeftThickScale
                  ? 'scaleX(0.1)'
                  : 'scaleX(0.05)',
              };
            } else if (index === this.scaleNumber - 1) {
              style = {
                left: 'calc(100% - 10px)',
                height: '14px',
                transformOrigin: 'center right',
                transform: this.showRightThickScale
                  ? 'scaleX(0.1)'
                  : 'scaleX(0.05)',
              };
            } else {
              const percentUnit = Math.floor(100 / (this.scaleNumber - 1));
              const left = percentUnit * index;
              style = {
                left: `${left}%`,
              };
            }
            return style;
          } catch (error) {
            warning(false, `<Card>:(computeScaleStyle):catched error ${error}`);
          }
        } else {
          return {};
        }
      },
      handleDragStart(event) {
        if (typeof this.dragStart === 'function') {
          this.dragStart(event);
        }
      },
      handleDragEnd(event) {
        if (typeof this.dragEnd === 'function') {
          this.dragEnd(event);
        }
      },
      handleDBClick(event) {
        event.stopPropagation();
        this.isSingleClick = false;
        if (!event.target.closest('[data-hovered-button]')) {
          this.$emit('dblclick');
        }
      },
      handleClick(event) {
        this.isSingleClick = true;
        setTimeout(() => {
          if (this.isSingleClick) {
            if (!event.target.closest('[data-hovered-button]')) {
              this.$emit('click');
            }
          }
        }, 250);
      },
      handleClickLeftButton() {
        this.$emit('clickLeftButton');
      },
      handleClickRightButton() {
        this.$emit('clickRightButton');
      },
      handleMouseEnter() {
        this.isHovering = true;
      },
      handleMouseLeave() {
        this.isHovering = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .card-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;

    .left-link,
    .right-link {
      z-index: 1;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 1px;
      border: dashed 1px #888;
    }

    .left-link {
      right: 100%;
    }

    .right-link {
      left: 100%;
    }
    .header {
      .title-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin-bottom: 0;
        position: relative;
        .title {
          color: #fff;
          font-weight: bold;
          position: relative;

          &::first-letter {
            font-size: 1.3em;
          }
        }

        .square {
          background-color: #fff;
          height: 100%;
        }
      }

      .sub-title {
        color: #fff;
      }
    }
    .content {
      position: relative;
      flex: 1;
      z-index: 3;
      background-color: #fff;
    }
  }

  .time-line {
    margin-top: 36px;
    position: relative;
    height: 4px;
    z-index: 2;

    &__cover {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .leftTime,
    .rightTime {
      font-size: 14px;
      position: absolute;
      top: 100%;
      color: #b4b4b4;
      transform: translateX(-50%);
    }

    .leftTime {
      left: 0;
    }

    .rightTime {
      left: 100%;
    }

    .leftFlag,
    .rightFlag {
      position: absolute;
      bottom: 100%;
      display: inline-block;
    }

    .leftFlag {
      left: 0;
    }

    .rightFlag {
      left: 100%;
      transform: translateX(-2px);
    }

    .leftDot,
    .rightDot {
      position: absolute;
      top: 50%;
      display: inline-block;
      transform: translate(-50%, -50%);
      width: 11px;
      height: 11px;
      border: solid 2px #e8eaec;
      border-radius: 50%;
      background-color: #f44336;
    }

    .leftDot {
      left: 0;
    }

    .rightDot {
      left: 100%;
    }

    .scale {
      position: absolute;
      bottom: 0;
      width: 10px;
      height: 10px;
      transform-origin: center left;
      background-color: #ababab;
      transform: scaleX(0.1);
    }
  }
</style>
