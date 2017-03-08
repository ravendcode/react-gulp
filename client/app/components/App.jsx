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
      <div className="App">
        <div className="App-header">
          <img src="/assets/images/logo.svg" alt="App logo" className="App-logo" />
          <img src="/assets/images/gulp.svg" alt="App logo" className="App-logo-gulp" />
          <h2>React Gulp</h2>
        </div>
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
