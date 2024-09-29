import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui'
import { Upload } from '@/components/Upload'

export interface CreatePhotoParams {
    open?: boolean
    onOpenChange?: (val: boolean) => void
}

export function CreatePhoto(props: CreatePhotoParams) {
    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogTrigger>
                <Button class="w-32">上传作品</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>上传作品</DialogTitle>
                    <DialogDescription>
                        上传的作品图片会被转成WEBP格式并压缩以便于展示
                    </DialogDescription>
                </DialogHeader>

                <Upload />
            </DialogContent>
        </Dialog>
    )
}
