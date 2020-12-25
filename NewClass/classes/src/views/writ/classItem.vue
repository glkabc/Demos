<template>
  <div class="classitem">
      <!-- <img src="../../assets/upload.png" alt="图片描述"> -->
      <img :src="item.imgUrl" alt="图片描述">
      <div class="footer">
        <p>{{item.name}}<img src="../../assets/change.png" alt="图标" @click="changeItem"></p>
      </div>
      <div id="addbox">
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
      </div>
  </div>
</template>

<script>
export default {
  name:  'ClassItem',
  props: {
      item: Object
  },
  components: {
    // AddBox
  },
  data() {
    return {

    }
  },
  methods: {
    changeItem(e) {
      e.target.parentNode.parentNode.parentNode.lastChild.style.display = 'block'
      // console.log(e.target.parentNode.parentNode.parentNode.lastChild)
    },
    addFalse(e) {
          e.preventDefault()
          e.target.parentNode.parentNode.parentNode.style.display = 'none'
        //   console.log(e.target.parentNode.parentNode.style.display = 'none')
    },
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
            // display: none;
            // &:hover {
            //   display: block;
            // }
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
              transition: opacity 0.5s;
            }
            &:hover :last-child {
              display: block;
              opacity: 1;
            }
          }
          
        } 
    }
</style>
<style lang="scss">
#addbox {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            background-color: rgba(0, 0, 0, .5);
            display: none;
            .addClass {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 600px;
                height: 350px;
                // border-radius: 20px;
                background-color: #fff;
                padding: 15px;
                form {
                    text-align: left;
                    font-size: 14px;
                    h3 {
                        text-align: left;
                        font-weight: 700;
                    }
                    label {
                        display: flex;
                        span {
                            line-height: 20px;
                            padding-top: 24px;
                            margin-right: 2px;
                            color: #f00;
                        }
                        input[type='text'] {
                            border: 0px;
                            width: 100%;
                            margin-top: 20px;
                            margin-bottom: 30px;
                            &:focus {
                                outline: none;
                            }
                            border-bottom: 1px solid green;
                        }  
                    }
                    
                    .formbody {
                        display: flex;
                        label {
                            display: flex;
                            color: #000;
                            span {
                                padding-top: 0px;
                                color: #000;
                            }
                            div {
                                width: 240px;
                                height: 135px;
                                background-image: url('../../assets/upload1.png');
                                border: 1px dotted #000;
                                input {
                                    width: 100%;
                                    height: 100%;
                                    opacity: 0;
                                }
                            }
                        }
                        .inputnode {
                            flex: 1;
                            margin-left: 20px;
                            p {
                                padding-left: 10px;
                                &::first-letter {
                                    margin-left: -5px;
                                    // color: #f00;
                                }
                                &::before {
                                    content: '*';
                                    color: orange;
                                    font-size: 20px;
                                    line-height: 20px;
                                    vertical-align: middle;
                                    margin-left: -10px;
                                }
                            }
                        }
                    }
                    button {
                        border: 0;
                        background-color: #eee;
                        line-height: 40px;
                        padding: 0px 25px;
                        border-radius: 5px;
                        margin: 25px 10px 0px 0px;
                        float: right;
                        &:focus {
                            outline: none;
                        }
                        &.addTrue {
                            background-color: rgb(1, 123, 131);
                            color: #fff;
                        }
                    }
                }
            }
        }
</style>