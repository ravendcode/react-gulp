import React from 'react'
import TodoLink from './TodoLink'

export default function TodoFooter() {
  return (
    <div className="TodoFooter">
      <TodoLink to="/todos">All</TodoLink>
      <TodoLink to="/todos/active">Active</TodoLink>
      <TodoLink to="/todos/complete">Complete</TodoLink>
    </div>
  )
}
