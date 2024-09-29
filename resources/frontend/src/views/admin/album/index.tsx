import { Button, Card } from '@/components/ui'
import { A } from '@solidjs/router'
import { useList } from '@solidjs-components/refine'
import { createSignal, For } from 'solid-js'
import { CreateAlbum } from './create'

export default function Album() {
    const query = useList<Service.Album>({
        resource: 'albums',
        sorters: [{ field: 'id', order: 'desc' }],
    })

    const albums = () => query.data?.data || []

    const [albumId, setAlbumId] = createSignal(0)
    const [open, setOpen] = createSignal(false)
    const handleEdit = (id: number) => {
        setAlbumId(id)
        setOpen(true)
    }

    const handleOpenChange = async (val: boolean) => {
        setOpen(val)
        if (!val)
            await query.refetch()
    }

    return (
        <div class="flex flex-col gap-4">
            <div class="flex justify-between items-end">
                <div>
                    <h1 class="text-2xl">作品集</h1>
                    <p class="text-slate-500">
                        挑选优秀的作品整理为作品集
                    </p>
                </div>
                <CreateAlbum albumId={albumId()} open={open()} onOpenChange={handleOpenChange} />
            </div>

            <div class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                <For each={albums()}>
                    {item => (
                        <A href={`/admin/album/${item.id}/photos`}>
                            <Card
                                title={(
                                    <span class="flex items-center">
                                        {item.name}
                                    </span>
                                )}
                                description={item.subtitle}
                                extra={(
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        class="flex-shrink-0"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleEdit(item.id)
                                        }}
                                    >
                                        <IconFa6SolidPenToSquare />
                                    </Button>
                                )}
                            >
                                <p class="text-xs text-gray-600">
                                    {item.description}
                                </p>
                            </Card>
                        </A>
                    )}
                </For>
            </div>
            <p class="text-center text-slate-400 text-sm">暂无更多...</p>
        </div>
    )
}
