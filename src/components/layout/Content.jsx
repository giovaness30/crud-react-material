import './Content.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../../view/pages/Home.jsx'
import Products from '../../view/pages/Products.jsx'
import NotFound from '../../view/pages/NotFound.jsx'

const Content = props => (
  <main className="Content">
    <Routes>
      <Route path="/products" element={<Products />}></Route>
      {/* <Route path="/param/:id" element={<Param />}></Route> */}
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </main>
)

export default Content
