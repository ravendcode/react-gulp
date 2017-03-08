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
