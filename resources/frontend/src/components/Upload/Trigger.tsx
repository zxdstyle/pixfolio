import type { UploadFile } from '@solid-primitives/upload'
import type { ComponentProps } from 'solid-js'
import { cn } from '@/libs/cn'
import { createDropzone, createFileUploader } from '@solid-primitives/upload'
import { splitProps } from 'solid-js'

export interface TriggerProps extends ComponentProps<'div'> {
    onSelected?: (files: UploadFile[]) => void
}
export function Trigger(props: TriggerProps) {
    const [local, rest] = splitProps(props, ['onSelected'])
    const { setRef: dropzoneRef } = createDropzone({
        onDrop: (files) => {
            local.onSelected && local.onSelected(files)
        },
    })

    const { selectFiles } = createFileUploader({
        multiple: true,
        accept: 'image/*',
    })

    const handleClick = () => {
        selectFiles((files) => {
            local.onSelected && local.onSelected(files)
            console.log(files)
        })
    }

    return (
        <div
            ref={dropzoneRef}
            onClick={handleClick}
            {...rest}
            class={cn('h-32 w-full rounded-lg bg-gray-100 border flex items-center justify-center gap-2 text-slate-500 text-base cursor-pointer', rest.class)}
        >
            <IconFa6SolidImages />
            <p class="select-none">点击或者拖动作品到这里上传</p>
        </div>
    )
}
