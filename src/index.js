import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStateProvider } from '@lemonenergy/utils/dist/providers'
import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement,
)
