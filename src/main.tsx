import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/style.less'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import '@/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
