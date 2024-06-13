import type { RouteObject } from 'react-router-dom'
import appRoutes from './app'
import adminRoutes from './admin'

const routes: RouteObject[] = [
    ...adminRoutes,
    ...appRoutes,
]

export default routes
