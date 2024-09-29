import type { ComponentProps, JSX } from 'solid-js'
import { useFormItem } from '@/components/ui/form'
import { splitProps } from 'solid-js'

export interface SliderProps extends ComponentProps<'input'> {}

export function Slider(props: SliderProps) {
    const [local, rest] = splitProps(props, ['class'])

    const { onChange, value } = useFormItem()
    const handleChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (e) => {
        onChange(e.target.value)
    }

    return (
        <span class={local.class}>
            <input type="range" onInput={handleChange} value={value()} {...rest} />
            {value()}
        </span>
    )
}
