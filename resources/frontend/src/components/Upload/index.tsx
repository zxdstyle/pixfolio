import type { UploadFile } from '@solid-primitives/upload'
import {
    Badge,
    Button,
    Image,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui'
import { humanSize } from '@/libs/human'
import { useParams } from '@solidjs/router'
import { useApiUrl, useCreate } from '@solidjs-components/refine'
import { instance } from '@solidjs-components/simple-rest'
import { createMemo, createSignal, For, Match, Show, Switch } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Trigger } from './Trigger'

type Status = 'pending' | 'success' | 'error'
interface FileList {
    rawFile: UploadFile
    status: Status
    error?: string
}

export function Upload() {
    const [store, setStore] = createStore<{ files: FileList[] }>({ files: [] })
    const handleSelect = (selected: UploadFile[]) => {
        setStore('files', (files) => {
            return [
                ...files,
                ...selected.map((selectedFile): FileList => ({ rawFile: selectedFile, status: 'pending' })),
            ]
        })
    }
    const setStatus = (f: string, status: Status) => {
        setStore('files', file => file.rawFile.source === f, 'status', () => status)
    }
    const hasPending = createMemo(() => store.files.filter(f => f.status === 'pending').length > 0)
    const mutation = useCreate<Service.AlbumHasPhoto>({
        resource: 'album-has-photos',
    })

    const params = useParams()
    const apiUrl = useApiUrl()
    const [uploading, setUploading] = createSignal(false)
    const handleUpload = async () => {
        setUploading(true)
        store.files.forEach((item) => {
            if (item.status === 'success') {
                return
            }
            setStatus(item.rawFile.source, 'pending')
            const data = new FormData()
            data.append('file', item.rawFile.file)
            instance(`${apiUrl}/photos`, {
                method: 'post',
                body: data,
            }).then((res) => {
                setStatus(item.rawFile.source, 'success')
                mutation.mutate({
                    values: { album_id: Number(params.id), photo_id: res.data.id },
                })
            }).catch((reason) => {
                setStore('files', f => f.rawFile.source === item.rawFile.source, 'error', () => reason)
            })
        })
        setUploading(false)
    }

    const handleClear = () => {
        setStore('files', files => files.filter(f => f.status !== 'success'))
    }

    const handleDelete = (file: string) => {
        setStore('files', files => files.filter(f => f.rawFile.source !== file))
    }

    return (
        <div class="flex flex-col gap-6">
            <Trigger class="flex-shrink-0" onSelected={handleSelect} />
            <div class="w-full h-full max-h-[70vh] overflow-scroll">
                <Show when={store.files.length > 0}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>预览</TableHead>
                                <TableHead>文件名</TableHead>
                                <TableHead>大小</TableHead>
                                <TableHead>状态</TableHead>
                                <TableHead>操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <For each={store.files}>
                                {(item) => {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <Image src={item.rawFile.source} class="size-12 rounded" />
                                            </TableCell>
                                            <TableCell>{item.rawFile.name}</TableCell>
                                            <TableCell>{humanSize(item.rawFile.file.size).toString()}</TableCell>
                                            <TableCell>
                                                <Switch>
                                                    <Match when={item.status === 'pending'}>
                                                        <Badge variant="secondary">{item.status}</Badge>
                                                    </Match>
                                                    <Match when={item.status === 'error'}>
                                                        <Badge variant="destructive">{item.status}</Badge>
                                                    </Match>
                                                    <Match when={item.status === 'success'}>
                                                        <Badge variant="success">上传成功</Badge>
                                                    </Match>
                                                </Switch>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleDelete(item.rawFile.source)}
                                                    variant="ghost"
                                                    class="text-destructive hover:text-destructive"
                                                    size="sm"
                                                >
                                                    <IconFa6SolidTrashCan />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }}
                            </For>
                        </TableBody>
                    </Table>
                </Show>
            </div>

            <div class="flex justify-end gap-6">
                <Button variant="secondary" onClick={handleClear}>清空成功的上传记录</Button>
                <Button onClick={handleUpload} disabled={uploading() || !hasPending()}>上传</Button>
            </div>
            <div class="flex flex-col col-span-4 gap-6">
                {/* <div class="border rounded-lg px-4 py-6 relative"> */}
                {/*    <div class="absolute -top-3 bg-background px-2">图片压缩配置</div> */}
                {/*    <Form<UploadForm> onSubmit={values => console.log(values)} defaultValue={{ quality: 10, format: 'png' }}> */}
                {/*        <FormItem<UploadForm> name="format"> */}
                {/*            <Select options={supportedFormat} /> */}
                {/*        </FormItem> */}

                {/*        <FormItem<UploadForm> name="quality" label="输出图片质量（0-1）"> */}
                {/*            <Slider max={1} step="0.01" /> */}
                {/*        </FormItem> */}

                {/*        <Button type="submit">Upload</Button> */}
                {/*    </Form> */}
                {/* </div> */}
            </div>
        </div>
    )
}
