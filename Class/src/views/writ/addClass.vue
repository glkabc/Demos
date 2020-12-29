<template>
  <div class="addclass">
      <!-- <img src="../../assets/add.png" alt="添加"> -->
      <div class="addClassBox" @click="addClassItem">
          <div class="addClassIcon">
            <a-icon type="plus" style="font-size: 30px" />
            <p>新建课程</p>
          </div>
      </div>
      <!-- <h3>AddClass</h3> -->
      <!-- <input type="file"> -->
      <div class="addbox" ref="addoxShow">
          <div class="addClass">
              <form @submit="AddClassSubmit" action="/course/addCourse">
                  <h3>新建课程</h3>
                  <label for="text">
                      <span>*</span>
                      <input type="text" placeholder="请输入课程名称" id="text" name="name" v-model="ClassName">
                  </label>
                  <div class="formbody">
                     <label for="file">
                          <span>设置封面：</span>
                          <div ref="uploadingImg">
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
import Axios from 'axios'
export default {
  name:  'AddClass',
  data() {
    return {
        addClassData: null,
        upoladImagType: 200,
        ClassName: '',
        createType: 1
    }
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
        //   this.$refs.uploadingImg.style.backgroundImage = `url(/img/upload1.5c6566f1.png)`
        //   this.$refs.uploadingImg.style.backgroundImage = `url('../../assets/upload1.png')`
        //   this.$refs.uploadingImg.style.backgroundImage = `url('http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif')`
          e.target.parentNode.parentNode.parentNode.style.display = 'none'
        //   console.log(e.target.parentNode.parentNode)
      },
      upLoadingImg(e) {
        let fromData = new FormData()
        let ImgFile = e.target.files[0]
        if (ImgFile.size/1024 <= 4 * 1024) {
            fromData.append('file', ImgFile)
            // console.log(fromData.get('file'))
            fromData.append('uploadType', 1)
            // alert(ImgFile.name)
            Axios.post('/uploadFile', {
                data: fromData
            }).then(res => {
                // console.log(res.data.data.data)
                // console.log(res)
                let data = res.data.data.data
                this.$refs.uploadingImg.style.backgroundImage = `url(${data.url})`
                this.addClassData = data
                // console.log(this.$refs.setBgcImg.style.backgroundImage)
            }).catch(err => {
                this.upoladImagType = err.response.status
            })
        } else {
            // alert('图片过大!!!')
            this.$message.error('图片过大!!!')
        }
        
      },
      AddClassSubmit(e) {
          e.preventDefault()
          if (this.ClassName != '' && this.addClassData.url !== null) {
            Axios.get('/course/addCourse', {
                params: {
                    createType: this.createType.toString,  //（1-我创作的   2-我实践的）
                    imgfileId: this.addClassData.id,  //（上传图片返回的图片id）
                    name: this.ClassName,     //（课程名字）
                    source: 1        //（/*来源 2:博思  1:备课家*/）
                }
            }).then(res => {
                //   console.log(res)
                
                    this.$emit('addClassItemOne', {
                    //   id: Math.floor(Math.random()*10000),
                    name: this.ClassName,
                    imgfileId: this.addClassData.id,
                    createType: this.addClassData.fileType,
                    imgUrl: this.addClassData.url
                    })
                    // console.log('提交了')
                    this.ClassName = ''
                    //   this.$refs.uploadingImg.style.backgroundImage = "url('../../assets/upload1.png')"
                    e.target.parentNode.parentNode.style.display = 'none'
                    this.$message.success('添加成功')
            }).catch (err => {
                this.$message.error('添加课程失败,请重新添加！！！')
            })
          } else {
              this.$message.error('信息还未填写完毕!!!')
          }
      }
  }
}
</script>

<style scoped lang="scss">
    .addclass {
        position: relative;
        // width: 215px;
        width: 100%;
        height: 199px;
        // margin: 20px;
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
    }
</style>
<style lang="css">
    .addclass:hover {
        box-shadow: 0 0 15px #666;
    }
</style>