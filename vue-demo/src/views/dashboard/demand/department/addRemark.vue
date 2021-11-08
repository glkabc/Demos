<template>
  <div>
    <a-modal
      :visible="RemarkVisible"
      title="备注信息"
      @ok="handleOk"
      @cancel="handleCancel"
      width="60%"
    >
      <a-form
        ref="remarkForm"
        :model="remarkForm"
        size="small"
         :label-col="{ span: 5 }" 
         :wrapper-col="{ span: 12 }"
         @submit="handleSubmit"
      >
        <a-form-item label="工作现状" prop="workstatus">
          <a-input
            v-model="remarkForm.workstatus"
            type="text"
            placeholder="填写工作现状"
          />
        </a-form-item>

        <a-form-item label="入职时间" prop="arrival_time">
          <a-input
            v-model="remarkForm.arrival_time"
            type="text"
            placeholder="填写估计入职时间"
          />
        </a-form-item>

        <a-form-item label="目前薪资" prop="curr_wage">
          <a-input
            v-model="remarkForm.curr_wage"
            type="text"
            placeholder="填写目前薪资"
          />
        </a-form-item>
        <a-form-item label="期望薪资" prop="expect_wage">
          <a-input
            v-model="remarkForm.expect_wage"
            type="text"
            placeholder="填写期望薪资"
          />
        </a-form-item>
        <a-form-item label="其它说明" prop="remark">
          <a-input
            v-model="remarkForm.remark"
            type="textarea"
            placeholder="其它说明"
          />
        </a-form-item>
      </a-form>
      <div slot="footer" class="dialog-footer">
        <a-button @click="cancalAdd">取 消</a-button>
        <a-button type="primary" @click="handleSubmit">确 定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "addRemark",
  props: ["addRemarkVisible"],
  data() {
    return {
      RemarkVisible: false,
      remarkForm: {
        remark: "",
        resume_flow_id: [],
        curr_wage: "",
        workstatus: "",
        arrival_time: "",
        expect_wage: "",
      },
    //   labelPosition:"right"
    };
  },
  watch: {
    addRemarkVisible(e) {
      this.RemarkVisible = e;
    },
  },
  methods: {
    handleOk() {
      this.$emit("update:addRemarkVisible", false);
    },
    handleCancel() {
      this.$emit("update:addRemarkVisible", false);
    },
    cancalAdd(){
     this.$emit("update:addRemarkVisible", false);
    },
    handleSubmit(){}
  },
};
</script>

<style>
</style>