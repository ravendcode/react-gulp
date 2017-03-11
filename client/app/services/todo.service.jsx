import { baseUrl } from '../config'
const todosApi = baseUrl + '/api/todos'
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const loadTodos = () => {
  return fetch(todosApi).then(res => res.json())
}

export const createTodo = (todo) => {
  return fetch(todosApi, {
    headers,
    method: 'POST',
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

export const saveTodo = (todo) => {
  return fetch(`${todosApi}/${todo.id}`, {
    headers,
    method: 'PATCH',
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

export const destroyTodo = (id) => {
  return fetch(`${todosApi}/${id}`, {
    headers,
    method: 'DELETE'
  })
}
