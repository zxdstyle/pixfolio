import { A } from '@solidjs/router'
import { Profile } from './Profile'

export function Header() {
    return (
        <header class="flex items-center gap-4 px-8 justify-between" style={{ flex: '0 0 64px' }}>
            <div class="divide-x">
                <A href="/" class="text-2xl font-bold uppercase">Pixfolio</A>
            </div>

            <div class="flex">
                <Profile />
            </div>
        </header>
    )
}
