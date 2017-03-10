import express from 'express'
import _ from 'lodash'

const router = express.Router()

let todos = [
  { id: 1, name: 'Learn JSX', isComplete: false },
  { id: 2, name: 'Learn Unity', isComplete: true },
  { id: 3, name: 'Ship It', isComplete: false }
]

router.get('/', (req, res, next) => {
  res.send({ todos })
})

router.get('/:id', (req, res, next) => {
  res.send({ todo: req.todo })
})

router.post('/', (req, res, next) => {
  let body = _.pick(req.body, ['id', 'name', 'isComplete'])
  let todo = todos.push(body)
  res.status(201).send({ todo })
})

router.patch('/:id', (req, res, next) => {
  let body = _.pick(req.body, ['id', 'name', 'isComplete'])
  _.extend(req.todo, body)
  todos[req.todoIndex] = req.todo
  res.send({ todo: req.todo })
})

router.delete('/:id', (req, res, next) => {
  todos.splice(req.todoIndex, 1)
  res.sendStatus(200)
})

router.param('id', function (req, res, next, id) {
  let parsedId = parseInt(id, 10)
  let index = todos.findIndex(todo => todo.id === parsedId)
  if (index === -1) {
    return res.sendStatus(404)
  }
  let todo = todos.find(todo => todo.id === parsedId)
  req.todo = todo
  req.todoIndex = index
  next()
})

export default router
