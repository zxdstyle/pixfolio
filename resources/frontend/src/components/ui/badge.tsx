import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/cn'
import { cva } from 'class-variance-authority'
import { type ComponentProps, splitProps } from 'solid-js'

export const badgeVariants = cva(
    'inline-flex items-center border font-semibold transition-shadow focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
                secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive: 'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
                outline: 'text-foreground',
                success: 'text-green-400 bg-green-100 border-green-400',
            },
            size: {
                sm: 'px-2 py-0 text-xs rounded-sm',
                md: 'px-2.5 py-0.5 text-xs rounded-md',
                lg: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    },
)

export function Badge(props: ComponentProps<'div'> & VariantProps<typeof badgeVariants>) {
    const [local, rest] = splitProps(props, ['class', 'variant', 'size'])

    return (
        <div
            class={cn(
                badgeVariants({
                    variant: local.variant,
                    size: local.size,
                }),
                local.class,
            )}
            {...rest}
        />
    )
}
