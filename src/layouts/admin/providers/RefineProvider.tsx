import type { PropsWithChildren } from 'react'
import { Refine } from '@refinedev/core'
import routerProvider from '@refinedev/react-router-v6'
import { useNotificationProvider } from '@refinedev/antd'
import { dataProvider } from '@/utils/request'

export default function RefineProvider({ children }: PropsWithChildren) {
    return (
        <Refine
            dataProvider={dataProvider('http://localhost:8081/api/v1')}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
        >
            {children}
        </Refine>
    )
}
