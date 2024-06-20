import type { ImageProps } from 'antd'
import { Image } from 'antd'
import { cloneElement, useMemo } from 'react'
import { FileExt } from './icons'
import Document from '@/assets/icons/document.png'
import Folder from '@/assets/icons/folder.png'
import Archive from '@/assets/icons/archive.png'
import Text from '@/assets/icons/text.png'
import Excel from '@/assets/icons/xls.png'
import Word from '@/assets/icons/word.png'
import DB from '@/assets/icons/db.png'
import PDF from '@/assets/icons/pdf.png'
import Unknown from '@/assets/icons/unknown.png'

interface Props extends ImageProps {
    item: FileDescription
}
export default function FileThumbnail({ item, ...rest }: Props) {
    const src = useMemo(() => {
        if (item.is_folder)
            return Folder

        if (item.path.endsWith('.zip') || item.path.endsWith('.rar') || item.path.endsWith('.tar'))
            return Archive

        if (item.path.endsWith('.txt'))
            return Text

        if (item.path.endsWith('.xlsx') || item.path.endsWith('.xls') || item.path.endsWith('.csv'))
            return Excel

        if (item.path.endsWith('.doc') || item.path.endsWith('.docx'))
            return Word

        if (item.path.endsWith('.db'))
            return DB

        if (item.path.endsWith('.pdf'))
            return PDF

        return undefined
    }, [item])

    const other = src ? undefined : FileExt(item.path)

    return (
        <>
            {src && <Image src={src} preview={false} {...rest} />}
            {!src && other && (
                <div className="relative h-full" style={{ width: rest.width }}>
                    <img src={Document} className="w-full" alt={item.name} />
                    <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center items-center">
                        {cloneElement(other, { className: 'text-3xl' })}
                    </div>
                </div>
            )}
            {!src && !other && <Image src={Unknown} preview={false} {...rest} />}
        </>
    )
}
