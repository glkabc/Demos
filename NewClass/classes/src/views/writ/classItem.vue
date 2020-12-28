<template>
  <div class="classitem">
      <img src="../../assets/upload.png" alt="图片描述">
      <!-- <img :src="item.imgUrl" alt="图片描述"> -->
      <div class="footer">
        <p>c++<img src="../../assets/change.png" alt="图标" @click="addShow = !addShow"></p>
        <!-- <p>{{item.name}}<img src="../../assets/change.png" alt="图标" @click="boxShow = !boxShow"></p> -->
      </div>
      <!-- <div id="addbox">
          <div class="addClass">
              <form action="#">
                  <h3>新建课程</h3>
                  <label for="text">
                      <span>*</span>
                      <input type="text" placeholder="课程名称：" id="text" >
                  </label>
                  <div class="formbody">
                     <label for="file">
                          <span>设置封面：</span><div><input id="file" type="file" accept=".png, .jpg, .jpeg"></div>
                     </label>
                      <div class="inputnode">
                          <p> 用于课程资源包的显示或作为您共享资源之后的宣传图</p>
                          <p> 支持.jpg .jpeg .png等格式</p>
                          <p> 图片小于4MB</p>
                      </div>
                  </div>
                  <button type="submit" class="addTrue">确定</button>
                  <button class="addFalse" @click="addFalse">取消</button>
              </form>
          </div>
      </div> -->
      <AddBox :style="addShow ? 'display: block' : 'display: none'"/>
  </div>
</template>

<script>
import AddBox from './AddBox'
export default {
  name:  'ClassItem',
  props: {
      item: Object
  },
  components: {
    AddBox
  },
  data() {
    return {
        addShow: false
    }
  },
  methods: {
    //   boxShow() {
    //       console.log(111)
    //       return this.addShow = !this.addShow
    //   }
    // changeItem(e) {
    //   e.target.parentNode.parentNode.parentNode.lastChild.style.display = 'block'
    //   // console.log(e.target.parentNode.parentNode.parentNode.lastChild)
    // },
    // addFalse(e) {
    //       e.preventDefault()
    //       e.target.parentNode.parentNode.parentNode.style.display = 'none'
    //     //   console.log(e.target.parentNode.parentNode.style.display = 'none')
    // },
  }
}
</script>

<style scoped lang="scss">
    .classitem {
        width: 215px;
        background-color: #eee;
        height: 199px;
        margin: 20px;
        position: relative;
        transition: box-shadow 0.5s;
        &:hover {
          box-shadow: 0 0 10px #666;  
        }
        img {
          width: 215px;
          height: 199px;
        }
        .footer {
          height: 50px;
          p {
            position: absolute;
            left: 0;
            bottom: 0;
            text-align: center;
            background-color: #fff;
            line-height: 50px;
            width: 100%;
            margin: 0;
            img {
              position: absolute;
              bottom: 15px;
              right: 20px;
              width: 20px;
              height: 20px;
              display: none;
              opacity: 0;
              cursor: pointer;
              transition: opacity,display .5s;
            }
            &:hover :last-child {
              display: block;
              opacity: 1;
            }
          }
          
        } 
    }
</style>