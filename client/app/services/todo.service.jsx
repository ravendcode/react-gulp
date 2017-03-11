console.log('lol')
const baseUrl = 'https://ravend-react-gulp.herokuapp.com:443/api/todos'
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const credentials = {
  credentials: 'include'
}

export const loadTodos = () => {
  return fetch(baseUrl).then(res => res.json())
}

export const createTodo = (todo) => {
  return fetch(baseUrl, {
    credentials,
    headers,
    method: 'POST',
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

export const saveTodo = (todo) => {
  return fetch(`${baseUrl}/${todo.id}`, {
    credentials,
    headers,
    method: 'PATCH',
    body: JSON.stringify(todo)
  }).then(res => res.json())
}

export const destroyTodo = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    credentials,
    headers,
    method: 'DELETE'
  })
}
