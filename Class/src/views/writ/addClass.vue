<template>
  <div class="addclass">
      <!-- <img src="../../assets/add.png" alt="添加"> -->
      <div class="addClassBox" @click="addClassItem">
          <div class="addClassIcon">
            <a-icon type="plus" style="font-size: 30px" />
            <p>新建课程</p>
          </div>
      </div>
      <div class="addbox" ref="addoxShow">
          <div class="addClass">
              <form @submit="AddClassSubmit" action="/course/addCourse">
                  <h3>新建课程</h3>
                  <label for="text">
                      <span>*</span>
                      <input type="text" autocomplete="off" placeholder="请输入课程名称" id="text" name="name" v-model="ClassName">
                  </label>
                  <div class="formbody">
                     <label for="file">
                          <span>设置封面：</span>
                          <div>
                              <img src="../../assets/upload1.png" alt="" ref="uploadingImg">
                              <a-spin v-show="uploadingImgState"/>
                              <input id="file" type="file" accept=".png, .jpg, .jpeg" @change="upLoadingImg">
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
  name:  'AddClass',
  props: {
      typeCreate: Number,
  },
  data() {
    return {
        addClassData: null,
        upoladImagType: 200,
        ClassName: '',
        createType: 1,
        uploadingImgState: false,
        cancel: null
    }
  },
  mounted() {
      this.createType = this.typeCreate
  },
  methods: {
      addClassItem() {
        //   console.log(e.target)
        //   e.target.lastChild.style.display = 'block'
        this.$refs.addoxShow.style.display = 'block'
      },
      addFalse(e) {
          e.preventDefault()
          this.ClassName = ''
          this.$refs.uploadingImg.src = ``
          this.$refs.uploadingImg.style.opacity = 0
          this.addClassData = null
          if (this.uploadingImgState) {
              this.cancel()
          }
          e.target.parentNode.parentNode.parentNode.style.display = 'none'
        //   console.log(e.target.parentNode.parentNode)
      },
      upLoadingImg(e) {
        let fromData = new FormData()
        let ImgFile = e.target.files[0]
        e.target.value = ''
        if (ImgFile.size / 1024 <= 4 * 1024) {
            let CancelToken = axios.CancelToken
            let self = this
            this.uploadingImgState = true  // 请求图片当中
            // console.log(ImgFile)
            fromData.append('file', ImgFile)
            fromData.append('uploadType', 1)
            // alert(ImgFile.name)
            Axios.post('/upload', fromData, {
                cancelToken: new CancelToken(function executor(c) {
                    self.cancel = c
                    //console.log(c)
                    // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
                })
            }).then(res => {
                // console.log(res.data.data.data)
                // console.log(res)
                this.uploadingImgState = false
                if (this.$refs.addoxShow.style.display === 'block') {
                    let data = res.data.data
                    this.$refs.uploadingImg.src = `${data.url}`
                    this.$refs.uploadingImg.style.opacity = 1
                    this.addClassData = data
                }
            }).catch(err => {
                // this.$message.error(err)
                this.uploadingImgState = false
                if (err.response) {
                  this.upoladImagType = err.response.status  
                }
            })
        } else {
            this.$message.warning('图片过大!!!')
        }
      },
      AddClassSubmit(e) {
          e.preventDefault()
          if (this.ClassName.trim() != '' && this.addClassData !== null) {
            Axios.post('/course/addCourse', {
                // params: {
                    createType: this.createType,  //（1-我创作的   2-我实践的）
                    imgfileId: this.addClassData.id,  //（上传图片返回的图片id）
                    name: this.ClassName,     //（课程名字）
                    source: 1        //（/*来源 2:博思  1:备课家*/）
                // }
            }).then(res => {
                //   console.log(res)
                this.$emit('addClassItemOne', {
                    //   id: Math.floor(Math.random()*10000),
                    name: this.ClassName,
                    imgfileId: this.addClassData.id,
                    createType: this.addClassData.fileType,
                    imgUrl: this.addClassData.url
                    })
                this.ClassName = ''
                e.target.parentNode.parentNode.style.display = 'none'
                this.$message.success('添加成功')
            }).catch (err => {
                this.$message.error('添加课程失败,请重新添加！！！')
            })
          } else {
              this.$message.warning('课程信息还未填写完毕!!!')
          }
      }
  }
}
</script>

<style scoped lang="scss">
    .addclass {
        position: relative;
        width: 100%;
        height: 199px;
        background-color: #fff;
        transition: box-shadow 0.5s;
        text-align: center;
        .addClassBox {
            width: 100%;
            height: 100%;
            border: 1px dotted #000;
            .addClassIcon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
        }
        .addbox {
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
                                }
                                img {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
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
    }
</style>
<style scoped lang="css">
    .addclass:hover {
        box-shadow: 0 0 15px #666;
    }
</style>