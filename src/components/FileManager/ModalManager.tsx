import type { ModalProps } from 'antd'
import { Modal } from 'antd'
import type { Ref } from 'react'
import { forwardRef, useImperativeHandle } from 'react'
import { useModal } from '@refinedev/antd'
import { omit } from 'radash'
import { FileManager } from './Manager'

export const ModalManager = forwardRef(InnerModal)

export interface ModalManagerInstance {
    show: () => void
    close: () => void
}

export interface ModalManagerProps extends ModalProps {
    defaultShow?: boolean
}

function InnerModal({
    defaultShow = false,
    width = 900,
}: ModalManagerProps, ref: Ref<ModalManagerInstance>) {
    const { modalProps, show, close } = useModal({ modalProps: { open: defaultShow } })

    useImperativeHandle(ref, () => ({
        show,
        close,
    }))

    return (
        <Modal
            {...omit(modalProps, ['visible'])}
            width={width}
            footer={false}
            mask={false}
            styles={{
                body: { padding: 0 },
            }}
            style={{ padding: 0 }}
        >
            <FileManager />
        </Modal>
    )
}
