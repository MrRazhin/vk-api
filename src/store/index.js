import Vue from 'vue'
import Vuex from 'vuex'
import VK from 'vk-openapi';
import jsonp from 'jsonp';

Vue.use(Vuex)
VK.init({apiId:8135174});

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

    saveSelected(state, list) {
      if (state.selectUsers.length > 0) {
        localStorage.setItem('selectFriends', JSON.stringify(list));
        console.log('Selected friends');
        state.selectUsers.forEach(element => {
          console.log(element.first_name, element.last_name)
        });
      } else {
        console.log('Список пуст!')
      }

      state.selectUsers = JSON.parse(localStorage.getItem('selectFriends') || '[]')
    },

    login(state) {

      VK.Auth.login(function(response) {

        jsonp(`https://api.vk.com/method/friends.get?count=60&fields=nickname,photo_50&access_token=${response.session.sid}&v=5.131`, function(err, data) {
          if (err) {
            console.log('Error ',err.message);
          } else {
            localStorage.setItem('users', JSON.stringify( data.response.items));
            state.users = data.response.items;
          }
        });

      });

    },

  },
  actions: {
    updateList({commit}, payload) {
      commit('updateList', payload)
    },
    saveSelected({commit}, list) {
      commit('saveSelected', list)
    },
    login({commit}) {
      commit('login')
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
