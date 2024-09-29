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
                        component: lazy(() => import(/* webpackChunkName: "home" */'@/views/home')),
                    },
                    {
                        path: '/album',
                        component: lazy(() => import(/* webpackChunkName: "album" */'@/views/album')),
                    },
                    {
                        path: '/album/:id',
                        component: lazy(() => import(/* webpackChunkName: "album-detail" */'@/views/album/detail')),
                    },
                ],
            },
            {
                path: '/admin',
                component: lazy(() => import('@/layouts/admin')),
                children: [
                    {
                        path: '',
                        component: lazy(() => import(/* webpackChunkName: "dashboard" */'@/views/admin/dashboard')),
                    },
                    {
                        path: 'album',
                        component: lazy(() => import(/* webpackChunkName: "admin-album" */'@/views/admin/album')),
                    },
                    {
                        path: 'album/:id/photos',
                        component: lazy(() => import(/* webpackChunkName: "admin-photo" */'@/views/admin/photo')),
                    },
                ],
            },
        ],
    },
]

export default routes
