import type { PropsWithChildren } from 'react'
import { Refine } from '@refinedev/core'
import routerProvider from '@refinedev/react-router-v6'
import { useNotificationProvider } from '@refinedev/antd'

export default function RefineProvider({ children }: PropsWithChildren) {
    return (
        <Refine routerProvider={routerProvider} notificationProvider={useNotificationProvider}>
            {children}
        </Refine>
    )
}
