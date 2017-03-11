import expect from 'expect'
import { addTodo, findById, toggleTodo, updateTodo, removeTodo } from './todo.util.jsx'

describe(__filename, () => {
  describe('#addTodo()', () => {
    it('should add todo to the list', () => {
      let todos = [
        {id: 1, name: 'one', isComplete: false},
        {id: 2, name: 'two', isComplete: false},
      ]
      let newTodo = {id: 3, name: 'three', isComplete: false}

      let result = addTodo(todos, newTodo)
      expect(result.length).toBe(3)
      expect(result).toInclude(newTodo)
    })
  })

  describe('#findById()', () => {
    it('should find todo by id', () => {
      let todos = [
        {id: 1, name: 'one', isComplete: false},
        {id: 2, name: 'two', isComplete: false},
      ]

      expect(findById(2, todos)).toInclude(todos[1])
      expect(findById(6, todos)).toBe(undefined)
    })
  })

  describe('#toggleTodo()', () => {
    it('should toggle todo', () => {
      let todo = {id: 3, name: 'three', isComplete: false}

      expect(toggleTodo(todo).isComplete).toNotBe(false)
    })
  })

  describe('#updateTodo()', () => {
    it('should update todo', () => {
      let todos = [
        {id: 1, name: 'one', isComplete: false},
        {id: 2, name: 'two', isComplete: false},
      ]
      let todo = {id: 2, name: 'three', isComplete: false}

      expect(updateTodo(todos, todo)).toInclude(todo)
    })
  })

  describe('#removeTodo()', () => {
    it('should remove todo', () => {
      let todos = [
        {id: 1, name: 'one', isComplete: false},
        {id: 2, name: 'two', isComplete: false},
      ]
      let todo = {id: 2, name: 'three', isComplete: false}
      let result = removeTodo(todos, todo.id)

      expect(result.length).toBe(1)
      expect(result[0]).toBe(todos[0])
    })
  })
})
