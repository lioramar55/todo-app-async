import { todoService } from '../services/todo-service.js'

export default {
  template: `
    <section v-if="todo" class="todo-details">
      <h1>Todo text: {{todo.txt}}</h1>
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
}
