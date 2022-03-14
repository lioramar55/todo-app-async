import { storageService } from './async-storage.service.js'
import { utilService } from './util-service.js'

export const todoService = {
  query,
  save,
  removeTodo,
  getTodoById,
}

const TODO_KEY = 'TODO_DB'

const todosDemoData = [
  {
    _id: 'u123',
    txt: 'To build an awesome app',
    doneAt: null,
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
  },
  {
    _id: 'u124',
    txt: 'Be awesome',
    doneAt: null,
    createdAt: Date.now() - 1000 * 60 * 2,
  },
  {
    _id: 'u125',
    txt: 'Have a great time while build stuff',
    doneAt: null,
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    _id: 'u126',
    txt: 'Learn about blockchain technology',
    doneAt: null,
    createdAt: Date.now() - 1000 * 60 * 60 * 16,
  },
  {
    _id: 'u127',
    txt: 'Learn trading again',
    doneAt: null,
    createdAt: Date.now() - 1000 * 60 * 60 * 28,
  },
]
storageService
  .query(TODO_KEY)
  .then((todos) => (todos ? '' : storageService.store(TODO_KEY, todosDemoData)))

function query(filterBy) {
  if (!filterBy) return storageService.query(TODO_KEY)
  return storageService.query(TODO_KEY).then((todos) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      todos = todos.filter((todo) => regex.test(todo.txt))
    }
    if (filterBy.status !== 'all') {
      if (filterBy.status === 'done') todos = todos.filter((todo) => todo.doneAt)
      else todos = todos.filter((todo) => !todo.doneAt)
    }
    return todos
  })
}

function save(todoToSave) {
  if (todoToSave._id) {
    return storageService.put(TODO_KEY, todoToSave)
  } else {
    todoToSave.createdAt = Date.now()
    return storageService.post(TODO_KEY, todoToSave)
  }
}

function removeTodo(id) {
  return storageService.remove(TODO_KEY, id)
}

function getTodoById(id) {
  return query().then((todos) => todos.find((todo) => todo._id === id))
}
