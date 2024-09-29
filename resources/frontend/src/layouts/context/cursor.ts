import type { Accessor, Ref } from 'solid-js'
import { createContext } from 'solid-js'

export type CursorCtx = {
    cursorState: Accessor<CursorState>
    setActive: Func
    setInactive: Func
    ref: Ref<HTMLDivElement>
}

export type CursorState = 'active' | 'inactive' | 'draggable'

const context = createContext<Partial<CursorCtx>>({})

export const CursorContext = context
export const CursorProvider = context.Provider
