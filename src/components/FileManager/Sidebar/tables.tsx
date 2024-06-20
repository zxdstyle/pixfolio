import { A } from '@solidjs/router'
import { For, createSignal } from 'solid-js'
import clsx from 'clsx'
import Section from './section'
import Link from './link'
import { Button, FolderIcon, SeeMore, SubtleButton } from '@/ui'

export default function () {
    const [locations] = createSignal([
        { id: 1, name: 'icarus', online: false },
        { id: 2, name: 'rank', online: true },
    ])

    return (
        <Section
            name="Tables"
            actionArea={(
                <A href="settings/library/locations">
                    <SubtleButton />
                </A>
            )}
        >
            <SeeMore>
                <For each={locations()}>
                    {location => (
                        <Link to={`location/${location.id}`} class={clsx('border radix-state-open:border-accent', 'border-transparent')}>
                            <div class="relative mr-1 shrink-0 grow-0">
                                <FolderIcon size={18} />
                                <div class={clsx('absolute bottom-0.5 right-0 h-1.5 w-1.5 rounded-full', location.online ? 'bg-green-500' : 'bg-red-500')} />
                            </div>

                            <span class="truncate">{location.name}</span>
                        </Link>
                    )}
                </For>
            </SeeMore>
            <AddTableButton />
        </Section>
    )
}

function AddTableButton() {
    return (
        <Button variant="dotted" class={clsx('w-full mt-1')}>
            Add Location
        </Button>
    )
}
