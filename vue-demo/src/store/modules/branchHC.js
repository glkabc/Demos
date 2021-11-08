// 部门HC的状态管理
const state = {
  demandId: null
}
const mutations = {
  updateDemandId(state, newDemandId) {
    state.demandId = newDemandId
  }
}
export default {
  namespaced: true,
  state,
  mutations
}