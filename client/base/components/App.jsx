import React, { PropTypes } from 'react'
import Nav from './Nav'
import Home from './Home'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>React SPA</h1>
        <Nav />
        {this.props.children || <Home />}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

App.defaultProps = {
  children: null
}
