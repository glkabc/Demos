<template>
  <div class="classitem">
      <img v-if="item.imgUrl != null" :src="item.imgUrl" alt="课程图片" :id="item.imgfileId">
      <img v-else src="../../assets/upload.png" alt="课程图片">
      <div class="footer">
        <!-- <p>{{item.name}}<img src="../../assets/change.png" alt="图标" @click="changeItem"></p> -->
        <p>{{item.name}}<a-icon type="edit" @click="changeItem" style="font-size:20px;"/></p>
      </div>
      <div id="addbox" ref="addoxShow">
          <div class="addClass">
              <form @submit="changeClass">
                  <h3>修改课程</h3>
                  <label for="text">
                      <span>*</span>
                      <!-- <input type="text" placeholder="请输入课程名称" id="text" :value="item.name"> -->
                      <input type="text" autocomplete="off" placeholder="请输入课程名称" id="text" v-model="inputValue">
                  </label>
                  <div class="formbody">
                     <label for="file">
                          <span>设置封面：</span>
                          <div :style="`background-image: url('${item.imgUrl}')`" ref="setBgcImg">
                              <img :src="item.imgUrl ? `${item.imgUrl}`: null" alt="课程图片" ref="uploadingImg">
                              <a-spin v-if="uploadingImgState"/>
                              <input id="file" type="file" accept=".png, .jpg, .jpeg" @change="UpDateImg">
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
import axios from 'axios'
import Axios from '@/configs/request';
export default {
  name:  'ClassItem',
  props: {
      item: Object,
      typeCreate: Number
  },
  data() {
    return {
        inputValue: '',
        upoladImagType: 200,
        updataClassData: null,    // 更新后的图片信息
        uploadingImgState: false, // 是否正在修改课程图片
        cancel: null,
        uploadingImged: false     // 是否已经修改课程图片
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
          this.inputValue = this.item.name
        //   if ()
          this.$refs.uploadingImg.src = ``
          this.$refs.uploadingImg.style.opacity = 0
          this.uploadingImged = false // 确保每次图片都是未修改的
          if (this.uploadingImgState) {
             this.cancel() 
          }
          e.target.parentNode.parentNode.parentNode.style.display = 'none'
    },
    UpDateImg(e) {
        const formData = new FormData();
        let ImgFile = e.target.files[0]
        e.target.value = ''
        if (ImgFile.size / 1024 < 4 * 1024) {
            let CancelToken = axios.CancelToken
            let self = this
            this.uploadingImgState = true  // 课程图片正在修改中
            this.uploadingImged = true // 修改了课程图片
            formData.append('file', ImgFile);
            formData.append('uploadType', 1)
            // alert(ImgFile.name)
            Axios.post('/upload', formData, {
                cancelToken: new CancelToken(function executor(c) {
                    self.cancel = c
                })
            }).then(res => {
                // console.log(res.data.data.data)
                this.uploadingImgState = false
                if (this.$refs.addoxShow.style.display === 'block'){
                    let data = res.data.data
                    this.$refs.uploadingImg.src = `${data.url}`
                    this.$refs.uploadingImg.style.opacity = 1
                    this.updataClassData = data
                }
                // console.log(this.$refs.setBgcImg.style.backgroundImage)
            }).catch(err => {
                this.uploadingImgState = false
                if (err.response) {
                  this.upoladImagType = err.response.status  
                }
            })
        } else {
            this.$message.warning('图片过大!!!')
        }
        
    },
    commitChangeClass(e) {
        if (this.inputValue.trim()) {
            Axios.post('/course/updateCourse', {
                // params: {
                    id: this.item.id,//（课程id）
                    imgfileId: this.updataClassData !== null ?  this.updataClassData.id : this.item.imgfileId,//（上传文件的id）
                    name: this.inputValue//(课程名称)
                // }
            }).then(res => {
                // console.log(res)
                this.$emit('addClassItemOne', {
                //   id: Math.floor(Math.random()*10000),
                  name: this.inputValue,
                  imgfileId: this.updataClassData !== null ?  this.updataClassData.id : this.item.imgfileId,
                  createType: this.item.createType,
                  imgUrl: this.updataClassData !== null ? this.updataClassData.url : this.item.imgfileId
                })
                this.$message.success('修改成功')
                e.target.parentNode.parentNode.parentNode.style.display =  'none' 
            }).catch (err => {
                this.$message.error('课程修改失败！！！')
            })
        } else {
            this.$message.warning('课程名不能为空！！！')
        }
    },
    changeClass(e) {
        e.preventDefault()
        // console.log(this.item)
        // console.log(this.updataClassData)
        // 判断是否修改过课程图片，未修改直接提交， 已修改 要判断是否修改成功
        if (!this.uploadingImged && this.inputValue === this.item.name) {
            this.$message.warning('你什么都未修改！！！')
        }else if (this.uploadingImged) {
            if (this.updataClassData !== null) {
                this.commitChangeClass(e)
            } else {
                this.$message.warning('网络较差封面还未加载成功！！！')
            }
        } else {
            this.commitChangeClass(e)
        }
        
    }
  }
}
</script>

<style scoped lang="scss">
    .classitem {
        width: 100%;
        background-color: #eee;
        height: 199px;
        position: relative;
        transition: all 0.5s;
        &:hover {
          box-shadow: 0px 5px 15px #666;
        //   transform: scale(1.02, 1.02);
        }
        img {
          width: 100%;
          height: 149px;
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
            height: 50px;
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
                                position: relative;
                                .ant-spin {
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%,-50%);
                                    padding-top: 60px;
                                    width: 100%;
                                    height: 100%;
                                    border: 0;
                                    background-image: unset;
                                }
                                img {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    // opacity: 0;
                                }
                                input {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
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