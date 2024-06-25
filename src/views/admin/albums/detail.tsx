import { Button, Card, Flex, Space, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Upload } from '@/components/upload'

export function Component() {
    const { t } = useTranslation()
    const data = Array.from({ length: 40 })
    return (
        <div className="container">

            <Flex gap={20} vertical>
                <Flex justify="space-between">
                    <Typography.Title></Typography.Title>
                    <Space>
                        <Upload>
                            <Button className="relative" icon={<IconPhUploadSimpleBold />} ghost>
                                {t('common.upload')}
                            </Button>
                        </Upload>
                    </Space>
                </Flex>

                <div className="grid grid-cols-5 gap-4">
                    {data && data.map((item, idx) => (
                        <Card
                            key={idx}
                            className="rounded-2xl overflow-hidden transition-all duration-500 animate-left-in group"
                            bordered={false}
                            styles={{
                                body: { padding: 10 },
                            }}
                        >
                            <div
                                className="rounded-xl overflow-hidden flex items-center justify-center w-full h-32 bg-cover bg-center"
                            >
                                <img
                                    className="scale-125 transition-all group-hover:scale-100"
                                    src="https://images.pexels.com/photos/26595636/pexels-photo-26595636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    alt=""
                                />
                            </div>
                            <Flex vertical>
                                <Typography.Title className="!mb-1" level={5}>Portfolio Title</Typography.Title>
                                <Typography.Paragraph className="!mb-1">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy. Title</Typography.Paragraph>
                            </Flex>
                            <Flex>
                                <Tag bordered={false}>Webp</Tag>
                                <Tag bordered={false}>10MB</Tag>
                            </Flex>
                        </Card>
                    ))}
                </div>
            </Flex>
        </div>
    )
}
