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
        Card: {
            boxShadowTertiary: '0 0 20px rgba(115, 102, 255, 0.1)',
        },
    },
}

export default light
