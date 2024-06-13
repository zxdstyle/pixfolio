import type { PropsWithChildren } from 'react'
import { App as AntdApp, ConfigProvider } from 'antd'
import light from '@/constants/themes/light'

export default function Provider({ children }: PropsWithChildren) {
    return (
        <ConfigProvider theme={light}>
            <AntdApp>
                {children}
            </AntdApp>
        </ConfigProvider>
    )
}
