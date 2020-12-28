<template>
  <CardLayout title="A 激活卡" subTitle="这张卡通过设计活动来激活学生相关的旧知（学过的知识或生活经验）以降低学习难度" color="#066c71">
    <!-- 激活卡编辑区域 -->
    <div class="container">
      <div class="introduce-items"><span class="star">*</span> 我要激活的一个已学知识或相关生活经验是什么?</div>
      <textarea type="text" class="introduce-content" v-model="formData.introContent"></textarea>
      <div class="introduce-detail">
        <!-- 怎样激活旧知 -->
        <div class="introduce-forms">
          <div class="forms"><span class="star">*</span> 我要怎样来激活旧知?</div>
          <div class="select">
            <AntSelect style="width:100%" :options="introFormsOptions" v-model="formData.introFormat">
              <AntSelectOption></AntSelectOption>
            </AntSelect>
          </div>
        </div>
        <!-- 激活旧知的时间 -->
        <div class="introduce-time">
          <div class="time"><span class="star">*</span> 我计划用多久来完成?</div>
          <div class="select">
            <AntSelect style="width:100%" :options="timeCostOptions" v-model="formData.timeCost">
              <AntSelectOption></AntSelectOption>
            </AntSelect>
          </div>
        </div>
      </div>
      <div class="intro-question"><span class="star">*</span> 这个活动具体内容是什么？</div>
      <div class="question-describe">
        如：演示/讲解的方法、提问的题目内容、活动的时间/步骤、讨论的主题/时间等等
      </div>
      <textarea class="question-content" v-model="formData.activityContent"></textarea>
      <!-- 底部按钮区域 -->
      <div class="button-container">
        <AntButton size="large" class="footer-cancel" type="default" @click="handleClickCanel" :disabled="saveStatus === 'pending'">
          取消
        </AntButton>
        <AntButton type="default" class="footer-save" size="large" @click="handleClickSave" :disabled="saveStatus === 'pending'" :loading="saveStatus === 'pending'">
          {{ formData.id ? '更新' : '创建' }}
        </AntButton>
      </div>
    </div>
  </CardLayout>
</template>

