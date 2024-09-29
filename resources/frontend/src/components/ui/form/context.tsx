import type { FormApi, SolidFormApi } from '@tanstack/solid-form'
import type { ParentProps } from 'solid-js'
import { createContext, useContext } from 'solid-js'

interface FormContext {
    api: FormApi<any> & SolidFormApi<any>
}

const formCtx = createContext<FormContext>({} as FormContext)

export function FormProvider(props: ParentProps<{ formApi: FormApi<any> & SolidFormApi<any> }>) {
    return (
        <formCtx.Provider value={{ api: props.formApi }}>
            {props.children}
        </formCtx.Provider>
    )
}

export function useFormApi() {
    const { api } = useContext(formCtx)
    return api
}
