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
                path: 'storage',
                lazy: () => import('@/views/admin/storage'),
            },
        ],
    },
]

export default routes
