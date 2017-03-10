import React from 'react'
import { Link } from 'react-router'

export default class TodoLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.handleClick = this.handleClick.bind(this)
  }

  // handleClick(e) {
  //   e.preventDefault()
  //   history.pushState(null, '', this.props.to)
  // }

  render() {
    return <Link to={this.props.to} activeClassName="active">{this.props.children}</Link>
    // return <a href="#" onClick={this.handleClick}></a>
  }
}

TodoLink.propTypes = {
  children: React.PropTypes.node.isRequired,
  to: React.PropTypes.string.isRequired,
}
