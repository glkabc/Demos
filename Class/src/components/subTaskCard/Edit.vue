<template>
  <CardLayout
    title="T 子任务卡"
    subTitle="这张活动卡通过设计一个有可见产出的子任务（里程碑），确保学生完成阶段交付目标"
    color="#1ba2c9"
  >
    <!-- 子任务卡的编辑区域 -->
    <div class="container">
      <div class="sub-task">
        <span class="star">*</span> 这个子任务/里程碑的名称是什么?
      </div>
      <textarea
        type="text"
        class="sub-task-name"
        v-model="formData.name"
      ></textarea>
      <div class="task-detail">
        <!-- 任务完成的形式 -->
        <div class="task-forms">
          <div class="forms">
            <span class="star">*</span>
            我要通过什么活动形式让学生完成这个子任务?
          </div>
          <div class="select">
            <AntSelect
              style="width:100%"
              v-model="formData.teachingFormat"
              :options="teachingMethodOptions"
            >
              <AntSelectOption></AntSelectOption>
            </AntSelect>
          </div>
        </div>
        <!-- 子任务完成的时间 -->
        <div class="subtask-time">
          <div class="time">
            <span class="star">*</span>
            我预期学生多久可以做完该任务（不含知识讲解时间）?
          </div>
          <div class="select">
            <AntSelect
              style="width:100%"
              v-model="formData.timeCost"
              :options="timeCostOptions"
            >
              <AntSelectOption></AntSelectOption>
            </AntSelect>
          </div>
        </div>
      </div>
      <div class="task-question">
        <span class="star">*</span> 这个子任务的具体要求是什么？
      </div>
      <div class="question-describe">
        如：产物的具体要求、任务的时间/步骤、讨论的主题/时间、展示的要求等等
      </div>
      <textarea
        class="question-content"
        v-model="formData.requirement"
      ></textarea>
      <!-- 底部按钮区域 -->
      <div class="button-container">
        <AntButton
          class="footer-cancel"
          type="default"
          size="large"
          @click="handleClickCanel"
          :disabled="saveStatus === 'pending'"
        >
          取消
        </AntButton>
        <AntButton
          type="default"
          class="footer-save"
          size="large"
          @click="handleClickSave"
          :disabled="saveStatus === 'pending'"
          :loading="saveStatus === 'pending'"
        >
          {{ isUpdate ? '更新' : '创建' }}
        </AntButton>
      </div>
    </div>
  </CardLayout>
</template>

