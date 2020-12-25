<template>
  <div class="addclass" @click="addClassItem">
      <img src="@/assets/add.png" alt="添加">
      <!-- <h3>AddClass</h3> -->
      <!-- <input type="file"> -->
      <div class="addbox">
          <div class="addClass">
              <form action="#" @submit="submitMessage">
                  <h3>新建课程</h3>
                  <label for="text">
                      <input type="text" placeholder="课程名称：" id="text" @change="updateImageDisplay">
                  </label>
                  <div class="formbody">
                     <label for="file">
                          <span>设置封面：</span><div><input id="file" type="file" accept=".png, .jpg, .jpeg"></div>
                     </label>
                      <div class="inputnode">
                          <p><span>*</span> 用于课程资源包的显示或作为您共享资源之后的宣传图</p>
                          <p><span>*</span> 支持.jpg .jpeg .png等格式</p>
                          <p><span>*</span> 图片小于4MB</p>
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
  name:  'AddClass',
  data() {
    return {

    }
  },
  methods: {
      addClassItem(e) {
          e.target.parentNode.lastChild.style.display = 'block'
        //   console.log(e.target.parentNode.lastChild)
      },
      addFalse(e) {
          e.preventDefault()
          e.target.parentNode.parentNode.parentNode.style.display = 'none'
        //   console.log(e.target.parentNode.parentNode.style.display = 'none')
      },
      submitMessage(e) {
          console.log(e)
      },
      updateImageDisplay() {
    //       const curFiles = e.files;
    //       if(curFiles.length === 0) {
    //           const para = document.createElement('p');
    //           para.textContent = 'No files currently selected for upload';
    //         //   preview.appendChild(para);
    //       } else {
    //           const list = document.createElement('ol');
    //         //   preview.appendChild(list);
  
    //           for(const file of curFiles) {
    //           const listItem = document.createElement('li');
    //           const para = document.createElement('p');
  
    //           if(validFileType(file)) {
    //               para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
    //               const image = document.createElement('img');
    //               image.src = URL.createObjectURL(file);
  
    //               listItem.appendChild(image);
    //               listItem.appendChild(para);
    //           } else {
    //               para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
    //               listItem.appendChild(para);
    //           }
  
    //           list.appendChild(listItem);
    //           }
    //       }
    //   },
      }
  }
}
</script>

<style scoped lang="scss">
    .addclass {
        width: 215px;
        margin: 20px;
        background-color: #eee;
        height: 199px;
        transition: all 0.5s;
        img {
            width: 100%;
            height: 100%;
        }
        &:hover {
          box-shadow: 0 0 10px #666;  
        }
        // input {
        //     background-image: url('../assets/add.png');
        //     width: 100%;
        //     height: 100%;
        // }
        .addbox {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            background-color: rgba(0, 0, 0, .5);
            display: none;
            .addClass {
                position: absolute;
                top: 20%;
                left: 50%;
                transform: translateX(-50%);
                width: 600px;
                height: 300px;
                // border-radius: 20px;
                background-color: #fff;
                padding: 15px;
                form {
                    text-align: left;
                    font-size: 14px;
                    h3 {
                        text-align: left;
                    }
                    // input {
                    //     display: block;
                    // }
                    input[type='text'] {
                        border: 0px;
                        width: 100%;
                        margin-bottom: 20px;
                        &:focus {
                            outline: none;
                        }
                        border-bottom: 1px solid green;
                        &::before {
                            contain: '*';
                            width: 20px;
                            height: 20px;
                            display: inline-block;
                            vertical-align: middle;
                            text-align: center;
                            line-height: 26px;
                            font-size: 30px;
                            color: #f00;
                        }
                    }
                    // input[type='file'] {
                    //     background-image: url('../assets/upload1.png');
                    //     width: 240px;
                    //     height: 135px;
                    //     &:focus {
                    //         outline: none;
                    //     }
                    // }
                    .formbody {
                        display: flex;
                        label {
                            display: flex;
                            div {
                                width: 240px;
                                height: 135px;
                                background-image: url('../assets/upload1.png');
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
                                span {
                                    width: 20px;
                                    height: 20px;
                                    display: inline-block;
                                    vertical-align: middle;
                                    text-align: center;
                                    line-height: 20px;
                                    font-size: 25px;
                                    color: orange;
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
    }
</style>
<style lang="css">
    @keyframes hovertobig {
        form {
            width: 215px;
            height: 199px;
        }
        to {
            width: 220px;
            height: 204px;
        }
    }
    .addclass:hover {
        /* transition: hovertobig 0.5s ease-in-out; */
        width: 220px;
        height: 204px;
    }
</style>