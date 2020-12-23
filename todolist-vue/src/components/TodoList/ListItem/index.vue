<template>
  <div class="listItem" v-if="items.length > 0">
      <transition-group name="iframe" mode="out-in">
          <div v-for="item in items" :key="item.id">
            <p @click="itemDone(item.id)">{{item.todo}} <span v-if="item.done">已完成</span></p>
            <button @click="delItem(item.id)">删除</button>
          </div>
      </transition-group>
  </div>
  <div class="listItem not" v-else>
      <p>Nothing Todo</p>
  </div>
</template>

<script>
// import _ from 'lodash';
export default {
  name:  'ListItem',
  props: {
      ListItems: Array
  },
//   mountde() {
//       this.ListItems = _.shuffle(this.ListItems);
//   },
  computed: {
      items () {
          switch(this.$route.params.id) {
              case null:
              case 0: return this.ListItems;                               // 显示全部
              case 1: return this.ListItems.filter(item => item.done)      // 显示已完成
              case 2: return this.ListItems.filter(item => !item.done)     // 显示未完成
          }
          return ''
      }
  },
  methods: {
      delItem(id) {
        this.$emit('delItem', id);
      },
      itemDone(id) {
          this.$emit('itemDone', id);
      }
  }
}
</script>

<style scoped lang="scss">
    .listItem{
        max-height: 500px;
        overflow-y: auto;
        margin-top: 10px;
        overflow-x: hidden;
        // background-color: #222;
        div {
            display: flex;
            margin: 10px 70px;
            padding: 9px 20px;
            border: 1px solid #fff;
            border-radius: 10px;
            box-sizing: content-box;
            background-color: #fff;
            cursor: pointer;
            p {
                flex: 9;
                overflow-x: auto;
                // 为使 overflow 有效果，块级容器必须有一个指定的高度（height或者max-height）或者将white-space设置为nowrap。
                white-space: nowrap;
                padding: 5px;
                margin: 0px 10px 0px 0px;
                // vertical-align: middle;
                // background-color: rgb(218, 191, 191);
                span {
                    margin-left: 10px;
                    font-size: 12px;
                    color: #999;
                }
                
            }
            &:hover {
                // background-color: #aaa;
                border: 1px solid #aaa;
                box-shadow: 0 0 5px #aaa;
            }
            button {
                flex: 1;
                border: 1px solid #aaa;
                border-radius: 10px;
                min-width: 45px;
                &:focus {
                    outline: none;
                }
                &:hover {
                    background-color: rgb(245, 245, 250);
                }
            }
        }
    }
    .not p {
        text-align: center;
    }
    .iframe-enter-active, .iframe-leave-active {
        transition: all 0.8s;
    }
    .iframe-enter {
        position: relative;
        opacity: 0;
        left: 200px;
        font-size: 0px;
    }
    .iframe-enter-to {
        position: relative;
        opacity: 1;
        left: 0px;
        font-size: 1em;
    }
    .iframe-leave {
        position: relative;
        opacity: 1;
        left: 0;
        font-size: 1em;
    }
    .iframe-leave-to {
        position: relative;
        opacity: 0;
        left: 200px;
        font-size: 0px;
    }
</style>