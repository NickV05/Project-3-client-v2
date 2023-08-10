import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './input.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.context.jsx'
import { CartProvider } from './context/cart.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthProvider>
    <CartProvider>
        <App />
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
)
