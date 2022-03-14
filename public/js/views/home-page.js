export default {
  template: `
    <section  class="home-page">
      <h1>Welcome to the home page - {{username}}</h1>
      <h2>Go ahead and add todos</h2>
      <router-link to="/todo">Todos APP</router-link>
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
  computed: {
    username() {
      return this.$store.getters.user.fullname
    },
  },
}
