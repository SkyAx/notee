export const state = () => ({
  notes: []
});

export const getters = {
  NOTES(state) {
    return state.notes;
  }
};

export const mutations = {
  SET_NOTES(state, payload) {
    state.notes = payload;
  }
};

export const actions = {
  getNotes({ commit }) {
    this.$axios.get('/notes-list')
    .then(res => {
      commit('SET_NOTES', res.data);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
