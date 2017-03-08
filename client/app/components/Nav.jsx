import React from 'react'
import { Link, IndexLink } from 'react-router'

export default function Nav() {
  return (
    <div>
      <nav>
        <ul>
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          <li><Link to="/todos" activeClassName="active">Todos</Link></li>
        </ul>
      </nav>
    </div>
  )
}
