import ThemeProvider from '@mui/material/styles/ThemeProvider'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import theme from './lib/theme.ts'
import Home from './pages/Home.tsx'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Turma from './pages/Turma'
import i18n from './i18n.ts'
import { I18nextProvider } from 'react-i18next'

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import TalkWithEdu from './pages/TalkWithEdu.tsx'
import AuthProvider from './providers/AuthProvider.tsx'
import Material from './pages/Material.tsx'
import ClassworkList from './components/ClassWorksList/ClassWorksList.tsx'
import CriarAtividade from './pages/Atividades/CriarAtividade.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <AuthProvider>
      <Home />
    </AuthProvider>,
  },
  {
    path: '/turma/:id',
    element: <AuthProvider>
      <Turma />
    </AuthProvider>,
  },
  {
    path: '/edu',
    element: <TalkWithEdu />,
  },
  {
    path: '/turma/criar-atividade',
    element: <AuthProvider>
      <CriarAtividade />
    </AuthProvider>,
  },
  {
    path: '/material',
    element: <AuthProvider>
    <Material />
  </AuthProvider>,
  },
  {
    path: '/turma/visualizar-atividade',
    element: <AuthProvider>
      <ClassworkList/>
    </AuthProvider>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <I18nextProvider i18n={i18n}>
      <Outlet />
      <RouterProvider router={router} />
    </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
