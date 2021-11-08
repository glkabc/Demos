<template>
  <div>
    <template v-for="item in tags">
      <a-tag
        :key="item.uid"
        closable
        @close="() => handleClose(item)"
        style="margin-bottom: 8px"
      >
        <a-icon type="user" />{{ item.unmae }}
      </a-tag>
    </template>
    <a-select
      v-if="inputVisible"
      showSearch
      ref="input"
      :value="inputValue"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
      placeholder="请选择协作人"
      @change="handlePostChange"
      style="width: 220px"
      :getPopupContainer="
        (triggerNode) => {
          return triggerNode.parentNode || document.body;
        }
      "
      optionFilterProp="children"
    >
      <a-select-option
        :value="item.userId"
        v-for="item in userList"
        :key="item.userName"
        >{{ item.userName }}</a-select-option
      >
    </a-select>
    <a-tag
      v-else
      @click="showInput"
      style="background: #fff; borderStyle: dashed;"
    >
      <a-icon type="plus" />
    </a-tag>
  </div>
</template>
<script>
export default {
  props: ["workList",'userList'],
  data() {
    return {
      tags: [],
      inputVisible: false,
      inputId: '',
      inputValue: undefined,
    };
  },
  watch: {
    workList(val) {
      console.log(val,'this.tags')
      this.tags = val;
    },
    userList(val) {
      this.userList = val;
    },
  },
  methods: {
    handleClose(removedTag) {
      console.log(removedTag,'remove')
      const tags = this.tags.filter((tag) => tag !== removedTag);
      console.log(tags,'删除后的tags');
      this.tags = tags;
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    handlePostChange(value,e) {
      this.inputValue = e.key;
      this.inputId = value
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      let inputId = this.inputId
      this.tags.map((tag) => {
            if(tag.unmae== '') {
              this.tags.splice(tag,1);
            }
          });
          let tags =this.tags; 
      if(tags.length>0){//新增
        if (inputId && tags.indexOf(inputId) === -1) {
          if(inputValue!='') {
             tags = [...tags, {
              uid: inputId,
              unmae: inputValue
            }];
          }
       
        }
      }else{
        if(inputId) {
          tags = [...tags, {
          uid: inputId,
          unmae: inputValue
        }];
        }
      }
      
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: "",
      });
    },
  },
};
</script>
