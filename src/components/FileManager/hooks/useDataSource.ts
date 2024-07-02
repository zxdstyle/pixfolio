import { useContext, useEffect, useState } from 'react'
import { useApiUrl } from '@refinedev/core'
import { alphabetical } from 'radash'
import { StorageContext } from '../context.tsx'

export default function useDataSource() {
    const { currentPath, currentStorageId } = useContext(StorageContext)

    const [data, setData] = useState<IFile[]>([])

    let sse: EventSource | null = null
    const apiUrl = useApiUrl()
    useEffect(() => {
        if (sse || !currentPath || !currentStorageId)
            return

        setData([])
        sse = new EventSource(`${apiUrl}/fs?path=${currentPath}&storage_id=${currentStorageId}`)
        sse.onmessage = (e) => {
            setData(pre => (alphabetical([...pre, JSON.parse(e.data)], f => f.name)))
        }
    }, [currentPath, currentStorageId])

    return { data, isFetching: false }
}
