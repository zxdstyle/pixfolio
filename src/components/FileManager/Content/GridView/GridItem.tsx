import type { MouseEvent } from 'react'
import { useContext } from 'react'
import ContextMenu from '../ContextMenu'
import { StorageContext } from '../../context.tsx'
import FileThumbnail from '../FileThumbnail'
import { humanReadableFilesize } from '@/utils/human'

interface IGridItemProps {
    item: IFile
}

export default function GridItem({ item }: IGridItemProps) {
    const { setCurrentPath } = useContext(StorageContext)
    const handleDbClick = (e: MouseEvent<HTMLLIElement>, file: IFile) => {
        e.stopPropagation()
        e.preventDefault()

        if (file.is_folder)
            setCurrentPath(pre => pre === '/' ? `${pre}${file.name}` : `${pre}/${file.name}`)
    }

    return (
        <ContextMenu item={item}>
            <li
                key={item.name}
                className="w-20 text-center flex flex-col items-center overflow-hidden"
                onDoubleClick={e => handleDbClick(e, item)}
            >
                <div className="rounded-xl">
                    <FileThumbnail width={80} item={item} />
                </div>

                <div className="text-sm break-words whitespace-normal line-clamp-2">{item.name}</div>
                <div className="text-[10px] text-primary/60">{humanReadableFilesize(item.size)}</div>
            </li>
        </ContextMenu>
    )
}
