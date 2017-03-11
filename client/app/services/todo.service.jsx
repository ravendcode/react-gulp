const baseUrl = 'http://localhost/api/todos'
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const loadTodos = () => {
  return fetch(baseUrl).then(res => res.json())
}

export const createTodo = (todo) => {
  return fetch(baseUrl, {
    headers,
    method: 'POST',
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

export const saveTodo = (todo) => {
  return fetch(`${baseUrl}/${todo.id}`, {
    headers,
    method: 'PATCH',
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

export const destroyTodo = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    headers,
    method: 'DELETE'
  })
}
