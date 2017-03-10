import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, handleToggle, handleRmove }) {
  return (
    <div className="TodoList">
      <ul>
        {todos.map(todo => <TodoItem handleToggle={handleToggle} handleRmove={handleRmove} key={todo.id} {...todo} />)}
      </ul>
    </div>
  )
}

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  handleToggle: React.PropTypes.func.isRequired,
  handleRmove: React.PropTypes.func.isRequired,
}
