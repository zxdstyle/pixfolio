import { Input } from 'antd'
import type { FocusEventHandler, KeyboardEventHandler } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function QuickJumper() {
    const [params] = useSearchParams()
    const [dir, setDir] = useState(params.get('parent_dir')?.toString())
    const [width, setWidth] = useState(300)

    const navigate = useNavigate()
    const handleEnter: KeyboardEventHandler = (e) => {
        if (e.key === 'Enter')
            navigate(`/storage?parent_dir=${dir}`)
    }

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
        setWidth(600)
        e.target.setSelectionRange(dir?.length ?? 0, dir?.length ?? 0)
    }

    useEffect(() => {
        setDir(params.get('parent_dir')?.toString())
    }, [params])

    const handleBlur = () => setWidth(300)

    return (
        <Input
            className="border-dashed border-gray-800 transition-all duration-500"
            size="large"
            value={dir}
            style={{ width }}
            styles={{ input: { textAlign: 'left' } }}
            onChange={e => setDir(e.target.value)}
            onPressEnter={handleEnter}
            onFocus={handleFocus}
            onBlur={handleBlur}
            prefix={<IconTablerFolder />}
            variant="borderless"
        />
    )
}
