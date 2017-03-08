import React from 'react'
import { Link, IndexLink } from 'react-router'

export default function Nav() {
  return (
    <div>
      <nav>
        <ul>
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          <li><Link to="/about" activeClassName="active">About</Link></li>
          <li><Link to="/form" activeClassName="active">Form</Link></li>
          <li><Link to="/not-found" activeClassName="active">Not Found</Link></li>
        </ul>
      </nav>
    </div>
  )
}
