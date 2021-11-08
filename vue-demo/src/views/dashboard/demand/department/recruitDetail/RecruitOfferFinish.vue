<template>
  <div class="recursion-action">
    <a-form :form="staffForm">
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="需求部门"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span>{{ recruitList.OrgName }}</span>
          </a-form-item>
          <!-- <a-form-item
            label="需求/订单编号"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span
              >{{ recruitList.demandId }} /
              {{ recruitList.demandName }}</span
            >
          </a-form-item> -->
          <a-form-item
            label="姓名"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span>{{ recruitList.fullName }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="身份证号"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span>{{ recruitList.cardNum }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="职级职等"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span>{{ recruitList.level }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="上级"
            :colon="false"
            :label-col="{ span: 7 }"
            class="spread"
            :wrapper-col="{ span: 17 }"
          >
            <span>{{ recruitList.superName }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="导师"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span>{{ recruitList.teacher }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="公司主体"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
            <span>{{ recruitList.sysCustomName }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="一级部门"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.sysOrgName }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="二级部门"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.sysOrgTname }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="末级部门"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.sysOrgLname }}</span>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="24">
          <a-form-item
            label="录用薪资"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.salary }}</span>
          </a-form-item>
        </a-col> -->
        <a-col :span="24">
          <a-form-item
            label="试用期长度"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.probation }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="社保缴纳地"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.socialCity }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="招聘对接人"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.recruitName }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="PS标准岗位名称"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{recruitList.job?recruitList.job.parentCodeName:'-'}}/{{ recruitList.job?recruitList.job.name:'-'}}</span>
          <!-- <span>{{ recruitList.job.parentCodeName }}/{{ recruitList.job.name}}</span> -->
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="工作地点"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.city == null ? '暂无' : recruitList.city.name}}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="人员编制"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.userAuth == null ? '暂无' : recruitList.userAuth.name}}</span>
            
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="候选人来源"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.talentSource == null ? '暂无': recruitList.talentSource.setupContent }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="确认日期"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.affirmDate }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="入职日期"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.workingDate }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="入场时间"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.entranceDate }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="住宿"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span v-text="recruitList.stay == 1 ? '是': '否'"></span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="安排体检（合肥）"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span v-text="recruitList.arrangePhysical == 1 ? '是': '否'"></span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="挂靠人员"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span v-text="recruitList.affiliatedUser == 1 ? '是': '否'"></span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="特殊事项说明"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.comment }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="offer确认备注"
            :colon="false"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 17 }"
            class="spread"
          >
          <span>{{ recruitList.comments }}</span>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ['recruitOfferList'],
  data() {
    return {
      staffForm: this.$form.createForm(this),
      recruitList:this.recruitOfferList
    };
  },
  watch: {
    recruitOfferList(val) {
      this.recruitList = val
    }
  },
};
</script>

<style>
.recruit-title {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  padding: 0 0px 10px 10px;
}
.spread {
  margin-bottom: 0px;
}
</style>
