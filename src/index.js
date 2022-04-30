import ReactDOM from 'react-dom'
import React from 'react'
import App from './view/App'
import { Provider } from 'react-redux'
import store from './store'
import { createRoot } from 'react-dom/client'
import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
