import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import About from './components/About'
import Form from './components/Form'
import Home from './components/Home'
import NotFound from './components/NotFound'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/about" component={About} />
    <Route path="/form" component={Form} />
    {/*<Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
      </Route>*/}
    <Route path="*" component={NotFound} />
  </Route>
)
