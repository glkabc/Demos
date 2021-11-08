<template>
  <div>
    <!-- <a-timeline v-if="list.length > 0">
      <a-timeline-item v-for="item in list" :key="item.id">
        <div class="timeline_div">
            <p>
              [{{ item.interviewTimes }} 面] {{ item.interviewTime }}
            </p>
            <p>
              结果：{{getExperienceLabel(item.status)}}
            </p>
            <p v-html="'评价：' + item.interviewComment" />
            <p>评价填写人： {{ item.modifiedUserName }}</p>
        </div>
      </a-timeline-item>
    </a-timeline> -->
    <div v-if="listNew.length > 0">
      <div class="items" v-for="(items,index) in listNew" :key="index">
        <div v-for="(item,idx) in items.children" :key="idx">
          <div class="timesBox">
            <span class="times">第{{item.interviewTimes}}轮面试</span>
            <span class="time">{{item.interviewTime}}</span>
          </div>
          <div class="infosBox">
            <div class="infos name">职位名称：{{item.positionName}} </div>
            <div class="infos" v-if="isCurrent">萝卜秀编号：{{item.no}} </div>
            <div class="infos" v-show="isCurrent">建议职级:{{item.level}} </div>
            <div class="infos" v-show="isCurrent">岗位负责人：{{item.specialistName}}</div>
            <!-- <div class="infos" v-show="isCurrent">推荐人：哈拉少</div> -->
            <div class="infos" v-show="isCurrent">评价人：{{ item.interviewerName}}</div>
          </div>
          <div class="notes">评价记录：{{item.interviewComment||"无"}}</div>
          <a-divider v-if ="items.children.length > 1 && idx != items.children.length-1"></a-divider>
        </div>
      </div>
    </div>
    <div style="text-align: center" v-else><a-empty/></div>
  </div>
</template>

<script>
import { getInterviewComment } from '@/api/talentCenter';
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('status')
  export default {
    props: ['id','isCurrent'],
    data(){
      return {
        list: [],
        listSame:[],
        listObj:{},
        listObj1:'',
        listNew:[],
      }
    },
    computed: {
      ...mapState({
        experiences: (state) => state.operationTypes,
      }),
    },
    methods: {
      getExperienceLabel(value) {
        const matched = this.experiences.find(
          (experience) => experience.value === value
        )
        if (matched) {
          return matched.label
        } else {
          return '暂无状态'
        }
      },
      async getInterviewCommentInit (){
        try {
          const res = await getInterviewComment(this.id)
          if(res.data.code == 0) {
            this.list = res.data.data.interviewCommentList;
            for(var i=0;i<this.list.length;i++){
              if(this.listSame.indexOf(this.list[i].demandId)===-1){//去重
                this.listSame.push(this.list[i].demandId)
              }
            }
            if(this.listSame.length>0){
              for(var j=0;j<this.listSame.length;j++){//给对象添加属性
                this.listObj={}
                this.listObj['children']=[]
                this.listObj['demandId']=this.listSame[j];
                this.listNew.push(this.listObj)//对象放入数组中
              } 
            }
            for(var x=0;x<this.list.length;x++) {
              for(var y=0;y<this.listNew.length;y++){
                  if(this.list[x].demandId == this.listNew[y].demandId) {
                    this.listNew[y].children.push(this.list[x])
                  }
              }
            }
            console.log(this.listNew)
          }else {
            this.list = []
          }
        }
        catch (error) {
          console.log(error)
        }
      }
    },
    mounted(){
      this.getInterviewCommentInit()
    }
  }
</script>

<style scoped>
.items {
  background-color: #F7F8FA;
    padding: 20px;
    margin-bottom: 10px;
}
.item .timesBox .times {
  font-size: 14px;
  color: #333;
  font-weight: 700;
}
.item .timesBox .time{
  font-size: 12px;
  color: #999;
  float: right;
  position: relative;
  top: 3px;
}
.item .infosBox {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .item .infos {
    color: #666;
    font-size: 12px;
  }
  .item .infosBox .name {
    color: #1478E3;
  }
  .items .notes {
    margin-top: 15px;
    font-size: 12px;
    color: #333;
  }
</style>