<template>
  <a-modal
    title="职位详情"
    v-model="detailVisible"
     width="800px"
    :footer="null"
    @cancel="handleClose"
    centered
  >
    <div class="recruit-detail">
      <a-row class="row">
        <a-col :span="4" class="status">
          <div class="add-border">职位名称</div>
          <div class="add-border">招聘部门</div>
          <div class="add-border">工作地点</div>
          <!-- <div class="add-border">薪资范围</div> -->
          <div class="add-border">简历筛选人</div>
          <div class="add-border">初试面试官</div>
          <div class="add-border">复试面试官</div>
          <!-- <div class="add-border">资源库类型</div> -->
          <div >抄送人</div>
          
        </a-col>
        <a-col :span="9" class="specific">
          <div class="organieName add-border-detail">{{ list.positionName?list.positionName:'暂无' }}</div>
          <a-tooltip>
            <template slot="title">
              <div>{{ list.organizeName ? list.organizeName : '暂无' }}</div>
            </template>
            <div class="organieName add-border-detail">
              {{ list.organizeName ? list.organizeName : '暂无' }}
            </div>
          </a-tooltip>
          <div class="organieName add-border-detail">{{ list.workPlace ? list.workPlace : '暂无' }}</div>
          <!-- <div class="organieName add-border-detail">{{ list.minSalary }} ~ {{ list.maxSalary }}</div> -->
          <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.resumeFilterName ? list.resumeFilterName : '暂无' }}</div>
            </template>
            <div class="organieName add-border-detail-last" style="border-bottom: 1px solid #e2e2e2;">
              {{ list.resumeFilterName ? list.resumeFilterName : '暂无' }}
            </div>
          </a-tooltip>
          <a-tooltip>
            <template slot="title">
               <div>
                 {{ list.interviewerName ? list.interviewerName : '暂无' }}
              </div>
            </template>
            <div class="organieName add-border-top-bottom">
              {{ list.interviewerName ? list.interviewerName  : '暂无' }}
            </div>
          </a-tooltip>
          <a-tooltip>
            <template slot="title">
               <div>
                 {{ list.reInterviewerName ? list.reInterviewerName : '暂无' }}
              </div>
            </template>
            <div class="organieName add-border-top-bottom">
              {{ list.reInterviewerName ? list.reInterviewerName  : '暂无' }}
            </div>
          </a-tooltip>
          <!-- <div class="organieName add-border-detail">默认</div> -->
          <a-tooltip>
            <template slot="title">
              <div v-html=" list.copyToName ? list.copyToName : '暂无'"> 
              </div>
            </template>
            <div class="organieName add-border-detail-last"> {{ list.copyToName ? list.copyToName : '暂无' }}</div>
          </a-tooltip>
          
          <!-- <div class="organieName add-border-detail-last"> {{ list.jobDeions ? list.jobDeions : '暂无' }}</div>
          <div class="organieName add-border-detail-last"> {{ list.comments ? list.comments : '暂无' }}</div> -->
        </a-col>
        
        <a-col :span="4" class="status">
          <div class="add-border">招聘人数</div>
          <div class="add-border">职位性质</div>
          <div class="add-border">发布人</div>
          <!-- <div class="add-border">学历要求</div> -->
          
          <!-- <div class="add-border">评价标准</div> -->
        </a-col>
        <a-col :span="7" class="specific">
          <div class="organieName add-border-detail-right">{{ list.zpNum ?list.zpNum :'暂无'}}</div>
          <a-tooltip>
            <template slot="title">
              <div>
                {{ list.jobTypeName?list.jobTypeName :'暂无'}}
              </div>
            </template>
            <div class="organieName add-border-detail-right">{{ list.jobTypeName?list.jobTypeName :'暂无'}}</div>
          </a-tooltip> 
          <div class="organieName add-border-detail-right">{{ list.releaseUserName ?list.releaseUserName:'暂无' }}</div>
          <!-- <div class="organieName add-border-detail-right">{{ getEducationLabel(list.education) }}</div> -->
          
          <!-- <div class="organieName add-border-detail-right">
            {{ list.evaluationCriteria ? list.evaluationCriteria : '暂无' }}
          </div> -->
        </a-col>
      </a-row>
      <!-- <a-row >
        <a-col :span="4" class="status">
          <div class=" add-border">任职资格</div>
        </a-col>
        <a-col :span="20"> -->
          <!-- <a-tooltip placement="right">
            <template slot="title">
              <div>
                {{ list.jobDeions ? list.jobDeions : '暂无' }}
                </div>
            </template>
            <div class="organieName add-border-detail-right">
              {{ list.jobDeions ? list.jobDeions : '暂无' }}
            </div>
          </a-tooltip> -->
          <div class="status add-border" style="width:16.7%;display:inline-block;vertical-align:top;height:150px;">任职资格</div>
          <div class=" add-border-detail-right" style="width:83.3%;line-height:22px;padding:8px;display:inline-block;height:150px;overflow-y:auto;">
            <span>{{
            list.jobRequirements ? list.jobRequirements : '暂无'
          }}</span>
          </div>
          
        <!-- </a-col>
      </a-row> -->
      <div class="status  add-border" style="width:16.7%;display:inline-block;vertical-align:top;height:150px;margin-top:-4px">岗位职责</div>
      <div class="add-border-detail-right" style="width:83.3%;line-height:22px;padding:8px;display:inline-block;height:150px;overflow-y:auto;margin-top:-4px">
            <span>{{
            list.jobDeions ? list.jobDeions : '暂无'
          }}</span>
      </div>
      <div class="status " style="width:16.7%;display:inline-block;vertical-align:top;height:150px;margin-top:-4px">备注</div>
          <div class="add-border-left" style="width:83.3%;line-height:22px;padding:8px;display:inline-block;height:150px;overflow-y:auto;margin-top:-4px;margin-bottom:-4px">
            <span>{{
            list.comments ? list.comments : '暂无'
          }}</span>
          </div>
      <!-- <a-row>
        <a-col :span="4" class="status">
          <div >岗位职责</div>
        </a-col>
        <a-col :span="20">
           <a-tooltip placement="right">
          <template slot="title">
              <div>
                {{ list.comments ? list.comments : '暂无' }}
                </div>
            </template>
            <div class="organieName add-border-detail-last">
              {{ list.comments ? list.comments : '暂无' }}
            </div>
          </a-tooltip>
        </a-col>
      </a-row> -->
      <!-- 岗位职责：
          <pre class="job-details">{{
            list.comments ? list.comments : '暂无'
          }}</pre> -->
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
      this.detailVisible = e
      // console.log(this.list);
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
  text-align: center;
  font-weight: normal;
  color: #000;
}
.recruit-detail .job {
  background-color: #ffffff;
}
.recruit-detail .specific {
  background-color: #ffffff;
  /* padding-left: 13px; */
  color: #333333;
}
.recruit-detail .organieName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  padding-left:8px;
}
.recruit-detail .job-details {
  /* padding: 7px 44px 8px 13px; */
  color: #333333;
  line-height: 22px;
}
.add-border{
  border-bottom:1px solid #e2e2e2;
}
.add-border-detail{
  border-left:1px solid #e2e2e2;
  border-bottom:1px solid #e2e2e2;
  border-right:1px solid #e2e2e2;
}
.add-border-detail-right{
  border-left:1px solid #e2e2e2;
  border-bottom:1px solid #e2e2e2;
}
.add-border-detail-last{
  width: 222.5%;
  border-left:1px solid #e2e2e2;
  /* border-bottom: 1px solid #e2e2e2; */
}
.add-border-top-bottom {
  width: 222.5%;
  border-left:1px solid #e2e2e2;
  /* border-top:1px solid #e2e2e2; */
  border-bottom:1px solid #e2e2e2;
}
.add-border-left{
  border-left:1px solid #e2e2e2;
}
</style>
