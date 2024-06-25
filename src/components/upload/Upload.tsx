import { Upload } from 'antd'
import type { PropsWithChildren } from 'react'
import { useCallback, useState } from 'react'
import type { UploadChangeParam } from 'antd/es/upload/interface'

export default function ({ children }: PropsWithChildren) {
    const [percent, setPercent] = useState(0)

    const handleChange = useCallback((info: UploadChangeParam) => {
        info.event?.percent && setPercent(info.event.percent)
    }, [setPercent])

    return (
        <Upload action="/api/v1/images" showUploadList={false} onChange={handleChange}>
            {children}
        </Upload>
    )
}
