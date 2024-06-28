import { Button, Dropdown, Flex, Modal, Typography } from 'antd'
import type { RefObject } from 'react'
import { memo, useRef } from 'react'
import { useDelete, useList } from '@refinedev/core'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
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
                {data.map(item => (
                    <Link to={`/albums/${item.id}`} key={item.id}>
                        <div className="rounded-2xl overflow-hidden transition-all duration-500 animate-left-in group h-72 relative bg-white">
                            {item.cover && (
                                <img
                                    className="w-full h-full absolute z-0 object-cover scale-125 transition-all group-hover:scale-100"
                                    src={item.cover}
                                    alt=""
                                />
                            )}

                            <Flex vertical className="relative w-full h-full">
                                <Flex justify="space-between" className="bg-gradient-to-b from-black/50 to-black/0">
                                    <Flex className="p-2" vertical>
                                        <Typography.Text className="text-white font-bold">Portfolio Title</Typography.Text>
                                        <Typography.Text className="text-white">7张作品</Typography.Text>
                                    </Flex>
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
                                        <Button
                                            type="text"
                                            onClick={e => e.preventDefault()}
                                            icon={<IconPhDotsThreeOutlineFill className="text-white" />}
                                        />
                                    </Dropdown>
                                </Flex>

                                <Flex align="center" className="w-full h-full" justify="center">
                                    <Button className="mx-4" onClick={e => e.preventDefault()}>设置封面</Button>
                                </Flex>
                            </Flex>

                            {/* <Flex> */}
                            {/*    <Tag bordered={false}>Webp</Tag> */}
                            {/*    <Tag bordered={false}>10MB</Tag> */}
                            {/* </Flex> */}
                        </div>
                    </Link>
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
                    className="h-72 rounded-2xl flex flex-col items-center justify-center border-none hover:border-none transition-all duration-500 hover:-translate-y-1 animate-left-in"
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
