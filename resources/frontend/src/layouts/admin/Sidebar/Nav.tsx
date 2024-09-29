import { buttonVariants, TooltipContent, TooltipRoot, TooltipTrigger } from '@/components/ui'
import { cn } from '@/libs/cn'
import { A } from '@solidjs/router'
import { For, type JSX, Show } from 'solid-js'

type Props = {
    isCollapsed: boolean
    links: {
        href: string
        title: string
        label?: string
        icon: JSX.Element
        variant: 'default' | 'ghost'
    }[]
}

export function Nav(props: Props) {
    return (
        <div
            data-collapsed={props.isCollapsed}
            class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                <For each={props.links}>
                    {item => (
                        <Show
                            when={props.isCollapsed}
                            fallback={(
                                <A
                                    href={item.href}
                                    activeClass="bg-primary text-primary-foreground shadow hover:bg-primary/90"
                                    class={cn(
                                        'inline-flex items-center justify-center flex-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow]',
                                        'focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                                        'h-10 rounded-md px-8 text-sm',
                                        'justify-start',
                                    )}
                                    end
                                >
                                    <div class="mr-2">{item.icon}</div>
                                    {item.title}
                                    {item.label && (
                                        <span
                                            class={cn(
                                                'ml-auto',
                                                item.variant === 'default'
                                                && 'text-background dark:text-white',
                                            )}
                                        >
                                            {item.label}
                                        </span>
                                    )}
                                </A>
                            )}
                        >
                            <TooltipRoot openDelay={0} closeDelay={0} placement="right">
                                <TooltipTrigger
                                    as="a"
                                    href="#"
                                    class={cn(
                                        buttonVariants({ variant: item.variant, size: 'icon' }),
                                        'h-9 w-9',
                                        item.variant === 'default'
                                        && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                                    )}
                                >
                                    {item.icon}
                                    <span class="sr-only">{item.title}</span>
                                </TooltipTrigger>
                                <TooltipContent class="flex items-center gap-4">
                                    {item.title}
                                    <Show when={item.label}>
                                        <span class="ml-auto text-muted-foreground">
                                            {item.label}
                                        </span>
                                    </Show>
                                </TooltipContent>
                            </TooltipRoot>
                        </Show>
                    )}
                </For>
            </nav>
        </div>
    )
}
