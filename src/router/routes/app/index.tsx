import type { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
    {
        index: true,
        lazy: () => import('@/views/app/home'),
    },
]

export default routes
