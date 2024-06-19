import type { FormProps } from 'antd'
import { Checkbox, Col, Form, InputNumber, Modal, Row, Space } from 'antd'
import { useModalForm, useSelect } from '@refinedev/antd'
import type { ReactElement, Ref } from 'react'
import { cloneElement, forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { BaseKey } from '@refinedev/core'
import { Input, Select } from '@/components/form'

interface StorageFormProps {
    id?: number
    children?: ReactElement
}

export interface StorageFormInstance {
    show: (id?: BaseKey) => void
    close: () => void
}

export default forwardRef(StorageModalForm)

function StorageModalForm({ id, children }: StorageFormProps, ref: Ref<StorageFormInstance>) {
    const [recordId, setRecordId] = useState<number>(id || 0)
    const { modalProps, formProps, onFinish, show, close } = useModalForm({
        resource: 'storages',
        action: recordId && recordId > 0 ? 'edit' : 'create',
        id: recordId,
    })

    const { t } = useTranslation()

    const handleFinish = (values: any) => {
        onFinish({ ...values, addition: JSON.stringify(values.addition) })
    }

    useImperativeHandle(ref, () => ({
        show: (id) => {
            show(id)
            id && setRecordId(id)
        },
        close,
    }))

    return (
        <>
            {children && cloneElement(children, {
                onClick: () => show(),
            })}
            <Modal
                {...modalProps}
                title={(
                    <Space>
                        <IconIconParkOutlineCloudStorage />
                        {id && id > 0 ? `${t('common.update')}${t('storage.name')}` : `${t('common.create')}${t('storage.name')}`}
                    </Space>
                )}
            >
                <StorageForm {...formProps} onFinish={handleFinish} />
            </Modal>
        </>
    )
}

export function StorageForm({ ...props }: FormProps) {
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

    return (
        <Form {...props} layout="vertical">
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

function FormItem({ name, help, type, default: defaultValue, required }: AdditionItem) {
    const { t } = useTranslation()

    const initValue = useMemo(() => {
        if (defaultValue === undefined)
            return undefined

        if (type === 'number')
            return Number(defaultValue)

        if (type === 'bool')
            return !!defaultValue

        return defaultValue
    }, [defaultValue, type])

    return (
        <Form.Item
            name={['addition', name]}
            label={t(name)}
            help={t(help)}
            initialValue={initValue}
            rules={[{ required }]}
            valuePropName={type === 'bool' ? 'checked' : 'value'}
        >
            { type === 'string' && <Input variant="underline" placeholder={`${t('please_input')} ${t(name)}`} />}
            { type === 'number' && <InputNumber placeholder={`${t('please_input')} ${t(name)}`} />}
            { type === 'select' && <Select variant="underline" placeholder={`${t('please_input')} ${t(name)}`} />}
            { type === 'bool' && (
                <Checkbox>
                    {t(name)}
                </Checkbox>
            )}
        </Form.Item>
    )
}
