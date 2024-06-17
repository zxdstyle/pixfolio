import { Button, Card, Space, Typography } from 'antd'
import { useList } from '@refinedev/core'
import { StorageModalForm } from './form'

export function Component() {
    const { data } = useList<IStorage>({
        resource: 'storages',
        sorters: [{ field: 'id', order: 'desc' }],
    })

    return (
        <div>
            <div className="grid grid-cols-6 gap-4">
                <StorageModalForm>
                    <Button
                        className="h-32 rounded-2xl flex flex-col items-center justify-center"
                        icon={<IconPhPlus className="text-3xl" />}
                        block
                    >
                        添加驱动器
                    </Button>
                </StorageModalForm>

                {data && data.data.map(item => (
                    <Card
                        className="h-32 rounded-2xl overflow-hidden"
                        bordered={false}
                        styles={{
                            body: { padding: 10 },
                        }}
                    >
                        <Space align="end">
                            <IconBiDeviceHdd className="text-3xl" />
                            <Typography.Title className="!mb-1" level={4}>{item.name}</Typography.Title>
                        </Space>
                    </Card>
                ))}
            </div>
        </div>
    )
}
