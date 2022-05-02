import './Menu.css'

import React from 'react'
import { Link } from 'react-router-dom'

const Menu = props => (
  <aside className="Menu">
    <nav>
      <ul>
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/products">Produtos</Link>
        </li>
        <li>
          <Link to="/search">Pesquisar</Link>
        </li>
      </ul>
    </nav>
  </aside>
)

export default Menu
