import type { FormProps } from 'antd'
import { Checkbox, Col, Form, InputNumber, Modal, Row, Space } from 'antd'
import { useModalForm, useSelect } from '@refinedev/antd'
import type { ReactElement } from 'react'
import { cloneElement, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Select } from '@/components/form'

interface StorageFormProps {
    id?: number
    children?: ReactElement
}

export function StorageModalForm({ id, children }: StorageFormProps) {
    const { modalProps, formProps, show } = useModalForm({
        resource: 'storages',
        action: id && id > 0 ? 'edit' : 'create',
        id,
    })

    const { t } = useTranslation()

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
                <StorageForm {...formProps} />
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
                            <Form.Item
                                name={['addition', item.name]}
                                label={t(item.name)}
                                help={t(item.help)}
                                initialValue={item.default}
                                rules={[{ required: item.required }]}
                            >
                                { item.type === 'string' && <Input variant="underline" placeholder={`${t('please_input')} ${t(item.name)}`} />}
                                { item.type === 'number' && <InputNumber placeholder={`${t('please_input')} ${t(item.name)}`} />}
                                { item.type === 'select' && <Select variant="underline" placeholder={`${t('please_input')} ${t(item.name)}`} />}
                                { item.type === 'bool' && (
                                    <Checkbox>
                                        {t(item.name)}
                                    </Checkbox>
                                )}
                            </Form.Item>
                        </Col>
                    ))
                }
            </Row>
        </Form>
    )
}
