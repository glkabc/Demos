<template>
  <div class="container" v-if="message.list.length > 0">
      <AddClass/>
      <ClassItem  v-for="(item,index) in message.list" :item='item' :key="index"/>
  </div>
  <div class="containers" v-else>
      <img src="../../assets/noCourses.png" alt="无课程" id="noClass">
  </div>
</template>

<script>
import Axios from 'axios'
import AddClass from './addClass'
import ClassItem from './classItem'
export default {
  name:  'MyCreation',
  data() {
    return {
        message: {
            list: [
                {
                    id: 1,
                    name: 'c++',
                    imgSrc: '../../assets/upload.png'
                },{
                    id: 2,
                    name: 'c++',
                    imgSrc: '../../assets/upload.png'
                }
            ]
        }
    }
  },
  mounted() {
      this.getMessage()
  },
  components: {
      AddClass,
      ClassItem
  },
  methods: {
      getMessage() {
        //   Axios.get('http://localhost:3000/').then(res => {
        //       console.log(JSON.parse(res.request.response))
        //       this.message = JSON.parse(res.request.response)
        //   })
        // Axios.get('/classMessage', {
        //     params: {
        //         createType: 2,
        //         pageNum: 1,
        //         pageSize: 14
        //     }
        // }).then(res => {
        //     console.log(res.response)
        // })
      }
  }
}
</script>

<style scoped lang="scss">
    .container {
        margin: 20px 250px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        // // display: flex;
        // .classitem {
        //     width: 20%;
        // }
    }
    .containers {
        // background-image: url('../../assets/noCourses.png');
        // background-repeat: no-repeat;
        position: relative;
        width: 100%;
        height: 740px;
        #noClass {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
</style>