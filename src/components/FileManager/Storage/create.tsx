import { Checkbox, ConfigProvider, Flex, Form, Input, Modal, Select, type ThemeConfig, Typography } from 'antd'
import { useModalForm } from '@refinedev/antd'
import type { PropsWithChildren } from 'react'
// import HDD from '@/assets/icons/hdd.png'

const modalStyle: ThemeConfig = {
    components: {
        Modal: {
            paddingMD: 12,
            paddingContentHorizontalLG: 10,
        },
    },
}

export default function Create({ children }: PropsWithChildren) {
    const { show, modalProps, formProps } = useModalForm({
        resource: 'storages',
        action: 'create',
    })

    return (
        <>
            <ConfigProvider theme={modalStyle}>
                <span onClick={() => show()}>
                    {children}
                </span>

                <Modal {...modalProps} closeIcon={null} title={null} width={400}>
                    <Flex vertical className=" w-full">
                        <Flex align="center" gap={4}>
                            {/* <Image src={HDD} width={30} height={30} preview={false} /> */}
                            <Typography.Title level={5} className="!text-white">新存储</Typography.Title>
                        </Flex>

                        <Form {...formProps} layout="vertical" className="mt-4">
                            <Form.Item label="存储驱动" name={['driver']} initialValue="local" rules={[{ required: true }]}>
                                <Select options={[{ label: '本地存储', value: 'local' }]} />
                            </Form.Item>
                            <p>需要指定本地目录的绝对URL</p>
                            <Form.Item dependencies={['driver']} noStyle>
                                {({ getFieldValue }) => (
                                    <Form.Item name={['option', getFieldValue('driver'), 'folder']}>
                                        <Input placeholder="挂载路径" />
                                    </Form.Item>
                                )}
                            </Form.Item>
                            <Form.Item label="存储名称" name={['name']}>
                                <Input placeholder="自定义存储名称" />
                            </Form.Item>
                            <Form.Item name={['thumbnail']} initialValue={1} valuePropName="checked">
                                <Checkbox value={1}>添加后生成缩略图</Checkbox>
                            </Form.Item>
                        </Form>
                    </Flex>
                </Modal>
            </ConfigProvider>
        </>
    )
}
