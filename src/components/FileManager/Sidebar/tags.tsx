import { A } from '@solidjs/router'
import { For, createSignal } from 'solid-js'
import clsx from 'clsx'
import Section from './section'
import Link from './link'
import { SeeMore, SubtleButton } from '@/ui'

export default function () {
    const [locations] = createSignal([
        { id: 1, name: 'KeepSafe', color: '#D9188E' },
        { id: 2, name: 'Hidden', color: '#646278' },
        { id: 3, name: 'Projects', color: '#42D097' },
        { id: 4, name: 'Memes', color: '#A718D9' },
    ])

    return (
        <Section
            name="Tags"
            actionArea={(
                <A href="settings/library/locations">
                    <SubtleButton />
                </A>
            )}
        >
            <SeeMore>
                <For each={locations()}>
                    {tag => (
                        <Link to={`location/${tag.id}`} class={clsx('border radix-state-open:border-accent', 'border-transparent')}>
                            <div class="h-[12px] w-[12px] shrink-0 rounded-full" style={{ 'background-color': tag.color || '#efefef' }} />
                            <span class="ml-1.5 truncate text-sm">{tag.name}</span>
                        </Link>
                    )}
                </For>
            </SeeMore>
        </Section>
    )
}
