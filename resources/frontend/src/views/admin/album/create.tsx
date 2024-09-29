import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Form,
    Input,
    TextArea,
} from '@/components/ui'
import { FormItem } from '@/components/ui/form/Item'
import { useCreate, useOne, useUpdate } from '@solidjs-components/refine'
import { Show } from 'solid-js'

export interface CreateAlbumParams {
    albumId?: number
    open?: boolean
    onOpenChange?: (val: boolean) => void
}

export function CreateAlbum(props: CreateAlbumParams) {
    const mutation = useCreate({
        resource: 'albums',
    })

    const update = useUpdate({
        resource: 'albums',
        id: () => props.albumId,
    })

    const handleSubmit = (values: Service.Album) => {
        const onSuccess = async () => {
            props.onOpenChange?.(false)
        }
        if (props.albumId > 0) {
            update.mutate({
                values,
            }, { onSuccess })
            return
        }
        mutation.mutate({
            values,
        }, { onSuccess })
    }

    const query = useOne<Service.Album>({
        resource: 'albums',
        id: () => props.albumId,
        queryOptions: () => ({
            enabled: !!props.albumId,
        }),
    })

    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogTrigger>
                <Button class="w-32">新增作品集</Button>
            </DialogTrigger>
            <DialogContent class="!w-96">
                <DialogHeader>
                    <DialogTitle>
                        {props.albumId > 0 ? '编辑' : '新增'}
                        作品集
                    </DialogTitle>
                </DialogHeader>

                <Show when={!props.albumId || query.isSuccess}>
                    <Form<Partial<Service.Album>> onSubmit={handleSubmit} defaultValue={query.data?.data}>
                        <FormItem<Service.Album> name="name" label="作品集名称">
                            <Input />
                        </FormItem>

                        <FormItem<Service.Album> name="subtitle" label="副标题">
                            <Input />
                        </FormItem>

                        <FormItem<Service.Album> name="description" label="简介">
                            <TextArea />
                        </FormItem>

                        <div class="flex justify-end">
                            <Button type="submit">保存</Button>
                        </div>
                    </Form>
                </Show>
            </DialogContent>
        </Dialog>
    )
}
