<template>
  <div class="container" v-if="message.list.length > 0">
      <AddClass :typeCreate='1' @addClassItemOne="addClassItemOne" v-show="meta.pageNum === 1"/>
      <ClassItem :typeCreate='1' @addClassItemOne="addClassItemOne"  v-for="(item,index) in message.list" :item='item' :key="index"/>
      <!-- <ADDBOX/> -->
      <div id="leftAndRight" v-if="meta.total > 14">
          <div class="left" @click="DownPageOne" v-show="meta.pageNum > 1">
              <!-- <img src="../../assets/prev.png" alt="上一页"> -->
          </div>
          <div class="right" @click="UpPageOne" v-show="atPageNum">
              <!-- <img src="../../assets/next.png" alt="下一页"> -->
          </div>
      </div>
  </div>
  <div class="containers" v-else-if="getDatasLodaing" id="getStatusStyle">
      <a-spin id="loading" />
  </div>
  <div class="containers" v-else-if="getStatus != 200" id="getStatusStyle">
      <RequestStatus :getStatus="getStatus"/>
  </div>
  <div class="containers" v-else>
      <img src="../../assets/noCourses.png" alt="无课程" id="noClass">
  </div>
</template>

<script>
// import Axios from 'axios'
import Axios from '@/configs/request';
import AddClass from './addClass'
import ClassItem from './classItem'
import RequestStatus from './requesStatus'
// import ADDBOX from './AddBox'
export default {
  name:  'MyCreation',
  data() {
    return {
        message: {
            'list': []
        },
        createType: 1, //（1.我创作的 2.我实战的）
        getDatasLodaing: false, // 请求中
        getNextPageData: true,  // 是否可以请求下一页数据
        getStatus: 200,
        infoStatus: 'idle', // 'idle' | 'pending' | 'resolved' | 'rejected'
        meta: {
            total: 0,//（总条数）
            pageSize: 14,//（每页数）
            pageNum: 1//（当前页）
        }
    }
  },
  computed: {
      atPageNum() {
        //   console.log(Math.ceil(this.meta.total/ this.meta.pageSize))
          return Math.ceil(this.meta.total / this.meta.pageSize) > this.meta.pageNum
      }
  },
  mounted() {
      this.createType = this.$route.params.type
      console.log(this.$route.type)
      this.message.list = []
      this.getDatasLodaing = true // 修改状态为请求数据中
      this.getMessage()
  },
  components: {
      AddClass,
      ClassItem,
      RequestStatus,
    //   ADDBOX
  },
  watch: {
      $route: {
          handler (route) {
              console.log(route.params.type)
              this.createType = route.params.type
              // 路由发生改变重新请求数据
              this.message.list = []
              this.getDatasLodaing = true 
              this.getMessage()
          },
          deep: true
      }
  },
  methods: {
      getMessage() {
        if (this.getDatasLodaing && this.getNextPageData) {
            this.getNextPageData = false  // 暂时性不能请求下条数据
            Axios.post('/course/getCourseList', {
                // query: {
                    createType: this.$route.params.type == null ? 1 : this.$route.params.type, //（1.我创作的 2.我实战的）
                    pageNum: this.meta.pageNum,  //（当前页码）
                    pageSize: this.meta.pageSize //（每页的数据）
                // }
            }).then((res) => {
                console.log(res)
                this.getDatasLodaing = false     // 修改状态为请求数据结束
                this.getNextPageData = true      // 数据请求成功，可以继续请求下一页数据
                this.message.list = res.data.data.courseList
                this.meta = res.data.data.meta
                // this.meta.total = res.data.data.total
                // this.meta.pageSize = res.data.data.pageSize
                // this.meta.pageNum = res.data.data.pageNum
                // console.log(this.message)
            }).catch (err => {
                console.log(err)
                this.getDatasLodaing = false
                this.getNextPageData = true
                if (err.response == null) {
                    this.$message.error('网络错误，未请求到数据')
                    // this.getStatus = 500
                    return
                }
                this.getStatus = err.response.status
                // alert('数据请求失败')
            })
        } else {
            this.$message.warning('网络过慢，数据请求较慢！！！')
        }
      },
      UpPageOne() {
          this.meta.pageNum = this.meta.pageNum + 1
          // 判断是否是第一页，如果不是请求数据条数增加一条
          if (this.meta.pageNum > 1) this.meta.pageSize  = 15
          this.message.list = [] // 清空数据重新请求
          this.getDatasLodaing = true 
          this.getMessage()
      },
      DownPageOne() {
          this.meta.pageNum = (this.meta.pageNum - 1) > 0 ? this.meta.pageNum - 1: 1
          if (this.meta.pageNum === 1) this.meta.pageSize  = 14
          this.message.list = []
          this.getDatasLodaing = true 
          this.getMessage()
      },
      addClassItemOne(OneClassItem) {
        //   console.log(OneClassItem)
        //   this.message.list.unshift(OneClassItem)
        this.message.list = []
        this.getDatasLodaing = true 
        this.getMessage()
      }
  }
}
</script>

<style scoped lang="scss">
    .container {
        width: 80%;
        margin: 40px auto;
        padding: 20px;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 30px;
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
        .ant-spin {
            margin-top: 100px;
        }
        #noClass {
            margin-top: 515px;
            transform: translateY(-100%);
        }
        #loading {
            position: absolute;
            top: 300px;
        }
    }
    #getStatusStyle {
        height: 758px;
        padding: 152px 32px;
    }
</style>