<script>
  import Card from '../Card';
  import {Button, Select, message} from 'ant-design-vue';
  import {createNamespacedHelpers} from 'vuex';
  import axios from 'axios';
  import client from '@/configs/request';
  import warning from 'warning';

  const easyId = () =>
    Math.random()
      .toString(36)
      .slice(2);

  const {mapState: canvasMapState} = createNamespacedHelpers('canvas');

  export default {
    name: 'Edit',
    components: {
      CardLayout: Card,
      AntButton: Button,
      AntSelect: Select,
      AntSelectOption: Select.Option,
    },
    props: {
      classId: String,
      originFormData: Object,
      groupId: Number,
      suggestedIndex: Number,
    },
    data() {
      return {
        formData: {
          introContent: '',
          introFormat: '',
          timeCost: '',
          activityContent: '',
        },
        saveStatus: 'idle',
      };
    },
    computed: {
      ...canvasMapState(['introductionMethod', 'introductionTimeCost']),
      introFormsOptions() {
        if (this.introductionMethod.status === 'pending') {
          return [{label: '数据加载中...', value: 'pending', disabled: true}];
        } else if (this.introductionMethod.status === 'rejected') {
          return [{label: '数据加载失败', value: 'rejected', disabled: true}];
        } else if (this.introductionMethod.status === 'resolved') {
          return this.introductionMethod.data;
        } else {
          return [];
        }
      },
      timeCostOptions() {
        if (this.introductionTimeCost.status === 'pending') {
          return [{label: '数据加载中...', value: 'pending', disabled: true}];
        } else if (this.introductionTimeCost.status === 'rejected') {
          return [{label: '数据加载失败', value: 'rejected', disabled: true}];
        } else if (this.introductionTimeCost.status === 'resolved') {
          return this.introductionTimeCost.data;
        } else {
          return [];
        }
      },
      isUpdate() {
        return Boolean(this.formData.id);
      },
    },
    created() {
      if (this.originFormData) {
        this.formData = {
          id: this.originFormData.id,
          introContent: this.originFormData.introContent,
          introFormat: this.originFormData.introFormat,
          timeCost: this.originFormData.timeCost,
          activityContent: this.originFormData.activityContent,
        };
      }
    },
    methods: {
      async formDataCheck() {
        if (this.formData.introContent === '') {
          message.warn('激活的知识不能为空');
          throw new Error('激活的知识不能为空');
        }
        if (this.formData.introFormat === '') {
          message.warn('激活的方式不能为空');
          throw new Error('激活的方式不能为空');
        }
        if (this.formData.timeCost === '') {
          message.warn('计划完成时间不能为空');
          throw new Error('计划完成时间不能为空');
        }
        if (this.formData.activityContent === '') {
          message.warn('具体活动内容不能为空');
          throw new Error('具体活动内容不能为空');
        }
      },
      async handleClickSave() {
        try {
          await this.formDataCheck();
        } catch (error) {
          return;
        }
        if (this.saveStatus === 'pending') return;
        this.saveStatus = 'pending';
        const hide = message.loading(`${this.formData.id ? '更新' : '创建'}激活卡...`, 0);
        const transformLocalNameToServerRequired = (formData) => ({
          groupId: this.groupId,
          orderNum: this.suggestedIndex,
          relatedKnowledge: formData.introContent,
          activationTypeId: formData.introFormat,
          activationType: this.introductionMethod.data.find((method) => method.value === formData.introFormat).label,
          dictionaryExcepttimeId: formData.timeCost,
          content: formData.activityContent,
        });
        const endPoint = this.isUpdate ? '/updateCard/update' : '/canvasCard/createActivationCard';
        const body = transformLocalNameToServerRequired(this.formData);
        if (this.isUpdate) {
          body.id = this.formData.id;
          body.cardType = 1;
        }
        try {
          let response;
          try {
            response = await client.post(endPoint, body);
          } catch {
            throw {globalHandled: true};
          }
          if (response.status == 200 && response.data.code === 0) {
            this.saveStatus = 'resolved';
            if (this.formData.id) {
              this.$emit('update', {
                id: this.formData.id,
                formData: {...this.formData, id: this.formData.id},
                type: 'introduction',
                timeCost: Number.parseFloat(this.introductionTimeCost.data.find((timeCost) => timeCost.value === this.formData.timeCost).average),
              });
            } else {
              this.$emit('save', {
                id: response.data.data.id,
                formData: {...this.formData, id: response.data.data.id},
                type: 'introduction',
                timeCost: Number.parseFloat(this.introductionTimeCost.data.find((timeCost) => timeCost.value === this.formData.timeCost).average),
              });
            }
            hide();
          } else {
            this.saveStatus = 'rejected';
            hide();
            message.warn(`激活卡${this.formData.id ? '更新' : '创建'}失败，${response.data.mesg}`);
            warning(false, `<Edit>:(handleClickSave): update or create failed`);
          }
        } catch (error) {
          this.saveStatus = 'rejected';
          warning(false, `<Edit>:(handleClickSave):catched Error ${error}`);
          hide();
          if (error.globalHandled !== true) {
            message.warn(`激活卡${this.formData.id ? '更新' : '创建'}失败，${error}`);
          }
        }
      },
      handleClickCanel() {
        this.$emit('cancel');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    // margin-top: 89px;

    & > * {
      margin-left: 8px;
    }
  }

  .star {
    color: red;
  }

  .introduce-items {
    font-size: 20px;
    font-weight: 700;
    color: #066c71;
    text-align: center;
  }

  .introduce-content {
    width: 100%;
    height: 140px;
    margin: 10px 0;
    padding: 10px 0 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    resize: none;
  }

  .introduce-detail {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .introduce-forms,
  .introduce-time {
    width: 48%;
  }

  .forms,
  .time,
  .intro-question,
  .question-describe {
    font-size: 17px;
    // font-weight: 700;
    color: #066c71;
    text-align: center;
  }

  .forms,
  .time {
    height: 30px;
    margin-bottom: 10px;
  }

  .intro-question {
    margin-top: 10px;
  }

  .question-describe {
    font-size: 11px;
  }
  .question-content {
    width: 100%;
    height: 170px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    outline: none;
    margin-top: 20px;
    margin-bottom: 15px;
    padding: 10px 0 0 10px;
  }

  .footer-save {
    background-color: #066c71;
    border: none;
    color: #fff;
  }
  .footer-save:hover {
    background-color: #026f76;
  }

  .footer-cancel {
    background-color: #e5e5e5;
    border: none;
    color: #000;
  }
  .footer-cancel:hover {
    background-color: #d7d7d7;
  }
</style>
