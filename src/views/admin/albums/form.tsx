import type { FormProps } from 'antd'
import { Input as AntInput, Col, Form, Modal, Row, Space } from 'antd'
import { useModalForm } from '@refinedev/antd'
import type { ReactElement, Ref } from 'react'
import { cloneElement, forwardRef, useImperativeHandle, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { HttpError } from '@refinedev/core'
import { Input } from '@/components/form'

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
    const { modalProps, formProps, onFinish, show, close } = useModalForm<IAlbum, HttpError, IAlbum>({
        resource: 'albums',
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
                        {recordId && recordId > 0 ? `${t('common.update')}${t('album.name')}` : `${t('common.create')}${t('album.name')}`}
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

export function StorageForm({ ...props }: FormProps<IAlbum>) {
    const { t } = useTranslation()

    return (
        <Form {...props} layout="vertical">
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item name={['title']} label={t('album.name') + t('common.name')} rules={[{ required: true }]}>
                        <Input variant="underline" placeholder={`${t('please_input')}${t('album.name') + t('common.name')}`} />
                    </Form.Item>
                </Col>
                <Col span={18}>
                    <Form.Item name={['sub_title']} label={t('common.sub_title')} rules={[{ required: true }]}>
                        <Input variant="underline" placeholder={`${t('please_input')}${t('album.name')}${t('common.sub_title')}`} />
                    </Form.Item>
                </Col>
                <Col span={18}>
                    <Form.Item name={['description']} label={t('common.description')}>
                        <AntInput.TextArea rows={5} placeholder={`${t('please_input')}${t('album.name')}${t('common.description')}`} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
