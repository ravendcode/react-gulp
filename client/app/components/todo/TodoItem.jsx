import React from 'react'

export default function TodoItem({ id, name, isComplete, handleToggle, handleRmove }) {
  return (
    <li>
      <span className="delete-item"><a href="#" onClick={(e) => handleRmove(e, id)}>X</a></span>
      <label><input type="checkbox" onChange={() => handleToggle(id)} checked={isComplete} /> {name}</label>
    </li>
  )
}

TodoItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool.isRequired,
  handleToggle: React.PropTypes.func.isRequired,
  handleRmove: React.PropTypes.func.isRequired,
}
