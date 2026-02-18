import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Staff from './pages/Staff.jsx'
import Store from './pages/Store.jsx'
import Regole from './pages/Regole.jsx'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { AuthProvider } from './contexts/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><ScrollToTop /><Layout /></>}>
            <Route index element={<App />} />
            <Route path="staff" element={<Staff />} />
            <Route path="store" element={<Store />} />
            <Route path="regole" element={<Regole />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
