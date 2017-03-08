import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Todo from './components/Todo'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/todos" component={Todo} />
    <Route path="*" component={NotFound} />
  </Route>
)
