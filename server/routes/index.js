
export default (app) => {
  app.use('/', require('./index.route').default)
  app.use('/api/todos', require('./api/todos.route').default)
}
