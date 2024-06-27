import { Button, Flex, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useList, useShow } from '@refinedev/core'
import { Upload } from '@/components/upload'

export function Component() {
    const { t } = useTranslation()
    // const images = [
    //     'https://images.pexels.com/photos/19050732/pexels-photo-19050732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //     'https://images.pexels.com/photos/24709246/pexels-photo-24709246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //     'https://images.pexels.com/photos/26615126/pexels-photo-26615126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //     'https://images.pexels.com/photos/18364637/pexels-photo-18364637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //     'https://images.pexels.com/photos/19160661/pexels-photo-19160661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //     'https://images.pexels.com/photos/25745487/pexels-photo-25745487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //     'https://images.pexels.com/photos/26691578/pexels-photo-26691578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //     'https://images.pexels.com/photos/23848651/pexels-photo-23848651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    // ]

    const { queryResult } = useShow<IAlbum>({
        resource: 'albums',
    })
    const { data } = queryResult
    const album = data?.data

    const { data: images } = useList<IImage>({
        resource: 'images',
    })

    return (
        <div className="container">
            {album && (
                <Flex gap={20} vertical>
                    <Flex gap={32} justify="space-between">
                        <Flex vertical>
                            <Flex align="end" gap={6}>
                                <Typography.Title level={2} className="m-0 text-white">{album.title}</Typography.Title>
                                <Typography.Text className="m-0 text-white/80">{album.sub_title}</Typography.Text>
                            </Flex>
                            <Typography.Paragraph className="text-white/40 m-0" ellipsis={{ rows: 2 }}>{album.description}</Typography.Paragraph>
                        </Flex>
                        <Space>
                            <Upload>
                                <Button className="relative" icon={<IconPhUploadSimpleBold />} ghost>
                                    {t('common.upload')}
                                </Button>
                            </Upload>
                        </Space>
                    </Flex>

                    <div className="grid grid-cols-5 gap-4">
                        {images && images.data.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl overflow-hidden transition-all duration-500 animate-left-in group h-72 relative"
                            >
                                <img
                                    className="w-full h-full absolute z-0 object-cover scale-125 transition-all group-hover:scale-100"
                                    src={item.path}
                                    alt=""
                                />

                                <div className="relative w-full h-full">
                                    <Flex justify="space-between" className="bg-gradient-to-b from-black/50 to-black/0">
                                        <Flex className="p-2" vertical>
                                            <Typography.Text className="text-white font-bold">Portfolio Title</Typography.Text>
                                            <Typography.Text className="text-white">7张作品</Typography.Text>
                                        </Flex>
                                        <Button type="text" icon={<IconPhDotsThreeOutlineFill className="text-white" />} />
                                    </Flex>
                                </div>
                            </div>
                        ))}
                    </div>
                </Flex>
            )}
        </div>
    )
}
