import React from 'react'
import TodoForm from './todo/TodoForm'
import TodoList from './todo/TodoList'
import { addTodo, generateId } from '../utils/todo.util'

export default class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        { id: 1, name: 'Learn JSX', isComplete: false },
        { id: 2, name: 'Learn Unity', isComplete: true },
        { id: 3, name: 'Ship It', isComplete: false },
      ],
      currentTodo: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this)
  }

  componentDidMount() {
    this.nameInput.focus()
  }

  handleInputChange(e) {
    this.setState({
      currentTodo: e.target.value
    })
    if (e.target.value) {
      this.setState({
        errorMessage: ''
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.currentTodo) {
      let id = generateId()
      let newTodo = { id, name: this.state.currentTodo, isComplete: false }
      let updatedTodos = addTodo(this.state.todos, newTodo)
      this.setState({
        todos: updatedTodos,
        currentTodo: ''
      })
    } else {

    }
  }

  handleEmptySubmit(e) {
    e.preventDefault()
    this.setState({
      errorMessage: 'Name required.'
    })
  }

  render() {
    return (
      <div>
        <h2>Todos</h2>
        <div className="Todo">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit}
            nameInput={(input) => { this.nameInput = input }}
          />
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    )
  }
}
