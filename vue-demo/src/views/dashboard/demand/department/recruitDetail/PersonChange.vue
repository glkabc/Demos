<template>
  <div>
    <div>
      <span class="position-name">招聘负责人</span>
      <a-select
        showSearch
        :value="inputValue"
        placeholder="请选择招聘负责人"
        @change="handlePostChange"
        style="width: 350px"
        :getPopupContainer="
          (triggerNode) => {
            return triggerNode.parentNode || document.body;
          }
        "
        optionFilterProp="children"
      >
      <a-icon slot="suffixIcon" type="smile" />
        <a-select-option
          :value="item.userId"
          v-for="item in userList"
          :key="item.userId"
          >{{ item.userName }}</a-select-option
        >
      <a-icon slot="suffixIcon" type="meh" />
      </a-select>
    </div>
    <div style="display: flex;margin-top: 20px">
      <span class="position-name">变更原因</span>
      <a-textarea
        placeholder="请输入备注"
        :rows="4"
        style="width: 350px"
        v-model="departmentValue"
        @change="handleChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ['userList'],
  data() {
    return {
      inputValue: undefined,
      departmentValue: ''
    };
  },
  watch: {
    userList(val) {
      this.userList = val;
    },
  },
  methods: {
    handlePostChange(value) {
      this.inputValue = value
      this.$emit('update:specialistValue', value)
    },
    handleChange(e) {
      this.$emit('update:remarkValue',e.target.value)
    }
  },
};
</script>
<style scoped>
.position-name {
  margin: 0 15px 0 10px;
  color: #78909c;
  font-weight: 600;
  text-align: right;
  width: 70px;
}
</style>
