import { storageService } from './async-storage.service.js'

export const userService = {
  getUser,
  save,
}

const USER_KEY = 'userDB'

const userDemoData = {
  _id: 'u123',
  fullname: 'Puki Ben David',
  activities: [{ txt: 'Added a Todo', at: Date.now() - 10000 }],
  createdAt: Date.now() - 1000 * 60 * 60 * 50,
}

storageService.query(USER_KEY).then((user) => {
  user ? '' : storageService.store(USER_KEY, userDemoData)
})

function getUser() {
  return storageService.query(USER_KEY)
}
function save(user) {
  return storageService.store(USER_KEY, user)
}
