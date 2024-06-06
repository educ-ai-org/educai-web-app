import ThemeProvider from '@mui/material/styles/ThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import theme from './lib/theme.ts'
import Home from './pages/Home.tsx'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Turma from './pages/Turma'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import TalkWithEdu from './pages/TalkWithEdu.tsx'
import AuthProvider from './providers/AuthProvider.tsx'
import Material from './pages/Material.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/turma/:id',
    element: <Turma />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/edu',
    element: <TalkWithEdu />
  },
  {
    path: '/material',
    element: <Material />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
