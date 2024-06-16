import type { ThemeConfig } from 'antd'

const light: ThemeConfig = {
    token: {
        colorPrimary: '#7366ff',
        fontSize: 16,
        colorTextBase: '#212529',
    },
    components: {
        Button: {
            fontWeight: 500,
        },
    },
}

export default light
