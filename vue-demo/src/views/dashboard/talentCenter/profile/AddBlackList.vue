<template>
  <a-modal
    title="加入黑名单"
    :visible="show"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :confirmLoading="isSubmitting"
    destroyOnClose
    centered
  >
    <a-form :form="form">
      <a-form-item
        label="原因"
        :colon="false"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-textarea
          v-decorator="[
            'reason',
            {
              rules: [
                {
                  required: true,
                  message: '请输入加入黑名单原因!',
                },
              ],
            },
          ]"
          placeholder="加入黑名单原因"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { Modal } from "ant-design-vue";
import { addBlackList } from "@/api/talentCenter";
export default {
  name: "AddBlackList",
  components: {
    [Modal.name]: Modal,
  },
  props: {
    show: Boolean,
    ids: Array,
    isBlacklist: Number,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: "addBlackList" }),
      isSubmitting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            this.isSubmitting = true;
            const res = await addBlackList({
              ids: this.ids,
              reason: values.reason,
            });
            this.isSubmitting = false;
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.$message.success("加入黑名单成功", 2);
                this.$emit("update:show", false);
                this.$emit("add-black-list-success");
                this.$emit("update:isBlacklist", 1);
              } else {
                this.$message.error(
                  res.data.mesg ? res.data.mesg : "加入黑名单失败",
                  2
                );
              }
            }
          } catch (error) {
            this.isSubmitting = false;
          }
        }
      });
    },
    handleCancel() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped></style>
