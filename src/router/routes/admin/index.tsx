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
        ],
    },
]

export default routes
