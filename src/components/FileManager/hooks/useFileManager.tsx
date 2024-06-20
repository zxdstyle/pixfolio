import { useState } from 'react'
import type { FileManagerProps } from '../types/manager'

interface UseFileManagerProps {
    defaultOpen?: boolean
}

export function useFileManager({ defaultOpen = false }: UseFileManagerProps = {}) {
    const [open, setOpen] = useState(defaultOpen)
    const show = () => setOpen(true)
    const close = () => setOpen(false)
    const fileManagerProps: FileManagerProps = {
        modalProps: {
            open,
            footer: false,
            width: '60%',
            onCancel: close,

        },
    }

    return { fileManagerProps, show, close }
}
