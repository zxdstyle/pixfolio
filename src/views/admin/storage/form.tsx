import type { FormProps } from 'antd'
import { Checkbox, Col, Form, InputNumber, Modal, Row, Space } from 'antd'
import { useModalForm, useSelect } from '@refinedev/antd'
import type { ReactElement, Ref } from 'react'
import { cloneElement, forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { objectify } from 'radash'
import type { HttpError } from '@refinedev/core'
import { Input, Select } from '@/components/form'

interface StorageFormProps {
    id?: number
    children?: ReactElement
}

export interface StorageFormInstance {
    show: (id?: number) => void
    close: () => void
}

export default forwardRef(StorageModalForm)

function StorageModalForm({ children }: StorageFormProps, ref: Ref<StorageFormInstance>) {
    const [recordId, setRecordId] = useState<number>(0)
    const action = recordId && recordId > 0 ? 'edit' : 'create'
    const { modalProps, formProps, onFinish, show, close } = useModalForm<IStorage, HttpError, IStorage>({
        resource: 'storages',
        action,
        id: recordId,
        onMutationSuccess: () => {
            close()
        },
    })

    const { t } = useTranslation()
    const handleFinish = (values: any) => {
        onFinish({ ...values, addition: JSON.stringify(values.addition) })
    }

    function openModal(id?: number) {
        show(id || 0)
        setRecordId(id || 0)
    }

    useImperativeHandle(ref, () => ({
        show: openModal,
        close,
    }))

    return (
        <>
            {children && cloneElement(children, { onClick: openModal })}
            <Modal
                {...modalProps}
                title={(
                    <Space>
                        <IconIconParkOutlineCloudStorage />
                        {recordId && recordId > 0 ? `${t('common.update')}${t('storage.name')}` : `${t('common.create')}${t('storage.name')}`}
                    </Space>
                )}
            >
                <StorageForm
                    {...formProps}
                    initialValues={action === 'edit' ? formProps.initialValues : {}}
                    onFinish={handleFinish}
                />
            </Modal>
        </>
    )
}

export function StorageForm({ initialValues = {}, ...props }: FormProps<IStorage>) {
    const { selectProps, queryResult } = useSelect<IDriver>({
        resource: 'drivers',
        optionLabel: 'name',
        optionValue: 'slug',
    })

    const driver = Form.useWatch(['driver'], props.form)
    const options = useMemo(() => {
        if (!queryResult || queryResult.isFetching || !queryResult.data)
            return []

        const item = queryResult.data.data.filter(item => item.slug === driver)
        if (!item || item.length === 0)
            return []

        return item[0].additions
    }, [driver, queryResult])

    const { t } = useTranslation()

    const initValues = useMemo(() => {
        const defaultValues = objectify(
            options,
            f => f.name,
            f => f.default,
        )
        const values = initialValues || {}
        return {
            ...values,
            addition: values.addition ? { ...defaultValues, ...JSON.parse(values.addition) } : defaultValues,
        }
    }, [options, initialValues])

    return (
        <Form {...props} initialValues={initValues} layout="vertical">
            {JSON.stringify(initValues)}
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item name={['driver']} label={t('driver.name')} rules={[{ required: true }]}>
                        <Select variant="underline" placeholder={`${t('please_input')}${t('driver.name')}`} {...selectProps} />
                    </Form.Item>
                </Col>
                <Col span={18}>
                    <Form.Item name={['name']} label={t('common.name')} rules={[{ required: true }]}>
                        <Input variant="underline" placeholder={`${t('please_input')}${t('storage.name')}${t('common.name')}`} />
                    </Form.Item>
                </Col>
                {
                    options.map(item => (
                        <Col key={item.name} span={12}>
                            <FormItem {...item} />
                        </Col>
                    ))
                }
            </Row>
        </Form>
    )
}

function FormItem({ name, help, type, required, options }: AdditionItem) {
    const { t } = useTranslation()

    return (
        <Form.Item
            name={['addition', name]}
            label={t(name)}
            help={t(help)}
            rules={[{ required }]}
            valuePropName={type === 'bool' ? 'checked' : 'value'}
            normalize={(value) => {
                if (value === undefined)
                    return undefined

                if (type === 'number') {
                    return Number(value)
                }

                if (type === 'bool')
                    return !!value

                return value
            }}
        >
            { type === 'string' && <Input variant="underline" placeholder={`${t('please_input')} ${t(name)}`} />}
            { type === 'number' && <InputNumber placeholder={`${t('please_input')} ${t(name)}`} />}
            { type === 'select' && (
                <Select
                    variant="underline"
                    options={options.split(',').map(opt => ({ value: opt, label: opt }))}
                    placeholder={`${t('please_input')} ${t(name)}`}
                />
            )}
            { type === 'bool' && (
                <Checkbox>
                    {t(name)}
                </Checkbox>
            )}
        </Form.Item>
    )
}
