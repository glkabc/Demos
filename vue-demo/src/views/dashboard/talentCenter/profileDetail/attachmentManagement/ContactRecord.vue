<template>
  <div>
    <div v-if="list.length>0" style="height:100%;overflow:scroll">
         <a-timeline>
             <a-timeline-item v-for="(item,index) in list" :key="index">
                 {{item.operateTime}}
                 <div>{{item.operateName}}</div>
                 <div>{{item.statusName}}</div>
                 <div v-html="item.operateContent"></div>
             </a-timeline-item>
         </a-timeline>
    </div>
    <div v-else><a-empty /></div>
  </div>
</template>

<script>
import {getRcordRecruit} from "@/api/talentCenter/index"
export default {
  name:"ContactRecord",
  props:['id','isCurrent'],
  data(){
      return{
        list:[]
      }
  },
  created(){
     this.getRcordRecruitInit()
  },
  methods:{
      getRcordRecruitInit(){
         getRcordRecruit(this.id).then(res=>{
          console.log(res)
          if(res.data.code==0){
            this.list = res.data.data
          }else{
              
          }
      })
      }
  }
}
</script>

<style>

</style>