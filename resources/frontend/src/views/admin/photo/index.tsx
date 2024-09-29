import { Badge, Button, Tooltip } from '@/components/ui'
import { cn } from '@/libs/cn'
import { CreatePhoto } from '@/views/admin/photo/create'
import { useParams } from '@solidjs/router'
import { useDelete, useList, useOne, useUpdate } from '@solidjs-components/refine'
import { createSignal, For, Show } from 'solid-js'

export default function Photo() {
    const params = useParams()
    const [open, setOpen] = createSignal(false)
    const album = useOne<Service.Album>({
        resource: 'albums',
        id: params.id,
        meta: {
            preload: ['Cover'],
        },
    })

    const query = useList<Service.Photo>({
        resource: `albums/${params.id}/photos`,
        sorters: [{ field: 'id', order: 'desc' }],
        pagination: { pageSize: 120 },
    })

    const mutation = useDelete()
    const handleDelete = (id: number) => {
        mutation.mutate(
            {
                id,
                resource: 'photos',
            },
            {
                onSuccess: async () => {
                    await query.refetch()
                },
            },
        )
    }
    const update = useUpdate()
    const setCover = (photo_id: number) => {
        update.mutate(
            {
                id: params.id,
                resource: 'albums',
                values: { cover_id: photo_id },
            },
            {
                onSuccess: async () => {
                    await query.refetch()
                    await album.refetch()
                },
            },
        )
    }
    const onOpenChange = async (val: boolean) => {
        setOpen(val)
        if (!val)
            await query.refetch()
    }

    return (
        <div class="">
            <div class="flex items-center justify-between mb-4">
                <div class="flex flex-col">
                    <h1 class="text-2xl">{album.data?.data.name}</h1>
                    <p class="text-slate-500 leading-5">{album.data?.data.description}</p>
                </div>
                <CreatePhoto open={open()} onOpenChange={onOpenChange} />
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 overflow-y-scroll h-full">
                <For each={query.data?.data}>
                    {item => (
                        <div class="h-64 relative group rounded-lg bg-gray-100">
                            <Show when={album.data?.data.cover_id === item.id}>
                                <Badge variant="secondary" class="absolute top-2 left-2">封面</Badge>
                            </Show>
                            <div
                                class="h-full rounded-lg bg-center bg-cover  transition-all duration-300 hover:scale-105"
                                style={{ 'background-image': `url(${item.thumbnail_url})` }}
                            />
                            <div
                                class={cn(
                                    'w-full h-full absolute top-0 text-white flex-col justify-between rounded-lg',
                                    'hidden group-hover:flex',
                                )}
                                style={{ background: 'linear-gradient(180deg,rgba(0,0,0,.25),transparent 35%,transparent 65%,rgba(0,0,0,.25))' }}
                            >
                                <div class={cn('px-3 py-2 w-full flex justify-end items-center gap-4')}>
                                    <Show when={album.data?.data.cover_id !== item.id}>
                                        <Tooltip title="设为封面">
                                            <Button size="sm" onClick={() => setCover(item.id)} disabled={mutation.isPending} variant="default">
                                                <IconTablerPhotoFilled />
                                            </Button>
                                        </Tooltip>
                                    </Show>
                                    <Button size="sm" onClick={() => handleDelete(item.id)} disabled={mutation.isPending} variant="destructive">
                                        <IconFa6SolidTrashCan />
                                    </Button>
                                </div>

                                <div class="p-2">
                                    <h1 class="text-xs text-ellipsis text-nowrap overflow-hidden">{item.original_name}</h1>
                                </div>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
}
