import todoList from '../cmps/todo-list.cmp.js'
import todoFilter from '../cmps/todo-filter.cmp.js'

export default {
  template: `
    <section class="todo-app">
      <todo-filter @set-filter="onSetFilter"></todo-filter>
      <button @click="$router.push('/todo/edit')">Add todo</button>
      <button @click="setPage(-1)">Prev</button>
      <button @click="setPage(1)">Next</button>
      <todo-list 
        :todos="todos"
        @delete-todo="onDeleteTodo"
        @toggle-todo="onToggleTodo"
      ></todo-list>

    </section>
  `,
  data() {
    return {
      prefs: this.$store.getters.user.prefs
        ? this.$store.getters.user.prefs
        : {
            color: '',
            bgColor: '',
          },
    }
  },
  components: {
    todoList,
    todoFilter,
  },
  methods: {
    setPage(diff) {
      this.$store.commit({ type: 'setPage', diff })
    },
    onAddTodo(todo) {
      this.$store.dispatch({
        type: 'addTodo',
        todo,
      })
    },
    onDeleteTodo(id) {
      this.$store.dispatch({
        type: 'deleteTodo',
        id,
      })
    },
    onToggleTodo(todo) {
      todo = { ...todo }
      todo.doneAt = todo.doneAt ? null : Date.now()
      this.$store.dispatch({
        type: 'toggleTodo',
        todo,
      })
    },
    onSetFilter(filterBy) {
      this.$store.dispatch({
        type: 'setFilter',
        filterBy,
      })
    },
  },
  computed: {
    todos() {
      return this.$store.getters.todos
    },
  },
}
