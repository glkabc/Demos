<template>
      <div class="addbox" ref="addoxShow" v-if="ShowOrHidden">
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
                          <div :style="ClassItem != null ? `background-image: (${ClassItem.imgUrl})` : null">
                              <img :src="uploadImageData == null ? null : uploadImageData.url" alt="" ref="uploadingImg" :style="{opacity: uploadImageData == null ? 0 : 1}">
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
</template>

<script>
import axios from 'axios'
import Axios from '@/configs/request';
export default {
  name:  'AddBox',
  props: {
      /**
       * ClassItem : {
       *    id: 2020,
       *    name: '我叫小明',
       *    imgfileId: 3333,
       *    createType: 2,
       *    imgUrl: 'url'
       * }
       */
      ClassItem: Object
  },
  data() {
    return {
        ClassName: '',
        uploadingImgState: false, // 是否正在跟新图片
        ShowOrHidden: true,       // 此页面是否隐藏
        /**
         * uploadImageData: {
         *  fileName: '2.jpg',
         *  fileName: 1,
         *  id: 1080,
         *  url: 'url'
         * }
         */
        uploadImageData: null,    // 更新的图片信息

    }
  },
  mounted() {
      if (this.ClassItem != null) {
          this.ClassName = this.ClassItem.name
      }
  },
  methods: {
      addFalse(e) {
          e.preventDefault()
          if (this.uploadImageData != null) {
              this.cancel()
          }
          this.ClassName = this.ClassItem != null ?  this.ClassItem.name : ''
        //   this.$refs.uploadingImg.src = ''
        //   this.$refs.uploadingImg.style.opacity = 0
          this.uploadImageData = null
          this.$message.success('关闭此窗口') 
      },
      async upLoadingImg(e) {
          this.uploadingImgState = true

          let CancelToken = axios.CancelToken
          let ImgFile = e.target.files[0]
          e.target.value = ''
          if (ImgFile.size / 1024 > 4 * 1024) {
              this.$message.warning('图片最大4M!!!')
              return;
          }
          let fromData = new FormData()
          
          fromData.append('file', ImgFile)
          fromData.append('uploadType', 1)

          try {
              let res = await Axios.post('/upload', fromData, {
                  cancelToken: new CancelToken((c) => {
                      this.cancel = c
                  })
              })
              this.uploadImageData = res.data.data.data
            //   this.$refs.uploadingImg.style.opacity = 1
            //   this.$refs.uploadingImg.src = this.uploadImageData.url
              this.uploadingImgState = false
              this.$message.success('图片上传成功')
          } catch (err) {
              this.$message.error('图片上传失败!!!')
          }
          
      },
      async AddClassSubmit(e) {
          e.preventDefault()
          if (this.ClassName.trim() === '') {
              this.$message.warning('课程名不能为空！！！')
              return;
          }
          if (this.uploadingImgState) {
              this.$message.warning('网络过慢，图片还未上传成功！！！')
              return;
          }
          if (this.uploadImageData == null) {
              this.$message.warning('课程图片不能为空！！！')
              return;
          }
          
          try {
              if (this.ClassItem == null) {
                  let ress = await Axios.post('/course/addCourse', {
                        createType: this.$route.params.type == null ? 1 : this.$route.params.type, //（1-我创作的   2-我实践的）
                        imgfileId: this.uploadImageData.id,                                        //（上传图片返回的图片id）
                        name: this.ClassName,                                                      //（课程名字）
                        source: 1                                                                  //（/*来源 2:博思  1:备课家*/）                          
                  })
                  this.$message.success('添加成功')
              } else {
                  let ChangeClassRes = await Axios.post('/course/updateCourse', {
                        id: this.ClassItem.id,                                                                       //（课程id）
                        imgfileId: this.uploadImageData == null ? this.ClassItem.imgUrl : this.uploadImageData.url,  //（上传文件的id）
                        name: this.ClassName                                                                         //(课程名称)
                  })
                  this.$message.success('修改成功')
              }
              this.ClassName = ''
              this.uploadImageData = null
              this.$message.success('此窗口关闭')
          } catch (err) {
              this.$message.error('出现错误！！！')
          }
      }
  }
}
</script>

<style scoped lang="scss">
.addbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, .5);
    // display: none;
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
</style>