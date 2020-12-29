<template>
  <div class="classitem">
      <img v-if="item.imgUrl != null" :src="item.imgUrl" alt="图片描述" :id="item.imgfileId">
      <img v-else src="../../assets/upload.png" alt="图片描述">
      <div class="footer">
        <!-- <p>{{item.name}}<img src="../../assets/change.png" alt="图标" @click="changeItem"></p> -->
        <p>{{item.name}}<a-icon type="edit" @click="changeItem" style="font-size:20px;"/></p>
      </div>
      <div id="addbox">
          <div class="addClass">
              <form @submit="changeClass">
                  <h3>新建课程</h3>
                  <label for="text">
                      <span>*</span>
                      <!-- <input type="text" placeholder="请输入课程名称" id="text" :value="item.name"> -->
                      <input type="text" placeholder="请输入课程名称" id="text" v-model="inputValue">
                  </label>
                  <div class="formbody">
                     <label for="file">
                          <span>设置封面：</span>
                          <div :style="item.imgUrl ? `background-image: url(${item.imgUrl})`: null" ref="setBgcImg">
                              <input id="file" type="file" accept=".png, .jpg, .jpeg" @change="UpDateImg">
                              <!-- <img :src="item.imgUrl" alt=""> -->
                          </div>
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
import Axios from 'axios'
export default {
  name:  'ClassItem',
  props: {
      item: Object
  },
  data() {
    return {
        inputValue: '',
        upoladImagType: 200,
        updataClassData: null
    }
  },
  mounted() {
      this.inputValue = this.item.name
  },
  methods: {
    changeItem(e) {
        // console.log(e.target)
        if (e.target.getAttribute('data-icon') === 'edit') {
            // console.log(111)
            e.target.parentNode.parentNode.parentNode.parentNode.lastChild.style.display = 'block'
        } else if (e.target.parentNode.getAttribute('data-icon') === 'edit') {
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.lastChild.style.display = 'block'
        }
    },
    addFalse(e) {
          e.preventDefault()
          e.target.parentNode.parentNode.parentNode.style.display = 'none'
        //   console.log(e.target.parentNode.parentNode.style.display = 'none')
    },
    UpDateImg(e) {
        const formData = new FormData();
        let ImgFile = e.target.files[0]
        if (ImgFile.size / 1024 < 4 * 1024) {
            formData.append('file', ImgFile);
            formData.append('uploadType', 1)
            // alert(ImgFile.name)
            Axios.post('/uploadFile', {
                data: formData
            }).then(res => {
                // console.log(res.data.data.data)
                let data = res.data.data.data
                this.$refs.setBgcImg.style.backgroundImage = `url(${data.url})`
                this.updataClassData = data
                // console.log(this.$refs.setBgcImg.style.backgroundImage)
            }).catch(err => {
                this.upoladImagType = err.response.status
            })
        } else {
            alert('图片过大!!!')
        }
        
    },

    changeClass(e) {
        e.preventDefault()
        console.log(this.item)
        // console.log(this.updataClassData)
        if (this.inputValue) {
            Axios.get('/course/updateCourse', {
                params: {
                    id: this.item.id,//（课程id）
                    imgfileId: this.updataClassData !== null ?  this.updataClassData.id : this.item.imgfileId,//（上传文件的id）
                    name: this.inputValue//(课程名称)
                }
            }).then(res => {
                // console.log(res)
                this.$emit('addClassItemOne', {
                //   id: Math.floor(Math.random()*10000),
                  name: this.inputValue,
                  imgfileId: this.updataClassData !== null ?  this.updataClassData.id : this.item.imgfileId,
                  createType: this.item.createType,
                  imgUrl: this.updataClassData !== null ? this.updataClassData.url : this.item.imgfileId
                })
                e.target.parentNode.parentNode.parentNode.style.display =  'none'
                this.$message.success('修改成功')
            })
        } else {
            this.$message.error('课程名不能为空！！！')
        }
    }
  }
}
</script>

<style scoped lang="scss">
    .classitem {
        // width: 215px;
        width: 100%;
        background-color: #eee;
        height: 199px;
        // height: 100%;
        // margin: 20px;
        position: relative;
        // z-index: 10;
        transition: box-shadow 0.5s;
        &:hover {
          box-shadow: 0 0 15px #666;    
        }
        img {
        //   width: 215px;
          width: 100%;
        //   height: 199px;
          height: 100%;
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
            i {
              position: absolute;
              bottom: 15px;
              right: 15px;
              width: 20px;
              height: 20px;
              display: none;
              opacity: 0;
              transition: opacity,display 0.5s;
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
                                background-repeat: no-repeat;
                                background-size: 100% 100%;
                                border: 1px dotted #000;
                                input {
                                    width: 100%;
                                    height: 100%;
                                    opacity: 0;
                                    cursor: pointer;
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
                        margin: 40px 15px 0px 0px;
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