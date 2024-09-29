import type { PolymorphicProps } from '@kobalte/core/polymorphic'
import type { TextFieldTextAreaProps } from '@kobalte/core/text-field'
import type { ValidComponent, VoidProps } from 'solid-js'
import { useFormItem } from '@/components/ui/form'
import { cn } from '@/libs/cn'

import { TextField, TextArea as TextFieldPrimitive } from '@kobalte/core/text-field'
import { splitProps } from 'solid-js'

type textAreaProps<T extends ValidComponent = 'textarea'> = VoidProps<TextFieldTextAreaProps<T> & { class?: string }>

export function TextArea<T extends ValidComponent = 'textarea'>(props: PolymorphicProps<T, textAreaProps<T>>) {
    const [local, rest] = splitProps(props as textAreaProps, ['class'])

    const { onChange, value } = useFormItem()
    const handleChange = (value: any) => {
        onChange(value)
        props.onChange && props.onChange(value)
    }

    return (
        <TextField value={value()} onChange={handleChange}>
            <TextFieldPrimitive
                class={cn(
                    'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-shadow placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                    local.class,
                )}
                {...rest}
            />
        </TextField>
    )
}
