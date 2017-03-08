import React from 'react'

export default function TodoForm({handleInputChange, currentTodo, handleSubmit, nameInput}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} value={currentTodo} ref={nameInput} />
      </form>
    </div>
  )
}

TodoForm.propTypes = {
  handleInputChange: React.PropTypes.func.isRequired,
  nameInput: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  currentTodo: React.PropTypes.string.isRequired,
}
