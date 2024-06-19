import { Button, Card, Dropdown, Flex, Modal, Typography } from 'antd'
import { useDelete, useList } from '@refinedev/core'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import type { StorageFormInstance } from './form'
import StorageModalForm from './form'

export function Component() {
    const { data } = useList<IStorage>({
        resource: 'storages',
        sorters: [{ field: 'id', order: 'desc' }],
    })

    const { t } = useTranslation()
    const [modal, contextHolder] = Modal.useModal()
    const ref = useRef<StorageFormInstance>(null)

    const { mutate } = useDelete()
    const handleAction = (key: string, id: number) => {
        switch (key) {
            case 'edit':
                return ref.current?.show(id)
            case 'delete':
                modal.confirm({
                    title: 'Are you sure?',
                    content: `Are you sure?`,
                    onOk: () => mutate({
                        resource: 'storages',
                        id,
                    }),
                })
        }
    }

    return (
        <div>
            {contextHolder}
            <div className="grid grid-cols-6 gap-4">
                <StorageModalForm ref={ref}>
                    <Button
                        className="h-32 rounded-2xl flex flex-col items-center justify-center border-none hover:border-none transition-all duration-500 hover:-translate-y-1"
                        icon={<IconPhPlus className="text-3xl" />}
                        block
                    >
                        添加驱动器
                    </Button>
                </StorageModalForm>

                {data && data.data.map(item => (
                    <Card
                        key={item.id}
                        className="h-32 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
                        bordered={false}
                        styles={{
                            body: { padding: 10 },
                        }}
                    >
                        <Flex align="end" justify="space-between">
                            <Typography.Title className="!mb-1" level={5}>{item.name}</Typography.Title>
                            <Dropdown
                                menu={{
                                    onClick: info => handleAction(info.key, item.id),
                                    items: [
                                        { key: 'edit', label: t('common.update'), icon: <IconPhNotePencil className="text-3xl" /> },
                                        { key: 'delete', label: t('common.delete'), icon: <IconPhTrash className="text-3xl" />, danger: true },
                                    ],
                                }}
                            >
                                <Button type="text" icon={<IconPhDotsThreeBold className="text-2xl" />}></Button>
                            </Dropdown>
                        </Flex>
                    </Card>
                ))}
            </div>
        </div>
    )
}
