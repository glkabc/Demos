<template>
  <div class="progress">
    <a-row class="user_info">
      <a-col :span="24" class="user_title">
        <span class="info_name">张三</span>
        <span style="color: #22B8CF;font-weight: 900">
          下一步：进入面试
        </span>
      </a-col>
      <a-col :span="24">
        <span class="info_phone">
          <icon-font type="icon-shouji" />
          <span>16230050987</span>
        </span>
        <a-divider type="vertical" />
        <span class="info_email">
          <icon-font type="icon-youxiang" />
          <span> abcao2@iflytek.com</span>
        </span>
      </a-col>
      <a-col :span="24" class="progress-content">
        <a-timeline>
          <a-timeline-item v-for="item in list" :key="item.id">
            <a-icon slot="dot" type="check-circle"  :style="{ fontSize: '22px', color: item.status == 3 ? '#FEB64B': '#DDE1E7'}"/>
            <div class="progress-main">
              <div class="progress-title">
                <span :class="item.status == 3 ? 'progress_name' : ''">{{ item.title }}</span>
                <span>{{ item.date }} {{ item.time }}</span>
              </div>
              <div class="progress-address">
                <span>操作人：{{ item.resource }}</span>
                <span v-if="item.status == 1">权益人：{{ item.address }}</span>
              </div>
              <div class="progress-remark" v-if="item.status == 1">
                <span>备注：{{ item.remark }}</span>
              </div>
              <div class="progress-inter" v-if="item.status !== 1">
                <span>面试官：{{item.interviewer}}</span>
              </div>
              <div class="progress-inter">
                <span>面试时间：{{ item.interTime }}</span>
              </div>
              <div>
                <span v-if="item.status !== 1">面试地点：{{ item.place }}</span>
              </div>
            </div>
          </a-timeline-item>
        </a-timeline>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { IconFont } from '@configs/scriptURL'
  export default {
    components: {
      IconFont
    },
    data() {
      return {
        list:[
          {
            id:1,
            title: '简历更新',
            resource: '张三',
            remark: '无',
            address: '李四',
            date: '2020-02-12',
            time: '9: 00',
            status: 1
          },
          {
            id: 2,
            title: '简历匹配',
            resource: '张三',
            remark: '无',
            address: '李四',
            date: '2020-02-12',
            time: '9: 00',
            status: 1
          },
          {
            id: 3,
            title: '简历初选',
            resource: '张三',
            remark: '无',
            address: '李四',
            date: '2020-02-12',
            time: '9: 00',
            status: 1
          },
          {
            id: 4,
            title: '面试邀约',
            resource: '张三',
            remark: '无',
            address: '李四',
            date: '2020-02-12',
            interviewer: '谭耀同、何喜蓓',
            time: '9: 00',
            place: '科大讯飞A1#301室',
            interTime: '2020-03-08 14:00',
            status: 2
          },
          {
            id: 5,
            title: '面 试',
            resource: '张三',
            remark: '无',
            address: '李四',
            date: '2020-02-12',
            time: '9: 00',
            place: '科大讯飞A1#301室',
            interTime: '2020-03-08 14:00',
            interviewer: '谭耀同、何喜蓓',
            status: 3
          },
        ]
      }
    }
  }
</script>

<style>
.progress .ant-timeline-item-tail {
  border-left: 1px solid #EFEFEF;
}
.progress .user_info {
  color: #636364;
}
.progress .user_title {
  padding-bottom: 12px;
}
.progress .info_name {
  margin-right: 30px;
  color: #000000;
  font-size: 18px;
  font-weight: 900;
  opacity: 0.7;
}
.progress .info_phone {
  font-size: 14px;
  margin-right: 11px;
}
.progress .info_email {
  margin-left: 11px;
}
.progress .progress-content {
  margin-top: 29px;
  height: 480px;
  overflow: auto;
  padding: 15px;
}
.progress .progress-main {
  border: 1px solid #f7f8fa;
  border-radius: 4px;
  background: #f7f8fa;
  margin-left: 10px;
  padding: 16px 15px 22px 8px;
}
.progress .progress-title,
.progress-inter,
.progress-remark,
.progress-address {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
}
.progress .progress-title span:first-child {
  background: rgba(221, 225, 231, 1);
  padding: 4px 10px;
  width: 76px;
  border-radius: 10px;
}
.progress-title .progress_name {
  color: #fff;
  background: #feb64b !important;
}
</style>