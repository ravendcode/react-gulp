import React from 'react'
import { browserHistory } from 'react-router'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.submit = this.submit.bind(this)
  }

  submit(e) {
    e.preventDefault()
    browserHistory.push('/')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref="name" />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
