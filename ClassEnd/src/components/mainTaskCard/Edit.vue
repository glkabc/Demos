<template>
  <CardLayout
    title="P 总任务说明"
    subTitle="这张活动卡通过设计一个总任务（项目），来确保学生在周期内达到最终的交付目标"
    color="#06629c"
  >
    <!-- 主任务卡编辑内容区域 -->
    <div class="container">
      <div class="main-task">
        <span class="star">*</span> 这个总任务/项目的名称是什么?
      </div>
      <textarea
        type="text"
        v-model="formData.name"
        class="main-task-name"
      ></textarea>
      <!-- 下拉框区域 -->
      <div class="task-detail">
        <!-- 子任务完成的时间 -->
        <div class="task-time">
          <div class="time">
            <span class="star">*</span>
            我计划用多少课时开展该项目（包含知识讲解时间）
          </div>
          <input
            type="text"
            class="time-content"
            disabled
            v-model="formData.timeContent"
          />
        </div>
        <!-- 任务完成的形式 -->
        <div class="task-num">
          <div class="num">
            <span class="star">*</span> 我计划分解为多少个子任务?
          </div>
          <input
            type="text"
            class="num-content"
            disabled
            v-model="formData.numContent"
          />
        </div>
      </div>

      <div class="task-question">
        <span class="star">*</span> 该任务的最终产物和评价标准是什么？
      </div>
      <textarea
        class="question-content1"
        v-model="formData.criteria"
      ></textarea>
      <div class="task-question">
        <span class="star">*</span>
        如果可以，我能为任务创设一个怎样的真实且有趣的发生情景？
      </div>
      <textarea class="question-content2" v-model="formData.scene"></textarea>
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
  import {Button, Select, message} from 'ant-design-vue';
  import axios from 'axios';
  import client from '@/configs/request';

  export default {
    name: 'Edit',
    components: {
      CardLayout: Card,
      AntButton: Button,
      AntSelect: Select,
      AntSelectOption: Select.Option,
      // AntIcon: Icon,
    },
    props: {
      classId: String,
      originFormData: Object,
    },
    data() {
      return {
        formData: {
          name: '',
          timeContent: '系统自动计算',
          numContent: '系统自动计算',
          criteria: '',
          scene: '',
        },
        saveStatus: 'idle', // 'idle' | 'pending' | 'resolved' | 'rejected
      };
    },
    computed: {
      isUpdate() {
        return Boolean(this.formData.id);
      },
    },
    created() {
      if (this.originFormData) {
        this.formData = {
          id: this.originFormData.id,
          name: this.originFormData.name,
          criteria: this.originFormData.criteria,
          scene: this.originFormData.scene,
          timeContent: this.originFormData.timeContent,
          numContent: this.originFormData.numContent,
        };
      }
    },
    methods: {
      async formDataCheck() {
        if (this.formData.name === '') {
          message.warn('总任务名称不能为空');
          throw new Error('总任务名称不能为空');
        }
        if (this.formData.criteria === '') {
          message.warn('总任务的最终产物和评价标准不能为空');
          throw new Error('总任务的最终产物和评价标准不能为空');
        }
        if (this.formData.scene === '') {
          message.warn('发生情景不能为空');
          throw new Error('发生情景不能为空');
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
        const hide = this.$message.loading(
          `${this.formData.id ? '更新' : '创建'}主任务...`,
          0
        );

        const transformLocalNameToServerRequired = (formData) => ({
          name: formData.name,
          finalProduct: formData.criteria,
          designSight: formData.scene,
        });

        let endPoint = '';
        let body = transformLocalNameToServerRequired(this.formData);
        if (!this.formData.id) {
          endPoint = '/canvas/createMainTask';
          body.classId = Number.parseInt(this.classId);
        } else {
          endPoint = '/canvas/updateMainTask';
          body.id = this.formData.id;
        }
        try {
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
              type: 'mainTask',
            });
            hide();
          } else {
            this.saveStatus = 'rejected';
            hide();
            message.warn(
              `主任务卡${this.formData.id ? '更新' : '创建'}失败，${
                response.data.mesg
              }`
            );
          }
        } catch (error) {
          this.saveStatus = 'rejected';
          hide();
          if (error.globalHandled !== true) {
            message.warn(`主任务卡${this.formData.id ? '更新' : '创建'}失败`);
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
    // margin-top: 53px;

    & > * {
      margin-left: 8px;
    }
  }
  .star {
    color: red;
  }

  .main-task {
    font-size: 20px;
    font-weight: 700;
    color: #06629c;
    text-align: center;
    margin: 0 0 10px;
  }

  .main-task-name {
    width: 100%;
    height: 90px;
    padding: 10px 0 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    resize: none;
  }

  .task-detail {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .task-num,
  .task-time {
    width: 48%;
  }

  .num,
  .time,
  .task-question {
    font-size: 17px;
    // font-weight: 700;
    color: #06629c;
    margin: 5px 0;
    text-align: center;
  }

  .time-content,
  .num-content {
    width: 100%;
    height: 32px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }

  .num,
  .time {
    height: 44px;
    margin-bottom: 15px;
  }

  .number-btn {
    width: 100%;
  }

  .question-content1 {
    width: 100%;
    height: 90px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    outline: none;
    padding: 10px 0 0 10px;
  }

  .question-content2 {
    width: 100%;
    height: 108px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    outline: none;
    padding: 10px 0 0 10px;
  }

  .task-question {
    text-align: center;
    margin-top: 5px;
  }

  .footer-save {
    background-color: #06629c;
    border: none;
    color: #fff;
  }
  .footer-save:hover {
    background-color: #0e5a93;
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
