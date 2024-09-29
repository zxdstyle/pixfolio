import type { Accessor, ParentProps } from 'solid-js'
import { useBeforeLeave } from '@solidjs/router'
import { createContext, createSignal } from 'solid-js'

export type RouterStateCtx = {
    leaving: Accessor<boolean>
}

export const RouterStateContext = createContext<RouterStateCtx>({
    leaving: () => false,
})

export function RouterStateProvider(props: ParentProps) {
    const [leaving, setLeaving] = createSignal(false)
    useBeforeLeave((e) => {
        e.preventDefault()
        setLeaving(true)
        setTimeout(() => {
            setLeaving(false)
            e.retry(true)
        }, 700)
    })

    return <RouterStateContext.Provider value={{ leaving }}>{props.children}</RouterStateContext.Provider>
}
