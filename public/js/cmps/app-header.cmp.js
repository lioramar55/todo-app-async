export default {
  template: `
    <header>
      <div class="main-header">
        <router-link to="/">
          <div class="logo"><h1>Todo App</h1></div>
        </router-link> 
        <nav>
          <router-link to="/todo">Todo app</router-link> | 
          <router-link to="/user">Profile</router-link> 
        </nav>
        <span> Welcome {{username}} - %{{percentageDone}}</span>
      </div>
    </header>
  `,
  computed: {
    username() {
      return this.$store.getters.username
    },
    percentageDone() {
      if (isNaN(this.$store.getters.percentageDone)) return 'You have no todos, plan your day :)'
      return this.$store.getters.percentageDone + ' of your todos are completed'
    },
  },
}
