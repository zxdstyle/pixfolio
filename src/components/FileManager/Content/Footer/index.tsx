import type { BreadcrumbProps } from 'antd'
import { Breadcrumb, Flex, theme } from 'antd'
import { useContext, useMemo } from 'react'
import { StorageContext } from '@/components/FileManager/context.tsx'
// import Folder from '@/assets/icons/folder.png'

export default function Footer() {
    const { currentPath, setCurrentPath } = useContext(StorageContext)
    const items = useMemo<BreadcrumbProps['items']>(() => {
        return currentPath.split('/').filter(item => !!item).map((item) => {
            return {
                key: item,
                title: (
                    <Flex align="center" gap={1} className="cursor-pointer">
                        {/* <img src={Folder} alt={item} className="w-4" /> */}
                        {item}
                    </Flex>
                ),
                onClick: () => setCurrentPath(item),
            }
        })
    }, [currentPath])

    const { token } = theme.useToken()

    return (
        <footer className="h-6 w-full flex items-center justify-between px-5" style={{ borderTop: `1px solid ${token.colorSplit}` }}>
            {currentPath}
            <Breadcrumb items={items} />
        </footer>
    )
}
