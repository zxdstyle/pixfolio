import { Button, Card, Dropdown, Flex, Modal, Typography } from 'antd'
import type { BaseKey } from '@refinedev/core'
import { useDelete, useList } from '@refinedev/core'
import { useTranslation } from 'react-i18next'
import { useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { MenuInfo } from 'rc-menu/es/interface'
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
    const navigate = useNavigate()
    const handleAction = useCallback((info: MenuInfo, id: BaseKey) => {
        info.domEvent.preventDefault()

        switch (info.key) {
            case 'edit':
                return ref.current?.show(id)
            case 'show':
                return navigate(`/storages/${id}`)
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
    }, [modal, mutate])

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
                    <Link to={`/storages/${item.id}`} key={item.id}>
                        <Card
                            className="h-32 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 animate-left-in"
                            bordered={false}
                            styles={{
                                body: { padding: 10 },
                            }}
                        >
                            <Flex align="end" justify="space-between">
                                <Typography.Title className="!mb-1" level={5}>{item.name}</Typography.Title>
                                <Dropdown
                                    trigger={['click']}
                                    menu={{
                                        onClick: info => handleAction(info, item.id),
                                        items: [
                                            { key: 'edit', label: t('common.update'), icon: <IconPhNotePencilBold className="text-lg" /> },
                                            { key: 'show', label: t('actions.show'), icon: <IconPhEyeBold className="text-lg" /> },
                                            { type: 'divider' },
                                            { key: 'delete', label: t('common.delete'), icon: <IconPhTrashBold className="text-lg" />, danger: true },
                                        ],
                                    }}
                                >
                                    <Button type="text" icon={<IconPhDotsThreeBold className="text-2xl" />} onClick={e => e.preventDefault()}></Button>
                                </Dropdown>
                            </Flex>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
