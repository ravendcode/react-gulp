import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos }) {
  return (
    <div className="Todo-List">
      <ul>
        {todos.map(todo => <TodoItem key={todo.id} {...todo} />)}
      </ul>
    </div>
  )
}

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
}
