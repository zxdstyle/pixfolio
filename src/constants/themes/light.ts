import type { ThemeConfig } from 'antd'

const light: ThemeConfig = {
    token: {
        colorPrimary: '#7366ff',
        fontSize: 15,
        colorTextBase: '#212529',
    },
    components: {
        Button: {
            fontWeight: 500,
        },
        Card: {
            boxShadowTertiary: '0 0 20px rgba(115, 102, 255, 0.1)',
        },
        Breadcrumb: {
            itemColor: '#fff',
            linkColor: '#fff',
            separatorColor: '#fff',
            linkHoverColor: '#fff',
            lastItemColor: 'rgba(255,255,255,0.7)',
        },
        Modal: {
            borderRadiusLG: 16,
        },
    },
}

export default light
