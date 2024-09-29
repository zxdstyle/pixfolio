import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuItemLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui'
import { useUser } from '@/layouts/admin'
import { useNavigate } from '@solidjs/router'
import { Show } from 'solid-js'

export function Profile() {
    const user = useUser()

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('authorization')
        navigate('/')
    }

    return (
        <Show when={user()}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div class="rounded-lg size-8 text-center text-gray-500 leading-8">
                        <IconTablerUserSquareRounded class="size-9" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <DropdownMenuItemLabel class="flex items-center gap-4">
                            <div class="rounded-lg size-8 text-center text-gray-500 leading-8">
                                <IconTablerUserSquareRounded class="size-9" />
                            </div>
                            <div>
                                <h1>My Account</h1>
                                <span class="text-gray-400">{user()?.username}</span>
                            </div>
                        </DropdownMenuItemLabel>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} class="text-black/70">
                        <IconTablerLockOpen />
                        修改密码
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} class="text-black/70">
                        <IconTablerLogout2 />
                        退出
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Show>
    )
}
