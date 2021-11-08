<template>
  <div class="table-header-container">
    <div class="flex-container">
      <div class="table-header-item table-header-item--nogrow">
        <a-checkbox
          :indeterminate="indeterminate"
          :disabled="disableSelectAll"
          :checked="checked"
          @change="handleToggleSelectAll"
        />
      </div>
      <div class="table-header-item">
        <span class="table-header-item__title">学历</span>
        <a-select
          class="table-header-item__input"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
          @change="handleEducationChange"
          :value="education"
        >
          <a-select-option value=""> 所有 </a-select-option>
          <a-select-option
            v-for="education of educations"
            :key="education.value"
            >{{ education.label }}</a-select-option
          >
        </a-select>
      </div>
      <div class="table-header-item">
        <span class="table-header-item__title">工作年限</span>
        <a-select
          class="table-header-item__input"
          @change="handleExperienceChange"
          :value="workExperience"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
        >
          <a-select-option value=""> 所有 </a-select-option>
          <a-select-option
            v-for="experience of experiences"
            :value="experience.value"
            :key="experience.value"
            >{{ experience.label }}</a-select-option
          >
        </a-select>
      </div>
      <div class="table-header-item">
        <span class="table-header-item__title">查看范围</span>
        <a-select
          defaultValue="请选择查看范围"
          class="table-header-item__input"
          @change="handleRangeChange"
          :value="range"
          :getPopupContainer="(triggerNode) => triggerNode.parentNode"
        >
          <a-select-option value=""> 所有 </a-select-option>
          <a-select-option
            v-for="range of ranges"
            :value="range.value"
            :key="range.value"
            >{{ range.label }}</a-select-option
          >
        </a-select>
      </div>
      <div class="table-header-item">
        <span class="table-header-item__title">开始时间</span>
        <a-date-picker
          format="YYYY-MM-DD"
          class="table-header-item__input"
          @change="handleDateBeginChange"
          :value="dateBeginAt ? moment(dateBeginAt) : null"
        />
      </div>
      <div class="table-header-item">
        <span class="table-header-item__title">结束时间</span>
        <a-date-picker
          format="YYYY-MM-DD"
          class="table-header-item__input"
          @change="handleDateEndChange"
          :value="dateEndAt ? moment(dateEndAt) : null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
export default {
  name: "TableHeader",
  props: {
    education: [Number, String],
    workExperience: [Number, String],
    range: [Number, String],
    dateBeginAt: String,
    dateEndAt: String,
    indeterminate: Boolean,
    checked: Boolean,
    disableSelectAll: Boolean,
  },
  computed: {
    ...mapState({
      educations: (state) => state.educationRequires,
      experiences: (state) => state.jobExperiences,
      ranges: (state) => state.resumeBelong,
    }),
  },
  methods: {
    moment,
    handleToggleSelectAll() {
      this.$emit("toggle-select-all");
    },
    handleEducationChange(value) {
      this.$emit("update:education", value);
    },
    handleExperienceChange(value) {
      this.$emit("update:workExperience", value);
    },
    handleRangeChange(value) {
      this.$emit("update:range", value);
    },
    handleDateBeginChange(value) {
      const formatedValue =
        value instanceof moment ? value.format("YYYY-MM-DD") : null;
      this.$emit("update:dateBeginAt", formatedValue);
    },
    handleDateEndChange(value) {
      const formatedValue =
        value instanceof moment ? value.format("YYYY-MM-DD") : null;
      this.$emit("update:dateEndAt", formatedValue);
    },
  },
};
</script>

<style scoped>
.table-header-container {
  padding: 8px;
  border-color: #e8e8e8;
  border-width: 1px;
  border-top-style: solid;
  border-left-style: solid;
  border-right-style: solid;
  background-color: #f9f9f9;
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
  margin: -8px;
}

.table-header-item {
  padding: 8px;
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}

.table-header-item__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #657d8a;
  flex-shrink: 0;
  margin-right: 4px;
}

.table-header-item__input {
  flex: 1;
}

.table-header-item--nogrow {
  flex-grow: 0;
  padding-left: 27px;
  padding-right: 35px;
}
</style>
