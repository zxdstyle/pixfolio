import { createContext } from 'react'

export const HestiaCtx = createContext({})

export function HestiaProvider() {
    return (
        <HestiaCtx.Provider value={{}}>

        </HestiaCtx.Provider>
    )
}
