import type { ParentProps } from 'solid-js'
import { Sidebar } from '@/layouts/admin/Sidebar'
import { UserProvider } from './context'
import { Header } from './Header'

export * from './context'

export default function AdminLayout(props: ParentProps) {
    return (
        <UserProvider>
            <div class="bg-background w-full h-screen flex flex-col">
                <Header />

                <div class="flex flex-grow overflow-hidden">
                    <Sidebar />

                    <div class="container overflow-scroll">
                        {props.children}
                    </div>
                </div>
            </div>
        </UserProvider>
    )
}
