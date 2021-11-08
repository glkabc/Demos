<template>
  <div class="conclusion">
    <a-modal
      title="面试结论"
      v-model="staffConcluVisible"
      width="630px"
      :destroyOnClose="true"
      centered
      @cancel="handleClose"
    >
      <a-form :form="staffForm" @submit="handleSubmit">
        <a-row>
          <a-col :span="24">
            <a-form-item
              label="应聘部门"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              :colon="false"
            >
              <span>{{ this.organizeName }}</span>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="面试官"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <span v-for="item in talentList.interviewer" :key="item.interviewerId">{{ item.interviewerName }} </span>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="面试方式"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <span v-text="talentList.interviewName == null ? '暂无': talentList.interviewName"></span>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="面试时间"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <span v-text="talentList.interviewTime == null ? '暂无': talentList.interviewTime"></span>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="面试地点"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <span v-text="talentList.interviewAddr == null ? '暂无': talentList.interviewAddr"></span>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="面试结论"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-radio-group v-decorator="['radioGroup', { initialValue: 2 }]">
                <a-radio
                  :value="item.value"
                  v-for="item in interviewResults"
                  :key="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              label="面试评价"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 14 }"
              :colon="false"
            >
              <a-input
                type="textarea"
                :rows="6"
                v-decorator="['remark']"
                allowClear
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button key="back" @click="handleClose">取消</a-button>
        <a-button
          key="submit"
          style="background: #22B8CF;border: #22B8CF"
          type="primary"
          @click="handleSubmit"
          >确定</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import { UptInterviewComment } from "@api/department/operation";
export default {
  props: ['concluVisible','organizeName','concluList','talentList'],
  data() {
    return {
      staffForm: this.$form.createForm(this),
      value: 1,
      staffConcluVisible: false
    };
  },
  computed: {
    ...mapState({
      interviewResults: (state) => state.interviewList, // 面试结论
    }),
  },
  watch: {
    concluVisible(e){
      this.staffConcluVisible = e
    }
  },
  methods: {
    handleClose(){
      this.$emit('update:concluVisible',false)
    },
    handleSubmit(e) {
      this.staffForm.validateFields((err, values) => {
        if (!err) {
          UptInterviewComment({
            interviewComment: values.remark,
            talentId: this.concluList.talentId, // 候选人id
            status: values.radioGroup,
          }).then((res) => {
            this.$emit('update:concluVisible',false)
            this.$emit("recruit-action", 4);
            if (res.data.code == 0) {
              this.$message.success(res.data.data);
            } else {
              this.$message.error(res.data.mesg);
            }
          });
        }
      });
    },
  },
};
</script>

<style></style>
