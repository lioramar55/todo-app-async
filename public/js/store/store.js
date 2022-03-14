import { userStore } from './user.store.js'
import { todoStore } from './todo.store.js'
import { userService } from '../services/user-service.js'
import { todoService } from '../services/todo-service.js'

export const store = new Vuex.Store({
  strict: true,
  state: {
    isLoading: true,
  },
  modules: {
    userStore,
    todoStore,
  },
  getters: {
    isLoading({ isLoading }) {
      return isLoading
    },
  },
  mutations: {
    toggleLoad(state) {
      state.isLoading = false
    },
  },
  actions: {
    loadApp({ commit }) {
      todoService
        .query()
        .then((todos) => {
          commit({ type: 'loadTodos', todos })
        })
        .then(userService.getUser)
        .then((user) => commit({ type: 'loadUser', user }))
        .then(() => {
          commit('toggleLoad')
        })
    },
  },
})
