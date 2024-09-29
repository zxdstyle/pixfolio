import type { FormProps } from './Form'
import { Form as InternalForm } from './Form'
import { FormItem, useFormItem } from './Item'

type InternalFormType = typeof InternalForm

type CompoundedComponent = InternalFormType & {
    // useForm: typeof useForm
    // useFormInstance: typeof useFormInstance
    // useWatch: typeof useWatch
    Item: typeof FormItem
    // List: typeof List
    // ErrorList: typeof ErrorList
    // Provider: typeof FormProvider
}

export { FormProps }

const Form = InternalForm as CompoundedComponent

Form.Item = FormItem

export { Form, useFormItem }
