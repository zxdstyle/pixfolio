import { useState } from 'react'
import { useOne } from '@refinedev/core'

export interface OverviewProps {
    openOverview: (filepath: string) => void
    closeOverview: () => void
    showOverview: boolean
    description?: FileDescription
}

export function useOverview(): OverviewProps {
    const [showOverview, setShowOverview] = useState(false)
    const [current, setCurrent] = useState('')

    const { data } = useOne<FileDescription>({
        resource: 'storage',
        id: encodeURIComponent(current),
        queryOptions: {
            enabled: !!current,
            queryKey: ['overview', current],
        },
    })

    const openOverview = (filepath: string) => {
        setCurrent(filepath)
        setShowOverview(true)
    }

    const closeOverview = () => {
        setShowOverview(false)
    }

    return { openOverview, closeOverview, showOverview, description: data?.data }
}
