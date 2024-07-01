import { useApiUrl } from '@refinedev/core'
import { useContext, useEffect } from 'react'
import { StorageContext } from '../context.tsx'

export default function useDataSource() {
    const { currentPath, currentStorageId } = useContext(StorageContext)

    let sse: EventSource | null = null
    const apiUrl = useApiUrl()
    useEffect(() => {
        if (sse || !currentPath || !currentStorageId)
            return

        sse = new EventSource(`${apiUrl}/fs?path=${currentPath}&storage_id=${currentStorageId}`)
        sse.onmessage = (e) => {
            console.log(e.data)
        }
    }, [currentPath, currentStorageId])

    return { data: [], isFetching: false }
}
