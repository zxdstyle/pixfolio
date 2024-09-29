import routes from '@/router/routes'
import { Router } from '@solidjs/router'

export default function RouterProvider() {
    return <Router>{routes}</Router>
}
