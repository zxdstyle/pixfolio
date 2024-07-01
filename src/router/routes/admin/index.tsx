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
            {
                path: 'albums/create',
                lazy: () => import('@/views/admin/albums/create'),
            },
            {
                path: 'albums/:id',
                lazy: () => import('@/views/admin/albums/detail'),
            },
            {
                path: 'settings',
                lazy: () => import('@/views/admin/settings'),
            },
        ],
    },
]

export default routes
