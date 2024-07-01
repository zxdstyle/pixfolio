import { Button, Flex, theme } from 'antd'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StorageContext } from '@/components/FileManager/context.tsx'

interface Props {
    className?: string
}

export default function Navbar({ className }: Props) {
    const navigate = useNavigate()
    const { token } = theme.useToken()
    const { setCurrentPath } = useContext(StorageContext)

    return (
        <nav className={clsx('h-12 pb-1 pl-3 pr-5 w-full flex items-center justify-between', className)} style={{ borderBottom: `1px solid ${token.colorSplit}` }}>
            <Flex align="center" gap={6}>
                <Button.Group>
                    <Button type="text" icon={<IconPhHouseLineBold />} onClick={() => setCurrentPath('/')} />
                    <Button onClick={() => navigate(-1)} type="text" icon={<IconTablerArrowNarrowLeft className="text-xl" />} />
                    <Button onClick={() => navigate(+1)} type="text" icon={<IconTablerArrowNarrowLeft className="rotate-180 text-xl" />} />
                </Button.Group>

                {/* <div> */}
                {/*    <QuickJumper /> */}
                {/* </div> */}
            </Flex>
        </nav>
    )
}
