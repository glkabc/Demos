<template>
  <a-modal
    title="职位详情"
    v-model="detailVisible"
    width="800px"
    :footer="null"
    :closable="false"
    @cancel="handleClose"
    centered
  >
    <div class="recruit-detail">
      <a-row class="row">
        <a-col :span="4" class="status">
          <div class="add-border">需求名称</div>
          <div class="add-border">HC部门</div>
          <div class="add-border">需求总人数</div>
          <div class="add-border">开始日期</div>
          <div class="add-border">目标完成日期</div>
          <div class="add-border">负责人</div>
          <div class="add-border">紧急程度</div>
          <div class="add-border">状态</div>
          <div >职位编号</div>
        </a-col>
        <a-col :span="9" class="specific">
          <a-tooltip placement="right">
           
            <template slot="title">
              <div >{{ list.positionName ? list.positionName: "暂无"}}</div>
            </template>
            <div  class="organieName add-border-detail">
              {{ list.positionName ? list.positionName: "暂无"}}
            </div>
          </a-tooltip>
           <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.organizeName ? list.organizeName : '暂无' }}</div>
            </template>
            <div class="organieName add-border-detail">
              {{ list.organizeName ? list.organizeName: "暂无"}}
            </div>
          </a-tooltip>
          <div class="organieName add-border-detail">{{ list.demandNum }}</div>
              <div class="organieName add-border-detail">{{ list.createUserTime ? list.createUserTime: "暂无"}}</div>
            <div class=" organieName add-border-detail">
              {{ list.taskEnd ? list.taskEnd: "暂无"}}
            </div>
          <div class="organieName add-border-detail">{{list.createUserName}}</div>
          <div  class=" organieName add-border-detail" v-if="list.emergencyLevel == 1">
            <a-tag color="blue"
              >一般</a-tag
            >
            </div>
          <div class=" organieName add-border-detail"  v-if="list.emergencyLevel == 2">
            <a-tag color="orange" 
              >紧急</a-tag>
          </div>
          <div v-if="list.emergencyLevel == 3" class=" organieName add-border-detail"><a-tag color="red" 
              >特急</a-tag>
          </div>
          <div class=" organieName add-border-detail">
            <span v-if="list.state == 1">在招</span>
            <span v-if="list.state == 2">下线</span>
            <span v-if="list.state == 3">暂停</span>
            <span v-if="list.state == 4">待发布</span>
            <span v-if="list.state == null">暂无</span>
          </div>
          <div class="organieName  add-border-detail-last">{{ list.no ?list.no:"暂无"}}</div>
        </a-col>
        <a-col :span="4" class="status">
          <div class="add-border">需求编号</div>
          <div class="add-border">招聘类别</div>
          <div class="add-border">职位类别</div>
          <div class="add-border">发布人</div>
           <div class="add-border">发布时间</div>
           <div class="add-border">下线时间</div>
           <div class="add-border">创建时间</div>
           <div class="add-border">分配时间</div>
           <!-- <div>事业部</div> -->
        </a-col>
        <a-col :span="7" class="specific">
          <a-tooltip placement="right">
            <template slot="title">
              <div >{{ list.externalNum ? list.externalNum : '暂无' }}</div>
            </template>
            <div class="organieName add-border-detail-right">
              {{ list.externalNum ? list.externalNum : '暂无' }}
            </div>
          </a-tooltip>
          <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.recruitType ? list.recruitType : '暂无' }}</div>
            </template>
            <div class="organieName add-border-detail-right">
              {{ list.recruitType ? list.recruitType : '暂无' }}
            </div>
          </a-tooltip>
          <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.jobTypeName ? list.jobTypeName : '暂无' }}</div>
            </template>
            <div class="organieName add-border-detail-right">
              {{ list.jobTypeName ? list.jobTypeName : '暂无' }}
            </div>
          </a-tooltip>
           <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.releaseUserName ? list.releaseUserName : '暂无' }}</div>
            </template>
            <div class="organieName add-border-detail-right">
              {{ list.releaseUserName ? list.releaseUserName : '暂无' }}
            </div>
          </a-tooltip>
          <a-tooltip placement="right">
            <template slot="title">
              <div>{{ list.releaseTime ? list.releaseTime : '暂无' }}</div>
            </template>
            <div class="organieName add-border-detail-right">
              {{ list.releaseTime ? list.releaseTime : '暂无' }}
            </div>
          </a-tooltip>
           <div class=" organieName add-border-detail-right">{{ list.offlineAtDate ? list.offlineAtDate : '暂无'}}</div>
           <div class=" organieName add-border-detail-right">{{ list.createUserTime ? list.createUserTime : '暂无' }}</div>
           <div class="organieName add-border-detail-right">{{ list.specialistAllocateTime ? list.specialistAllocateTime : '暂无' }}</div>
           <!-- <div>{{ list.groupId ? list.groupId : '暂无' }}</div> -->
        </a-col>
      </a-row>
      <!-- <a-row>
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
      </a-row> -->
    </div>
  </a-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('status')
