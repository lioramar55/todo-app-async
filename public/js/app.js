import { router } from './router.js'
import { store } from './store/store.js'
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'

const options = {
  template: `
    <section v-if="!isLoading" class="main-app">
      <app-header></app-header>
      <div :style="userStyle" class="app-container">
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </section>
    <section v-else class="loader">
      <p>Loading...</p>
    </section>
  `,
  components: {
    appHeader,
    appFooter,
  },
  created() {
    this.$store.dispatch('loadApp')
  },
  router,
  store,
  computed: {
    userStyle() {
      const { prefs } = this.$store.getters.user
      if (prefs) {
        return { 'background-color': prefs.bgColor, color: prefs.color }
      } else return ''
    },
    isLoading() {
      return this.$store.getters.isLoading
    },
  },
}
const app = Vue.createApp(options)
app.use(router)
app.use(store)
app.mount('#app')
