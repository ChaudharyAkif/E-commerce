
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ProductViewProvider } from './context/ProductViewContext.jsx'
import AppProvider from './components/AppProvider.jsx'
import { CartProvider } from './pages/Frontend/Home/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <BrowserRouter>
    <ProductViewProvider>
              <CartProvider>
    <App />
    </CartProvider>
    </ProductViewProvider>
    </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
