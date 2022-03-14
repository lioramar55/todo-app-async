import { todoService } from '../services/todo-service.js'

export const todoStore = {
  state: {
    todos: null,
    filterBy: null,
  },
  getters: {
    percentageDone({ todos }) {
      const totalDone = todos.reduce((acc, todo) => acc + (todo.doneAt ? 1 : 0), 0)
      return (totalDone / todos.length) * 100
    },
    todos({ todos, filterBy }) {
      if (filterBy) {
        var filteredTodos = JSON.parse(JSON.stringify(todos))
        if (filterBy.txt) {
          const regex = new RegExp(filterBy.txt, 'i')
          filteredTodos = filteredTodos.filter((todo) => regex.test(todo.txt))
        }
        if (filterBy.status !== 'all') {
          if (filterBy.status === 'done')
            filteredTodos = filteredTodos.filter((todo) => todo.doneAt)
          else filteredTodos = filteredTodos.filter((todo) => !todo.doneAt)
        }
        return filteredTodos
      } else return todos
    },
  },
  mutations: {
    addTodo(state, { todo }) {
      state.todos.unshift(todo)
    },
    updateTodos(state, { todos }) {
      state.todos = todos
    },
    setFilter(state, { todos, filterBy }) {
      state.filterBy = Object.keys(filterBy).length === 0 ? null : filterBy
      state.todos = todos
    },
    loadTodos(state, { todos }) {
      state.todos = todos
    },
  },
  actions: {
    updateTodo({ commit }, { todo }) {
      return todoService
        .save(todo)
        .then(() => todoService.query())
        .then((todos) => {
          commit({ type: 'updateTodos', todos, todo })
          const activity = { txt: `Updated a Todo: '${todo.txt}'`, at: Date.now() }
          commit({ type: 'addActivity', activity })
        })
    },
    toggleTodo({ commit, state }, { todo }) {
      return todoService.save(todo).then(() => {
        todoService.query(state.filterBy).then((todos) => {
          commit({ type: 'updateTodos', todos })
          const activity = {
            txt: `Toggled a Todo to be '${todo.dontAt ? 'Done' : 'Undone'}'`,
            at: Date.now(),
          }
          commit({ type: 'addActivity', activity })
        })
      })
    },
    addTodo({ commit }, { todo }) {
      return todoService.save(todo).then((savedTodo) => {
        commit({ type: 'addTodo', todo: savedTodo })
        const activity = { txt: `Added a Todo: '${todo.txt}'`, at: Date.now() }
        commit({ type: 'addActivity', activity })
      })
    },
    deleteTodo({ state, commit }, { id }) {
      return todoService
        .removeTodo(id)
        .then(() => todoService.query(state.filterBy))
        .then((todos) => {
          commit({ type: 'updateTodos', todos })
          const activity = { txt: 'Removed a Todo', at: Date.now() }
          commit({ type: 'addActivity', activity })
        })
    },
    setFilter({ commit }, { filterBy }) {
      return todoService.query(filterBy).then((todos) => {
        commit({ type: 'setFilter', filterBy, todos })
        const activity = { txt: 'Set a filter', at: Date.now() }
        commit({ type: 'addActivity', activity })
      })
    },
  },
}
