import { Card } from '@/components/ui'
import { useUser } from '@/layouts/admin'

export default function Dashboard() {
    const user = useUser()
    return (
        <div class="container">
            <div class="grid grid-cols-4 gap-4">
                <Card class="p-0 h-full flex">
                    <div class="h-full w-1/3 bg-primary text-primary-foreground flex items-center justify-center">
                        <IconFa6SolidImages></IconFa6SolidImages>
                    </div>
                    <div class="text-center w-full">
                        <small class="text-black/60 m-0">作品集</small>
                        <p class="m-0 text-2xl">{user()?.album_count}</p>
                    </div>
                </Card>
                <Card class="p-0 h-full flex">
                    <div class="h-full w-1/3 bg-primary text-primary-foreground flex items-center justify-center">
                        <IconFa6SolidImages></IconFa6SolidImages>
                    </div>
                    <div class="text-center w-full">
                        <small class="text-black/60 m-0">作品</small>
                        <p class="m-0 text-2xl">{user()?.photo_count}</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
