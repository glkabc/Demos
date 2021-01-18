export default {
    namespace: true,
    state: () => ({
        temphone: 18644839202
    }),
    getters: {
        tep(state) {
            return state.temphone;
        },
        getSomeThing(state, getters, rootState) {
            console.log(getters);
            return '电话：' + state.temphone + "  Coutn:" + rootState.count
        }
    },
    mutations: {
        showtep(state) {
            console.log(state.temphone);
        }
    },
    actions: {
        showtepAsync({ state, commit, rootState }, Obj) {
            if (state.temphone !== rootState.count) {
                console.log(Obj);
                commit('addCount');
            }
        }
    }
}