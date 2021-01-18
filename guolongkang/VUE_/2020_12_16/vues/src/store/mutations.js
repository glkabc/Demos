/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutations。
 * Vuex 中的 mutations 非常类似于事件
 * 想要触发 mutations 中的事件就要使用 stroe.commit('事件名', payload) 方法
 */

 /**
  * 提交载荷（大多数情况下是一个对象）
  * store.commit('事件名', 10);
  * store.commit('事件名', {amount: 10});
  */

  /**
   * 对象风格的提交
   * store.commit({
   *    type: '事件名',
   *    amount: 10
   * })
   * 
   * 当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：
   */

   /**
    * Mutation 必须是同步函数
    */

const mutations =  {
    addCount(state) {
        state.count += 1;
        console.log('count add one!' + state.count);
    },
    addCountStep(state, payload) {
        return state.count += payload.amount;
    }
}

export default mutations