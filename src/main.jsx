import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'   // ✅ Tailwind styles
import { BrowserRouter } from "react-router";
ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </BrowserRouter>
)
