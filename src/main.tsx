import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LandingPage from './pages/LandingPage.tsx'
import PlatformLayout from './components/PlatformLayout/PlatformLayout.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import Login from './pages/Login.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/teste',
    element: <PlatformLayout />,
  },
  {
    path: '/login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
