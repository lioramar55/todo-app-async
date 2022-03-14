const fs = require('fs')
const todos = require('./../data/todo')

todos.length ? '' : _createDemoData()

function query() {
  return Promise.resolve(todos)
}
function remove(id) {
  const idx = todos.findIndex((todo) => todo._id === id)
  if (idx === -1) return Promise.reject('not found')
  todos.splice(idx, 1)
  return _saveToFile()
}
function save(todoToSave) {
  if (todoToSave._id) {
    const idx = todos.findIndex((todo) => todo._id === todoToSave._id)
    todos[idx] = todoToSave
  } else {
    todoToSave._id = makeId(8)
    todoToSave.createdAt = Date.now()
    todos.unshift(todoToSave)
  }
  return _saveToFile().then(() => todoToSave)
}

function getById(id) {
  const idx = todos.findIndex((todo) => todo._id === id)
  if (idx === -1) return Promise.reject('not found')
  return Promise.resolve(todos[idx])
}

function _saveToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile('data/todo.json', JSON.stringify(todos, null, 2), (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

function _createDemoData() {
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
  return new Promise((resolve, reject) => {
    fs.writeFile('data/todo.json', JSON.stringify(todosDemoData, null, 2), (err) => {
      if (err) reject()
      resolve()
    })
  })
}

function makeId(length = 5) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

module.exports = {
  query,
  remove,
  save,
  getById,
}
