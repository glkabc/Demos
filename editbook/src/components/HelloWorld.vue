<template>
  <div>
    <div class="contentText" v-html="content"></div>
    <hr>
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
    <hr>
    <button @click="handelSubmit">提交</button>
    <hr>
    <div class="ShowSubmitData"></div>
  </div>
</template>
 
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
  export default {
    name: 'HelloWporld',
    components: {
      quillEditor
    },
     data () {
      return {
        // 富文本编辑器默认内容
        content: '<h2>I am Example</h2>',
        //富文本编辑器配置
        editorOption: {
          modules: {
          //工具栏定义的
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
            // ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
            [{ header: 1 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
            // [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
            //[{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
            // [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
            // [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
            // [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
            // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
            // [{ font: [] }], // 字体种类-----[{ font: [] }]
            // [{ align: [] }], // 对齐方式-----[{ align: [] }]
            ["clean"], // 清除文本格式-----['clean']
            //["image", "video"] // 链接、图片、视频-----['link', 'image', 'video']
          ]
        },
        //主题
        theme: "snow",
        placeholder: "请输入正文"
        }
      }
    },
    methods: {
      //失去焦点事件
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      //获得焦点事件
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      // 准备富文本编辑器
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      //内容改变事件
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      },
      handelSubmit() {
        let data = JSON.stringify(this.content)
        let dom = document.querySelector('.ShowSubmitData')
        dom.innerHTML = JSON.parse(data)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
