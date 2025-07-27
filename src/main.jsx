
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/auth.jsx'
import { SearchProvider } from './context/search.jsx'
import { CartProvider } from './context/cart.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </CartProvider>
  </SearchProvider>
  </AuthProvider>,
)
