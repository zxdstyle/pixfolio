import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { createContext, useState } from 'react'
import type { OverviewProps } from './hooks/useOverview.ts'
import { useOverview } from './hooks/useOverview.ts'

export interface IStorageContext extends OverviewProps {
    currentPath: string
    setCurrentPath: Dispatch<SetStateAction<string>>
    currentStorageId: number
    setCurrentStorageId: (storage_id: number) => void
}

export const StorageContext = createContext<IStorageContext>({} as IStorageContext)

interface IStorageProviderProps {
    // root: string
}
export function Provider({ children }: PropsWithChildren<IStorageProviderProps>) {
    const [currentStorageId, setCurrentStorageId] = useState(0)
    const { openOverview, closeOverview, showOverview, description } = useOverview()

    const [currentPath, setCurrentPath] = useState('/')

    return (
        <StorageContext.Provider
            value={{
                openOverview,
                closeOverview,
                showOverview,
                description,
                currentPath,
                setCurrentPath,
                currentStorageId,
                setCurrentStorageId,
            }}
        >
            {children}
        </StorageContext.Provider>
    )
}
