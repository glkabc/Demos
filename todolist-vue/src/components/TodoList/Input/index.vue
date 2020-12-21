<template>
  <div class="input">
      <label for="InputItem">
          请输入：<input type="text" id="InputItem" placeholder="回车也可添加todo项" v-model="value" @keyup.enter="addOneItem">
      </label>
      <button @click="addOneItem">添加</button>
  </div>
</template>

<script>
export default {
  name:  'InputItem',
  data(){
      return {
          value: ''
      }
  },
  methods: {
      addOneItem() {
          if (this.value) {
              this.$emit('addOneItem', this.value);
              this.value = '';
          }
      }
  }
}
</script>

<style scoped lang="scss">
    .input {
        display: flex;
        margin-top: 20px;
        label {
            flex: 8;
            margin-left: 50px;
            input {
                width: 60%;
                height: 30px;
                padding-left: 10px;
                margin-left: 10px;
                &:focus {
                    outline: none;
                }
            }
        }
        button {
            flex: 2;
            border-radius: 10px;
            margin-right: 80px;
            // background-color: #ddd;
            border: 1px solid #aaa;
            &:focus {
                outline: none;
            }
            &:hover {
                background-color: #aaa;
            }
        }
    }
</style>