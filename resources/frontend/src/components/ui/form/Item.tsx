import type { DeepKeys, DeepValue, FieldApi } from '@tanstack/solid-form'
import type { Accessor, JSX, ParentProps } from 'solid-js'
import { createContext, Show, splitProps, useContext } from 'solid-js'
import { useFormApi } from './context'

export interface ItemProps<
    VALUES extends object,
    TName extends DeepKeys<VALUES>,
    // TFieldValidator extends | Validator<DeepValue<VALUES, TName>, unknown> | undefined = undefined,
> {
    children: JSX.Element
    name: TName
    value?: DeepValue<VALUES, TName>
    label?: JSX.Element
}

export function FormItem<
    VALUES extends object,
    TName extends DeepKeys<VALUES> = DeepKeys<VALUES>,
>(props: ItemProps<VALUES, TName>) {
    const formApi = useFormApi()
    const [local, rest] = splitProps(props, ['children'])

    return (
        <Show when={formApi}>
            <div class="mb-4">
                <Show when={props.label}>
                    <label for={props.name} class="inline-block mb-1 text-sm text-secondary-foreground">{props.label}</label>
                </Show>
                <formApi.Field {...rest}>
                    {
                        field => <RenderItem<VALUES, TName> fieldApi={field}>{local.children}</RenderItem>
                    }
                </formApi.Field>
            </div>
        </Show>
    )
}

interface ItemContext {
    fieldApi: Accessor< FieldApi<any, any>>
}
const itemCtx = createContext<ItemContext>({} as ItemContext)

function RenderItem<
    VALUES extends object,
    TName extends DeepKeys<VALUES>,
>(props: ParentProps<{ fieldApi: Accessor<FieldApi<VALUES, TName>> }>) {
    return (
        <itemCtx.Provider
            value={{ fieldApi: props.fieldApi }}
        >
            {props.children}
        </itemCtx.Provider>
    )
}

export function useFormItem() {
    const { fieldApi } = useContext(itemCtx)

    const onChange = (value: any) => fieldApi().handleChange(value)

    return { onChange, value: () => fieldApi().state.value }
}
