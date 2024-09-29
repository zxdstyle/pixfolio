import type { ComponentProps, JSX } from 'solid-js'
import { cn } from '@/libs/cn'
import { Show, splitProps } from 'solid-js'

export interface CardProps extends Omit<ComponentProps<'div'>, 'title'> {
    title?: JSX.Element
    description?: JSX.Element
    footer?: JSX.Element
    extra?: JSX.Element
}
export function Card(props: CardProps) {
    const [local, rest] = splitProps(props, ['class'])

    return (
        <div class={cn('rounded-lg border bg-card text-card-foreground shadow h-full')}>
            <Show when={props.title || props.description || props.extra}>
                <div class="flex flex-col space-y-1 p-4">
                    <Show when={props.title || props.description}>
                        <div class={cn('flex items-center justify-between')}>
                            <h1 class={cn('font-semibold leading-none tracking-tight')}>
                                {props.title}
                            </h1>

                            {props.extra}
                        </div>
                    </Show>

                    <p class={cn('text-sm text-muted-foreground line-clamp-3')}>
                        {props.description}
                    </p>
                </div>
            </Show>

            <Show when={rest.children}>
                <div class={cn('p-4 pt-0 rounded-lg overflow-hidden', local.class)}>
                    {rest.children}
                </div>
            </Show>

            <Show when={props.footer}>
                <div class={cn('flex items-center p-4 pt-0')}>
                    {props.footer}
                </div>
            </Show>
        </div>
    )
}
