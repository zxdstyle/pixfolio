import { Nav } from './Nav'

export function Sidebar() {
    return (
        <nav class="w-80 font-medium">
            <Nav
                isCollapsed={false}
                links={[
                    { href: '/admin', title: '控制台', icon: <IconFa6SolidDesktop />, variant: 'default' },
                    { href: '/admin/album', title: '作品集', icon: <IconFa6SolidImages />, variant: 'ghost' },
                ]}
            />
        </nav>
    )
}
