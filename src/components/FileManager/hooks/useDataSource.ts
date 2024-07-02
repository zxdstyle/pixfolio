import { useContext, useEffect, useState } from 'react'
import { useApiUrl } from '@refinedev/core'
import { StorageContext } from '../context.tsx'

export default function useDataSource() {
    const { currentPath, currentStorageId } = useContext(StorageContext)

    const [data, setData] = useState<IImage[]>([])

    let sse: EventSource | null = null
    const apiUrl = useApiUrl()
    useEffect(() => {
        if (sse || !currentPath || !currentStorageId)
            return

        sse = new EventSource(`${apiUrl}/fs?path=${currentPath}&storage_id=${currentStorageId}`)
        sse.onmessage = (e) => {
            setData(pre => ([...pre, JSON.parse(e.data)]))
        }
    }, [currentPath, currentStorageId])

    return { data, isFetching: false }
}
