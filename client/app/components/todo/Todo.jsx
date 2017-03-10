import React from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import { loadTodos, createTodo, saveTodo, destroyTodo } from '../../services/todo.service'
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from '../../utils/todo.util'

export default class Todo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      currentTodo: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleRmove = this.handleRmove.bind(this)
  }

  static propTypes() {
    return {
      location: React.PropTypes.object.isRequired
    }
  }

  componentDidMount() {
    this.nameInput.focus()
    loadTodos().then(todos => this.setState({todos: todos.todos}))
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

  handleToggle(id) {
    let todo = findById(id, this.state.todos)
    let toggled = toggleTodo(todo)
    let updatedTodos = updateTodo(this.state.todos, toggled)
    this.setState({ todos: updatedTodos })
    saveTodo(toggled).then(() => this.showTmpMessage('Todo Updated'))
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
      createTodo(newTodo).then(() => this.showTmpMessage('Todo Added'))
    }
  }

  handleEmptySubmit(e) {
    e.preventDefault()
    this.setState({
      errorMessage: 'Name required.'
    })
  }

  showTmpMessage(message) {
    this.setState({message})
    setTimeout(() => this.setState({message: ''}), 2500)
  }

  handleRmove(e, id) {
    e.preventDefault()
    let todos = removeTodo(this.state.todos, id)
    this.setState({ todos })
    destroyTodo(id)
      .then(() => this.showTmpMessage('Todo Removed'))
  }

  render() {
    let todos
    switch (this.props.location.pathname) {
      case '/todos/active':
        todos = filterTodos(this.state.todos, 'active')
        break
      case '/todos/complete':
        todos = filterTodos(this.state.todos, 'complete')
        break
      default:
        todos = this.state.todos
    }
    return (
      <div>
        <h2>Todos</h2>
        <div className="Todo">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          {this.state.message && <span className="success">{this.state.message}</span>}
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit}
            nameInput={(input) => { this.nameInput = input }}
          />
          <TodoList handleToggle={this.handleToggle}
            handleRmove={this.handleRmove}
            todos={todos}
          />
          <TodoFooter />
        </div>
      </div>
    )
  }
}

