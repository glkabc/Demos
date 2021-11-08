<template>
  <div>
    <!-- 顶部信息 -->
    <div class="head-info">
      <Badge v-if="demandLists.state == 1" text="在招" type="warning" />
      <Badge v-if="demandLists.state == 2" text="下线" type="primary" />
      <Badge v-if="demandLists.state == 3" text="已暂停" type="info" />
      <Badge v-if="demandLists.state == 4" text="待发布" type="warning" />
      <div class="info-list">
        <a-row class="list-row">
          <a-col :span="10"
            ><span class="item-name">需求名称：</span>
            <!-- <a-tag color="blue" v-if="demandLists.emergencyLevel == 1"
              >一般</a-tag
            >
            <a-tag color="orange" v-if="demandLists.emergencyLevel == 2"
              >紧急</a-tag
            >
            <a-tag color="red" v-if="demandLists.emergencyLevel == 3"
              >特急</a-tag
            > -->
            {{ demandLists.positionName }}</a-col
          >
          <a-col :span="12"
            ><span class="item-name">HC部门：</span
            ><span :title="demandLists.organizeName">{{
              demandLists.organizeName.slice(0, 16) + "..."
            }}</span></a-col
          >
        </a-row>
        <a-row class="list-row">
          <a-col :span="10"
            ><span class="item-name">需求总人数：</span
            >{{ demandLists.demandNum }}</a-col
          >
          <a-col :span="12"
            ><span class="item-name">开始日期：</span
            >{{ demandLists.createUserTime }}</a-col
          >
        </a-row>
        <a-row class="list-row">
          <a-col :span="10"
            ><span class="item-name">目标完成日期：</span
            >{{ demandLists.taskEnd }}</a-col
          >
          <a-col :span="12"
            ><span class="item-name">负责人：</span
            >{{ demandLists.createUserName }}</a-col
          >
        </a-row>
        <a-row class="list-row">
          <a-col :span="10"
            ><span class="item-name">紧急程度：</span>
            <a-tag color="blue" v-if="demandLists.emergencyLevel == 1"
              >一般</a-tag
            >
            <a-tag color="orange" v-if="demandLists.emergencyLevel == 2"
              >紧急</a-tag
            >
            <a-tag color="red" v-if="demandLists.emergencyLevel == 3"
              >特急</a-tag
            >
          </a-col>
          <a-col :span="12"
            ><span class="item-name">状态：</span>
            <span v-if="demandLists.state == 1">在招</span>
            <span v-if="demandLists.state == 2">下线</span>
            <span v-if="demandLists.state == 3">暂停</span>
            <span v-if="demandLists.state == 4">待发布</span>
          </a-col>
        </a-row>
        <a-row class="list-row">
          <a-col :span="10"
            ><span class="item-name">职位编号：</span
            >{{ demandLists.no }}</a-col
          >

          <a-col :span="12"
            ><span class="item-name">需求编号：</span
            >{{ demandLists.externalNum || "暂无" }}</a-col
          >
        </a-row>

        <a-row class="list-row">
          <a-col :span="10"
            ><span class="item-name">招聘类别：</span
            >{{ demandLists.recruitType }}</a-col
          >
          <a-col :span="12"
            ><span class="item-name">职位类别：</span
            >{{ demandLists.jobTypeName }}</a-col
          >
        </a-row>
        <a-row class="list-row">
          <a-col :span="10"
            ><span class="item-name">发布人：</span
            >{{ demandLists.releaseUserName || "暂无" }}</a-col
          >
          <a-col :span="12"
            ><span class="item-name">发布时间：</span
            >{{ demandLists.releaseTime }}</a-col
          >
        </a-row>
        <a-row class="list-row">
          <a-col :span="10"
            ><span class="item-name">下线时间：</span
            >{{ demandLists.taskEnd }}</a-col
          >
          <a-col :span="12"
            ><span class="item-name">创建时间：</span
            >{{ demandLists.createUserTime || "暂无" }}</a-col
          >
        </a-row>
        <a-row class="list-row">
          <a-col :span="10"
            ><span class="item-name">分配时间：</span
            >{{ demandLists.specialistAllocateTime }}</a-col
          >
          <a-col :span="12"
            ><span class="item-name">事业部：</span
            >{{ demandLists.groupId }}</a-col
          >
        </a-row>
        <!-- <a-row class="list-row">
          <a-col :span="2"><span class="item-name">需求内容：</span></a-col>
          <a-col :span="20" class="content" :class="{ isDown: isDown }">
            <pre v-if="demandLists.demandContent">{{demandLists.demandContent.replace(/↵/g,"\n")}}</pre>
          </a-col>
        </a-row> -->
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import Badge from "./Badge";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("status");
import { getDemand, addDemand, getDemandById } from "@api/branchHC/index";
export default {
  name: "DemandDetails",
  components: {
    Badge,
  },
  data() {
    return {
      demandLists: {
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
      },
      contentCount: {
        xqAll: "",
        tobeSplit: "",
      },
      contentData: [],
      allocationCount: {
        zhaoPinAll: "",
        tobeAllocated: "",
      },
      list: {
        name: "",
        num: "",
        kind: "",
        years: "",
        wage: "",
        filterman: "",
        resource: "",
        details: "",
        requres: "",
        department: "",
        location: "",
        edu: "",
        interviewer: "",
        grade: "",
      },
    };
  },
  computed: {
    ...mapState({
      educations: (state) => state.educationRequires,
      jobTypes: (state) => state.jobTypes,
      experiences: (state) => state.jobExperiences,
    }),
  },
  created() {
    this.getDemandById();
  },
  methods: {
    // 获取列表
    async getDemandById() {
      try {
        let res = await getDemandById({
          demandId: Number(this.$route.query.demandId),
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
        } = res.data.data.demand;
        console.log(emergencyLevel, "emergencyLevel");
        this.demandLists.positionName = positionName;
        this.demandLists.organizeName = organizeName;
        this.demandLists.demandNum = demandNum;
        this.demandLists.createUserTime = createUserTime;
        this.demandLists.taskEnd = taskEnd;
        this.demandLists.createUserName = createUserName;
        this.demandLists.emergencyLevel = emergencyLevel;
        this.demandLists.state = state;
        this.demandLists.no = no;
        this.demandLists.externalNum = externalNum;
        this.demandLists.recruitType = recruitType;
        this.demandLists.jobTypeName = jobTypeName;
        this.demandLists.releaseTime = releaseTime;
        this.demandLists.releaseUserName = releaseUserName;
        this.demandLists.specialistAllocateTime = specialistAllocateTime;
        this.demandLists.groupId = groupId;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.head-info {
  min-height: 600px;
  background-color: #fff;
  position: relative;
  padding-top: 33px;
  padding-bottom: 10px;
  overflow: hidden;
}
.head-info .icon-img {
  position: absolute;
  top: 54px;
  left: 54px;
  width: 134px;
  height: 134px;
}
.head-info .seal-img {
  position: absolute;
  top: 53px;
  right: 89px;
  width: 90px;
  height: 90px;
}
.info-list {
  margin-left: 200px;
  font-size: 14px;
}
.info-list .list-row {
  margin-bottom: 25px;
  color: #1f1f1f;
}
.info-list .list-row:last-child {
  margin-bottom: 0;
}
.info-list .list-row .item-name {
  color: #777;
}
.info-list .list-row .content {
  height: 75px;
  overflow: hidden;
  margin-left: -18px;
  line-height: 25px;
  /* text-overflow:ellipsis;
  white-space: nowrap; */
}
.isDown {
  min-height: 75px;
  height: auto !important;
}
.bottom-button {
  text-align: center;
  margin-top: 10px;
  width: 100%;
}
.handle-button {
  cursor: pointer;
}
/* -----头部信息end------- */
.requirements {
  padding: 26px;
  margin-top: 22px;
  background-color: #fff;
}
.requirements .title {
  font-size: 18px;
  font-weight: bold;
  color: rgba(20, 120, 227, 1);
  line-height: 30px;
}
.requirements .title span {
  width: 4px;
  height: 20px;
  float: left;
  background-color: #1478e3;
  margin-top: 5px;
  margin-right: 8px;
}
.table-count {
  color: #333;
  padding-left: 17px;
  margin-top: 30px;
}
.table-count > span {
  margin-right: 22px;
}
.table-count strong {
  font-size: 16px;
  color: #feaa19;
}
.table-count .spin {
  color: #fd5158;
}
.publisher {
  float: right;
  color: #333;
  font-size: 14px;
}
</style>
