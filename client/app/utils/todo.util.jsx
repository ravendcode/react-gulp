export const addTodo = (list, item) => [...list, item]
export const generateId = () => Math.floor(Math.random() * 100000)
export const findById = (id, list) => list.find(item => item.id === id)
export const toggleTodo = (todo) => {
  todo.isComplete = !todo.isComplete
  return todo
}

export const updateTodo = (list, updated) => {
  let updatedIndex = list.findIndex(item => item.id === updated.id)
  list[updatedIndex] = updated
  return list
}

export const removeTodo = (list, id) => {
  let removeIndex = list.findIndex(item => item.id === id)
  list.splice(removeIndex, 1)
  return list
}

export const filterTodos = (list, filter) => {
  switch (filter) {
    case 'active':
      return list.filter(item => !item.isComplete)
    case 'complete':
      return list.filter(item => item.isComplete)
    default:
      return list
  }
}
