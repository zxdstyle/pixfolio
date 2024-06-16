import type { FormProps } from 'antd'
import { Drawer, Form, Input, Select, Space } from 'antd'
import { useDrawerForm, useSelect } from '@refinedev/antd'
import type { ReactElement } from 'react'
import { cloneElement, useMemo } from 'react'

interface StorageFormProps {
    id?: number
    children?: ReactElement
}

export function StorageDrawerForm({ id, children }: StorageFormProps) {
    const { drawerProps, formProps, show } = useDrawerForm({
        resource: 'storages',
        action: id && id > 0 ? 'edit' : 'create',
        id,
    })

    return (
        <>
            {children && cloneElement(children, {
                onClick: () => show(),
            })}
            <Drawer
                {...drawerProps}
                title={(
                    <Space>
                        <IconIconParkOutlineCloudStorage />
                        {id && id > 0 ? '编辑驱动' : '新增驱动'}
                    </Space>
                )}
            >
                <StorageForm {...formProps} />
            </Drawer>
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

    return (
        <Form {...props} layout="vertical">
            <Form.Item name={['name']} label="名称">
                <Input placeholder="请输入存储器名称" />
            </Form.Item>
            <Form.Item name={['driver']} label="驱动">
                <Select placeholder="请输入选择驱动" {...selectProps} />
            </Form.Item>
            {options.map((item, index) => (
                <Form.Item
                    key={item.name}
                    name={[item.name]}
                    label={item.name}
                    help={item.help}
                    initialValue={item.default}
                    rules={[{ required: item.required }]}
                >
                    <Input />
                </Form.Item>
            ))}
        </Form>
    )
}
