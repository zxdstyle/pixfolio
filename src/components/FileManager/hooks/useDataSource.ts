import { useInfiniteList } from '@refinedev/core'
import { useContext, useMemo } from 'react'
import { flat } from 'radash'
import { StorageContext } from '../context.tsx'

export default function useDataSource() {
    const { currentPath, currentStorageId } = useContext(StorageContext)
    const { data, isFetching } = useInfiniteList<FileDescription>({
        resource: 'fs',
        filters: [
            { field: 'path', operator: 'eq', value: currentPath },
            { field: 'storage_id', operator: 'eq', value: currentStorageId },
        ],
        queryOptions: {
            enabled: !!currentPath && !!currentStorageId,
        },
    })

    const allPages = useMemo(() => {
        if (!data)
            return []
        return flat(data.pages.map(page => page.data))
    }, [data])

    return { data: allPages, isFetching }
}
