<template>
  <div class="container" v-if="message.list.length">
      <AddClass @addClassItemOne="addClassItemOne"/>
      <ClassItem  v-for="(item,index) in message.list" :item='item' :key="index"/>
      <div id="leftAndRight" v-show="meta.total > 0">
          <div class="left" @click="UpPageOne">
              <!-- <img src="../../assets/prev.png" alt="上一页"> -->
          </div>
          <div class="right" @click="DownPageOne">
              <!-- <img src="../../assets/next.png" alt="下一页"> -->
          </div>
      </div>
  </div>
  <div class="containers" v-else-if="getDatasLodaing">
      <a-spin id="loading" />
  </div>
  <div class="containers" v-else-if="getStatus != 200">
      <RequestStatus :getStatus="getStatus"/>
  </div>
  <div class="containers" v-else>
      <img src="../../assets/noCourses.png" alt="无课程" id="noClass">
  </div>
</template>

<script>
import Axios from 'axios'
import AddClass from './addClass'
import ClassItem from './classItem'
import RequestStatus from './requesStatus'
export default {
  name:  'MyCreation',
  data() {
    return {
        message: {
            'list': []
        },
        createType: 1, //（1.我创作的 2.我实战的）
        getDatasLodaing: false,
        getStatus: 200,
        meta: {
            "total": 0,//（总条数）
            "pageSize": 14,//（每页数）
            "pageNum": 1//（当前页）
        }
    }
  },
  mounted() {
      this.getMessage()
      this.createType = this.$route.params.type
    // console.log(this.$route.params)
  },
  components: {
      AddClass,
      ClassItem,
      RequestStatus
  },
  methods: {
      getMessage() {
        this.getDatasLodaing = true
        Axios.get('/classMessage', {
            params: {
                createType: this.createType,//（1.我创作的 2.我实战的）
                pageNum: this.meta.pageNum,//（当前页码）
                pageSize: this.meta.pageSize//（每页的数据）
            }
        }).then((res) => {
            // console.log(res.staus)
            this.getDatasLodaing = false
            this.message.list = res.data.data.data.courseList
            this.meta = res.data.data.data.meta
            // console.log(this.message)
        }).catch (err => {
            // console.log(err.response)
            this.getDatasLodaing = false
            this.getStatus = err.response.status
            // alert('数据请求失败')
        })
      },
      UpPageOne() {
          this.meta.pageNum = this.meta.pageNum - 1
          this.getMessage()
      },
      DownPageOne() {
          this.meta.pageNum = this.meta.pageNum - 1
          this.getMessage()
      },
      addClassItemOne(OneClassItem) {
          console.log(OneClassItem)
          this.message.list.unshift(OneClassItem)
      }
  }
}
</script>

<style scoped lang="scss">
    .container {
        width: 70%;
        margin: 30px auto;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        overflow: hidden;
        #leftAndRight {
            .left {
                position: fixed;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                width: 64px;
                height: 94px;
                background-image: url('../../assets/prev.png');
                &:hover {
                    background-image: url('../../assets/left.png');
                }
            }
            .right {
                position: fixed;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                width: 64px;
                height: 94px;
                background-image: url('../../assets/next.png');
                &:hover {
                    background-image: url('../../assets/right.png');
                }
            }
        }
    }
    .containers {
        text-align: center;
        #noClass {
            margin-top: 400px;
            transform: translateY(-100%);
        }
        #loading {
            position: absolute;
            top: 300px;
        }
    }
</style>