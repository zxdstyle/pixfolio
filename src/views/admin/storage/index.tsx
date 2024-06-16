import { Button } from 'antd'
import { StorageDrawerForm } from '@/views/admin/storage/form.tsx'

export function Component() {
    return (
        <div>
            <div className="grid grid-cols-6 gap-1">
                <StorageDrawerForm>
                    <Button
                        className="h-32 rounded-2xl flex flex-col items-center justify-center"
                        icon={<IconPhPlus className="text-3xl" />}
                        block
                    >
                        添加驱动器
                    </Button>
                </StorageDrawerForm>
            </div>
        </div>
    )
}