<script>
  import Card from '../Card';
  import {Button, message, Select} from 'ant-design-vue';
  import client from '@/configs/request';
  import {createNamespacedHelpers} from 'vuex';
  import warning from 'warning';

  const {mapState} = createNamespacedHelpers('canvas');

  export default {
    name: 'Edit',
    components: {
      CardLayout: Card,
      AntButton: Button,
      AntSelect: Select,
      AntSelectOption: Select.Option,
    },
    props: {
      subTaskId: Number,
      classId: String,
      originFormData: {
        type: Object,
      },
    },
    created() {
      if (this.originFormData) {
        this.formData = {
          id: this.originFormData.id,
          name: this.originFormData.name,
          teachingFormat: this.originFormData.teachingFormat,
          timeCost: this.originFormData.timeCost,
          requirement: this.originFormData.requirement,
        };
      }
    },
    data() {
      return {
        formData: {
          name: '',
          teachingFormat: '',
          timeCost: '',
          requirement: '',
        },
        saveStatus: 'idle',
      };
    },
    computed: {
      ...mapState(['teachingFormat', 'subTaskTimeCost']),
      isUpdate() {
        return Boolean(this.formData.id);
      },
      teachingMethodOptions() {
        if (this.teachingFormat.status === 'resolved') {
          return this.teachingFormat.data;
        } else if (this.teachingFormat.status === 'pending') {
          return [{label: '加载中', value: 'pending', disabled: true}];
        } else {
          return [{label: '加载失败', value: 'error', disabled: true}];
        }
      },
      timeCostOptions() {
        if (this.subTaskTimeCost.status === 'resolved') {
          return [...this.subTaskTimeCost.data];
        } else if (this.subTaskTimeCost.status === 'pending') {
          return [{label: '加载中', value: 'pending', disabled: true}];
        } else {
          return [{label: '加载失败', value: 'error', disabled: true}];
        }
      },
    },
    watch: {
      'teachingFormat.status'(status) {
        if (status === 'pending') {
          this.formData.teachingFormat = 'pending';
        }
      },
    },
    methods: {
      async formDataCheck() {
        if (this.formData.name === '') {
          message.warn('子任务名称不能为空');
          throw new Error('子任务名称不能为空');
        }
        if (this.formData.teachingFormat === '') {
          message.warn('活动形式不能为空');
          throw new Error('活动形式不能为空');
        }
        if (this.formData.timeCost === '') {
          message.warn('计划完成时间不能为空');
          throw new Error('计划完成时间不能为空');
        }
        if (this.formData.requirement === '') {
          message.warn('具体要求不能为空');
          throw new Error('具体要求不能为空');
        }
      },
      async handleClickSave() {
        // TODO非空验证，有错误用message函数提示，并且从此方法返回
        try {
          await this.formDataCheck();
        } catch (error) {
          return;
        }
        // 防止多次点击触发多次请求
        if (this.saveStatus === 'pending') return;
        this.saveStatus = 'pending';
        const hide = message.loading(
          `${this.formData.id ? '更新' : '创建'}子任务...`,
          0
        );
        try {
          const transformLocalNameToServerRequired = (formData) => {
            return {
              name: formData.name,
              specificRequirements: formData.requirement,
              activityTypeId: formData.teachingFormat,
              activityType: this.teachingFormat.data.find(
                (format) => format.value === formData.teachingFormat
              ).label,
              dictionaryExcepttimeId: formData.timeCost,
            };
          };

          let endPoint = '';
          let body = transformLocalNameToServerRequired(this.formData);
          if (!this.formData.id) {
            endPoint = '/canvasCard/createSubtaskCard';
            body.capsuleId = this.subTaskId;
          } else {
            endPoint = '/canvas/updateSubtask';
            body.id = this.formData.id;
          }
          let response;
          try {
            response = await client.post(endPoint, body);
          } catch {
            throw {globalHandled: true};
          }
          if (response.status === 200 && response.data.code === 0) {
            this.saveStatus = 'resolved';
            const id = this.formData.id
              ? this.formData.id
              : response.data.data.id;
            this.$emit('save', {
              id,
              formData: {...this.formData, id},
              type: 'subTask',
              timeCost: Number.parseFloat(
                this.subTaskTimeCost.data.find(
                  (timeCost) => timeCost.value === this.formData.timeCost
                ).average
              ),
            });
            hide();
          } else {
            this.saveStatus = 'rejected';
            hide();
            message.warn(
              `子任务卡${this.formData.id ? '更新' : '创建'}失败，${
                response.data.mesg
              }`
            );
          }
        } catch (error) {
          this.saveStatus = 'rejected';
          hide();
          if (error.globalHandled !== true) {
            message.warn(`子任务卡${this.formData.id ? '更新' : '创建'}失败`);
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
    // margin-top: 67px;

    & > * {
      margin-left: 8px;
    }
  }

  .star {
    color: red;
  }

  .sub-task {
    font-size: 20px;
    font-weight: 700;
    color: rgb(27, 162, 201);
    text-align: center;
  }

  .sub-task-name {
    width: 100%;
    height: 140px;
    margin-top: 10px;
    padding: 10px 0 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    resize: none;
  }

  .task-detail {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .task-forms,
  .subtask-time {
    width: 48%;
  }

  .forms,
  .time,
  .task-question,
  .question-describe {
    font-size: 17px;
    // font-weight: 700;
    color: rgb(27, 162, 201);
    text-align: center;
    margin-bottom: 10px;
  }
  .forms,
  .time {
    height: 44px;
    margin: 15px 0;
  }

  .task-question {
    margin: 10px 0;
  }

  .question-describe {
    font-size: 11px;
  }
  .question-content {
    width: 100%;
    height: 165px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    outline: none;
    // margin-top: 10px;
    padding: 10px 0 0 10px;
  }

  .footer-save {
    background-color: rgb(27, 162, 201);
    border: none;
    color: #fff;
  }

  .footer-save:hover {
    background-color: #099ac1;
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