import { getDemandById } from "@api/branchHC/index";
export default {
  props: ['show', 'getDemandByIds'],
  data() {
    return {
      detailVisible: false,
      list: {
        positionName: "",
        demandNum: "",
        externalNum: "",
        organizeName: "",
        emergencyLevel: "",
        demandContent: "",
        demandStart: "",
        demandEnd: "",
        createUserTime: "",
        releaseTime: "",
        organizeName: "",
        userName: "",
        createUserName: "",
        dayThenDone: "",
        state: "",
        demandNumDone: "",
        offlineAtDate:'',
        specialistAllocateTime:''
      },
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
      this.detailVisible = e;
      if(this.detailVisible==true){
        this.getDemandById();
      }
    },
  },
  mounted(){
    //  this.getDemandById();
  },
  methods: {
    // 获取列表
    async getDemandById() {
      console.log(this.getDemandByIds,'this.getdenadnId')
      try {
        let res = await getDemandById({
          demandId: this.getDemandByIds,
        });
        console.log(res, "res");
        // if(res.)
        let {
          positionName,
          organizeName,
          demandNum,
          taskEnd,
          createUserName,
          emergencyLevel,
          state,
          no,
          externalNum,
          recruitType,
          jobTypeName,
          releaseUserName,
          releaseTime,
          offlineTime,
          specialistAllocateTime,
          groupId,
          createUserTime,
          offlineAtDate,
        } = res.data.data.demand;
        console.log(emergencyLevel, "emergencyLevel");
        this.list.positionName = positionName;
        this.list.organizeName = organizeName;
        this.list.demandNum = demandNum;
        this.list.createUserTime = createUserTime;
        this.list.taskEnd = taskEnd;
        this.list.createUserName = createUserName;
        this.list.emergencyLevel = emergencyLevel;
        this.list.state = state;
        this.list.no = no;
        this.list.externalNum = externalNum;
        this.list.recruitType = recruitType;
        this.list.jobTypeName = jobTypeName;
        this.list.releaseTime = releaseTime;
        this.list.offlineAtDate = offlineAtDate;
        this.list.releaseUserName = releaseUserName;
        this.list.specialistAllocateTime = specialistAllocateTime;
        this.list.groupId = groupId;
      } catch (error) {
        console.log(error);
      }
    },
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

<style scoped>
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
  /* border-right:1px solid #e2e2e2; */
}
.add-border-detail-last{
border-left:1px solid #e2e2e2;
}
.recruit-detail {
  height: 100%;
  width: 100%;
  border-left: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
}
.recruit-detail .row {
  padding: 0;
  /* border-bottom: 1px solid #e2e2e2; */
}
.recruit-detail div {
  padding: 0;
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
</style>
