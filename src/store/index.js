import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    selectUsers: JSON.parse(localStorage.getItem('selectFriends') || '[]'),
  },
  mutations: {
    updateList(state, payload) {

      if (payload.list == 'friends') {
        state.users = payload.value;
      } 
      else if (payload.list == 'selected') {
        state.selectUsers = payload.value;
      }
    },

    saveSelected(state) {
      state.selectUsers = JSON.parse(localStorage.getItem('selectFriends') || '[]')
    }

  },
  actions: {
    updateList({commit}, payload) {
      commit('updateList', payload)
    },
    saveSelected({commit}) {
      commit('saveSelected')
    },
  },

  getters: {
    users: state => {
      return state.users;
    },

    selectUsers: state => {
      return state.selectUsers;
    },
  },

  modules: {
  }
})
