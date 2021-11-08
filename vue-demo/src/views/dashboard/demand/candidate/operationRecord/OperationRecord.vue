<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-row>
          <a-col :span="4">
            <span class="name">{{ operation.name }}</span>
          </a-col>
          <a-col :span="20">
            <div class="next-step">
              {{ operation.process }}
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="24">
        <a-row>
          <a-col :span="8">
            <span class="iconfont icon-shouji"> {{ operation.telephone }}</span>
          </a-col>
          <a-col :span="8">
            <span class="iconfont icon-youxiang"> {{ operation.email }}</span>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="24" class="candidate-info-item">
        <a-timeline>
          <a-timeline-item
            v-for="(item, index) in data"
            :key="index"
          >
            <a-icon
              v-if="index !== data.length - 1"
              slot="dot"
              type="check-circle"
              style="font-size: 20px; color: gray;"
            ></a-icon>
            <a-icon
              v-if="index === data.length - 1"
              slot="dot"
              type="check-circle"
              style="font-size: 20px; color: orange"
            ></a-icon>
            <a-row class="item-info">
              <a-col :span="24">
                <a-row>
                  <a-col :span="12">
                    <div v-if="index !== data.length - 1" class="item-department color1">
                      {{ data[index].process }}
                    </div>
                    <div v-if="index === data.length - 1" class="item-department color2">
                      {{ data[index].process }}
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div style="margin: 8px; text-align: center">
                      {{ data[index].date }}
                    </div>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="10">
                    <span class="incident-text">
                      操作人：{{ data[index].operator }}
                    </span>
                  </a-col>
                  <a-col :span="14" v-if="data[index].stakeholder !== ''">
                    <span class="incident-text">
                      权益人：{{ data[index].stakeholder }}
                    </span>
                  </a-col>
                  <a-col :span="14" v-if="data[index].interviewLocation !== ''">
                    <span class="incident-text">
                      面试地点{{ data[index].interviewLocation }}
                    </span>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="10" v-if="data[index].remark !== ''">
                    <span class="incident-text">
                      备注：{{ data[index].remark }}
                    </span>
                  </a-col>
                  <a-col :span="10" v-if="data[index].interviewer !== ''">
                    <span class="incident-text">
                      面试官：{{ data[index].interviewer }}
                    </span>
                  </a-col>
                  <a-col :span="14" v-if="data[index].interviewDate !== ''">
                    <span class="incident-text">
                      面试时间：{{ data[index].interviewDate }}
                    </span>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-timeline-item>
        </a-timeline>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    props: {
      operation: Object
    },
    data() {
      return {
        data: [
          {
            process: '简历更新',
            date: '2020-03-09 20:44',
            operator: '张三',
            stakeholder: '赵新宇',
            remark: '暂无',
            interviewLocation: '',
            interviewer: '',
            interviewDate: ''
          },
          {
            process: '简历匹配',
            date: '2020-03-09 20:44',
            operator: '张三',
            stakeholder: '',
            remark: '',
            interviewLocation: '',
            interviewer: '',
            interviewDate: ''
          },
          {
            process: '简历初选',
            date: '2020-03-09 20:44',
            operator: '张三',
            stakeholder: '',
            remark: '',
            interviewLocation: '',
            interviewer: '',
            interviewDate: ''
          },
          {
            process: '面试邀约',
            date: '2020-03-09 20:44',
            operator: '张三',
            stakeholder: '',
            remark: '',
            interviewLocation: '科大讯飞A1#301室',
            interviewer: '谭维同、何喜蓓',
            interviewDate: '2020-03-08 14:00'
          },
          {
            process: '面试',
            date: '2020-03-09 20:44',
            operator: '张三',
            stakeholder: '',
            remark: '',
            interviewLocation: '科大讯飞A1#301室',
            interviewer: '谭维同、何喜蓓',
            interviewDate: '2020-03-08 14:00'
          }
        ]
      }
    },
    created() {
      // console.log(this.operation)
    }
  }
</script>

<style scoped>
.candidate-info-item {
  margin-top: 30px;
}
.name {
  display: block;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}
.next-step {
  margin: 10px 0;
  font-size: 18px;
  background-color: #22B8CF;
  color: #fff;
  width: 150px;
  text-align: center;
  border-radius: 4px;
}
.item-info {
  width: 400px;
  height: 150px;
  margin-left: 24px;
  background-color: #f7f8fa;
}
.item-department {
  width: auto !important;
  margin: 8px;
  padding-left: 10px;
  border-radius: 10px;
}
.color1 {
  background-color: #dde1e7;
  color: #333;
  font-weight: bold;
}
.color2 {
  background-color: orange;
  color: #fff;
  font-weight: bold;
}
.color3 {
  background-color: #22B8CF;
  color: #fff;
  font-weight: bold;

}
.incident-text {
  display: block;
  margin: 5px 20px;
}
</style>