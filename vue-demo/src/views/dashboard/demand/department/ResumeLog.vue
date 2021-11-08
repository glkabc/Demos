<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="操作记录" name="first">
        <div class="timelineBox">
          <el-timeline :reverse='reverse'>
          <el-timeline-item
            v-for="(activity, index) in oplog"
            :key="index"
          >
           <div class="active-title">
            <span>{{activity.operateTime.substring(0,10)}}</span>
            -<span>{{activity.operateTime.substring(11,19)}}</span>--<span>{{ activity.operateName }}</span>
           </div>
            <p v-html="activity.statusName"></p>
             <p v-html="activity.operateContent"></p>
          </el-timeline-item>
         </el-timeline>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ResumeLog",
  props: ["oplog", "evaluatelog"],
  data() {
    return {
      activeName: "first",
        reverse: true,
    };
  },
};
</script>
<style scoped>
.active-title{
    margin-bottom: 10px;
}
.active-title span{
    margin: 0 5px;
}
.timelineBox{
  height: 300px;
  overflow-y: scroll;
}
</style>
