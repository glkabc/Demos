<template>
  <div class="container">
      <InputItem @addOneItem="addOneItem"/>
      <div class="router">
          <router-link tag="span" :to="{name: 'AllItem', params: {id: 0}}">全部</router-link>
          <router-link tag="span" :to="{name: 'ListDone', params: {id: 1}}">已完成</router-link>
          <router-link tag="span" :to="{name: 'ListDoneNot', params: {id: 2}}">未完成</router-link>
      </div>
      <!-- <ListItem @itemDone="itemDone" @delItem="delItem" :ListItems="ListItems"/> -->
      <router-view @itemDone="itemDone" @delItem="delItem" :ListItems="ListItems"></router-view>
  </div>
</template>

<script>
import InputItem from './Input'
// import ListItem from './ListItem'
export default {
  name:  'Index',
  data() {
    return {
        ListItems: [
            {
                id: 1,
                todo: '跑步',
                done: true
            },
            {
                id: 2,
                todo: '吃饭',
                done: false
            },
            {
                id: 3,
                todo: '睡觉',
                done: true
            }
        ]
    }
  },
  components: {
      InputItem,
    //   ListItem,
  },
  methods: {
      delItem(id) {
          this.ListItems.forEach((item,index) => {
              if (item.id === id) {
                  this.ListItems.splice(index, 1);
              }
          });
      },
      itemDone(id) {
          this.ListItems.forEach((item,index) => {
              if (item.id === id) {
                  this.ListItems[index].done = !this.ListItems[index].done;
              }
          });
      },
      addOneItem(value) {
          this.ListItems.push({
              id: new Date().getTime(),
              todo: value,
              done: false
          });
      }
  }
}
</script>

<style scoped lang="scss">
    .container {
        max-width: 700px;
        min-width: 480px;
        padding: 20px;
        margin: 40px auto;
        border-radius: 20px;
        box-shadow: 0 0 10px rgb(104, 75, 75);
        box-sizing: content-box;
        .router {
            margin-top: 20px;
            padding: 10px;
            text-align: center;
            // background-color: #333;
            span {
                // display: inline-block;
                margin: 0px 30px;
                border: 1px solid #fff;
                padding: 5px 20px;
                cursor: pointer;
                &:hover {
                    border: 1px solid #aaa;
                    border-radius: 5px;
                }
            }
        }
    }
</style>