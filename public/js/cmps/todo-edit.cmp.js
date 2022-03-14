import { todoService } from '../services/todo-service.js'
export default {
  template: `
    <section v-if="todo" class="todo-edit">
      <h1>Edit todo, (add name)</h1>
        <div ref="todoTxt" class="edit-content" contenteditable="true">{{todo.txt}}</div>
        <div class="btns">
          <button @click="updateTodo">Update</button>
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
    todoService.getTodoById(id).then((todo) => (this.todo = todo))
  },
  methods: {
    updateTodo() {
      this.todo.txt = this.$refs.todoTxt.innerText
      this.$store.dispatch({
        type: 'updateTodo',
        todo: { ...this.todo },
      })
      this.$router.push('/todo')
    },
  },
}
