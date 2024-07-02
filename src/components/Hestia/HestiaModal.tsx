import type { ModalProps } from 'antd'
import { Modal } from 'antd'
import type { HestiaProps } from './Hestia'
import Hestia from './Hestia'

export interface HestiaModalProps extends ModalProps, HestiaProps {

}

export default function ({ src, ...modalProps }: HestiaModalProps) {
    return (
        <Modal
            footer={false}
            closeIcon={null}
            styles={{
                content: { padding: 0, borderRadius: 8 },

            }}
            width={1080}
            className="rounded-sm"
            {...modalProps}
        >
            <Hestia src={src} />
        </Modal>
    )
}
