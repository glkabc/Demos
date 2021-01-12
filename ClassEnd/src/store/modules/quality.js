const state = {
  cardFormData: {},
};
const mutations = {
  handleCheckFormData(state, n) {
    state.cardFormData = n;
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
