import { Button, Card, Dropdown, Flex, Modal, Typography } from 'antd'
import type { RefObject } from 'react'
import { memo, useRef } from 'react'
import { useDelete, useList } from '@refinedev/core'
import { useTranslation } from 'react-i18next'
import type { StorageFormInstance } from './form'
import StorageModalForm from './form'

const MemoriedAlbumLists = memo<{
    data: IAlbum[]
    instance: RefObject<StorageFormInstance>
}>(
    ({ data, instance }) => {
        const { mutate } = useDelete()
        const { t } = useTranslation()
        const [modal, contextHolder] = Modal.useModal()
        const handleAction = (key: string, id: number) => {
            switch (key) {
                case 'edit':
                    return instance.current?.show(id)
                case 'delete':
                    modal.confirm({
                        title: 'Are you sure?',
                        content: `Are you sure?`,
                        onOk: () => mutate({
                            resource: 'albums',
                            id,
                        }),
                    })
            }
        }

        return (
            <>
                {contextHolder}
                {data.map((item, i) => (
                    <a href={`/albums/${item.id}`} key={item.id}>
                        <Card
                            className="h-32 rounded-2xl overflow-hidden animate-left-in"
                            bordered={false}
                            styles={{
                                body: { padding: 10 },
                            }}
                            style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'backwards' }}
                        >
                            <Flex align="end" justify="space-between">
                                <Typography.Title className="!mb-1" level={5}>{item.title}</Typography.Title>
                                <Dropdown
                                    trigger={['click']}
                                    menu={{
                                        onClick: info => handleAction(info.key, item.id),
                                        items: [
                                            { key: 'edit', label: t('common.update'), icon: <IconPhNotePencil className="text-3xl" /> },
                                            { key: 'delete', label: t('common.delete'), icon: <IconPhTrash className="text-3xl" />, danger: true },
                                        ],
                                    }}
                                >
                                    <Button onClick={e => e.preventDefault()} type="text" icon={<IconPhDotsThreeBold className="text-2xl" />}></Button>
                                </Dropdown>
                            </Flex>
                        </Card>
                    </a>
                ))}
            </>
        )
    },
)

export function Component() {
    const { data } = useList<IAlbum>({
        resource: 'albums',
        sorters: [{ field: 'id', order: 'desc' }],
    })

    const ref = useRef<StorageFormInstance>(null)

    return (
        <div className="grid grid-cols-6 gap-4">
            <StorageModalForm ref={ref}>
                <Button
                    className="h-32 rounded-2xl flex flex-col items-center justify-center border-none hover:border-none transition-all duration-500 hover:-translate-y-1 animate-left-in"
                    icon={<IconPhPlus className="text-3xl" />}
                    block
                    size="large"
                >
                    添加相册
                </Button>
            </StorageModalForm>

            {data && <MemoriedAlbumLists data={data.data} instance={ref} />}
        </div>
    )
}
