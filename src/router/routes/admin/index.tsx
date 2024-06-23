import type { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
    {
        path: '/',
        lazy: () => import('@/layouts/admin'),
        children: [
            {
                path: 'dashboard',
                lazy: () => import('@/views/admin/dashboard'),
            },
            {
                path: 'storages',
                lazy: () => import('@/views/admin/storages'),
            },
            {
                path: 'albums',
                lazy: () => import('@/views/admin/albums'),
            },
        ],
    },
]

export default routes
