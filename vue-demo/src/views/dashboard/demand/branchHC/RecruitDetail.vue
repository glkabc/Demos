<template>
  <a-modal
    title="职位详情"
    v-model="detailVisible"
    width="640px"
    :footer="null"
    :closable="false"
    @cancel="handleClose"
    centered
  >
    <div class="recruit-detail">
      <a-row class="row">
        <a-col :span="4" class="status">
          <div>招聘部门</div>
          <div>职位名称</div>
          <div>职位类别</div>
          <div>职位性质</div>
          <div>工作年限</div>
         
          <div>学历要求</div>
          <div>面试地址</div>
         
          
          
          <!-- <div>工作地点</div>
          <div>薪资范围</div>
          <div>简历筛选人</div>
          <div>资源库类型</div>
          <div>抄送人</div> -->
        </a-col>
        <a-col :span="9" class="specific">
          <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.organizeName ? list.organizeName : '暂无' }}</div>
            </template>
            <div class="organieName">
              {{ list.organizeName ? list.organizeName : '暂无' }}
            </div>
          </a-tooltip>
          <div>{{ list.positionName }}</div>
          <!-- <div>{{ list.jobTypeName ? list.jobTypeName: "暂无"}}</div> -->
          <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.jobTypeName ? list.jobTypeName: "暂无"}}</div>
            </template>
            <div class="organieName">
              {{ list.jobTypeName ? list.jobTypeName: "暂无"}}
            </div>
          </a-tooltip>
          <div>{{getJobTypesLabel(list.jobNature)}}</div>
          <div>{{getExperienceLabel(list.workSeniority )}}</div>
         
          <div>{{ list.educationName ? list.educationName:"暂无"}}</div>
          <div>{{ list.interviewAddress ?list.interviewAddress:"暂无"}}</div>
        </a-col>
        <a-col :span="4" class="status">
          <div>简历筛选人</div>
          <div>初始官</div>
          <div>复试官</div>
          <div>抄送人</div>
           <div>薪资范围</div>
           <div>工作地点</div>
        </a-col>
        <a-col :span="7" class="specific">
          <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.resumeFilterName ? list.resumeFilterName : '暂无' }}</div>
            </template>
            <div class="organieName">
              {{ list.resumeFilterName ? list.resumeFilterName : '暂无' }}
            </div>
          </a-tooltip>
          <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.interviewerName ? list.interviewerName : '暂无' }}</div>
            </template>
            <div class="organieName">
              {{ list.interviewerName ? list.interviewerName : '暂无' }}
            </div>
          </a-tooltip>
           <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.reInterviewerName ? list.reInterviewerName : '暂无' }}</div>
            </template>
            <div class="organieName">
              {{ list.reInterviewerName ? list.reInterviewerName : '暂无' }}
            </div>
          </a-tooltip>
          <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.copyToName ? list.copyToName : '暂无' }}</div>
            </template>
            <div class="organieName">
              {{ list.copyToName ? list.copyToName : '暂无' }}
            </div>
          </a-tooltip>
           <div>{{ list.minSalary }} ~ {{ list.maxSalary }}</div>
           <div>{{ list.workPlace ? list.workPlace : '暂无' }}</div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="4">
          <div class="job">职位描述</div>
        </a-col>
        <a-col :span="20">
          任职资格：
          <pre class="job-details">{{
            list.jobDeions ? list.jobDeions : '暂无'
          }}</pre>
          岗位职责：
          <pre class="job-details">{{
            list.comments ? list.comments : '暂无'
          }}</pre>
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('status')
export default {
  props: ['show', 'list'],
  data() {
    return {
      detailVisible: false,
    }
  },
  computed: {
    ...mapState({
      educations: (state) => state.educationRequires,
      jobTypes: (state) => state.jobTypes,
      experiences: (state) => state.jobExperiences,
    }),
  },
  watch: {
    show(e) {
      console.log(e,'e')
      this.detailVisible = e
    },
  },
  methods: {
    handleClose() {
      this.$emit('update:show', false)
    },
    getJobTypesLabel(value) {
      const matched = this.jobTypes.find((jobTypes) => jobTypes.value === value)
      if (matched) {
        return matched.label
      } else {
        return '未匹配到工作性质'
      }
    },
    getEducationLabel(value) {
      const matched = this.educations.find(
        (education) => education.value === value
      )
      if (matched) {
        return matched.label
      } else {
        return '未匹配到学历'
      }
    },
    getExperienceLabel(value) {
      const matched = this.experiences.find(
        (experience) => experience.value === value
      )
      if (matched) {
        return matched.label
      } else {
        return '未匹配到经验'
      }
    },
  },
}
</script>

<style>
.recruit-detail {
  height: 100%;
  width: 100%;
  border: 1px solid #e2e2e2;
}
.recruit-detail .row {
  padding: 0;
  border-bottom: 1px solid #e2e2e2;
}
.recruit-detail div {
  /* padding: 8px 0; */
  line-height: 42px;
}
.recruit-detail .status,
.recruit-detail .job {
  background-color: #f5f8fb;
  text-align: right;
  padding-right: 13px;
  font-weight: bold;
  color: #78909c;
}
.recruit-detail .job {
  background-color: #ffffff;
}
.recruit-detail .specific {
  background-color: #ffffff;
  padding-left: 13px;
  color: #333333;
}
.recruit-detail .organieName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.recruit-detail .job-details {
  /* padding: 7px 44px 8px 13px; */
  color: #333333;
  line-height: 22px;
}
</style>
