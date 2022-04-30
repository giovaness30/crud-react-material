import './App.css'
import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import Menu from '../components/layout/Menu.jsx'
import Content from '../components/layout/Content.jsx'

const App = props => (
  <div className="App">
    <Router>
      <Menu />
      <Content />
    </Router>
  </div>
)

export default App
