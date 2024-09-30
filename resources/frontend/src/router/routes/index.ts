import type { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'

const routes: RouteDefinition[] = [
    {
        component: lazy(() => import('@/layouts/global')),
        children: [
            {
                path: 'login',
                component: lazy(() => import('@/views/login')),
            },
            {
                component: lazy(() => import('@/layouts/blank')),
                children: [
                    {
                        path: '/',
                        component: lazy(() => import('@/views/home')),
                    },
                    {
                        path: '/album',
                        component: lazy(() => import('@/views/album')),
                    },
                    {
                        path: '/album/:id',
                        component: lazy(() => import('@/views/album/detail')),
                    },
                ],
            },
            {
                path: '/admin',
                component: lazy(() => import('@/layouts/admin')),
                children: [
                    {
                        path: '',
                        component: lazy(() => import('@/views/admin/dashboard')),
                    },
                    {
                        path: 'album',
                        component: lazy(() => import('@/views/admin/album')),
                    },
                    {
                        path: 'album/:id/photos',
                        component: lazy(() => import('@/views/admin/photo')),
                    },
                    {
                        path: 'change-password',
                        component: lazy(() => import('@/views/admin/change-password')),
                    },
                ],
            },
        ],
    },
]

export default routes
