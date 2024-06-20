import clsx from 'clsx'
import { useContext } from 'react'
import type { MenuProps, ThemeConfig } from 'antd'
import { Button, ConfigProvider, Flex, Menu, Typography, theme } from 'antd'
import { useList } from '@refinedev/core'
import CreateStorage from '../Storage/create'
import { StorageContext } from '../context'
// import StorageImg from '@/assets/icons/storage.png'
// import HDD from '@/assets/icons/hdd.png'

const menuStyle: ThemeConfig = {
    components: {
        Menu: {
            // itemHeight: 25,
            // padding: 0,
            // paddingXS: 0,
            // fontSize: 12,
            // borderRadius: 0,
            activeBarBorderWidth: 0,
        },
    },
}

interface Props {
    className?: string
}

export default function ({ className }: Props) {
    const { data } = useList<IStorage>({
        resource: 'storages',
    })

    const items: MenuProps['items'] = [
        {
            type: 'group',
            label: '存储',
            children: data?.data.map((datum) => {
                return {
                    label: (
                        <Flex gap={4}>
                            {/* <Image src={HDD} width={20} height={20} preview={false} /> */}
                            <span>{datum.name}</span>
                        </Flex>
                    ),
                    key: datum.id,
                }
            }),
        },
    ]

    const { setCurrentStorageId, setCurrentPath } = useContext(StorageContext)
    const handleSelect: MenuProps['onSelect'] = (info) => {
        setCurrentStorageId(Number(info.key))
        setCurrentPath('/')
    }

    const { token } = theme.useToken()
    return (
        <Flex
            style={{ borderRight: `1px solid ${token.colorSplit}` }}
            className={clsx(className, 'relative w-44 flex-shrink-0 gap-2.5 pr-3')}
            vertical
        >
            <Typography.Title level={5}>文件管理器</Typography.Title>
            <Flex vertical className="no-scrollbar space-y-5 overflow-x-hidden overflow-y-scroll">
                <ConfigProvider theme={menuStyle}>
                    <Menu items={items} selectable onSelect={handleSelect} />
                </ConfigProvider>

                <CreateStorage>
                    <Button block ghost className="text-xs border-dashed" size="small">添加存储</Button>
                </CreateStorage>
            </Flex>
        </Flex>
    )
}
