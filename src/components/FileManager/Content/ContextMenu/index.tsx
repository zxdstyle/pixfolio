import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import type { PropsWithChildren } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StorageContext } from '../../context.tsx'

interface Props {
    item: IFile
}

export default function ContextMenu({ children, item }: PropsWithChildren<Props>) {
    const items: MenuProps['items'] = [
        { key: 'open', label: '打开', icon: <IconTablerEye /> },
        { key: 'overview', label: '详情', icon: <IconTablerEye /> },
        { key: 'rename', label: '重命名', icon: <IconTablerEye /> },
        { key: 'delete', label: '删除', icon: <IconTablerEye />, danger: true },
    ]

    const navigate = useNavigate()
    const handleOpen = () => {
        if (item.is_folder)
            navigate(`/storage?parent_dir=${item.path}`)
    }

    const { openOverview } = useContext(StorageContext)
    const onClick: MenuProps['onClick'] = (info) => {
        switch (info.key) {
            case 'open':
                return handleOpen()
            case 'overview':
                return openOverview(item.path)
        }
    }

    return <Dropdown trigger={['contextMenu']} menu={{ items, onClick, style: { width: 140 } }}>{children}</Dropdown>
}
