import React from 'react'

export default function TodoItem({ name, isComplete }) {
  return (
    <li>
      <label><input type="checkbox" defaultChecked={isComplete} /> {name}</label>
    </li>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool.isRequired,
}
