<template>
  <div>
    <a-modal 
    width="60%"
    :visible="modalkVisible" 
    @ok="handleOk" 
    @cancel="handleCancel"
    title="备注">
      <div style="height: 500px; overflow-y: scroll" v-if="remarkList">
        <a-timeline style="margin-top:5px">
          <a-timeline-item v-for="(item, index) in remarkList" :key="index">
            <div class="log-list__item__delta full">
              <span style="color: #333333; font-size: 14px; font-weight: 700"
                >沟通HR：{{
                  item.createUserName ? item.createUserName : "暂无"
                }}</span
              >
              <span style="color: #333333; font-size: 14px; font-weight: 700">{{
                item.createUserTime
                  ? moment(item.createUserTime).format("YYYY-MM-DD")
                  : "暂无"
              }}</span>
            </div>
            <div>
              <span class="title">在职状态：</span>
              <span class="content">
                {{ getHasJob(item.workstatusId) }}
              </span>
            </div>
            <div>
              <span class="title">预计入职时间：</span>
              <span class="content">
                {{
                  item.arrivalTime
                    ? moment(item.arrivalTime).format("YYYY-MM-DD")
                    : "暂无"
                }}
              </span>
            </div>
            <div class="log-list__item__delta">
              <span class="title">当前月薪：</span>
              <span class="content">
                {{ item.currWage ? `${item.currWage}元/月` : "暂无" }}
              </span>
            </div>
            <div class="log-list__item__delta">
              <span class="title">加入百得意愿：</span>
              <span
                class="content"
                v-text="item.isJoin === 0 ? '否' : '是'"
              ></span>
            </div>
            <div class="log-list__item__delta">
              <span class="title">期望月薪：</span>
              <span class="content">
                <!-- {{ getExpectedSalary(log.expectWage) }} -->
                {{ item.currWage ? `${item.expectWage}元/月` : "暂无" }}
              </span>
            </div>
            <div class="log-list__item__delta full">
              <span class="title">离职原因：</span>
              <span class="content">
                {{ item.dimissionReason ? item.dimissionReason : "暂无" }}
              </span>
            </div>
            <div class="log-list__item__delta full">
              <span class="title">HR评价：</span>
              <span class="content">
                {{ item.remark ? item.remark : "暂无" }}
              </span>
            </div>
          </a-timeline-item>
        </a-timeline>
      </div>
      <div v-else>
          <a-empty  />
      </div>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
export default {
  name: "CandidateRemark",
  props: ["remarkVisible", "remarkList"],
  watch: {
    remarkVisible(e) {
      this.modalkVisible = e;
    },
  },
  data() {
    return {
      modalkVisible: false,
    };
  },
  computed: {
    ...mapState({
      hasJob: (state) => state.hasJob,
    }),
  },
  methods: {
    moment,
    handleOk() {
      this.$emit("update:remarkVisible", false);
    },
    handleCancel() {
      this.$emit("update:remarkVisible", false);
    },
    getHasJob(value) {
      if (!value) {
        return "暂无";
      } else {
        const matched = this.hasJob.find((item) => item.value === value);
        if (matched) {
          return matched.label;
        } else {
          return "暂无";
        }
      }
    },
  },
};
</script>

<style>
</style>