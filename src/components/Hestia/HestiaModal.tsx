import type { ModalProps } from 'antd'
import { Modal } from 'antd'
import Hestia from './Hestia'

export interface HestiaModalProps extends ModalProps {}

export default function ({ ...modalProps }: HestiaModalProps) {
    return (
        <Modal
            footer={false}
            closeIcon={null}
            styles={{
                content: { padding: 0 },
            }}
            {...modalProps}
        >
            <Hestia />
        </Modal>
    )
}
