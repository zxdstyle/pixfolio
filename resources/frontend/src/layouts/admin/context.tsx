import type { Accessor, ParentProps } from 'solid-js'
import { useCustom } from '@solidjs-components/refine'
import { createContext, useContext } from 'solid-js'

export interface AdminUserContext {
    user: Accessor<Service.User | undefined>
}

export const userContext = createContext<AdminUserContext>({} as AdminUserContext)

export function UserProvider(props: ParentProps) {
    const query = useCustom<Service.User>({
        url: `/api/v1/userinfo`,
        method: 'get',
    })

    return (
        <userContext.Provider value={{ user: () => query.data?.data }}>
            {props.children}
        </userContext.Provider>
    )
}

export function useUser() {
    const { user } = useContext(userContext)
    return user
}
