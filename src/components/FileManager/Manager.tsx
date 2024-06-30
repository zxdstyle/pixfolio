import type { ThemeConfig } from 'antd'
import { Col, ConfigProvider, Row, theme } from 'antd'
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
    const { token } = theme.useToken()

    return (
        <ConfigProvider theme={modalStyle}>
            <div
                className="h-full rounded-lg shadow-2xl shadow-slate-200"
                style={{ backgroundColor: token.colorBgContainer }}
            >
                <Provider>
                    <Row className="h-full">
                        <Col span={6}>
                            <Sidebar />
                        </Col>
                        <Col span={18}>
                            <Content />
                        </Col>
                    </Row>
                </Provider>
            </div>
        </ConfigProvider>
    )
}
