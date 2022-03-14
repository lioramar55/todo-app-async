const todoService = require('./services/todo.service.js')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080

app.use(
  session({
    secret: 'puki-9480930307-pocd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)
// app.use('/', express.static('public'))
app.use('/', express.static(path.join(__dirname, 'public')))

app.use(cookieParser())
app.use(bodyParser.json())

// const port = 8080

app.get('/', (req, res) => {})

// GET ALL TODOS
app.get('/api/todo/', (req, res) => {
  todoService
    .query()
    .then((todos) => res.send(todos))
    .catch((err) => res.status(501).send('Server error'))
})

// GET TODO BY ID
app.get('/api/todo/:id', (req, res) => {
  const { id } = req.params
  todoService
    .getById(id)
    .then((todo) => res.send(todo))
    .catch((err) => res.status(404).send('Not found'))
})

// CREATE TODO
app.post('/api/todo/', (req, res) => {
  const todo = req.body
  todoService
    .save(todo)
    .then((todo) => res.send(todo))
    .catch((err) => res.status(501).send('Server error'))
})

// UPDATE TODO
app.put('/api/todo/', (req, res) => {
  const todo = req.body
  todoService
    .save(todo)
    .then((todo) => res.send(todo))
    .catch((err) => res.status(501).send('Server error'))
})

// DELETE TODO

app.delete('/api/todo/:id', (req, res) => {
  const { id } = req.params
  todoService.remove(id).then(res.status(200).send({ msg: 'Removed' }))
})

app.get('/api/user', (req, res) => {})

app.listen(port, () => console.log(`http://localhost:${port}`))
