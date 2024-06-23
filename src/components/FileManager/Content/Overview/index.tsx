import type { CollapseProps, DescriptionsProps } from 'antd'
import { Collapse, Descriptions, Drawer } from 'antd'
import { useContext } from 'react'
import { StorageContext } from '../../context.tsx'
import { humanReadableFilesize } from '@/utils/human'

export default function Overview() {
    const { showOverview, closeOverview, description } = useContext(StorageContext)

    const general: DescriptionsProps['items'] = description
        ? [
            { key: 'filename', label: '文件名', children: description.filename },
            { key: 'size', label: '文件大小', children: (
                <span>
                    {description.size}
                    字节（
                    {humanReadableFilesize(description.size)}
                    ）
                </span>
            ) },
            { key: 'path', label: '位置', children: description.path },
            { key: 'updated_at', label: '修改时间', children: description.updated_at },
            { key: 'created_at', label: '创建时间', children: description.created_at },
        ]
        : []

    const more: DescriptionsProps['items'] = description && description.exif
        ? description.exif.map(item => ({
            key: item.key,
            label: item.label,
            children: item.enums ? item.enums[item.value] : item.value,
        }))
        : []

    const items: CollapseProps['items'] = [
        { key: 'general', label: '通用', children: <Descriptions items={general} column={1} /> },
    ]
    if (more.length > 0)
        items.push({ key: 'more', label: '更多信息', children: <Descriptions items={more} column={1} /> })

    return (
        <Drawer
            open={showOverview}
            closable={false}
            onClose={closeOverview}
            getContainer={false}
            width={400}
        >
            {description && (
                <div className="flex flex-col items-center">
                    {/* <FileThumbnail width={200} item={description} className="mb-12" /> */}

                    <Collapse defaultActiveKey="general" className="w-full" size="small" items={items} />
                </div>
            )}
        </Drawer>
    )
}
