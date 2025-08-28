
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/auth.jsx'
import { SearchProvider } from './context/search.jsx'
import { CartProvider } from './context/cart.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store,persistor  } from './reducers/slice/store.js'
import { PersistGate } from "redux-persist/integration/react";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
  <BrowserRouter>
   <Provider store={store}>
   <PersistGate loading={null} persistor={persistor}>
<RecoilRoot>

    <App />
</RecoilRoot>
   </PersistGate>
   </Provider>
  </BrowserRouter>
  </CartProvider>
  </SearchProvider>
  </AuthProvider>,
)
