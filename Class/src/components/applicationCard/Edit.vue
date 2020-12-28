<template>
  <CardLayout
    title="C 应用卡"
    subTitle="这张活动卡要通过设计练习活动，让学生在应用新知的过程中更好地掌握新知"
    color="#e3635c"
  >
    <div class="content-wrapper">
      <div class="form-item">
        <h5 class="form-item__title large required">
          为了让学生应用这个知识点，我要设计的练习是什么？
        </h5>
        <AntSelect
          class="custom-select"
          :options="applicationMethodOption"
          v-model="formData.how"
        />
      </div>
      <div class="form-item">
        <h5 class="form-item__title required">
          我计划用多久来完成？
        </h5>
        <AntSelect
          class="custom-select"
          :options="timeCostOption"
          v-model="formData.timeCost"
        />
      </div>
      <div class="form-item">
        <h5 class="form-item__title required">这个练习的具体内容是什么？</h5>
        <h6 class="form-item__subtitle">
          如: 提问的题目内容、活动的时间/步骤、讨论的主题/时间等等
        </h6>
        <AntTextArea
          class="custom-textarea"
          :rows="4"
          :autoSize="{minRows: 12, maxRows: 12}"
          v-model="formData.description"
        />
      </div>
      <div class="button-container">
        <AntButton
          @click="handleClickCanel"
          :disabled="apiStatus === 'pending'"
          size="large"
        >
          取消
        </AntButton>
        <AntButton
          @click="handleClickSave"
          type="primary"
          :disabled="apiStatus === 'pending'"
          :loading="apiStatus === 'pending'"
          size="large"
        >
          {{ isUpdate ? '更新' : '创建' }}
        </AntButton>
      </div>
    </div>
  </CardLayout>
</template>

<script>
  import Card from '../Card';
  import {Button, Select, Input, message} from 'ant-design-vue';
  import warning from 'warning';
  import {createNamespacedHelpers} from 'vuex';
  import client from '@/configs/request';

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
      AntTextArea: Input.TextArea,
    },
    props: {
      originFormData: Object,
      groupId: Number,
      suggestedIndex: Number,
    },
    data() {
      return {
        formData: {
          how: '',
          timeCost: '',
          description: '',
        },
        apiStatus: 'idle',
      };
    },
    computed: {
      ...canvasMapState(['applicationMethod', 'applicationTimeCost']),
      isUpdate() {
        return Boolean(this.formData.id);
      },
      applicationMethodOption() {
        if (this.applicationMethod.status === 'pending') {
          return [{label: '数据加载中...', value: 'pending', disabled: true}];
        } else if (this.applicationMethod.status === 'rejected') {
          return [{label: '数据加载失败', value: 'rejected', disabled: true}];
        } else if (this.applicationMethod.status === 'resolved') {
          return this.applicationMethod.data;
        } else {
          return [];
        }
      },
      timeCostOption() {
        if (this.applicationTimeCost.status === 'pending') {
          return [{label: '数据加载中...', value: 'pending', disabled: true}];
        } else if (this.applicationTimeCost.status === 'rejected') {
          return [{label: '数据加载失败', value: 'rejected', disabled: true}];
        } else if (this.applicationTimeCost.status === 'resolved') {
          return this.applicationTimeCost.data;
        } else {
          return [];
        }
      },
    },
    created() {
      if (this.originFormData) {
        this.formData.id = this.originFormData.id;
        this.formData.how = this.originFormData.how;
        this.formData.timeCost = this.originFormData.timeCost;
        this.formData.description = this.originFormData.description;
      }
    },
    methods: {
      async formDataCheck() {
        if (this.formData.how === '') {
          message.warn('练习不能为空');
          throw new Error('练习不能为空');
        }
        if (this.formData.timeCost === '') {
          message.warn('计划时间不能为空');
          throw new Error('计划时间不能为空');
        }
        if (this.formData.description === '') {
          message.warn('练习具体内容不能为空');
          throw new Error('练习具体内容不能为空');
        }
      },
      async handleClickSave() {
        try {
          await this.formDataCheck();
        } catch (error) {
          return;
        }
        if (this.apiStatus === 'pending') return;
        this.apiStatus = 'pending';
        const hide = message.loading(
          `${this.isUpdate ? '更新' : '创建'}应用卡...`,
          0
        );
        try {
          const transformLocalNameToServerRequired = (formData) => ({
            groupId: this.groupId,
            practiceId: formData.how,
            practice: this.applicationMethod.data.find(
              (method) => method.value === formData.how
            ).label,
            dictionaryExcepttimeId: formData.timeCost,
            content: formData.description,
            orderNum: this.suggestedIndex,
          });
          const apiEndPoint = this.isUpdate
            ? '/updateCard/update'
            : '/canvasCard/createApplicationCard';
          const body = transformLocalNameToServerRequired(this.formData);
          if (this.isUpdate) {
            body.id = this.formData.id;
            body.cardType = 3;
          }
          let response;
          try {
            response = await client.post(apiEndPoint, body);
          } catch {
            throw {globalHandled: true};
          }
          if (response.status === 200 && response.data.code === 0) {
            this.apiStatus = 'resolved';
            if (this.isUpdate) {
              this.$emit('update', {
                id: this.formData.id,
                formData: this.formData,
                type: 'application',
                timeCost: Number.parseFloat(
                  this.applicationTimeCost.data.find(
                    (timeCost) => timeCost.value === this.formData.timeCost
                  ).average
                ),
              });
            } else {
              this.$emit('save', {
                id: response.data.data.id,
                formData: {...this.formData, id: response.data.data.id},
                type: 'application',
                timeCost: Number.parseFloat(
                  this.applicationTimeCost.data.find(
                    (timeCost) => timeCost.value === this.formData.timeCost
                  ).average
                ),
              });
            }
            hide();
          } else {
            hide();
            message.warn(
              `应用卡${this.isUpdate ? '更新' : '创建'}失败，${
                response.data.mesg
              }`
            );
            this.apiStatus = 'rejected';
            warning(false, `<Edit>:(handleClickSave): update or create failed`);
          }
        } catch (error) {
          hide();
          this.apiStatus = 'rejected';
          warning(false, `<Edit>:(handleClickSave):catched Error ${error}`);
          if (error.globalHandled !== true) {
            message.warn(`应用卡${this.isUpdate ? '更新' : '创建'}失败`);
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
  .content-wrapper {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    .form-item {
      width: 100%;

      &.half-width {
        width: 48%;
      }
      &__title {
        font-size: 17px;
        color: #e3635c;
        text-align: center;
        display: flex;
        justify-content: center;
      }
      &__title.large {
        font-size: 20px;
        font-weight: bold;
      }
      &__title.required::before {
        content: '*';
        display: block;
        color: red;
      }
      &__subtitle {
        font-size: 11px;
        color: #e3635c;
        text-align: center;
      }

      .custom-select {
        width: 100%;
      }
      .custom-text-area {
        width: 100%;
      }
    }
    .button-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;

      & > * {
        margin-left: 8px;
      }

      .ant-btn {
        background-color: #e5e5e5;
        border-color: #e5e5e5;
        color: #666;

        &:hover {
          background-color: #d7d7d7;
          border-color: #d7d7d7;
        }
      }
      .ant-btn.ant-btn-primary {
        background-color: #e3635c;
        border-color: #e3635c;
        color: #fff;

        &:hover {
          background-color: #df5a54;
          border-color: #df5a54;
        }
      }
    }
  }
</style>
