import type { JSX, ParentProps } from 'solid-js'
import { FormProvider } from '@/components/ui/form/context'
import { createForm } from '@tanstack/solid-form'

export interface FormProps<VALUES extends object> extends ParentProps {
    defaultValue?: VALUES
    onSubmit?: (values: VALUES) => void
    class?: string
}
export function Form<VALUES extends object>(props: FormProps<VALUES>) {
    const form = createForm<VALUES>(() => ({
        defaultValues: props.defaultValue,
        onSubmit: (val) => {
            const values = {}
            Object.keys(val.formApi.fieldInfo).forEach((key) => {
                values[key] = val.value[key]
            })
            props.onSubmit && props.onSubmit(values as VALUES)
        },
    }))

    const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = (e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit?.()
    }

    return (
        <form onSubmit={handleSubmit} class={props.class}>
            <FormProvider formApi={form}>
                {props.children}
            </FormProvider>
        </form>
    )
}
