import { userService } from '../services/user-service.js'

export const userStore = {
  state: {
    user: null,
  },
  getters: {
    user({ user }) {
      return user
    },
    username({ user }) {
      return user.fullname
    },
    userActivities({ user }) {
      return user.activities
    },
  },
  mutations: {
    loadUser(state, { user }) {
      state.user = user
    },
    addActivity(state, { activity }) {
      state.user.activities.unshift(activity)
      userService.save(JSON.parse(JSON.stringify(state.user)))
    },
    savePrefs(state, { name, prefs }) {
      if (name) state.user.fullname = name
      state.user.prefs = prefs
      state.user.activities.unshift({
        txt: `Changed user settings: name- '${name}', color- '${prefs.color}', BG Color- '${prefs.bgColor}'`,
        at: Date.now(),
      })
      userService.save(JSON.parse(JSON.stringify(state.user)))
    },
  },
}
