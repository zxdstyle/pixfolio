import { Button, Flex, Space } from 'antd'
import Stage from './Stage'

export interface HestiaProps {
    src: string
    height?: number
}

export default function Hestia({ src, height = 800 }: HestiaProps) {
    return (
        <Flex className="w-full relative" style={{ height }} vertical>
            <Flex className="px-4 py-2 absolute  w-full" justify="end">
                <Space>
                    <Button type="primary" shape="round">保存</Button>
                </Space>
            </Flex>

            <Stage src={src} />
        </Flex>
    )
}
