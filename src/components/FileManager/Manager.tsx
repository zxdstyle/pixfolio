import type { ThemeConfig } from 'antd'
import { ConfigProvider, Flex } from 'antd'
import Sidebar from './Sidebar'
import Content from './Content'
import { Provider } from './context'

const modalStyle: ThemeConfig = {
    components: {
        Modal: {
            paddingMD: 0,
            paddingContentHorizontalLG: 0,
        },
    },
}

export function FileManager() {
    return (
        <ConfigProvider theme={modalStyle}>
            <Flex className="h-128">
                <Provider>
                    <Sidebar />

                    <Content />
                </Provider>
            </Flex>
        </ConfigProvider>
    )
}
