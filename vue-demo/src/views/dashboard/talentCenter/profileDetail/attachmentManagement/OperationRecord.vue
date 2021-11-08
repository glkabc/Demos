<template>
  <div>
    <!-- <a-timeline v-if="list.length > 0">
      <a-timeline-item v-for="item in list" :key="item.id">
        <div class="timeline_div">
          <span>{{ item.operateTime }}</span>
          <div style="margin: 10px 0">
            <span v-html="item.operateContent"></span>
            <div>操作人：{{ item.operateName }}</div>
          </div>
        </div>
      </a-timeline-item>
    </a-timeline> -->
    <div v-if="list.length > 0">
      <div class="items" v-for="(item,index) in list" :key="index">
        <Badge v-if="item.status==10||item.status==20||item.status==30" text="待面试" type="warning"/>
        <Badge v-if="item.status==11||item.status==21||item.status==31||item.status==41||item.status==51||item.status==61" text="淘汰" type="danger"/>
        <Badge v-if="item.status==40||item.status==50||item.status==60" text="通过" type="success"/>
        <Badge v-if="item.status==0" text="待匹配" type="primary"/>
        <p class="title"><span>{{ index + 1 }}</span>、{{ item.orgName }}</p>
        <!-- :class="{infosBox:isCurrent}" -->
        <div :class="{infosBox:isCurrent}">
          <div class="positions">职位名称：{{item.positionName}}</div>
          <div class="infoss">萝卜秀编号：{{item.NO}} </div>
          <div class="infosleader">岗位负责人：{{item.principal}}</div>
          <!-- <div class="infos">推荐人：哈拉少</div> -->
          <div class="infoss">所在流程：{{item.typeText}}</div>
        </div>
      </div>
    </div>
    <div style="text-align: center" v-else><a-empty /></div>
  </div>
</template>

<script>
import { getContactRecruit } from '@/api/talentCenter';
import Badge from '@/components/Badge'
  export default {
    props: ['id','isCurrent'],
    components :{
      Badge
    },
    data(){
      return {
        list: []
      }
    },
    methods: {
      async getContactRecruitInit (){
        try {
          const res = await getContactRecruit(this.id)
          if(res.data.code ==0 ) {
            this.list = res.data.data;
            // this.list.forEach((item) =>{
            //   if()
            // })
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
      this.getContactRecruitInit()
    }
  }
</script>

<style scoped>
  .items {
    background-color: #F7F8FA;
    padding: 20px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
  }
  .item .infosBox {
    display: flex;
    justify-content: space-between;
  }
  .item .infos {
    color: #666;
    font-size: 12px;
    width:200px;
    /* display: inline-block; */
  }
  .item .infoss {
    color: #666;
    font-size: 12px;
    width:240px;
    /* display: inline-block; */
  }
  .item .infosleader {
    color: #666;
    font-size: 12px;
    width:170px;
    /* border:1px solid #afa; */
    /* display: inline-block; */
  }
  .positions{
    width:400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
    font-size: 12px;
  }
  .items .title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>