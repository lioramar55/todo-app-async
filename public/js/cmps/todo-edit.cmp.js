import { todoService } from '../services/todo-service.js'
export default {
  template: `
    <section v-if="todo" class="todo-edit">
      <h1>{{ mode }} todo</h1>
        <input type="text" v-model="todo.txt" placeholder="What todo?" />
        <div class="btns">
          <button @click="saveTodo">{{mode}}</button>
          <button @click="$router.push('/todo')">Cancel</button>
        </div>
    </section>
  `,
  data() {
    return {
      todo: null,
    }
  },
  created() {
    const { id } = this.$route.params
    console.log('id', id)
    if (id) todoService.getTodoById(id).then((todo) => (this.todo = todo))
    if (id)
      todoService.getTodoById(id).then((todo) => console.log('todo', todo))
    else this.todo = { txt: '' }
  },
  methods: {
    saveTodo() {
      if (this.todo._id) {
        this.$store.dispatch({
          type: 'updateTodo',
          todo: { ...this.todo },
        })
      } else {
        this.$store.dispatch({
          type: 'addTodo',
          todo: { ...this.todo },
        })
      }
      this.$router.push('/todo')
    },
  },
  computed: {
    mode() {
      return this.todo?._id ? 'Edit' : 'Add'
    },
  },
}
