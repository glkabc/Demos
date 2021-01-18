/**
 * Action 类似于 mutation，不同在于：
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 * 
 */

/**
 * Actions 支持同样的载荷方式和对象方式进行分发
 * stroe.dispatch('incrementAsync', {amount: 10});
 * store.dispatch({
 *     type: 'incrementAsync',
 *     amount: 10
 * });
 * 
 * 你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）
 * 
 * store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：
 */


const actions = {
    increment (context) {
        context.commit('increment')
    },

    // 异步操作
    incrementAsync ({ commit }) {
        setTimeout(() => {
            commit('increment');
        }, 1000);
    },

    actionA ({ commit }) {
        return new Promise((resolve) => {
            setTimeout(()=> {
                commit('someMutation');
                resolve();
            }, 1000);
        })
    },

    actionB ({ dispatch, commit }) {
        return dispatch('actionA').then(() => {
            commit('someOtherMutation');
        })
    },

    // 使用 async/await
    // async actionC ( {commit }) {
    //     // await commit('someMunation');
    //     commit('getDate', await getDate());
    // },

    // async actionD ({ dispatch, commit }) {
    //     await dispatch('actionC');
    //     commit('getOtherDate', await getOtherDate());
    // }
}

export default actions